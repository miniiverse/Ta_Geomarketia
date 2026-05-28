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

        if ($request->filled('category') && $request->category !== 'ALL') {
            $query->whereHas(
                'category',
                fn($q) => $q->where('name', $request->category)
            );
        }

        if ($request->filled('city_id')) {
            $query->where('city_id', $request->city_id);
        }

        if ($request->filled('project_date_year')) {
            $query->whereYear('project_date', $request->project_date_year);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(
                fn($q) =>
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('total_data', 'like', "%{$search}%")
                    ->orWhere('price', 'like', "%{$search}%")
                    ->orWhereRaw('YEAR(project_date) = ?', [$search])
                    ->orWhereRaw('DATE_FORMAT(project_date, "%d %M %Y") like ?', ["%{$search}%"])
                    ->orWhereHas(
                        'category',
                        fn($c) => $c->where('name', 'like', "%{$search}%")
                    )
            );
        }

        $query->orderBy('updated_at', 'desc');

        $projects = $query->paginate($request->get('per_page', 9));

        $appUrl = rtrim((string) config('app.url'), '/');

        $projectDateYears = Project::selectRaw('YEAR(project_date) as year')
            ->whereNotNull('project_date')
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
                    'id'           => $p->project_id,
                    'title'        => $p->title,
                    'description'  => $p->description ?? '',
                    'price'        => 'Rp ' . number_format((float)($p->price ?? 0), 0, ',', '.'),
                    'total_data'   => $p->total_data ?? 0,
                    'project_date' => $p->project_date
                        ? Carbon::parse($p->project_date)->format('Y-m-d')
                        : null,
                    'category'     => $p->category?->name ?? '-',
                    'region'       => $p->city?->name ?? '-',
                    'thumbnail'    => $thumbnailUrl,
                    'api_url'      => $p->api_url ?? '',
                    'status'       => $p->updated_at && Carbon::parse($p->updated_at)->diffInDays(now()) <= 30
                        ? 'New' : 'Oldest',
                ];
            }),
            'meta' => [
                'current_page' => $projects->currentPage(),
                'last_page'    => $projects->lastPage(),
                'total'        => $projects->total(),
                'per_page'     => $projects->perPage(),
            ],
            'project_date_years' => $projectDateYears,
        ]);
    }
}
