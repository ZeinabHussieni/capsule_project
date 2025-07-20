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
 
  static function createOrUpdateCapsule($data, $id = null){
    $dataRules = [
        'title'=> 'required|string|max:255',
        'message'=> 'required|string',
        'privacy' => 'required|in:private,public,unlisted',
        'reveal_date'=> 'required|date',
        'is_revealed'=> 'required|boolean',
        'image'=> 'required|string',
        'audio_path' => 'required|string',
        'color' => 'required|string',
        'mood' => 'required|string',
        'surprise_mood'=> 'required|boolean',
        'tags'=> 'required|string',
    ];

    if ($id) {
      $dataRules['id'] = 'integer|exists:capsules,id';
    }

    $validator = Validator::make($data, $dataRules);
    $validatedData = $validator->validated();
    $validatedData['user_id'] = auth()->id();

    $ip = request()->ip();
    $location = Location::get($ip);

    $validatedData['ip_address']= $ip;
    $validatedData['location'] = $location ? $location->countryName : 'Unknown';
    $validatedData['latitude'] = $location ? $location->latitude : null;
    $validatedData['longitude'] = $location ? $location->longitude : null;



   
    if (!empty($validatedData['image']) && str_starts_with($validatedData['image'], 'data:image')) {
        $validatedData['image'] = self::saveBase64Image($validatedData['image']);
    }

    $capsule = $id ? Capsule::find($id) : new Capsule();
    $capsule->fill($validatedData);
    $capsule->save();

    return $capsule;
  }


  static function saveBase64Image($base64Image){
    preg_match("/^data:image\/(.*);base64,/", $base64Image, $matches);
    $imageType = $matches[1] ?? 'png'; 

    $imageData = preg_replace("/^data:image\/(.*);base64,/", '', $base64Image);
    $imageData = base64_decode($imageData);

    $fileName = uniqid() . '.' . $imageType;
    $filePath = public_path('images/' . $fileName);

    file_put_contents($filePath, $imageData);

    return 'images/' . $fileName;
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

  static function filterCapsules(array $filters) {
    $filter = Capsule::query();

    if (!empty($filters['location'])) {
        $filter->where('location',$filters['location']);
    }

    if (!empty($filters['mood'])) {
        $filter->where('mood', $filters['mood']);
    }

    if (!empty($filters['tags'])) {

        $filter->where('tags', 'like', '%' . $filters['tags'] . '%');
    }


    $capsules = $filter->get();
    $capsules = self::convertPrivacy($capsules);

    return $capsules;
  }


 
}
