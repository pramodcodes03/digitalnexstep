"use client";

import { useState, useEffect } from "react";

/**
 * Hook that fetches data from the API and falls back to static data on error.
 *
 * Usage:
 *   const { data, loading } = useApi(() => api.getProducts(), staticProducts);
 */
export function useApi<T>(
  fetcher: () => Promise<{ data: T }>,
  fallback: T
): { data: T; loading: boolean; error: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((res) => {
        if (!cancelled) {
          const payload = res.data;
          // Only use API data if it's a non-empty array or non-null object
          if (Array.isArray(payload) ? payload.length > 0 : payload != null) {
            setData(payload);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}
