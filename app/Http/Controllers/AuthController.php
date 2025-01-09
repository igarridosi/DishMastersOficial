<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        
        if(!Auth::attempt($data)){
            return response([
                'message' => 'email or password are wrong'
            ]);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);

    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        // Eliminar el token del usuario
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });
    
        // Responder con éxito
        return response()->json(['message' => 'Logged out successfully']);
    }


    /*
    public function logout(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('',204);
    }
        */

    /*
    public function login(LoginRequest $request)
    {
        // Valida los datos de entrada
        $data = $request->validated();

        // Encuentra al usuario por email
        $user = User::where('email', $data['email'])->first();

        // Verifica que el usuario exista y que la contraseña sea correcta
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password. Please try again.'
            ], 401); // Cambié el código de error a 401 para indicar que la autenticación falló
        }

        // Crea un token de acceso para el usuario
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function register(RegisterRequest $request)
    {
        // Valida los datos de entrada
        $data = $request->validated();

        // Verifica si el email ya está registrado
        if (User::where('email', $data['email'])->exists()) {
            return response()->json([
                'message' => 'This email is already registered. Please use a different email or try logging in.'
            ], 409); // Cambié el código de error a 409 para conflicto (email ya registrado)
        }

        // Crea el nuevo usuario
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']), // Asegúrate de cifrar la contraseña
        ]);

        // Crea un token de acceso para el nuevo usuario
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        // Revoca el token de acceso del usuario actual
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
        */
}