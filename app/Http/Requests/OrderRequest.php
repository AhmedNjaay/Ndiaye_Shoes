<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'email' => ['required', 'string', 'email'],
            'first_name' => ['required', 'string'],
            'name' => ['required', 'string'],
            'address' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'cartItems' => ['required', 'array'],
            'cartItems.*.product_id' => ['required', 'exists:products,id'],
            'cartItems.*.size_id' => ['required', 'integer', 'min:1'], //size_id fait référence à cartItems et * signifie qu'on applique la règle à chaque élément du tableau
            'cartItems.*.quantity' => ['required', 'integer', 'min:1'],

        ];
    }
}
