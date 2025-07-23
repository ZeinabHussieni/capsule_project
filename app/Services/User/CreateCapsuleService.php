<?php
namespace App\Services\User;

use Illuminate\Support\Facades\Validator;
use Stevebauman\Location\Facades\Location;
use App\Models\Capsule;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class CreateCapsuleService{

    static function createOrUpdateCapsule(array $data, $id = null){
        $dataRules = [
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'privacy' => 'required|in:private,public,unlisted',
            'reveal_date' => 'required|date',
            'is_revealed' => 'required|boolean',
            'image' => 'required|string',
            'audio' => 'nullable|file|mimes:mp3,wav,ogg',
            'file' => 'nullable|file|mimes:txt,pdf,doc,docx',
            'color' => 'required|string',
            'mood' => 'required|string',
            'surprise_mood' => 'required|boolean',
            'tags' => 'required|string',
        ];

        if ($id) {
            $dataRules['id'] = 'integer|exists:capsules,id';
        }

        $validator = Validator::make($data, $dataRules);
        $validatedData = $validator->validated();
        $validatedData['user_id'] = auth()->id();

       
        $location = Location::get(request()->ip());

        $validatedData += [
            'ip_address' => request()->ip(),
            'location' => $location->countryName ?? null,
            'latitude' => $location->latitude ?? null,
            'longitude' => $location->longitude ?? null,
        ];

       
        if (request()->hasFile('audio')) {
            $audioFile = request()->file('audio');
            $fileName = time() . '_' . $audioFile->getClientOriginalName();
            $audioFile->storeAs('public/audio', $fileName);
            $validatedData['audio_path'] = 'audio/' . $fileName;
        }

      
        if (request()->hasFile('file')) {
            $textFile = request()->file('file');
            $fileName = time() . '_' . $textFile->getClientOriginalName();
            $textFile->storeAs('public/files', $fileName);
            $validatedData['text_file'] = 'files/' . $fileName;
        }

       
        if (!empty($validatedData['image']) && str_starts_with($validatedData['image'], 'data:image')) {
            $validatedData['image'] = self::saveBase64Image($validatedData['image']);
        }

        
        if ($validatedData['privacy'] === 'unlisted') {
            $validatedData['unlisted_token'] = Str::random(32);
        }

        
        $capsule = $id ? Capsule::find($id) : new Capsule();
        $capsule->fill($validatedData);
        $capsule->save();

       
        if ($capsule->privacy === 'unlisted') {
            $capsule->unlisted_url = url('/capsule/unlisted/' . $capsule->id . '?token=' . $capsule->unlisted_token);
        }

        return $capsule;
    }

    static function saveBase64Image($base64Image){

        preg_match("/^data:image\/(.*);base64,/", $base64Image, $matches);
        $imageType = $matches[1] ?? 'png';

        $imageData = preg_replace("/^data:image\/(.*);base64,/", '', $base64Image);
        $imageData = base64_decode($imageData);

        $fileName = uniqid() . '.' . $imageType;
        $relativePath = 'images/' . $fileName;
        $storagePath = storage_path('app/public/' . $relativePath);

        if (!file_exists(dirname($storagePath))) {
            mkdir(dirname($storagePath), 0755, true);
        }

        file_put_contents($storagePath, $imageData);

        return 'storage/' . $relativePath;
    }
}
