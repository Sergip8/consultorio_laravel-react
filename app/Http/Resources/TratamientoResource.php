<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TratamientoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'description' => $this->description,
            'quantity' => $this->quantity,
            'medicamentoId' => $this->medicamentoId,
            'citasId' => $this->citasId,
           
        ];
    }
}
