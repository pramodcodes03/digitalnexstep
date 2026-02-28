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
        Schema::create('ditrp_student', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('franchise_id')->comment('Institute ID');
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('middle_name', 100)->nullable();
            $table->string('mother_name', 100)->nullable();
            $table->string('abbreviation', 20)->nullable()->comment('Name abbreviation/title e.g. Mr, Mrs, Dr');
            $table->date('dob')->nullable()->comment('Date of birth');
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('mobile', 15)->nullable()->comment('Student mobile number');
            $table->string('email', 150)->nullable()->comment('Stored as username@gmail.com');
            $table->string('profile_image', 255)->nullable();
            $table->string('signature', 255)->nullable();
            $table->unsignedBigInteger('state_id')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('pincode', 10)->nullable();
            $table->string('qualification', 150)->nullable();
            $table->string('cast', 100)->nullable();
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed'])->nullable();
            $table->text('address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ditrp_student');
    }
};
