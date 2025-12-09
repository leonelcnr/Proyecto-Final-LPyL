const formatearTiempo = (tiempoMs) => {
    const ms = Number(tiempoMs) || 0;
    const totalSeg = Math.floor(ms / 1000);
    const minutos = Math.floor(totalSeg / 60);
    const segundos = totalSeg % 60;
    const centesimas = Math.floor((ms % 1000) / 10);

    return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(
        2,
        "0"
    )}.${String(centesimas).padStart(2, "0")}`;
};

export default formatearTiempo;