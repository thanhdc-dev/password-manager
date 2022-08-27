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
            'email' => 'required|email',
            'password' => 'required',
        ];

        $messages = [
            'url.required'  => 'URL là bắt buộc',
            'email.required'  => 'Email là bắt buộc',
            'email.email'  => 'Email không đúng',
            'password.required'  => 'Mật khẩu là bắt buộc',
        ];

        return [
            'rules'     => $rules,
            'messages'   => $messages
        ];
    }
}
