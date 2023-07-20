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

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
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



Route::apiResource('/consultorios', ConsultorioController::class);
Route::get('/get-select-consult', [ConsultorioController::class, 'getConsultorio'])->name('get-select-consult');


Route::post('/doctor-availability', [DoctorController::class, 'getDoctorsAvailable']);

Route::apiResource('/citas', CitasController::class);


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);


