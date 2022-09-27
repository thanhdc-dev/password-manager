<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Support\Str;

class Model extends BaseModel
{
    protected $uuidKey = 'uuid';

    static function boot() {
        parent::boot();

        self::creating(function($model) {
            $model->setAttribute($this->uuidKey, (string) Str::uuid());
        });
    }

    function getRouteKeyName()
    {
        return $this->uuidKey;
    }
}
