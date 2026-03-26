<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = JobApplication::with('jobUpdate');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('job_title', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $items = $query->latest()->paginate(15)->withQueryString();

        return view('admin.job-applications.index', compact('items'));
    }

    public function show(JobApplication $jobApplication)
    {
        $jobApplication->load('jobUpdate');

        return view('admin.job-applications.show', compact('jobApplication'));
    }

    public function updateStatus(Request $request, JobApplication $jobApplication)
    {
        $data = $request->validate([
            'status' => 'required|string|in:new,reviewed,shortlisted,rejected,hired',
        ]);

        $jobApplication->update($data);

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function destroy(JobApplication $jobApplication)
    {
        if ($jobApplication->resume_path) {
            $path = storage_path('app/public/' . $jobApplication->resume_path);
            if (file_exists($path)) {
                unlink($path);
            }
        }

        $jobApplication->delete();

        return redirect()->route('admin.job-applications.index')->with('success', 'Deleted successfully.');
    }
}
