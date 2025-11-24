import React, { useState } from "react";

function aceptarNumero(e) {
    const numero = e.target.value;
    if (numero >= 1 && numero <= 9) {
        console.log(numero);
        return numero;
    }
}


const Celda = () => {
    const [numero, setNumero] = useState(null);

    const handleChange = (e) => {
        const valor = e.target.value;
        if (valor >= 1 && valor <= 9) {
            setNumero(valor);
        }
    };

    return (
        <div className="w-20 h-20 flex items-center justify-center  border border-black">
            <input type="text"
                className="w-full h-full text-center focus:outline-none"
                maxLength={1}
                value={numero}
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