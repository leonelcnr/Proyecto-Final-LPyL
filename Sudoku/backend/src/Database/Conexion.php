<?php

namespace App\Database;

use PDO;
use PDOException;

class Conexion
{
    private static ?PDO $pdo = null;

    public static function getConexion(): PDO
    {
        // Si ya tenemos la conexión creada, la reutilizamos
        if (self::$pdo !== null) {
            return self::$pdo;
        }

        // configuracion de la base de datos
        $config = require BASE_PATH . '/config/database.php';

        $driver   = $config['driver'];
        $host     = $config['host'];
        $port     = $config['port'];
        $dbname   = $config['dbname'];
        $charset  = $config['charset'];
        $username = $config['username'];
        $password = $config['password'];

        $dsn = "{$driver}:host={$host};port={$port};dbname={$dbname};charset={$charset}";

        try {
            self::$pdo = new PDO($dsn, $username, $password, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'ok'      => false,
                'mensaje' => 'Error de conexión a la base de datos',
                'error'   => $e->getMessage(),
            ]);
            exit;
        }

        return self::$pdo;
    }
}
