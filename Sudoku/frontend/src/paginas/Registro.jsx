import AuthLayout from "../componentes/auth/Formulario";
import { useNavigate } from "react-router-dom";

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // Convierte el hash a un string hexadecimal
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const Registro = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.password = await hashPassword(data.password);
        console.log(data);

        fetch("http://localhost/Final-LPyP/Sudoku/backend/public/API/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    navigate('/login');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit} className="h-auto w-[400px] items-center flex flex-col justify-center p-6 gap-4">
                <h2 className="w-max text-2xl font-bold efecto relative">Registrarse</h2>
                <div className="flex gap-4">
                    <input name="nombre" className="input-formulario" type="text" placeholder="Nombre" />
                    <input name="apellido" className="input-formulario" type="text" placeholder="Apellido" />
                </div>
                <input name="email" className="input-formulario" type="mail" placeholder="Correo" />
                <input name="usuario" className="input-formulario" type="text" placeholder="Usuario" />
                <input name="password" className="input-formulario" type="password" placeholder="Contraseña" />
                <button className="w-full" type="submit">Registrarse</button>
            </form>
            <a onClick={() => navigate('/login')}>¿Ya tienes cuenta?</a>
        </AuthLayout>
    );
};

export default Registro;