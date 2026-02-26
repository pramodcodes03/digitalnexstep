{{-- Sidebar --}}
<aside class="fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 transition-all duration-300 ease-in-out"
       :class="[
           sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
           sidebarCollapsed ? 'w-20' : 'w-72'
       ]"
       x-data="{ openMenus: {} }"
       x-init="openMenus = JSON.parse(localStorage.getItem('admin_open_menus') || '{}')"
       x-effect="localStorage.setItem('admin_open_menus', JSON.stringify(openMenus))">

    {{-- Logo --}}
    <div class="flex items-center h-16 px-4 border-b border-gray-800 flex-shrink-0">
        <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3 overflow-hidden">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span class="text-white font-extrabold text-lg">DN</span>
            </div>
            <div x-show="!sidebarCollapsed" x-transition class="whitespace-nowrap">
                <h1 class="text-white font-bold text-base leading-tight">DigitalNexStep</h1>
                <p class="text-gray-500 text-[10px] font-medium tracking-wider uppercase">Admin Panel</p>
            </div>
        </a>
    </div>

    {{-- Navigation --}}
    <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin">
        {{-- Dashboard --}}
        <x-admin-nav-link href="{{ route('admin.dashboard') }}" icon="dashboard" :active="request()->routeIs('admin.dashboard')">
            Dashboard
        </x-admin-nav-link>

        {{-- Home Page --}}
        <x-admin-nav-group label="Home Page" icon="home" key="home"
            :active="request()->routeIs('admin.hero-slides.*') || request()->routeIs('admin.features.*') || request()->routeIs('admin.achievements.*') || request()->routeIs('admin.testimonials.*') || request()->routeIs('admin.partners.*') || request()->routeIs('admin.faqs.*') || request()->routeIs('admin.pricing-plans.*') || request()->routeIs('admin.job-updates.*') || request()->routeIs('admin.centers.*')">
            <x-admin-nav-child href="{{ route('admin.hero-slides.index') }}" :active="request()->routeIs('admin.hero-slides.*')">Hero Slides</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.features.index') }}" :active="request()->routeIs('admin.features.*')">Features</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.achievements.index') }}" :active="request()->routeIs('admin.achievements.*')">Achievements</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.testimonials.index') }}" :active="request()->routeIs('admin.testimonials.*')">Testimonials</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.partners.index') }}" :active="request()->routeIs('admin.partners.*')">Partners</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.faqs.index') }}" :active="request()->routeIs('admin.faqs.*')">FAQs</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.pricing-plans.index') }}" :active="request()->routeIs('admin.pricing-plans.*')">Pricing Plans</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.job-updates.index') }}" :active="request()->routeIs('admin.job-updates.*')">Job Updates</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.centers.index') }}" :active="request()->routeIs('admin.centers.*')">Centers</x-admin-nav-child>
        </x-admin-nav-group>

        {{-- About Us --}}
        <x-admin-nav-group label="About Us" icon="info" key="about"
            :active="request()->routeIs('admin.about-sections.*') || request()->routeIs('admin.team-members.*')">
            <x-admin-nav-child href="{{ route('admin.about-sections.index') }}" :active="request()->routeIs('admin.about-sections.*')">Sections</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.team-members.index') }}" :active="request()->routeIs('admin.team-members.*')">Team Members</x-admin-nav-child>
        </x-admin-nav-group>

        {{-- Our Products --}}
        <x-admin-nav-group label="Our Products" icon="products" key="products"
            :active="request()->routeIs('admin.products.*') || request()->routeIs('admin.enquiries.*')">
            <x-admin-nav-child href="{{ route('admin.products.index') }}" :active="request()->routeIs('admin.products.*')">Products</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.enquiries.index') }}" :active="request()->routeIs('admin.enquiries.*')">Enquiries</x-admin-nav-child>
        </x-admin-nav-group>

        {{-- Franchise --}}
        <x-admin-nav-group label="Franchise" icon="franchise" key="franchise"
            :active="request()->routeIs('admin.franchise-registrations.*') || request()->routeIs('admin.page-sections.franchise*')">
            <x-admin-nav-child href="{{ route('admin.franchise-registrations.index') }}" :active="request()->routeIs('admin.franchise-registrations.*')">Registrations</x-admin-nav-child>
            <x-admin-nav-child href="{{ route('admin.page-sections.index', ['page' => 'franchise-details']) }}" :active="request()->is('admin/page-sections/franchise-details*')">Details Page</x-admin-nav-child>
        </x-admin-nav-group>

        {{-- Gallery --}}
        <x-admin-nav-link href="{{ route('admin.gallery-items.index') }}" icon="gallery" :active="request()->routeIs('admin.gallery-items.*')">
            Gallery
        </x-admin-nav-link>

        {{-- Contact --}}
        <x-admin-nav-link href="{{ route('admin.contact-submissions.index') }}" icon="contact" :active="request()->routeIs('admin.contact-submissions.*')">
            Contact Messages
        </x-admin-nav-link>

        {{-- Settings --}}
        <x-admin-nav-link href="{{ route('admin.site-settings.index') }}" icon="settings" :active="request()->routeIs('admin.site-settings.*')">
            Site Settings
        </x-admin-nav-link>

        {{-- Page Sections --}}
        <x-admin-nav-link href="{{ route('admin.page-sections.index') }}" icon="pages" :active="request()->routeIs('admin.page-sections.*') && !request()->is('admin/page-sections/franchise*')">
            Page Sections
        </x-admin-nav-link>
    </nav>

    {{-- Collapse toggle (desktop) --}}
    <div class="hidden lg:flex items-center justify-center p-3 border-t border-gray-800">
        <button @click="sidebarCollapsed = !sidebarCollapsed"
                class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <svg class="w-5 h-5 transition-transform duration-300" :class="sidebarCollapsed && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
            </svg>
            <span x-show="!sidebarCollapsed" class="text-xs font-medium">Collapse</span>
        </button>
    </div>
</aside>
