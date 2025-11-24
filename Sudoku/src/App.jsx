import { Routes, Route, Link } from 'react-router-dom';
import Inicio from './paginas/Inicio.jsx';
import Juego from './paginas/Juego.jsx';
import Login from './paginas/Login.jsx';
import Registro from './paginas/Registro.jsx';

const App = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="p-4 bg-slate-800 text-white flex gap-4">
                <Link to="/">Inicio</Link>
                <Link to="/jugar">Jugar</Link>
                <Link to="/login">Login</Link>
                <Link to="/registro">Registro</Link>
            </nav>

            <main className="flex-1 p-4">
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/jugar" element={<Juego />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
