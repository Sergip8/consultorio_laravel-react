<?php

namespace Tests\Feature;

use App\Models\Patient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use \Datetime;
use Illuminate\Support\Facades\Date;

class PatientTest extends TestCase
{
  

    public function test_get_patient() {
        $this->auth_client();
        for ($i = 0; $i < 5; $i++){
            Patient::query()->create($this->patient());
        }
        $response = $this->get(route('patients.index'));
        $response->assertStatus(200);
        $this->assertEquals(5,count($response->json()["data"]));
    }
    public function test_get_patient_by_id(){
        $this->auth_client();
        Patient::query()->create($this->patient());
        $response = $this->getJson(route('patients.show', 1))
            ->assertStatus(200)->json();
        $this->assertEquals($response['data']['telephone'], "7554566");
    }
    public function test_create_patient(){
        $this->auth_client();
        $response = $this->post(
            route('patients.store'),
            $this->patient()
        );
        $response->assertStatus(201);
    }
    public function test_update_patient()
    {
        $this->auth_client();
        $patientInserted = $this->insert_patient();
        
        $patient = $this->patient();
        $patient['address'] = "addressChanged";
        $patientUpdated = $this->put(route('patients.update', $patientInserted['id']), $patient)
            ->assertStatus(200)
            ->json();
        $this->assertEquals($patientUpdated['data']['address'], "addressChanged");
        //dd($userUpdated);
    }
}
