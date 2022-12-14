<?php

use Illuminate\Support\Facades\Route;

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

Route::group(['prefix' => 'api/v1'], function() {
    Route::group(['prefix' => 'auth'], function() {
        Route::post('login', 'AuthController@login');
        Route::post('refresh-token', 'AuthController@refreshToken');
        Route::post('register', 'AuthController@register');
    });

    Route::group(['middleware' => 'auth'], function() {
        Route::delete('auth/logout', 'AuthController@logout');
        Route::get('auth/me', 'AuthController@getUserLogin');
        Route::group(['prefix' => 'users'], function() {
            Route::get('/', 'UserController@index');
            Route::post('/', 'UserController@store');
            Route::delete('/', 'UserController@destroy');
            Route::put('restore', 'UserController@restore');
            Route::get('{id}', 'UserController@show');
            Route::put('{id}', 'UserController@update');
        });
        Route::group(['prefix' => 'user-passwords'], function() {
            Route::get('/', 'PasswordController@index');
            Route::post('/', 'PasswordController@store');
            Route::delete('/', 'PasswordController@destroy');
            Route::put('restore', 'PasswordController@restore');
            Route::get('{id}', 'PasswordController@show');
            Route::put('{id}', 'PasswordController@update');
        });
        Route::get('dashboard', 'DashboardPageController@index');
        Route::group(['prefix' => 'groups'], function() {
            Route::get('/', 'GroupController@index');
            Route::post('/', 'GroupController@store');
            Route::delete('/', 'GroupController@destroy');
            Route::put('restore', 'GroupController@restore');
            Route::get('{id}', 'GroupController@show');
            Route::put('{id}', 'GroupController@update');
        });
    });
});

