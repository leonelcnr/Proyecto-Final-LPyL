const Celda = ({ numero, esPista, cambioNumero }) => {

    const handleChange = (e) => {
        if (esPista) return;

        const valor = e.target.value;
        const ultimo = valor.slice(-1);

        console.log(ultimo);
        if (ultimo === "") {
            cambioNumero(0); // vacío  0
        } else if (ultimo >= "1" && ultimo <= "4") {
            cambioNumero(Number(ultimo)); // solo 1 a 4
        }
    };

    const seleccionarNumero = (e) => {
        if (esPista) return;
        e.target.select(); // selecciona el número actual para que se reemplace
    };

    const className = esPista ? 'celdaFija' : 'celdaNormal';


    return (
        <div className="w-28 h-28 flex items-center justify-center celda">
            <input type="text"
                className={className}
                maxLength={2}
                value={numero === 0 ? "" : numero}
                inputMode="numeric"
                onChange={handleChange}
                onClick={seleccionarNumero}
                disabled={esPista}
                readOnly={esPista}
            />
        </div>
    );
}

export default Celda;