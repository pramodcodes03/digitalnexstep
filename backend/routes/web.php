<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\FeatureController;
use App\Http\Controllers\Admin\AboutSectionController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\GalleryItemController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\EnquiryController;
use App\Http\Controllers\Admin\FranchiseRegistrationController;
use App\Http\Controllers\Admin\ContactSubmissionController;
use App\Http\Controllers\Admin\JobUpdateController;
use App\Http\Controllers\Admin\CenterController;
use App\Http\Controllers\Admin\PricingPlanController;
use App\Http\Controllers\Admin\AchievementController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\PageSectionController;

Route::get('/', function () {
    return view('welcome');
});

// Admin Authentication
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// Admin Panel (protected)
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // CRUD Resources
    Route::resource('hero-slides', HeroSlideController::class)->except(['show']);
    Route::resource('features', FeatureController::class)->except(['show']);
    Route::resource('about-sections', AboutSectionController::class)->except(['show']);
    Route::resource('team-members', TeamMemberController::class)->except(['show']);
    Route::resource('testimonials', TestimonialController::class)->except(['show']);
    Route::resource('partners', PartnerController::class)->except(['show']);
    Route::resource('faqs', FaqController::class)->except(['show']);
    Route::resource('gallery-items', GalleryItemController::class)->except(['show']);
    Route::resource('products', ProductController::class)->except(['show']);
    Route::resource('job-updates', JobUpdateController::class)->except(['show']);
    Route::resource('centers', CenterController::class)->except(['show']);
    Route::resource('pricing-plans', PricingPlanController::class)->except(['show']);
    Route::resource('achievements', AchievementController::class)->except(['show']);
    Route::resource('page-sections', PageSectionController::class)->except(['show']);

    // Read-only submissions
    Route::get('enquiries', [EnquiryController::class, 'index'])->name('enquiries.index');
    Route::get('enquiries/{enquiry}', [EnquiryController::class, 'show'])->name('enquiries.show');
    Route::patch('enquiries/{enquiry}/status', [EnquiryController::class, 'updateStatus'])->name('enquiries.update-status');

    Route::get('franchise-registrations', [FranchiseRegistrationController::class, 'index'])->name('franchise-registrations.index');
    Route::get('franchise-registrations/{franchiseRegistration}', [FranchiseRegistrationController::class, 'show'])->name('franchise-registrations.show');
    Route::patch('franchise-registrations/{franchiseRegistration}/status', [FranchiseRegistrationController::class, 'updateStatus'])->name('franchise-registrations.update-status');

    Route::get('contact-submissions', [ContactSubmissionController::class, 'index'])->name('contact-submissions.index');
    Route::get('contact-submissions/{contactSubmission}', [ContactSubmissionController::class, 'show'])->name('contact-submissions.show');
    Route::patch('contact-submissions/{contactSubmission}/status', [ContactSubmissionController::class, 'updateStatus'])->name('contact-submissions.update-status');
    Route::delete('contact-submissions/{contactSubmission}', [ContactSubmissionController::class, 'destroy'])->name('contact-submissions.destroy');

    // Site Settings (special)
    Route::get('site-settings', [SiteSettingController::class, 'index'])->name('site-settings.index');
    Route::get('site-settings/create', [SiteSettingController::class, 'create'])->name('site-settings.create');
    Route::post('site-settings', [SiteSettingController::class, 'store'])->name('site-settings.store');
    Route::put('site-settings', [SiteSettingController::class, 'update'])->name('site-settings.update');
    Route::delete('site-settings/{siteSetting}', [SiteSettingController::class, 'destroy'])->name('site-settings.destroy');
});
