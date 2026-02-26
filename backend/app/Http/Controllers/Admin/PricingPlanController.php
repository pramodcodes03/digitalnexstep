<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\PricingPlan;
use Illuminate\Http\Request;

class PricingPlanController extends Controller
{
    use AdminCrudTrait;

    public function index()
    {
        $items = PricingPlan::orderBy('sort_order')->paginate(15);

        return view('admin.pricing-plans.index', compact('items'));
    }

    public function create()
    {
        return view('admin.pricing-plans.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'features' => 'nullable|string',
            'is_popular' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);
        $data = $this->handleCheckbox($data, 'is_popular');

        // Convert one-feature-per-line textarea to JSON array
        if (isset($data['features']) && is_string($data['features'])) {
            $lines = explode("\n", $data['features']);
            $lines = array_map('trim', $lines);
            $lines = array_filter($lines);
            $data['features'] = array_values($lines);
        }

        PricingPlan::create($data);

        return redirect()->route('admin.pricing-plans.index')->with('success', 'Created successfully.');
    }

    public function edit(PricingPlan $pricingPlan)
    {
        return view('admin.pricing-plans.edit', compact('pricingPlan'));
    }

    public function update(Request $request, PricingPlan $pricingPlan)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'features' => 'nullable|string',
            'is_popular' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);
        $data = $this->handleCheckbox($data, 'is_popular');

        // Convert one-feature-per-line textarea to JSON array
        if (isset($data['features']) && is_string($data['features'])) {
            $lines = explode("\n", $data['features']);
            $lines = array_map('trim', $lines);
            $lines = array_filter($lines);
            $data['features'] = array_values($lines);
        }

        $pricingPlan->update($data);

        return redirect()->route('admin.pricing-plans.index')->with('success', 'Updated successfully.');
    }

    public function destroy(PricingPlan $pricingPlan)
    {
        $pricingPlan->delete();

        return redirect()->route('admin.pricing-plans.index')->with('success', 'Deleted successfully.');
    }
}
