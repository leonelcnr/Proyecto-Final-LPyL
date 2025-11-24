import Tablero from "../componentes/Tablero";


const Juego = () => {
    return (
        <div className="w-full flex flex-col gap-4 items-center justify-center border-2 border-blue-500">
            <h1>Juego</h1>
            <Tablero />
        </div>
    );
};

export default Juego;