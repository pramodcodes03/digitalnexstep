<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class Helper
{
    /**
     * Returns 's3' if E2E credentials are configured, 'public' otherwise (local dev fallback).
     */
    protected static function disk(): string
    {
        return env('E2E_OBJECT_STORAGE_ACCESS_KEY') ? 's3' : 'public';
    }

    /**
     * Store image on E2E Object Storage in original format.
     * Falls back to local public disk when E2E credentials are not set.
     */
    public static function storeOriginalImageOnE2E($file, $folder = 'uploads')
    {
        if (!$file->isValid()) {
            return null;
        }

        try {
            $extension = $file->getClientOriginalExtension();
            $fileName = uniqid('image_') . '.' . $extension;
            $relativePath = "$folder/$fileName";

            Storage::disk(static::disk())->put($relativePath, file_get_contents($file), 'public');

            return $relativePath;
        } catch (\Exception $e) {
            Log::error('Error uploading file: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Delete image from E2E Object Storage (or local disk in dev).
     */
    public static function deleteImageFromE2E($imagePath)
    {
        if (empty($imagePath) || !is_string($imagePath)) {
            return;
        }

        try {
            $storage = Storage::disk(static::disk());
            if ($storage->exists($imagePath)) {
                $storage->delete($imagePath);
            }
        } catch (\Exception $e) {
            Log::error('Error deleting image: ' . $e->getMessage());
        }
    }
}
