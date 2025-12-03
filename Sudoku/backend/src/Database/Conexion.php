<?php
// src/Database/Conexion.php
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

        // Leemos la configuración
        $config = require BASE_PATH . '/config/database.php';

        $driver   = $config['driver'];
        $host     = $config['host'];
        $port     = $config['port'];
        $dbname   = $config['dbname'];
        $charset  = $config['charset'];
        $username = $config['username'];
        $password = $config['password'];

        // Creamos el DSN
        $dsn = "{$driver}:host={$host};port={$port};dbname={$dbname};charset={$charset}";

        try {
            self::$pdo = new PDO($dsn, $username, $password, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // errores como excepciones
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // fetch en arrays asociativos
            ]);
        } catch (PDOException $e) {
            // En un TP está bien tirar el error así; en prod se loguea y se muestra mensaje genérico
            http_response_code(500);
            echo json_encode([
                'ok'      => false,
                'mensaje' => 'Error de conexión a la base de datos',
                'error'   => $e->getMessage(), // podés quitar esto si no querés mostrar detalles
            ]);
            exit;
        }

        return self::$pdo;
    }
}
