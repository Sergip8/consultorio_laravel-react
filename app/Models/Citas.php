<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Citas extends Model
{
    public $timestamps = false;
    /**
     * @var string $table
     */
    protected $table = 'citas';
      /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
        'date',
        'slot',
        'type',
        'state',
        'description',
        'patientId',
        'doctorId',

        
        
    ];
    protected $casts = [
        'date' => 'datetime',
        
    ];

}
