import Tablero from "../componentes/Tablero";
import { useState } from "react";
import { useEffect } from "react";


const Juego = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function cargar_usuarios() {
            const response = await fetch("http://localhost/Final-LPyP/Sudoku/backend/public/API/nuevo-sudoku.php");
            try {
                if (!response.ok) throw new Error("Error al cargar usuarios");
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        }
        cargar_usuarios();
    }, [])


    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-full flex flex-col gap-4 items-center justify-center border-2 border-blue-500">
            <h1>Sudoku</h1>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>{usuario.nombre}</li>
                ))}
            </ul>
            <Tablero />
        </div>
    );
};

export default Juego;