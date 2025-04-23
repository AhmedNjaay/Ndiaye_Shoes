<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminLoginController extends Controller
{
    public function showLoginForm(): Response
    {
        return Inertia::render('Admin/Login');
    }

    public function store(Request $request): RedirectResponse
    {

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate();

            if (Auth::guard('admin')) {
                return redirect()->intended('/admin-panel-9863/product');
            } else {
                Auth::guard('admin')->logout();
                return back()->withErrors([
                    'email' => 'Vous n\'êtes pas autorisé à accéder à cette page',
                ]);
            }
        }

        return back()->withErrors([
            'email' => 'Les informations fournies sont incorrectes.',
        ]);
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('admin.login'));
    }
}
