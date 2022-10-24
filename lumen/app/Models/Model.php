<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Model extends BaseModel
{
    use SoftDeletes;
    protected static $orderByColumn = 'id';
    protected static $orderByType = 'desc';

    function __construct()
    {
        parent::__construct();
        $this->setPerPage(20);
        $this->setIncrementing(false);
    }

    static function boot() {
        parent::boot();

        $orderByColumn = self::$orderByColumn;
        $orderByType = self::$orderByType;;

        static::addGlobalScope('order', function (Builder $builder) use ($orderByColumn, $orderByType) {
            $builder->orderBy($orderByColumn, $orderByType);
        });

        self::creating(function($model) {
            $model->setAttribute($model->getKeyName(), (string) Str::orderedUuid());
        });
    }

}
