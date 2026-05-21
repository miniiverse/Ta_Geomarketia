<?php

use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\User\UserProjectController;
use App\Http\Controllers\User\FilterController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

// ── Public routes (tidak perlu token) ───────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
 
// Password Reset — OTP Flow
Route::prefix('password')->group(function () {
    Route::post('/forgot',         [PasswordResetController::class, 'sendOtp']);       // Step 1: kirim OTP
    Route::post('/verify-otp',     [PasswordResetController::class, 'verifyOtp']);     // Step 2: verifikasi OTP
    Route::post('/reset',          [PasswordResetController::class, 'resetPassword']); // Step 3: reset password
});

// Public
Route::get('/user/projects',   [UserProjectController::class, 'index']);
Route::get('/user/categories', [FilterController::class, 'categories']);
Route::get('/user/provinces',  [FilterController::class, 'provinces']);
Route::get('/user/cities',     [FilterController::class, 'cities']);

// Protected - semua user yang login
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me',             [AuthController::class, 'me'])->middleware('throttle:120,1');
    Route::put('/profile',        [AuthController::class, 'updateProfile']);
    Route::put('/password',       [AuthController::class, 'updatePassword']);
    Route::post('/profile/photo', [AuthController::class, 'updatePhoto']);
    Route::post('/logout',        [AuthController::class, 'logout']);
});

// Protected - admin only
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/projects',         [ProjectController::class, 'index']);
    Route::post('/projects',        [ProjectController::class, 'store']);
    Route::post('/projects/{id}',   [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
    Route::get('/categories',       [ProjectController::class, 'categories']);
    Route::get('/cities',           [ProjectController::class, 'cities']);
    Route::get('/users',            [UserController::class, 'index']); 
});
