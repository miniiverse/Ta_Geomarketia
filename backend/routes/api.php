<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\User\UserProjectController;
use App\Http\Controllers\User\FilterController;

// Public
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/user/projects',   [UserProjectController::class, 'index']);
Route::get('/user/categories', [FilterController::class, 'categories']);  
Route::get('/user/provinces',  [FilterController::class, 'provinces']);
Route::get('/user/cities',     [FilterController::class, 'cities']);

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
    Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
        Route::get('/projects',             [ProjectController::class, 'index']);
        Route::post('/projects',            [ProjectController::class, 'store']);
        Route::post('/projects/{id}',       [ProjectController::class, 'update']);
        Route::delete('/projects/{id}',     [ProjectController::class, 'destroy']);
        Route::get('/categories',           [ProjectController::class, 'categories']);
        Route::get('/cities',               [ProjectController::class, 'cities']);
    });
});
