<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchProductRequest;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(SearchProductRequest $request)
    {
        $query = Product::query();
        if ($name = $request->validated('name')) {
            $query = $query->where('name', 'like', "%{$name}%");
        }

        $cartItems = Cart::with(['products', 'size'])
            ->where('user_id', Auth::id())
            ->get()
            ->map(function ($cartItem) {
                $cartItem->total = $cartItem->products->sum('price') * $cartItem->quantity;
                return $cartItem;
            });

        $sizeIds = $cartItems->pluck('size_id')->unique();
        $size = Size::whereIn('id', $sizeIds)->get();

        $total = $cartItems->sum('total');

        return Inertia::render('Cart/Cart', [
            'products' => $query->paginate(24),
            'filters' => request()->only('name'),
            'cartItems' => $cartItems,
            'sizes' => $size,
            'total' => $total,
        ]);
    }

    public function addToCart(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'size_id' => 'required|exists:sizes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $productId = $data['product_id'];
        $quantity = $data['quantity'];
        $sizeId = $data['size_id'];

        //Recupérer le produit pour calculer le total
        $product = Product::find($productId);

        $cart = Cart::create(
            [
                'user_id' => Auth::id(),
                'product_id' => $productId,
                'size_id' => $sizeId,
                'quantity' => $quantity,
                'total' => $product->price * $quantity,
            ]
        );

        $cart->products()->syncWithoutDetaching([$product]);

        return redirect()->route('cart.index')->with('success', 'Chaussure ajoutée au panier');
    }

    public function count()
    {
        $cartCount = Cart::where('user_id', Auth::id())->sum('quantity');
        return response()->json(['count' => $cartCount]);
    }

    public function updateQuantity(Request $request)
    {
        // Validation de la requête
        $data = $request->validate([
            'cart_id' => 'required|exists:carts,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::where('id', $data['cart_id'])->where('user_id', Auth::id())->first();

        $product = Product::find($data['product_id']);

        $cart->update(['quantity' => $data['quantity']]);
        $cart->update(['total' => $product->price * $data['quantity']]);

        return back()->with('success', 'Quantité mise à jour avec succès');
    }

    public function destroy(Cart $cart)
    {
        $cart->delete();

        return back()->with('error', 'Chaussure supprimée du panier');
    }
}
