import AuthLayout from "../componentes/auth/Formulario";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <AuthLayout>
            <form className="h-auto w-[400px] items-center flex flex-col justify-center p-6 gap-4">
                <h2 className="w-max text-2xl font-bold efecto relative">Inicio sesion</h2>
                <input className="input-formulario" type="text" placeholder="Usuario" />
                <input className="input-formulario" type="password" placeholder="Contraseña" />
                <button className="w-full" type="submit">Iniciar Sesión</button>
            </form>
            <a onClick={() => navigate('/registro')}>¿No tienes cuenta?</a>
        </AuthLayout>
    );
};

export default Login;