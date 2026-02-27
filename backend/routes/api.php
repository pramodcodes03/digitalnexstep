<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PublicController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
        'app' => config('app.name'),
    ]);
});

// Public API endpoints for Next.js frontend
Route::get('/home', [PublicController::class, 'homePage']);
Route::get('/hero-slides', [PublicController::class, 'heroSlides']);
Route::get('/features', [PublicController::class, 'features']);
Route::get('/about-sections', [PublicController::class, 'aboutSections']);
Route::get('/team-members', [PublicController::class, 'teamMembers']);
Route::get('/testimonials', [PublicController::class, 'testimonials']);
Route::get('/partners', [PublicController::class, 'partners']);
Route::get('/faqs', [PublicController::class, 'faqs']);
Route::get('/gallery-items', [PublicController::class, 'galleryItems']);
Route::get('/products', [PublicController::class, 'products']);
Route::get('/job-updates', [PublicController::class, 'jobUpdates']);
Route::get('/centers', [PublicController::class, 'centers']);
Route::get('/pricing', [PublicController::class, 'pricingPlans']);
Route::get('/achievements', [PublicController::class, 'achievements']);
Route::get('/page-sections', [PublicController::class, 'pageSections']);
Route::get('/site-settings', [PublicController::class, 'siteSettings']);

Route::post('/contact', [PublicController::class, 'submitContact']);
Route::post('/enquiries', [PublicController::class, 'submitEnquiry']);
Route::post('/franchise-registrations', [PublicController::class, 'submitFranchise']);
