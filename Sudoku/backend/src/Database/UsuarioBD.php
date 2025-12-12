<?php
// src/Database/UsuarioRepositorio.php
namespace App\Database;

use PDO;
use App\Modelos\Usuario;

class UsuarioBD
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Conexion::getConexion();
    }

    public function crear(Usuario $usuario): Usuario
    {
        $sql = "INSERT INTO usuarios (nombre, apellido, email, usuario, password_hash)
                VALUES (:nombre, :apellido, :email, :usuario, :password_hash)";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'nombre'        => $usuario->getNombre(),
            'apellido'      => $usuario->getApellido(),
            'usuario'      => $usuario->getUsuario(),
            'email'         => $usuario->getEmail(),
            'password_hash' => $usuario->getPassword(),
        ]);

        $usuario->setId((int)$this->db->lastInsertId());
        return $usuario;
    }

    // public function buscarPorEmail(string $email): ?Usuario
    // {
    //     $sql = "SELECT id, nombre, apellido, email, username, password_hash
    //             FROM usuarios
    //             WHERE email = :email
    //             LIMIT 1";

    //     $stmt = $this->db->prepare($sql);
    //     $stmt->execute(['email' => $email]);
    //     $row = $stmt->fetch();

    //     return $row ? $this->consultarUsuario($row) : null;
    // }


    public function buscarPorUsername(string $username): ?Usuario
    {
        $sql = "SELECT id, nombre, apellido, email, usuario, password_hash
                FROM usuarios
                WHERE usuario = :usuario
                LIMIT 1";

        $stmt = $this->db->prepare($sql);
        $stmt->execute(['usuario' => $username]);
        $row = $stmt->fetch();

        return $row ? $this->consultarUsuario($row) : null;
    }

    private function consultarUsuario(array $row): Usuario
    {
        $u = new Usuario($row['id'], $row['nombre'], $row['apellido'], $row['usuario'], $row['email'], $row['password_hash']);
        return $u;
    }
}
