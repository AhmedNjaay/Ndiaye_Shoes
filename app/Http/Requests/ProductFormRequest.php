<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductFormRequest extends FormRequest
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
            'name' => ['required'],
            'price' => ['required', 'numeric', 'min:5'],
            'description' => ['nullable', 'string'],
            'stock_quantity' => ['required', 'integer'],
            'size_ids' => ['required', 'array', 'exists:sizes,id'], //chaque valeur de size_ids existe dans la colonne id de la table sizes 
            'image' => ['nullable', 'mimes:jpeg,jpg,png'],
        ];
    }
}
