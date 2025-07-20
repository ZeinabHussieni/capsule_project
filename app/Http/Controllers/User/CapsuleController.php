<?php

namespace App\Http\Controllers\User;

use App\Models\Capsule;
use Illuminate\Http\Request;
use  App\Services\User\CapsuleService;
use App\Http\Controllers\Controller;

class CapsuleController extends Controller{

    function getUserCapsules(){
       $capsules = CapsuleService::getUserCapsule();
       return $this->responseJSON($capsules);
    }
   

    function getAllCapsules(){
        $capsule= CapsuleService::getAllUsersCapsules();
        return $this->responseJSON($capsule);
    }

    function getCapsulesDetails($id){
       $capsules = CapsuleService::getCapsuleDetails($id);
       return $this->responseJSON($capsules);
    }

    function createOrUpdateCapsule(Request $request, $id = null){
        $data = $request->all();
        $capsule = CapsuleService::createOrUpdateCapsule($request->all(), $id, $request);

        return $this-> responseJSON($capsule);

    }

    function Delete($id){
        $result = CapsuleService::delete($id);
  
        if ($result) {
           return $this->responseJSON(['status' => 'success', 'message' => 'Capsule deleted']);
        } else {
           return $this->responseJSON(['status' => 'error', 'message' => 'Capsule not found or invalid ID']);
        }
    }

    public function filterCapsules(Request $request) {

        $filters = $request->only(['location', 'mood', 'tags']); 

        $capsules = CapsuleService::filterCapsules($filters);
        return $this-> responseJSON($capsules);
    }
   
}
