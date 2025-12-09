<?php

require_once __DIR__ . '/../../config/config.php';


use App\Controladores\AuthControlador;

$controlador = new AuthControlador();
$controlador->registrar();
