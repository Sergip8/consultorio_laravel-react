<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DoctorAvailabilityRequest;
use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Http\Resources\DoctorAvailabilityResource;
use App\Http\Resources\DoctorResource;
use App\Http\Resources\DoctorScheduleResource;
use App\Models\Doctor;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            $date = new DateTime($request['date']);
            $doctorRes = Doctor::where('specialization', $request['type'])
            ->leftJoin('citas', function($q) use($request){
                    $q->on('doctor.id', '=', 'citas.doctorId')
                    ->where('citas.date', '>=', $request['date']);
                })
            ->select('doctor.id', 'citas.date')
            ->orderBy('date', 'asc')
            ->get();
            foreach($doctorRes as $dr){
                $flag = true;
                if(new DateTime($dr['date']) == $date){
                    $date = $date->modify('+20 minutes');
                    continue;
                }
                foreach($result as $res){

                    if($res->id == $dr['id']){
                        $flag = false;
                    }
                }
                if($flag){

                    array_push($result, (object)['id' => $dr['id'], 'date' => $date->format('Y-m-d H:i:s')]);
                        $date = new DateTime($request['date']);
                }
            }
            //return $result;
            $doctorRes = [];
         foreach ($result as $res){
            $doctor = DB::table('doctor')
            ->where('doctor.id', $res->id) 
            ->join('users', 'users.id', '=', 'doctor.userId')
            ->join('consultorio', 'consultorio.id', '=', 'doctor.consultorioId')
            ->join('medical_center', 'consultorio.medicalCenterId', '=', 'medical_center.id')
            ->select('doctor.id', 'doctor.specialization', 'users.name', 'consultorio.number', 'medical_center.name as centerName', 'medical_center.address')
            ->first();
            $doctor->date = $res->date;    
            array_push($doctorRes, new DoctorAvailabilityResource($doctor) );
         }
            return $doctorRes;
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
public function getDoctorsBySpe ($spe){
    
       $doctor = Doctor::where('specialization', $spe)
        ->with(['citas' => function ($query) {
            $query->where('date', '>', date('y-m-d h:i:s'));
           }])
        ->join('users', 'users.id', '=', 'doctor.userId')
        ->join('consultorio', 'consultorio.id', '=', 'doctor.consultorioId')
        ->join('medical_center', 'consultorio.medicalCenterId', '=', 'medical_center.id')
        ->select('doctor.specialization', 'users.name', 'doctor.id', 'doctor.telephone', 'consultorio.number', 'medical_center.name as centerName', 'medical_center.address')
        ->get();
        return $doctor;
}

    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return response("", 204);
    }
    public function getDoctorsSchedule(Request $request){
        
        $doctor = Doctor::where('specialization', $request->spe)
        // ->with(['citas' => function ($query) use($request) {
        //     $query->where('date', '>', date('Y-m-d H:i:s', strtotime($request->date)));
        //    }])
        ->join('users', 'users.id', '=', 'doctor.userId')
        ->select('doctor.specialization', 'users.name', 'doctor.id')

        ->get();
        return $doctor;
    }
    public function getDoctorsScheduleCC(Request $request){
        $doctor = Doctor::where('document', 'LIKE', $request->spe.'%')
        // ->with(['citas' => function ($query) use($request) {
        //     $query->where('date', '>', date('Y-m-d H:i:s', strtotime($request->date)));
        //    }])
        ->join('users', 'users.id', '=', 'doctor.userId')
        ->select('doctor.specialization', 'users.name', 'doctor.id')

        ->get();
        return $doctor;
    }
    public function getDoctorsAppointmentByDoctorId(Request $request){
        //return date('Y-m-d', strtotime($request->dateC. ' - 1 days'));
        $res = [];
        foreach ($request->doctorsId as $r){
            $doctor = Doctor::where( 'doctor.id', $r)
            ->with(['citas' => function ($query) use($request) {
                $query->where('date', '>', date('Y-m-d', strtotime($request->dateC. ' - 1 days')));
               }])
            ->join('users', 'users.id', '=', 'doctor.userId')
            ->select('doctor.specialization', 'users.name', 'doctor.id')
    
            ->first();
            
            array_push($res, $doctor);
        }
        return $res;
    }
  
}
