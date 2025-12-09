<?php

namespace App\Modelos;

class Partida
{
    private $id;
    private $usuario_id;
    private $dificultad;
    private $tiempo;
    private $fecha;
    private $estado;

    public function __construct($id, $usuario_id, $dificultad, $tiempo, $fecha, $estado)
    {
        $this->id = $id;
        $this->usuario_id = $usuario_id;
        $this->dificultad = $dificultad;
        $this->tiempo = $tiempo;
        $this->fecha = $fecha;
        $this->estado = $estado;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getUsuarioId()
    {
        return $this->usuario_id;
    }

    public function getDificultad()
    {
        return $this->dificultad;
    }

    public function getTiempo()
    {
        return $this->tiempo;
    }

    public function getFecha()
    {
        return $this->fecha;
    }

    public function getEstado()
    {
        return $this->estado;
    }
}
