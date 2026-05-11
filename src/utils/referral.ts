/**
 * Referral Code Utilities
 * Ported from bappacards-client/src/utils/referral.js
 * All functions include SSR guards for Next.js compatibility.
 */

const STORAGE_KEY = 'bappa_referral_code';

/**
 * Check the URL for a ?via= or ?ref= referral code on page load.
 * If found, store it in localStorage and sessionStorage.
 * Guard: returns immediately on the server (no window access).
 */
export const captureReferralCode = (): void => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const code = params.get('via') || params.get('ref');

  if (!code) return;

  // Never overwrite an already-stored tag.
  try { if (localStorage.getItem(STORAGE_KEY)) return; } catch (_) {}
  try { if (sessionStorage.getItem(STORAGE_KEY)) return; } catch (_) {}

  try { localStorage.setItem(STORAGE_KEY, code); } catch (_) {}
  try { sessionStorage.setItem(STORAGE_KEY, code); } catch (_) {}

  // TODO: track referral click after service/action is migrated
  // trackReferralClick(code).catch((err) => { console.warn('[Referral] Failed to track click:', code, err); });
  console.log('[Referral] Captured referral code:', code);
};

/**
 * Get the stored referral code from any available source.
 * Priority: URL params > sessionStorage > localStorage
 */
export const getReferralCode = (): string | null => {
  if (typeof window === 'undefined') return null;

  // 1. Check current URL
  const params = new URLSearchParams(window.location.search);
  const urlCode = params.get('via') || params.get('ref');
  if (urlCode) return urlCode;

  // 2. Check sessionStorage
  try {
    const sessionCode = sessionStorage.getItem(STORAGE_KEY);
    if (sessionCode) return sessionCode;
  } catch (_) {}

  // 3. Check localStorage
  try {
    return localStorage.getItem(STORAGE_KEY) || null;
  } catch (_) {
    return null;
  }
};

/**
 * Build a path with the referral code appended as ?via= if one exists.
 */
export const withReferralCode = (basePath: string): string => {
  if (typeof window === 'undefined') return basePath;

  const code = getReferralCode();
  if (!code) return basePath;

  const separator = basePath.includes('?') ? '&' : '?';
  return `${basePath}${separator}via=${encodeURIComponent(code)}`;
};

/**
 * Capture an affiliate tag surfaced from a profile page response.
 */
export const captureAffiliateFromProfile = (tag: string | null | undefined): void => {
  if (typeof window === 'undefined') return;
  if (!tag) return;

  try { if (localStorage.getItem(STORAGE_KEY)) return; } catch (_) {}
  try { if (sessionStorage.getItem(STORAGE_KEY)) return; } catch (_) {}

  try { localStorage.setItem(STORAGE_KEY, tag); } catch (_) {}
  try { sessionStorage.setItem(STORAGE_KEY, tag); } catch (_) {}
};
