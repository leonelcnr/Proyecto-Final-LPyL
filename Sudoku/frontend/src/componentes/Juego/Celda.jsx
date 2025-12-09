const Celda = ({ numero, esPista, onChange }) => {

    const handleChange = (e) => {
        if (esPista) return; // seguridad extra

        const valor = e.target.value;

        if (valor === "") {
            onChange(0); // vacío  0
        } else if (valor >= "1" && valor <= "4") {
            onChange(Number(valor)); // solo 1 a 4
        }
    };

    const className = esPista ? 'celdaFija' : 'celdaNormal';


    return (
        <div className="w-24 h-24 flex items-center justify-center  border border-black">
            <input type="text"
                className={className}
                maxLength={1}
                value={numero === 0 ? "" : numero}
                inputMode="numeric"
                onChange={handleChange}
                disabled={esPista}
                readOnly={esPista}
            />
        </div>
    );
}

export default Celda;