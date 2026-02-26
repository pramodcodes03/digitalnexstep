<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FranchiseRegistration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'institution_name',
        'center_owner_name',
        'designation',
        'dob',
        'email',
        'mobile',
        'full_address',
        'taluka_name',
        'postal_code',
        'state',
        'city',
        'country',
        'total_computers',
        'total_staff',
        'map_location',
        'latitude',
        'longitude',
        'agree_terms',
        'agree_contact',
        'amc_referral_code',
        'status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'dob' => 'date',
            'agree_terms' => 'boolean',
            'agree_contact' => 'boolean',
        ];
    }
}
