<?php

namespace App\Services\User;
use Illuminate\Support\Facades\Validator;
use Stevebauman\Location\Facades\Location;
use App\Models\Capsule;
use Illuminate\Database\Eloquent\Collection;
use Carbon\Carbon;

class CapsuleService{


  static function getUserCapsule(){

    $capsules= Capsule::all();

    $capsule = self::convertPrivacy($capsules);

    $userId= auth()->id();//this id from token

    return $capsule-> where('user_id', $userId)
                        ->where('surprise_mood', false)
                        ->values();
  }

  static function getSurpriseMood(){

    $capsule= Capsule::all();

    $userId= auth()->id();
    
    return $capsule-> where('user_id', $userId)
                   ->where('surprise_mood',true)
                   ->values();
  }
 
  static function getAllUsersCapsules() {
    $capsules= Capsule::all();

    $capsule = self::convertPrivacy($capsules);

    return $capsule->where('privacy', 'public')
                     ->where('surprise_mood', false)
                     ->values();
  }

  static function getCapsuleDetails($id){
    $capsule= Capsule::find($id);
    return $capsule;
  }

  static function convertPrivacy(Collection $capsules){
    $now = Carbon::now();

    foreach($capsules as $capsule){
      if($capsule->reveal_date <= now()){
        $capsule->privacy='public';
        $capsule->is_revealed= true;
        $capsule->surprise_mood = false;

        $capsule->save();
      }
    }

    return $capsules;
  }
 
  static function delete($id){
    if(!$id) {
      return false;  
    }

    $capsule = Capsule::find($id);

    if(!$capsule) {
      return false; 
    }

    $capsule->delete();
      return true; 
  }

 
}
