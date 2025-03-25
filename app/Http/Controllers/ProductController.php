<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Product/Product', [
            'products' => Product::orderBy('created_at', 'desc')->paginate(1),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Product/Form', [
            'sizes' => Size::orderBy('created_at')->get()->toArray(), //orderBy par défaut(asc)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductFormRequest $request, Product $product): RedirectResponse
    {

        $imagePath = $request->file('image')->store('images', 'public'); // Store dans 'storage\app\public\images'
        $imageUrl = Storage::url($imagePath); // Obtenir l'URL publique de l'image

        // Créer un produit avec l'URL de l'image
        $product = Product::create([
            'name' => $request->validated()['name'],
            'price' => $request->validated()['price'],
            'stock_quantity' => $request->validated()['stock_quantity'],
            'description' => $request->validated()['description'],
            'image' => $imageUrl, // Enregistrer l'URL de l'image dans la base de données
        ]);

        $product->sizes()->sync($request->input('size_ids', []));

        return redirect(route('product.index'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Product/Edit', [
            'products' => $product,
            'sizes' => Size::orderBy('created_at')->get()->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductFormRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();

        // Vérifie si une nouvelle image est uploadée
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            // Supprime l'ancienne image
            if ($product->image) {
                $oldImagePath = str_replace('/storage/', '', $product->image);
                Storage::disk('public')->delete($oldImagePath);
            }

            // Enregistre la nouvelle image
            $imagePath = $request->file('image')->store('images', 'public');
            $data['image'] = Storage::url($imagePath);
        }

        // Mettre à jour le produit
        $product->update($data);
        $product->sizes()->sync($request->input('sizes_ids', []));

        return redirect(route('product.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
        $product->delete();
        return redirect(route('product.index'));
    }
}
