<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CitasController;
use App\Http\Controllers\Api\ConsultorioController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\MedicamentosController;
use App\Http\Controllers\Api\TratamientoController;
use App\Http\Controllers\MedicalCenterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->group(function() {
    Route::get('/user', function () {
        return auth()->user()->load('role');
    });
    Route::get('/user-patient', function () {
        return auth()->user()->load('role')->load('patient');
    });
    Route::get('/user-doctor', function () {
        return auth()->user()->load('role')->load('doctor');
    });
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users-by-email/{search}', [UserController::class, 'getUsersByEmail']);
    
    
});

Route::apiResource('/users', UserController::class)
->name('index', 'users.index')
->name('show', 'users.show')
->name("store", 'users.store')
->name('update', 'users.update');
    
Route::apiResource('/patients', PatientController::class)
->name('index', 'patients.index')
->name('show', 'patients.show')
->name("store", 'patients.store')
->name('update', 'patients.update');

Route::get('/patients-by-cc/{cc}', [PatientController::class, 'getPatientByCC']);
Route::get('/patients-apptment/{search}', [PatientController::class, 'getPatientByCCForAppointment']);



Route::apiResource('/doctors', DoctorController::class)
->name('index', 'doctors.index')
->name('show', 'doctors.show')
->name("store", 'doctors.store')
->name('update', 'doctors.update');

Route::get('/doctors-by-cc/{cc}', [DoctorController::class, 'getDoctorsByCC']);
Route::get('/doctorSpe/{spe}', [DoctorController::class, 'getDoctorsBySpe']);
Route::post('/doctor-availability', [DoctorController::class, 'getDoctorsAvailable']);
Route::get('/doctor-schedule', [DoctorController::class, 'getDoctorsSchedule']);
Route::get('/doctor-schedule-cc', [DoctorController::class, 'getDoctorsScheduleCC']);
Route::get('/doctor-dates', [DoctorController::class, 'getDoctorsAppointmentByDoctorId']);


Route::apiResource('/medicalCenter', MedicalCenterController::class)
->name('store', 'center.store');



Route::apiResource('/consultorios', ConsultorioController::class);
Route::get('/get-select-consult', [ConsultorioController::class, 'getConsultorio'])->name('get-select-consult');


Route::post('/doctor-availability', [DoctorController::class, 'getDoctorsAvailable']);

Route::apiResource('/citas', CitasController::class);
Route::post('/citas-patient', [CitasController::class, 'createCita'])
->name('citas.patient');
Route::get('/get-cita-by-userid/{userId}', [CitasController::class, 'getCitasByUserId']);
Route::get('/get-cita-by-doctor-userid/{userId}', [CitasController::class, 'getCitasByDoctorUserId']);
Route::post('/citas-change-status', [CitasController::class, 'updateStatus']);

Route::apiResource('/medicamentos', MedicamentosController::class);

Route::post('/save-treatment', [TratamientoController::class, 'saveTreatment']);



Route::post('/signup', [AuthController::class, 'signup'])->name('signup');
Route::post('/login', [AuthController::class, 'login'])->name('login');




