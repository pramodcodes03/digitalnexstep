<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    public function index()
    {
        $settings = SiteSetting::orderBy('group')->orderBy('key')->get();
        $grouped = $settings->groupBy('group');

        return view('admin.site-settings.index', compact('grouped'));
    }

    public function create()
    {
        return view('admin.site-settings.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'key' => 'required|string|max:255|unique:site_settings,key',
            'value' => 'nullable|string',
            'group' => 'required|string|max:255',
            'type' => 'required|string|in:text,textarea,image,boolean,number',
        ]);

        if ($data['type'] === 'image' && $request->hasFile('image_value')) {
            $request->validate([
                'image_value' => 'nullable|image|max:2048',
            ]);
            $data['value'] = Helper::storeOriginalImageOnE2E($request->file('image_value'), 'site-settings');
        }

        SiteSetting::create($data);

        return redirect()->route('admin.site-settings.index')->with('success', 'Setting created successfully.');
    }

    public function update(Request $request)
    {
        $request->validate([
            'settings' => 'required|array',
            'settings.*.value' => 'nullable|string',
        ]);

        $settingsInput = $request->input('settings', []);

        foreach ($settingsInput as $id => $settingData) {
            $setting = SiteSetting::find($id);
            if (!$setting) {
                continue;
            }

            if ($setting->type === 'image') {
                if ($request->hasFile("settings.{$id}.image_value")) {
                    // Delete old image if exists
                    if ($setting->value) {
                        Helper::deleteImageFromE2E($setting->value);
                    }
                    $setting->value = Helper::storeOriginalImageOnE2E(
                        $request->file("settings.{$id}.image_value"),
                        'site-settings'
                    );
                }
            } else {
                $setting->value = $settingData['value'] ?? null;
            }

            $setting->save();
        }

        return redirect()->route('admin.site-settings.index')->with('success', 'Settings updated successfully.');
    }

    public function destroy(SiteSetting $siteSetting)
    {
        if ($siteSetting->type === 'image' && $siteSetting->value) {
            Helper::deleteImageFromE2E($siteSetting->value);
        }

        $siteSetting->delete();

        return redirect()->route('admin.site-settings.index')->with('success', 'Setting deleted successfully.');
    }
}
