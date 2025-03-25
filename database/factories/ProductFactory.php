<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Size;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Product::class; // Lie la factory au modèle Product

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'price' => fake()->numberBetween(20000, 140000),
            'stock_quantity' => fake()->numberBetween(1, 100),
            'image' => 'images/default.png',
            'description' => fake()->sentence(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Product $product) {
            $sizes = Size::inRandomOrder()->take(rand(1, 5))->pluck('id');
            $product->sizes()->attach($sizes);
        });
    }
}
