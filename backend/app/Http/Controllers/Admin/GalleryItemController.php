<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\GalleryItem;
use Illuminate\Http\Request;

class GalleryItemController extends Controller
{
    use AdminCrudTrait;

    public function index()
    {
        $items = GalleryItem::orderBy('sort_order')->paginate(15);

        return view('admin.gallery-items.index', compact('items'));
    }

    public function create()
    {
        return view('admin.gallery-items.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'video_url' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('image')) {
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'gallery');
        }

        GalleryItem::create($data);

        return redirect()->route('admin.gallery-items.index')->with('success', 'Created successfully.');
    }

    public function edit(GalleryItem $galleryItem)
    {
        return view('admin.gallery-items.edit', compact('galleryItem'));
    }

    public function update(Request $request, GalleryItem $galleryItem)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'video_url' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('image')) {
            if ($galleryItem->getRawOriginal('image')) {
                Helper::deleteImageFromE2E($galleryItem->getRawOriginal('image'));
            }
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'gallery');
        }

        $galleryItem->update($data);

        return redirect()->route('admin.gallery-items.index')->with('success', 'Updated successfully.');
    }

    public function destroy(GalleryItem $galleryItem)
    {
        if ($galleryItem->getRawOriginal('image')) {
            Helper::deleteImageFromE2E($galleryItem->getRawOriginal('image'));
        }

        $galleryItem->delete();

        return redirect()->route('admin.gallery-items.index')->with('success', 'Deleted successfully.');
    }
}
