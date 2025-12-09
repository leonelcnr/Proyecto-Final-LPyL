import { useParams } from "react-router-dom";
import Tablero from "../componentes/Juego/Tablero";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "../componentes/Modal";
import Reloj from "../componentes/Juego/Reloj";
import { useCronometro } from "../hooks/useCronometro";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Juego = () => {
    const [sudoku, setSudoku] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [pistas, setPistas] = useState([]);
    const [victoria, setVictoria] = useState(false)
    const { tiempo, iniciar, detener, reiniciar } = useCronometro();
    const usuario = 'Nati'

    const { dificultad } = useParams();

    const navigate = useNavigate();

    // cargo el sudoku desde el back, e inicio el cronometro
    useEffect(() => {
        async function cargar_sudoku() {
            setCargando(true);
            setError(null);
            try {
                const response = await fetch(
                    `http://localhost/Final-LPyP/Sudoku/backend/public/API/nueva-partida.php?dificultad=${dificultad}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) throw new Error("Error al cargar sudoku");

                if (response.status === 401) {
                    navigate('/login');
                    return;
                }
                const data = await response.json();
                setSudoku(data);
                setPistas(data);
                iniciar(); // arrancás el cronómetro cuando ya cargó todo
            } catch (error) {
                if (error.message === "No autenticado") {
                    navigate('/login');
                    return;
                }
                setError(error.message || "Error desconocido");
            } finally {
                setCargando(false);
            }
        }

        cargar_sudoku();
    }, [dificultad]);


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
        detener();
        const datos = {
            tablero: sudoku,
            tiempo: tiempo
        }

        console.log("Enviando a back:", datos);
        const res = await fetch("http://localhost/Final-LPyP/Sudoku/backend/public/API/verificar-solucion.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
            credentials: "include",
        });
        const data = await res.json();

        if (data.valido) {
            setVictoria(true);
        }
        else {
            iniciar();
            setError(data.mensaje);
        }
    };

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
        <section className="flex-1 flex flex-col items-center px-4">
            {/* Barra superior derecha: usuario + inicio */}
            <header className="w-full min-h-12 px-12 flex items-center justify-end mb-6">
                <nav className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="text-slate-100 font-bold text-2xl">
                        Volver atras
                    </Link>
                    {/* <span className="text-slate-100 font-bold text-2xl">{usuario}</span> */}
                </nav>
            </header>

            {/* Contenido principal: errores + tablero + botón */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-5xl flex flex-col items-center gap-4"
            >
                {error && (
                    <p className="w-full max-w-md text-center text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                        {error}
                    </p>
                )}

                {/* Card del tablero */}
                <div className="colorFondo rounded-xl shadow-lg">
                    <div className="p-4">
                        <Tablero tablero={sudoku} cambiarValorCelda={cambiarValorCelda} pistas={pistas} />
                    </div>
                    <div className="px-4 py-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                            Tiempo
                        </span>
                        <Reloj tiempo={tiempo} />
                    </div>
                </div>

                {/* Botón Terminé */}
                <button
                    type="submit"
                    className="mt-2 px-6 py-2 rounded-xl bg-blue-600 text-white font-medium text-sm shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#111111] transition-colors"
                >
                    Terminé
                </button>

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
            </form>
        </section>
    );
};

export default Juego;