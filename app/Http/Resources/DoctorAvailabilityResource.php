<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorAvailabilityResource extends JsonResource
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
            'specialization' => $this->specialization,
            'name' => $this->name,
            'number' => $this->number,
            'address' => $this->address,
            'number' => $this->number,
            'centerName' => $this->centerName,
            'date' => $this->date,
            
            


            
            



           
        ];
    }
}
