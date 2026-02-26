<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\PageSection;
use Illuminate\Http\Request;

class PageSectionController extends Controller
{
    use AdminCrudTrait;

    public function index(Request $request)
    {
        $query = PageSection::query();

        if ($request->filled('page')) {
            $query->where('page', $request->input('page'));
        }

        $items = $query->orderBy('page')->orderBy('sort_order')->paginate(15)->withQueryString();

        // Get distinct page names for the filter dropdown
        $pages = PageSection::select('page')->distinct()->orderBy('page')->pluck('page');

        return view('admin.page-sections.index', compact('items', 'pages'));
    }

    public function create()
    {
        return view('admin.page-sections.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'page' => 'required|string|max:255',
            'section_key' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'extra_data' => 'nullable|json',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        // Parse extra_data JSON string to array
        if (isset($data['extra_data']) && is_string($data['extra_data'])) {
            $data['extra_data'] = json_decode($data['extra_data'], true);
        }

        if ($request->hasFile('image')) {
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'page-sections');
        }

        PageSection::create($data);

        return redirect()->route('admin.page-sections.index')->with('success', 'Created successfully.');
    }

    public function edit(PageSection $pageSection)
    {
        return view('admin.page-sections.edit', compact('pageSection'));
    }

    public function update(Request $request, PageSection $pageSection)
    {
        $data = $request->validate([
            'page' => 'required|string|max:255',
            'section_key' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'extra_data' => 'nullable|json',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        // Parse extra_data JSON string to array
        if (isset($data['extra_data']) && is_string($data['extra_data'])) {
            $data['extra_data'] = json_decode($data['extra_data'], true);
        }

        if ($request->hasFile('image')) {
            if ($pageSection->getRawOriginal('image')) {
                Helper::deleteImageFromE2E($pageSection->getRawOriginal('image'));
            }
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'page-sections');
        }

        $pageSection->update($data);

        return redirect()->route('admin.page-sections.index')->with('success', 'Updated successfully.');
    }

    public function destroy(PageSection $pageSection)
    {
        if ($pageSection->getRawOriginal('image')) {
            Helper::deleteImageFromE2E($pageSection->getRawOriginal('image'));
        }

        $pageSection->delete();

        return redirect()->route('admin.page-sections.index')->with('success', 'Deleted successfully.');
    }
}
