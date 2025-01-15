<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cache;

class CheckTokenInvalidation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if tokens are globally invalidated
        if (Cache::get('invalidate_tokens')) {
            return response()->json(['message' => 'Session expired. Please log in again.'], 401);
        }

        return $next($request);
    }
}
