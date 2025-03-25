<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Size;
use Inertia\Inertia;

class DetailProductController extends Controller
{
    public function show(string $slug)
    {
        $product = Product::get()->firstWhere('slug', $slug);

        return Inertia::render('Detail/Detail', [
            'productDetail' =>  $product,
            'sizes' => Size::orderBy('created_at')->get()
        ]);
    }
}
