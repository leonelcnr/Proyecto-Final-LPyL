<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include_once "../../src/Sudoku/SudokuGenerador.php";

use App\Sudoku\SudokuGenerador;

$dificultad = $_GET['dificultad'] ?? 'facil';

$sudoku = new SudokuGenerador();

$sudokuJson = $sudoku->generar($dificultad);

echo json_encode($sudokuJson);
