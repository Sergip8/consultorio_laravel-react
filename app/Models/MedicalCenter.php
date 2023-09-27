<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalCenter extends Model
{
    use HasFactory;
    public $timestamps = false;
    /**
     * @var string $table
     */
    protected $table = 'medical_center';
      /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
        'name',
        'address',
        'telephone',
        'description',
        
        
    ];
}
