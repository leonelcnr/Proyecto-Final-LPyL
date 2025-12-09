<?php

require_once __DIR__ . '/../../config/config.php';

use App\Controladores\RankingControlador;

$controlador = new RankingControlador();
$controlador->rankingGlobal();
