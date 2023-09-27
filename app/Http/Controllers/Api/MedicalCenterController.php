<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MedicalCenter;
use App\Http\Requests\StoreMedicalCenterRequest;
use App\Http\Requests\UpdateMedicalCenterRequest;
use App\Http\Resources\MedicalCenterResource;

class MedicalCenterController extends Controller
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
    public function store(StoreMedicalCenterRequest $request)
    {
        
            $data = $request->validated();
           
            $medicalCenter = MedicalCenter::query()->create($data);
    
            return response(new MedicalCenterResource($medicalCenter), 201);
        
    }
    

    /**
     * Display the specified resource.
     */
    public function show(MedicalCenter $medicalCenter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MedicalCenter $medicalCenter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicalCenterRequest $request, MedicalCenter $medicalCenter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicalCenter $medicalCenter)
    {
        //
    }
}
