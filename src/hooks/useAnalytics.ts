'use client';

/**
 * React Hooks for Google Analytics 4 Integration
 * Ported from bappacards-client/src/hooks/useAnalytics.js
 * Replaces react-router-dom useLocation with next/navigation usePathname.
 */

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackPageView,
  trackCTAClick,
  trackLinkClick,
  trackSectionView,
  trackVideoInteraction,
  trackFormInteraction,
  trackPricingPlanInteraction,
  trackCustomEvent,
} from '@/utils/analytics';

/**
 * Hook to track page views automatically on route changes
 */
export const usePageTracking = (): void => {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== previousPath.current) {
      trackPageView(pathname, document.title);
      previousPath.current = pathname;
    }
  }, [pathname]);
};

/**
 * Hook to track section visibility using Intersection Observer
 */
export const useSectionTracking = (
  sectionName: string,
  options: { threshold?: number; trackOnce?: boolean; rootMargin?: string } = {}
): React.RefObject<HTMLElement | null> => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasTracked = useRef(false);

  const defaultOptions = {
    threshold: 0.5,
    trackOnce: true,
    ...options,
  };

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visibilityPercentage = Math.round(entry.intersectionRatio * 100);
            if (!hasTracked.current || !defaultOptions.trackOnce) {
              trackSectionView(sectionName, visibilityPercentage);
              hasTracked.current = true;
            }
          }
        });
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin || '0px',
      }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [sectionName, defaultOptions.threshold, defaultOptions.trackOnce, defaultOptions.rootMargin]);

  return sectionRef;
};

/**
 * Hook to track CTA button clicks
 */
export const useCTATracking = (
  buttonName: string,
  location: string
): ((additionalParams?: Record<string, unknown>) => void) => {
  return useCallback(
    (additionalParams: Record<string, unknown> = {}) => {
      trackCTAClick(buttonName, location, additionalParams);
    },
    [buttonName, location]
  );
};

/**
 * Hook to track link clicks
 */
export const useLinkTracking = (): ((linkText: string, linkUrl: string, linkType?: string) => void) => {
  return useCallback((linkText: string, linkUrl: string, linkType: string = 'internal') => {
    trackLinkClick(linkText, linkUrl, linkType);
  }, []);
};

/**
 * Hook to track video interactions
 */
export const useVideoTracking = (videoTitle: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      trackVideoInteraction('play', videoTitle, videoRef.current.currentTime, videoRef.current.duration);
    }
  }, [videoTitle]);

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      trackVideoInteraction('pause', videoTitle, videoRef.current.currentTime, videoRef.current.duration);
    }
  }, [videoTitle]);

  const handleEnded = useCallback(() => {
    if (videoRef.current) {
      trackVideoInteraction('complete', videoTitle, videoRef.current.duration, videoRef.current.duration);
    }
  }, [videoTitle]);

  const handleSeeked = useCallback(() => {
    if (videoRef.current) {
      trackVideoInteraction('seek', videoTitle, videoRef.current.currentTime, videoRef.current.duration);
    }
  }, [videoTitle]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('seeked', handleSeeked);

      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('seeked', handleSeeked);
      };
    }
  }, [handlePlay, handlePause, handleEnded, handleSeeked]);

  return { videoRef, handlePlay, handlePause, handleEnded, handleSeeked };
};

/**
 * Hook to track form interactions
 */
export const useFormTracking = (formName: string) => {
  const hasStartedRef = useRef(false);

  const trackStart = useCallback(() => {
    if (!hasStartedRef.current) {
      trackFormInteraction(formName, 'start');
      hasStartedRef.current = true;
    }
  }, [formName]);

  const trackSubmit = useCallback(
    (formData: Record<string, unknown> = {}) => {
      trackFormInteraction(formName, 'submit', formData);
    },
    [formName]
  );

  const trackError = useCallback(
    (errorData: Record<string, unknown> = {}) => {
      trackFormInteraction(formName, 'error', errorData);
    },
    [formName]
  );

  const trackAbandon = useCallback(() => {
    if (hasStartedRef.current) {
      trackFormInteraction(formName, 'abandon');
    }
  }, [formName]);

  useEffect(() => {
    return () => {
      if (hasStartedRef.current) {
        trackAbandon();
      }
    };
  }, [trackAbandon]);

  return { trackStart, trackSubmit, trackError, trackAbandon };
};

/**
 * Hook to track pricing plan interactions
 */
export const usePricingTracking = (): ((planName: string, action: string, price?: number) => void) => {
  return useCallback((planName: string, action: string, price: number = 0) => {
    trackPricingPlanInteraction(planName, action, price);
  }, []);
};

/**
 * Hook to track scroll depth
 */
export const useScrollDepthTracking = (milestones: number[] = [25, 50, 75, 100]): void => {
  const trackedMilestones = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedMilestones.current.has(milestone)) {
          trackCustomEvent('scroll_depth', {
            depth_percentage: milestone,
            page_path: window.location.pathname,
          });
          trackedMilestones.current.add(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [milestones]);
};

/**
 * Hook to track time on page
 */
export const useTimeOnPageTracking = (interval: number = 30): void => {
  const startTime = useRef(Date.now());
  const trackedIntervals = useRef(new Set<number>());

  useEffect(() => {
    const startTimeValue = startTime.current;

    const timer = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTimeValue) / 1000);
      const currentInterval = Math.floor(timeOnPage / interval) * interval;

      if (!trackedIntervals.current.has(currentInterval) && currentInterval > 0) {
        trackCustomEvent('time_on_page', {
          duration_seconds: currentInterval,
          page_path: window.location.pathname,
        });
        trackedIntervals.current.add(currentInterval);
      }
    }, interval * 1000);

    return () => {
      clearInterval(timer);
      const finalTime = Math.floor((Date.now() - startTimeValue) / 1000);
      trackCustomEvent('page_exit', {
        duration_seconds: finalTime,
        page_path: window.location.pathname,
      });
    };
  }, [interval]);
};

/**
 * Hook to track outbound link clicks
 */
export const useOutboundLinkTracking = (): ((url: string, linkText: string) => Promise<void>) => {
  return useCallback((url: string, linkText: string) => {
    trackLinkClick(linkText, url, 'external');
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 100);
    });
  }, []);
};

const analyticsHooks = {
  usePageTracking,
  useSectionTracking,
  useCTATracking,
  useLinkTracking,
  useVideoTracking,
  useFormTracking,
  usePricingTracking,
  useScrollDepthTracking,
  useTimeOnPageTracking,
  useOutboundLinkTracking,
};

export default analyticsHooks;
