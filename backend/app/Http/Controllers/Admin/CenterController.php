<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\Center;
use Illuminate\Http\Request;

class CenterController extends Controller
{
    use AdminCrudTrait;

    public function index()
    {
        $items = Center::orderBy('sort_order')->paginate(15);

        return view('admin.centers.index', compact('items'));
    }

    public function create()
    {
        return view('admin.centers.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'map_url' => 'nullable|string|max:500',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('image')) {
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'centers');
        }

        Center::create($data);

        return redirect()->route('admin.centers.index')->with('success', 'Created successfully.');
    }

    public function edit(Center $center)
    {
        return view('admin.centers.edit', compact('center'));
    }

    public function update(Request $request, Center $center)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'map_url' => 'nullable|string|max:500',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('image')) {
            if ($center->getRawOriginal('image')) {
                Helper::deleteImageFromE2E($center->getRawOriginal('image'));
            }
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'centers');
        }

        $center->update($data);

        return redirect()->route('admin.centers.index')->with('success', 'Updated successfully.');
    }

    public function destroy(Center $center)
    {
        if ($center->getRawOriginal('image')) {
            Helper::deleteImageFromE2E($center->getRawOriginal('image'));
        }

        $center->delete();

        return redirect()->route('admin.centers.index')->with('success', 'Deleted successfully.');
    }
}
