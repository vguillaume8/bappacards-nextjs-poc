'use client';

import { useCallback } from 'react';
import { getLinkTypeFriendlyName } from '@/utils/linkAnalyticsHelpers';

/**
 * Hook that wraps getLinkTypeFriendlyName for use in React components.
 */
export function useLinkTypeFormatting() {
  const formatLinkType = useCallback((type: string | null | undefined): string => {
    return getLinkTypeFriendlyName(type);
  }, []);

  return { formatLinkType };
}
