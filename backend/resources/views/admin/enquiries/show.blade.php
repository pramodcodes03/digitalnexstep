@extends('admin.layouts.app')

@section('title', 'Enquiry Details')
@section('breadcrumb', 'Enquiry Details')

@section('content')
    {{-- Back Button --}}
    <div class="mb-6">
        <a href="{{ route('admin.enquiries.index') }}"
           class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Enquiries
        </a>
    </div>

    {{-- Details Card --}}
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Enquiry Details</h1>
        </div>

        <div class="px-6 py-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {{-- Center Name --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Center Name</label>
                    <p class="text-sm text-gray-900">{{ $enquiry->center_name }}</p>
                </div>

                {{-- Product Name --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                    <p class="text-sm text-gray-900">{{ $enquiry->product_name }}</p>
                </div>

                {{-- Email --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <p class="text-sm text-gray-900">{{ $enquiry->email }}</p>
                </div>

                {{-- Mobile --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Mobile</label>
                    <p class="text-sm text-gray-900">{{ $enquiry->mobile }}</p>
                </div>

                {{-- State --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">State</label>
                    <p class="text-sm text-gray-900">{{ $enquiry->state ?? '—' }}</p>
                </div>

                {{-- City --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">City</label>
                    <p class="text-sm text-gray-900">{{ $enquiry->city ?? '—' }}</p>
                </div>

                {{-- Pincode --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Pincode</label>
                    <p class="text-sm text-gray-900">{{ $enquiry->pincode ?? '—' }}</p>
                </div>

                {{-- Status --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <p class="text-sm">
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
                    </p>
                </div>

                {{-- Remark --}}
                <div class="md:col-span-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Remark</label>
                    <p class="text-sm text-gray-900">{{ $enquiry->remark ?? '—' }}</p>
                </div>

                {{-- Created At --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Created At</label>
                    <p class="text-sm text-gray-900">{{ $enquiry->created_at->format('d M Y, h:i A') }}</p>
                </div>
            </div>
        </div>
    </div>

    {{-- Status Update Form --}}
    <div class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Update Status</h2>
        </div>

        <form action="{{ route('admin.enquiries.update-status', $enquiry) }}" method="POST" class="px-6 py-6">
            @csrf
            @method('PATCH')

            <div class="flex items-end gap-4">
                <div class="flex-1 max-w-xs">
                    <label for="status" class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <select name="status" id="status"
                            class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="pending" {{ $enquiry->status === 'pending' ? 'selected' : '' }}>Pending</option>
                        <option value="reviewed" {{ $enquiry->status === 'reviewed' ? 'selected' : '' }}>Reviewed</option>
                        <option value="contacted" {{ $enquiry->status === 'contacted' ? 'selected' : '' }}>Contacted</option>
                        <option value="closed" {{ $enquiry->status === 'closed' ? 'selected' : '' }}>Closed</option>
                    </select>
                </div>
                <button type="submit"
                        class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                    Update
                </button>
            </div>
        </form>
    </div>
@endsection
