import { useEffect, useState } from "react";
import Modal from "../componentes/Modal";
import TarjetaDificultad from "../componentes/Inicio/TarjetaDificultad";
import { useNavigate } from "react-router-dom";
import Ranking from "../componentes/Ranking";


const Inicio = () => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        fetch("http://localhost/Final-LPyP/Sudoku/backend/public/API/rankingGlobal.php", {
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




    const [modalAbierto, setModalAbierto] = useState(false);

    const navegador = useNavigate(); //para pasar parametros por url

    const handleDificultad = (dificultad) => {
        navegador(`/jugar/${dificultad}`);
    }


    return (
        <div className=" flex flex-col items-center gap-4">
            <div className="flex flex-col gap-4 w-[800px]">
                <Ranking partidas={ranking} mostrarUsuario={true} titulo="Ranking Global" />
                <button onClick={() => setModalAbierto(true)}>Jugar</button>
            </div>

            {modalAbierto && (<Modal
                estaAbierto={modalAbierto}
                cerrarModal={() => setModalAbierto(false)}
                titulo="Selecciona una dificultad">
                <div className="w-[800px] flex gap-12 justify-center">
                    <TarjetaDificultad dificultad="facil" handleDificultad={handleDificultad} />
                    <TarjetaDificultad dificultad="medio" handleDificultad={handleDificultad} />
                    <TarjetaDificultad dificultad="dificil" handleDificultad={handleDificultad} />
                </div>
            </Modal>)}
        </div>
    );
};

export default Inicio;
