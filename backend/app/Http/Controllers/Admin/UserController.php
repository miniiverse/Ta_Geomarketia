<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    private const ROLE_USER = 1;
    private const ROLE_ADMIN = 2;
    private const ROLE_MANAGER = 3;

    public function index()
    {
        $users = User::with('role')
            ->latest('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'total' => $users->count(),
            'users' => $users->map(fn (User $user) => $this->formatUser($user)),
        ]);
    }

    public function show($id)
    {
        $user = User::with('role')->findOrFail($id);

        return response()->json([
            'success' => true,
            'user' => $this->formatUser($user),
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (! $this->canModifyUser($request->user(), $user)) {
            return response()->json([
                'success' => false,
                'message' => 'You are not allowed to edit this account.',
            ], 403);
        }

        $validated = $request->validate([
            'fullname' => ['required', 'string', 'max:100'],
            'username' => [
                'required',
                'string',
                'max:50',
                Rule::unique('users', 'username')->ignore($user->user_id, 'user_id'),
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->user_id, 'user_id'),
            ],
        ]);

        $user->update($validated);
        $user->load('role');

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'user' => $this->formatUser($user),
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($request->user()->user_id === $user->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot delete your own account.',
            ], 422);
        }

        if (! $this->canModifyUser($request->user(), $user)) {
            return response()->json([
                'success' => false,
                'message' => 'You are not allowed to delete this account.',
            ], 403);
        }

        if ($user->profile_photo) {
            Storage::disk('public')->delete($user->profile_photo);
        }

        Project::where('user_id', $user->user_id)->update([
            'user_id' => $request->user()->user_id,
        ]);

        $user->tokens()->delete();
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully.',
        ]);
    }

    public function promote(Request $request, $id)
    {
        if ($request->user()?->role_id !== self::ROLE_ADMIN) {
            return response()->json([
                'success' => false,
                'message' => 'Only admin can update user roles.',
            ], 403);
        }

        $user = User::findOrFail($id);
        $validated = $request->validate([
            'role_id' => ['required', 'integer', Rule::in([self::ROLE_USER, self::ROLE_MANAGER])],
        ]);

        $targetRole = Role::where('role_id', $validated['role_id'])->first();
        $adminRole = Role::where('role_id', self::ROLE_ADMIN)->first();

        if (! $targetRole || ! $adminRole) {
            return response()->json([
                'success' => false,
                'message' => 'Required roles not found.',
            ], 500);
        }

        if ($user->role_id === $adminRole->role_id) {
            return response()->json([
                'success' => false,
                'message' => 'Admin accounts can only be managed manually from the database.',
            ], 422);
        }

        if ($request->user()->user_id === $user->user_id && $user->role_id === $adminRole->role_id && $targetRole->role_id !== $adminRole->role_id) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot demote your own admin account.',
            ], 422);
        }

        $user->update([
            'role_id' => $targetRole->role_id,
        ]);

        $user->load('role');

        return response()->json([
            'success' => true,
            'message' => 'User role updated successfully.',
            'user' => $this->formatUser($user),
        ]);
    }

    private function formatUser(User $user): array
    {
        return [
            'id' => $user->user_id,
            'fullname' => $user->fullname,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role?->role_name,
            'role_id' => $user->role_id,
            'profile_photo' => $user->profile_photo
                ? asset('storage/' . $user->profile_photo)
                : null,
            'created_at' => $user->created_at,
        ];
    }

    private function canModifyUser(?User $actor, User $target): bool
    {
        if (! $actor) {
            return false;
        }

        if ($actor->user_id === $target->user_id) {
            return true;
        }

        if ($target->role_id === self::ROLE_ADMIN) {
            return false;
        }

        return in_array($actor->role_id, [self::ROLE_ADMIN, self::ROLE_MANAGER], true);
    }
}
