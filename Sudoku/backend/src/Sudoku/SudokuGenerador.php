<?php

namespace App\Sudoku;

class SudokuGenerador
{
    private array $grid;

    public function __construct()
    {
        $this->grid = array_fill(0, 4, array_fill(0, 4, 0));
    }

    public function generar(string $dificultad): array
    {
        do {
            $this->grid = array_fill(0, 4, array_fill(0, 4, 0));
            $this->llenarDiagonal();
            $resuelto = $this->resolver();
        } while (!$resuelto);

        $this->quitarCeldas($dificultad);
        $tablero = $this->grid;

        return $tablero;
    }




    // llena las cajas diagonales
    private function llenarDiagonal(): void
    {
        for ($i = 0; $i < 4; $i += 2) {
            $this->llenarCaja($i, $i);
        }
    }


    // llena cajas (SubCuadrados) con numeros aleatorios de 1 a 4
    private function llenarCaja(int $filaInicio, int $colInicio): void
    {
        $nums = range(1, 4);
        shuffle($nums);
        $k = 0;

        for ($i = 0; $i < 2; $i++) {
            for ($j = 0; $j < 2; $j++) {
                $this->grid[$filaInicio + $i][$colInicio + $j] = $nums[$k++];
            }
        }
    }



    private function resolver(): bool
    {
        $fila = 0;
        $col  = 0;

        if (!$this->buscarVacio($fila, $col)) { //trae desde la funcion buscarVacio un 0 
            return true; // no hay huecos -> resuelto
        }

        $nums = range(1, 4);
        shuffle($nums);

        foreach ($nums as $num) {
            if ($this->esSeguro($fila, $col, $num)) {
                $this->grid[$fila][$col] = $num;
                if ($this->resolver()) {
                    return true;
                }
                $this->grid[$fila][$col] = 0;
            }
        }
        return false;
    }

    private function buscarVacio(&$fila, &$col): bool
    {
        for ($i = 0; $i < 4; $i++) {
            for ($j = 0; $j < 4; $j++) {
                if ($this->grid[$i][$j] === 0) {
                    $fila = $i;
                    $col  = $j;
                    return true;
                }
            }
        }
        return false;
    }



    private function esSeguro(int $fila, int $col, int $num): bool
    {
        // Fila
        for ($x = 0; $x < 4; $x++) {
            if ($this->grid[$fila][$x] === $num) return false;
        }

        // Columna
        for ($x = 0; $x < 4; $x++) {
            if ($this->grid[$x][$col] === $num) return false;
        }

        // Caja 3x3
        $filaInicio = $fila - $fila % 2;
        $colInicio = $col - $col % 2;

        for ($i = 0; $i < 2; $i++) {
            for ($j = 0; $j < 2; $j++) {
                if ($this->grid[$filaInicio + $i][$colInicio + $j] === $num) {
                    return false;
                }
            }
        }

        return true;
    }



    // Saca N celdas aleatorias (las pone en 0)
    private function quitarCeldas(string $dificultad): void
    {
        $cantidad = ['facil' => 8, 'medio' => 10, 'dificil' => 12];
        $count = $cantidad[$dificultad];

        while ($count > 0) {
            $cellId = rand(0, 15);   // 0..80
            $fila   = intdiv($cellId, 4);
            $col    = $cellId % 4;

            if ($this->grid[$fila][$col] !== 0) {
                $this->grid[$fila][$col] = 0;
                $count--;
            }
        }
    }
}
