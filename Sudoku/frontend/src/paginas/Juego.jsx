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

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [victoria, setVictoria] = useState(false);
    const { tiempo, iniciar, detener, setTiempo } = useCronometro();
    const [sudoku, setSudoku] = useState([]);
    const [pistas, setPistas] = useState([]);
    const { dificultad } = useParams();
    const navigate = useNavigate();
    const [rankingGlobal, setRankingGlobal] = useState([]);

    // cargo el sudoku desde el back, e inicio el cronometro



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
        async function cargar_sudoku() {
            setCargando(true);
            setError(null);
            try {
                const response = await fetch(`/API/nueva-partida.php?dificultad=${dificultad}`, {
                    method: "GET",
                    credentials: "include",
                });

                // si el usuario no esta autenticado, redirijo a login
                if (response.status === 401) {
                    navigate("/login");
                    return;
                }
                if (!response.ok) throw new Error("Error al cargar sudoku");

                const data = await response.json();

                setSudoku(data);
                setPistas(data);
                iniciar();
                setCargando(false);

                // guardo el tablero y las pistas en el session storage para evitar hacer otra peticion al recargar la pag o volver atras
                sessionStorage.setItem(`sudoku-${dificultad}`, JSON.stringify({ tablero: data, pistas: data, tiempo }));

            } catch (error) {
                if (error.message === "No autenticado") {
                    navigate("/login");
                    return;
                }
                setError(error.message || "Error desconocido");
            } finally {
                setCargando(false);
            }
        }
        cargar_sudoku();
    }, [dificultad, navigate]);


    //guardo la ultima partida del usuario
    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        const jugada_en = new Date().toISOString();
        const estado = victoria ? "ganada" : "abandonada";

        localStorage.setItem(`ultimaPartida-${usuario}`, JSON.stringify({ dificultad, jugada_en, estado }));
    }, [dificultad, victoria]);


    // cambia el valor de la celda, si es una pista no se puede cambiar
    const cambiarValorCelda = (fila, col, nuevoValor) => {
        setSudoku((prev) =>
            prev.map((filaArr, i) =>
                filaArr.map((celda, j) =>
                    i === fila && j === col ? nuevoValor : celda
                )
            )
        );
    };

    // envio el tablero al back para verificar si es correcto
    const handleSubmit = async (e) => {
        e.preventDefault();

        // deberia detener el tiempo ahora o despues?
        const datos = {
            tablero: sudoku,
            dificultad: dificultad,
            tiempo: tiempo,
        };

        console.log("Enviando a back:", datos);
        const res = await fetch("/API/verificar-solucion.php",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
                credentials: "include",
            }
        );
        const data = await res.json();

        if (data.valido) {
            detener();
            mostrarRankingGlobal();
            sessionStorage.removeItem(`sudoku-${dificultad}`);
            setVictoria(true);

        } else {
            setError(data.mensaje);
        }
    };

    // peticion para obtener el ranking del usuario
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        fetch(`/API/rankingUsuario.php?dificultad=${dificultad}`, {
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

    useEffect(() => {
        if (error) {
            setTimeout(() => setError(null), 5000);
        }
    }, [error]);


    const guardarPartidaActual = () => {
        sessionStorage.setItem(`sudoku-${dificultad}`, JSON.stringify({ tablero: sudoku, pistas, tiempo }));
    };


    // peticion para obtener el ranking global

    const mostrarRankingGlobal = () => {
        fetch(`/API/rankingGlobal.php?dificultad=${dificultad}`, {
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
            <header className="w-full min-h-12 px-12 flex items-center justify-end mb-6">
                <nav className="flex items-center gap-4">
                    <Link to="/" className="text-slate-100 font-bold text-2xl relative efecto" onClick={guardarPartidaActual}>Volver atras</Link>
                </nav>
            </header>

            <main className="w-full flex flex-row justify-center items-start py-10 px-24">
                {error && (<Error error={error} />)}


                <form onSubmit={handleSubmit} className="w-3/5 flex flex-col items-center ">
                    <div className="colorFondo rounded-md shadow-lg w-auto h-auto p-6">
                        <div className="p-4">
                            <Tablero
                                tablero={sudoku}
                                cambiarValorCelda={cambiarValorCelda}
                                pistas={pistas} />
                        </div>
                        <div className="px-4 py-2 flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase">Tiempo</span>
                            <Reloj tiempo={tiempo} />
                        </div>
                    </div>

                    <button type="submit" className="boton">Terminé</button>
                </form>

                <Ranking partidas={ranking} titulo="Tus Mejores Partidas" />
            </main>



            {/* Modal de victoria */}
            {victoria && (
                <Modal
                    estaAbierto={victoria}
                    titulo="¡Has ganado!">
                    <div className="text-center w-[70vw] px-6 py-4 flex flex-col items-center gap-2">
                        <p className="text-slate-100">
                            ¡Felicidades! Has completado el Sudoku correctamente.
                        </p>
                        <p className="text-sm text-slate-400">Tu tiempo fue:</p>
                        <div className="font-mono text-lg text-blue-300">
                            <Reloj tiempo={tiempo} />
                        </div>
                        <div className="w-full flex justify-center">
                            <Ranking partidas={rankingGlobal} titulo={`Ranking ${dificultad}`} />
                        </div>
                        <div className="space-x-7 space-y-8">
                            <button className="boton" onClick={() => { setVictoria(false); navigate("/") }}>Volver Inicio</button>
                            <button className="boton" onClick={() => { setVictoria(false); navigate(`/juego/${dificultad}`) }}>Nueva Partida</button>
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default Juego;
