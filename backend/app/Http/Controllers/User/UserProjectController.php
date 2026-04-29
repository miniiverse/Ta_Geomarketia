<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['category', 'city'])
            ->select([
                'project_id',
                'category_id',
                'city_id',
                'title',
                'description',
                'price',
                'total_data',
                'project_date',
                'thumbnail',
                'api_url',
                'created_at',
                'updated_at',
            ]);

        // Filter category
        if ($request->filled('category') && $request->category !== 'ALL') {
            $query->whereHas(
                'category',
                fn($q) =>
                $q->where('name', $request->category)
            );
        }

        // Filter city
        if ($request->filled('city_id')) {
            $query->where('city_id', $request->city_id);
        }

        // Filter year dari updated_at
        if ($request->filled('year') && $request->year !== 'All Years') {
            $query->whereYear('updated_at', $request->year);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(
                fn($q) =>
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('total_data', 'like', "%{$search}%")
                    ->orWhereHas(
                        'category',
                        fn($c) =>
                        $c->where('name', 'like', "%{$search}%")
                    )
            );
        }

        // Sort
        $sort = $request->get('sort', 'newest');

        if ($sort === 'price_asc') {
            $query->orderBy('price', 'asc');
        } elseif ($sort === 'price_desc') {
            $query->orderBy('price', 'desc');
        } else {
            $query->orderBy('updated_at', $sort === 'oldest' ? 'asc' : 'desc');
        }

        $projects = $query->paginate($request->get('per_page', 9));

        $appUrl = rtrim(config('app.url'), '/');

        // Ambil distinct years dari updated_at
        $availableYears = Project::selectRaw('YEAR(updated_at) as year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->filter()
            ->values();

        return response()->json([
            'success' => true,
            'data' => $projects->map(function ($p) use ($appUrl) {

                $thumbnailUrl = null;
                if ($p->thumbnail && trim($p->thumbnail) !== '') {
                    $thumbnailUrl = $appUrl . '/storage/' . ltrim($p->thumbnail, '/');
                }

                return [
                    'id'          => $p->project_id,
                    'title'       => $p->title,
                    'description' => $p->description,
                    'price'       => 'Rp ' . number_format($p->price, 0, ',', '.'),
                    'total_data'  => $p->total_data ?? 0,
                    'last_update' => $p->updated_at                          
                        ? Carbon::parse($p->updated_at)->format('M j, Y')
                        : '-',
                    'category'    => $p->category?->name ?? '-',
                    'region'      => $p->city?->name ?? '-',
                    'thumbnail'   => $thumbnailUrl,
                    'api_url'     => $p->api_url,
                    'status'      => $p->updated_at && Carbon::parse($p->updated_at)->diffInDays(now()) <= 30  
                        ? 'New' : 'Oldest',
                ];
            }),
            'meta' => [
                'current_page' => $projects->currentPage(),
                'last_page'    => $projects->lastPage(),
                'total'        => $projects->total(),
                'per_page'     => $projects->perPage(),
            ],
            'available_years' => $availableYears,
        ]);
    }
}