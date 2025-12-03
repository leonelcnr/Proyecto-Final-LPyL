import { useState } from "react";
import Modal from "../componentes/Modal";
import { useNavigate } from "react-router-dom";


const Inicio = () => {

    const [modalAbierto, setModalAbierto] = useState(false);

    const navegador = useNavigate(); //para pasar parametros por url
    const handleDificultad = (dificultad) => {
        navegador(`/jugar/${dificultad}`);
    }


    const mostrarModal = () => {
        return (
            <Modal estaAbierto={modalAbierto} cerrarModal={() => setModalAbierto(false)} titulo="Selecciona una dificultad">
                <p>Selecciona una dificultad</p>
                <div className="flex gap-4">
                    <button onClick={() => handleDificultad("facil")}>Facil</button>
                    <button onClick={() => handleDificultad("medio")}>Medio</button>
                    <button onClick={() => handleDificultad("dificil")}>Dificil</button>
                </div>
            </Modal>
        )
    }

    return (
        <div className="border border-black flex flex-col items-center gap-4">
            <h1>Sudoku</h1>
            <p>Elige una dificultad</p>
            <div className="flex gap-4">
                <button onClick={() => setModalAbierto(true)}>Jugar</button>
            </div>
            {mostrarModal()}
        </div>
    );
};

export default Inicio;
