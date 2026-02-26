<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use App\Models\Enquiry;
use App\Models\FranchiseRegistration;
use App\Models\Product;
use App\Models\Feature;
use App\Models\Testimonial;
use App\Models\GalleryItem;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_enquiries' => Enquiry::count(),
            'pending_enquiries' => Enquiry::where('status', 'pending')->count(),
            'total_franchises' => FranchiseRegistration::count(),
            'pending_franchises' => FranchiseRegistration::where('status', 'pending')->count(),
            'total_contacts' => ContactSubmission::count(),
            'new_contacts' => ContactSubmission::where('status', 'new')->count(),
            'total_products' => Product::count(),
            'total_features' => Feature::count(),
            'total_testimonials' => Testimonial::count(),
            'total_gallery' => GalleryItem::count(),
        ];

        $recentEnquiries = Enquiry::latest()->take(5)->get();
        $recentContacts = ContactSubmission::latest()->take(5)->get();
        $recentFranchises = FranchiseRegistration::latest()->take(5)->get();

        return view('admin.dashboard.index', compact('stats', 'recentEnquiries', 'recentContacts', 'recentFranchises'));
    }
}
