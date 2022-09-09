<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Laravel\Lumen\Routing\Controller as BaseController;

class DashboardPageController extends BaseController
{
    function index() {
        $accountCount = Password::where('user_id', auth()->id())->groupBy(['url', 'username'])->count();
        $websiteCount = Password::where('user_id', auth()->id())->groupBy(['url'])->count();
        $data = [
            'account_count' => $accountCount,
            'website_count' => $websiteCount,
        ];
        return response()->json(['status' => true, 'data' => $data]);
    }
}
