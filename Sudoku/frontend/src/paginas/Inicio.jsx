import { useEffect, useState } from "react";
import TarjetaDificultad from "../componentes/Inicio/TarjetaDificultad";
import Ranking from "../componentes/Ranking";
import { useNavigate } from "react-router-dom";


const Inicio = () => {

    const usuario = localStorage.getItem('usuario');
    const [ultimaPartida, setUltimaPartida] = useState([]);
    const [rankingUsuario, setRankingUsuario] = useState([]);

    const navegador = useNavigate(); //para pasar parametros por url

    const handleDificultad = (dificultad) => {
        navegador(`/jugar/${dificultad}`);
    }


    useEffect(() => {
        const resultado = JSON.parse(localStorage.getItem('ultimaPartida-' + usuario));
        if (!resultado) return setUltimaPartida([]);
        const objetoPartida = {
            dificultad: resultado.dificultad,
            jugada_en: resultado.jugada_en,
            estado: resultado.estado,
        }

        setUltimaPartida([objetoPartida]);
    }, [usuario]);

    useEffect(() => {
        fetch(`/Peticiones/rankingUsuario.php`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.mensaje === "No autenticado") {
                    navegador('/');
                }
                setRankingUsuario(data)
            })
            .catch((err) => console.log(err));
    }, []);


    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
        sessionStorage.clear();

        fetch(`/Peticiones/logout.php`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    navegador('/');
                }
            })
            .catch((err) => console.log(err));

    }

    return (
        <section className="min-h-[calc(100vh-4rem)] w-full h-full px-6 flex flex-col">
            <header className="flex items-center justify-end gap-4 mb-12">
                <div className="flex flex-row justify-center items-center gap-2">
                    <p className="text-xm text-slate-400">Bienvenido/a</p>
                    <p className="text-xm    font-semibold text-slate-100">{usuario}</p>
                </div>
                <button className="bg-red-500/50 hover:bg-red-500/80 text-sm px-4 py-2 rounded-md font-medium border-none text-white transition ease-in-out"
                    onClick={cerrarSesion}>
                    Cerrar sesión
                </button>
            </header>

            <main className=" grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] pb-32 h-full">
                <div className="  flex flex-col gap-8 h-full">
                    <div>
                        <Ranking partidas={ultimaPartida} titulo="Última partida" />
                    </div>
                    <div className=" h-2/3">
                        <Ranking partidas={rankingUsuario} titulo="Tus Mejores Partidas" />
                    </div>
                </div>

                <div className="colorFondo rounded-xl p-6 shadow-xl flex flex-col gap-6 h-full ">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-100">
                                Nueva Partida
                            </h2>
                            <p className="text-xs text-slate-400">
                                Elige una dificultad para jugar
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3 h-full ">
                        <TarjetaDificultad dificultad="facil" handleDificultad={handleDificultad} />
                        <TarjetaDificultad dificultad="medio" handleDificultad={handleDificultad} />
                        <TarjetaDificultad dificultad="dificil" handleDificultad={handleDificultad} />
                    </div>
                </div>
            </main>
        </section>

    );
};

export default Inicio;
