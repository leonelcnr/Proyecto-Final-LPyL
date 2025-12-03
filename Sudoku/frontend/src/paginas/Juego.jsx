import { useParams } from "react-router-dom";
import Tablero from "../componentes/Juego/Tablero";
import { useState } from "react";
import { useEffect } from "react";


const Juego = () => {
    const [sudoku, setSudoku] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [pistas, setPistas] = useState([]);
    const [victoria, setVictoria] = useState(false)

    const { dificultad } = useParams();

    useEffect(() => {
        async function cargar_sudoku() {
            const response = await fetch(
                `http://localhost/Final-LPyP/Sudoku/backend/public/API/nueva-partida.php?dificultad=${dificultad}`
            );
            try {
                if (!response.ok) throw new Error("Error al cargar sudoku");
                const data = await response.json();
                setSudoku(data);
                setPistas(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        }
        cargar_sudoku();
    }, [dificultad])

    const handleChangeCelda = (fila, col, nuevoValor) => {

        setSudoku((prev) => {
            if (!pistas.length) return prev;

            if (pistas[fila][col] !== 0) {
                return prev;
            }

            return prev.map((filaArr, i) =>
                filaArr.map((celda, j) =>
                    i === fila && j === col ? nuevoValor : celda
                )
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Enviando a back:", sudoku);
        const res = await fetch("http://localhost/Final-LPyP/Sudoku/backend/public/API/verificar-solucion.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tablero: sudoku }),
        });

        const data = await res.json();
        console.log("Respuesta del back:", data);

        if (data.valido) {
            setVictoria(true);
        } else {
            alert("PERDISTE");
        }
    };


    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <h1>Sudoku</h1>
            <Tablero tablero={sudoku} onChangeCelda={handleChangeCelda} />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded">
                Terminé
            </button>
            {victoria && <p>GANASTE!!</p>}
        </form>
    );
};

export default Juego;