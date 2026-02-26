<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementController extends Controller
{
    use AdminCrudTrait;

    public function index()
    {
        $items = Achievement::orderBy('sort_order')->paginate(15);

        return view('admin.achievements.index', compact('items'));
    }

    public function create()
    {
        return view('admin.achievements.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        Achievement::create($data);

        return redirect()->route('admin.achievements.index')->with('success', 'Created successfully.');
    }

    public function edit(Achievement $achievement)
    {
        return view('admin.achievements.edit', compact('achievement'));
    }

    public function update(Request $request, Achievement $achievement)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        $achievement->update($data);

        return redirect()->route('admin.achievements.index')->with('success', 'Updated successfully.');
    }

    public function destroy(Achievement $achievement)
    {
        $achievement->delete();

        return redirect()->route('admin.achievements.index')->with('success', 'Deleted successfully.');
    }
}
