@extends('admin.layouts.app')

@section('title', 'Edit Award Image')
@section('breadcrumb', 'Edit Award Image')

@section('content')
    <div class="max-w-3xl">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h1 class="text-2xl font-extrabold text-gray-900">Edit Award Image</h1>
            </div>

            <form action="{{ route('admin.award-images.update', $awardImage) }}" method="POST" enctype="multipart/form-data" class="p-6 space-y-6">
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

                {{-- Current Image --}}
                @if($awardImage->image)
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Current Image</label>
                        <img src="{{ $awardImage->image }}" alt="Award Image"
                             class="h-40 rounded-xl object-cover border border-gray-200">
                    </div>
                @endif

                {{-- New Image --}}
                <div>
                    <label for="image" class="block text-sm font-semibold text-gray-700 mb-1">Replace Image</label>
                    <input type="file" name="image" id="image" accept="image/*"
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                    <p class="text-xs text-gray-400 mt-1">Leave empty to keep current image. Max 5MB.</p>
                </div>

                {{-- Is Active --}}
                <div class="flex items-center gap-2">
                    <input type="hidden" name="is_active" value="0">
                    <input type="checkbox" name="is_active" id="is_active" value="1"
                           {{ old('is_active', $awardImage->is_active) ? 'checked' : '' }}
                           class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <label for="is_active" class="text-sm font-semibold text-gray-700">Active</label>
                </div>

                {{-- Sort Order --}}
                <div>
                    <label for="sort_order" class="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                    <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', $awardImage->sort_order) }}"
                           class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                {{-- Buttons --}}
                <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <button type="submit"
                            class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                        Update
                    </button>
                    <a href="{{ route('admin.award-images.index') }}"
                       class="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition">
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    </div>
@endsection
