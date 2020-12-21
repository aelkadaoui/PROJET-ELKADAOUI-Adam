<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Doctrine\ORM\EntityManager;

class MarqueController
{
    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function getMarques(Request $request, Response $response, array $args): Response
    {

        $marqueRepo = $this->em->getRepository('Marque');
        $marques = $marqueRepo->findBy(array(), array('nom' => 'ASC'));

        if ($marques == null) {
            $response->getBody()->write(json_encode(['success' => false]));
            return $response->withStatus(401);
        }

        $result = [];

        foreach ($marques as $marque) {
            array_push($result, [
                "id" => $marque->getIdmarque(),
                "nom" => $marque->getNom()
            ]);
        }

        $response->getBody()->write(json_encode($result));
        return $response->withStatus(200);
    }
}
