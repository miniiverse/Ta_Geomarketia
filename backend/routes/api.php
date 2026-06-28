<?php

use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TransactionsController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\User\UserProjectController;
use App\Http\Controllers\User\FilterController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\User\PaymentController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\User\StatsController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::prefix('password')->group(function () {
    Route::post('/forgot',     [PasswordResetController::class, 'sendOtp']);
    Route::post('/verify-otp', [PasswordResetController::class, 'verifyOtp']);
    Route::post('/reset',      [PasswordResetController::class, 'resetPassword']);
});

Route::get('/user/projects',      [UserProjectController::class, 'index']);
Route::get('/user/categories',    [FilterController::class, 'categories']);
Route::get('/user/provinces',     [FilterController::class, 'provinces']);
Route::get('/user/cities',        [FilterController::class, 'cities']);
Route::get('/user/projects/{id}', [UserProjectController::class, 'show']);

Route::post('/payment/webhook', [PaymentController::class, 'webhook']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me',             [AuthController::class, 'me'])->middleware('throttle:120,1');
    Route::put('/profile',        [AuthController::class, 'updateProfile']);
    Route::put('/password',       [AuthController::class, 'updatePassword']);
    Route::post('/profile/photo', [AuthController::class, 'updatePhoto']);
    Route::post('/logout',        [AuthController::class, 'logout']);

    Route::post('/orders',            [OrderController::class, 'store']);
    Route::get('/orders',             [OrderController::class, 'index']);
    Route::get('/orders/{id}',        [OrderController::class, 'show']);
    Route::put('/orders/{id}/cancel', [OrderController::class, 'cancel']);
    Route::get('/stats',              [StatsController::class, 'index']);

    Route::post('/payment/snap-token',      [PaymentController::class, 'createSnapToken']);
    Route::get('/payment/status/{orderId}', [PaymentController::class, 'status']);
});

Route::middleware(['auth:sanctum', 'role:admin,manager'])->group(function () {
    Route::get('/projects',         [ProjectController::class, 'index']);
    Route::get('/projects/{id}',    [ProjectController::class, 'show']);
    Route::get('/categories',       [ProjectController::class, 'categories']);
    Route::get('/cities',           [ProjectController::class, 'cities']);

    Route::get('/admin/transactions',              [TransactionsController::class, 'index']);
    Route::get('/admin/transactions/export-excel', [TransactionsController::class, 'exportExcel']);
    Route::get('/admin/transactions/{id}',         [TransactionsController::class, 'show']);
    Route::get('/admin/dashboard/monthly-income',        [DashboardController::class, 'monthlyIncome']);
    Route::get('/admin/dashboard/category-sales',        [DashboardController::class, 'categorySales']);
    Route::get('/admin/dashboard/monthly-sales-summary', [DashboardController::class, 'monthlySalesSummary']);
    Route::get('/admin/monthly-sales-summary',           [DashboardController::class, 'monthlySalesSummary']);
    Route::get('/admin/dashboard/top-selling-services',  [DashboardController::class, 'topSellingServices']);
    Route::get('/admin/top-selling-services',            [DashboardController::class, 'topSellingServices']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/projects',        [ProjectController::class, 'store']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'role:admin,manager'])->group(function () {
    Route::post('/projects/{id}',   [ProjectController::class, 'update']);
});

Route::middleware(['auth:sanctum', 'role:admin,manager'])->group(function () {
    Route::get('/users',              [UserController::class, 'index']);
    Route::get('/users/{id}',         [UserController::class, 'show']);
    Route::put('/users/{id}',         [UserController::class, 'update']);
    Route::delete('/users/{id}',      [UserController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::put('/users/{id}/promote', [UserController::class, 'promote']);
});
