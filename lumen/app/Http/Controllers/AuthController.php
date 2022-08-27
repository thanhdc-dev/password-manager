<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthValidate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;

class AuthController extends Controller
{
    protected $validateClass = AuthValidate::class;

    /**
     * Login
     */
    function login(Request $request)
    {
        if (method_exists($this->validateClass, 'loginValidate')) {
            $loginValidate = call_user_func($this->validateClass . '::loginValidate');
            $validator = Validator::make($request->post(), $loginValidate['rules'], $loginValidate['messages']);
            if ($validator->fails()) {
                return response()->json(['status' => false, 'message' => $validator->errors()->first()]);
            }
        }

        $email = $request->post('email');
        $password = $request->post('password');

        $client = new Client();
        try {
            return $client->post(config('service.passport.login_endpoint'), [
                'form_params' => [
                    'client_id' => config('service.passport.client_id'),
                    'client_secret' => config('service.passport.client_secret'),
                    'grant_type' => 'password',
                    'username' => $email,
                    'password' => $password,
                ]
            ]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }

    /**
     * Register
     */
    function register(Request $request) {
        if (method_exists($this->validateClass, 'registerValidate')) {
            $registerValidate = call_user_func($this->validateClass . '::registerValidate');
            $validator = Validator::make($request->post(), $registerValidate['rules'], $registerValidate['messages']);
            if ($validator->fails()) {
                return response()->json(['status' => false, 'message' => $validator->errors()->first()]);
            }
        }

        $user = new User();
        $user->fill($request->post());
        $user->save();

        return response()->json(['status' => true, 'message' => 'create successfully']);
    }

    /**
     * Logout
     */
    function logout() {
        if (!auth()->check()) {
            return response()->json(['status' => true, 'message' => 'Logout successfully']);
        }
        try {
            auth()->user()->tokens()->each(function($token) {
                $token->delete();
            });
            return response()->json(['status' => true, 'message' => 'Logout successfully']);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }
}
