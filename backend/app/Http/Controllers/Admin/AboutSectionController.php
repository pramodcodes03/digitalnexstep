<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\AboutSection;
use Illuminate\Http\Request;

class AboutSectionController extends Controller
{
    use AdminCrudTrait;

    public function index()
    {
        $items = AboutSection::orderBy('sort_order')->paginate(15);

        return view('admin.about-sections.index', compact('items'));
    }

    public function create()
    {
        return view('admin.about-sections.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'section_key' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('image')) {
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'about-sections');
        }

        AboutSection::create($data);

        return redirect()->route('admin.about-sections.index')->with('success', 'Created successfully.');
    }

    public function edit(AboutSection $aboutSection)
    {
        return view('admin.about-sections.edit', compact('aboutSection'));
    }

    public function update(Request $request, AboutSection $aboutSection)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'section_key' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('image')) {
            if ($aboutSection->getRawOriginal('image')) {
                Helper::deleteImageFromE2E($aboutSection->getRawOriginal('image'));
            }
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'about-sections');
        }

        $aboutSection->update($data);

        return redirect()->route('admin.about-sections.index')->with('success', 'Updated successfully.');
    }

    public function destroy(AboutSection $aboutSection)
    {
        if ($aboutSection->getRawOriginal('image')) {
            Helper::deleteImageFromE2E($aboutSection->getRawOriginal('image'));
        }

        $aboutSection->delete();

        return redirect()->route('admin.about-sections.index')->with('success', 'Deleted successfully.');
    }
}
