<?php

namespace App\Http\Controllers;

use App\Events\OrderEvent;
use App\Http\Requests\OrderRequest;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $cartItems = Cart::with(['products', 'size'])
            ->where('user_id', Auth::id())
            ->get()->map(function ($cartItem) {
                $cartItem->total = $cartItem->products->sum('price') * $cartItem->quantity;
                return $cartItem;
            });

        $total = $cartItems->sum('total');
        return Inertia::render('Order/Order', [
            'cartItems' => $cartItems,
            'total' => $total,
            'auth' => ['user' => Auth::user()],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request): RedirectResponse
    {
        $total = collect($request->cartItems)->sum(fn($item) => $item['total']);

        $order = Order::create([
            'user_id' => Auth::id(),
            'email' => $request->validated()['email'],
            'first_name' => $request->validated()['first_name'],
            'name' => $request->validated()['name'],
            'address' => $request->validated()['address'],
            'phone' => $request->validated()['phone'],
            'total' => $total,
        ]);

        foreach ($request->cartItems as $item) {
            $order->orderItems()->create([
                'product_id' => $item['product_id'],
                'size_id' => $item['size_id'],
                'quantity' => $item['quantity'],
            ]);
        }

        // delete the cart after order
        Cart::where('user_id', Auth::id())->delete();

        event(new OrderEvent($order));

        return redirect()->route('home')->with('success', 'Commande effectuée avec succès');
    }
}
