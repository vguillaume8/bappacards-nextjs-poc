/**
 * Link Analytics Utility Functions
 * Ported from bappacards-client/src/utils/linkAnalyticsHelpers.js
 * Pure functions — no window/browser access needed.
 */

import type { Theme } from '@mui/material/styles';

/**
 * Get a friendly display name for a link type
 */
export const getLinkTypeFriendlyName = (type: string | null | undefined): string => {
  const typeMapping: Record<string, string> = {
    instagram: 'Instagram',
    twitter: 'X (Twitter)',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    snapchat: 'Snapchat',
    whatsapp: 'WhatsApp',
    website: 'Website',
    email: 'Email',
    phone: 'Phone',
    resume: 'Resume',
    calendly: 'Calendly',
    custom: 'Custom Link',
    save_contact: 'Save Contact',
    exchange_contact: 'Exchange Contact',
    qr_code: 'QR Code',
  };

  return typeMapping[type?.toLowerCase() ?? ''] || type || '';
};

/**
 * Get time-specific data based on the selected time range
 */
export const getTimeSpecificData = <T>(
  allTimeData: T,
  thisMonthData: T | null | undefined,
  thisWeekData: T | null | undefined,
  todayData: T | null | undefined,
  timeRange: number
): T => {
  if (timeRange === 0) return allTimeData;
  if (timeRange === 25) return thisMonthData ?? ({} as T);
  if (timeRange === 50) return thisWeekData ?? ({} as T);
  return todayData ?? ({} as T);
};

/**
 * Get a display title for the current time range
 */
export const getTimeRangeTitle = (timeRange: number): string => {
  switch (timeRange) {
    case 0:  return 'All Time';
    case 25: return 'This Month';
    case 50: return 'This Week';
    case 100: return 'Today';
    default: return 'All Time';
  }
};

interface AnalyticsData {
  clicksByType?: Record<string, number>;
  clicksByTypeThisMonth?: Record<string, number>;
  clicksByTypeThisWeek?: Record<string, number>;
  clicksByTypeToday?: Record<string, number>;
  clicksByTypeAndIdentifierThisMonth?: Record<string, Record<string, { count: number }>>;
  clicksByTypeAndIdentifierThisWeek?: Record<string, Record<string, { count: number }>>;
  clicksByTypeAndIdentifierToday?: Record<string, Record<string, { count: number }>>;
}

/**
 * Process click data for charts with time range filtering
 */
export const getTimeRangeClickData = (
  analyticsData: AnalyticsData | null | undefined,
  timeRange: number
): Record<string, number> => {
  if (!analyticsData) return {};

  const allTimeData = analyticsData.clicksByType || {};

  if (timeRange === 0) return allTimeData;

  if (timeRange === 25 && analyticsData.clicksByTypeThisMonth) {
    return analyticsData.clicksByTypeThisMonth;
  } else if (timeRange === 50 && analyticsData.clicksByTypeThisWeek) {
    return analyticsData.clicksByTypeThisWeek;
  } else if (timeRange === 100 && analyticsData.clicksByTypeToday) {
    return analyticsData.clicksByTypeToday;
  }

  const clicksData: Record<string, number> = {};

  let detailedClicks: Record<string, Record<string, { count: number }>> | undefined;
  if (timeRange === 25 && analyticsData.clicksByTypeAndIdentifierThisMonth) {
    detailedClicks = analyticsData.clicksByTypeAndIdentifierThisMonth;
  } else if (timeRange === 50 && analyticsData.clicksByTypeAndIdentifierThisWeek) {
    detailedClicks = analyticsData.clicksByTypeAndIdentifierThisWeek;
  } else if (timeRange === 100 && analyticsData.clicksByTypeAndIdentifierToday) {
    detailedClicks = analyticsData.clicksByTypeAndIdentifierToday;
  } else {
    return {};
  }

  Object.entries(detailedClicks).forEach(([type, identifiers]) => {
    clicksData[type] = Object.values(identifiers).reduce((sum, data) => sum + data.count, 0);
  });

  return clicksData;
};

/**
 * Truncate display names for better presentation
 */
export const getTruncatedDisplayName = (name: string, linkType: string): string => {
  if (linkType === 'linkedin' && name.includes('linkedin.com/')) {
    if (name.includes('/in/')) {
      const username = name.split('/in/')[1]?.split('/')[0]?.split('?')[0];
      return username ? `LinkedIn: ${username}` : 'LinkedIn Profile';
    }
    return 'LinkedIn Profile';
  }

  if (linkType === 'website' && name.length > 50) {
    try {
      const url = new URL(name);
      const domain = url.hostname.replace('www.', '');
      return domain.length > 30 ? `${domain.substring(0, 30)}...` : domain;
    } catch {
      return name.length > 30 ? `${name.substring(0, 30)}...` : name;
    }
  }

  if (name.length > 50) {
    return `${name.substring(0, 47)}...`;
  }

  return name;
};

/**
 * Generate color palette for link types
 */
export const getLinkTypeColors = (theme: Theme): string[] => {
  return [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success?.main ?? '#4caf50',
    theme.palette.warning?.main ?? '#ff9800',
    theme.palette.info?.main ?? '#2196f3',
    theme.palette.error.main,
    '#9c27b0',
    '#795548',
    '#607d8b',
    '#009688',
  ];
};
