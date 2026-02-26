<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'designation',
        'bio',
        'image',
        'email',
        'phone',
        'facebook',
        'twitter',
        'linkedin',
        'is_active',
        'sort_order',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Get the image attribute with full URL.
     */
    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value
                ? config('filesystems.images_endpoint') . '/' . $value
                : $value
        );
    }
}
