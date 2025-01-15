<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])
    ->middleware(['auth', 'signed'])
    ->name('verification.verify');

Route::post('/email/resend', [VerificationController::class, 'resend'])
    ->middleware('auth')
    ->name('verification.resend');


Route::middleware('auth:sanctum')->group(function() {
    //Route::post('/logout',[AuthController::class,'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
    Route::put('/users/{id}/status', [UserController::class, 'updateStatus']);

    Route::post('/users/{id}/restore', [UserController::class, 'restoreUser']);
    Route::delete('/users/{id}/force-delete', [UserController::class, 'permanentlyDeleteUser']);
});

Route::post('/login',[AuthController::class,'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


Route::post('/register',[AuthController::class,'register']);
Route::put('/users/{id}/status', [UserController::class, 'updateStatus']);

Route::get('/profile', [UserController::class, 'profile'])->middleware('auth');
Route::put('/profile/{id}', [UserController::class, 'updateProfile'])->middleware('auth');

Route::post('/profile/{id}/profile-image', [UserController::class, 'updateProfileImage'])->middleware('auth:sanctum');
Route::patch('/profile/{id}/reset-profile-image', [UserController::class, 'resetProfileImage']);


