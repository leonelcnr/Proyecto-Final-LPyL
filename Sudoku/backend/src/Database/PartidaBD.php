<?php

namespace App\Database;

use App\Modelos\Partida;
use PDO;

class PartidaBD
{
    private PDO $bd;

    public function __construct()
    {
        $this->bd = Conexion::getConexion();
    }

    public function guardarPartida(Partida $partida): Partida
    { {
            $consulta = "INSERT INTO partidas_ganadas (usuario_id, dificultad, tiempo_ms, jugada_en) 
        VALUES (:usuario_id, :dificultad, :tiempo_ms, :jugada_en)";

            $stmt = $this->bd->prepare($consulta);
            $stmt->execute([
                'usuario_id' => $partida->getUsuarioId(),
                'dificultad' => $partida->getDificultad(),
                'tiempo_ms' => $partida->getTiempo(),
                'jugada_en' => $partida->getFecha(),
            ]);

            $partida->setId($this->bd->lastInsertId());
            return $partida;
        }
    }
}
