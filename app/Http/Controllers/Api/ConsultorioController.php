<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreConsultorioRequest;
use App\Http\Requests\UpdateConsultorioRequest;
use App\Http\Resources\ConsultorioCenterResource;
use App\Http\Resources\ConsultorioResource;
use App\Models\Consultorio;
use Illuminate\Http\Request;

class ConsultorioController extends Controller
{
    public function index()
    {
        return ConsultorioResource::collection(
            Consultorio::query()->orderBy('id', 'desc')->paginate());
    }
    public function show(Consultorio $consultorio)
    {
        return new ConsultorioResource($consultorio);
    }
    public function store(StoreConsultorioRequest $request)
    {
        {
            $data = $request->validated();
           
            $doctor = Consultorio::query()->create($data);
    
            return response(new ConsultorioResource($doctor), 201);
        }
    }

    public function update(UpdateConsultorioRequest $request, Consultorio $consultorio)
    {
        {
            $data = $request->validated();
          
            $consultorio->update($data);
            return new ConsultorioResource($consultorio);
        }
    }
    public function getConsultorio(){
        return ConsultorioCenterResource::collection(
            Consultorio::query()->rightJoin('medical_center', 'consultorio.medicalCenterId', '=', 'medical_center.id')
            ->select('consultorio.*', 'medical_center.name')->get());
    }
}
