<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TenantCourseController extends Controller
{
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('services.tenant_api.base_url'), '/');
    }

    public function index(Request $request): JsonResponse
    {
        $params = [];
        if ($request->has('category_id')) {
            $params['category_id'] = $request->category_id;
        }

        $response = Http::get("{$this->baseUrl}/api/website/courses", $params);

        if ($response->failed()) {
            return response()->json(['success' => false, 'message' => 'Failed to fetch courses.'], 502);
        }

        return response()->json($response->json());
    }

    public function show(string $id): JsonResponse
    {
        $response = Http::get("{$this->baseUrl}/api/website/courses/{$id}");

        if ($response->notFound()) {
            return response()->json(['success' => false, 'message' => 'Course not found.'], 404);
        }

        if ($response->failed()) {
            return response()->json(['success' => false, 'message' => 'Failed to fetch course details.'], 502);
        }

        return response()->json($response->json());
    }

    public function enquiryDropdowns(Request $request): JsonResponse
    {
        $response = Http::post("{$this->baseUrl}/api/website/enquiry/dropdowns", [
            'course_id' => $request->course_id,
        ]);

        if ($response->failed()) {
            return response()->json(['success' => false, 'message' => 'Failed to fetch institutes.'], 502);
        }

        return response()->json($response->json());
    }

    public function enquiryStore(Request $request): JsonResponse
    {
        $response = Http::post("{$this->baseUrl}/api/enquiry/store", $request->all());

        return response()->json($response->json(), $response->status());
    }
}
