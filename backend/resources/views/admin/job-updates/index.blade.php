@extends('admin.layouts.app')

@section('title', 'Job Updates')
@section('breadcrumb', 'Job Updates')

@section('content')
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 class="text-2xl font-extrabold text-gray-900">Job Updates</h2>
            <a href="{{ route('admin.job-updates.create') }}"
               class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                + Add Job Update
            </a>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
                <thead class="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                        <th class="px-6 py-3">Title</th>
                        <th class="px-6 py-3">Company</th>
                        <th class="px-6 py-3">Location</th>
                        <th class="px-6 py-3">Type</th>
                        <th class="px-6 py-3">Expiry</th>
                        <th class="px-6 py-3">Status</th>
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse($items as $item)
                        <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4 font-medium text-gray-900">{{ $item->title }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $item->company }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $item->location }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $item->type }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $item->expires_at ? \Carbon\Carbon::parse($item->expires_at)->format('d M Y') : '—' }}</td>
                            <td class="px-6 py-4">
                                @if($item->is_active)
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                @else
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Inactive</span>
                                @endif
                            </td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex items-center justify-end gap-3">
                                    <a href="{{ route('admin.job-updates.edit', $item) }}" class="text-blue-600 hover:text-blue-700 font-medium">Edit</a>
                                    <form action="{{ route('admin.job-updates.destroy', $item) }}" method="POST" class="inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:text-red-700 font-medium" onclick="return confirm('Are you sure?')">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="px-6 py-10 text-center text-gray-400">No job updates found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($items->hasPages())
            <div class="px-6 py-4 border-t border-gray-100">
                {{ $items->links() }}
            </div>
        @endif
    </div>
@endsection
