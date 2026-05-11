export const PRODUCT_IDS = {
  PREFERRED: 'bappa-preferred',
  CUSTOM: 'bappa-custom',
  PLATINUM: 'bappa-platinum',
  ELITE: 'bappa-elite',
} as const;

export type ProductId = (typeof PRODUCT_IDS)[keyof typeof PRODUCT_IDS];

export const PRODUCT_SLUG_MAP: Record<string, ProductId> = {
  premium: PRODUCT_IDS.PLATINUM,
  platinum: PRODUCT_IDS.PLATINUM,
  preferred: PRODUCT_IDS.PREFERRED,
  custom: PRODUCT_IDS.CUSTOM,
  elite: PRODUCT_IDS.ELITE,
};

export const PRODUCT_NAMES: Record<string, string> = {
  [PRODUCT_IDS.PREFERRED]: 'Bappa Preferred',
  [PRODUCT_IDS.CUSTOM]: 'Bappa Custom',
  [PRODUCT_IDS.PLATINUM]: 'Bappa Platinum',
  [PRODUCT_IDS.ELITE]: 'Bappa Elite',
};

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;
