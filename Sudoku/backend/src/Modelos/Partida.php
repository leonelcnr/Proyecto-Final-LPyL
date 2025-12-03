<?php

class Partida
{
    private $id;
    private $usuario_id;
    private $dificultad;
    private $tiempo;
    private $fecha;

    public function __construct($id, $usuario_id, $dificultad, $tiempo, $fecha)
    {
        $this->id = $id;
        $this->usuario_id = $usuario_id;
        $this->dificultad = $dificultad;
        $this->tiempo = $tiempo;
        $this->fecha = $fecha;
    }
}
