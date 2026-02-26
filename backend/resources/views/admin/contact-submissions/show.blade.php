@extends('admin.layouts.app')

@section('title', 'Contact Message Details')
@section('breadcrumb', 'Contact Message Details')

@section('content')
    {{-- Back Button --}}
    <div class="mb-6">
        <a href="{{ route('admin.contact-submissions.index') }}"
           class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Contact Messages
        </a>
    </div>

    {{-- Details Card --}}
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h1 class="text-2xl font-extrabold text-gray-900">Contact Message Details</h1>
        </div>

        <div class="px-6 py-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {{-- Name --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                    <p class="text-sm text-gray-900">{{ $message->name }}</p>
                </div>

                {{-- Email --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <p class="text-sm text-gray-900">{{ $message->email }}</p>
                </div>

                {{-- Phone --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <p class="text-sm text-gray-900">{{ $message->phone ?? '—' }}</p>
                </div>

                {{-- Subject --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                    <p class="text-sm text-gray-900">{{ $message->subject }}</p>
                </div>

                {{-- Status --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <p class="text-sm">
                        @switch($message->status)
                            @case('new')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">New</span>
                                @break
                            @case('read')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Read</span>
                                @break
                            @case('replied')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Replied</span>
                                @break
                            @case('closed')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">Closed</span>
                                @break
                        @endswitch
                    </p>
                </div>

                {{-- Created At --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Created At</label>
                    <p class="text-sm text-gray-900">{{ $message->created_at->format('d M Y, h:i A') }}</p>
                </div>
            </div>
        </div>
    </div>

    {{-- Message Content Card --}}
    <div class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Message</h2>
        </div>

        <div class="px-6 py-6">
            <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ $message->message }}</p>
        </div>
    </div>

    {{-- Status Update Form --}}
    <div class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Update Status</h2>
        </div>

        <form action="{{ route('admin.contact-submissions.update-status', $message) }}" method="POST" class="px-6 py-6">
            @csrf
            @method('PATCH')

            <div class="flex items-end gap-4">
                <div class="flex-1 max-w-xs">
                    <label for="status" class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <select name="status" id="status"
                            class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="new" {{ $message->status === 'new' ? 'selected' : '' }}>New</option>
                        <option value="read" {{ $message->status === 'read' ? 'selected' : '' }}>Read</option>
                        <option value="replied" {{ $message->status === 'replied' ? 'selected' : '' }}>Replied</option>
                        <option value="closed" {{ $message->status === 'closed' ? 'selected' : '' }}>Closed</option>
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
