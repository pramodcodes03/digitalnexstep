<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    use AdminCrudTrait;

    public function index()
    {
        $items = Partner::orderBy('sort_order')->paginate(15);

        return view('admin.partners.index', compact('items'));
    }

    public function create()
    {
        return view('admin.partners.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'website_url' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('logo')) {
            $data['logo'] = Helper::storeOriginalImageOnE2E($request->file('logo'), 'partners');
        }

        Partner::create($data);

        return redirect()->route('admin.partners.index')->with('success', 'Created successfully.');
    }

    public function edit(Partner $partner)
    {
        return view('admin.partners.edit', compact('partner'));
    }

    public function update(Request $request, Partner $partner)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'website_url' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        if ($request->hasFile('logo')) {
            if ($partner->getRawOriginal('logo')) {
                Helper::deleteImageFromE2E($partner->getRawOriginal('logo'));
            }
            $data['logo'] = Helper::storeOriginalImageOnE2E($request->file('logo'), 'partners');
        }

        $partner->update($data);

        return redirect()->route('admin.partners.index')->with('success', 'Updated successfully.');
    }

    public function destroy(Partner $partner)
    {
        if ($partner->getRawOriginal('logo')) {
            Helper::deleteImageFromE2E($partner->getRawOriginal('logo'));
        }

        $partner->delete();

        return redirect()->route('admin.partners.index')->with('success', 'Deleted successfully.');
    }
}
