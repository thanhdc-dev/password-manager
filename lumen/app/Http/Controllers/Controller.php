<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    protected $modelClass;
    protected $validateClass;
    protected $model;

    function __construct()
    {
        if (class_exists($this->modelClass)) {
            $this->model = new $this->modelClass;
        }
    }

    /**
     * Get items
     *
     * @param Request $request
     * @return mixed
     */
    function index(Request $request) {
        $perPage = $request->query('per_page', $this->model->getPerPage());
        return $this->model::paginate($perPage)->toArray();
    }

    /**
     * Show item
     *
     * @param $uuid
     * @return \Illuminate\Http\JsonResponse
     */
    function show($uuid): \Illuminate\Http\JsonResponse
    {
        $item = $this->model::where($this->model->getUuidKeyName(), $uuid)
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
     * @param $uuid
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function update($uuid, Request $request): \Illuminate\Http\JsonResponse
    {
        $item = $this->model::where($this->model->getUuidKeyName(), $uuid)
            ->first();

        if (!$item) {
            return response()->json(['status' => false, 'data' => null]);
        }
        $item->fill($request->post())->save();
        return response()->json(['status' => true, 'data' => $item]);
    }

    /**
     * Destroy item
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        $uuidKeyName = $this->model->getUuidKeyName();
        $uuids = $request->post('uuids', []);
        $items = $this->model::whereIn($uuidKeyName, $uuids)->get();
        $deleteUuids = $items->pluck($uuidKeyName);
        $status = false;
        if ($items->count()) {
            $status = $this->model::whereIn($uuidKeyName, $deleteUuids)->delete();
        }

        return response()->json(['status' => (boolean)$status, 'data' => $deleteUuids]);
    }

    /**
     * Destroy item
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    function restore(Request $request): \Illuminate\Http\JsonResponse
    {
        $uuidKeyName = $this->model->getUuidKeyName();
        $uuids = $request->post('uuids', []);
        $items = $this->model::whereIn($uuidKeyName, $uuids)->withTrashed()->get();
        $restoreUuids = $items->pluck($uuidKeyName);
        $status = false;
        if ($items->count()) {
            $status = $items->toQuery()->restore();
        }

        return response()->json(['status' => (boolean)$status, 'data' => $restoreUuids]);
    }
}
