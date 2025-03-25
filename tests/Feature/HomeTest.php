<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomeTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_view_home(): void
    {
        $product = Product::factory()->count(6)->create();
        $response = $this->get(route('home'));

        $response->assertStatus(200);

        $response->assertInertia(
            fn(Assert $page) => $page
                ->component('Home/Home')
                ->has(
                    'products.data',
                    6
                )
                ->where('products.data.4.id', $product[4]->id)
                ->where('products.data.4.image', $product[4]->image)
                ->where('products.data.4.name', $product[4]->name)
                ->where('products.data.4.price', $product[4]->price)
        );
    }

    public function test_users_can_view_detail(): void
    {
        $product = Product::factory()->create();

        $response = $this->get(route('detail.show', ['slug' => $product->slug]));
        $response->assertStatus(200);
    }
}
