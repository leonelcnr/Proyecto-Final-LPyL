<?php

namespace App\Controladores;

use App\Database\RankingBD;

class RankingControlador
{
    private $rankingBD;

    public function __construct()
    {
        $this->rankingBD = new RankingBD();
    }

    public function rankingUsuario()
    {
        $usuarioId = $_SESSION['usuario_id'];
        $resultado = $this->rankingBD->obtenerRankingUsuario($usuarioId);

        $ranking = [];
        $posicion = 0;
        foreach ($resultado as $partida) {
            $posicion++;
            $ranking[] = [
                'posicion' => $posicion,
                'dificultad' => $partida->getDificultad(),
                'tiempo' => $partida->getTiempo(),
                'jugada_en' => $partida->getFecha(),
            ];
        }

        echo json_encode($ranking);
    }

    public function rankingGlobal()
    {
        $filas = $this->rankingBD->obtenerRankingGlobal($_GET['dificultad']);

        $ranking = [];
        $posicion = 0;

        foreach ($filas as $fila) {
            $posicion++;
            $ranking[] = [
                'posicion'   => $posicion,
                'usuario'    => $fila['usuario'],
                'dificultad' => $fila['dificultad'],
                'tiempo'  => $fila['tiempo_ms'],
                'jugada_en'  => $fila['jugada_en'],
            ];
        }

        header('Content-Type: application/json');
        echo json_encode($ranking);
    }
}
