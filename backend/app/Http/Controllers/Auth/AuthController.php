<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\RateLimiter;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'role_id'  => 1,
            'fullname' => $request->fullname,
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registration successful. Please log in.',
        ], 201);
    }

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
                'message' => "Too many login attempts. Please try again in {$seconds} seconds.",
            ], 429);
        }

        $user = User::with('role')
            ->where('username', $request->username)
            ->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            RateLimiter::hit($key, 60);
            return response()->json([
                'success' => false,
                'message' => 'Username or password is incorrect.',
            ], 401);
        }

        RateLimiter::clear($key);

        $user->tokens()->delete();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'token'   => $token,
            'user'    => [
                'id'            => $user->user_id,
                'fullname'      => $user->fullname,
                'username'      => $user->username,
                'email'         => $user->email,
                'role'          => $user->role->role_name,
                'role_id'       => $user->role_id,
                'profile_photo' => $user->profile_photo,
            ],
        ]);
    }

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
                'role_id'       => $user->role_id,
                'profile_photo' => $user->profile_photo
                    ? asset('storage/' . $user->profile_photo)
                    : null,
                'created_at'    => $user->created_at,
            ],
        ])->header('Cache-Control', 'no-store');
    }

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

    public function updatePhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        $user = $request->user();

        if ($user->profile_photo) {
            Storage::disk('public')->delete($user->profile_photo);
        }

        $folder = $user->role_id === 2 ? 'photos/admin' : ($user->role_id === 3 ? 'photos/manager' : 'photos/user');
        $path   = $request->file('photo')->store($folder, 'public');

        $user->update(['profile_photo' => $path]);

        return response()->json([
            'success'   => true,
            'photo_url' => asset('storage/' . $path),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful.',
        ]);
    }
}
