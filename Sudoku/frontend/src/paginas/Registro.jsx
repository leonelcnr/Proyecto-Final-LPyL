import AuthLayout from "../componentes/auth/Formulario";
import { useNavigate } from "react-router-dom";

const Registro = () => {
    const navigate = useNavigate();
    return (
        <AuthLayout>
            <form className="h-auto w-[400px] items-center flex flex-col justify-center p-6 gap-4">
                <h2 className="w-max text-2xl font-bold efecto relative">Registrarse</h2>
                <div className="flex gap-4">
                    <input className="input-formulario" type="text" placeholder="Nombre" />
                    <input className="input-formulario" type="text" placeholder="Apellido" />
                </div>
                <input className="input-formulario" type="mail" placeholder="Correo" />
                <input className="input-formulario" type="text" placeholder="Usuario" />
                <input className="input-formulario" type="password" placeholder="Contraseña" />
                <button className="w-full" type="submit">Registrarse</button>
            </form>
            <a onClick={() => navigate('/login')}>¿Ya tienes cuenta?</a>
        </AuthLayout>
    );
};

export default Registro;