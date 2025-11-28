import React, { useState } from "react";



const Celda = () => {
    const [numero, setNumero] = useState(null);

    const handleChange = (e) => {
        const valor = parseInt(e.target.value);

        if (valor === 0) {
            setNumero(null);
        }

        if (valor >= 1 && valor <= 9) {
            setNumero(valor);
            console.log(typeof valor);
        }
    };

    return (
        <div className="w-20 h-20 flex items-center justify-center  border border-black">
            <input type="text"
                className="w-full h-full text-center focus:outline-none"
                maxLength={1}
                value={numero === null ? "" : numero}
                inputMode="numeric"
                onChange={handleChange}
            />
        </div>
    );
}


const Tablero = () => {

    const [tablero, setTablero] = useState(Array(4).fill(Array(4).fill(null)));


    return (
        <div className=" h-auto w-auto flex flex-col border-2 border-black">
            {tablero.map((fila, indexFila) => (
                <div key={indexFila} className="flex w-full h-full justify-center items-center">
                    {fila.map((numero, indexColumna) => (
                        <Celda key={indexColumna} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Tablero;