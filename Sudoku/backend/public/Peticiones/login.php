<?php

require_once __DIR__ . '/../../config/config.php';

use App\Controladores\AuthControlador;

error_log('SESSION ID: ' . session_id());
error_log('SESSION DATA: ' . print_r($_SESSION, true));


$controlador = new AuthControlador();
$controlador->login();
