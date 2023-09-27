<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Models\User;

use function PHPUnit\Framework\assertEquals;

class UserTest extends TestCase

{
    
    public function test_register()
    {

        $regResponse = $this->post(route('signup'), 
        ['name' => "fasfasf", 
        'email' => 'fsdfsdf@sss.com', 
        'password' => 'a$888888', 
        'password_confirmation' => 'a$888888']);
        $regResponse->assertStatus(201);

    }
    public function test_login()
    {

        User::create(['name' => "Manolo", 'email' => 'ggg@sss.com', 'password' => 'a$888888', 'password_confirmation' => 'a$888888']);
        $loginResponse = $this->post(route('login'), ['email' => 'ggg@sss.com', 'password' => 'a$888888']);
        $loginResponse->assertStatus(200);
    }
    public function test_get_users_with_auth_client()
    {
        $this->auth_client();
        User::factory(5)->create();
        $response = $this->get(route('users.index'));
        $response->assertStatus(200);
        $this->assertEquals(6,count($response->json()["data"]));
    }
    public function test_get_users_without_auth_client()
    {
        $this->expectException('Illuminate\Auth\AuthenticationException');
        $this->get(route('users.index'))
            ->assertStatus(401);
    }
    public function test_get_user_by_id()
    {
        $this->auth_client();

        $response = $this->getJson(route('users.show', 1))
            ->assertStatus(200)->json();
        $this->assertEquals($response['data']['name'], "Manolo");
    }
    public function test_create_user()
    {
        $this->auth_client();
        $response = $this->post(
            route('users.store'),
            $this->user
        );
        $response->assertStatus(201);
    }
    public function test_update_user()
    {
        $this->auth_client();
        $userInserted = $this->insert_user();
        //dd($id);
        $user = $this->user;
        $user['name'] = "nameChanged";
        $userUpdated = $this->put(route('users.update', $userInserted['id']), $user)
            ->assertStatus(200)
            ->json();
        $this->assertEquals($userUpdated['data']['name'], "nameChanged");
        //dd($userUpdated);

    }
}
