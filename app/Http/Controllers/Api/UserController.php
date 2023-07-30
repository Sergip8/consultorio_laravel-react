<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
class UserController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index','show']]);
    }

    public function index()
    {
        return UserResource::collection(
            User::query()->leftJoin('roles', 'users.id', '=', 'roles.userId')
            ->select('users.*', 'roles.role')
            ->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::query()->create($data);
        Role::query()->create([
            'role' => $data['role'],
            'userId' => $user['id']
        ]);
        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
       $role = Role::where('userId',$user['id'])->first();
       if(isset($role))
       $user['role'] =  $role['role'];
       return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }
        $role = Role::where('userId',$user['id'])->first();
       if(isset($role)){
          
            $role->update([
                'role' => $data['role'],
            ]);
       }else{
        Role::query()->create([
            'role' => $data['role'],
            'userId' => $user['id']
        ]);
       }

        
        $user->update($data);
      
        return new UserResource($user);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response("", 204);
    }
    public function getUsersByEmail($search){
        return UserResource::collection(
        User::where('email', 'LIKE', $search.'%')->leftJoin('roles', 'users.id', '=', 'roles.userId')
        ->select('users.*', 'roles.role')
        ->orderBy('id', 'desc')->paginate(10));
    }
}
