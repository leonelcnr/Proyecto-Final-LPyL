import Celda from "./Celda";

const Tablero = ({ tablero, onChangeCelda }) => {
    const sudoku = tablero;

    return (
        <div className=" h-auto w-auto flex flex-col border-2 border-black">
            {sudoku.map((fila, indexFila) => (
                <div key={indexFila} className="flex w-full h-full justify-center items-center">
                    {fila.map((celda, indexColumna) => (
                        <Celda key={indexColumna}
                            numero={celda}
                            fila={indexFila}
                            col={indexColumna}
                            onChangeCelda={onChangeCelda}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Tablero;