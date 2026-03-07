<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AwardImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value
                ? config('filesystems.images_endpoint') . '/' . $value
                : $value
        );
    }
}
