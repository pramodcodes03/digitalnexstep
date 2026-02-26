<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('franchise_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('institution_name');
            $table->string('center_owner_name');
            $table->string('designation')->nullable();
            $table->date('dob')->nullable();
            $table->string('email');
            $table->string('mobile');
            $table->text('full_address');
            $table->string('taluka_name')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->default('India');
            $table->integer('total_computers')->nullable();
            $table->integer('total_staff')->nullable();
            $table->string('map_location')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->boolean('agree_terms')->default(false);
            $table->boolean('agree_contact')->default(false);
            $table->string('amc_referral_code')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('franchise_registrations');
    }
};
