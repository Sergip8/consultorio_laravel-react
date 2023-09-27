<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Resources\PatientResource;
use App\Http\Resources\PatientByCCResource;


class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PatientResource::collection(
            Patient::query()->orderBy('id', 'desc')->paginate());
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
    public function store(StorePatientRequest $request)
    {
        {
            $data = $request->validated();
           
            $patient = Patient::query()->create($data);
    
            return response(new PatientResource($patient), 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return new PatientResource($patient);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        {
            $data = $request->validated();
          
            $patient->update($data);
            return new PatientResource($patient);
        }
    }
   

    public function getPatientByCC($cc){
        return PatientResource::collection(
            Patient::where('document', 'LIKE', $cc.'%')
            ->orderBy('id', 'desc')->paginate(10));
    }
    public function getPatientByCCForAppointment($cc){
        return PatientByCCResource::collection(
            Patient::where('document', 'LIKE', $cc.'%')->join('users', 'users.id', '=', 'patients.userId')
            ->select('patients.*', 'users.name', 'users.email')
            ->limit(10)
            ->get());
    }
    public function destroy(Patient $patient)
    {
        $patient->delete();
        return response("", 204);
    }
    
}
