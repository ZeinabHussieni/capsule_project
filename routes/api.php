<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\CapsuleController;
use App\Http\Controllers\User\CreateCapsuleController;
use App\Http\Controllers\Common\AuthController;

Route::group(["prefix" =>"v0.1"], function(){

    Route::group(["middleware" => "auth:api"], function(){
        Route::group(["prefix" => "user"], function(){
            Route::get("/user_capsules", [CapsuleController::class, "getUserCapsules"]);
            Route::get("/all_user_capsules", [CapsuleController::class, "getAllCapsules"]);
            Route::post("/create_or_update/{id?}", [CreateCapsuleController::class, "createOrUpdateCapsule"]);
            Route::delete("/delete/{id?}", [CapsuleController::class, "Delete"]);
            Route::get("/capsule_details/{id}", [CapsuleController::class, "getCapsulesDetails"]);
            Route::get("/surprise_mood", [CapsuleController::class, "getSurpriseMood"]);
            Route::get("/unlisted-link/{id}", [CapsuleController::class, "getUnlistedCapsuleLink"]);
        });
    });


   Route::group(["prefix" => 'guest'], function(){
     Route::post("/login",[AuthController::class, "login"]);
     Route::post("/register", [AuthController::class, "register"]);
   });

   Route::group(["prefix" => 'public'], function(){
     Route::get('/unlisted/{id}', [CapsuleController::class, 'showUnlistedCapsule']);
   });

  
});
