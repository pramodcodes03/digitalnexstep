<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FranchiseRegistration;
use Illuminate\Http\Request;

class FranchiseRegistrationController extends Controller
{
    public function index(Request $request)
    {
        $query = FranchiseRegistration::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('institution_name', 'like', "%{$search}%")
                  ->orWhere('center_owner_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('mobile', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('state', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $items = $query->latest()->paginate(15)->withQueryString();

        return view('admin.franchise-registrations.index', compact('items'));
    }

    public function show(FranchiseRegistration $franchiseRegistration)
    {
        return view('admin.franchise-registrations.show', compact('franchiseRegistration'));
    }

    public function updateStatus(Request $request, FranchiseRegistration $franchiseRegistration)
    {
        $data = $request->validate([
            'status' => 'required|string|in:pending,reviewed,approved,rejected',
        ]);

        $franchiseRegistration->update($data);

        return redirect()->back()->with('success', 'Status updated successfully.');
    }
}
