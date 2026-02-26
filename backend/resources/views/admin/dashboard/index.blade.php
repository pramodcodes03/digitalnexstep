@extends('admin.layouts.app')

@section('title', 'Dashboard')
@section('breadcrumb', 'Dashboard')

@section('content')
<div class="space-y-8">
    {{-- Welcome header --}}
    <div>
        <h1 class="text-2xl font-extrabold text-gray-900">Welcome back, {{ auth()->user()->name }}!</h1>
        <p class="text-gray-500 text-sm mt-1">Here's what's happening with your platform today.</p>
    </div>

    {{-- Stat cards --}}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {{-- Enquiries --}}
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
                <div class="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                </div>
                @if($stats['pending_enquiries'] > 0)
                    <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">{{ $stats['pending_enquiries'] }} pending</span>
                @endif
            </div>
            <p class="text-2xl font-extrabold text-gray-900">{{ $stats['total_enquiries'] }}</p>
            <p class="text-sm text-gray-500 mt-0.5">Product Enquiries</p>
        </div>

        {{-- Franchise --}}
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
                <div class="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </div>
                @if($stats['pending_franchises'] > 0)
                    <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">{{ $stats['pending_franchises'] }} pending</span>
                @endif
            </div>
            <p class="text-2xl font-extrabold text-gray-900">{{ $stats['total_franchises'] }}</p>
            <p class="text-sm text-gray-500 mt-0.5">Franchise Applications</p>
        </div>

        {{-- Contact Messages --}}
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
                <div class="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                @if($stats['new_contacts'] > 0)
                    <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">{{ $stats['new_contacts'] }} new</span>
                @endif
            </div>
            <p class="text-2xl font-extrabold text-gray-900">{{ $stats['total_contacts'] }}</p>
            <p class="text-sm text-gray-500 mt-0.5">Contact Messages</p>
        </div>

        {{-- Content --}}
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
                <div class="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center">
                    <svg class="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
            </div>
            <p class="text-2xl font-extrabold text-gray-900">{{ $stats['total_products'] + $stats['total_features'] + $stats['total_testimonials'] + $stats['total_gallery'] }}</p>
            <p class="text-sm text-gray-500 mt-0.5">Content Items</p>
        </div>
    </div>

    {{-- Recent tables --}}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {{-- Recent Enquiries --}}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 class="font-bold text-gray-900">Recent Enquiries</h3>
                <a href="{{ route('admin.enquiries.index') }}" class="text-xs font-semibold text-blue-600 hover:text-blue-700">View All →</a>
            </div>
            <div class="divide-y divide-gray-50">
                @forelse($recentEnquiries as $enquiry)
                    <div class="px-5 py-3 flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-gray-800">{{ $enquiry->center_name }}</p>
                            <p class="text-xs text-gray-500">{{ $enquiry->product_name ?? 'General' }} · {{ $enquiry->email }}</p>
                        </div>
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                            {{ $enquiry->status === 'pending' ? 'bg-amber-100 text-amber-700' : ($enquiry->status === 'contacted' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600') }}">
                            {{ $enquiry->status }}
                        </span>
                    </div>
                @empty
                    <div class="px-5 py-8 text-center text-sm text-gray-400">No enquiries yet</div>
                @endforelse
            </div>
        </div>

        {{-- Recent Contact Messages --}}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 class="font-bold text-gray-900">Recent Messages</h3>
                <a href="{{ route('admin.contact-submissions.index') }}" class="text-xs font-semibold text-blue-600 hover:text-blue-700">View All →</a>
            </div>
            <div class="divide-y divide-gray-50">
                @forelse($recentContacts as $contact)
                    <div class="px-5 py-3 flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-gray-800">{{ $contact->name }}</p>
                            <p class="text-xs text-gray-500 truncate max-w-[250px]">{{ $contact->subject ?? Str::limit($contact->message, 50) }}</p>
                        </div>
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                            {{ $contact->status === 'new' ? 'bg-blue-100 text-blue-700' : ($contact->status === 'read' ? 'bg-gray-100 text-gray-600' : 'bg-emerald-100 text-emerald-700') }}">
                            {{ $contact->status }}
                        </span>
                    </div>
                @empty
                    <div class="px-5 py-8 text-center text-sm text-gray-400">No messages yet</div>
                @endforelse
            </div>
        </div>
    </div>
</div>
@endsection
