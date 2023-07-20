<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    public $timestamps = false;
    /**
     * @var string $table
     */
    protected $table = 'patients';
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
        'gender',
        'birthDate',
        'userId'
        
    ];
    protected $casts = [
        'birthDate' => 'date',
        
    ];
  
}
