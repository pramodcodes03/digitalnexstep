@extends('admin.layouts.app')

@section('title', 'Add Setting')
@section('breadcrumb', 'Add Setting')

@section('content')
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Add Setting</h1>
        </div>

        <form action="{{ route('admin.site-settings.store') }}" method="POST" enctype="multipart/form-data" class="px-6 py-6 space-y-6">
            @csrf

            @if($errors->any())
                <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <ul class="list-disc list-inside text-sm text-red-600">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            {{-- Key --}}
            <div>
                <label for="key" class="block text-sm font-semibold text-gray-700 mb-1">Key <span class="text-red-500">*</span></label>
                <input type="text" name="key" id="key" value="{{ old('key') }}" required
                       placeholder="e.g. site_name, contact_email"
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            {{-- Group --}}
            <div>
                <label for="group" class="block text-sm font-semibold text-gray-700 mb-1">Group <span class="text-red-500">*</span></label>
                <input type="text" name="group" id="group" value="{{ old('group') }}" required
                       placeholder="e.g. general, contact, social"
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            {{-- Type --}}
            <div>
                <label for="type" class="block text-sm font-semibold text-gray-700 mb-1">Type <span class="text-red-500">*</span></label>
                <select name="type" id="type" required
                        class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="text" {{ old('type') === 'text' ? 'selected' : '' }}>Text</option>
                    <option value="textarea" {{ old('type') === 'textarea' ? 'selected' : '' }}>Textarea</option>
                    <option value="image" {{ old('type') === 'image' ? 'selected' : '' }}>Image</option>
                    <option value="boolean" {{ old('type') === 'boolean' ? 'selected' : '' }}>Boolean</option>
                    <option value="number" {{ old('type') === 'number' ? 'selected' : '' }}>Number</option>
                </select>
            </div>

            {{-- Value --}}
            <div>
                <label for="value" class="block text-sm font-semibold text-gray-700 mb-1">Value</label>
                <input type="text" name="value" id="value" value="{{ old('value') }}"
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            {{-- Image Value --}}
            <div>
                <label for="image_value" class="block text-sm font-semibold text-gray-700 mb-1">Image Upload</label>
                <input type="file" name="image_value" id="image_value" accept="image/*"
                       class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                <p class="mt-1 text-xs text-gray-500">Only used when type is set to "Image".</p>
            </div>

            {{-- Actions --}}
            <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button type="submit"
                        class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                    Save
                </button>
                <a href="{{ route('admin.site-settings.index') }}"
                   class="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition">
                    Cancel
                </a>
            </div>
        </form>
    </div>
@endsection
