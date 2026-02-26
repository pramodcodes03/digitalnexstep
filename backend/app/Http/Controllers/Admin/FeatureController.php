<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
    use AdminCrudTrait;

    public function index()
    {
        $items = Feature::orderBy('sort_order')->paginate(15);

        return view('admin.features.index', compact('items'));
    }

    public function create()
    {
        return view('admin.features.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('image')) {
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'features');
        }

        Feature::create($data);

        return redirect()->route('admin.features.index')->with('success', 'Created successfully.');
    }

    public function edit(Feature $feature)
    {
        return view('admin.features.edit', compact('feature'));
    }

    public function update(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('image')) {
            if ($feature->getRawOriginal('image')) {
                Helper::deleteImageFromE2E($feature->getRawOriginal('image'));
            }
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'features');
        }

        $feature->update($data);

        return redirect()->route('admin.features.index')->with('success', 'Updated successfully.');
    }

    public function destroy(Feature $feature)
    {
        if ($feature->getRawOriginal('image')) {
            Helper::deleteImageFromE2E($feature->getRawOriginal('image'));
        }

        $feature->delete();

        return redirect()->route('admin.features.index')->with('success', 'Deleted successfully.');
    }
}
