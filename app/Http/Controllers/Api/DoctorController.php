<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DoctorAvailabilityRequest;
use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Http\Resources\DoctorAvailabilityResource;
use App\Http\Resources\DoctorResource;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DoctorResource::collection(
            Doctor::query()->orderBy('id', 'desc')->paginate());
    }

    public function store(StoreDoctorRequest $request)
    {
        {
            $data = $request->validated();
           
            $doctor = Doctor::query()->create($data);
    
            return response(new DoctorResource($doctor), 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Doctor $doctor)
    {
        return new DoctorResource($doctor);
    }


    public function update(UpdateDoctorRequest $request, Doctor $doctor)
    {
        {
            $data = $request->validated();
          
            $doctor->update($data);
            return new DoctorResource($doctor);
        }
    }

    public function getDoctorsByCC($cc){
        return DoctorResource::collection(
            Doctor::where('document', 'LIKE', $cc.'%')
            ->orderBy('id', 'desc')->paginate(10));
    }
    public function getDoctorsAvailable(DoctorAvailabilityRequest $request){
         
            $result = [];
            $date = $request['date'];
            $doctorRes = Doctor::where('specialization', $request['type'])
            ->leftJoin('citas', function($q) use($request){
                    $q->on('doctor.id', '=', 'citas.doctorId')
                    ->where('citas.date', '>=', $request['date']);
                })
            ->select('doctor.id', 'citas.date')
            ->orderBy('date', 'asc')
            ->get();
            
            foreach($doctorRes as $dr){
                if($dr['date'] == $date){
                    $date = date("Y-m-d H:i:s", strtotime( $date, "+20 minutes" ));
                    continue;
                }
                array_push($result, [$dr['id'], $date]);

            }
            return $result;
            // ->join('users', 'users.id', '=', 'doctor.userId')
            // ->join('consultorio', 'consultorio.id', '=', 'doctor.consultorioId')
            // ->join('medical_center', 'consultorio.medicalCenterId', '=', 'medical_center.id')
                 
                
            // ->select('doctor.id', 'doctor.specialization', 'users.name', 'consultorio.number', 'medical_center.name as centerName', 'medical_center.address')
            // ->limit(10)
            // ->get()
        //);
            // ->join('consultorio', 'consultorio.id', '=', 'doctor.consultorioId')
            // ->leftJoin('citas', function($q, $ggg){
            //     $q->on('doctor.id', '=', 'citas.doctorId')
            //     ->on('citas.date', '=', $ggg['date']);
            // })
            // ->join('medical_center', 'consultorio.medicalCenterId', '=', 'medical_center.id')
            // ->select('doctor.specialization', 'users.name', 'consultorio.number', 'medical_center.name', 'medical_center.address')
            // ->limit(10)
            // ->get());
    }
    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return response("", 204);
    }
  
}
