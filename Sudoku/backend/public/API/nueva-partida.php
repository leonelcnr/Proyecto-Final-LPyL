<?php
require_once __DIR__ . '/../../config/config.php';

use App\Controladores\PartidaControlador;

// $controlador = new PartidaControlador();
// $controlador->nuevaPartida();
echo json_encode([[1, 1, 1, 0], [1, 1, 0, 1], [1, 1, 0, 1], [0, 0, 0, 0]]);
