<?php

namespace App\Http\Requests;

class PasswordValidate
{

    /**
     * Store validate
     * @return array
     */
    static function storeValidate(): array
    {
        $rules = [
            'url' => 'required',
            'username' => 'required',
            'password' => 'required',
        ];

        $messages = [
            'url.required'  => 'URL là bắt buộc',
            'username.required'  => 'Email là bắt buộc',
            'password.required'  => 'Mật khẩu là bắt buộc',
        ];

        return [
            'rules'     => $rules,
            'messages'   => $messages
        ];
    }
}
