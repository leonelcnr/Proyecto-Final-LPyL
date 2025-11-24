import React, { useState } from "react";


const Tablero = () => {

    const [tablero, setTablero] = useState(Array(4).fill(Array(4).fill(9)));


    return (
        <div className=" h-60 w-60 flex flex-col justify-between border-2 border-black">
            {tablero.map((fila, indexFila) => (
                <div key={indexFila} className="flex h-full">
                    {fila.map((numero, indexColumna) => (
                        <div key={indexColumna} className="w-full h-full flex items-center justify-center  border border-black">
                            {numero}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Tablero;