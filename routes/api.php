<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\DishController;


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

Route::get('/dishcuss/getDishcussings', [DishController::class, 'getDishcussings']);
Route::get('/dishcuss/getDishComments', [DishController::class, 'getDishComments']);
Route::post('/dishcuss/saveDishcussing', [DishController::class, 'saveDishcussing']);
Route::post('/dishcuss/saveDishComment', [DishController::class, 'saveDishComment']);
Route::post('/dishcuss/updateDishcussing', [DishController::class, 'updateDishcussing']);
Route::post('/dishcuss/updateDishComment', [DishController::class, 'updateDishComment']);