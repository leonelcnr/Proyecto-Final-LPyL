<?php

namespace App\Controladores;

use App\Servicios\AuthServicio;

class AuthControlador
{
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

        if (strlen($password) < 8) {
            echo json_encode([
                'ok'      => false,
                'mensaje' => "Password debe tener al menos 8 caracteres",
            ]);
            return;
        }
        $autentificacion = new AuthServicio();
        try {
            $usuario = $autentificacion->registrar($nombre, $apellido, $usuario, $email, $password);
            echo json_encode([
                'ok'      => true,
                'usuario' => [
                    'id'       => $usuario->getId(),
                    'nombre'   => $usuario->getNombre(),
                    'apellido' => $usuario->getApellido(),
                    'usuario' => $usuario->getUsuario(),
                    'email'    => $usuario->getEmail(),
                ],
            ]);
        } catch (\RuntimeException $e) {
            echo json_encode([
                'ok'      => false,
                'mensaje' => $e->getMessage(),
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
                'ok'      => false,
                'mensaje' => "Todos los campos son obligatorios",
            ]);
            return;
        }
        $session_id = session_id();
        $_SESSION['session_id'] = $session_id;

        $autentificacion = new AuthServicio();
        try {
            $usuario = $autentificacion->login($usuario, $password);
            $_SESSION['usuario_id'] = $usuario->getId();
            echo json_encode([
                'ok'      => true,
                'usuario' => [
                    'id'       => $usuario->getId(),
                    'nombre'   => $usuario->getNombre(),
                    'apellido' => $usuario->getApellido(),
                    'email'    => $usuario->getEmail(),
                    'usuario' => $usuario->getUsuario(),
                    'session_id' => $session_id,
                ],
            ]);
        } catch (\RuntimeException $e) {
            echo json_encode([
                'ok'      => false,
                'mensaje' => $e->getMessage(),
            ]);
        }
    }
}
