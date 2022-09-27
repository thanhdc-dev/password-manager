<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Password extends Model
{
    use SoftDeletes;

    function __construct()
    {
        parent::__construct();
        $this->makeHidden(array('user_id'));
    }

    protected $fillable = [
        'user_id',
        'url',
        'username',
        'password',
        'note',
        'deleted_at',
    ];
}
