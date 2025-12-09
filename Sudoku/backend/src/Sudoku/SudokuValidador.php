<?php

namespace App\Sudoku;

class SudokuValidador
{
    public static function validarSudoku($sudoku): bool
    {

        // agregar funcion para validar si el sudoku tiene cosas incompletas

        // Validar que el sudoku tenga 4 filas y 4 columnas
        for ($i = 0; $i < 4; $i++) {
            for ($j = 0; $j < 4; $j++) {
                if ($sudoku[$i][$j] < 1 || $sudoku[$i][$j] > 4) {
                    return false;
                }
            }
        }

        // valida filas
        for ($i = 0; $i < 4; $i++) {
            if (!self::grupoValido($sudoku[$i])) {
                return false;
            }
        }

        // valida columnas
        for ($i = 0; $i < 4; $i++) {
            if (!self::grupoValido(array_column($sudoku, $i))) {
                return false;
            }
        }

        // hace falta comprobar los cuadrados
        for ($boxRow = 0; $boxRow < 2; $boxRow++) {
            for ($boxCol = 0; $boxCol < 2; $boxCol++) {

                $bloque = [];
                for ($i = 0; $i < 2; $i++) {
                    for ($j = 0; $j < 2; $j++) {
                        $bloque[] = $sudoku[$boxRow * 2 + $i][$boxCol * 2 + $j];
                    }
                }

                if (!self::grupoValido($bloque)) {
                    return false;
                }
            }
        }
        return true;
    }

    //valida que el grupo tenga valores validos no repetidos
    private static function grupoValido(array $grupo): bool
    {
        $valores = array_filter($grupo, fn($v) => $v !== 0 && $v !== null);

        foreach ($valores as $v) {
            if ($v < 1 || $v > 4) {
                return false;
            }
        }

        return count($valores) === count(array_unique($valores));
    }
}
