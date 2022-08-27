<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Http\Requests\PasswordValidate;
use App\Models\Password;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PasswordController extends BaseController
{
    protected $modelClass = Password::class;
    protected $validateClass = PasswordValidate::class;

    /**
     * Get items
     *
     * @param Request $request
     * @return mixed
     */
    function index($userId, Request $request) {
        $itemsPerPage = $request->query('itemsPerPage', 10);
        return $this->modelClass::where('user_id', $userId)
            ->paginate($itemsPerPage)->toArray();
    }


    /**
     * Show item
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    function show($userId, $id): \Illuminate\Http\JsonResponse
    {
        $item = $this->modelClass::where('user_id', $userId)
            ->where('id', $id)
            ->first();
        return response()->json(['status' => true, 'data' => $item]);
    }

    /**
     * Add item
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function store($userId, Request $request): \Illuminate\Http\JsonResponse
    {
        if (method_exists($this->validateClass, 'storeValidate')) {
            $storeValidate = call_user_func($this->validateClass . '::storeValidate');
            $validator = Validator::make($request->post(), $storeValidate['rules'], $storeValidate['messages']);
            if ($validator->fails()) {
                return response()->json(['status' => false, 'message' => $validator->errors()->first()]);
            }
        }

        $params = $request->post();
        $params['user_id'] = $userId;
        $itemNew = $this->modelClass->fill($params);
        $itemNew->save();

        return response()->json(['status' => true, 'data' => $itemNew]);
    }

    /**
     * Update item
     *
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function update($userId, $id, Request $request): \Illuminate\Http\JsonResponse
    {
        $item = $this->modelClass::where('user_id', $userId)
            ->where('id', $id)
            ->first();

        if (!$item) {
            return response()->json(['status' => false, 'data' => null]);
        }
        $item->fill($request->post())->save();
        return response()->json(['status' => false, 'data' => $item]);
    }

    /**
     * Destroy item
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    function destroy($userId, Request $request): \Illuminate\Http\JsonResponse
    {
        $ids = $request->post('ids', []);
        $items = $this->modelClass::where('user_id', $userId)->whereIn('id', $ids)->get();
        $status = $this->modelClass::where('user_id', $userId)->whereIn('id', $items->pluck('id'))->delete();

        return response()->json(['status' => (boolean)$status, 'data' => $items->pluck('id')]);
    }

    /**
     * Destroy item
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    function restore($userId, Request $request): \Illuminate\Http\JsonResponse
    {
        $ids = $request->post('ids', []);
        $items = $this->modelClass::where('user_id', $userId)->whereIn('id', $ids)->withTrashed()->get();
        $status = $this->modelClass::where('user_id', $userId)->whereIn('id', $items->pluck('id'))->restore();

        return response()->json(['status' => (boolean)$status, 'data' => $items->pluck('id')]);
    }
}
