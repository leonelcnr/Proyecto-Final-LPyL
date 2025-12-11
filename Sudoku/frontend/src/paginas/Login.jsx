import AuthLayout from "../componentes/auth/Formulario";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    async function hashPassword(password) {
        if (password === '') {
            return '';
        }
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const datos = Object.fromEntries(formData);
        datos.password = await hashPassword(datos.password);
        console.log(datos);

        fetch("/API/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(datos),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.ok) {
                    localStorage.setItem('usuario', datos.usuario);
                    navigate('/');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit} className="h-auto w-[400px] items-center flex flex-col justify-center p-6 gap-4">
                <h2 className="w-max text-2xl font-bold efecto relative">Inicio sesion</h2>
                <input name="usuario" className="input-formulario w-72 md:w-full" type="text" placeholder="Usuario" />
                <input name="password" className="input-formulario w-72 md:w-full" type="password" placeholder="Contraseña" />
                <button className="w-72 md:w-full" type="submit">Iniciar Sesión</button>
            </form>
            <a onClick={() => navigate('/registro')}>¿No tienes cuenta?</a>
        </AuthLayout>
    );
};

export default Login;