<?php

namespace App\Http\Controllers\User;

use App\Models\Capsule;
use Illuminate\Http\Request;
use App\Services\User\CapsuleService;
use App\Http\Controllers\Controller;

class CapsuleController extends Controller{
  
    public function getUserCapsules(){
        $capsules = CapsuleService::getUserCapsule();
        return $this->responseJSON($capsules);
    }


    public function getAllCapsules(){
        $capsules = CapsuleService::getAllUsersCapsules();
        return $this->responseJSON($capsules);
    }

    
    public function getCapsulesDetails($id){
        $capsule = CapsuleService::getCapsuleDetails($id);
        return $this->responseJSON($capsule);
    }

    
    public function getSurpriseMood(){
        $capsules = CapsuleService::getSurpriseMood();
        return $this->responseJSON($capsules);
    }

 
    public function delete($id){
        $result = CapsuleService::delete($id);

        if ($result) {
            return $this->responseJSON(['status' => 'success', 'message' => 'Capsule deleted']);
        } else {
            return $this->responseJSON(['status' => 'error', 'message' => 'Capsule not found or invalid ID']);
        }
    }


    public function getAllUsersCapsules(CapsuleService $service){
        $service->convertPrivacy();

        $userId = auth()->id();

        $capsules = Capsule::where('user_id', $userId)
            ->where('privacy', 'public')
            ->where('is_revealed', 0)
            ->get();

        return $this->responseJSON($capsules);
    }

    
    public function getUnlistedCapsuleLink($capsuleId){
        $link = CapsuleService::getUnlistedCapsuleLink($capsuleId);

        if (!$link) {
            return response()->json(['message' => 'Capsule not found or not unlisted.'], 404);
        }

        return $this->responseJSON($link);
    }

    
    public function showUnlistedCapsule(Request $request, $id){
        $token = $request->query('token');
        $capsule = CapsuleService::getUnlistedCapsuleByToken($id, $token);

        if (!$capsule) {
            return response()->json(['message' => 'Invalid or expired link.'], 403);
        }

        return $this->responseJSON($capsule);
    }
}
