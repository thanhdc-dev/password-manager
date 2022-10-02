<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Support\Str;

class Model extends BaseModel
{
    protected $uuidKey = 'uuid';

    function __construct()
    {
        parent::__construct();
        $this->makeHidden(array($this->getKeyName()));
        $this->setPerPage(20);
    }

    static function boot() {
        parent::boot();

        self::creating(function($model) {
            $model->setAttribute($model->getUuidKeyName(), (string) Str::uuid());
        });
    }

    function getRouteKeyName()
    {
        return $this->uuidKey;
    }

    function getUuidKeyName() {
        return $this->uuidKey;
    }
}
