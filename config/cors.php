<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'dishcuss/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'], // Cambia esto a la URL de tu frontend http://localhost:5173

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];

