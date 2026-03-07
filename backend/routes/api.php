<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\StudentVerificationController;
use App\Http\Controllers\Api\TenantCourseController;

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
Route::get('/courses', [PublicController::class, 'courses']);
Route::get('/courses/{id}', [PublicController::class, 'course']);
Route::get('/page-sections', [PublicController::class, 'pageSections']);
Route::get('/site-settings', [PublicController::class, 'siteSettings']);
Route::get('/award-images', [PublicController::class, 'awardImages']);

Route::post('/contact', [PublicController::class, 'submitContact']);
Route::post('/enquiries', [PublicController::class, 'submitEnquiry']);
Route::post('/franchise-registrations', [PublicController::class, 'submitFranchise']);

// Dynamic student verification — proxies to the tenant API (domain configured via TENANT_API_BASE_URL)
Route::get('/student-verification/{id}', [StudentVerificationController::class, 'verify']);

// Tenant courses — proxies to hdi.ditrpindia.org (TENANT_API_BASE_URL)
Route::get('/tenant-courses', [TenantCourseController::class, 'index']);
Route::get('/tenant-courses/{id}', [TenantCourseController::class, 'show']);
Route::post('/tenant-enquiry/dropdowns', [TenantCourseController::class, 'enquiryDropdowns']);
Route::post('/tenant-enquiry/store', [TenantCourseController::class, 'enquiryStore']);
