@extends('admin.layouts.app')

@section('title', 'Edit Page Section')
@section('breadcrumb', 'Edit Page Section')

@section('content')
    <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h2 class="text-2xl font-extrabold text-gray-900">Edit Page Section</h2>
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

                <form action="{{ route('admin.page-sections.update', $pageSection) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {{-- Page --}}
                        <div>
                            <label for="page" class="block text-sm font-semibold text-gray-700 mb-1">Page <span class="text-red-500">*</span></label>
                            <input type="text" name="page" id="page" value="{{ old('page', $pageSection->page) }}" required
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-400">e.g. home, about, franchise-details</p>
                        </div>

                        {{-- Section Key --}}
                        <div>
                            <label for="section_key" class="block text-sm font-semibold text-gray-700 mb-1">Section Key <span class="text-red-500">*</span></label>
                            <input type="text" name="section_key" id="section_key" value="{{ old('section_key', $pageSection->section_key) }}" required
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-400">Unique key for this section</p>
                        </div>

                        {{-- Title --}}
                        <div>
                            <label for="title" class="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                            <input type="text" name="title" id="title" value="{{ old('title', $pageSection->title) }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Subtitle --}}
                        <div>
                            <label for="subtitle" class="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
                            <input type="text" name="subtitle" id="subtitle" value="{{ old('subtitle', $pageSection->subtitle) }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Content (Rich Text Editor) --}}
                        <div class="md:col-span-2">
                            <label for="content" class="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                            <textarea name="content" id="content" rows="12"
                                      class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 tinymce-editor">{{ old('content', $pageSection->content) }}</textarea>
                        </div>

                        {{-- Image --}}
                        <div class="md:col-span-2">
                            <label for="image" class="block text-sm font-semibold text-gray-700 mb-1">Image</label>
                            @if($pageSection->image)
                                <div class="mb-3">
                                    <img src="{{ $pageSection->image }}" alt="{{ $pageSection->title }}" class="w-32 h-24 rounded-xl object-cover border border-gray-200">
                                </div>
                            @endif
                            <input type="file" name="image" id="image" accept="image/*"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Extra Data - Visual Editor --}}
                        <div class="md:col-span-2">
                            <div class="flex items-center justify-between mb-2">
                                <label class="block text-sm font-semibold text-gray-700">Extra Data</label>
                                <div class="flex items-center gap-2">
                                    <button type="button" id="toggleJsonView" class="text-xs font-medium text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                                        <span id="toggleJsonLabel">Show JSON</span>
                                    </button>
                                </div>
                            </div>

                            {{-- Hidden textarea that holds the actual JSON for form submission --}}
                            <textarea name="extra_data" id="extra_data" rows="6" class="hidden w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-mono focus:border-blue-500 focus:ring-blue-500">{{ old('extra_data', is_array($pageSection->extra_data) ? json_encode($pageSection->extra_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) : $pageSection->extra_data) }}</textarea>

                            {{-- Visual Editor Container --}}
                            <div id="extraDataEditor" class="space-y-3"></div>
                        </div>

                        {{-- Sort Order --}}
                        <div>
                            <label for="sort_order" class="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                            <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', $pageSection->sort_order) }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Is Active --}}
                        <div class="flex items-end">
                            <label class="inline-flex items-center gap-2">
                                <input type="checkbox" name="is_active" value="1" {{ old('is_active', $pageSection->is_active) ? 'checked' : '' }}
                                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                <span class="text-sm font-medium text-gray-700">Active</span>
                            </label>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                        <a href="{{ route('admin.page-sections.index') }}" class="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition">Cancel</a>
                        <button type="submit" class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">Update Page Section</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    // ── TinyMCE Rich Text Editor ──
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
    const textarea = document.getElementById('extra_data');
    const editor = document.getElementById('extraDataEditor');
    const toggleBtn = document.getElementById('toggleJsonView');
    const toggleLabel = document.getElementById('toggleJsonLabel');
    let jsonMode = false;
    let extraData = {};

    // ── Parse initial JSON ──
    try {
        extraData = JSON.parse(textarea.value || '{}') || {};
    } catch { extraData = {}; }

    // ── Sync visual → textarea ──
    function syncToTextarea() {
        textarea.value = JSON.stringify(extraData, null, 2);
    }

    // ── Toggle JSON / Visual ──
    toggleBtn.addEventListener('click', function () {
        jsonMode = !jsonMode;
        if (jsonMode) {
            syncToTextarea();
            textarea.classList.remove('hidden');
            editor.classList.add('hidden');
            toggleLabel.textContent = 'Visual Editor';
        } else {
            try { extraData = JSON.parse(textarea.value || '{}'); } catch {}
            textarea.classList.add('hidden');
            editor.classList.remove('hidden');
            toggleLabel.textContent = 'Show JSON';
            renderEditor();
        }
    });

    // ── Helper: human-friendly label ──
    function toLabel(key) {
        return key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
    }

    // ── Input classes ──
    const inputCls = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition';
    const btnSmCls = 'inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition';

    // ── Render the editor ──
    function renderEditor() {
        editor.innerHTML = '';
        if (!extraData || typeof extraData !== 'object' || Object.keys(extraData).length === 0) {
            editor.innerHTML = '<p class="text-sm text-gray-400 italic py-4">No extra data. Switch to JSON view to add data.</p>';
            return;
        }

        Object.keys(extraData).forEach(function (key) {
            const value = extraData[key];
            const card = document.createElement('div');
            card.className = 'bg-gray-50 border border-gray-200 rounded-xl p-4';

            const header = document.createElement('div');
            header.className = 'flex items-center justify-between mb-3';
            header.innerHTML = '<h4 class="text-sm font-bold text-gray-800 flex items-center gap-2">' +
                '<span class="w-6 h-6 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center text-xs font-bold">' + key.charAt(0).toUpperCase() + '</span>' +
                toLabel(key) + '</h4>';
            card.appendChild(header);

            if (typeof value === 'string' || typeof value === 'number') {
                // ── Simple String / Number ──
                card.appendChild(renderStringField(key, value));
            } else if (Array.isArray(value)) {
                if (value.length === 0 || typeof value[0] === 'string') {
                    // ── Array of Strings ──
                    card.appendChild(renderStringArray(key, value));
                } else if (typeof value[0] === 'object') {
                    // ── Array of Objects ──
                    card.appendChild(renderObjectArray(key, value));
                }
            } else if (typeof value === 'object' && value !== null) {
                // ── Nested Object ──
                card.appendChild(renderNestedObject(key, value));
            }

            editor.appendChild(card);
        });
    }

    // ── Render: Simple String Field ──
    function renderStringField(key, value) {
        const wrap = document.createElement('div');
        const isLong = String(value).length > 100;
        if (isLong) {
            const ta = document.createElement('textarea');
            ta.rows = 3;
            ta.className = inputCls + ' resize-y';
            ta.value = value;
            ta.addEventListener('input', function () { extraData[key] = ta.value; syncToTextarea(); });
            wrap.appendChild(ta);
        } else {
            const input = document.createElement('input');
            input.type = typeof value === 'number' ? 'number' : 'text';
            input.className = inputCls;
            input.value = value;
            input.addEventListener('input', function () {
                extraData[key] = typeof value === 'number' ? Number(input.value) : input.value;
                syncToTextarea();
            });
            wrap.appendChild(input);
        }
        return wrap;
    }

    // ── Render: Array of Strings ──
    function renderStringArray(key, arr) {
        const wrap = document.createElement('div');
        wrap.className = 'space-y-2';

        function renderItems() {
            wrap.innerHTML = '';
            arr.forEach(function (item, idx) {
                const row = document.createElement('div');
                row.className = 'flex items-center gap-2';
                row.innerHTML =
                    '<span class="w-6 h-6 bg-gray-200 text-gray-500 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0">' + (idx + 1) + '</span>';
                const input = document.createElement('input');
                input.type = 'text';
                input.className = inputCls;
                input.value = item;
                input.addEventListener('input', function () { arr[idx] = input.value; extraData[key] = arr; syncToTextarea(); });
                row.appendChild(input);
                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = btnSmCls + ' text-red-600 hover:bg-red-50 flex-shrink-0';
                removeBtn.innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>';
                removeBtn.addEventListener('click', function () { arr.splice(idx, 1); extraData[key] = arr; syncToTextarea(); renderItems(); });
                row.appendChild(removeBtn);
                wrap.appendChild(row);
            });
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.className = btnSmCls + ' text-blue-600 hover:bg-blue-50 border border-blue-200 mt-1';
            addBtn.innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> Add Item';
            addBtn.addEventListener('click', function () { arr.push(''); extraData[key] = arr; syncToTextarea(); renderItems(); });
            wrap.appendChild(addBtn);
        }
        renderItems();
        return wrap;
    }

    // ── Render: Array of Objects ──
    function renderObjectArray(key, arr) {
        const wrap = document.createElement('div');
        wrap.className = 'space-y-3';

        function renderItems() {
            wrap.innerHTML = '';
            arr.forEach(function (obj, idx) {
                const itemCard = document.createElement('div');
                itemCard.className = 'bg-white border border-gray-200 rounded-xl p-4 relative';

                // Header with index and remove
                const itemHeader = document.createElement('div');
                itemHeader.className = 'flex items-center justify-between mb-3';
                itemHeader.innerHTML = '<span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Item ' + (idx + 1) + '</span>';
                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = btnSmCls + ' text-red-500 hover:bg-red-50';
                removeBtn.innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg> Remove';
                removeBtn.addEventListener('click', function () { arr.splice(idx, 1); extraData[key] = arr; syncToTextarea(); renderItems(); });
                itemHeader.appendChild(removeBtn);
                itemCard.appendChild(itemHeader);

                // Fields grid
                const fieldsGrid = document.createElement('div');
                fieldsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3';

                Object.keys(obj).forEach(function (fieldKey) {
                    const fieldWrap = document.createElement('div');
                    const isLongField = typeof obj[fieldKey] === 'string' && obj[fieldKey].length > 80;
                    if (fieldKey === 'description' || fieldKey === 'content' || isLongField) {
                        fieldWrap.className = 'sm:col-span-2';
                    }
                    fieldWrap.innerHTML = '<label class="block text-xs font-semibold text-gray-500 mb-1">' + toLabel(fieldKey) + '</label>';

                    if (Array.isArray(obj[fieldKey])) {
                        // Nested array of strings inside an object
                        const nestedArr = obj[fieldKey];
                        const nestedWrap = document.createElement('div');
                        nestedWrap.className = 'space-y-1.5';
                        nestedArr.forEach(function (nestedItem, nIdx) {
                            const nRow = document.createElement('div');
                            nRow.className = 'flex items-center gap-1.5';
                            const nInput = document.createElement('input');
                            nInput.type = 'text';
                            nInput.className = inputCls;
                            nInput.value = nestedItem;
                            nInput.addEventListener('input', function () { nestedArr[nIdx] = nInput.value; syncToTextarea(); });
                            nRow.appendChild(nInput);
                            const nRemove = document.createElement('button');
                            nRemove.type = 'button';
                            nRemove.className = 'text-red-400 hover:text-red-600 flex-shrink-0';
                            nRemove.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';
                            nRemove.addEventListener('click', function () { nestedArr.splice(nIdx, 1); syncToTextarea(); renderItems(); });
                            nRow.appendChild(nRemove);
                            nestedWrap.appendChild(nRow);
                        });
                        const nAddBtn = document.createElement('button');
                        nAddBtn.type = 'button';
                        nAddBtn.className = 'text-xs text-blue-600 hover:text-blue-800 font-medium';
                        nAddBtn.textContent = '+ Add';
                        nAddBtn.addEventListener('click', function () { nestedArr.push(''); syncToTextarea(); renderItems(); });
                        nestedWrap.appendChild(nAddBtn);
                        fieldWrap.appendChild(nestedWrap);
                    } else if (fieldKey === 'description' || fieldKey === 'content' || isLongField) {
                        const ta = document.createElement('textarea');
                        ta.rows = 2;
                        ta.className = inputCls + ' resize-y';
                        ta.value = obj[fieldKey] || '';
                        ta.addEventListener('input', function () { obj[fieldKey] = ta.value; syncToTextarea(); });
                        fieldWrap.appendChild(ta);
                    } else {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.className = inputCls;
                        input.value = obj[fieldKey] || '';
                        input.addEventListener('input', function () { obj[fieldKey] = input.value; syncToTextarea(); });
                        fieldWrap.appendChild(input);
                    }
                    fieldsGrid.appendChild(fieldWrap);
                });

                itemCard.appendChild(fieldsGrid);
                wrap.appendChild(itemCard);
            });

            // Add new item button
            if (arr.length > 0) {
                const template = {};
                Object.keys(arr[0]).forEach(function (k) {
                    template[k] = Array.isArray(arr[0][k]) ? [] : '';
                });
                const addBtn = document.createElement('button');
                addBtn.type = 'button';
                addBtn.className = btnSmCls + ' text-blue-600 hover:bg-blue-50 border border-blue-200';
                addBtn.innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> Add ' + toLabel(key).replace(/s$/, '');
                addBtn.addEventListener('click', function () {
                    arr.push(JSON.parse(JSON.stringify(template)));
                    extraData[key] = arr;
                    syncToTextarea();
                    renderItems();
                });
                wrap.appendChild(addBtn);
            }
        }
        renderItems();
        return wrap;
    }

    // ── Render: Nested Object ──
    function renderNestedObject(key, obj) {
        const wrap = document.createElement('div');
        wrap.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3';

        Object.keys(obj).forEach(function (subKey) {
            const fieldWrap = document.createElement('div');
            const val = obj[subKey];
            const isLong = typeof val === 'string' && val.length > 80;
            if (isLong || subKey.includes('description') || subKey.includes('content')) {
                fieldWrap.className = 'sm:col-span-2';
            }
            fieldWrap.innerHTML = '<label class="block text-xs font-semibold text-gray-500 mb-1">' + toLabel(subKey) + '</label>';

            if (typeof val === 'string' || typeof val === 'number') {
                if (isLong || subKey.includes('description') || subKey.includes('content')) {
                    const ta = document.createElement('textarea');
                    ta.rows = 3;
                    ta.className = inputCls + ' resize-y';
                    ta.value = val;
                    ta.addEventListener('input', function () { obj[subKey] = ta.value; extraData[key] = obj; syncToTextarea(); });
                    fieldWrap.appendChild(ta);
                } else {
                    const input = document.createElement('input');
                    input.type = typeof val === 'number' ? 'number' : 'text';
                    input.className = inputCls;
                    input.value = val;
                    input.addEventListener('input', function () {
                        obj[subKey] = typeof val === 'number' ? Number(input.value) : input.value;
                        extraData[key] = obj;
                        syncToTextarea();
                    });
                    fieldWrap.appendChild(input);
                }
            } else if (Array.isArray(val) && (val.length === 0 || typeof val[0] === 'string')) {
                // Array of strings inside nested object
                const listWrap = document.createElement('div');
                listWrap.className = 'space-y-1.5';
                function renderSubList() {
                    listWrap.innerHTML = '';
                    val.forEach(function (item, i) {
                        const row = document.createElement('div');
                        row.className = 'flex items-center gap-1.5';
                        const inp = document.createElement('input');
                        inp.type = 'text';
                        inp.className = inputCls;
                        inp.value = item;
                        inp.addEventListener('input', function () { val[i] = inp.value; syncToTextarea(); });
                        row.appendChild(inp);
                        const rm = document.createElement('button');
                        rm.type = 'button';
                        rm.className = 'text-red-400 hover:text-red-600 flex-shrink-0';
                        rm.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';
                        rm.addEventListener('click', function () { val.splice(i, 1); syncToTextarea(); renderSubList(); });
                        row.appendChild(rm);
                        listWrap.appendChild(row);
                    });
                    const addBtn = document.createElement('button');
                    addBtn.type = 'button';
                    addBtn.className = 'text-xs text-blue-600 hover:text-blue-800 font-medium';
                    addBtn.textContent = '+ Add';
                    addBtn.addEventListener('click', function () { val.push(''); syncToTextarea(); renderSubList(); });
                    listWrap.appendChild(addBtn);
                }
                renderSubList();
                fieldWrap.appendChild(listWrap);
                fieldWrap.className = 'sm:col-span-2';
            }

            wrap.appendChild(fieldWrap);
        });

        return wrap;
    }

    // Initial render
    renderEditor();
    syncToTextarea();
});
</script>
@endpush
