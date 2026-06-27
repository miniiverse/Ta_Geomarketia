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
    /*
     * Registers a new user with default role 1 (User).
     * Password is hashed before being saved to the database.
     */
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

    /*
     * Logs in a user using username and password.
     * Protected by a rate limiter of maximum 5 attempts per IP within 60 seconds.
     * If successful, old tokens are deleted and a new Sanctum token is created.
     */
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

    /*
     * Retrieves the currently logged-in user along with their role relation.
     * Response is sent with a no-store Cache-Control header to prevent browser caching.
     */
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

    /*
     * Updates the profile of the currently logged-in user (fullname, username, email).
     * Username and email are validated for uniqueness, except for the user themselves.
     */
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

    /*
     * Updates the profile photo of the currently logged-in user.
     * The old photo is deleted from storage before the new one is saved.
     * Storage folder is determined based on the user's role (admin/manager/user).
     */
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

    /*
     * Logs out the user by deleting the currently used access token.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful.',
        ]);
    }
}
