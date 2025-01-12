<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() && auth()->user()->status === 'dishAdmin') {
            return $next($request); // Allow access if the user is an admin
        }

        return response()->json(['message' => 'Forbidden'], 403); // Deny access
    }
}
