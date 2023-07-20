<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDoctorRequest extends FormRequest
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
            
            'documentType' => 'required|string|max:10',
            'document' => 'required|string|max:15',
            'telephone' => 'required|string|max:12',
            'address' => 'required|string|max:50',
            'specialization' => 'required|string|max:30',
            'professionalCard' => 'required|string|max:15',
            'userId' => 'required',
            'consultorioId' => 'required'

        ];
}
}
