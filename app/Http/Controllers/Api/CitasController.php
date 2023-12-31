<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\CitaPacienteRequest;
use App\Models\Citas;
use App\Http\Requests\StoreCitasRequest;
use App\Http\Requests\UpdateCitasRequest;
use App\Http\Requests\UpdateStatusCitaRequest;
use App\Http\Resources\CitaResource;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\returnSelf;

class CitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CitaResource::collection(
            Citas::query()->orderBy('id', 'desc')->paginate());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCitasRequest $request)
    {
        {
            $data = $request->validated();
           
            $cita = Citas::query()->create($data);
    
            return response(new CitaResource($cita), 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Citas $citas)
    {
        return new CitaResource($citas);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Citas $citas)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCitasRequest $request, Citas $citas)
    {
            
            // $cita = Citas::find($request->id);
            // $cita->status = 'CANCELADO';
            // $cita->save();
           
       
    }
    public function updateStatus(UpdateStatusCitaRequest $req){
        $cita = Citas::find($req->id);
        $cita->status = $req->status;
        $cita->timestamps = false;
        $cita->save();
        return $cita;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Citas $citas)
    {
        //
    }
    public function createCita(CitaPacienteRequest $req){
        $user = auth()->user();
        $patient = Patient::where('userId', $user['id'])->first();
        $doctor = DB::table('doctor')
            ->where('doctor.id', $req->id) 
            ->join('users', 'users.id', '=', 'doctor.userId')
            ->join('consultorio', 'consultorio.id', '=', 'doctor.consultorioId')
            ->join('medical_center', 'consultorio.medicalCenterId', '=', 'medical_center.id')
            ->select('doctor.id', 'doctor.specialization', 'users.name', 'consultorio.number', 'medical_center.name as centerName', 'medical_center.address')
            ->first();
        return Citas::query()->create([
            'doctorId' => $req['id'],
            'patientId' => $patient['id'],
            'type' => $req['specialization'],
            'date' => $req['date'],
            'slot' => 20,
            'description' => $req->specialization. ' con el doctor '.$doctor->name.' en el centro '.$doctor->centerName.' consultorio '.$doctor->number

        ]);
    }
    public function getCitasByUserId($userId) {
        $patient = Patient::where('userId', $userId)->first();
        $citas = CitaResource::make(
            Citas::with('tratamientos.medicamento')->where('patientId', $patient['id']))
             //->join('medicamentos', 'medicamentos.id', '=', 'tratamientos.medicamentoId')
            ->orderBy('date', 'desc')->paginate(10);
        return $citas;
    }
    public function getCitasByDoctorUserId($userId){
        $doctor = Doctor::where('userId', $userId)->first();
        return Citas::where('doctorId', $doctor['id'])
            ->where('citas.status','ASIGNADO')
            ->join('patients', 'patients.id', '=', 'citas.patientId')
            ->join('users', 'users.id', '=', 'patients.userId')
            ->select('citas.id', 'citas.date', 'citas.description', 'users.name', 'patients.id as patientId', 'patients.documentType', 'patients.document')            
            ->orderBy('date', 'desc')->paginate(10);
    }
}
