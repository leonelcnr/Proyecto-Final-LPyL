import { Routes, Route, Link } from 'react-router-dom';
import Inicio from './paginas/Inicio.jsx';
import Juego from './paginas/Juego.jsx';
import Login from './paginas/Login.jsx';
import Registro from './paginas/Registro.jsx';

const App = () => {
    return (
        <div className="h-dvh flex flex-col ">

            <main className="flex-1 px-6 py-12 w-screen h-full relative">
                <header>
                    <h1 className=" min-h-12 text-4xl font-bold efecto absolute left-12">Sudoku</h1>
                </header>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/jugar/:dificultad" element={<Juego />} />
                    <Route path="/registro" element={<Registro />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
