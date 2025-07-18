<?php

namespace App\Services\User;

use App\Models\Capsule;


class CapsuleService{

    static function getAllCapsules($id = null, $userId = null, $privacy = null){

        if($id){
            return Capsule::find($id);
        }

        $query = Capsule::query();

        if($userId){
            $query->where('user_id', $userId);

        }

        if($privacy){
            $query->where('privacy', $privacy);
        }

        return $query->get();
    }


    static function createOrUpdateCapsule($data, $id = null){
      $capsule = $id ? Capsule::find($id) : new Capsule();

        if (!$capsule) {
         $capsule = new Capsule();
        }

      if (isset($data['user_id'])) $capsule->user_id = $data['user_id'];
      $capsule->title = $data["title"] ?? $capsule->title;
      $capsule->message = $data["message"] ?? $capsule->message;
      $capsule->privacy = $data["privacy"] ?? $capsule->privacy;
      $capsule->reveal_date = $data["reveal_date"] ?? $capsule->reveal_date;
      $capsule->location = $data["location"] ?? $capsule->location;
      $capsule->is_revealed = $data["is_revealed"] ?? $capsule->is_revealed;
      $capsule->ip_address = $data["ip_address"] ?? $capsule->ip_address;
      $capsule->image = $data["image"] ?? $capsule->image;          
      $capsule->audio_path = $data["audio_path"] ?? $capsule->audio_path;
      $capsule->color = $data["color"] ?? $capsule->color;
      $capsule->mood = $data["mood"] ?? $capsule->mood;
      $capsule->surprise_mood = $data["surprise_mood"] ?? $capsule->surprise_mood;
      $capsule->tags = $data["tags"] ?? $capsule->tags;

      $capsule->save();

      return $capsule;
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
