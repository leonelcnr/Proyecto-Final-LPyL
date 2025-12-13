
const claseDificultad = (dificultad) => {
    const d = (dificultad || "").toLowerCase();
    switch (d) {
        case "dificil":
            return "dificultadDificil";
        case "medio":
            return "dificultadMedio";
        case "facil":
            return "dificultadFacil";
        default:
            return "";
    }
};

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

const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const iso = fecha.replace(" ", "T");
    const tiempo = new Date(iso);
    const formateador = new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // formato 24 horas
    });

    return formateador.format(tiempo);
};

const Ranking = ({ partidas, titulo = "Ranking" }) => {
    if (!partidas || partidas.length === 0) {
        return (
            <section className="ranking p-6">
                <h2 className="text-xl font-semibold text-slate-100 mb-2 ">{titulo}</h2>
                <p className="text-sm text-slate-400">
                    Todavía no hay partidas para mostrar
                </p>
            </section>
        );
    }

    return (
        <section className="ranking overflow-hidden flex-1">
            <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-100">{titulo}</h2>
                {titulo !== "Ultima partida" && (
                    <span className="text-xs text-slate-400 uppercase ">
                        Mejores {partidas.length} partidas
                    </span>
                )}
            </header>

            <ul className="divide-y divide-slate-800">
                {partidas.map((partida) => {
                    const usuario = partida.usuario == undefined ? undefined : partida.usuario;

                    const gridCols = usuario !== undefined
                        ? "grid-cols-[auto,auto,1fr,auto]"
                        : "grid-cols-[auto,1fr,auto]";

                    return (
                        <li key={partida.posicion + "-" + usuario}
                            className={"grid gap-4 px-6 py-3 text-sm text-slate-100 hover:bg-slate-900/80 " + gridCols}>

                            {partida.posicion !== undefined && (
                                <div className="font-semibold text-slate-300 self-center">
                                    {partida.posicion}.
                                </div>
                            )}

                            {usuario !== undefined && (
                                <div className="text-xs sm:text-sm text-slate-200 self-center truncate max-w-[120px]">
                                    {usuario}
                                </div>
                            )}

                            <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={"px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide " + claseDificultad(partida.dificultad)}>
                                        {String(partida.dificultad).toUpperCase()}
                                    </span>

                                    {partida.tiempo !== undefined && (
                                        <span className="font-mono text-sm text-slate-100">
                                            {formatearTiempo(partida.tiempo)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {partida.estado !== undefined && (
                                <div className="text-xs text-slate-200 self-center px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide ">
                                    {partida.estado}
                                </div>
                            )}

                            <div className="text-xs text-slate-400 text-right self-center">
                                {formatearFecha(partida.jugada_en)}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default Ranking;
