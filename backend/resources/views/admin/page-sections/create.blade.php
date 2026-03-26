@extends('admin.layouts.app')

@section('title', 'Add Page Section')
@section('breadcrumb', 'Add Page Section')

@section('content')
    <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h2 class="text-2xl font-extrabold text-gray-900">Add Page Section</h2>
            </div>

            <div class="p-6">
                @if($errors->any())
                    <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <ul class="list-disc list-inside text-sm text-red-600">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('admin.page-sections.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {{-- Page --}}
                        <div>
                            <label for="page" class="block text-sm font-semibold text-gray-700 mb-1">Page <span class="text-red-500">*</span></label>
                            <input type="text" name="page" id="page" value="{{ old('page') }}" required
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-400">e.g. home, about, franchise-details</p>
                        </div>

                        {{-- Section Key --}}
                        <div>
                            <label for="section_key" class="block text-sm font-semibold text-gray-700 mb-1">Section Key <span class="text-red-500">*</span></label>
                            <input type="text" name="section_key" id="section_key" value="{{ old('section_key') }}" required
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-400">Unique key for this section</p>
                        </div>

                        {{-- Title --}}
                        <div>
                            <label for="title" class="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                            <input type="text" name="title" id="title" value="{{ old('title') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Subtitle --}}
                        <div>
                            <label for="subtitle" class="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
                            <input type="text" name="subtitle" id="subtitle" value="{{ old('subtitle') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Content (Rich Text Editor) --}}
                        <div class="md:col-span-2">
                            <label for="content" class="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                            <textarea name="content" id="content" rows="12"
                                      class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('content') }}</textarea>
                        </div>

                        {{-- Image --}}
                        <div class="md:col-span-2">
                            <label for="image" class="block text-sm font-semibold text-gray-700 mb-1">Image</label>
                            <input type="file" name="image" id="image" accept="image/*"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Extra Data --}}
                        <div class="md:col-span-2">
                            <label for="extra_data" class="block text-sm font-semibold text-gray-700 mb-1">Extra Data</label>
                            <textarea name="extra_data" id="extra_data" rows="3"
                                      class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('extra_data') }}</textarea>
                            <p class="mt-1 text-xs text-gray-400">JSON format for additional data</p>
                        </div>

                        {{-- Sort Order --}}
                        <div>
                            <label for="sort_order" class="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                            <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', 0) }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Is Active --}}
                        <div class="flex items-end">
                            <label class="inline-flex items-center gap-2">
                                <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                <span class="text-sm font-medium text-gray-700">Active</span>
                            </label>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                        <a href="{{ route('admin.page-sections.index') }}" class="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition">Cancel</a>
                        <button type="submit" class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">Create Page Section</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    if (typeof tinymce !== 'undefined') {
        tinymce.init({
            selector: '#content',
            height: 400,
            menubar: true,
            branding: false,
            promotion: false,
            plugins: 'lists link table code wordcount fullscreen preview help',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link table | code fullscreen preview | removeformat help',
            block_formats: 'Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4; Blockquote=blockquote; Preformatted=pre',
            content_style: 'body { font-family: Inter, -apple-system, sans-serif; font-size: 14px; line-height: 1.6; color: #374151; padding: 12px; } h2 { font-size: 1.5em; font-weight: 700; margin: 1em 0 0.5em; color: #111827; } h3 { font-size: 1.25em; font-weight: 600; margin: 0.8em 0 0.4em; color: #1f2937; } h4 { font-size: 1.1em; font-weight: 600; color: #374151; } ul, ol { padding-left: 1.5em; } li { margin-bottom: 0.3em; } p { margin: 0.5em 0; } a { color: #2563eb; } table { border-collapse: collapse; width: 100%; } td, th { border: 1px solid #d1d5db; padding: 8px; }',
            setup: function (editor) {
                editor.on('change', function () { tinymce.triggerSave(); });
            },
        });
    }
});
</script>
@endpush
