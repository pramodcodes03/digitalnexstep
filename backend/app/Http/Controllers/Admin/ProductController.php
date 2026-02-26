<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use AdminCrudTrait;

    public function index()
    {
        $items = Product::orderBy('sort_order')->paginate(15);

        return view('admin.products.index', compact('items'));
    }

    public function create()
    {
        return view('admin.products.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'icon' => 'nullable|string|max:255',
            'tags' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        // Convert comma-separated tags to JSON array
        if (isset($data['tags']) && is_string($data['tags'])) {
            $data['tags'] = array_map('trim', explode(',', $data['tags']));
            $data['tags'] = array_filter($data['tags']);
            $data['tags'] = array_values($data['tags']);
        }

        if ($request->hasFile('image')) {
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'products');
        }

        Product::create($data);

        return redirect()->route('admin.products.index')->with('success', 'Created successfully.');
    }

    public function edit(Product $product)
    {
        return view('admin.products.edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'icon' => 'nullable|string|max:255',
            'tags' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $data = $this->handleCheckbox($data);

        // Convert comma-separated tags to JSON array
        if (isset($data['tags']) && is_string($data['tags'])) {
            $data['tags'] = array_map('trim', explode(',', $data['tags']));
            $data['tags'] = array_filter($data['tags']);
            $data['tags'] = array_values($data['tags']);
        }

        if ($request->hasFile('image')) {
            if ($product->getRawOriginal('image')) {
                Helper::deleteImageFromE2E($product->getRawOriginal('image'));
            }
            $data['image'] = Helper::storeOriginalImageOnE2E($request->file('image'), 'products');
        }

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Updated successfully.');
    }

    public function destroy(Product $product)
    {
        if ($product->getRawOriginal('image')) {
            Helper::deleteImageFromE2E($product->getRawOriginal('image'));
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Deleted successfully.');
    }
}
