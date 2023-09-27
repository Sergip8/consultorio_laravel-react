<?php

namespace App\Http\Controllers\Api;

use App\Models\Tratamiento;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTratamientoRequest;
use App\Http\Requests\UpdateTratamientoRequest;
use App\Models\Citas;
use Illuminate\Support\Facades\DB;
class TratamientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTratamientoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Tratamiento $tratamiento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tratamiento $tratamiento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTratamientoRequest $request, Tratamiento $tratamiento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tratamiento $tratamiento)
    {
        //
    }
    public function saveTreatment(StoreTratamientoRequest $treatment){
        //return array_values($treatment->data[0]);
        $tratamiento = Tratamiento::insert($treatment->data);
        $arr = array_values($treatment->data[0]);
        $first = end($arr);
        $cita = Citas::find($arr[3]);
        $cita->status = 'ATENDIDO';
        $cita->timestamps = false;
        $cita->save();
    
        return $treatment;
    }
}
