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
                User::withTrashed()->orderBy('id', 'desc')->get(['id', 'name', 'email', 'status', 'deleted_at'])
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
    public function updateProfile(Request $request, $id)
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
    

    public function updateProfileImage(Request $request)
    {
        $validated = $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
    
        if ($request->hasFile('profile_image')) {
            try {
                $filePath = $request->file('profile_image')->store('profile_images', 'public');
                if (!$filePath) {
                    return response()->json(['message' => 'Failed to store the file'], 500);
                }
    
                $user = auth()->user();
                $user->profile_image = $filePath;
                $user->save();
    
                return response()->json([
                    'message' => 'Profile image updated successfully!',
                    'profile_image_url' => asset('storage/' . $filePath),
                ]);
            } catch (\Exception $e) {
                \Log::error('Image upload error', ['error' => $e->getMessage()]);
                return response()->json(['message' => 'Server error: ' . $e->getMessage()], 500);
            }
        }
    
        return response()->json(['message' => 'No file uploaded'], 400);
    }
    
    
    public function resetProfileImage($id)
    {
        $user = User::findOrFail($id);
        $user->profile_image = null; // Set profile image to null
        $user->save();
    
        return response()->json(['message' => 'Profile image reset successfully']);
    }
    


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->delete()) {
            return response()->json(['message' => 'User soft deleted successfully']);
        }
    
        return response()->json(['error' => 'Failed to soft delete user'], 500);
    }

    
    public function restoreUser($id)
    {
        $user = User::withTrashed()->findOrFail($id); // Retrieve a single user by ID, including trashed ones

        if ($user->restore()) {
            return response()->json(['message' => 'User restored successfully']);
        }
    
        return response()->json(['error' => 'Failed to restore user'], 500);
    }

    public function permanentlyDeleteUser(User $user)
    {
        $user->forceDelete(); // Permanently delete the user
        return response()->json(['message' => 'User permanently deleted']);
    }
}