<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Public
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected - semua user yang login
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me'])->middleware('throttle:120,1');
    Route::put('/profile',        [AuthController::class, 'updateProfile']);
    Route::put('/password',       [AuthController::class, 'updatePassword']);
    Route::post('/profile/photo', [AuthController::class, 'updatePhoto']);
    Route::post('/logout',        [AuthController::class, 'logout']);
});

// Protected - admin only
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Route::get('/admin/dashboard', [AdminController::class, 'index']);
    // tambah route admin lainnya di sini
});