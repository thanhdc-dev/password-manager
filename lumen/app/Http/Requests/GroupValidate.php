<?php

namespace App\Http\Requests;

class GroupValidate
{

    /**
     * Store validate
     * @return array
     */
    static function storeValidate(): array
    {
        $rules = [
            'name' => 'required',
        ];

        $messages = [];

        return [
            'rules'     => $rules,
            'messages'   => $messages
        ];
    }
}
