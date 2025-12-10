<?php

namespace App\Servicios;

use App\Database\RankingBD;

class RankingServicio
{
    public function obtenerRankingUsuario($usuarioId)
    {
        $rankingBD = new RankingBD();
        return $rankingBD->obtenerRankingUsuario($usuarioId);
    }

    public function obtenerRankingGlobal($dificultad)
    {
        $rankingBD = new RankingBD();
        return $rankingBD->obtenerRankingGlobal($dificultad);
    }
}
