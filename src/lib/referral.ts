'use client';

const STORAGE_KEY = 'bappa_referral_code';

export function getReferralCode(): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const urlCode = params.get('via') || params.get('ref');
  if (urlCode) return urlCode;

  try {
    const sessionCode = sessionStorage.getItem(STORAGE_KEY);
    if (sessionCode) return sessionCode;
  } catch (_) {}

  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (_) {
    return null;
  }
}

export function withReferralCode(path: string): string {
  const code = getReferralCode();
  if (!code) return path;
  const sep = path.includes('?') ? '&' : '?';
  return `${path}${sep}via=${encodeURIComponent(code)}`;
}

export function captureAffiliateFromProfile(affiliateTag?: string): void {
  if (!affiliateTag || typeof window === 'undefined') return;
  try {
    if (localStorage.getItem(STORAGE_KEY)) return;
  } catch (_) {}
  try {
    localStorage.setItem(STORAGE_KEY, affiliateTag);
  } catch (_) {}
}
