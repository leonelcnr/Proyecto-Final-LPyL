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
    private $validador;

    public function __construct()
    {
        $this->partidaBD = new PartidaBD();
        $this->generador = new SudokuGenerador();
        $this->validador = new SudokuValidador();
    }

    public function generarPartida($dificultad)
    {
        $tablero = $this->generador->generar($dificultad);
        return $tablero;
    }


    public function verificarPartida($usuarioId, $tablero, $dificultad, $tiempo)
    {
        $valido = $this->validador->validarSudoku($tablero);

        if (!$valido) {
            return false;
        }

        $partida = new Partida(null, $usuarioId, $dificultad, $tiempo, date('Y-m-d H:i:s'));
        $this->partidaBD->guardarPartida($partida);

        return true;
    }
}
