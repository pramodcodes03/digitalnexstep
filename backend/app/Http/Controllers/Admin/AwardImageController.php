<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\AwardImage;
use Illuminate\Http\Request;

class AwardImageController extends Controller
{
    use AdminCrudTrait;

    public function index()
    {
        $items = AwardImage::orderBy('sort_order')->paginate(20);

        return view('admin.award-images.index', compact('items'));
    }

    public function create()
    {
        return view('admin.award-images.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => 'required|image|max:5120',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('image')) {
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'awards');
        }

        AwardImage::create($data);

        return redirect()->route('admin.award-images.index')->with('success', 'Award image added successfully.');
    }

    public function edit(AwardImage $awardImage)
    {
        return view('admin.award-images.edit', compact('awardImage'));
    }

    public function update(Request $request, AwardImage $awardImage)
    {
        $data = $request->validate([
            'image' => 'nullable|image|max:5120',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('image')) {
            if ($awardImage->getRawOriginal('image')) {
                Helper::deleteImageFromE2E($awardImage->getRawOriginal('image'));
            }
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'awards');
        }

        $awardImage->update($data);

        return redirect()->route('admin.award-images.index')->with('success', 'Award image updated successfully.');
    }

    public function destroy(AwardImage $awardImage)
    {
        if ($awardImage->getRawOriginal('image')) {
            Helper::deleteImageFromE2E($awardImage->getRawOriginal('image'));
        }

        $awardImage->delete();

        return redirect()->route('admin.award-images.index')->with('success', 'Award image deleted successfully.');
    }
}
