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

session_start(); // podria cargar guardar el usuario actual
