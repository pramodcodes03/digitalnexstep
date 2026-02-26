<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;

class ContactSubmissionController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactSubmission::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $items = $query->latest()->paginate(15)->withQueryString();

        return view('admin.contact-submissions.index', compact('items'));
    }

    public function show(ContactSubmission $contactSubmission)
    {
        return view('admin.contact-submissions.show', compact('contactSubmission'));
    }

    public function updateStatus(Request $request, ContactSubmission $contactSubmission)
    {
        $data = $request->validate([
            'status' => 'required|string|in:new,read,replied,closed',
        ]);

        $contactSubmission->update($data);

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function destroy(ContactSubmission $contactSubmission)
    {
        $contactSubmission->delete();

        return redirect()->route('admin.contact-submissions.index')->with('success', 'Deleted successfully.');
    }
}
