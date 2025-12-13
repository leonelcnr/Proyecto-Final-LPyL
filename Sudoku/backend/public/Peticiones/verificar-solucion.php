<?php

require_once __DIR__ . '/../../config/config.php';

use App\Controladores\PartidaControlador;

$controlador = new PartidaControlador();
$controlador->verificarPartida();
