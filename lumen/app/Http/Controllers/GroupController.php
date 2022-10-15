<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupValidate;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    protected $modelClass = Group::class;
    protected $validateClass = GroupValidate::class;
}
