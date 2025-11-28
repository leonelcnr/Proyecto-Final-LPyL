<?php 
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');

$usuarios = [
    ["id" => 1, "nombre" => "Leo"],
    ["id" => 2, "nombre" => "Nati"],
];
echo json_encode($usuarios);
?>