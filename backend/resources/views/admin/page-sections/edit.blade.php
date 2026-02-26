@extends('admin.layouts.app')

@section('title', 'Edit Page Section')
@section('breadcrumb', 'Edit Page Section')

@section('content')
    <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h2 class="text-2xl font-extrabold text-gray-900">Edit Page Section</h2>
            </div>

            <div class="p-6">
                @if($errors->any())
                    <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <ul class="list-disc list-inside text-sm text-red-600">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('admin.page-sections.update', $pageSection) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {{-- Page --}}
                        <div>
                            <label for="page" class="block text-sm font-semibold text-gray-700 mb-1">Page <span class="text-red-500">*</span></label>
                            <input type="text" name="page" id="page" value="{{ old('page', $pageSection->page) }}" required
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-400">e.g. home, about, franchise-details</p>
                        </div>

                        {{-- Section Key --}}
                        <div>
                            <label for="section_key" class="block text-sm font-semibold text-gray-700 mb-1">Section Key <span class="text-red-500">*</span></label>
                            <input type="text" name="section_key" id="section_key" value="{{ old('section_key', $pageSection->section_key) }}" required
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-400">Unique key for this section</p>
                        </div>

                        {{-- Title --}}
                        <div>
                            <label for="title" class="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                            <input type="text" name="title" id="title" value="{{ old('title', $pageSection->title) }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Subtitle --}}
                        <div>
                            <label for="subtitle" class="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
                            <input type="text" name="subtitle" id="subtitle" value="{{ old('subtitle', $pageSection->subtitle) }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Content --}}
                        <div class="md:col-span-2">
                            <label for="content" class="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                            <textarea name="content" id="content" rows="5"
                                      class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('content', $pageSection->content) }}</textarea>
                        </div>

                        {{-- Image --}}
                        <div class="md:col-span-2">
                            <label for="image" class="block text-sm font-semibold text-gray-700 mb-1">Image</label>
                            @if($pageSection->image)
                                <div class="mb-3">
                                    <img src="{{ asset('storage/' . $pageSection->image) }}" alt="{{ $pageSection->title }}" class="w-32 h-24 rounded-xl object-cover border border-gray-200">
                                </div>
                            @endif
                            <input type="file" name="image" id="image" accept="image/*"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Extra Data --}}
                        <div class="md:col-span-2">
                            <label for="extra_data" class="block text-sm font-semibold text-gray-700 mb-1">Extra Data</label>
                            <textarea name="extra_data" id="extra_data" rows="3"
                                      class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('extra_data', $pageSection->extra_data) }}</textarea>
                            <p class="mt-1 text-xs text-gray-400">JSON format for additional data</p>
                        </div>

                        {{-- Sort Order --}}
                        <div>
                            <label for="sort_order" class="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                            <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', $pageSection->sort_order) }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Is Active --}}
                        <div class="flex items-end">
                            <label class="inline-flex items-center gap-2">
                                <input type="checkbox" name="is_active" value="1" {{ old('is_active', $pageSection->is_active) ? 'checked' : '' }}
                                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                <span class="text-sm font-medium text-gray-700">Active</span>
                            </label>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                        <a href="{{ route('admin.page-sections.index') }}" class="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition">Cancel</a>
                        <button type="submit" class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">Update Page Section</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
