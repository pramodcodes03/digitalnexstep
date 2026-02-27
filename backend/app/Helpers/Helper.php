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
            // Get the original file extension
            $extension = $file->getClientOriginalExtension();

            // Generate a unique file name with original extension
            $fileName = uniqid('image_') . '.' . $extension;


            $domain = "nextstep_ditrp";

            // Define the relative path
            $relativePath = "$domain/$folder/$fileName";
            // Store the original image on S3
            Storage::disk('s3')->put($relativePath, file_get_contents($file), 'public');

            // Return only the relative path
            return $relativePath;
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error uploading file: ' . $e->getMessage(),
            ], 500);
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
