import { useEffect, useState } from "react";
import Modal from "../componentes/Modal";
import TarjetaDificultad from "../componentes/Inicio/TarjetaDificultad";
import Ranking from "../componentes/Ranking";
import { useNavigate } from "react-router-dom";


const Inicio = () => {

    const [modalAbierto, setModalAbierto] = useState(false);
    const usuario = "Natalia"
    const [ultimaPartida, setUltimaPartida] = useState([]);

    const navegador = useNavigate(); //para pasar parametros por url

    const handleDificultad = (dificultad) => {
        navegador(`/jugar/${dificultad}`);
    }

    //traer ultima partida
    useEffect(() => {
        fetch("/API/ultimaPartida.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setUltimaPartida(data))
            .catch((err) => console.log(err));
    }, []);


    return (
        <section className=" flex flex-col items-center gap-4">
            <header className="w-full flex justify-end items-center gap-4">
                <h2 className="efecto relative border-slate-400">Bienvenido/a {usuario} </h2>
                <button className="bg-red-500/30 text-white px-4 py-2 rounded-md">Cerrar sesion</button>
            </header>
            <main className="w-full h-full flex flex-row gap-4 py-10 px-5">
                <Ranking partidas={ultimaPartida} titulo="Ultima partida" />
                <div className="w-4/6 flex flex-col gap-4 justify-center text-center">
                    <h2 className="text-xl font-semibold text-slate-100">Elegir dificultad</h2>
                    <div className="flex flex-row justify-center gap-4">
                        <TarjetaDificultad dificultad="facil" handleDificultad={handleDificultad} />
                        <TarjetaDificultad dificultad="medio" handleDificultad={handleDificultad} />
                        <TarjetaDificultad dificultad="dificil" handleDificultad={handleDificultad} />
                    </div>
                    {/* <button onClick={() => setModalAbierto(true)}>Jugar</button> */}
                </div>
            </main>

            {
                modalAbierto && (<Modal
                    estaAbierto={modalAbierto}
                    cerrarModal={() => setModalAbierto(false)}
                    titulo="Selecciona una dificultad">
                    <div className="w-[800px] flex gap-12 justify-center">
                        <TarjetaDificultad dificultad="facil" handleDificultad={handleDificultad} />
                        <TarjetaDificultad dificultad="medio" handleDificultad={handleDificultad} />
                        <TarjetaDificultad dificultad="dificil" handleDificultad={handleDificultad} />
                    </div>
                </Modal>)
            }
        </section >
    );
};

export default Inicio;
