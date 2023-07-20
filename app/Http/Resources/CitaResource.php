<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CitaResource extends JsonResource
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
            'type' => $this->type,
            'date' => $this->date->format('Y-m-d H:i:s'),
            'description' => $this->description,
            'slot' => $this->slot,
            'patientId' => $this->patientId,
            'doctorId' => $this->doctorId,
            
 
           
        ];
    }
}
