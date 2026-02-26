<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class Helper
{
    /**
     * Store image on E2E Object Storage in original format.
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

            Storage::disk('s3')->put($relativePath, file_get_contents($file), 'public');

            return $relativePath;
        } catch (\Exception $e) {
            Log::error('Error uploading file: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Delete image from E2E Object Storage.
     */
    public static function deleteImageFromE2E($imagePath)
    {
        if (empty($imagePath) || !is_string($imagePath)) {
            return;
        }

        try {
            $storage = Storage::disk('s3');
            if ($storage->exists($imagePath)) {
                $storage->delete($imagePath);
            }
        } catch (\Exception $e) {
            Log::error('Error deleting image: ' . $e->getMessage());
        }
    }
}
