<?php

namespace App\Http\Controllers\User;

use App\Models\Capsule;
use Illuminate\Http\Request;
use  App\Services\User\CreateCapsuleService;
use App\Http\Controllers\Controller;

class CreateCapsuleController extends Controller{

    function createOrUpdateCapsule(Request $request, $id = null){
        $data = $request->all();
        $capsule = CreateCapsuleService::createOrUpdateCapsule($data, $id, $request);

        return $this-> responseJSON($capsule);

    }

}