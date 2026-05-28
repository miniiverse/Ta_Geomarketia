<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $users = User::select('user_id', 'fullname', 'email', 'created_at')->get();

        return response()->json([
            'success' => true,
            'total' => $users->count(),
            'data' => $users,
        ]);
    }
}
