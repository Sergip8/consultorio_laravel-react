<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientByCCResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'documentType' => $this->documentType,
            'document' => $this->document,
            'telephone' => $this->telephone,
            'address' => $this->address,
            'gender' => $this->gender,
            'userId' => $this->userId,
            'name' => $this->name,
            'email' => $this->email,
            'birthDate' => $this->birthDate->format('Y-m-d'),
           
        ];
    }
}
