<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Password extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'url',
        'name',
        'email',
        'password',
        'note',
        'deleted_at',
    ];
}
