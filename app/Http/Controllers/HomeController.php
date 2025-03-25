<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchProductRequest;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(SearchProductRequest $request)
    {
        $query = Product::query();
        if ($name = $request->validated('name')) {
            $query = $query->where('name', 'like', "%{$name}%");
        }


        return Inertia::render('Home/Home', [
            'products' => $query->paginate(24),
            'filters' => request()->only('name'),
        ]);
    }
}
