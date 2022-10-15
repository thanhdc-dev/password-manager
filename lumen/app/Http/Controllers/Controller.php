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
        $res = $this->model::paginate($perPage)->toArray();
        $res['status'] = true;
        return response()->json($res);
    }

    /**
     * Show item
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    function show($id): \Illuminate\Http\JsonResponse
    {
        $item = $this->model::find($id);
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

        $itemNew = $this->model->fill($request->post());
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
        $item = $this->model::find($id);

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
        $keyName = $this->model->getKeyName();
        $ids = $request->post("{$keyName}s", []);
        $items = $this->model::whereIn($keyName, $ids)->withoutTrashed()->get();
        $deleteUuids = $items->pluck($keyName);
        $status = false;
        if ($items->count()) {
            $status = $this->model::where($keyName, $deleteUuids)->delete();
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
        $keyName = $this->model->getKeyName();
        $ids = $request->post("{$keyName}s", []);
        $items = $this->model::whereIn($keyName, $ids)->withTrashed()->get();
        $restoreUuids = $items->pluck($keyName);
        $status = false;
        if ($items->count()) {
            $status = $items->toQuery()->restore();
        }

        return response()->json(['status' => (boolean)$status, 'data' => $restoreUuids]);
    }
}
