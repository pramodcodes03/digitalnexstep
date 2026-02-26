@props(['label', 'icon' => 'default', 'key', 'active' => false])

@php
$icons = [
    'home' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
    'info' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    'products' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>',
    'franchise' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>',
    'default' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>',
];
$svgPath = $icons[$icon] ?? $icons['default'];
@endphp

<div x-data="{ open: openMenus['{{ $key }}'] || {{ $active ? 'true' : 'false' }} }"
     x-effect="openMenus['{{ $key }}'] = open">

    {{-- Group toggle button --}}
    <button @click="open = !open"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 {{ $active ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white hover:bg-gray-800' }}">
        <svg class="w-5 h-5 flex-shrink-0 {{ $active ? 'text-blue-400' : 'text-gray-500' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {!! $svgPath !!}
        </svg>
        <span x-show="!sidebarCollapsed" class="flex-1 text-left truncate">{{ $label }}</span>
        <svg x-show="!sidebarCollapsed" class="w-4 h-4 transition-transform duration-200 text-gray-500" :class="open && 'rotate-90'" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
        </svg>
    </button>

    {{-- Children --}}
    <div x-show="open && !sidebarCollapsed" x-cloak
         x-transition:enter="transition ease-out duration-200"
         x-transition:enter-start="opacity-0 -translate-y-1"
         x-transition:enter-end="opacity-100 translate-y-0"
         class="mt-1 ml-4 pl-4 border-l border-gray-800 space-y-0.5">
        {{ $slot }}
    </div>
</div>
