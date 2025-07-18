<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\User\CapsuleController;

Route::get("/capsules", [CapsuleController::class, "getAllCapsules"]);

Route::post('/createOrUpdateCapsules/{id?}', [CapsuleController::class, 'createOrUpdateCapsule']);

Route::delete('/delete/{id}', [CapsuleController::class, 'deleteCapsule']);
