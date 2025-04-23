<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index()
    {

        return Inertia::render('Admin/Users/Index', [
            'orders' => Order::orderBy('created_at')->paginate(1),
        ]);
    }

    public function destroy(Order $order): RedirectResponse
    {
        $order->delete();
        return redirect()->back();
    }
}
