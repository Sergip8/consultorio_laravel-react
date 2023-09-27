<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CitasTest extends TestCase
{
    protected function cita(){
        $patient = $this->insert_patient();
        $doctorId = $this->insert_doctor();
        return array(  
            'type' => 'General',
            'date' => Date(now()),
            'description' => 'description_cita',
            'slot' => 20,
            'patientId' => $patient['id'],
            'doctorId' => $doctorId,
            'status' => 'ASIGNADO',
        );
    }
    public function test_create_cita_by_patient(){
    
        $this->auth_client();
        $this->auth_patient();
        
       
        $doctorId = $this->insert_doctor();
        $request = array(
            'specialization' => 'General',
            'date' => Date(now()),
            'id' => $doctorId,
        );
        $response = $this->post(
            route('citas.patient'),
            $request
        );
        $response->assertStatus(201);
        $this->assertEquals($response->json()['doctorId'], $doctorId);



    }
}
