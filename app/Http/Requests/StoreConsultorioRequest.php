<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConsultorioRequest extends FormRequest
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
            
            'number' => 'required|string|max:10',
            'type' => 'required|string|max:30',
            'enable' => 'required',
            'description' => 'required|string|max:50',
            'medicalCenterId' => 'required',
            
        ];
}
}
