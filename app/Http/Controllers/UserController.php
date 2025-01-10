<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;


class UserController extends Controller
{
    /**
     * Run command for the UserController: php artsian make:controller UserController --resources --model=User --request
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->check() && auth()->user()->status === 'dishAdmin') {
            return UserResource::collection(
                User::query()->orderBy('id', 'desc')->get(['id', 'name', 'email', 'status'])
            );
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response(new UserResource($user),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
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
        $user->update($data);
        return new UserResource($user);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:dishUser,dishAdmin',
        ]);
    
        $user = User::findOrFail($id);
        $user->status = $request->status;
        $user->save();
    
        return response()->json(['message' => 'Status updated successfully']);
    }    

    // Fetch profile
    public function profile(Request $request)
    {
        return response()->json([
            'user' => $request->user(), // Returns the authenticated user
        ]);
    }

    // Update profile
    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $request->user()->id,
            'password' => 'nullable|min:8|confirmed',
        ]);

        $user = $request->user();
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'] ? bcrypt($validated['password']) : $user->password,
        ]);

        return response()->json(['message' => 'Profile updated successfully']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response('',204);
    }
}