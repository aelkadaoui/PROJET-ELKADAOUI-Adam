<?php

namespace App\Middlewares;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class CorsMiddleware
{
    public function __invoke(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $response = $handler->handle($request);
        $origin = 'herokuapp';
        if (count ($request->getHeader('Origin')) > 0) {
          $origin = $request->getHeader('Origin')[0];
        }

        $response = $response
        ->withHeader("Content-Type", "application/json")
        ->withHeader('Access-Control-Allow-Origin', (str_contains($origin, 'localhost')?'*':'https://tp05.herokuapp.com/'))
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type,  Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->withHeader('Access-Control-Expose-Headers', 'Authorization');

        return $response;
    }
}
