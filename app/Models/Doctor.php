<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    public $timestamps = false;
    /**
     * @var string $table
     */
    protected $table = 'doctor';
      /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
        'documentType',
        'document',
        'telephone',
        'address',
        'specialization',
        'professionalCard',
        'userId',
        'consultorioId'
        
    ];

  
}
