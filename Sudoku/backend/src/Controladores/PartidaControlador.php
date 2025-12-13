<?php

namespace App\Controladores;

use App\Servicios\SudokuServicio;
use App\Modelos\Partida;
use App\Database\PartidaBD;


class PartidaControlador
{
    private $partidaBD;

    public function __construct()
    {
        $this->partidaBD = new PartidaBD();
    }

    public function nuevaPartida()
    {
        $dificultad = $_GET['dificultad'] ?? 'facil';

        if (!isset($_SESSION['usuario_id'])) {
            http_response_code(401);
            echo json_encode([
                'ok'      => false,
                'mensaje' => "No autenticado",
            ]);
            return;
        }

        $sudokuServicio = new SudokuServicio();
        $tablero = $sudokuServicio->generarPartida($dificultad);
        echo json_encode($tablero);
    }


    public function verificarPartida()
    {
        if (!isset($_SESSION['usuario_id'])) {
            http_response_code(401);
            echo json_encode([
                'ok'      => false,
                'mensaje' => "No autenticado",
            ]);
            return;
        }

        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);

        $usuarioId = $_SESSION['usuario_id'];
        $dificultad = $data['dificultad'] ?? '';
        $tablero = $data['tablero'] ?? '';
        $tiempo = $data['tiempo'] ?? '';


        $validador = new SudokuServicio();
        $valido = $validador->verificarPartida($usuarioId, $tablero, $dificultad, $tiempo);



        if (!$valido) {
            echo json_encode([
                'valido'      => false,
                'mensaje' => "El tablero no es válido, vuelve a intentarlo",
            ]);
            return;
        }

        http_response_code(200);
        echo json_encode([
            'valido'      => true,
            'mensaje' => "Tablero válido",
        ]);
    }
}
