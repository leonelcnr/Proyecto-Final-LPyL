<?php

use App\Sudoku\SudokuGenerador;
use App\Sudoku\SudokuValidador;

class Sudoku
{
    public $sudoku;
    public $pistas;
    public function __construct()
    {
        $this->sudoku = null;
        $this->pistas = null;
    }


    public function nuevoJuego($blancos)
    {
        $this->sudoku = (new SudokuGenerador())->generar($blancos);
        $this->pistas = $this->sudoku['pistas'];
    }

    public function getJuego()
    {
        return [
            'sudoku' => $this->sudoku,
            'pistas' => $this->pistas,
        ];
    }

    // public function verificar($numero, $fila, $columna)
    // {
    //     return (new SudokuValidador())->validar($numero, $fila, $columna);
    // }
}
