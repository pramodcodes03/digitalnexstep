"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import MarksheetResult, { type MarksheetVerificationData } from "@/components/verification/MarksheetResult";

export default function MarksheetVerificationPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id.join("/") : (params.id as string);

  const [isLoading, setIsLoading] = useState(true);
  const [marksheetResult, setMarksheetResult] = useState<MarksheetVerificationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const verify = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await api.verifyMarksheet(id.trim());
        if (data?.verified) {
          setMarksheetResult(data);
          setIsLoading(false);
          return;
        }
      } catch {}

      setError("No marksheet found with this ID. Please check and try again.");
      setIsLoading(false);
    };

    verify();
  }, [id]);

  return (
    <div className="min-h-screen p-3 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 sm:p-6 lg:p-8">

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="mt-4 text-lg text-gray-600">Verifying marksheet...</p>
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="max-w-2xl mx-auto mt-20">
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-red-800">Verification Failed</h4>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
            <div className="text-center">
              <a
                href="/verification"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
              >
                Try Manual Verification
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {!isLoading && marksheetResult && (
        <MarksheetResult data={marksheetResult} />
      )}
    </div>
  );
}
