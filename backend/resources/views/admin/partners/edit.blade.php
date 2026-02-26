@extends('admin.layouts.app')

@section('title', 'Edit Partner')
@section('breadcrumb', 'Edit Partner')

@section('content')
    <div class="max-w-3xl">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h1 class="text-2xl font-extrabold text-gray-900">Edit Partner</h1>
            </div>

            <form action="{{ route('admin.partners.update', $partner) }}" method="POST" enctype="multipart/form-data" class="p-6 space-y-6">
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

                {{-- Name --}}
                <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700 mb-1">Name <span class="text-red-500">*</span></label>
                    <input type="text" name="name" id="name" value="{{ old('name', $partner->name) }}" required
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Logo --}}
                <div>
                    <label for="logo" class="block text-sm font-semibold text-gray-700 mb-1">Logo</label>
                    @if($partner->logo)
                        <div class="mb-3">
                            <img src="{{ asset('storage/' . $partner->logo) }}"
                                 alt="{{ $partner->name }}"
                                 class="h-20 w-20 rounded-lg object-cover">
                        </div>
                    @endif
                    <input type="file" name="logo" id="logo" accept="image/*"
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Website URL --}}
                <div>
                    <label for="website_url" class="block text-sm font-semibold text-gray-700 mb-1">Website URL</label>
                    <input type="url" name="website_url" id="website_url" value="{{ old('website_url', $partner->website_url) }}"
                           placeholder="https://example.com"
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Is Active --}}
                <div class="flex items-center gap-2">
                    <input type="hidden" name="is_active" value="0">
                    <input type="checkbox" name="is_active" id="is_active" value="1"
                           {{ old('is_active', $partner->is_active) ? 'checked' : '' }}
                           class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <label for="is_active" class="text-sm font-semibold text-gray-700">Active</label>
                </div>

                {{-- Sort Order --}}
                <div>
                    <label for="sort_order" class="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                    <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', $partner->sort_order) }}"
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Buttons --}}
                <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <button type="submit"
                            class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                        Save
                    </button>
                    <a href="{{ route('admin.partners.index') }}"
                       class="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition">
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    </div>
@endsection
