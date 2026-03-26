@extends('admin.layouts.app')
@section('title', 'Add Feature Module')
@section('breadcrumb', 'Add Feature Module')
@section('content')
    <div class="max-w-5xl mx-auto">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100">
                <h2 class="text-2xl font-extrabold text-gray-900">Add Feature Module</h2>
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

                <form action="{{ route('admin.feature-modules.store') }}" method="POST" id="featureModuleForm">
                    @csrf

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {{-- Title --}}
                        <div>
                            <label for="title" class="block text-sm font-semibold text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
                            <input type="text" name="title" id="title" value="{{ old('title') }}" required
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Icon --}}
                        <div>
                            <label for="icon" class="block text-sm font-semibold text-gray-700 mb-1">Icon</label>
                            <input type="text" name="icon" id="icon" value="{{ old('icon') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-500">e.g. FiHome, FiBook, FiUsers</p>
                        </div>

                        {{-- Gradient --}}
                        <div>
                            <label for="gradient" class="block text-sm font-semibold text-gray-700 mb-1">Gradient</label>
                            <input type="text" name="gradient" id="gradient" value="{{ old('gradient') }}"
                                   class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-xs text-gray-500">e.g. from-blue-500 to-cyan-500</p>
                        </div>

                        {{-- Sort Order --}}
                        <div>
                            <label for="sort_order" class="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                            <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', 0) }}" min="0"
                                   class="w-full max-w-[200px] rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        {{-- Description --}}
                        <div class="md:col-span-2">
                            <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                            <textarea name="description" id="description" rows="3"
                                      class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500">{{ old('description') }}</textarea>
                        </div>

                        {{-- Is Active --}}
                        <div class="flex items-end">
                            <div class="flex items-center gap-3">
                                <label for="is_active" class="relative inline-flex items-center cursor-pointer">
                                    <input type="hidden" name="is_active" value="0">
                                    <input type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                                           class="sr-only peer">
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                                <span class="text-sm font-semibold text-gray-700">Active</span>
                            </div>
                        </div>
                    </div>

                    {{-- Sub-Features Visual Editor --}}
                    <div class="mt-8 pt-6 border-t border-gray-100">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-bold text-gray-900">Sub-Features</h3>
                            <div class="flex items-center gap-2">
                                <button type="button" id="toggleJsonView" class="text-xs font-medium text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                                    <span id="toggleJsonLabel">Show JSON</span>
                                </button>
                            </div>
                        </div>

                        {{-- Hidden textarea for form submission --}}
                        <textarea name="sub_features" id="sub_features" rows="10"
                                  class="hidden w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-mono focus:border-blue-500 focus:ring-blue-500">{{ old('sub_features', '[]') }}</textarea>

                        {{-- Visual Editor Container --}}
                        <div id="subFeaturesEditor" class="space-y-4"></div>

                        {{-- Add Sub-Feature Button --}}
                        <div class="mt-4" id="addSubFeatureWrap">
                            <button type="button" id="addSubFeatureBtn"
                                    class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                                Add Sub-Feature
                            </button>
                        </div>
                    </div>

                    {{-- Actions --}}
                    <div class="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                        <button type="submit"
                                class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                            Create Module
                        </button>
                        <a href="{{ route('admin.feature-modules.index') }}"
                           class="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition">
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('sub_features');
    const editor = document.getElementById('subFeaturesEditor');
    const addBtn = document.getElementById('addSubFeatureBtn');
    const addWrap = document.getElementById('addSubFeatureWrap');
    const toggleBtn = document.getElementById('toggleJsonView');
    const toggleLabel = document.getElementById('toggleJsonLabel');

    let jsonMode = false;
    let subFeatures = [];
    let collapsedState = {};

    const inputCls = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition';
    const btnSmCls = 'inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition';
    const selectCls = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition bg-white';

    const plusIcon = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>';
    const trashIcon = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>';
    const chevronDown = '<svg class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>';
    const chevronRight = '<svg class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>';

    try {
        subFeatures = JSON.parse(textarea.value || '[]') || [];
        if (!Array.isArray(subFeatures)) subFeatures = [];
    } catch { subFeatures = []; }

    function syncToTextarea() {
        textarea.value = JSON.stringify(subFeatures, null, 2);
    }

    toggleBtn.addEventListener('click', function () {
        jsonMode = !jsonMode;
        if (jsonMode) {
            syncToTextarea();
            textarea.classList.remove('hidden');
            editor.classList.add('hidden');
            addWrap.classList.add('hidden');
            toggleLabel.textContent = 'Visual Editor';
        } else {
            try {
                const parsed = JSON.parse(textarea.value || '[]');
                if (Array.isArray(parsed)) subFeatures = parsed;
            } catch {}
            textarea.classList.add('hidden');
            editor.classList.remove('hidden');
            addWrap.classList.remove('hidden');
            toggleLabel.textContent = 'Show JSON';
            renderEditor();
        }
    });

    function isCollapsed(key) { return collapsedState[key] === true; }
    function toggleCollapse(key) { collapsedState[key] = !collapsedState[key]; }

    function createField(label, value, onChange, type) {
        const wrap = document.createElement('div');
        const labelEl = document.createElement('label');
        labelEl.className = 'block text-xs font-semibold text-gray-500 mb-1';
        labelEl.textContent = label;
        wrap.appendChild(labelEl);

        if (type === 'textarea') {
            const ta = document.createElement('textarea');
            ta.rows = 2;
            ta.className = inputCls + ' resize-y';
            ta.value = value || '';
            ta.addEventListener('input', function () { onChange(ta.value); syncToTextarea(); });
            wrap.appendChild(ta);
        } else if (type === 'select') {
            const sel = document.createElement('select');
            sel.className = selectCls;
            value.options.forEach(function (opt) {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                if (opt === value.current) option.selected = true;
                sel.appendChild(option);
            });
            sel.addEventListener('change', function () { value.callback(sel.value); syncToTextarea(); });
            wrap.appendChild(sel);
        } else {
            const input = document.createElement('input');
            input.type = type || 'text';
            input.className = inputCls;
            input.value = value || '';
            input.addEventListener('input', function () { onChange(input.value); syncToTextarea(); });
            wrap.appendChild(input);
        }
        return wrap;
    }

    function createCollapsibleHeader(title, collapseKey, color, onRemove) {
        const header = document.createElement('div');
        header.className = 'flex items-center justify-between cursor-pointer select-none py-2 px-3 -mx-3 -mt-1 rounded-lg hover:bg-' + color + '-50/50 transition';
        const leftSide = document.createElement('div');
        leftSide.className = 'flex items-center gap-2';
        const chevron = document.createElement('span');
        chevron.className = 'text-gray-400';
        chevron.innerHTML = isCollapsed(collapseKey) ? chevronRight : chevronDown;
        const titleEl = document.createElement('span');
        titleEl.className = 'text-sm font-bold text-gray-800';
        titleEl.textContent = title;
        leftSide.appendChild(chevron);
        leftSide.appendChild(titleEl);
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = btnSmCls + ' text-red-500 hover:bg-red-50';
        removeBtn.innerHTML = trashIcon + ' Remove';
        removeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (confirm('Remove ' + title + '?')) { onRemove(); syncToTextarea(); renderEditor(); }
        });
        header.appendChild(leftSide);
        header.appendChild(removeBtn);
        header.addEventListener('click', function (e) {
            if (e.target.closest('button')) return;
            toggleCollapse(collapseKey);
            renderEditor();
        });
        return header;
    }

    function renderVideo(video, sfIdx, ptIdx, vidIdx) {
        const collapseKey = 'vid-' + sfIdx + '-' + ptIdx + '-' + vidIdx;
        const card = document.createElement('div');
        card.className = 'bg-white border-l-4 border-purple-300 border border-gray-200 rounded-xl p-3';
        card.appendChild(createCollapsibleHeader('Video ' + (vidIdx + 1) + (video.title ? ': ' + video.title : ''), collapseKey, 'purple', function () { subFeatures[sfIdx].points[ptIdx].videos.splice(vidIdx, 1); }));
        if (!isCollapsed(collapseKey)) {
            const body = document.createElement('div');
            body.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3';
            body.appendChild(createField('Title', video.title, function (v) { video.title = v; }, 'text'));
            body.appendChild(createField('URL', video.url, function (v) { video.url = v; }, 'text'));
            body.appendChild(createField('Duration', video.duration, function (v) { video.duration = v; }, 'text'));
            body.appendChild(createField('Device Type', { current: video.deviceType || 'laptop', options: ['laptop', 'tablet', 'mobile'], callback: function (v) { video.deviceType = v; } }, null, 'select'));
            body.appendChild(createField('Aspect Ratio', { current: video.aspectRatio || '16:9', options: ['16:9', '4:3', '9:16', '1:1'], callback: function (v) { video.aspectRatio = v; } }, null, 'select'));
            card.appendChild(body);
        }
        return card;
    }

    function renderPoint(point, sfIdx, ptIdx) {
        const collapseKey = 'pt-' + sfIdx + '-' + ptIdx;
        const card = document.createElement('div');
        card.className = 'bg-gray-50 border-l-4 border-green-300 border border-gray-200 rounded-xl p-4';
        card.appendChild(createCollapsibleHeader('Point ' + (ptIdx + 1) + (point.title ? ': ' + point.title : ''), collapseKey, 'green', function () { subFeatures[sfIdx].points.splice(ptIdx, 1); }));
        if (!isCollapsed(collapseKey)) {
            const body = document.createElement('div');
            body.className = 'space-y-3 mt-3';
            const fieldsGrid = document.createElement('div');
            fieldsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3';
            fieldsGrid.appendChild(createField('Title', point.title, function (v) { point.title = v; }, 'text'));
            fieldsGrid.appendChild(createField('Carousel Layout', { current: point.carouselLayout || 'cards', options: ['cards', 'filmstrip', 'grid', 'spotlight'], callback: function (v) { point.carouselLayout = v; } }, null, 'select'));
            const descField = createField('Description', point.description, function (v) { point.description = v; }, 'textarea');
            descField.className = 'sm:col-span-2';
            fieldsGrid.appendChild(descField);
            body.appendChild(fieldsGrid);
            if (!point.videos) point.videos = [];
            const videosSection = document.createElement('div');
            videosSection.className = 'mt-4';
            const videosHeader = document.createElement('div');
            videosHeader.className = 'flex items-center justify-between mb-3';
            videosHeader.innerHTML = '<h5 class="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5"><span class="w-5 h-5 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-[10px] font-bold">' + point.videos.length + '</span>Videos</h5>';
            const addVideoBtn = document.createElement('button');
            addVideoBtn.type = 'button';
            addVideoBtn.className = btnSmCls + ' text-purple-600 hover:bg-purple-50 border border-purple-200';
            addVideoBtn.innerHTML = plusIcon + ' Add Video';
            addVideoBtn.addEventListener('click', function () { point.videos.push({ title: '', url: '', duration: '', deviceType: 'laptop', aspectRatio: '16:9' }); syncToTextarea(); renderEditor(); });
            videosHeader.appendChild(addVideoBtn);
            videosSection.appendChild(videosHeader);
            const videosContainer = document.createElement('div');
            videosContainer.className = 'space-y-3';
            point.videos.forEach(function (video, vidIdx) { videosContainer.appendChild(renderVideo(video, sfIdx, ptIdx, vidIdx)); });
            videosSection.appendChild(videosContainer);
            body.appendChild(videosSection);
            card.appendChild(body);
        }
        return card;
    }

    function renderSubFeature(sf, sfIdx) {
        const collapseKey = 'sf-' + sfIdx;
        const card = document.createElement('div');
        card.className = 'bg-white border-l-4 border-blue-400 border border-gray-200 rounded-xl p-5 shadow-sm';
        card.appendChild(createCollapsibleHeader('Sub-Feature ' + (sfIdx + 1) + (sf.title ? ': ' + sf.title : ''), collapseKey, 'blue', function () { subFeatures.splice(sfIdx, 1); }));
        if (!isCollapsed(collapseKey)) {
            const body = document.createElement('div');
            body.className = 'space-y-4 mt-4';
            const fieldsGrid = document.createElement('div');
            fieldsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3';
            fieldsGrid.appendChild(createField('Title', sf.title, function (v) { sf.title = v; }, 'text'));
            fieldsGrid.appendChild(createField('Icon', sf.icon, function (v) { sf.icon = v; }, 'text'));
            fieldsGrid.appendChild(createField('Color', sf.color, function (v) { sf.color = v; }, 'text'));
            fieldsGrid.appendChild(createField('Background Color', sf.bgColor, function (v) { sf.bgColor = v; }, 'text'));
            const descField = createField('Description', sf.description, function (v) { sf.description = v; }, 'textarea');
            descField.className = 'sm:col-span-2 lg:col-span-3';
            fieldsGrid.appendChild(descField);
            body.appendChild(fieldsGrid);
            if (!sf.points) sf.points = [];
            const pointsSection = document.createElement('div');
            pointsSection.className = 'mt-4 pt-4 border-t border-gray-100';
            const pointsHeader = document.createElement('div');
            pointsHeader.className = 'flex items-center justify-between mb-3';
            pointsHeader.innerHTML = '<h4 class="text-xs font-bold text-green-700 uppercase tracking-wider flex items-center gap-1.5"><span class="w-5 h-5 bg-green-100 text-green-600 rounded flex items-center justify-center text-[10px] font-bold">' + sf.points.length + '</span>Points</h4>';
            const addPointBtn = document.createElement('button');
            addPointBtn.type = 'button';
            addPointBtn.className = btnSmCls + ' text-green-600 hover:bg-green-50 border border-green-200';
            addPointBtn.innerHTML = plusIcon + ' Add Point';
            addPointBtn.addEventListener('click', function () { sf.points.push({ title: '', description: '', carouselLayout: 'cards', videos: [] }); syncToTextarea(); renderEditor(); });
            pointsHeader.appendChild(addPointBtn);
            pointsSection.appendChild(pointsHeader);
            const pointsContainer = document.createElement('div');
            pointsContainer.className = 'space-y-3';
            sf.points.forEach(function (point, ptIdx) { pointsContainer.appendChild(renderPoint(point, sfIdx, ptIdx)); });
            pointsSection.appendChild(pointsContainer);
            body.appendChild(pointsSection);
            card.appendChild(body);
        }
        return card;
    }

    function renderEditor() {
        editor.innerHTML = '';
        if (subFeatures.length === 0) {
            editor.innerHTML = '<div class="text-center py-8 text-gray-400"><p class="text-sm">No sub-features yet. Click "Add Sub-Feature" to get started.</p></div>';
            return;
        }
        subFeatures.forEach(function (sf, sfIdx) { editor.appendChild(renderSubFeature(sf, sfIdx)); });
    }

    addBtn.addEventListener('click', function () {
        subFeatures.push({ title: '', description: '', icon: '', color: '', bgColor: '', points: [] });
        syncToTextarea();
        renderEditor();
    });

    renderEditor();
    syncToTextarea();
});
</script>
@endpush
