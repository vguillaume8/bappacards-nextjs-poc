/**
 * Offer Validation Utilities
 * Ported from bappacards-client/src/utils/offerValidator.js
 * config/offerCampaigns imports are stubbed — full migration in a later phase.
 * Includes SSR guards for localStorage/window access.
 */

// TODO: import real functions from config/offerCampaigns after migration
// Stubs for now:
interface OfferConfig {
  slug: string;
  campaignCode: string;
  discount: { percentage: number };
  constraints?: { maxOrders: number; trackingKey: string };
  timeConstraints?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getOfferBySlug = (_slug: string): OfferConfig | null => null; // TODO: implement after config migration
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isOfferActive = (_offer: OfferConfig): { active: boolean; reason?: string } => ({ active: false, reason: 'not_implemented' }); // TODO
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const calculateEndTime = (_timeConstraints: Record<string, unknown>): Date | null => null; // TODO

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export interface OfferValidationResult {
  valid: boolean;
  error?: string;
  message?: string;
  offerConfig?: OfferConfig;
}

export const validateOffer = (slug: string): OfferValidationResult => {
  const offerConfig = getOfferBySlug(slug);

  if (!offerConfig) {
    return {
      valid: false,
      error: 'not_found',
      message: 'This offer does not exist.',
    };
  }

  const activeStatus = isOfferActive(offerConfig);

  if (!activeStatus.active) {
    return {
      valid: false,
      error: activeStatus.reason,
      message:
        activeStatus.reason === 'expired'
          ? 'This offer has expired.'
          : 'This offer has reached its limit.',
      offerConfig,
    };
  }

  return { valid: true, offerConfig };
};

export const getRemainingQuantity = (offerConfig: OfferConfig): number | null => {
  if (!offerConfig.constraints?.maxOrders) return null;
  if (typeof window === 'undefined') return null;

  const current = parseInt(
    localStorage.getItem(offerConfig.constraints.trackingKey) || '0'
  );
  return Math.max(0, offerConfig.constraints.maxOrders - current);
};

export const getOfferConsumptionPercentage = (offerConfig: OfferConfig): number => {
  if (!offerConfig.constraints?.maxOrders) return 0;
  if (typeof window === 'undefined') return 0;

  const current = parseInt(
    localStorage.getItem(offerConfig.constraints.trackingKey) || '0'
  );
  return Math.min(100, (current / offerConfig.constraints.maxOrders) * 100);
};

export const isOfferExpiringSoon = (offerConfig: OfferConfig): boolean => {
  if (!offerConfig.timeConstraints) return false;

  const endTime = calculateEndTime(offerConfig.timeConstraints);
  if (!endTime) return false;

  const now = new Date();
  const hoursRemaining = (endTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  return hoursRemaining > 0 && hoursRemaining <= 6;
};

export const isOfferAlmostSoldOut = (offerConfig: OfferConfig): boolean => {
  if (!offerConfig.constraints?.maxOrders) return false;

  const remaining = getRemainingQuantity(offerConfig);
  if (remaining === null) return false;
  const percentRemaining = (remaining / offerConfig.constraints.maxOrders) * 100;

  return percentRemaining <= 20;
};

export const getOfferUrgencyLevel = (offerConfig: OfferConfig): 'high' | 'medium' | 'low' | 'none' => {
  const expiringSoon = isOfferExpiringSoon(offerConfig);
  const almostSoldOut = isOfferAlmostSoldOut(offerConfig);

  if (expiringSoon && almostSoldOut) return 'high';
  if (expiringSoon || almostSoldOut) return 'medium';
  if (offerConfig.timeConstraints || offerConfig.constraints) return 'low';

  return 'none';
};

export const formatTimeRemaining = (endTime: Date): string => {
  const now = new Date();
  const difference = endTime.getTime() - now.getTime();

  if (difference <= 0) return 'Expired';

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference / 1000 / 60) % 60);

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} remaining`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }

  return `${minutes} minute${minutes !== 1 ? 's' : ''} remaining`;
};

export const trackOfferView = (offerConfig: OfferConfig, userId: string = 'anonymous'): void => {
  const viewData = {
    offer_slug: offerConfig.slug,
    offer_campaign: offerConfig.campaignCode,
    discount_percentage: offerConfig.discount.percentage,
    urgency_level: getOfferUrgencyLevel(offerConfig),
    user_id: userId,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    if (window.gtag) window.gtag('event', 'offer_view', viewData);
    if (window.fbq) window.fbq('trackCustom', 'OfferView', viewData);
  }

  console.log('[Offer Analytics] Offer viewed:', viewData);
};

export const trackOfferCTA = (offerConfig: OfferConfig, action: string): void => {
  const ctaData = {
    offer_slug: offerConfig.slug,
    offer_campaign: offerConfig.campaignCode,
    action,
    discount_percentage: offerConfig.discount.percentage,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    if (window.gtag) window.gtag('event', 'offer_cta_click', ctaData);
    if (window.fbq) window.fbq('trackCustom', 'OfferCTAClick', ctaData);
  }

  console.log('[Offer Analytics] CTA clicked:', ctaData);
};

const offerValidatorUtils = {
  validateOffer,
  getRemainingQuantity,
  getOfferConsumptionPercentage,
  isOfferExpiringSoon,
  isOfferAlmostSoldOut,
  getOfferUrgencyLevel,
  formatTimeRemaining,
  trackOfferView,
  trackOfferCTA,
};

export default offerValidatorUtils;
