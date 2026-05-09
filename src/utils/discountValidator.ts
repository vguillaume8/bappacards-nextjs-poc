/**
 * Discount Validation Utilities
 * Ported from bappacards-client/src/utils/discountValidator.js
 * Includes SSR guards for window/navigator access.
 * Config constants inlined (no config/discounts module in Next.js yet).
 */

// Inlined constants from config/discounts
const VALID_DISCOUNTS = [10, 15, 20, 25, 30, 40, 50];
const DEFAULT_DISCOUNT = 0;
const MAX_DISCOUNT = 50;
const MIN_DISCOUNT = 0;
const VALIDATION_STRATEGY = 'nearest';
const LOG_INVALID_ATTEMPTS = process.env.NODE_ENV === 'development';
const ENABLE_CAMPAIGN_OVERRIDE = true;
const CAMPAIGN_DISCOUNT_MAP: Record<string, { discount: number; description: string }> = {};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export interface ValidationResult {
  discount: number;
  isValid: boolean;
  source: string;
  wasModified: boolean;
  originalValue: number | null;
  campaign?: string | null;
  campaignDescription?: string | null;
  reason?: string;
}

export const isValidDiscount = (discount: number): boolean => {
  return VALID_DISCOUNTS.includes(discount);
};

export const findNearestDiscount = (discount: number): number => {
  if (discount <= MIN_DISCOUNT) return MIN_DISCOUNT;
  if (discount >= MAX_DISCOUNT) return Math.min(MAX_DISCOUNT, Math.max(...VALID_DISCOUNTS));

  let nearest = DEFAULT_DISCOUNT;
  let smallestDiff = Infinity;

  for (const validDiscount of VALID_DISCOUNTS) {
    const diff = Math.abs(discount - validDiscount);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      nearest = validDiscount;
    }
  }

  return nearest;
};

export const findFloorDiscount = (discount: number): number => {
  if (discount <= MIN_DISCOUNT) return MIN_DISCOUNT;

  const sortedDiscounts = [...VALID_DISCOUNTS].sort((a, b) => a - b);
  let floor = DEFAULT_DISCOUNT;

  for (const validDiscount of sortedDiscounts) {
    if (validDiscount <= discount) {
      floor = validDiscount;
    } else {
      break;
    }
  }

  return floor;
};

export const findCeilingDiscount = (discount: number): number => {
  if (discount >= MAX_DISCOUNT) return Math.min(MAX_DISCOUNT, Math.max(...VALID_DISCOUNTS));

  const sortedDiscounts = [...VALID_DISCOUNTS].sort((a, b) => a - b);

  for (const validDiscount of sortedDiscounts) {
    if (validDiscount >= discount) {
      return validDiscount;
    }
  }

  return Math.max(...VALID_DISCOUNTS);
};

const applyValidationStrategy = (discount: number, strategy: string): number => {
  switch (strategy) {
    case 'nearest':
      return findNearestDiscount(discount);
    case 'floor':
      return findFloorDiscount(discount);
    case 'ceiling':
      return findCeilingDiscount(discount);
    case 'default':
    default:
      return DEFAULT_DISCOUNT;
  }
};

