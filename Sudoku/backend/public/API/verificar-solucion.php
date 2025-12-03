<?php
include_once "../../src/Sudoku/SudokuValidador.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);


if (!isset($data["tablero"]) || !is_array($data["tablero"])) {
    echo json_encode([
        "valido" => false,
    ]);
    exit;
}

$sudoku = $data["tablero"];

if (SudokuValidador::validarSudoku($sudoku)) {
    echo json_encode([
        "valido" => true,
    ]);
} else {
    echo json_encode([
        "valido" => false,
    ]);
}
