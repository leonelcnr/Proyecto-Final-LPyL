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
        FROM partidas_jugadas 
        WHERE estado = 'ganada' 
        AND usuario_id = :usuario_id
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
                $fila['estado']
            );
        }

        return $partidas;
    }

    public function obtenerRankingGlobal(): array
    {
        $consulta = "SELECT 
            p.id,
            p.usuario_id,
            u.username     AS usuario,     -- o u.username
            p.dificultad,
            p.tiempo_ms,
            p.jugada_en,
            p.estado
        FROM partidas_jugadas p
        INNER JOIN usuarios u ON u.id = p.usuario_id
        WHERE p.estado = 'ganada'
        ORDER BY 
            CASE p.dificultad
                WHEN 'dificil' THEN 1
                WHEN 'medio'   THEN 2
                WHEN 'facil'   THEN 3
                ELSE 4
            END,
            p.tiempo_ms ASC,
            p.jugada_en ASC
        LIMIT 5";

        $stmt = $this->db->prepare($consulta);
        $stmt->execute();

        // Devolvemos directamente arrays asociativos con todo:
        // [ ['id' => ..., 'usuario_id' => ..., 'usuario' => ..., 'dificultad' => ..., ... ], ... ]
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
