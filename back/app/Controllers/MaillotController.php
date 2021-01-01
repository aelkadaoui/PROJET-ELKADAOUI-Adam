<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Doctrine\ORM\EntityManager;

class MaillotController
{
    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function getMaillots(Request $request, Response $response, array $args): Response
    {

        $maillotRepo = $this->em->getRepository('Maillot');
        $maillots = $maillotRepo->findAll();

        if ($maillots == null) {
            $response->getBody()->write(json_encode(['success' => false]));
            return $response->withStatus(401);
        }

        $result = [];

        foreach ($maillots as $maillot) {
            array_push($result, [
                "id" => $maillot->getIdmaillot(),
                "nom" => $maillot->getNom(),
                "type" => $maillot->getType(),
                "saison" => $maillot->getSaison(),
                "image" => $maillot->getImage(),
                "prix" => $maillot->getPrix(),
                "stock" => $maillot->getStock(),
                "marque" => $maillot->getIdmarque()->getNom(),
                "equipe" => $maillot->getIdequipe()->getNom()
            ]);
        }

        shuffle($result);
        $response->getBody()->write(json_encode($result));
        return $response->withStatus(200);
    }

    public function getMaillot(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'] ?? "";

        if (!preg_match("/[0-9]/", $id)) return $response->withStatus(200);

        $maillotRepo = $this->em->getRepository('Maillot');
        $maillot = $maillotRepo->findOneBy([
            'idMaillot' => $id,
        ]);

        if ($maillot == null) {
            $response->getBody()->write(json_encode(['success' => false]));
            return $response->withStatus(401);
        }

        $result = [
            "id" => $maillot->getIdmaillot(),
            "nom" => $maillot->getNom(),
            "type" => $maillot->getType(),
            "saison" => $maillot->getSaison(),
            "image" => $maillot->getImage(),
            "prix" => $maillot->getPrix(),
            "stock" => $maillot->getStock(),
            "marque" => $maillot->getIdmarque()->getNom(),
            "equipe" => $maillot->getIdequipe()->getNom()
        ];

        $response->getBody()->write(json_encode($result));
        return $response->withStatus(200);
    }

    public function setStockMaillot(\Maillot $maillot, int $quantiteCommande): void
    {
        $maillot->setStock($maillot->getStock() - $quantiteCommande);
        $this->em->persist($maillot);
        $this->em->flush();
    }

    public function checkStock(\Maillot $maillot, int $quantiteCommande): bool
    {
        if ($maillot->getStock() - $quantiteCommande >= 0) {
            $this->setStockMaillot($maillot, $quantiteCommande);
            return 1;
        }
        return 0;
    }
}
