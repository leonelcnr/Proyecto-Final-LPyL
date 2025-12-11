const TarjetaDificultad = ({ dificultad, handleDificultad }) => {
    return (
        <div className="bg-zinc-900 rounded-md border-2 border-black/50 h-[400px] w-auto flex flex-col
        hover:bg-zinc-700 hover:text-white transition-all duration-300
        group">
            <div className="bg-zinc-700 rounded-t-md p-8 h-1/2">
                <img className="w-full h-full object-contain" src="src/assets/img/icons8-sudoku.svg" alt="" />
            </div>
            <div className=" flex flex-col gap-2 justify-around items-center text-center h-1/2">
                <h2 className="text-2xl font-bold text-white uppercase">{dificultad}</h2>
                <button className="w-40 h-12 text-blue-400 flex items-center justify-center rounded-md bg-transparent border-2 relative border-blue-600 transition-all duration-300 group-hover:border-zinc-900 group-hover:bg-zinc-900
                ease-in-out
                after:content-['']
                after:absolute
                after:top-0
                after:left-0
                after:w-full
                after:h-0
                after:bg-blue-600
                after:rounded-md
                hover:after:h-full
                after:transition-all
                after:duration-300
                after:ease-in-out   
                after:z-0
                after:opacity-0
                hover:after:opacity-100
                
                " onClick={() => handleDificultad(dificultad)}><span className="z-10 relative font-bold group-hover:text-black">JUGAR</span></button>
            </div>
        </div>
    );
};

export default TarjetaDificultad;
