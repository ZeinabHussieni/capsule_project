<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('capsules', function (Blueprint $table) {
            $table->id();
            $table->integer("user_id");
            $table->string("title");
            $table->text("message");
            $table->enum('privacy',['private','public','unlisted']);
            $table->dateTime('reveal_date');
            $table->string("location")->nullable();
            $table->string('ip_address')->nullable();
            $table->string('image');
            $table->string('audio_path')->nullable();
            $table->string('color')->nullable();
            $table->string('mood')->nullable();
            $table->boolean('surprise_mood')->default(false);
            $table->string('tags')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capsules');
    }
};
