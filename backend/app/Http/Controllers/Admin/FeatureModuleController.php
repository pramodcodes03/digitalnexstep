<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\FeatureModule;
use Illuminate\Http\Request;

class FeatureModuleController extends Controller
{
    use AdminCrudTrait;

    public function index(Request $request)
    {
        $query = FeatureModule::orderBy('sort_order');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $items = $query->paginate(15)->withQueryString();

        return view('admin.feature-modules.index', compact('items'));
    }

    public function create()
    {
        return view('admin.feature-modules.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'gradient' => 'nullable|string|max:255',
            'sub_features' => 'nullable|json',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if (isset($data['sub_features']) && is_string($data['sub_features'])) {
            $data['sub_features'] = json_decode($data['sub_features'], true);
        }

        FeatureModule::create($data);

        return redirect()->route('admin.feature-modules.index')->with('success', 'Created successfully.');
    }

    public function edit(FeatureModule $featureModule)
    {
        return view('admin.feature-modules.edit', compact('featureModule'));
    }

    public function update(Request $request, FeatureModule $featureModule)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'gradient' => 'nullable|string|max:255',
            'sub_features' => 'nullable|json',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if (isset($data['sub_features']) && is_string($data['sub_features'])) {
            $data['sub_features'] = json_decode($data['sub_features'], true);
        }

        $featureModule->update($data);

        return redirect()->route('admin.feature-modules.index')->with('success', 'Updated successfully.');
    }

    public function destroy(FeatureModule $featureModule)
    {
        $featureModule->delete();

        return redirect()->route('admin.feature-modules.index')->with('success', 'Deleted successfully.');
    }
}
