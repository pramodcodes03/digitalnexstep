@extends('admin.layouts.app')
@section('title', 'Edit Hero Slide')
@section('breadcrumb', 'Edit Hero Slide')
@section('content')
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Edit Hero Slide</h1>
        </div>

        <form action="{{ route('admin.hero-slides.update', $heroSlide) }}" method="POST" enctype="multipart/form-data" class="px-6 py-6 space-y-6">
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
                <input type="text" name="title" id="title" value="{{ old('title', $heroSlide->title) }}" required
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            {{-- Subtitle --}}
            <div>
                <label for="subtitle" class="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
                <input type="text" name="subtitle" id="subtitle" value="{{ old('subtitle', $heroSlide->subtitle) }}"
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            {{-- Description --}}
            <div>
                <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea name="description" id="description" rows="4"
                          class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('description', $heroSlide->description) }}</textarea>
            </div>

            {{-- Button Text --}}
            <div>
                <label for="button_text" class="block text-sm font-semibold text-gray-700 mb-1">Button Text</label>
                <input type="text" name="button_text" id="button_text" value="{{ old('button_text', $heroSlide->button_text) }}"
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            {{-- Button Link --}}
            <div>
                <label for="button_link" class="block text-sm font-semibold text-gray-700 mb-1">Button Link</label>
                <input type="text" name="button_link" id="button_link" value="{{ old('button_link', $heroSlide->button_link) }}"
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            {{-- Image --}}
            <div>
                <label for="image" class="block text-sm font-semibold text-gray-700 mb-1">Image</label>
                @if($heroSlide->image)
                    <div class="mb-3">
                        <img src="{{ $heroSlide->image }}" alt="{{ $heroSlide->title }}" class="w-40 h-24 object-cover rounded-xl border border-gray-200">
                    </div>
                @endif
                <input type="file" name="image" id="image" accept="image/*"
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
            </div>

            {{-- Is Active --}}
            <div class="flex items-center gap-3">
                <label for="is_active" class="relative inline-flex items-center cursor-pointer">
                    <input type="hidden" name="is_active" value="0">
                    <input type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', $heroSlide->is_active) ? 'checked' : '' }}
                           class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span class="text-sm font-semibold text-gray-700">Active</span>
            </div>

            {{-- Sort Order --}}
            <div>
                <label for="sort_order" class="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', $heroSlide->sort_order) }}" min="0"
                       class="w-full max-w-[200px] rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            {{-- Actions --}}
            <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button type="submit"
                        class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                    Save
                </button>
                <a href="{{ route('admin.hero-slides.index') }}"
                   class="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition">
                    Cancel
                </a>
            </div>
        </form>
    </div>
@endsection
