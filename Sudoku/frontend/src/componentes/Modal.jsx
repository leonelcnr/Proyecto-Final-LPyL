
const Modal = ({ estaAbierto, titulo, children }) => {
    if (!estaAbierto) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div
                className="flex flex-col items-center justify-center gap-4 bg-zinc-900 rounded-lg p-8 min-w-[400px] min-h-[400px] relative"
                onClick={(e) => e.stopPropagation()}>

                {titulo && <h2 className="text-xl font-semibold mb-4">{titulo}</h2>}
                {children}
            </div>
        </div>
    );
}

export default Modal;
