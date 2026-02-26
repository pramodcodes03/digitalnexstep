@extends('admin.layouts.app')

@section('title', 'Add Pricing Plan')
@section('breadcrumb', 'Add Pricing Plan')

@section('content')
    <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h2 class="text-2xl font-extrabold text-gray-900">Add Pricing Plan</h2>
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

                <form action="{{ route('admin.pricing-plans.store') }}" method="POST">
                    @csrf

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {{-- Name --}}
                        <div class="md:col-span-2">
                            <label for="name" class="block text-sm font-semibold text-gray-700 mb-1">Name <span class="text-red-500">*</span></label>
                            <input type="text" name="name" id="name" value="{{ old('name') }}" required
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Price --}}
                        <div>
                            <label for="price" class="block text-sm font-semibold text-gray-700 mb-1">Price <span class="text-red-500">*</span></label>
                            <input type="number" name="price" id="price" value="{{ old('price') }}" step="0.01" required
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Duration --}}
                        <div>
                            <label for="duration" class="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
                            <input type="text" name="duration" id="duration" value="{{ old('duration') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-400">e.g. per month, per year</p>
                        </div>

                        {{-- Description --}}
                        <div class="md:col-span-2">
                            <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                            <textarea name="description" id="description" rows="3"
                                      class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('description') }}</textarea>
                        </div>

                        {{-- Features --}}
                        <div class="md:col-span-2">
                            <label for="features" class="block text-sm font-semibold text-gray-700 mb-1">Features</label>
                            <textarea name="features" id="features" rows="4"
                                      class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('features') }}</textarea>
                            <p class="mt-1 text-xs text-gray-400">One feature per line</p>
                        </div>

                        {{-- Sort Order --}}
                        <div>
                            <label for="sort_order" class="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                            <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', 0) }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Checkboxes --}}
                        <div class="flex items-end gap-6">
                            <label class="inline-flex items-center gap-2">
                                <input type="checkbox" name="is_popular" value="1" {{ old('is_popular') ? 'checked' : '' }}
                                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                <span class="text-sm font-medium text-gray-700">Mark as Popular</span>
                            </label>
                            <label class="inline-flex items-center gap-2">
                                <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                <span class="text-sm font-medium text-gray-700">Active</span>
                            </label>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                        <a href="{{ route('admin.pricing-plans.index') }}" class="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition">Cancel</a>
                        <button type="submit" class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">Create Pricing Plan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
