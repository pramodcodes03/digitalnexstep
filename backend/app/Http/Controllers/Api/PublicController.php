<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use App\Models\Achievement;
use App\Models\Center;
use App\Models\ContactSubmission;
use App\Models\Enquiry;
use App\Models\Faq;
use App\Models\Feature;
use App\Models\FranchiseRegistration;
use App\Models\GalleryItem;
use App\Models\HeroSlide;
use App\Models\JobUpdate;
use App\Models\PageSection;
use App\Models\Partner;
use App\Models\PricingPlan;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function heroSlides(): JsonResponse
    {
        return response()->json(
            HeroSlide::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function features(): JsonResponse
    {
        return response()->json(
            Feature::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function aboutSections(): JsonResponse
    {
        return response()->json(
            AboutSection::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function teamMembers(): JsonResponse
    {
        return response()->json(
            TeamMember::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function testimonials(): JsonResponse
    {
        return response()->json(
            Testimonial::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function partners(): JsonResponse
    {
        return response()->json(
            Partner::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function faqs(Request $request): JsonResponse
    {
        $query = Faq::where('is_active', true)->orderBy('sort_order');

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        return response()->json($query->get());
    }

    public function galleryItems(Request $request): JsonResponse
    {
        $query = GalleryItem::where('is_active', true)->orderBy('sort_order');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        return response()->json($query->get());
    }

    public function products(): JsonResponse
    {
        return response()->json(
            Product::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function jobUpdates(): JsonResponse
    {
        return response()->json(
            JobUpdate::where('is_active', true)
                ->where(function ($q) {
                    $q->whereNull('expires_at')->orWhere('expires_at', '>=', now());
                })
                ->orderByDesc('created_at')
                ->get()
        );
    }

    public function centers(): JsonResponse
    {
        return response()->json(
            Center::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function pricingPlans(): JsonResponse
    {
        return response()->json(
            PricingPlan::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function achievements(): JsonResponse
    {
        return response()->json(
            Achievement::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function pageSections(Request $request): JsonResponse
    {
        $query = PageSection::where('is_active', true)->orderBy('sort_order');

        if ($request->has('page')) {
            $query->where('page', $request->page);
        }

        return response()->json($query->get());
    }

    public function siteSettings(): JsonResponse
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    public function submitContact(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        ContactSubmission::create($validated);

        return response()->json(['message' => 'Contact form submitted successfully.'], 201);
    }

    public function submitEnquiry(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'center_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|string|max:20',
            'state' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:10',
            'remark' => 'nullable|string|max:2000',
        ]);

        Enquiry::create($validated);

        return response()->json(['message' => 'Enquiry submitted successfully.'], 201);
    }

    public function submitFranchise(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'institution_name' => 'required|string|max:255',
            'center_owner_name' => 'required|string|max:255',
            'designation' => 'nullable|string|max:100',
            'dob' => 'nullable|date',
            'email' => 'required|email|max:255',
            'mobile' => 'required|string|max:20',
            'full_address' => 'required|string|max:1000',
            'taluka_name' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:10',
            'state' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'total_computers' => 'nullable|integer|min:0',
            'total_staff' => 'nullable|integer|min:0',
            'map_location' => 'nullable|string|max:500',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'agree_terms' => 'required|accepted',
            'agree_contact' => 'nullable|boolean',
            'amc_referral_code' => 'nullable|string|max:50',
        ]);

        FranchiseRegistration::create($validated);

        return response()->json(['message' => 'Franchise registration submitted successfully.'], 201);
    }

    /**
     * Combined home page data in a single request.
     */
    public function homePage(): JsonResponse
    {
        return response()->json([
            'hero_slides' => HeroSlide::where('is_active', true)->orderBy('sort_order')->get(),
            'features' => Feature::where('is_active', true)->orderBy('sort_order')->get(),
            'about_sections' => AboutSection::where('is_active', true)->orderBy('sort_order')->get(),
            'achievements' => Achievement::where('is_active', true)->orderBy('sort_order')->get(),
            'team_members' => TeamMember::where('is_active', true)->orderBy('sort_order')->get(),
            'testimonials' => Testimonial::where('is_active', true)->orderBy('sort_order')->get(),
            'partners' => Partner::where('is_active', true)->orderBy('sort_order')->get(),
            'faqs' => Faq::where('is_active', true)->orderBy('sort_order')->get(),
            'job_updates' => JobUpdate::where('is_active', true)
                ->where(function ($q) {
                    $q->whereNull('expires_at')->orWhere('expires_at', '>=', now());
                })
                ->orderByDesc('created_at')
                ->get(),
            'pricing_plans' => PricingPlan::where('is_active', true)->orderBy('sort_order')->get(),
            'centers' => Center::where('is_active', true)->orderBy('sort_order')->get(),
            'site_settings' => SiteSetting::all()->pluck('value', 'key'),
        ]);
    }
}
