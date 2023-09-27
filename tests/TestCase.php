<?php

namespace Tests;

use App\Models\Consultorio;
use App\Models\MedicalCenter;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use RefreshDatabase;


    public function setUp(): void{
        parent::SetUp();
        $this->withoutExceptionHandling();
        

    }
    public $user = array(
        'name' => "user",
        'email' => 'user@email.com',
        'role' => 'PATIENT',
        'password' => 'a$888888',
        'password_confirmation' => 'a$888888'
    );

    public function auth_client()
    {
        User::create(['name' => "Manolo", 
        'email' => 'ggg@sss.com', 
        'password' => 'a$888888', 
        'password_confirmation' => 'a$888888']);
        $loginResponse = $this->post(route('login'), ['email' => 'ggg@sss.com', 'password' => 'a$888888']);
        $token = $loginResponse->json()['authorisation']['token'];
        $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json'
        ]);
    }
    public function insert_user()
    {
        $this->user['email'] = fake()->unique()->safeEmail();
        
        $user = $this->post(route('users.store'), $this->user)->json();
        //dd($user);
        return $user;
    }
    public function auth_patient(){
        $patient = $this->insert_patient();
        Log::debug($patient);
        $user = User::where('id', $patient['userId'])->first();
        $loginResponse = $this->post(route('login'), ['email' => $user['email'], 'password' => 'a$888888']);
        $token = $loginResponse->json()['authorisation']['token'];
        //dd($token);
        $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json'
        ]);
    }

    public function patient(){
        $user = $this->insert_user();

         return array(
            'documentType' => 'CC',
            'document' => '12244545',
            'telephone' => '7554566',
            'address' => 'av 454s44s',
            'gender' => 'Mujer',
            'birthDate' => Date(now()),
            "userId" => $user['id'],
        );
    }
    public function insert_patient()
    {
        
        return $this->post(route('patients.store'), $this->patient())->json();
    }


    public function doctor(){
        $user = $this->insert_user();
        $consultorio = $this->insert_consultorio();
         return array(
            'documentType' => 'CC',
            'document' => '12244545',
            'telephone' => '7554566',
            'address' => 'av 454s44s',
            'specialization' => 'General',
            'professionalCard' => 'f4444444',
            'consultorioId' => $consultorio->id,
            "userId" => $user['id'],
        );
    }
    public function insert_doctor()
    {
        
        return $this->post(route('doctors.store'), $this->doctor())->json()['id'];
    }


    public function insert_medicalCenter(){
       return MedicalCenter::query()->create(
            [
                'name'=> 'Centro_1',
                'address'=> 'df5555d5',
                'telephone' => '55498874',
                'description' => 'description_1',
            ]
            );    
    }
    public function insert_consultorio(){
        $center = $this->insert_medicalCenter();
        return Consultorio::query()->create(
            [
                'number' => '102',
                'type' => 'General',
                'enable' => true,
                'description' => 'description_consultorio',
                'medicalCenterId' => $center->id,
            ]
            );
    }
}
