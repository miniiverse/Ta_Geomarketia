<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter; 
use Illuminate\Support\Str;                 

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        $request->validate([
            'fullname' => 'required|string|max:255',
            'username' => 'required|string|max:50|unique:users,username',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'role_id'  => 2,
            'fullname' => $request->fullname,
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil. Silakan login.',
        ], 201);
    }

    // LOGIN 
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $key = 'login:' . $request->ip();
        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            return response()->json([
                'success' => false,
                'message' => "Terlalu banyak percobaan login. Coba lagi dalam {$seconds} detik.",
            ], 429);
        }

        $user = User::with('role')
            ->where('username', $request->username)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            RateLimiter::hit($key, 60); 
            return response()->json([
                'success' => false,
                'message' => 'Username atau password salah.',
            ], 401);
        }

        // Reset counter
        RateLimiter::clear($key);

        $user->tokens()->delete();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil.',
            'token'   => $token,
            'user'    => [
                'id'            => $user->user_id,
                'fullname'      => $user->fullname,
                'username'      => $user->username,
                'email'         => $user->email,
                'role'          => $user->role->role_name,
                'profile_photo' => $user->profile_photo,
            ],
        ]);
    }

    // GET PROFILE 
    public function me(Request $request)
    {
        $user = $request->user()->load('role');

        return response()->json([
            'success' => true,
            'user'    => [
                'id'            => $user->user_id,
                'fullname'      => $user->fullname,
                'username'      => $user->username,
                'email'         => $user->email,
                'role'          => $user->role->role_name,
                'profile_photo' => $user->profile_photo
                    ? asset('storage/' . $user->profile_photo)
                    : null,
                'created_at'    => $user->created_at,
            ],
        ])->header('Cache-Control', 'no-store'); 
    }

    // UPDATE PROFILE 
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'fullname' => 'required|string|max:100',
            'username' => 'required|string|max:50|unique:users,username,' . $user->user_id . ',user_id',
            'email'    => 'required|email|unique:users,email,' . $user->user_id . ',user_id',
        ]);

        $user->update([
            'fullname' => $request->fullname,
            'username' => $request->username,
            'email'    => $request->email,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully.',
            'user'    => [
                'fullname' => $user->fullname,
                'username' => $user->username,
                'email'    => $user->email,
            ],
        ]);
    }

    // UPDATE PHOTO 
    public function updatePhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $user = $request->user();

        if ($user->profile_photo) {
            Storage::disk('public')->delete($user->profile_photo);
        }

        $folder = $user->role_id === 1 ? 'photos/admin' : 'photos';
        $path = $request->file('photo')->store($folder, 'public');

        $user->update(['profile_photo' => $path]); 

        return response()->json([
            'success'   => true,
            'photo_url' => asset('storage/' . $path),
        ]);
    }

    // LOGOUT 
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil.',
        ]);
    }
}
