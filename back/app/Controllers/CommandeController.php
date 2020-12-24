<?php

namespace App\Controllers;

use Client;
use Doctrine\DBAL\Types\BooleanType;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Doctrine\ORM\EntityManager;
use App\Controllers\MaillotController;

class CommandeController
{
    private $em;
    private $maillotController;

    public function __construct(EntityManager $em, MaillotController $m)
    {
        $this->em = $em;
        $this->maillotController = $m;
    }


    public function setCommande(Client $client, int $total): string
    {
        $commande = new \Commande;
        $c = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 1);
        $code = strtoupper(uniqid('#'. $c)); // génère un code de commande unique
        $commande->setCodecommande($code);
        $commande->setIdclient($client);
        $commande->setDatecommande(new \DateTime(date('Y-m-d H:i:s')));
        $commande->setTotal($total);
        $this->em->persist($commande);
        $this->em->flush();

        return $code;
    }

    public function getTotalLignesCommandes($lignes): int
    {
        $total = 0;
        foreach ($lignes as $l) {
            $ligne = new \LigneCommande;
            $maillotRepo = $this->em->getRepository('Maillot');
            $maillot = $maillotRepo->find($l['idMaillot']);
            if ($maillot == null) return 0; // maillot introuvable
            $total += $maillot->getPrix() * $l['quantite'];
        }
        return $total;
    }

    public function creationCommande(Request $request, Response $response, array $args): Response
    {
        $body = $request->getParsedBody();
        $idClient = $body['idClient'] ?? "";
        $total = $body['total'] ?? "";
        $json = $body['lignesCommande'] ?? "";
        $lignesCommandes = json_decode($json, true);

        $clientRepo = $this->em->getRepository('Client');
        $client = $clientRepo->find($idClient);

        if ($total != $this->getTotalLignesCommandes($lignesCommandes) || $total == 0) return $response->withStatus(401);
        if ($client == null) return $response->withStatus(401); // utilisateur introuvable
        if ($total <= 0) return $response->withStatus(401); // total commande erronée

        $code = $this->setCommande($client, $total);

        $commandeRepo = $this->em->getRepository('Commande');
        $commande = $commandeRepo->findOneBy(["codecommande" => $code]);

        if ($commande == null) return $response->withStatus(401); // erreur création commande

        if (!$this->setLignesCommande($commande->getIdcommande(), $lignesCommandes)) return $response->withStatus(401);
        $result = [
          "success" => "true",
          "codeCommande" => ltrim($code, $code[0] )
        ];


        $response->getBody()->write(json_encode($result));
        return $response->withStatus(200);
    }

    public function setLignesCommande(Int $idCommande, array $lignes): bool
    {
        $commandeRepo = $this->em->getRepository('Commande');
        $commande = $commandeRepo->find($idCommande);

        if ($commande == null) return false;

        foreach ($lignes as $l) {
            $ligne = new \LigneCommande;
            $maillotRepo = $this->em->getRepository('Maillot');
            $maillot = $maillotRepo->find($l['idMaillot']);
            if ($maillot == null) return false; // maillot introuvable
            if (!$this->maillotController->checkStock($maillot, $l['quantite'])) return false; // pas assez de stock
            $ligne->setIdcommande($commande);
            $ligne->setIdmaillot($maillot);
            $ligne->setQuantite($l['quantite']);
            $this->em->persist($ligne);
            $this->em->flush();
        }
        return true;
    }

    public function getLignesCommande(int $idCommande)
    {
        $ligneCommandeRepo = $this->em->getRepository('LigneCommande');
        $lignes = $ligneCommandeRepo->findBy([
            'idcommande' => $idCommande,
        ]);

        $result = [];
        foreach ($lignes as $l) {
            array_push($result, [
                "id" => $l->getIdlignecommande(),
                "maillot" => [
                    "id" => $l->getIdmaillot()->getIdmaillot(),
                    "nom" => $l->getIdmaillot()->getNom(),
                    "type" => $l->getIdmaillot()->getType(),
                    "saison" => $l->getIdmaillot()->getSaison(),
                    "image" => $l->getIdmaillot()->getImage(),
                    "prix" => $l->getIdmaillot()->getPrix(),
                    "stock" => $l->getIdmaillot()->getStock(),
                    "marque" => $l->getIdmaillot()->getIdmarque()->getNom(),
                    "equipe" => $l->getIdmaillot()->getIdequipe()->getNom()
                ],
                "total" => $l->getIdmaillot()->getPrix() * $l->getQuantite(),
                "quantite" => $l->getQuantite(),
            ]);
        }

        return $result;
    }

    public function getCommande(Request $request, Response $response, array $args): Response
    {
        $codeCommande = $args['id'] ?? "";

        $commandesRepo = $this->em->getRepository('Commande');
        $commande = $commandesRepo->findOneBy([
            'codecommande' => '#'. $codeCommande,
        ]);

        if ($commande == null) return $response->withStatus(401);

        $result = [
            "idCommande" => $commande->getIdcommande(),
            "codeCommande" => $commande->getCodecommande(),
            "idClient" => $commande->getIdclient()->getIdclient(),
            "totalCommande" => $commande->getTotal(),
            "lignesCommande" => $this->getLignesCommande($commande->getIdcommande()),
        ];


        $response->getBody()->write(json_encode($result));
        return $response->withStatus(200);
    }

    public function getCommandes(Request $request, Response $response, array $args): Response
    {
        $idClient = $args['id'] ?? "";

        $commandesRepo = $this->em->getRepository('Commande');
        $commandes = $commandesRepo->findBy(
            ['idclient' => $idClient],
            ['idcommande' => 'DESC']);

        if ($commandesRepo == null) return $response->withStatus(401);

        $result = [];

        foreach ($commandes as $commande) {
            $quantite = 0;
            foreach ($this->getLignesCommande($commande->getidCommande()) as $ligne)
                $quantite += $ligne['quantite'];

            array_push($result, [
                "idCommande" => $commande->getidCommande(),
                "codeCommande" => $commande->getcodeCommande(),
                "totalCommande" => $commande->getTotal(),
                "dateCommande" => $commande->getdateCommande(),
                "quantiteCommande" => $quantite,
                "lignesCommandes" => $this->getLignesCommande($commande->getidCommande()),
                "idClient" => $commande->getidClient()->getIdClient()
            ]);
        }

        $response->getBody()->write(json_encode($result));
        return $response->withStatus(200);
    }
}
