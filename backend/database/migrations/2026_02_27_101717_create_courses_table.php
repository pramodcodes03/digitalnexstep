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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->string('badge')->nullable();
            $table->string('instructor_name')->nullable();
            $table->string('instructor_role')->nullable();
            $table->string('thumbnail')->nullable();
            $table->decimal('mrp', 10, 2)->default(0);
            $table->decimal('price', 10, 2)->default(0);
            $table->string('duration')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('reviews_count')->default(0);
            $table->integer('enrolled_count')->default(0);
            $table->integer('lectures_count')->default(0);
            $table->integer('videos_count')->default(0);
            $table->integer('notes_count')->default(0);
            $table->boolean('has_certificate')->default(true);
            $table->json('tags')->nullable();
            $table->json('curriculum')->nullable();
            $table->json('extra_data')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
