<?php

namespace  App\Servicios;

use App\Modelos\Usuario;
use App\Database\UsuarioBD;

class AuthServicio
{
    private UsuarioBD $usuarioBD;

    public function __construct()
    {
        $this->usuarioBD = new UsuarioBD();
    }

    public function registrar(string $nombre, string $apellido, string $email, string $usuario, string $password)
    {

        if ($this->usuarioBD->buscarPorEmail($email)) {
            throw new \RuntimeException("El email ya esta en uso");
        }

        if ($this->usuarioBD->buscarPorUsername($usuario)) {
            throw new \RuntimeException("El username ya esta en uso");
        }
        $usuarioBD = new UsuarioBD();
        $usuario = new Usuario(null, $nombre, $apellido, $usuario, $email, $password);
        return $usuarioBD->crear($usuario);
    }



    public function login(string $username, string $password)
    {
        $usuario = $this->usuarioBD->buscarPorUsername($username);

        if (!$usuario) {
            throw new \RuntimeException("Usuario no encontrado");
        }
        if ($password !== $usuario->getPassword()) {
            throw new \RuntimeException("Contraseña incorrecta");
        }
        return $usuario;
    }
}
