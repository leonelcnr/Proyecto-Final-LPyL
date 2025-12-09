// src/componentes/Ranking.jsx
import React from "react";
import formatearTiempo from "../utils/formatearTiempo.js";

const getBadgeClasses = (dificultad) => {
    const d = (dificultad || "").toLowerCase();

    if (d === "dificil") {
        return "bg-red-500/20 text-red-300 border border-red-500/40";
    }
    if (d === "medio") {
        return "bg-amber-500/20 text-amber-300 border border-amber-500/40";
    }
    return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
};

const formatFecha = (fecha) => {
    if (!fecha) return "";
    const iso = fecha.replace(" ", "T");
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return fecha;
    return d.toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const Ranking = ({
    partidas,
    titulo = "Ranking",
    mostrarUsuario = false, // 👈 acá decides si se ve el nombre
}) => {
    if (!partidas || partidas.length === 0) {
        return (
            <section className="w-full max-w-3xl mx-auto mt-8 bg-[#090909] border border-slate-800 rounded-2xl shadow-xl px-6 py-5">
                <h2 className="text-xl font-semibold text-slate-100 mb-2">{titulo}</h2>
                <p className="text-sm text-slate-400">
                    Todavía no hay partidas para mostrar.
                </p>
            </section>
        );
    }

    return (
        <section className="w-full max-w-3xl mx-auto mt-8 bg-[#090909] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-100">{titulo}</h2>
                <span className="text-xs text-slate-400 uppercase tracking-wide">
                    Mejores {partidas.length} partidas
                </span>
            </header>

            <ul className="divide-y divide-slate-800">
                {partidas.map((partida) => {
                    const username =
                        partida.usuario ||
                        partida.username ||
                        partida.nombre_usuario ||
                        "";

                    // cambiamos las columnas según si mostramos usuario o no
                    const gridCols = mostrarUsuario
                        ? "grid-cols-[auto,auto,1fr,auto]"
                        : "grid-cols-[auto,1fr,auto]";

                    return (
                        <li
                            key={partida.posicion + "-" + username}
                            className={
                                "grid gap-4 px-6 py-3 text-sm text-slate-100 hover:bg-slate-900/80 " +
                                gridCols
                            }
                        >
                            {/* Posición */}
                            <div className="font-semibold text-slate-300 self-center">
                                {partida.posicion}.
                            </div>

                            {/* Usuario (solo ranking global) */}
                            {mostrarUsuario && (
                                <div className="text-xs sm:text-sm text-slate-200 self-center truncate max-w-[120px]">
                                    {username.toUpperCase()}
                                </div>
                            )}

                            {/* Dificultad + tiempo */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={
                                            "px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide " +
                                            getBadgeClasses(partida.dificultad)
                                        }
                                    >
                                        {String(partida.dificultad).toUpperCase()}
                                    </span>

                                    <span className="font-mono text-sm text-slate-100">
                                        {formatearTiempo(partida.tiempo_ms)}
                                    </span>
                                </div>
                            </div>

                            {/* Fecha */}
                            <div className="text-xs text-slate-400 text-right self-center">
                                {formatFecha(partida.jugada_en)}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default Ranking;
