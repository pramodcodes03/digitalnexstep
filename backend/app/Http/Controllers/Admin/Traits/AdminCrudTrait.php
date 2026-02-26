<?php

namespace App\Http\Controllers\Admin\Traits;

use App\Helpers\Helper;
use Illuminate\Http\Request;

trait AdminCrudTrait
{
    /**
     * Handle image upload for store operations.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $data
     * @param  string  $folder
     * @param  string  $field
     * @return array
     */
    protected function handleImageUpload(Request $request, array $data, string $folder, string $field = 'image'): array
    {
        if ($request->hasFile($field)) {
            $data[$field] = Helper::storeOriginalImageOnE2E($request->file($field), $folder);
        }

        return $data;
    }

    /**
     * Handle image upload for update operations (deletes old image first).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  array  $data
     * @param  string  $folder
     * @param  string  $field
     * @return array
     */
    protected function handleImageUpdate(Request $request, $model, array $data, string $folder, string $field = 'image'): array
    {
        if ($request->hasFile($field)) {
            if ($model->getRawOriginal($field)) {
                Helper::deleteImageFromE2E($model->getRawOriginal($field));
            }
            $data[$field] = Helper::storeOriginalImageOnE2E($request->file($field), $folder);
        }

        return $data;
    }

    /**
     * Handle image deletion when destroying a model.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $field
     * @return void
     */
    protected function handleImageDelete($model, string $field = 'image'): void
    {
        if ($model->getRawOriginal($field)) {
            Helper::deleteImageFromE2E($model->getRawOriginal($field));
        }
    }

    /**
     * Handle the is_active checkbox (unchecked checkboxes don't send a value).
     *
     * @param  array  $data
     * @param  string  $field
     * @return array
     */
    protected function handleCheckbox(array $data, string $field = 'is_active'): array
    {
        $data[$field] = isset($data[$field]) ? true : false;

        return $data;
    }
}
