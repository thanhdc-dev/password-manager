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

    protected static $orderByColumn = 'username';

    /**
     * Set the username attribute.
     *
     * @param   mixed
     * @return  void
     */
    function setUsernameAttribute($value)
    {
        $this->attributes['username'] = encrypt($value);
    }

    /**
     * Retrieve the username attribute.
     *
     * @param   mixed
     * @return  string
     */
    function getUsernameAttribute($value)
    {
        return decrypt($value);
    }

    /**
     * Set the password attribute.
     *
     * @param   mixed
     * @return  void
     */
    function setPasswordAttribute($value)
    {
        $this->attributes['password'] = encrypt($value);
    }

    /**
     * Retrieve the password attribute.
     *
     * @param   mixed
     * @return  string
     */
    function getPasswordAttribute($value)
    {
        return decrypt($value);
    }

    function getDomainAttribute() {
        return parse_url($this->url, PHP_URL_HOST);
    }

    function group() {
        return $this->belongsTo(Group::class, );
    }
}