const logInvalidAttempt = (
  attemptedDiscount: number,
  appliedDiscount: number,
  reason: string,
  context: { campaign?: string | null; source?: string | null } = {}
): void => {
  if (!LOG_INVALID_ATTEMPTS) return;
  if (typeof window === 'undefined') return;

  const logData = {
    timestamp: new Date().toISOString(),
    attemptedDiscount,
    appliedDiscount,
    reason,
    campaign: context.campaign || 'unknown',
    source: context.source || 'unknown',
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  console.warn('[Discount Validation]', logData);

  if (window.gtag) {
    window.gtag('event', 'invalid_discount_attempt', {
      attempted_discount: attemptedDiscount,
      applied_discount: appliedDiscount,
      reason,
      campaign: context.campaign,
      source: context.source,
    });
  }

  if (window.fbq) {
    window.fbq('trackCustom', 'InvalidDiscountAttempt', {
      attempted_discount: attemptedDiscount,
      applied_discount: appliedDiscount,
      reason,
      campaign: context.campaign,
    });
  }
};

export const getCampaignDiscount = (campaign: string | null | undefined): number | null => {
  if (!campaign) return null;
  const campaignConfig = CAMPAIGN_DISCOUNT_MAP[campaign.toLowerCase()];
  return campaignConfig ? campaignConfig.discount : null;
};

export const getCampaignDescription = (campaign: string | null | undefined): string | null => {
  if (!campaign) return null;
  const campaignConfig = CAMPAIGN_DISCOUNT_MAP[campaign.toLowerCase()];
  return campaignConfig ? campaignConfig.description : null;
};

export const validateDiscount = (
  urlDiscount: number | string | null | undefined,
  campaign: string | null = null,
  source: string | null = null
): ValidationResult => {
  const context = { campaign, source };

  if (ENABLE_CAMPAIGN_OVERRIDE && campaign) {
    const campaignDiscount = getCampaignDiscount(campaign);

    if (campaignDiscount !== null) {
      const urlDiscountNum = parseInt(String(urlDiscount)) || 0;

      if (urlDiscountNum !== campaignDiscount && urlDiscountNum !== 0) {
        logInvalidAttempt(urlDiscountNum, campaignDiscount, 'campaign_override_attempted', context);
      }

      return {
        discount: campaignDiscount,
        isValid: true,
        source: 'campaign',
        campaign,
        campaignDescription: getCampaignDescription(campaign),
        wasModified: urlDiscountNum !== campaignDiscount,
        originalValue: urlDiscountNum,
      };
    }
  }

  const parsedDiscount = parseInt(String(urlDiscount));

  if (isNaN(parsedDiscount) || urlDiscount === null || urlDiscount === undefined || urlDiscount === '') {
    return {
      discount: DEFAULT_DISCOUNT,
      isValid: true,
      source: 'default',
      wasModified: false,
      originalValue: null,
    };
  }

  if (parsedDiscount < MIN_DISCOUNT || parsedDiscount > MAX_DISCOUNT) {
    const appliedDiscount = applyValidationStrategy(parsedDiscount, VALIDATION_STRATEGY);
    logInvalidAttempt(
      parsedDiscount,
      appliedDiscount,
      parsedDiscount < MIN_DISCOUNT ? 'below_minimum' : 'above_maximum',
      context
    );

    return {
      discount: appliedDiscount,
      isValid: false,
      source: 'validated',
      wasModified: true,
      originalValue: parsedDiscount,
      reason: parsedDiscount < MIN_DISCOUNT ? 'below_minimum' : 'above_maximum',
    };
  }

  if (!isValidDiscount(parsedDiscount)) {
    const appliedDiscount = applyValidationStrategy(parsedDiscount, VALIDATION_STRATEGY);
    logInvalidAttempt(parsedDiscount, appliedDiscount, 'not_in_valid_list', context);

    return {
      discount: appliedDiscount,
      isValid: false,
      source: 'validated',
      wasModified: true,
      originalValue: parsedDiscount,
      reason: 'not_in_valid_list',
    };
  }

  return {
    discount: parsedDiscount,
    isValid: true,
    source: 'url',
    wasModified: false,
    originalValue: parsedDiscount,
  };
};

export const getValidDiscounts = (): number[] => {
  return [...VALID_DISCOUNTS];
};

export const getCampaignConfigurations = () => {
  return { ...CAMPAIGN_DISCOUNT_MAP };
};

export const buildSafeDiscountUrl = (
  baseUrl: string,
  discount: number,
  params: Record<string, string | number | null | undefined> = {}
): string => {
  if (typeof window === 'undefined') return baseUrl;

  const url = new URL(baseUrl, window.location.origin);

  if (discount > 0 && isValidDiscount(discount)) {
    url.searchParams.set('discount', String(discount));
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

const discountValidatorUtils = {
  validateDiscount,
  isValidDiscount,
  getCampaignDiscount,
  getCampaignDescription,
  getValidDiscounts,
  getCampaignConfigurations,
  findNearestDiscount,
  findFloorDiscount,
  findCeilingDiscount,
  buildSafeDiscountUrl,
};

export default discountValidatorUtils;
