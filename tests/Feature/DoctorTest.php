<?php

namespace Tests\Feature;

use App\Models\Doctor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DoctorTest extends TestCase
{
  

    public function test_get_doctor() {
        $this->auth_client();
        for ($i = 0; $i < 5; $i++){
            Doctor::query()->create($this->doctor());
        }
        $response = $this->get(route('doctors.index'));
        $response->assertStatus(200);
        $this->assertEquals(5,count($response->json()["data"]));
    }
    public function test_get_doctor_by_id(){
        $this->auth_client();
        Doctor::query()->create($this->doctor());
        $response = $this->getJson(route('doctors.show', 1))
            ->assertStatus(200)->json();
        $this->assertEquals($response['data']['telephone'], "7554566");
    }
    public function test_create_doctor(){
        $this->auth_client();
        $response = $this->post(
            route('doctors.store'),
            $this->doctor()
        );
        $response->assertStatus(201);
    }
    public function test_update_doctor()
    {
        $this->auth_client();
        $id = $this->insert_doctor();
        $doctor = $this->doctor();
        $doctor['address'] = "addressChanged";
        $doctorUpdated = $this->put(route('doctors.update', $id), $doctor)
            ->assertStatus(200)
            ->json();
        $this->assertEquals($doctorUpdated['data']['address'], "addressChanged");
        
    }
}
