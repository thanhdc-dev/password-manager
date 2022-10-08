<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Laravel\Lumen\Routing\Controller as BaseController;

class DashboardPageController extends BaseController
{
    function index() {
        $accountCount = Password::where('user_id', auth()->id())->count();
        $passwords = Password::selectRaw("SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(url, '/', 3), '://', -1), '/', 1), '?', 1) AS domain")
            ->where('user_id', auth()->id())
            ->distinct()
            ->get()->count();

        $data = [
            'account_count' => $accountCount,
            'website_count' => $passwords,
        ];
        return response()->json(['status' => true, 'data' => $data]);
    }
}
