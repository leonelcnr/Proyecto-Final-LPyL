<?php

namespace App\Database;

use PDO;
use App\Database\Conexion;
use App\Modelos\Partida;

class RankingBD
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Conexion::getConexion();
    }

    public function obtenerRankingUsuario($usuarioId)
    {
        $consulta = "SELECT *
        FROM partidas_ganadas 
        WHERE usuario_id = :usuario_id
        ORDER BY 
        CASE dificultad
            WHEN 'dificil' THEN 1
            WHEN 'medio'   THEN 2
            WHEN 'facil'   THEN 3
            ELSE 4
        END,
        tiempo_ms ASC,
        jugada_en ASC
        LIMIT 5";

        $stmt = $this->db->prepare($consulta);
        $stmt->execute(['usuario_id' => $usuarioId]);

        $filas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $partidas = [];
        foreach ($filas as $fila) {
            $partidas[] = new Partida(
                $fila['id'],
                $fila['usuario_id'],
                $fila['dificultad'],
                $fila['tiempo_ms'],
                $fila['jugada_en'],
            );
        }

        return $partidas;
    }

    public function obtenerRankingGlobal($dificultad): array
    {
        $consulta = "SELECT 
            p.id,
            p.usuario_id,
            u.usuario     AS usuario,  
            p.dificultad,
            p.tiempo_ms,
            p.jugada_en
        FROM partidas_ganadas p
        INNER JOIN usuarios u ON u.id = p.usuario_id
        WHERE p.dificultad = :dificultad
        ORDER BY 
            p.tiempo_ms ASC,
            p.jugada_en ASC
        LIMIT 5";

        $stmt = $this->db->prepare($consulta);
        $stmt->execute(['dificultad' => $dificultad]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
