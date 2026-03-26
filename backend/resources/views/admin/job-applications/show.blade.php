@extends('admin.layouts.app')

@section('title', 'Job Application Details')
@section('breadcrumb', 'Job Application Details')

@section('content')
    {{-- Back Button --}}
    <div class="mb-6">
        <a href="{{ route('admin.job-applications.index') }}"
           class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Job Applications
        </a>
    </div>

    {{-- Details Card --}}
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Job Application Details</h1>
        </div>

        <div class="px-6 py-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {{-- Name --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Applicant Name</label>
                    <p class="text-sm text-gray-900">{{ $jobApplication->name }}</p>
                </div>

                {{-- Email --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <p class="text-sm text-gray-900">{{ $jobApplication->email }}</p>
                </div>

                {{-- Phone --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <p class="text-sm text-gray-900">{{ $jobApplication->phone }}</p>
                </div>

                {{-- Job Title --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Applied For</label>
                    <p class="text-sm text-gray-900">{{ $jobApplication->job_title }}</p>
                </div>

                {{-- Qualification --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Qualification</label>
                    <p class="text-sm text-gray-900">{{ $jobApplication->qualification ?? '—' }}</p>
                </div>

                {{-- Experience --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Experience</label>
                    <p class="text-sm text-gray-900">{{ $jobApplication->experience ?? '—' }}</p>
                </div>

                {{-- Status --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <p class="text-sm">
                        @switch($jobApplication->status)
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
                    </p>
                </div>

                {{-- Applied On --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Applied On</label>
                    <p class="text-sm text-gray-900">{{ $jobApplication->created_at->format('d M Y, h:i A') }}</p>
                </div>
            </div>
        </div>
    </div>

    {{-- Cover Letter --}}
    @if($jobApplication->cover_letter)
        <div class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h2 class="text-lg font-bold text-gray-900">Cover Letter / Message</h2>
            </div>
            <div class="px-6 py-6">
                <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ $jobApplication->cover_letter }}</p>
            </div>
        </div>
    @endif

    {{-- Resume --}}
    @if($jobApplication->resume_path)
        <div class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h2 class="text-lg font-bold text-gray-900">Resume</h2>
            </div>
            <div class="px-6 py-6">
                <a href="{{ asset('storage/' . $jobApplication->resume_path) }}" target="_blank"
                   class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Download Resume
                </a>
            </div>
        </div>
    @endif

    {{-- Status Update Form --}}
    <div class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Update Status</h2>
        </div>

        <form action="{{ route('admin.job-applications.update-status', $jobApplication) }}" method="POST" class="px-6 py-6">
            @csrf
            @method('PATCH')

            <div class="flex items-end gap-4">
                <div class="flex-1 max-w-xs">
                    <label for="status" class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <select name="status" id="status"
                            class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="new" {{ $jobApplication->status === 'new' ? 'selected' : '' }}>New</option>
                        <option value="reviewed" {{ $jobApplication->status === 'reviewed' ? 'selected' : '' }}>Reviewed</option>
                        <option value="shortlisted" {{ $jobApplication->status === 'shortlisted' ? 'selected' : '' }}>Shortlisted</option>
                        <option value="rejected" {{ $jobApplication->status === 'rejected' ? 'selected' : '' }}>Rejected</option>
                        <option value="hired" {{ $jobApplication->status === 'hired' ? 'selected' : '' }}>Hired</option>
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
