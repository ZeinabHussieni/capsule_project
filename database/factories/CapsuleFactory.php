<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Capsule>
 */
class CapsuleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => 0,
            "title" => $this->faker->unique()->words(3, true),
            "message" => $this->faker->paragraph,
            "mood" => $this->faker->randomElement(["😊 Happy", "😢 Sad", "😡 Angry"]),
            "color" => $this->faker->safeColorName,
            "reveal_date" => $this->faker->dateTimeBetween('now', '+1 year'),
            "image" => "images/" .$this->faker->uuid . ".jpg",
            "audio_path" => "audio/" . $this->faker->uuid . ".mp3",
            "privacy" => $this->faker->randomElement(["private", "public", "unlisted"]), 
            "surprise_mood" => $this->faker->boolean,
            "location" => $this->faker->city . ', ' . $this->faker->country,
            "ip_address" => $this->faker->ipv4,
            "tags" => implode(", ", $this->faker->words(3)),

        ];
    }
}
