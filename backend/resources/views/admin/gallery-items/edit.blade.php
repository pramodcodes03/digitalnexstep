@extends('admin.layouts.app')

@section('title', 'Edit Gallery Item')
@section('breadcrumb', 'Edit Gallery Item')

@section('content')
    <div class="max-w-3xl">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h1 class="text-2xl font-extrabold text-gray-900">Edit Gallery Item</h1>
            </div>

            <form action="{{ route('admin.gallery-items.update', $galleryItem) }}" method="POST" enctype="multipart/form-data" class="p-6 space-y-6">
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
                    <input type="text" name="title" id="title" value="{{ old('title', $galleryItem->title) }}" required
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Description --}}
                <div>
                    <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                    <textarea name="description" id="description" rows="4"
                              class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('description', $galleryItem->description) }}</textarea>
                </div>

                {{-- Image --}}
                <div>
                    <label for="image" class="block text-sm font-semibold text-gray-700 mb-1">Image</label>
                    @if($galleryItem->image)
                        <div class="mb-3">
                            <img src="{{ asset('storage/' . $galleryItem->image) }}"
                                 alt="{{ $galleryItem->title }}"
                                 class="h-20 w-20 rounded-lg object-cover">
                        </div>
                    @endif
                    <input type="file" name="image" id="image" accept="image/*"
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Category --}}
                <div>
                    <label for="category" class="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <input type="text" name="category" id="category" value="{{ old('category', $galleryItem->category) }}"
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Date --}}
                <div>
                    <label for="date" class="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                    <input type="date" name="date" id="date" value="{{ old('date', $galleryItem->date) }}"
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Video URL --}}
                <div>
                    <label for="video_url" class="block text-sm font-semibold text-gray-700 mb-1">Video URL</label>
                    <input type="url" name="video_url" id="video_url" value="{{ old('video_url', $galleryItem->video_url) }}"
                           placeholder="https://www.youtube.com/watch?v=..."
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Is Active --}}
                <div class="flex items-center gap-2">
                    <input type="hidden" name="is_active" value="0">
                    <input type="checkbox" name="is_active" id="is_active" value="1"
                           {{ old('is_active', $galleryItem->is_active) ? 'checked' : '' }}
                           class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <label for="is_active" class="text-sm font-semibold text-gray-700">Active</label>
                </div>

                {{-- Sort Order --}}
                <div>
                    <label for="sort_order" class="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                    <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', $galleryItem->sort_order) }}"
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Buttons --}}
                <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <button type="submit"
                            class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                        Save
                    </button>
                    <a href="{{ route('admin.gallery-items.index') }}"
                       class="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition">
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    </div>
@endsection
