<?php

namespace App\Controladores;

use App\Servicios\AuthServicio;
use App\Modelos\Usuario;
use App\Database\UsuarioBD;

class AuthControlador
{
    private $usuarioBD;

    public function __construct()
    {
        $this->usuarioBD = new UsuarioBD();
    }


    public function registrar()
    {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);

        $nombre = htmlspecialchars(trim($data['nombre'])) ?? '';
        $apellido = htmlspecialchars(trim($data['apellido'])) ?? '';
        $email = htmlspecialchars(trim($data['email'])) ?? '';
        $usuario = htmlspecialchars(trim($data['usuario'])) ?? '';
        $password = htmlspecialchars(trim($data['password'])) ?? '';

        if (empty($nombre) || empty($apellido) || empty($email) || empty($usuario) || empty($password)) {
            echo json_encode([
                'ok'      => false,
                'mensaje' => "Todos los campos son obligatorios",
            ]);
            return;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode([
                'ok'      => false,
                'mensaje' => "Email invalido",
            ]);
            return;
        }

        try {

            // if ($this->usuarioBD->buscarPorEmail($email)) {
            //     throw new \RuntimeException("El email ya esta en uso");
            // }

            if ($this->usuarioBD->buscarPorUsername($usuario)) {
                throw new \RuntimeException("El username ya esta en uso");
            }

            $usuarioObjeto = new Usuario(null, $nombre, $apellido, $usuario, $email, $password);
            $this->usuarioBD->crear($usuarioObjeto);

            echo json_encode([
                "ok" => true,
                "mensaje" => "Usuario registrado correctamente",
            ]);
        } catch (\RuntimeException $e) {
            echo json_encode([
                "ok" => false,
                "mensaje" => $e->getMessage(),
            ]);
        }
    }


    public function login()
    {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);

        $usuario = htmlspecialchars(trim($data['usuario'])) ?? '';
        $password = htmlspecialchars(trim($data['password'])) ?? '';



        if (($usuario === '') || ($password === '')) {
            echo json_encode([
                'mensaje' => "Todos los campos son obligatorios",
            ]);
            return;
        }
        $session_id = session_id();
        $_SESSION['session_id'] = $session_id;

        try {
            $usuarioObjeto = $this->usuarioBD->buscarPorUsername($usuario);

            if (!$usuarioObjeto) {
                throw new \RuntimeException("Usuario no encontrado");
            }
            if ($password !== $usuarioObjeto->getPassword()) {
                throw new \RuntimeException("Contraseña incorrecta");
            };


            $_SESSION['usuario_id'] = $usuarioObjeto->getId();
            echo json_encode([
                "ok" => true,
                "mensaje" => "Usuario logueado correctamente",
            ]);
        } catch (\RuntimeException $e) {
            echo json_encode([
                "ok" => false,
                "mensaje" => $e->getMessage(),
            ]);
        }
    }


    public function logout()
    {

        session_unset();
        session_destroy();

        echo json_encode([
            "ok" => true,
            "mensaje" => "Sesión cerrada correctamente"
        ]);
    }
}
