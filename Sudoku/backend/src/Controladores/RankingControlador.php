<?php

namespace App\Controladores;

use App\Servicios\RankingServicio;

class RankingControlador
{
    public function rankingUsuario()
    {
        $usuarioId = $_SESSION['usuario_id'];
        $servicio = new RankingServicio();
        $resultado = $servicio->obtenerRankingUsuario($usuarioId);

        $ranking = [];
        $posicion = 0;
        foreach ($resultado as $partida) {
            $posicion++;
            $ranking[] = [
                'posicion' => $posicion,
                'dificultad' => $partida->getDificultad(),
                'tiempo_ms' => $partida->getTiempo(),
                'jugada_en' => $partida->getFecha(),
            ];
        }

        echo json_encode($ranking);
    }

    public function rankingGlobal()
    {
        $servicio  = new RankingServicio();
        $filas = $servicio->obtenerRankingGlobal($_GET['dificultad']);

        $ranking = [];
        $posicion = 0;

        foreach ($filas as $fila) {
            $posicion++;
            $ranking[] = [
                'posicion'   => $posicion,
                'usuario'    => $fila['usuario'],
                'dificultad' => $fila['dificultad'],
                'tiempo_ms'  => $fila['tiempo_ms'],
                'jugada_en'  => $fila['jugada_en'],
            ];
        }

        header('Content-Type: application/json');
        echo json_encode($ranking);
    }
}
