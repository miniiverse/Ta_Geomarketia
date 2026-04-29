<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Province;
use App\Models\City;
use App\Models\Project;

class FilterController extends Controller
{
    public function categories()
    {
        $categories = Category::orderBy('name')->get(['category_id', 'name']);
        return response()->json(['success' => true, 'data' => $categories]);
    }

    public function provinces()
    {
        $provinces = Province::orderBy('name')->get(['province_id', 'name']);
        return response()->json(['success' => true, 'data' => $provinces]);
    }

    public function cities()
    {
        $provinceId = request('province_id');
        $query = City::orderBy('name');
        if ($provinceId) $query->where('province_id', $provinceId);
        $cities = $query->get(['city_id', 'province_id', 'name']);
        return response()->json(['success' => true, 'data' => $cities]);
    }
}