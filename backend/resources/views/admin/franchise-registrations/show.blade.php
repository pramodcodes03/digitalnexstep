@extends('admin.layouts.app')

@section('title', 'Franchise Registration Details')
@section('breadcrumb', 'Franchise Registration Details')

@section('content')
    {{-- Back Button --}}
    <div class="mb-6">
        <a href="{{ route('admin.franchise-registrations.index') }}"
           class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Franchise Registrations
        </a>
    </div>

    {{-- Details Card --}}
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Franchise Registration Details</h1>
        </div>

        <div class="px-6 py-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {{-- Institution Name --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Institution Name</label>
                    <p class="text-sm text-gray-900">{{ $registration->institution_name }}</p>
                </div>

                {{-- Center Owner Name --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Center Owner Name</label>
                    <p class="text-sm text-gray-900">{{ $registration->owner_name }}</p>
                </div>

                {{-- Email --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <p class="text-sm text-gray-900">{{ $registration->email }}</p>
                </div>

                {{-- Mobile --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Mobile</label>
                    <p class="text-sm text-gray-900">{{ $registration->mobile }}</p>
                </div>

                {{-- Alternate Mobile --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Alternate Mobile</label>
                    <p class="text-sm text-gray-900">{{ $registration->alternate_mobile ?? '—' }}</p>
                </div>

                {{-- Address --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                    <p class="text-sm text-gray-900">{{ $registration->address ?? '—' }}</p>
                </div>

                {{-- City --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">City</label>
                    <p class="text-sm text-gray-900">{{ $registration->city ?? '—' }}</p>
                </div>

                {{-- State --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">State</label>
                    <p class="text-sm text-gray-900">{{ $registration->state ?? '—' }}</p>
                </div>

                {{-- Pincode --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Pincode</label>
                    <p class="text-sm text-gray-900">{{ $registration->pincode ?? '—' }}</p>
                </div>

                {{-- Infrastructure Details --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Infrastructure Details</label>
                    <p class="text-sm text-gray-900">{{ $registration->infrastructure_details ?? '—' }}</p>
                </div>

                {{-- Computer Count --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Computer Count</label>
                    <p class="text-sm text-gray-900">{{ $registration->computer_count ?? '—' }}</p>
                </div>

                {{-- Has Projector --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Has Projector</label>
                    <p class="text-sm text-gray-900">
                        @if($registration->has_projector)
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Yes</span>
                        @else
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">No</span>
                        @endif
                    </p>
                </div>

                {{-- Internet Available --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Internet Available</label>
                    <p class="text-sm text-gray-900">
                        @if($registration->internet_available)
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Yes</span>
                        @else
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">No</span>
                        @endif
                    </p>
                </div>

                {{-- Space Size --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Space Size</label>
                    <p class="text-sm text-gray-900">{{ $registration->space_size ?? '—' }}</p>
                </div>

                {{-- Qualification --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Qualification</label>
                    <p class="text-sm text-gray-900">{{ $registration->qualification ?? '—' }}</p>
                </div>

                {{-- Teaching Experience --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Teaching Experience</label>
                    <p class="text-sm text-gray-900">{{ $registration->teaching_experience ?? '—' }}</p>
                </div>

                {{-- Previous Franchise Experience --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Previous Franchise Experience</label>
                    <p class="text-sm text-gray-900">{{ $registration->previous_franchise_experience ?? '—' }}</p>
                </div>

                {{-- Investment Capacity --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Investment Capacity</label>
                    <p class="text-sm text-gray-900">{{ $registration->investment_capacity ?? '—' }}</p>
                </div>

                {{-- Preferred Start Date --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Preferred Start Date</label>
                    <p class="text-sm text-gray-900">{{ $registration->preferred_start_date ? \Carbon\Carbon::parse($registration->preferred_start_date)->format('d M Y') : '—' }}</p>
                </div>

                {{-- How Heard About Us --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">How Heard About Us</label>
                    <p class="text-sm text-gray-900">{{ $registration->how_heard_about_us ?? '—' }}</p>
                </div>

                {{-- Remarks --}}
                <div class="md:col-span-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Remarks</label>
                    <p class="text-sm text-gray-900">{{ $registration->remarks ?? '—' }}</p>
                </div>

                {{-- Status --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <p class="text-sm">
                        @switch($registration->status)
                            @case('pending')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Pending</span>
                                @break
                            @case('reviewed')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Reviewed</span>
                                @break
                            @case('approved')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Approved</span>
                                @break
                            @case('rejected')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Rejected</span>
                                @break
                        @endswitch
                    </p>
                </div>

                {{-- Created At --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Created At</label>
                    <p class="text-sm text-gray-900">{{ $registration->created_at->format('d M Y, h:i A') }}</p>
                </div>
            </div>
        </div>
    </div>

    {{-- Status Update Form --}}
    <div class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Update Status</h2>
        </div>

        <form action="{{ route('admin.franchise-registrations.update-status', $registration) }}" method="POST" class="px-6 py-6">
            @csrf
            @method('PATCH')

            <div class="flex items-end gap-4">
                <div class="flex-1 max-w-xs">
                    <label for="status" class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <select name="status" id="status"
                            class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="pending" {{ $registration->status === 'pending' ? 'selected' : '' }}>Pending</option>
                        <option value="reviewed" {{ $registration->status === 'reviewed' ? 'selected' : '' }}>Reviewed</option>
                        <option value="approved" {{ $registration->status === 'approved' ? 'selected' : '' }}>Approved</option>
                        <option value="rejected" {{ $registration->status === 'rejected' ? 'selected' : '' }}>Rejected</option>
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
