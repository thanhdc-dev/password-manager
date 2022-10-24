<?php

namespace App\Models;


class Group extends Model
{
    protected $fillable = [
        'name',
        'note',
    ];

    protected static $orderByColumn = 'name';
}
