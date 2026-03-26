@extends('admin.layouts.app')

@section('title', 'Job Applications')
@section('breadcrumb', 'Job Applications')

@section('content')
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {{-- Header --}}
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Job Applications</h1>
        </div>

        {{-- Search & Filter --}}
        <div class="px-6 py-4 border-b border-gray-100">
            <form method="GET" action="{{ route('admin.job-applications.index') }}" class="flex items-center gap-3">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search by name, email, phone, job title..."
                       class="w-full max-w-sm rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                <select name="status"
                        class="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Statuses</option>
                    <option value="new" {{ request('status') === 'new' ? 'selected' : '' }}>New</option>
                    <option value="reviewed" {{ request('status') === 'reviewed' ? 'selected' : '' }}>Reviewed</option>
                    <option value="shortlisted" {{ request('status') === 'shortlisted' ? 'selected' : '' }}>Shortlisted</option>
                    <option value="rejected" {{ request('status') === 'rejected' ? 'selected' : '' }}>Rejected</option>
                    <option value="hired" {{ request('status') === 'hired' ? 'selected' : '' }}>Hired</option>
                </select>
                <button type="submit"
                        class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                    Search
                </button>
                @if(request('search') || request('status'))
                    <a href="{{ route('admin.job-applications.index') }}" class="text-sm text-gray-500 hover:text-gray-700">Clear</a>
                @endif
            </form>
        </div>

        {{-- Table --}}
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
                <thead class="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                        <th class="px-6 py-3">Name</th>
                        <th class="px-6 py-3">Email</th>
                        <th class="px-6 py-3">Phone</th>
                        <th class="px-6 py-3">Job Title</th>
                        <th class="px-6 py-3">Qualification</th>
                        <th class="px-6 py-3">Status</th>
                        <th class="px-6 py-3">Date</th>
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse($items as $item)
                        <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4 font-medium text-gray-900">{{ $item->name }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $item->email }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $item->phone }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ Str::limit($item->job_title, 30) }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $item->qualification ?? '—' }}</td>
                            <td class="px-6 py-4">
                                @switch($item->status)
                                    @case('new')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">New</span>
                                        @break
                                    @case('reviewed')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Reviewed</span>
                                        @break
                                    @case('shortlisted')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Shortlisted</span>
                                        @break
                                    @case('rejected')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Rejected</span>
                                        @break
                                    @case('hired')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Hired</span>
                                        @break
                                @endswitch
                            </td>
                            <td class="px-6 py-4 text-gray-600">{{ $item->created_at->format('d M Y') }}</td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex items-center justify-end gap-3">
                                    <a href="{{ route('admin.job-applications.show', $item) }}" class="text-blue-600 hover:text-blue-700 text-sm font-medium">View</a>
                                    <form action="{{ route('admin.job-applications.destroy', $item) }}" method="POST" class="inline"
                                          onsubmit="return confirm('Are you sure you want to delete this application?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="px-6 py-12 text-center text-gray-400">
                                No job applications found.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{-- Pagination --}}
        @if($items->hasPages())
            <div class="px-6 py-4 border-t border-gray-100">
                {{ $items->appends(request()->query())->links() }}
            </div>
        @endif
    </div>
@endsection
