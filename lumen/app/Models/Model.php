<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Model extends BaseModel
{
    use SoftDeletes;

    function __construct()
    {
        parent::__construct();
        $this->setPerPage(20);
        $this->setIncrementing(false);
    }

    static function boot() {
        parent::boot();

        self::creating(function($model) {
            $model->setAttribute($model->getKeyName(), (string) Str::orderedUuid());
        });
    }

}
