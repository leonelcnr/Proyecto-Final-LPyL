<?php

// Mostrar errores en desarrollo
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Rutas base
define('BASE_PATH', dirname(__DIR__));

spl_autoload_register(function ($class) {
    // Ej: App\Controladores\NuevoSudokuControlador
    $class = str_replace('App\\', '', $class);
    $class = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    $file  = BASE_PATH . '/src/' . $class . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

$allowedOrigin = 'http://localhost:5173'; // 👈 origen de tu React (Vite)

if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
    header('Access-Control-Allow-Credentials: true');      // para sesiones/cookies
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
}

// Preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

date_default_timezone_set('America/Argentina/Buenos_Aires');


session_start(); // podria cargar guardar el usuario actual
