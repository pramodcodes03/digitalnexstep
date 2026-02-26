@extends('admin.layouts.app')

@section('title', 'Enquiries')
@section('breadcrumb', 'Enquiries')

@section('content')
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {{-- Header --}}
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Enquiries</h1>
        </div>

        {{-- Search & Filter --}}
        <div class="px-6 py-4 border-b border-gray-100">
            <form method="GET" action="{{ route('admin.enquiries.index') }}" class="flex items-center gap-3">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search enquiries..."
                       class="w-full max-w-sm rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                <select name="status"
                        class="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Statuses</option>
                    <option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Pending</option>
                    <option value="reviewed" {{ request('status') === 'reviewed' ? 'selected' : '' }}>Reviewed</option>
                    <option value="contacted" {{ request('status') === 'contacted' ? 'selected' : '' }}>Contacted</option>
                    <option value="closed" {{ request('status') === 'closed' ? 'selected' : '' }}>Closed</option>
                </select>
                <button type="submit"
                        class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                    Search
                </button>
                @if(request('search') || request('status'))
                    <a href="{{ route('admin.enquiries.index') }}" class="text-sm text-gray-500 hover:text-gray-700">Clear</a>
                @endif
            </form>
        </div>

        {{-- Table --}}
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
                <thead class="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                        <th class="px-6 py-3">Center Name</th>
                        <th class="px-6 py-3">Product</th>
                        <th class="px-6 py-3">Email</th>
                        <th class="px-6 py-3">Mobile</th>
                        <th class="px-6 py-3">City</th>
                        <th class="px-6 py-3">Status</th>
                        <th class="px-6 py-3">Date</th>
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse($items as $enquiry)
                        <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4 font-medium text-gray-900">{{ $enquiry->center_name }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $enquiry->product_name }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $enquiry->email }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $enquiry->mobile }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ $enquiry->city }}</td>
                            <td class="px-6 py-4">
                                @switch($enquiry->status)
                                    @case('pending')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Pending</span>
                                        @break
                                    @case('reviewed')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Reviewed</span>
                                        @break
                                    @case('contacted')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">Contacted</span>
                                        @break
                                    @case('closed')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Closed</span>
                                        @break
                                @endswitch
                            </td>
                            <td class="px-6 py-4 text-gray-600">{{ $enquiry->created_at->format('d M Y') }}</td>
                            <td class="px-6 py-4 text-right">
                                <a href="{{ route('admin.enquiries.show', $enquiry) }}" class="text-blue-600 hover:text-blue-700 text-sm font-medium">View</a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="px-6 py-12 text-center text-gray-400">
                                No enquiries found.
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
