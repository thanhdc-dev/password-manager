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

Route::group(['prefix' => 'api'], function() {
    Route::group(['prefix' => 'users'], function() {
        Route::get('/', 'UserController@index');
        Route::post('/', 'UserController@store');
        Route::delete('/', 'UserController@destroy');
        Route::put('restore', 'UserController@restore');
        Route::group(
            ['prefix' => '{userId}/passwords'],
            function() {
                Route::get('/', 'PasswordController@index');
                Route::post('/', 'PasswordController@store');
                Route::delete('/', 'PasswordController@destroy');
                Route::put('restore', 'PasswordController@restore');
                Route::get('{id}', 'PasswordController@show');
                Route::put('{id}', 'PasswordController@update');
            }
        );
        Route::get('{id}', 'UserController@show');
        Route::put('{id}', 'UserController@update');
    });
});

