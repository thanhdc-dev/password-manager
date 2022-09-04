<?php

namespace App\Http\Requests;

class AuthValidate
{

    /**
     * Login validate
     * @return array
     */
    static function loginValidate(): array
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
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

    /**
     * Register validate
     * @return array
     */
    static function registerValidate(): array
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required|min:6',
            'name' => 'required',
        ];

        $messages = [
            'email.required'  => 'Email là bắt buộc',
            'email.email'  => 'Email không đúng',
            'password.required'  => 'Mật khẩu là bắt buộc',
            'password.min'  => 'Mật khẩu phải lớn hơn 6 ký tự',
            'name.required'  => 'Tên là bắt buộc',
        ];

        return [
            'rules'     => $rules,
            'messages'   => $messages
        ];
    }

    /**
     * Refresh token validate
     * @return array
     */
    static function refreshTokenValidate(): array
    {
        $rules = [
            'refresh_token' => 'required',
        ];

        $messages = [
            'refresh_token.required'  => 'refresh_token là bắt buộc',
        ];

        return [
            'rules'     => $rules,
            'messages'   => $messages
        ];
    }
}
