<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Public
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me',                [AuthController::class, 'me']);
    Route::put('/profile',           [AuthController::class, 'updateProfile']);
    Route::put('/password',          [AuthController::class, 'updatePassword']);
    Route::post('/profile/photo',    [AuthController::class, 'updatePhoto']); 
    Route::post('/logout',           [AuthController::class, 'logout']);
});