<?php

namespace App\Controladores;

use App\Servicios\SudokuServicio;

class PartidaControlador
{
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

        $usuarioId = $_SESSION['usuario_id'];
        $sudokuServicio = new SudokuServicio();
        $tablero = $sudokuServicio->iniciarPartida($usuarioId, $dificultad);
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
        $tablero = $data['tablero'] ?? '';
        $tiempo = $data['tiempo'] ?? '';


        $validador = new SudokuServicio();
        $valido = $validador->verificarPartida($usuarioId, $tablero, $tiempo);


        if (!$valido) {
            echo json_encode([
                'valido'      => false,
                'mensaje' => "Tablero inválido",
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
