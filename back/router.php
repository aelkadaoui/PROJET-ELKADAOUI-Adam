<?php

use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use App\Controllers\UserController;
use App\Controllers\MaillotController;
use App\Controllers\EquipeController;
use App\Controllers\MarqueController;
use App\Controllers\CommandeController;
use App\Middlewares\CorsMiddleware;
use Tuupola\Middleware\JwtAuthentication;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        return $response;
    });

    $app->add(CorsMiddleware::class);

    $app->group('/users', function (Group $group) {
        $group->post('/login', UserController::class . ":login");
        $group->post('/register', UserController::class . ":register");
        $group->get('/account/{login}', UserController::class . ":getUser");
        $group->post('/account/updatePassword', UserController::class . ":updatePassword");
    });

    $app->group('/maillots', function (Group $group) {
        $group->get('/all', MaillotController::class . ":getMaillots");
        $group->get('/{id}', MaillotController::class . ":getMaillot");
    });

    $app->group('/equipes', function (Group $group) {
        $group->get('/all', EquipeController::class . ":getEquipes");
        $group->get('/{id}', MaillotController::class . ":getEquipe");
    });

    $app->group('/marques', function (Group $group) {
        $group->get('/all', MarqueController::class . ":getMarques");
    });

    $app->group('/commandes', function (Group $group) {
        $group->post('/creer', CommandeController::class . ":creationCommande");
        $group->get('/users/{id}', CommandeController::class . ":getCommandes");
        $group->get('/{id}', CommandeController::class . ":getCommande");
    });


    $options = [
        "attribute" => "token",
        "header" => "Authorization",
        "regexp" => "/Bearer\s+(.*)$/i",
        "secure" => false,
        "algorithm" => ["HS256"],
        "secret" => $_ENV['JWT_SECRET'],
        "path" => ["/"],
        "ignore" => ["/users/register", "/users/login", "/users/account/updatePassword", "/maillots/*", "/equipes/*", "/marques/*", "/commandes/*"],
        "error" => function ($response, $arguments) {
            $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
            $response = $response->withStatus(401);
            return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
        }
    ];

    $app->add(new JwtAuthentication($options));
};
