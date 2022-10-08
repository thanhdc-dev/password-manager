<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthValidate;
use App\Models\User;
use Illuminate\Http\Request;
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
            $validator = validator($request->post(), $loginValidate['rules'], $loginValidate['messages']);
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
            return response()->json(['status' => false, 'message' => 'Email or password wrong']);
        }
    }

    /**
     * Refresh token
     */
    function refreshToken(Request $request) {
        if (method_exists($this->validateClass, 'refreshTokenValidate')) {
            $refreshTokenValidate = call_user_func($this->validateClass . '::refreshTokenValidate');
            $validator = validator($request->post(), $refreshTokenValidate['rules'], $refreshTokenValidate['messages']);
            if ($validator->fails()) {
                return response()->json(['status' => false, 'message' => $validator->errors()->first()]);
            }
        }

        $client = new Client();
        try {
            return $client->post(config('service.passport.login_endpoint'), [
                'form_params' => [
                    'client_id' => config('service.passport.client_id'),
                    'client_secret' => config('service.passport.client_secret'),
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $request->post('refresh_token'),
                ]
            ]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => 'Refresh token fail']);
        }
    }

    /**
     * Register
     */
    function register(Request $request) {
        if (method_exists($this->validateClass, 'registerValidate')) {
            $registerValidate = call_user_func($this->validateClass . '::registerValidate');
            $validator = validator($request->post(), $registerValidate['rules'], $registerValidate['messages']);
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
            auth()->user()->token()->delete();
            return response()->json(['status' => true, 'message' => 'Logout successfully']);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }

    /**
     * Get info user logged in
     */
    function getUserLogin() {
        $data = null;
        if (auth()->check()) {
            $data = auth()->user();
        }
        return response()->json(['status' => true, 'data' => $data]);
    }
}
