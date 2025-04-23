<?php

namespace Tests\Feature;

use App\Models\Admin;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;


    public function setUp(): void
    {
        parent::setUp();

        /** @var \App\Models\Admin $admin **/

        //Création et connection admin
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin'); // Authentification avec le guard "admin"
    }

    public function test_product_screen_can_be_rendered(): void
    {
        $response = $this->get('/admin-panel-9863/product');

        $response->assertStatus(200);
    }

    public function test_product_create_screen_can_be_rendered(): void
    {
        $response = $this->get('/admin-panel-9863/product/create');

        $response->assertStatus(200);
    }

    public function test_admin_can_add_product(): void
    {
        Storage::fake('public'); //Simuler le disque public
        $image = UploadedFile::fake()->image('product.png');

        $size = Size::factory()->count(5)->create();

        $product = Product::factory()->make();

        $response = $this->post(route('product.store'), [
            'name' => $product->name,
            'price' => $product->price,
            'stock_quantity' => $product->stock_quantity,
            'description' => $product->description,
            'image' => $image,
            'size_ids' => $size->pluck('id')->toArray(),
        ]);

        $this->assertTrue(Storage::disk('public')->exists('images/' . $image->hashName()));

        $this->assertDatabaseHas('products', [
            'name' => $product->name,
            'price' => $product->price,
            'stock_quantity' => $product->stock_quantity,
            'description' => $product->description,
            'image' => '/storage/images/' . $image->hashName(),
        ]);

        $createdProduct = Product::where('name', $product->name)->first();

        // Vérifier que chaque taille est bien liée dans la table pivot
        foreach ($size as $s) {
            $this->assertDatabaseHas('size_product', [
                'product_id' => $createdProduct->id,
                'size_id' => $s->id,
            ]);
        }

        $response->assertRedirect(route('product.index'));
    }
}
