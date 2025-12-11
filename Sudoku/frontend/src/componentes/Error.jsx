const Error = ({ error }) => {
    return (
        <p className="absolute top-10 z-10 w-full max-w-md text-center text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}</p>
    );
};
export default Error;