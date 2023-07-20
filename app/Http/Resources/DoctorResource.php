<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorResource extends JsonResource
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
            'specialization' => $this->specialization,
            'professionalCard' => $this->professionalCard,
            'consultorioId' => $this->consultorioId,
            'userId' => $this->userId,
            



           
        ];
    }
}
