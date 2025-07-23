<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Capsule extends Model
{
    use HasFactory;

    protected $fillable = [
    'user_id',
    'title',
    'message',
    'privacy',
    'reveal_date',
    'location',
    'latitude',
    'longitude',
    'is_revealed',
    'ip_address',
    'image',
    'audio_path',
    'text_file',
    'color',
    'mood',
    'surprise_mood',
    'tags',
  ];
      public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}


}