import Celda from "./Celda";

const Tablero = ({ tablero, cambiarValorCelda, pistas }) => {
    const sudoku = tablero;

    return (
        <div className=" h-auto w-auto flex flex-col border-2 border-black">
            {sudoku.map((fila, indexFila) => (
                <div key={indexFila} className="flex w-full h-full justify-center items-center">
                    {fila.map((celda, indexColumna) => (
                        <Celda key={indexColumna + "-" + indexFila}
                            numero={celda}
                            fila={indexFila}
                            col={indexColumna}
                            onChange={(nuevoValor) => cambiarValorCelda(indexFila, indexColumna, nuevoValor)}
                            esPista={pistas[indexFila][indexColumna] !== 0}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Tablero;