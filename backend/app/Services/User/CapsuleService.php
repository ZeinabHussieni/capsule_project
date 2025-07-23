<?php
namespace App\Services\User;

use Illuminate\Support\Facades\Validator;
use Stevebauman\Location\Facades\Location;
use App\Models\Capsule;
use Illuminate\Database\Eloquent\Collection;
use Carbon\Carbon;

class CapsuleService
{

    static function getUserCapsule(){
      self::convertPrivacy();

      $userId = auth()->id();

      return Capsule::where('user_id', $userId)
                    ->where('surprise_mood', 0)
                    ->get();
    }


    static function getAllUsersCapsules(){
      self::convertPrivacy();

      $userId = auth()->id();

      return Capsule::where('user_id', $userId)
                      ->where('privacy', 'public')
                      ->where('is_revealed', 1)
                      ->get();
    }

    
    static function getSurpriseMood(){
      $userId = auth()->id();

      return Capsule::where('user_id', $userId)
                      ->where('surprise_mood', true)
                      ->get();
    }

   
    static function getCapsuleDetails($id){
      return Capsule::find($id);
    }

   
    static public function convertPrivacy(){
      date_default_timezone_set('Asia/Beirut');
      $now = Carbon::now();

      $capsules = Capsule::with('user')
                  ->where('is_revealed', 0)
                  ->where('reveal_date', '<=', $now)
                  ->get();

        if ($capsules->isEmpty()) {
          return "No capsules found to convert.";
        }

        foreach ($capsules as $capsule) {
          $capsule->is_revealed = 1;
          $capsule->surprise_mood = 0;
          $capsule->save();

            if ($capsule->user && filter_var($capsule->user->email, FILTER_VALIDATE_EMAIL)) {
              \Mail::to($capsule->user->email)->send(new \App\Mail\CapsuleRevealMail($capsule));
            }
        }

      return "Done updating and emailing " . $capsules->count() . " capsules.";
    }

   
    static function delete($id){
      if (!$id) {
        return false;
      }

      $capsule = Capsule::find($id);

      if (!$capsule) {
        return false;
      }

      $capsule->delete();
      return true;
    }


    public static function getUnlistedCapsuleLink($capsuleId){
      $userId = auth()->id();

      $capsule = Capsule::where('id', $capsuleId)
                        ->where('user_id', $userId)
                        ->where('privacy', 'unlisted')
                        ->first();

        if (!$capsule) {
          return null;
        }

      return url('/capsule/unlisted/' . $capsule->id . '?token=' . $capsule->unlisted_token);
    }

   
    public static function getUnlistedCapsuleByToken($id, $token){
      return Capsule::where('id', $id)
                    ->where('privacy', 'unlisted')
                    ->where('unlisted_token', $token)
                    ->first();
    }
}
