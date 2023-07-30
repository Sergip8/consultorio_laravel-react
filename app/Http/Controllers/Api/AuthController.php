<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','signup']]);
    }
   public function login(LoginRequest $request){
    $request->validated();
    $credentials = $request->only('email', 'password');
    
    // if(!Auth::attempt($credentials)){
    //     return response([
    //         "message" => "email o password incorrectos"
    //     ], 422);
    // }
    // @var User $user */
    // $user = Auth::user();
    // $token = $user->createToken('main')->plainTextToken;
    $token = Auth::attempt($credentials);
    if(!$token){
        return response()->json([
            'status' => 'error',
            'message' => 'email o password incorrectos',
        ], 401);
    }
    $user = Auth::user();
    return response()->json([
        'status' => 'success',
        'user' => $user,
        'authorisation' => [
            'token' => $token,
            'type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]
    ]);
   }
   public function signup(SignupRequest $request){
    $data = $request->validated();
    $user = User::query()->create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password'])
        
    ]);
    //$token = $user->createToken('main')->plainTextToken;
    //return response(compact('user',"token"));
   }
   
   public function logout(Request $request){
    Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'sesion cerrada',
        ]);
   }
   public function refresh()
   {
       return response()->json([
           'status' => 'success',
           'user' => Auth::user(),
           'authorisation' => [
               'token' => Auth::refresh(),
               'type' => 'bearer',
           ]
       ]);
   }


}
