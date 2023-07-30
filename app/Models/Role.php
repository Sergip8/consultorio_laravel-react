<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public $timestamps = false;
    /**
     * @var string $table
     */
    protected $table = 'roles';
      /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
        
        'role',
        'userId'
        
    ];
    public function user()
    {
       return $this->belongsTo('App\Models\User'); 
   }
   
  
}
