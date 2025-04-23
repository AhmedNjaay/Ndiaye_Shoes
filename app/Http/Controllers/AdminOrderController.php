<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Orders/Index', [
            'orderItems' => OrderItem::orderBy('created_at')->paginate(1),
        ]);
    }
}
