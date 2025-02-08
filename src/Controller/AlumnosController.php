<?php
namespace App\Controller;

use App\Entity\Alumnos;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class AlumnosController extends AbstractController
{
    #[Route('/alumnos', name: 'getAll_Alumno', methods: ['GET'])]
    public function getAll(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $alumnos = $em->getRepository(Alumnos::class)->findAll();
        $data = $serializer->serialize($alumnos, 'json');

        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/alumnos/{id}', name: 'find_alumno', methods: ['GET'])]
    public function getOne(EntityManagerInterface $em, int $id): Response
    {
        $alumnos = $em->getRepository(Alumnos::class)->find($id);

        return $this->json($alumnos, Response::HTTP_OK);
    }

    #[Route('/alumnos/create', name: 'create_alumnos', methods: ['POST'])]
    public function create(EntityManagerInterface $en, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        // Verificar si los datos requeridos están presentes
        if (!isset($data['dni'], $data['name'], $data['phone'], $data['address'])) {
            return new JsonResponse(['error' => 'Todos los campos son obligatorios'], Response::HTTP_BAD_REQUEST);
        }
    
        // Crear el nuevo alumno
        $alumno = new Alumnos();
        $alumno->setDni($data['dni']);
        $alumno->setName($data['name']);
        $alumno->setPhone($data['phone']);
        $alumno->setAddress($data['address']);
    
        // Guardar en la base de datos
        $en->persist($alumno);
        $en->flush();
    
        // Retornar los datos del alumno creado
        return $this->json([
            'id' => $alumno->getId(),
            'dni' => $alumno->getDni(),
            'name' => $alumno->getName(),
            'phone' => $alumno->getPhone(),
            'address' => $alumno->getAddress()
        ], Response::HTTP_CREATED);
    }

    #[Route('/alumnos/edit/{id}', name: 'update_alumno', methods: ['PATCH'])]
    public function update(EntityManagerInterface $en, int $id, Request $request): JsonResponse
    {
        $alumnos = $en->getRepository(Alumnos::class)->find($id);

        if ($alumnos === null) {
            return new Response('Producto no encontrado', 404);
        }

        $data = json_decode($request->getContent(), true);
    
        // Verificar si los datos requeridos están presentes
        if (!isset($data['dni'], $data['name'], $data['phone'], $data['address'])) {
            return new JsonResponse(['error' => 'Todos los campos son obligatorios'], Response::HTTP_BAD_REQUEST);
        }
        $alumnos->setDni($data['dni']);
        $alumnos->setName($data['name']);
        $alumnos->setPhone($data['phone']);
        $alumnos->setAddress($data['address']);

        $en->persist($alumnos);
        $en->flush();

        return $this->json([
            'id' => $alumnos->getId(),
            'dni' => $alumnos->getDni(),
            'name' => $alumnos->getName(),
            'phone' => $alumnos->getPhone(),
            'address' => $alumnos->getAddress()
        ], Response::HTTP_CREATED);
    }

    #[Route('/alumnos/remove/{id}', name:'delete_alumno', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $en, int $id): Response
    {
        $alumnos = $en->getRepository(Alumnos::class)->find($id);
        if ($alumnos === null) {
            return new Response('No existe el alumno en el sistema',404);
        }
        $en->remove($alumnos);
        $en->flush();
        return $this->json($alumnos, Response::HTTP_NO_CONTENT);
    }
}