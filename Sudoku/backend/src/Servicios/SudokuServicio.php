<?php

namespace App\Servicios;

use App\Modelos\Partida;
use App\Database\PartidaBD;
use App\Sudoku\SudokuGenerador;
use App\Sudoku\SudokuValidador;

class SudokuServicio
{
    private $partidaBD;
    private $generador;

    public function __construct()
    {
        $this->partidaBD = new PartidaBD();
        $this->generador = new SudokuGenerador();
    }

    public function iniciarPartida($usuarioId, $dificultad): array
    {
        $tablero = $this->generador->generar($dificultad);
        $partida = new Partida(null, $usuarioId, $dificultad, 0, date('Y-m-d H:i:s'), 'abandonada');
        $this->partidaBD->guardarPartida($partida);
        return $tablero;
    }


    public function verificarPartida(int $usuarioId, $tablero, int $tiempo)
    {
        $valido = SudokuValidador::validarSudoku($tablero);


        if (!$valido) {
            return false;
        }

        $ultimaPartida = $this->partidaBD->obtenerUltimaPartida($usuarioId);
        $this->partidaBD->marcarPartidaGanada($ultimaPartida->getId(), $tiempo);

        return true;
    }
}
