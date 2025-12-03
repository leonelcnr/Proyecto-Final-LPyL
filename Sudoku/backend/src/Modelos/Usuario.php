<?php

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

    public function getContrasena()
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
