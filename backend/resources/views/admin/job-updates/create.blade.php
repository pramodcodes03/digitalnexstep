@extends('admin.layouts.app')

@section('title', 'Add Job Update')
@section('breadcrumb', 'Add Job Update')

@section('content')
    <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h2 class="text-2xl font-extrabold text-gray-900">Add Job Update</h2>
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

                <form action="{{ route('admin.job-updates.store') }}" method="POST">
                    @csrf

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {{-- Title --}}
                        <div class="md:col-span-2">
                            <label for="title" class="block text-sm font-semibold text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
                            <input type="text" name="title" id="title" value="{{ old('title') }}" required
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Company --}}
                        <div>
                            <label for="company" class="block text-sm font-semibold text-gray-700 mb-1">Company</label>
                            <input type="text" name="company" id="company" value="{{ old('company') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Location --}}
                        <div>
                            <label for="location" class="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                            <input type="text" name="location" id="location" value="{{ old('location') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Type --}}
                        <div>
                            <label for="type" class="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                            <input type="text" name="type" id="type" value="{{ old('type') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-400">e.g. Full-time, Part-time, Internship</p>
                        </div>

                        {{-- Salary Range --}}
                        <div>
                            <label for="salary_range" class="block text-sm font-semibold text-gray-700 mb-1">Salary Range</label>
                            <input type="text" name="salary_range" id="salary_range" value="{{ old('salary_range') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-400">e.g. &#8377;3-5 LPA</p>
                        </div>

                        {{-- Description --}}
                        <div class="md:col-span-2">
                            <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                            <textarea name="description" id="description" rows="4"
                                      class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('description') }}</textarea>
                        </div>

                        {{-- Requirements --}}
                        <div class="md:col-span-2">
                            <label for="requirements" class="block text-sm font-semibold text-gray-700 mb-1">Requirements</label>
                            <textarea name="requirements" id="requirements" rows="4"
                                      class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('requirements') }}</textarea>
                        </div>

                        {{-- Apply Link --}}
                        <div>
                            <label for="apply_link" class="block text-sm font-semibold text-gray-700 mb-1">Apply Link</label>
                            <input type="url" name="apply_link" id="apply_link" value="{{ old('apply_link') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Expires At --}}
                        <div>
                            <label for="expires_at" class="block text-sm font-semibold text-gray-700 mb-1">Expires At</label>
                            <input type="date" name="expires_at" id="expires_at" value="{{ old('expires_at') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Is Active --}}
                        <div class="md:col-span-2">
                            <label class="inline-flex items-center gap-2">
                                <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                <span class="text-sm font-medium text-gray-700">Active</span>
                            </label>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                        <a href="{{ route('admin.job-updates.index') }}" class="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition">Cancel</a>
                        <button type="submit" class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">Create Job Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
