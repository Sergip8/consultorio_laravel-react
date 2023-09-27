<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicamentos extends Model
{
    use HasFactory;

    public $timestamps = false;
    /**
     * @var string $table
     */
    protected $table = 'medicamentos';
      /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
        "name",
        "brand",
        "dosage_form",
        "dosage_grams",
        'dosage'
        
    ];

  
}
