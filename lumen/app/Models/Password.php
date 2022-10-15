<?php

namespace App\Models;

class Password extends Model
{
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
        'group_id',
    ];

    protected $appends = ['domain'];

    function getDomainAttribute() {
        return parse_url($this->url, PHP_URL_HOST);
    }

    function group() {
        return $this->belongsTo(Group::class, );
    }
}
