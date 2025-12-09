<?php

namespace App\Modelos;

class Usuario
{
    private $id;
    private $nombre;
    private $apellido;
    private $usuario;
    private $email;
    private $contrasena;

    public function __construct($id, $nombre, $apellido, $usuario, $email, $contrasena)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->usuario = $usuario;
        $this->email = $email;
        $this->contrasena = $contrasena;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getPassword()
    {
        return $this->contrasena;
    }

    public function getApellido()
    {
        return $this->apellido;
    }

    public function getUsuario()
    {
        return $this->usuario;
    }
}
