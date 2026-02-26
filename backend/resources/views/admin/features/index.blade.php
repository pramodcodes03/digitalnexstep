@extends('admin.layouts.app')
@section('title', 'Features')
@section('breadcrumb', 'Features')
@section('content')
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {{-- Header --}}
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Features</h1>
            <a href="{{ route('admin.features.create') }}"
               class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                Add New
            </a>
        </div>

        {{-- Search --}}
        <div class="px-6 py-4 border-b border-gray-100">
            <form method="GET" action="{{ route('admin.features.index') }}" class="flex items-center gap-3">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search features..."
                       class="w-full max-w-sm rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                <button type="submit"
                        class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                    Search
                </button>
                @if(request('search'))
                    <a href="{{ route('admin.features.index') }}" class="text-sm text-gray-500 hover:text-gray-700">Clear</a>
                @endif
            </form>
        </div>

        {{-- Table --}}
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
                <thead class="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                    <tr>
                        <th class="px-6 py-3">Image</th>
                        <th class="px-6 py-3">Title</th>
                        <th class="px-6 py-3">Icon</th>
                        <th class="px-6 py-3">Status</th>
                        <th class="px-6 py-3">Order</th>
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse($items as $item)
                        <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4">
                                @if($item->image)
                                    <img src="{{ $item->image }}" alt="{{ $item->title }}" class="w-16 h-10 object-cover rounded-lg">
                                @else
                                    <span class="text-gray-400 text-xs">No image</span>
                                @endif
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900">{{ $item->title }}</td>
                            <td class="px-6 py-4 text-gray-600">
                                @if($item->icon)
                                    <code class="text-xs bg-gray-100 px-2 py-1 rounded-lg">{{ $item->icon }}</code>
                                @else
                                    <span class="text-gray-400 text-xs">None</span>
                                @endif
                            </td>
                            <td class="px-6 py-4">
                                @if($item->is_active)
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
                                @else
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Inactive</span>
                                @endif
                            </td>
                            <td class="px-6 py-4 text-gray-600">{{ $item->sort_order }}</td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex items-center justify-end gap-3">
                                    <a href="{{ route('admin.features.edit', $item) }}" class="text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</a>
                                    <form action="{{ route('admin.features.destroy', $item) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this feature?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-6 py-12 text-center text-gray-400">
                                No features found. <a href="{{ route('admin.features.create') }}" class="text-blue-600 hover:underline">Add your first one</a>.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{-- Pagination --}}
        @if($items->hasPages())
            <div class="px-6 py-4 border-t border-gray-100">
                {{ $items->links() }}
            </div>
        @endif
    </div>
@endsection
