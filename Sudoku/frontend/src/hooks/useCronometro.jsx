import { useState, useEffect } from "react";

export function useCronometro() {
    const [tiempo, setTiempo] = useState(0);
    const [activo, setActivo] = useState(false);

    useEffect(() => {

        if (!activo) return;

        const intervalo = setInterval(() => {
            setTiempo((prev) => prev + 10);
        }, 10);
        return () => clearInterval(intervalo);
    }, [activo]);

    const iniciar = () => {
        setActivo(true);
    };
    const detener = () => setActivo(false);

    return { tiempo, iniciar, detener, setTiempo };
}