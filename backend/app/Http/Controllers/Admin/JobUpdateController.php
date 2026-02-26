<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Traits\AdminCrudTrait;
use App\Models\JobUpdate;
use Illuminate\Http\Request;

class JobUpdateController extends Controller
{
    use AdminCrudTrait;

    public function index()
    {
        $items = JobUpdate::latest()->paginate(15);

        return view('admin.job-updates.index', compact('items'));
    }

    public function create()
    {
        return view('admin.job-updates.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'salary_range' => 'nullable|string|max:255',
            'apply_link' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'expires_at' => 'nullable|date',
        ]);

        $data = $this->handleCheckbox($data);

        JobUpdate::create($data);

        return redirect()->route('admin.job-updates.index')->with('success', 'Created successfully.');
    }

    public function edit(JobUpdate $jobUpdate)
    {
        return view('admin.job-updates.edit', compact('jobUpdate'));
    }

    public function update(Request $request, JobUpdate $jobUpdate)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'salary_range' => 'nullable|string|max:255',
            'apply_link' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'expires_at' => 'nullable|date',
        ]);

        $data = $this->handleCheckbox($data);

        $jobUpdate->update($data);

        return redirect()->route('admin.job-updates.index')->with('success', 'Updated successfully.');
    }

    public function destroy(JobUpdate $jobUpdate)
    {
        $jobUpdate->delete();

        return redirect()->route('admin.job-updates.index')->with('success', 'Deleted successfully.');
    }
}
