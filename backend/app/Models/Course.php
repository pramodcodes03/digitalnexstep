<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'category', 'badge',
        'instructor_name', 'instructor_role', 'thumbnail',
        'mrp', 'price', 'duration', 'rating', 'reviews_count',
        'enrolled_count', 'lectures_count', 'videos_count', 'notes_count',
        'has_certificate', 'tags', 'curriculum', 'extra_data',
        'is_active', 'sort_order',
    ];

    protected $casts = [
        'mrp' => 'decimal:2',
        'price' => 'decimal:2',
        'rating' => 'decimal:2',
        'has_certificate' => 'boolean',
        'is_active' => 'boolean',
        'tags' => 'array',
        'curriculum' => 'array',
        'extra_data' => 'array',
    ];
}
