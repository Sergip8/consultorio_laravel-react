<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tratamiento extends Model
{
    use HasFactory;

    public $timestamps = false;
    /**
     * @var string $table
     */
    protected $table = 'tratamientos';
      /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
        "description",
        "quantity",
        'medicamentoId',
        'citasId',
        
        
    ];
    public function citas()
    {
       return $this->belongsTo('App\Models\Citas'); 
    }
    // public function medicamentos()
    // {
    //    return $this->hasMany('App\Models\Medicamentos','medicamentoId', 'id');
    // }
    public function medicamento()
    {
        return $this->hasOne('App\Models\Medicamentos','id', 'medicamentoId');
   }
   
}
