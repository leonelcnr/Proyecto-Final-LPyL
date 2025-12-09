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
            $consulta = "INSERT INTO partidas_jugadas (usuario_id, dificultad, tiempo_ms, jugada_en, estado) 
        VALUES (:usuario_id, :dificultad, :tiempo_ms, :jugada_en, :estado)";

            $stmt = $this->bd->prepare($consulta);
            $stmt->execute([
                'usuario_id' => $partida->getUsuarioId(),
                'dificultad' => $partida->getDificultad(),
                'tiempo_ms' => $partida->getTiempo(),
                'jugada_en' => $partida->getFecha(),
                'estado' => $partida->getEstado(), // ganada o abandonada
            ]);

            $partida->setId($this->bd->lastInsertId());
            return $partida;
        }
    }

    public function obtenerUltimaPartida($usuarioId): ?Partida //Devuelve la ultima partida jugada por el usuario
    {
        $sql = "SELECT id, usuario_id, dificultad, tiempo_ms, jugada_en, estado
                FROM partidas_jugadas
                WHERE usuario_id = :usuario_id
                ORDER BY jugada_en DESC
                LIMIT 1";

        $stmt = $this->bd->prepare($sql);
        $stmt->execute(['usuario_id' => $usuarioId]);
        $row = $stmt->fetch();

        if (!$row) return null;

        $partida = new Partida($row['id'], $row['usuario_id'], $row['dificultad'], $row['tiempo_ms'], $row['jugada_en'], $row['estado']);

        return $partida;
    }

    public function marcarPartidaGanada($partidaId, $tiempoMs)
    {

        $sql = "UPDATE partidas_jugadas
            SET estado = 'ganada', tiempo_ms = :tiempo_ms
            WHERE id = :id";

        $stmt = $this->bd->prepare($sql);
        $stmt->execute([
            'tiempo_ms' => $tiempoMs,
            'id'        => $partidaId,
        ]);
    }
}
