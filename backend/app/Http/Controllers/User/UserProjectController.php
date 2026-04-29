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
                'project_id', 'category_id', 'city_id',
                'title', 'description', 'price',
                'total_data', 'project_date', 'thumbnail',
                'api_url', 'created_at',
            ]);

        // Filter category
        if ($request->filled('category') && $request->category !== 'ALL') {
            $query->whereHas('category', fn($q) =>
                $q->where('name', $request->category)
            );
        }

        // Filter city
        if ($request->filled('city_id')) {
            $query->where('city_id', $request->city_id);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(fn($q) =>
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
            );
        }

        // Sort
        $sort = $request->get('sort', 'newest');
        $query->orderBy('project_date', $sort === 'oldest' ? 'asc' : 'desc');

        $projects = $query->paginate($request->get('per_page', 9));

        $appUrl = rtrim(config('app.url'), '/');

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
                    'last_update' => $p->project_date
                        ? Carbon::parse($p->project_date)->format('M j, Y')
                        : '-',
                    'category'    => $p->category?->name ?? '-',
                    'region'      => $p->city?->name ?? '-',
                    'thumbnail'   => $thumbnailUrl,
                    'api_url'     => $p->api_url,
                    'status'      => $p->project_date && Carbon::parse($p->project_date)->diffInDays(now()) <= 30
                        ? 'New' : 'Oldest',
                ];
            }),
            'meta' => [
                'current_page' => $projects->currentPage(),
                'last_page'    => $projects->lastPage(),
                'total'        => $projects->total(),
                'per_page'     => $projects->perPage(),
            ],
        ]);
    }
}