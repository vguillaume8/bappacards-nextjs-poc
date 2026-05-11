'use client';

/**
 * Hook for admin analytics data fetching
 * Ported from bappacards-client/src/hooks/useAdminAnalytics.js
 * service/action import replaced with a TODO stub — full migration in a later phase.
 */

import { useState, useEffect, useCallback } from 'react';

interface AdminAnalyticsParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  search: string;
  status: string;
  group: string;
  timeFilter: string;
  [key: string]: unknown;
}

interface UseAdminAnalyticsReturn {
  data: unknown;
  loading: boolean;
  error: string | null;
  params: AdminAnalyticsParams;
  updateParams: (newParams: Partial<AdminAnalyticsParams>) => void;
  refetch: () => void;
}

// TODO: replace with real API call after service/action is migrated
const getAdminUsersAnalytics = async (
  _token: string,
  _params: AdminAnalyticsParams,
  _signal?: AbortSignal
): Promise<{ status: number; data?: unknown; message?: string }> => {
  console.warn('[useAdminAnalytics] API not yet migrated — returning stub');
  return { status: 200, data: null };
};

export const useAdminAnalytics = (
  token: string | null,
  initialParams: Partial<AdminAnalyticsParams> = {}
): UseAdminAnalyticsReturn => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<AdminAnalyticsParams>({
    page: 1,
    limit: 20,
    sortBy: 'totalScans',
    sortOrder: 'desc',
    search: '',
    status: 'all',
    group: 'all',
    timeFilter: 'all',
    ...initialParams,
  });

  const fetchData = useCallback((signal?: AbortSignal) => {
    if (!token) return;

    setLoading(true);
    setError(null);

    getAdminUsersAnalytics(token, params, signal)
      .then((response) => {
        if (response.status === 500) {
          setError(response.message ?? 'Server error');
          setData(null);
        } else if (response.status === 200) {
          setData(response.data);
        } else {
          setError('Failed to fetch analytics data');
          setData(null);
        }
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError' || err.name === 'CanceledError') return;
        setError(err.message || 'Failed to fetch analytics data');
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, params]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const updateParams = useCallback((newParams: Partial<AdminAnalyticsParams>) => {
    setParams((prev) => {
      const isFilterChange =
        (newParams.search !== undefined && newParams.search !== prev.search) ||
        (newParams.status !== undefined && newParams.status !== prev.status) ||
        (newParams.group !== undefined && newParams.group !== prev.group) ||
        (newParams.timeFilter !== undefined && newParams.timeFilter !== prev.timeFilter);

      return {
        ...prev,
        ...newParams,
        ...(isFilterChange && newParams.page === undefined ? { page: 1 } : {}),
      };
    });
  }, []);

  const refetch = useCallback(() => {
    fetchData(new AbortController().signal);
  }, [fetchData]);

  return { data, loading, error, params, updateParams, refetch };
};
