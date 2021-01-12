<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use \Firebase\JWT\JWT;
use Doctrine\ORM\EntityManager;

class UserController
{
    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    private static function createToken(Response $response, string $user_login): Response
    {

        $issuedAt = time();

        $payload = [
            'iat' => $issuedAt,
            'exp' => $issuedAt + 60,
            'userid' => $user_login
        ];

        $token_jwt = JWT::encode($payload, $_ENV['JWT_SECRET'], "HS256");
        $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
        return $response;
    }

    private static function check_fields(array $data): bool
    {
        return (preg_match("/[a-zA-Z]{1,256}/", $data['civilite']) ||
            preg_match("/[A-Za-z]{1,256}/", $data['nom']) ||
            preg_match("/[A-Za-z]{1,256}/", $data['prenom']) ||
            preg_match("/[A-Za-z0-9 ]{1,256}/", $data['adresse']) ||
            preg_match("/[0-9]{10,16}/", ltrim($data['tel'], '+')) ||
            preg_match("/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/", $data['mail']) ||
            preg_match("/[0-9]{5}/", $data['cp']) ||
            preg_match("/[A-Za-z]{1,256}/", $data['ville']) ||
            preg_match("/[A-Za-z]{1,256}/", $data['pays']) ||
            preg_match("/[A-Za-z0-9]{8,256}/", $data['login']) ||
            preg_match("/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,256}/", $data['passwd']));
    }

    public function login(Request $request, Response $response, array $args): Response
    {
        $data = $request->getParsedBody();
        $login = $data['login'] ?? "";
        $password = $data['password'] ?? "";

        $clientRepo = $this->em->getRepository('Client');
        $client = $clientRepo->findOneBy([
            'login' => strtolower($login)
        ]);

        if ($client == null || $client->getPassword() != $password) {
            $response->getBody()->write(json_encode(["success" => false]));
            return $response->withStatus(401);
        }

        $client = [
            'idClient' => $client->getIdclient(),
            'civilite' => $client->getCivilite(),
            'nom' => $client->getNom(),
            'prenom' => $client->getPrenom(),
            'mail' => $client->getEmail(),
            'tel' => $client->getTel(),
            'adresse' => $client->getAdresse(),
            'cp' => $client->getCp(),
            'ville' => $client->getVille(),
            'pays' => $client->getPays(),
            'login' => $client->getLogin(),
            'passwd' => $client->getPassword()
        ];

        $result = [
            'success' => true,
            'client' => $client,
        ];
        $response = UserController::createToken($response, $login);
        $response->getBody()->write(json_encode($result));

        return $response->withStatus(200);
    }

    public function register(Request $request, Response $response, array $args): Response
    {
        $body = $request->getParsedBody();
        $json = $body['client'] ?? "";
        $data = json_decode($json, true);

        $civilite = $data['civilite'] ?? "";
        $nom = $data['nom'] ?? "";
        $prenom = $data['prenom'] ?? "";
        $adresse = $data['adresse'] ?? "";
        $tel = $data['tel'] ?? "";
        $email = $data['mail'] ?? "";
        $cp = $data['cp'] ?? "";
        $ville = $data['ville'] ?? "";
        $pays = $data['pays'] ?? "";
        $login = $data['login'] ?? "";
        $password = $data['passwd'] ?? "";

        if (!UserController::check_fields($data)) return $response->withStatus(401);

        $clientRepo = $this->em->getRepository('Client');
        $client = $clientRepo->findOneBy([
            'login' => $login,
        ]);
        if ($client != null) return $response->withStatus(401); // login déjà utilisé

        $client = $clientRepo->findOneBy([
            'email' => $email,
        ]);
        if ($client != null) return $response->withStatus(401); // email déjà utilisé

        $client = new \Client;
        $client->setCivilite($civilite);
        $client->setNom($nom);
        $client->setPrenom($prenom);
        $client->setAdresse($adresse);
        $client->setTel($tel);
        $client->setEmail($email);
        $client->setCp($cp);
        $client->setVille($ville);
        $client->setPays($pays);
        $client->setLogin($login);
        $client->setPassword($password);
        $this->em->persist($client);
        $this->em->flush();

        $result = [
            "success" => true,
            "client" => json_decode($body['client'], true),
            "id" => $client->getIdclient()
        ];

        $response = UserController::createToken($response, $login);
        $response->getBody()->write(json_encode($result));
        return $response->withStatus(200);
    }

    public function getUser(Request $request, Response $response, array $args): Response
    {
        $login = $args['login'] ?? "";

        if (!preg_match("/[A-Za-z0-9]{8,256}/", $login)) return $response->withStatus(200);

        $clientRepo = $this->em->getRepository('Client');
        $client = $clientRepo->findOneBy([
            'login' => $login,
        ]);

        if ($client == null) {
            $response->getBody()->write(json_encode(['success' => false]));
            return $response->withStatus(401);
        }

        $result = [
            'id' => $client->getIdclient(),
            'civilite' => $client->getCivilite(),
            'nom' => $client->getNom(),
            'prenom' => $client->getPrenom(),
            'mail' => $client->getEmail(),
            'tel' => $client->getTel(),
            'adresse' => $client->getAdresse(),
            'cp' => $client->getCp(),
            'ville' => $client->getVille(),
            'pays' => $client->getPays(),
            'login' => $client->getLogin(),
            'passwd' => $client->getPassword()
        ];

        $response = UserController::createToken($response, $login);
        $response->getBody()->write(json_encode($result));

        return $response->withStatus(200);
    }

    public function updatePassword(Request $request, Response $response, array $args): Response
    {
        $body = $request->getParsedBody();
        $login = $body['login'] ?? "";
        $old_password = $body['old_password'] ?? "";
        $password = $body['password'] ?? "";

        $clientRepo = $this->em->getRepository('Client');
        $client = $clientRepo->findOneBy([
            'login' => $login,
        ]);

        if ($client == null) return $response->withStatus(401); // utilisateur introuvable
        if ($client->getPassword() != $old_password) return $response->withStatus(401); // ancien mdp erroné

        if (!preg_match("/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,256}/", $password))
            return $response->withStatus(401); // mauvais format de mot de passe

        $client->setPassword($password);
        $this->em->persist($client);
        $this->em->flush();

        $result = [
            "success" => true,
        ];

        $response = UserController::createToken($response, $login);
        $response->getBody()->write(json_encode($result));
        return $response->withStatus(200);
    }
}
