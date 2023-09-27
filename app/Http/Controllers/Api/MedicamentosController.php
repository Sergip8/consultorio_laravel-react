<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Medicamentos;
use App\Http\Requests\StoreMedicamentosRequest;
use App\Http\Requests\UpdateMedicamentosRequest;
use App\Http\Resources\MedicamentoResource;

class MedicamentosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MedicamentoResource::collection(
            Medicamentos::query()->get());
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
    public function store(StoreMedicamentosRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Medicamentos $medicamentos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Medicamentos $medicamentos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicamentosRequest $request, Medicamentos $medicamentos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medicamentos $medicamentos)
    {
        //
    }
}
