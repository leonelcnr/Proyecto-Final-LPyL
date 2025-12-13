import { useParams } from "react-router-dom";
import Tablero from "../componentes/Juego/Tablero";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "../componentes/Modal";
import Reloj from "../componentes/Juego/Reloj";
import { useCronometro } from "../hooks/useCronometro";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Ranking from "../componentes/Ranking";
import Error from "../componentes/Error";

const Juego = () => {

    const navigate = useNavigate();
    const { dificultad } = useParams();
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [victoria, setVictoria] = useState(false);
    const { tiempo, iniciar, detener, setTiempo, reiniciar } = useCronometro();
    const [sudoku, setSudoku] = useState([]);
    const [pistas, setPistas] = useState([]);
    const [rankingGlobal, setRankingGlobal] = useState([]);
    const [ranking, setRanking] = useState([]);


    // funcion para cargar un nuevo sudoku
    const cargar_sudoku = async () => {
        setCargando(true);
        setError(null);
        const response = await fetch(`/Peticiones/nueva-partida.php?dificultad=${dificultad}`, {
            method: "GET",
            credentials: "include",
        });
        // si el usuario no esta autenticado, redirijo a login
        if (response.status === 401) {
            navigate("/");
            return;
        }
        if (!response.ok) setError("Error al cargar sudoku");
        const data = await response.json();
        setSudoku(data);
        setPistas(data);
        reiniciar();
        setCargando(false);
        // guardo el tablero y las pistas en el session storage para evitar hacer otra peticion al recargar la pag o volver atras
        sessionStorage.setItem(`sudoku-${dificultad}`, JSON.stringify({ tablero: data, pistas: data, tiempo }));
    }

    useEffect(() => {
        // cargo el sudoku guardado en el session storage para evitar hacer otra peticion
        const guardado = sessionStorage.getItem(`sudoku-${dificultad}`);
        if (guardado) {
            const { tablero, pistas, tiempo } = JSON.parse(guardado);
            setSudoku(tablero);
            setPistas(pistas);
            setTiempo(tiempo);
            iniciar();
            setCargando(false);
            return;
        }
        // si no esta guardado, hago una peticion para obtener un nuevo sudoku
        cargar_sudoku();
    }, [dificultad, navigate]);


    //guardo la ultima partida del usuario en el localstorage
    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        const jugada_en = new Date().toISOString();
        const estado = victoria ? "ganada" : "abandonada";
        localStorage.setItem(`ultimaPartida-${usuario}`, JSON.stringify({ dificultad, jugada_en, estado }));
    }, [dificultad, victoria]);


    // cambia el valor de la celda, utiliza setSudoku para actualizar el estado del tablero
    const cambiarValorCelda = (fila, col, nuevoValor) => {
        setSudoku((prev) =>
            prev.map((filaArr, i) =>
                filaArr.map((celda, j) =>
                    i === fila && j === col ? nuevoValor : celda
                )
            )
        );
    };


    // funcion para enviar la solucion al back y verificar si es correcta
    const verificarSolucion = async (e) => {
        e.preventDefault();
        detener();
        const datos = {
            tablero: sudoku,
            dificultad: dificultad,
            tiempo: tiempo,
        };
        const res = await fetch("/Peticiones/verificar-solucion.php",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
                credentials: "include",
            });
        const data = await res.json();
        if (data.valido) {
            mostrarRankingGlobal();
            sessionStorage.removeItem(`sudoku-${dificultad}`);
            setVictoria(true);
        } else {
            iniciar();
            setError(data.mensaje);
        }
    };


    // peticion para obtener el ranking del usuario
    useEffect(() => {
        fetch(`/Peticiones/rankingUsuario.php?dificultad=${dificultad}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setRanking(data))
            .catch((err) => console.log(err));
    }, []);


    // si hay un error, lo muestro por 5 segundos
    useEffect(() => {
        if (error) {
            setTimeout(() => setError(null), 5000);
        }
    }, [error]);

    // funcion para borrar la partida actual en el session storage
    const borrarPartidaActual = () => {
        sessionStorage.removeItem(`sudoku-${dificultad}`);
    };


    // peticion para obtener el ranking global
    const mostrarRankingGlobal = () => {
        fetch(`/Peticiones/rankingGlobal.php?dificultad=${dificultad}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setRankingGlobal(data))
            .catch((err) => console.log(err));
    };


    if (cargando) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-slate-400 text-sm">Cargando partida...</p>
            </div>
        );
    }

    return (
        <section className="w-full h-full flex-1 flex flex-col items-center px-4">
            <header className="w-full min-h-12 px-12 flex items-center justify-end mb-10">
                <nav className="flex items-center gap-4">
                    <Link to="/inicio" className="text-slate-100 font-bold text-2xl relative efecto" onClick={borrarPartidaActual}>Volver atras</Link>
                </nav>
            </header>
            {error && (<Error error={error} />)}
            <main className="grid w-full grid-cols-[1.2fr_1fr] justify-center items-start h-full">
                <article className="colorFondo rounded-lg shadow-lg w-full h-auto p-6">
                    <div className="flex flex-col items-center justify-center w-auto ">
                        <form onSubmit={verificarSolucion} className="w-auto flex flex-col items-center gap-6 ">
                            <Tablero tablero={sudoku} cambiarValorCelda={cambiarValorCelda} pistas={pistas} />
                            <Reloj tiempo={tiempo} />
                            <button type="submit" className="boton disabled:opacity-40 cursor-not-allowed" disabled={sudoku.some(fila => fila.some(celda => celda === 0))}>Terminé</button>
                        </form>
                    </div>
                </article>
                <aside className="w-full px-10">
                    <Ranking partidas={ranking} titulo="Tus Mejores Partidas" />
                </aside>
            </main >


            {/* Modal de victoria */}
            {
                victoria && (
                    <Modal
                        estaAbierto={victoria}
                        titulo="¡Has ganado!">
                        <div className="text-center w-[70vw] px-6 py-4 flex flex-col items-center gap-2">
                            <p className="text-slate-100">
                                ¡Felicidades! Has completado el Sudoku correctamente.
                            </p>
                            <p className="text-sm text-slate-400">Tu tiempo fue:</p>
                            <div className="font-mono text-lg text-blue-300 w-[20vw]">
                                <Reloj tiempo={tiempo} />
                            </div>
                            <div className="w-full flex justify-center">
                                <Ranking partidas={rankingGlobal} titulo={`Ranking ${dificultad}`} />
                            </div>
                            <div className="space-x-7 space-y-8">
                                <button className="boton" onClick={() => { navigate("/inicio") }}>Volver Inicio</button>
                                <button className="boton" onClick={() => {
                                    setVictoria(false);
                                    cargar_sudoku();
                                    sessionStorage.removeItem(`sudoku-${dificultad}`);
                                }}>Nueva Partida</button>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </section >
    );
};

export default Juego;
