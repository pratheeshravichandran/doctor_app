<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

    Route::get('/get/metadata', [AuthController::class, 'getMetadata']);
    Route::get('/specialization', [AuthController::class, 'getSpecialization']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);