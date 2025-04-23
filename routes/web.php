<?php

use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\DetailProductController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SizeController;
use Illuminate\Support\Facades\Route;


Route::prefix('/admin-panel-9863')->group(function () {
    Route::middleware('guest:admin')->group(function () {
        Route::get('/login', [AdminLoginController::class, 'showLoginForm'])->name('admin.login');
        Route::post('/login', [AdminLoginController::class, 'store'])->name('admin.login.store');
    });

    Route::post('/logout', [AdminLoginController::class, 'logout'])->name('admin.logout');

    Route::middleware(['isAdmin'])->group(function () {
        Route::resource('product', ProductController::class)->except(['show']);
        Route::resource('size', SizeController::class)->except(['show']);
        Route::get('/users', [AdminUserController::class, 'index'])->name('admin.users.index');
        Route::delete('/users/{order}', [AdminUserController::class, 'destroy'])->name('admin.users.destroy');
        Route::get('/orders', [AdminOrderController::class, 'index'])->name('admin.orders.index');
    });
});


Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::post('/', 'index')->name('home.search');
});


Route::middleware('auth')->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'addTocart'])->name('cart.add');
    Route::get('/cart-count', [CartController::class, 'count'])->name('cart.count');
    Route::patch('/cart', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');
    Route::delete('/cart/{cart}', [CartController::class, 'destroy'])->name('cart.destroy');

    Route::resource('order', OrderController::class);

    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
});


Route::get('/sn/{slug}', [DetailProductController::class, 'show'])->name('detail.show');



require __DIR__ . '/auth.php';
