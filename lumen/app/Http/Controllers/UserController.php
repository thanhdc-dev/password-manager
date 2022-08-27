<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserValidate;
use App\Models\User;

class UserController extends Controller
{
    protected $modelClass = User::class;
    protected $validateClass = UserValidate::class;
}
