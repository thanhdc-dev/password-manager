<?php

namespace App\Http\Requests;

class UserValidate
{

    /**
     * Store validate
     * @return array
     */
    static function storeValidate(): array
    {
        $rules = [
            'name'  => 'required',
            'email' => 'required|email',
            'password'  => 'required',
        ];

        $messages = [
            'name.required'  => 'Tên là bắt buộc',
            'email.required'  => 'Email là bắt buộc',
            'email.email'  => 'Email không đúng',
            'password.required'  => 'Mật khẩu là bắt buộc',
        ];

        return [
            'rules'     => $rules,
            'messages'   => $messages
        ];
    }

    /**
     * Store validate
     * @return array
     */
    static function loginValidate(): array
    {
        $rules = [
            'email' => 'required|email',
            'password'  => 'required',
        ];

        $messages = [
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
