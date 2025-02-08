<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "alumnos")]
class Alumnos
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[ORM\GeneratedValue]
    private $id;

    #[ORM\Column(type: "string")]
    private $dni;

    #[ORM\Column(type: "string")]
    private $name;

    #[ORM\Column(type: "string")]
    private $phone;

    #[ORM\Column(type: "string")]
    private $address;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Alumnos
    {
        $this->id = $id;
        return $this;
    }

    public function getDni(): ?string
    {
        return $this->dni;
    }

    public function setDni(?string $dni): Alumnos
    {
        $this->dni = $dni;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): Alumnos
    {
        $this->name = $name;
        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): Alumnos
    {
        $this->phone = $phone;
        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): Alumnos
    {
        $this->address = $address;
        return $this;
    }
}
?>