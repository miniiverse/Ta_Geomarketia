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
    // Admin CRUD for Projects
    public function index()
    {
        $projects = Project::with(['category', 'city'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return response()->json(['success' => true, 'data' => $projects]);
    }

    // Get categories and cities for project creation form
    public function categories()
    {
        return response()->json(Category::select('category_id', 'name')->get());
    }

    // Get cities for project creation form
    public function cities()
    {
        return response()->json(City::select('city_id', 'province_id', 'name')->get());
    }

    // Create new project
    public function store(Request $request)
    {
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
                ->store('projects/admin', 'public');
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

    // Delete project
    public function destroy($id)
    {
        $project = Project::where('project_id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        if ($project->thumbnail) {
            Storage::disk('public')->delete($project->thumbnail);
        }

        $project->delete();

        return response()->json(['success' => true, 'message' => 'Project deleted.']);
    }

    // Update project
    public function update(Request $request, $id)
    {
        $project = Project::where('project_id', $id)
            ->where('user_id', Auth::id())
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
                ->store('projects/admin', 'public');
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