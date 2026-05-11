/**
 * Sanitizes social media input values based on platform expectations.
 * Never blocks saves — only auto-corrects common input mistakes.
 * Ported from bappacards-client/src/utils/sanitizeSocialInput.js
 * Pure functions — no window/browser access needed.
 */

interface PlatformConfig {
  domains: string[];
  strip: string[];
  pathPrefix?: string;
}

const USERNAME_PLATFORMS: Record<string, PlatformConfig> = {
  instagram: {
    domains: ['instagram.com', 'www.instagram.com'],
    strip: ['@'],
  },
  twitter: {
    domains: ['twitter.com', 'www.twitter.com', 'x.com', 'www.x.com'],
    strip: ['@'],
  },
  snapchat: {
    domains: ['snapchat.com', 'www.snapchat.com'],
    strip: ['@'],
    pathPrefix: 'add/',
  },
  tiktok: {
    domains: ['tiktok.com', 'www.tiktok.com'],
    strip: ['@'],
    pathPrefix: '@',
  },
  cashapp: {
    domains: ['cash.app'],
    strip: ['$'],
    pathPrefix: '$',
  },
  venmo: {
    domains: ['venmo.com', 'www.venmo.com'],
    strip: ['@'],
  },
  paypal: {
    domains: ['paypal.me', 'www.paypal.me'],
    strip: ['@'],
  },
};

const FULL_URL_PLATFORMS = ['linkedin', 'youtube', 'facebook'];

function extractUsernameFromUrl(value: string, config: PlatformConfig): string | null {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    if (!config.domains.some((d) => hostname === d)) return null;

    let path = url.pathname.replace(/\/+$/, '');
    if (path.startsWith('/')) path = path.substring(1);

    if (config.pathPrefix && path.startsWith(config.pathPrefix)) {
      path = path.substring(config.pathPrefix.length);
    }

    const segments = path.split('/');
    return segments[0] || null;
  } catch {
    return null;
  }
}

function isUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

export function sanitizeSocialInput(platform: string, value: unknown): string {
  if (value == null) return '';
  const trimmed = String(value).trim();
  if (trimmed === '') return '';

  // WhatsApp: digits only
  if (platform === 'whatsapp') {
    return trimmed.replace(/[^\d]/g, '');
  }

  // Full URL platforms: ensure https:// prefix
  if (FULL_URL_PLATFORMS.includes(platform)) {
    if (!trimmed) return '';
    if (/^(www\.)?[a-z0-9-]+\.[a-z]{2,}/i.test(trimmed) && !isUrl(trimmed)) {
      return 'https://' + trimmed;
    }
    if (/^http:\/\//i.test(trimmed)) {
      return trimmed.replace(/^http:\/\//i, 'https://');
    }
    return trimmed;
  }

  // Username-based platforms
  const config = USERNAME_PLATFORMS[platform];
  if (!config) return trimmed;

  // Try to extract username from a full URL
  if (isUrl(trimmed)) {
    const extracted = extractUsernameFromUrl(trimmed, config);
    if (extracted) return extracted;
    return trimmed;
  }

  // Strip leading symbols (@, $)
  let result = trimmed;
  for (const char of config.strip) {
    while (result.startsWith(char)) {
      result = result.substring(1);
    }
  }

  // Strip trailing slashes
  result = result.replace(/\/+$/, '');

  return result;
}
