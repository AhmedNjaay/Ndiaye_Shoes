<?php

namespace App\Http\Controllers;

use App\Http\Requests\SizeFormRequest;
use App\Models\Size;
use Inertia\Inertia;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Size/Size', [
            'sizes' => Size::orderBy('created_at')->paginate(8),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Size/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SizeFormRequest $request)
    {
        Size::create($request->validated());
        return redirect(route('size.index'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Size $size)
    {
        return Inertia::render('Size/Edit', [
            'sizes' => $size
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SizeFormRequest $request, Size $size)
    {
        $size->update($request->validated());
        return redirect(route('size.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Size $size)
    {
        $size->delete();
        return redirect(route('size.index'));
    }
}
