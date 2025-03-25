<?php

namespace Tests\Feature;

use App\Models\Size;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SizeTest extends TestCase
{

    use RefreshDatabase;

    public function test_size_screen_can_be_rendered(): void
    {
        $response = $this->get('/size');

        $response->assertStatus(200);
    }


    public function test_size_create_screen_can_be_rendered(): void
    {
        $response = $this->get('/size/create');

        $response->assertStatus(200);
    }

    public function test_admin_can_add_size(): void
    {
        $size = Size::factory()->create();
        $response = $this->post(route('size.store', [
            'numberSize' => $size->numberSize,
        ]));

        $response->assertRedirect(route('size.index'));
    }

    public function test_admin_can_update_size(): void
    {
        $size = Size::factory()->create();
        $updatedSize = [
            'numberSize' => 39,
        ];

        $response = $this->put(route('size.update', $size), $updatedSize);

        $this->assertDatabaseHas('sizes', [
            'id' => $size->id,
            'numberSize' => 39,
        ]);

        $response->assertRedirect(route('size.index'));
    }

    public function test_admin_can_delete_size(): void
    {
        $size = Size::factory()->create();

        $response = $this->delete(route('size.destroy', $size));

        $this->assertDatabaseMissing('sizes', [
            'id' => $size->id,
        ]);

        $response->assertRedirect(route('size.index'));
    }
}
