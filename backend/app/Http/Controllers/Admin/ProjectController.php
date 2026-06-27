<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Category;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    private const ADMIN_PROJECT_THUMBNAIL_PATH = 'projects/admin';

    /*
     * Retrieves all projects along with their category and city relations.
     * Sorted by latest, returns an array of project data.
     */
    public function index()
    {
        $projects = Project::with(['category', 'city'])
            ->latest()
            ->get();

        return response()->json(['success' => true, 'data' => $projects]);
    }

    /*
     * Retrieves the detail of a single project by project_id.
     * Automatically returns 404 if not found.
     */
    public function show(string $id)
    {
        $project = Project::with(['category', 'city'])
            ->where('project_id', $id)
            ->firstOrFail();

        return response()->json(['success' => true, 'data' => $project]);
    }

    /*
     * Retrieves a list of all categories (category_id and name).
     * Used for dropdown or filter needs on the frontend.
     */
    public function categories()
    {
        return response()->json(Category::select('category_id', 'name')->get());
    }

    /*
     * Retrieves a list of all cities (city_id, province_id, and name).
     * Used for dropdown or filter needs on the frontend.
     */
    public function cities()
    {
        return response()->json(City::select('city_id', 'province_id', 'name')->get());
    }

    /*
     * Creates a new project, only allowed for users with role_id 2 (admin).
     * Validates input, stores thumbnail if provided, then creates the project record.
     */
    public function store(Request $request)
    {
        if ($request->user()?->role_id !== 2) {
            return response()->json([
                'success' => false,
                'message' => 'Only admin can add projects.',
            ], 403);
        }

        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'category_id'  => 'nullable|integer|exists:categories,category_id',
            'city_id'      => 'nullable|integer|exists:cities,city_id',
            'price'        => 'nullable|numeric',
            'total_data'   => 'nullable|integer',
            'project_date' => 'nullable|date',
            'api_url'      => 'nullable|string',
            'description'  => 'nullable|string',
            'thumbnail'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')
                ->store(self::ADMIN_PROJECT_THUMBNAIL_PATH, 'public');
        }

        $project = Project::create([
            'user_id'      => Auth::id(),
            'title'        => $validated['title'],
            'category_id'  => $validated['category_id'] ?? null,
            'city_id'      => $validated['city_id'] ?? null,
            'price'        => $validated['price'] ?? null,
            'total_data'   => $validated['total_data'] ?? null,
            'project_date' => $validated['project_date'] ?? null,
            'api_url'      => $validated['api_url'] ?? null,
            'description'  => $validated['description'] ?? null,
            'thumbnail'    => $thumbnailPath,
        ]);

        return response()->json([
            'success' => true,
            'data'    => $project->load(['category', 'city']),
        ], 201);
    }

    /*
     * Deletes a project by project_id.
     * If the project has a thumbnail, the file is also deleted from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::where('project_id', $id)
            ->firstOrFail();

        if ($project->thumbnail) {
            Storage::disk('public')->delete($project->thumbnail);
        }

        $project->delete();

        return response()->json(['success' => true, 'message' => 'Project deleted.']);
    }

    /*
     * Updates a project by project_id.
     * Only price, description, and thumbnail can be changed.
     * If a new thumbnail is provided, the old one is deleted from storage first.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::where('project_id', $id)
            ->firstOrFail();

        $validated = $request->validate([
            'price'       => 'nullable|numeric',
            'description' => 'nullable|string',
            'thumbnail'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail) {
                Storage::disk('public')->delete($project->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')
                ->store(self::ADMIN_PROJECT_THUMBNAIL_PATH, 'public');
        }

        $project->update([
            'price'       => $validated['price'] ?? $project->price,
            'description' => $validated['description'] ?? $project->description,
            'thumbnail'   => $validated['thumbnail'] ?? $project->thumbnail,
        ]);

        return response()->json([
            'success' => true,
            'data'    => $project->load(['category', 'city']),
        ]);
    }
}
