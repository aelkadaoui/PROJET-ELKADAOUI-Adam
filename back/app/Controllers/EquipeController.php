<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Doctrine\ORM\EntityManager;

class EquipeController
{
    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function getEquipes(Request $request, Response $response, array $args): Response
    {

        $equipeRepo = $this->em->getRepository('Equipe');
        $equipes = $equipeRepo->findAll();

        if ($equipes == null) {
            $response->getBody()->write(json_encode(['success' => false]));
            return $response->withStatus(401);
        }

        $result = [];

        foreach ($equipes as $equipe) {
            array_push($result, [
                "id" => $equipe->getIdequipe(),
                "nom" => $equipe->getNom(),
                "pays" => $equipe->getPays(),
            ]);
        }

        $response->getBody()->write(json_encode($result));
        return $response->withStatus(200);
    }

    public function getEquipe(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'] ?? "";

        if (!preg_match("/[0-9]/", $id)) return $response->withStatus(200);

        $equipeRepo = $this->em->getRepository('Equipe');
        $equipe = $equipeRepo->findOneBy([
            'idEquipe' => $id,
        ]);

        if ($equipe == null) {
            $response->getBody()->write(json_encode(['success' => false]));
            return $response->withStatus(401);
        }

        $result = [
            "id" => $equipe->getIdequipe(),
            "nom" => $equipe->getNom(),
            "pays" => $equipe->getPays(),
        ];

        $response->getBody()->write(json_encode($result));
        return $response->withStatus(200);
    }
}
