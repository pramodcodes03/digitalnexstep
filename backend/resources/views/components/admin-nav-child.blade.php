@props(['href', 'active' => false])

<a href="{{ $href }}"
   class="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 {{ $active ? 'text-blue-400 bg-blue-500/10' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50' }}">
    <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 {{ $active ? 'bg-blue-400' : 'bg-gray-700' }}"></span>
    {{ $slot }}
</a>
