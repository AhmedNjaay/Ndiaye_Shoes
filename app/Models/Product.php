<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'stock_quantity',
        'image',
        'description',
    ];

    protected $appends = ['slug'];

    public function getSlugAttribute(): string
    {
        return Str::slug($this->name);
    }

    public function sizes(): BelongsToMany
    {
        return $this->belongsToMany(Size::class, 'size_product');
    }

    public function carts(): BelongsToMany
    {
        return $this->belongsToMany(Cart::class, 'cart_product');
    }

    public function order_items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
