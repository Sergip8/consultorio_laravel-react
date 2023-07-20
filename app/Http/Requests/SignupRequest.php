<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            "password" => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ]
        ];
    }
    // public function messages() {
    //     return [
    //         'email.required' => 'El campo Email es requerido',
    //         'email.email' => 'El Email debe estar en un formato valido',
    //         'password.required' => 'El campo Password es requerido',
    //         'password.confirmed' => 'El Password no concuerda',
    //         'password.min' => 'El Password debe ser minimo de 8 caracteres',
    //         'password.this->letters' => 'El Password debe contener minimo una letra',
    //         'password.symbols' => 'El Password debe contener minimo un simbolo',
            
    //     ];
    // }
}
