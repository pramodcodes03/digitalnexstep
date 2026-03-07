@extends('admin.layouts.app')

@section('title', 'Award Images')
@section('breadcrumb', 'Award Images')

@section('content')
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {{-- Header --}}
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Award Images</h1>
            <a href="{{ route('admin.award-images.create') }}"
               class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                Add New
            </a>
        </div>

        {{-- Grid --}}
        <div class="p-6">
            @if($items->count() > 0)
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    @foreach($items as $item)
                        <div class="group relative bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                            <img src="{{ $item->image }}"
                                 alt="Award Image"
                                 class="w-full h-40 object-cover">

                            {{-- Status badge --}}
                            <div class="absolute top-2 left-2">
                                @if($item->is_active)
                                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">Active</span>
                                @else
                                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-800">Inactive</span>
                                @endif
                            </div>

                            {{-- Order badge --}}
                            <div class="absolute top-2 right-2">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-800 text-white">#{{ $item->sort_order }}</span>
                            </div>

                            {{-- Actions overlay --}}
                            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                                <a href="{{ route('admin.award-images.edit', $item) }}"
                                   class="px-3 py-1.5 bg-white text-gray-900 text-xs font-semibold rounded-lg hover:bg-gray-100 transition">
                                    Edit
                                </a>
                                <form action="{{ route('admin.award-images.destroy', $item) }}" method="POST" class="inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit"
                                            class="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition"
                                            onclick="return confirm('Are you sure?')">
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </div>
                    @endforeach
                </div>
            @else
                <div class="text-center py-12 text-gray-400">
                    No award images found. Click "Add New" to upload one.
                </div>
            @endif
        </div>

        {{-- Pagination --}}
        @if($items->hasPages())
            <div class="px-6 py-4 border-t border-gray-100">
                {{ $items->links() }}
            </div>
        @endif
    </div>
@endsection
