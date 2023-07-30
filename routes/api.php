<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CitasController;
use App\Http\Controllers\Api\ConsultorioController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PatientController;

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
    Route::apiResource('/users', UserController::class);
    Route::get('/users-by-email/{search}', [UserController::class, 'getUsersByEmail']);


});

    
Route::apiResource('/patients', PatientController::class);
Route::get('/patients-by-cc/{cc}', [PatientController::class, 'getPatientByCC']);
Route::get('/patients-apptment/{search}', [PatientController::class, 'getPatientByCCForAppointment']);



Route::apiResource('/doctors', DoctorController::class);
Route::get('/doctors-by-cc/{cc}', [DoctorController::class, 'getDoctorsByCC']);
Route::get('/doctorSpe/{spe}', [DoctorController::class, 'getDoctorsBySpe']);
Route::post('/doctor-availability', [DoctorController::class, 'getDoctorsAvailable']);
Route::get('/doctor-schedule', [DoctorController::class, 'getDoctorsSchedule']);



Route::apiResource('/consultorios', ConsultorioController::class);
Route::get('/get-select-consult', [ConsultorioController::class, 'getConsultorio'])->name('get-select-consult');


Route::post('/doctor-availability', [DoctorController::class, 'getDoctorsAvailable']);

Route::apiResource('/citas', CitasController::class);
Route::post('/citas-patient', [CitasController::class, 'createCita']);
Route::get('/get-cita-by-userid/{userId}', [CitasController::class, 'getCitasByUserId']);
Route::get('/get-cita-by-doctor-userid/{userId}', [CitasController::class, 'getCitasByDoctorUserId']);

Route::post('/citas-change-status', [CitasController::class, 'updateStatus']);





Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);




