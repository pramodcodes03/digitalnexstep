@extends('admin.layouts.app')

@section('title', 'Site Settings')
@section('breadcrumb', 'Site Settings')

@section('content')
    {{-- Header --}}
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-extrabold text-gray-900">Site Settings</h1>
        <a href="{{ route('admin.site-settings.create') }}"
           class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
            Add Setting
        </a>
    </div>

    <form action="{{ route('admin.site-settings.update') }}" method="POST" enctype="multipart/form-data">
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

        @forelse($groups as $group => $settings)
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
                {{-- Group Header --}}
                <div class="px-6 py-5 border-b border-gray-100">
                    <h2 class="text-lg font-bold text-gray-900 capitalize">{{ $group }}</h2>
                </div>

                {{-- Settings in Group --}}
                <div class="px-6 py-6 space-y-6">
                    @foreach($settings as $setting)
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex-1">
                                <label for="setting_{{ $setting->id }}" class="block text-sm font-semibold text-gray-700 mb-1">
                                    {{ $setting->key }}
                                </label>

                                @switch($setting->type)
                                    @case('text')
                                        <input type="text"
                                               name="settings[{{ $setting->id }}][value]"
                                               id="setting_{{ $setting->id }}"
                                               value="{{ $setting->value }}"
                                               class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                                        @break

                                    @case('textarea')
                                        <textarea name="settings[{{ $setting->id }}][value]"
                                                  id="setting_{{ $setting->id }}"
                                                  rows="3"
                                                  class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ $setting->value }}</textarea>
                                        @break

                                    @case('boolean')
                                        <div class="flex items-center gap-3">
                                            <label for="setting_{{ $setting->id }}" class="relative inline-flex items-center cursor-pointer">
                                                <input type="hidden" name="settings[{{ $setting->id }}][value]" value="0">
                                                <input type="checkbox"
                                                       name="settings[{{ $setting->id }}][value]"
                                                       id="setting_{{ $setting->id }}"
                                                       value="1"
                                                       {{ in_array($setting->value, ['1', 'true'], true) ? 'checked' : '' }}
                                                       class="sr-only peer">
                                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                            <span class="text-sm text-gray-600">{{ in_array($setting->value, ['1', 'true'], true) ? 'Enabled' : 'Disabled' }}</span>
                                        </div>
                                        @break

                                    @case('number')
                                        <input type="number"
                                               name="settings[{{ $setting->id }}][value]"
                                               id="setting_{{ $setting->id }}"
                                               value="{{ $setting->value }}"
                                               class="w-full max-w-[200px] rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                                        @break

                                    @case('image')
                                        <div class="space-y-3">
                                            @if($setting->value)
                                                <div class="flex items-center gap-3">
                                                    <img src="{{ $setting->value }}"
                                                         alt="{{ $setting->key }}"
                                                         class="h-16 w-auto rounded-lg object-cover border border-gray-200">
                                                    <span class="text-xs text-gray-500">Current image</span>
                                                </div>
                                            @endif
                                            <input type="file"
                                                   name="settings[{{ $setting->id }}][image_value]"
                                                   accept="image/*"
                                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                                        </div>
                                        @break
                                @endswitch
                            </div>

                            {{-- Delete Button --}}
                            <form action="{{ route('admin.site-settings.destroy', $setting) }}" method="POST" class="flex-shrink-0 mt-6"
                                  onsubmit="return confirm('Are you sure you want to delete the setting \'{{ $setting->key }}\'?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-500 hover:text-red-700 transition" title="Delete setting">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    @endforeach
                </div>
            </div>
        @empty
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div class="px-6 py-12 text-center text-gray-400">
                    No settings found. <a href="{{ route('admin.site-settings.create') }}" class="text-blue-600 hover:underline">Add your first setting</a>.
                </div>
            </div>
        @endforelse

        @if($groups->isNotEmpty())
            {{-- Save All Button --}}
            <div class="flex items-center gap-3">
                <button type="submit"
                        class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                    Save All Settings
                </button>
            </div>
        @endif
    </form>
@endsection
