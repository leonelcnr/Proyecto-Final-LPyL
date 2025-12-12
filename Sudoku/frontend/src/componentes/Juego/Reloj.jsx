

const Reloj = ({ tiempo }) => {


    const minutos = Math.floor(tiempo / 60000);
    const segundos = Math.floor((tiempo % 60000) / 1000);
    const milisegundos = Math.floor((tiempo % 1000) / 10);

    const mm = String(minutos).padStart(2, "0");
    const ss = String(segundos).padStart(2, "0");
    const cs = String(milisegundos).padStart(2, "0");


    return (
        <div className=" w-full bg-zinc-800 px-4 py-2 flex items-center justify-between shadow-lg rounded-md">
            <span className="text-md font-semibold uppercase ">Tiempo</span>
            <p className="text-md font-semibold">{mm}:{ss}.{cs}</p>
        </div>
    );
};

export default Reloj;