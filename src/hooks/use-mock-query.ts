import { useEffect, useRef, useState } from "react";
import type { ApiResult, ApiError } from "@/api/types";

export type QueryState =
  | { status: "loading"; data: null; error: null }
  | { status: "error"; data: null; error: ApiError }
  | { status: "success"; data: never; error: null };

/**
 * Lightweight async wrapper around a mock API call.
 * Returns { data, error, loading, refetch } — components render
 * loading / error / empty / success states off the same source.
 *
 * `simulate` lets demo URLs force a state without changing data.
 *   ?state=loading | ?state=error
 */
export function useMockQuery<T>(
  loader: () => Promise<ApiResult<T>>,
  deps: ReadonlyArray<unknown> = [],
  simulate?: "loading" | "error",
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    if (simulate === "loading") {
      // Stay in loading forever for the demo.
      return () => {
        cancelled = true;
      };
    }
    if (simulate === "error") {
      setData(null);
      setError({ code: "server_error", message: "We couldn't load this just now. Try again." });
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    loaderRef
      .current()
      .then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setData(res.data);
          setError(null);
        } else {
          setError(res.error);
          setData(null);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setError({ code: "server_error", message: "Something went wrong. Please retry." });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, simulate, ...deps]);

  return {
    data,
    error,
    loading,
    refetch: () => setTick((t) => t + 1),
  };
}