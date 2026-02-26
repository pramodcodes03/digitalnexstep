@extends('admin.layouts.app')
@section('title', 'Edit Feature')
@section('breadcrumb', 'Edit Feature')
@section('content')
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Edit Feature</h1>
        </div>

        <form action="{{ route('admin.features.update', $feature) }}" method="POST" enctype="multipart/form-data" class="px-6 py-6 space-y-6">
            @csrf
            @method('PUT')

            @if($errors->any())
                <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <ul class="list-disc list-inside text-sm text-red-600">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            {{-- Title --}}
            <div>
                <label for="title" class="block text-sm font-semibold text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
                <input type="text" name="title" id="title" value="{{ old('title', $feature->title) }}" required
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            {{-- Description --}}
            <div>
                <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea name="description" id="description" rows="4"
                          class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('description', $feature->description) }}</textarea>
            </div>

            {{-- Icon --}}
            <div>
                <label for="icon" class="block text-sm font-semibold text-gray-700 mb-1">Icon</label>
                <input type="text" name="icon" id="icon" value="{{ old('icon', $feature->icon) }}"
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                <p class="mt-1 text-xs text-gray-500">CSS class or icon name (e.g., fa-solid fa-star)</p>
            </div>

            {{-- Image --}}
            <div>
                <label for="image" class="block text-sm font-semibold text-gray-700 mb-1">Image</label>
                @if($feature->image)
                    <div class="mb-3">
                        <img src="{{ $feature->image }}" alt="{{ $feature->title }}" class="w-40 h-24 object-cover rounded-xl border border-gray-200">
                    </div>
                @endif
                <input type="file" name="image" id="image" accept="image/*"
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
            </div>

            {{-- Is Active --}}
            <div class="flex items-center gap-3">
                <label for="is_active" class="relative inline-flex items-center cursor-pointer">
                    <input type="hidden" name="is_active" value="0">
                    <input type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', $feature->is_active) ? 'checked' : '' }}
                           class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span class="text-sm font-semibold text-gray-700">Active</span>
            </div>

            {{-- Sort Order --}}
            <div>
                <label for="sort_order" class="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', $feature->sort_order) }}" min="0"
                       class="w-full max-w-[200px] rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            {{-- Actions --}}
            <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button type="submit"
                        class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                    Save
                </button>
                <a href="{{ route('admin.features.index') }}"
                   class="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition">
                    Cancel
                </a>
            </div>
        </form>
    </div>
@endsection
