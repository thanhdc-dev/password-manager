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
        if ($request->has('per_page')) {
            $this->model->setPerPage($request->get('per_page'));
        }
        $res = $this->model::with('group:id,name')
            ->where('user_id', Auth::id())
            ->where(function($subQuery) use ($keyword) {
                if (!empty($keyword)) {
                    $subQuery->where('url', 'LIKE', "%{$keyword}%");
                    $subQuery->orWhere('username', 'LIKE', "%{$keyword}%");
                    $subQuery->orWhere('note', 'LIKE', "%{$keyword}%");
                }
            })
            ->paginate()->toArray();
        $res['status'] = true;
        return response()->json($res);
    }


    /**
     * Show item
     *
     * @return \Illuminate\Http\JsonResponse
     */
    function show($id): \Illuminate\Http\JsonResponse
    {
        $item = $this->model::with('group:id,name')
            ->where('user_id', Auth::id())
            ->where($this->model->getKeyName(), $id)
            ->first();
        if (!$item) {
            return response()->json(['status' => true, 'data' => $item]);
        }
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
        $params = $request->post();
        $params['user_id'] = Auth::id();
        $overRequest = new Request([], $params);
        return parent::store($overRequest);
    }

    /**
     * Update item
     *
     * @param string $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function update($id, Request $request): \Illuminate\Http\JsonResponse
    {
        $item = $this->model::where('user_id', Auth::id())
            ->where($this->model->getKeyName(), $id)
            ->first();

        if (!$item) {
            return response()->json(['status' => false, 'data' => null]);
        }
        return parent::update($id, $request);
    }

    /**
     * Destroy item
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        $keyName = $this->model->getKeyName();
        $ids = $request->post("{$keyName}s", []);
        $deleteIds = $this->model::where('user_id', Auth::id())
            ->whereIn($keyName, $ids)
            ->pluck($keyName)->toArray();
        $overRequest = new Request([], ["{$keyName}s" => $deleteIds]);
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
        $keyName = $this->model->getKeyName();
        $ids = $request->post("{$keyName}s", []);
        $restoreIds = $this->model::where('user_id', Auth::id())
            ->whereIn($this->model->getKeyName(), $ids)
            ->withTrashed()
            ->pluck($keyName)->toArray();
        return parent::restore($restoreIds);
    }
}
