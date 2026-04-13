<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    // REGISTER
    // Dipanggil dari: POST /api/register
    // Frontend: register/page.tsx
    public function register(Request $request)
    {
        $request->validate([
            'fullname' => 'required|string|max:255',
            'username' => 'required|string|max:50|unique:users,username',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'role_id'  => 2, // role user
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

    // ───────────────────────────────────────
    // LOGIN
    // Dipanggil dari: POST /api/login
    // Frontend: src/app/(auth)/login/page.tsx
    // ───────────────────────────────────────
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::with('role')
            ->where('username', $request->username)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Username atau password salah.',
            ], 401);
        }

        // Hapus pengecekan role — semua bisa login
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

    // ───────────────────────────────────────
    // GET PROFILE
    // Dipanggil dari: GET /api/me
    // Frontend: profile-admin/page.tsx
    // ───────────────────────────────────────
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
        ]);
    }

    // ───────────────────────────────────────
    // UPDATE PROFILE
    // Dipanggil dari: PUT /api/profile
    // Frontend: ProfileCard.tsx (Save Changes)
    // ───────────────────────────────────────
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

    // ───────────────────────────────────────
    // UPDATE PASSWORD
    // Dipanggil dari: PUT /api/password
    // Frontend: SecurityCard.tsx (Save Password)
    // ───────────────────────────────────────
    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password'     => 'required|string',
            'new_password'     => 'required|string|min:8',
            'confirm_password' => 'required|same:new_password',
        ]);

        $user = $request->user();

        // Cek password lama
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Password lama salah.',
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully.',
        ]);
    }

    public function updatePhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $user = $request->user();

        // Hapus foto lama kalau ada
        if ($user->profile_photo) {
            Storage::disk('public')->delete($user->profile_photo);
        }

        // Simpan foto baru
        $path = $request->file('photo')->store('photos', 'public');

        DB::table('users')
            ->where('user_id', $user->user_id)
            ->update(['profile_photo' => $path]);

        return response()->json([
            'success' => true,
            'photo_url' => asset('storage/' . $path),
        ]);
    }

    // ───────────────────────────────────────
    // LOGOUT
    // Dipanggil dari: POST /api/logout
    // ───────────────────────────────────────
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil.',
        ]);
    }
}
