<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class StudentVerificationController extends Controller
{
    public function verify(string $id): JsonResponse
    {
        $baseUrl = rtrim(config('services.tenant_api.base_url'), '/');

        $response = Http::get("{$baseUrl}/api/student-verification/{$id}");

        if ($response->notFound()) {
            return response()->json([
                'verified' => false,
                'message'  => 'Student not found.',
            ], 404);
        }

        if ($response->failed()) {
            return response()->json([
                'verified' => false,
                'message'  => 'Verification service unavailable. Please try again later.',
            ], 502);
        }

        return response()->json($response->json());
    }
}
