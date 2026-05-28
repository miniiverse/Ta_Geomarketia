<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role): mixed
    {
        $user = $request->user();

        if (!$user || !$user->role || $user->role->role_name !== $role) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. Akses ditolak.',
            ], 403);
        }

        return $next($request);
    }
}