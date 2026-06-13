<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string ...$roles): mixed
    {
        $user = $request->user();

        if (!$user || !$user->role || !in_array($user->role->role_name, $roles, true)) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. Akses ditolak.',
            ], 403);
        }

        return $next($request);
    }
}
