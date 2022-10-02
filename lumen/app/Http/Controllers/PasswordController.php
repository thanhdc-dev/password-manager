<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordValidate;
use App\Models\Password;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PasswordController extends Controller
{
    protected $modelClass = Password::class;
    protected $validateClass = PasswordValidate::class;

    /**
     * Get items
     *
     * @param Request $request
     * @return mixed
     */
    function index(Request $request) {
        $keyword = $request->query('keyword', null);
        $perPage = $request->query('per_page', $this->model->getPerPage());
        $res = $this->model::where('user_id', Auth::id())
            ->where(function($subQuery) use ($keyword) {
                if (!empty($keyword)) {
                    $subQuery->where('url', 'LIKE', "%{$keyword}%");
                    $subQuery->orWhere('username', 'LIKE', "%{$keyword}%");
                    $subQuery->orWhere('note', 'LIKE', "%{$keyword}%");
                }
            })
            ->paginate($perPage)->toArray();
        $res['status'] = true;
        return response()->json($res);
    }


    /**
     * Show item
     *
     * @return \Illuminate\Http\JsonResponse
     */
    function show($uuid): \Illuminate\Http\JsonResponse
    {
        $item = $this->model::where('user_id', Auth::id())
            ->where($this->model->getUuidKeyName(), $uuid)
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

        $params = $request->post();
        $params['user_id'] = Auth::id();
        $model = new $this->model();
        $itemNew = $model->fill($params);
        $itemNew->save();

        return response()->json(['status' => true, 'data' => $itemNew]);
    }

    /**
     * Update item
     *
     * @param string $uuid
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function update($uuid, Request $request): \Illuminate\Http\JsonResponse
    {
        $item = $this->model::where('user_id', Auth::id())
            ->where($this->model->getUuidKeyName(), $uuid)
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
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        $uuidKeyName = $this->model->getUuidKeyName();
        $uuids = $request->post('uuids', []);
        $deleteUuids = $this->model::where('user_id', Auth::id())
            ->whereIn($uuidKeyName, $uuids)
            ->pluck($uuidKeyName)->toArray();
        $overRequest = new Request([], ['uuids' => $deleteUuids]);
        return parent::destroy($overRequest);
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
        $items = $this->model::where('user_id', Auth::id())->whereIn($this->model->getUuidKeyName(), $ids)->withTrashed()->get();
        $status = $this->model::where('user_id', Auth::id())->whereIn($this->model->getUuidKeyName(), $items->pluck($this->model->getUuidKeyName()))->restore();

        return response()->json(['status' => (boolean)$status, 'data' => $items->pluck($this->model->getUuidKeyName())]);
    }
}
