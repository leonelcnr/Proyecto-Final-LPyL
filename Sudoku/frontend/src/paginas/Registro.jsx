import AuthLayout from "../componentes/auth/Formulario";
import { useNavigate } from "react-router-dom";
import Error from "../componentes/Error";
import { useState } from "react";

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const Registro = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.password = await hashPassword(data.password);

        fetch("/Peticiones/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    navigate('/');
                }
                if (!data.ok) {
                    setError(data.mensaje);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <AuthLayout>
            {error && (<Error error={error} />)}
            <form onSubmit={handleSubmit} className="h-auto w-[400px] items-center flex flex-col justify-center p-6 gap-4">
                <h2 className="w-max text-2xl font-bold efecto relative">Registrarse</h2>
                <div className="flex gap-4">
                    <input name="nombre" className="input-formulario" type="text" placeholder="Nombre" required />
                    <input name="apellido" className="input-formulario" type="text" placeholder="Apellido" required />
                </div>
                <input name="email" className="input-formulario" type="mail" placeholder="Correo" required />
                <input name="usuario" className="input-formulario" type="text" placeholder="Usuario" required />
                <input name="password" className="input-formulario" type="password" placeholder="Contraseña" required />
                <button className="w-full" type="submit">Registrarse</button>
            </form>
            <a onClick={() => navigate('/')}>¿Ya tienes cuenta?</a>
        </AuthLayout>
    );
};

export default Registro;