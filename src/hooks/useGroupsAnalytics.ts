'use client';

/**
 * Hook for groups analytics data fetching
 * Ported from bappacards-client/src/hooks/useGroupsAnalytics.js
 * service/action import replaced with a TODO stub — full migration in a later phase.
 */

import { useState, useEffect, useCallback } from 'react';

interface GroupsAnalyticsParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  search: string;
  [key: string]: unknown;
}

interface UseGroupsAnalyticsReturn {
  data: unknown;
  loading: boolean;
  error: string | null;
  params: GroupsAnalyticsParams;
  updateParams: (newParams: Partial<GroupsAnalyticsParams>) => void;
  refetch: () => void;
}

// TODO: replace with real API call after service/action is migrated
const getGroupsAnalytics = async (
  _token: string,
  _params: GroupsAnalyticsParams
): Promise<{ status: number; data?: unknown; message?: string }> => {
  console.warn('[useGroupsAnalytics] API not yet migrated — returning stub');
  return { status: 200, data: null };
};

export const useGroupsAnalytics = (
  token: string | null,
  initialParams: Partial<GroupsAnalyticsParams> = {}
): UseGroupsAnalyticsReturn => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<GroupsAnalyticsParams>({
    page: 1,
    limit: 20,
    sortBy: 'memberCount',
    sortOrder: 'desc',
    search: '',
    ...initialParams,
  });

  const fetchData = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getGroupsAnalytics(token, params);

      if (response.status === 500) {
        setError(response.message ?? 'Server error');
        setData(null);
      } else if (response.status === 200) {
        setData(response.data);
      } else {
        setError('Failed to fetch groups analytics data');
        setData(null);
      }
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch groups analytics data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [token, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateParams = useCallback((newParams: Partial<GroupsAnalyticsParams>) => {
    setParams((prev) => {
      const isSearchChange =
        newParams.search !== undefined && newParams.search !== prev.search;

      return {
        ...prev,
        ...newParams,
        ...(isSearchChange && newParams.page === undefined ? { page: 1 } : {}),
      };
    });
  }, []);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, params, updateParams, refetch };
};
