<?php

namespace App\Http\Controllers\User;

use App\Models\Capsule;
use Illuminate\Http\Request;
use  App\Services\User\CapsuleService;
use App\Http\Controllers\Controller;




class CapsuleController extends Controller{

    function getAllCapsules(Request $request){

        $id = $request->query('id');
        $userId = $request->query('user_id');
        $privacy = $request->query('privacy');

        $capsules = CapsuleService::getAllCapsules($id, $userId, $privacy);
        return $this->responseJSON($capsules);
    }

    function createOrUpdateCapsule(Request $request, $id = null){
        $data = $request->all();
        $capsule = CapsuleService::createOrUpdateCapsule($data, $id);
        return $this-> responseJSON($capsule);

    }

    function delete($id){
        $result = CapsuleService::deleteCapsule($id);
  
        if ($result) {
           return $this->responseJSON(['status' => 'success', 'message' => 'Capsule deleted']);
        } else {
           return $this->responseJSON(['status' => 'error', 'message' => 'Capsule not found or invalid ID']);
        }
    }


    
}
