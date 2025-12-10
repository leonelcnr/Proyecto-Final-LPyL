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

const Juego = () => {

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [victoria, setVictoria] = useState(false);
    const { tiempo, iniciar, detener, reiniciar } = useCronometro();
    const [sudoku, setSudoku] = useState([]);
    const [pistas, setPistas] = useState([]);
    const { dificultad } = useParams();
    const storageKey = `sudoku-${dificultad}`;

    const navigate = useNavigate();

    // cargo el sudoku desde el back, e inicio el cronometro



    useEffect(() => {
        const guardado = sessionStorage.getItem(storageKey);
        if (guardado) {
            const { tablero, pistas: pistasGuardadas } = JSON.parse(guardado);

            setSudoku(tablero);
            setPistas(pistasGuardadas);
            iniciar();
            setCargando(false);
            return;
        }

        async function cargar_sudoku() {
            setCargando(true);
            setError(null);
            try {
                const response = await fetch(
                    `/API/nueva-partida.php?dificultad=${dificultad}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.status === 401) {
                    navigate("/login");
                    return;
                }
                if (!response.ok) throw new Error("Error al cargar sudoku");

                const data = await response.json();

                setSudoku(data);
                setPistas(data);
                iniciar();

                // Guardo lo que me devolvió el back
                sessionStorage.setItem(
                    storageKey,
                    JSON.stringify({ tablero: data, pistas: data })
                );
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
        const res = await fetch(
            "/API/verificar-solucion.php",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
                credentials: "include",
            }
        );
        const data = await res.json();

        if (data.valido) {
            setVictoria(true);
            detener();
            sessionStorage.removeItem(storageKey);

        } else {
            iniciar();
            setError(data.mensaje);
        }
    };

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
                    <Link to="/" className="text-slate-100 font-bold text-2xl relative efecto">Volver atras</Link>
                </nav>
            </header>

            <main className="w-full flex flex-row justify-center items-start py-10 px-24">
                {error && (
                    <p className="absolute top-10 z-10 w-full max-w-md text-center text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                        {error}</p>)}


                <form onSubmit={handleSubmit} className="w-3/5 flex flex-col items-center ">
                    <div className="colorFondo rounded-md shadow-lg w-auto h-auto p-6">
                        <div className="p-4">
                            <Tablero
                                tablero={sudoku}
                                cambiarValorCelda={cambiarValorCelda}
                                pistas={pistas}
                            />
                        </div>
                        <div className="px-4 py-2 flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase">
                                Tiempo
                            </span>
                            <Reloj tiempo={tiempo} />
                        </div>
                    </div>

                    {/* Botón Terminé */}
                    <button type="submit" className="mt-4 px-12 py-2 rounded-md bg-blue-600 text-white font-medium text-sm shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#111111] transition-colors">Terminé</button>
                </form>

                <Ranking partidas={ranking} titulo="Tus Mejores Partidas" />
            </main>



            {/* Modal de victoria */}
            {victoria && (
                <Modal
                    estaAbierto={victoria}
                    cerrarModal={() => {
                        setVictoria(false);
                        reiniciar();
                    }}
                    titulo="¡Has ganado!"
                >
                    <div className="space-y-2 text-center">
                        <p className="text-slate-100">
                            ¡Felicidades! Has completado el Sudoku correctamente.
                        </p>
                        <p className="text-sm text-slate-400">Tu tiempo fue:</p>
                        <div className="font-mono text-lg text-blue-300">
                            <Reloj tiempo={tiempo} />
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default Juego;
