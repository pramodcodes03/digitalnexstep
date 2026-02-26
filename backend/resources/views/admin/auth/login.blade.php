<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Admin Login — DigitalNexStep</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="h-full bg-gray-950 font-[Inter] flex items-center justify-center p-4">
    {{-- Background effects --}}
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 -left-40 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px]"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]"></div>
        <div class="absolute inset-0 opacity-[0.03]"
             style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 60px 60px;">
        </div>
    </div>

    <div class="relative w-full max-w-md">
        {{-- Logo --}}
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25 mb-4">
                <span class="text-white font-extrabold text-2xl">DN</span>
            </div>
            <h1 class="text-2xl font-extrabold text-white">DigitalNexStep</h1>
            <p class="text-gray-500 text-sm mt-1">Admin Panel Login</p>
        </div>

        {{-- Login card --}}
        <div class="relative">
            <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-lg"></div>
            <div class="relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30">
                <div class="rounded-2xl bg-gray-900 p-8">
                    @if($errors->any())
                        <div class="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                            @foreach($errors->all() as $error)
                                <p class="text-red-400 text-sm">{{ $error }}</p>
                            @endforeach
                        </div>
                    @endif

                    <form method="POST" action="{{ route('admin.login.submit') }}" class="space-y-5">
                        @csrf

                        {{-- Email --}}
                        <div>
                            <label for="email" class="block text-sm font-semibold text-gray-300 mb-1.5">Email Address</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                                </div>
                                <input id="email" name="email" type="email" value="{{ old('email') }}" required autofocus
                                       class="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all text-sm"
                                       placeholder="admin@example.com">
                            </div>
                        </div>

                        {{-- Password --}}
                        <div>
                            <label for="password" class="block text-sm font-semibold text-gray-300 mb-1.5">Password</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                </div>
                                <input id="password" name="password" type="password" required
                                       class="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all text-sm"
                                       placeholder="••••••••">
                            </div>
                        </div>

                        {{-- Remember me --}}
                        <div class="flex items-center justify-between">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="remember" class="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500/25">
                                <span class="text-sm text-gray-400">Remember me</span>
                            </label>
                        </div>

                        {{-- Submit --}}
                        <button type="submit"
                                class="w-full relative overflow-hidden rounded-xl py-3 text-sm font-bold text-white shadow-lg group">
                            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600"></div>
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
                            </div>
                            <span class="relative flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
                                Sign In
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <p class="text-center text-gray-600 text-xs mt-6">&copy; {{ date('Y') }} DigitalNexStep. All rights reserved.</p>
    </div>
</body>
</html>
