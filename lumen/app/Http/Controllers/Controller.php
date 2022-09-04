<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Controller extends BaseController
{
    protected $modelClass;
    protected $validateClass;

    /**
     * Get items
     *
     * @param Request $request
     * @return mixed
     */
    function index(Request $request) {
        $itemsPerPage = $request->query('itemsPerPage', 10);
        return $this->modelClass::paginate($itemsPerPage)->toArray();
    }

    /**
     * Show item
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    function show($id): \Illuminate\Http\JsonResponse
    {
        $item = $this->modelClass::where('id', $id)
            ->first();
        return response()->json(['status' => true, 'data' => $item]);
    }

    /**
     * Add item
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function store(Request $request): \Illuminate\Http\JsonResponse
    {
        if (method_exists($this->validateClass, 'storeValidate')) {
            $storeValidate = call_user_func($this->validateClass . '::storeValidate');
            $validator = validator($request->post(), $storeValidate['rules'], $storeValidate['messages']);
            if ($validator->fails()) {
                return response()->json(['status' => false, 'message' => $validator->errors()->first()]);
            }
        }

        $itemNew = $this->modelClass->fill($request->post());
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
    function update($id, Request $request): \Illuminate\Http\JsonResponse
    {
        $item = $this->modelClass::where('id', $id)
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
    function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        $ids = $request->post('ids', []);
        $items = $this->modelClass::whereIn('id', $ids)->get();
        $status = $this->modelClass::whereIn('id', $items->pluck('id'))->delete();

        return response()->json(['status' => (boolean)$status, 'data' => $items->pluck('id')]);
    }

    /**
     * Destroy item
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    function restore(Request $request): \Illuminate\Http\JsonResponse
    {
        $ids = $request->post('ids', []);
        $items = $this->modelClass::whereIn('id', $ids)->withTrashed()->get();
        $status = $this->modelClass::whereIn('id', $items->pluck('id'))->restore();

        return response()->json(['status' => (boolean)$status, 'data' => $items->pluck('id')]);
    }
}
