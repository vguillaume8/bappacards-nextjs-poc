/**
 * Google Analytics 4 (GA4) Tracking Utilities
 * Ported from bappacards-client/src/utils/analytics.js
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Check if gtag is available
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Safe gtag wrapper with error handling
const safeGtag = (...args: unknown[]): void => {
  if (isGtagAvailable()) {
    try {
      window.gtag!(...args);
    } catch (error) {
      console.error('GA4 tracking error:', error);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event (dev mode):', ...args);
  }
};

export const initGA = (userProperties: Record<string, unknown> = {}): void => {
  if (isGtagAvailable()) {
    safeGtag('set', 'user_properties', {
      ...userProperties,
      app_version: process.env.NEXT_PUBLIC_VERSION || '1.0.0',
    });
  }
};

export const trackPageView = (path: string, title: string): void => {
  safeGtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackCTAClick = (
  buttonName: string,
  location: string,
  additionalParams: Record<string, unknown> = {}
): void => {
  safeGtag('event', 'cta_click', {
    button_name: buttonName,
    button_location: location,
    event_category: 'engagement',
    event_label: `${location}_${buttonName}`,
    ...additionalParams,
  });
};

export const trackLinkClick = (
  linkText: string,
  linkUrl: string,
  linkType: string = 'internal'
): void => {
  safeGtag('event', 'link_click', {
    link_text: linkText,
    link_url: linkUrl,
    link_type: linkType,
    event_category: 'navigation',
  });
};

export const trackVideoInteraction = (
  action: string,
  videoTitle: string,
  currentTime: number = 0,
  duration: number = 0
): void => {
  const percentage = duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
  safeGtag('event', `video_${action}`, {
    video_title: videoTitle,
    video_current_time: currentTime,
    video_duration: duration,
    video_percent: percentage,
    event_category: 'video',
    event_label: videoTitle,
  });
};

export const trackSectionView = (sectionName: string, visibilityPercentage: number = 100): void => {
  safeGtag('event', 'section_view', {
    section_name: sectionName,
    visibility_percentage: visibilityPercentage,
    event_category: 'engagement',
    event_label: sectionName,
  });
};

export const trackFormInteraction = (
  formName: string,
  action: string,
  formData: Record<string, unknown> = {}
): void => {
  const sanitizedData = { ...formData };
  delete sanitizedData.password;
  delete sanitizedData.email;
  delete sanitizedData.phone;

  safeGtag('event', `form_${action}`, {
    form_name: formName,
    event_category: 'forms',
    event_label: formName,
    ...sanitizedData,
  });
};

export const trackSignUpFunnel = (step: string, method: string = 'email'): void => {
  safeGtag('event', 'sign_up', {
    method,
    step,
    event_category: 'conversion',
  });

  if (step === 'completed') {
    safeGtag('event', 'conversion', {
      send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
      value: 1.0,
      currency: 'USD',
      transaction_id: Date.now().toString(),
    });
  }
};

export const trackFeatureUsage = (
  featureName: string,
  featureData: Record<string, unknown> = {}
): void => {
  safeGtag('event', 'feature_usage', {
    feature_name: featureName,
    event_category: 'features',
    event_label: featureName,
    ...featureData,
  });
};

export const trackPricingPlanInteraction = (
  planName: string,
  action: string,
  price: number = 0
): void => {
  safeGtag('event', `pricing_${action}`, {
    plan_name: planName,
    plan_price: price,
    event_category: 'pricing',
    event_label: planName,
    value: price,
    currency: 'USD',
  });
};

export const trackSearch = (searchTerm: string, resultsCount: number = 0): void => {
  safeGtag('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount,
    event_category: 'search',
  });
};

export const trackCustomEvent = (
  eventName: string,
  eventParams: Record<string, unknown> = {}
): void => {
  safeGtag('event', eventName, {
    event_category: 'custom',
    ...eventParams,
  });
};

export const trackError = (
  errorMessage: string,
  errorLocation: string,
  isFatal: boolean = false
): void => {
  safeGtag('event', 'exception', {
    description: errorMessage,
    fatal: isFatal,
    error_location: errorLocation,
    event_category: 'errors',
  });
};

export const trackEcommerce = (
  action: string,
  itemData: Record<string, unknown> = {}
): void => {
  safeGtag('event', action, {
    ...itemData,
    event_category: 'ecommerce',
  });
};

export const setUserId = (userId: string): void => {
  safeGtag('set', { user_id: userId });
};

export const setUserProperties = (properties: Record<string, unknown>): void => {
  safeGtag('set', 'user_properties', properties);
};

const analyticsUtils = {
  initGA,
  trackPageView,
  trackCTAClick,
  trackLinkClick,
  trackVideoInteraction,
  trackSectionView,
  trackFormInteraction,
  trackSignUpFunnel,
  trackFeatureUsage,
  trackPricingPlanInteraction,
  trackSearch,
  trackCustomEvent,
  trackError,
  trackEcommerce,
  setUserId,
  setUserProperties,
};

export default analyticsUtils;
