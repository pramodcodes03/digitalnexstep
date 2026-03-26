<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_update_id',
        'job_title',
        'name',
        'email',
        'phone',
        'qualification',
        'experience',
        'resume_path',
        'cover_letter',
        'status',
    ];

    public function jobUpdate()
    {
        return $this->belongsTo(JobUpdate::class);
    }
}
