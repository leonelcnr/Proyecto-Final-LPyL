const Celda = ({ numero, fila, col, onChangeCelda }) => {
    const handleChange = (e) => {
        const valor = e.target.value;

        if (valor === "") {
            onChangeCelda(fila, col, 0); // si es vacio, se pone 0
        } else if (valor >= "1" && valor <= "4") {
            onChangeCelda(fila, col, Number(valor)); // si es un numero, se pone el numero
        }
    };
    return (
        <div className="w-20 h-20 flex items-center justify-center  border border-black">
            <input type="text"
                className="w-full h-full text-center focus:outline-none"
                maxLength={1}
                value={numero === 0 ? "" : numero}
                inputMode="numeric"
                onChange={handleChange}
            />
        </div>
    );
}

export default Celda;