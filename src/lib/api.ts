/**
 * Typed API service layer.
 * Server-side functions use native fetch (no axios dependency).
 * Client-side functions use axios with Firebase ID token injection.
 */
import axios, { type AxiosRequestConfig } from 'axios';

const SERVER_BASE = process.env.API_BASE_URL ?? 'https://api.bappacards.com/api/v1';
const CLIENT_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.bappacards.com/api/v1';

// ──────────────────────────────────────────────
// Shared types
// ──────────────────────────────────────────────

export interface BappaProfile {
  _id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  bio?: string;
  profileImage?: string;
  backgroundImage?: string;
  links?: Array<{ label: string; url: string; type: string }>;
}

export interface UserData {
  id: string;
  role?: string;
  is_bappa_gold?: boolean;
  [key: string]: unknown;
}

type ApiResponse<T = unknown> = { data: T; status: number } | { status: number; message: string };

// ──────────────────────────────────────────────
// Server-side helpers (native fetch, SSR-safe)
// ──────────────────────────────────────────────

async function serverGet<T>(slug: string, token?: string): Promise<T | null> {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  try {
    const res = await fetch(`${SERVER_BASE}/${slug}`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data ?? json) as T;
  } catch {
    return null;
  }
}

// ──────────────────────────────────────────────
// Client-side helpers (axios, with auth token)
// ──────────────────────────────────────────────

function authConfig(token?: string | null, isMultipart = false): AxiosRequestConfig {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!isMultipart) headers['Content-Type'] = 'application/json';
  return { headers };
}

async function clientGet<T>(slug: string, token?: string | null): Promise<ApiResponse<T>> {
  try {
    const res = await axios.get<T>(`${CLIENT_BASE}/${slug}`, authConfig(token));
    return { data: res.data, status: res.status };
  } catch (e) {
    return handleAxiosError(e, 'GET', slug);
  }
}

async function clientPost<T>(
  slug: string,
  body: unknown,
  token?: string | null,
  isMultipart = false,
): Promise<ApiResponse<T>> {
  try {
    const res = await axios.post<T>(`${CLIENT_BASE}/${slug}`, body, authConfig(token, isMultipart));
    return { data: res.data, status: res.status };
  } catch (e) {
    return handleAxiosError(e, 'POST', slug);
  }
}

async function clientPut<T>(
  slug: string,
  body: unknown,
  token: string,
): Promise<ApiResponse<T>> {
  try {
    const res = await axios.put<T>(`${CLIENT_BASE}/${slug}`, body, authConfig(token));
    return { data: res.data, status: res.status };
  } catch (e) {
    return handleAxiosError(e, 'PUT', slug);
  }
}

async function clientPatch<T>(
  slug: string,
  body: unknown,
  token: string,
): Promise<ApiResponse<T>> {
  try {
    const res = await axios.patch<T>(`${CLIENT_BASE}/${slug}`, body, authConfig(token));
    return { data: res.data, status: res.status };
  } catch (e) {
    return handleAxiosError(e, 'PATCH', slug);
  }
}

async function clientDelete<T>(slug: string, token: string): Promise<ApiResponse<T>> {
  try {
    const res = await axios.delete<T>(`${CLIENT_BASE}/${slug}`, authConfig(token));
    return { data: res.data, status: res.status };
  } catch (e) {
    return handleAxiosError(e, 'DELETE', slug);
  }
}

function handleAxiosError(e: unknown, method: string, slug: string): ApiResponse<never> {
  const axiosErr = e as { response?: { status: number; data: unknown }; message?: string };
  if (axiosErr.response) {
    return { status: axiosErr.response.status, message: String(axiosErr.response.data) };
  }
  return { status: 500, message: `[${method}] ${slug}: ${axiosErr.message ?? 'Network error'}` };
}

// ──────────────────────────────────────────────
// Server-side API (SSR / RSC)
// ──────────────────────────────────────────────

export async function getDemoProfile(profileId: string): Promise<BappaProfile | null> {
  return serverGet<BappaProfile>(`profiles/${profileId}`);
}

export async function getProfileServer(
  profileId: string,
  token?: string,
): Promise<BappaProfile | null> {
  return serverGet<BappaProfile>(`profiles/${profileId}`, token);
}

// ──────────────────────────────────────────────
// Auth / users
// ──────────────────────────────────────────────

export async function getMe(token: string): Promise<UserData | null> {
  const res = await clientGet<UserData>('users/me', token);
  if ('data' in res) return res.data;
  return null;
}

export const getAuthMe = getMe;

export async function createUser(
  email: string,
  password: string,
  fullName = '',
  referral_code?: string,
  recaptcha_token?: string,
) {
  const body: Record<string, string> = { email, password, fullName };
  if (referral_code) body.referral_code = referral_code;
  if (recaptcha_token) body.recaptcha_token = recaptcha_token;
  return clientPost('users', body);
}

export async function createGmailUser(
  email: string,
  referral_code?: string,
  fullName = '',
) {
  const body: Record<string, string> = { email };
  if (fullName) body.fullName = fullName;
  if (referral_code) body.referral_code = referral_code;
  return clientPost('users/gmail', body);
}

// ──────────────────────────────────────────────
// Profiles
// ──────────────────────────────────────────────

export async function getProfile(profileId: string, token?: string | null) {
  return clientGet<BappaProfile>(`profiles/${profileId}`, token);
}

export async function getProfiles(token: string) {
  return clientGet<BappaProfile[]>('profiles', token);
}

export async function updateProfile(token: string, data: unknown) {
  return clientPost('users/links', data, token);
}

export async function updatePhoto(
  token: string,
  data: { photoType: string; photo?: File },
) {
  const form = new FormData();
  form.append('photoType', data.photoType);
  if (data.photo) form.append('photo', data.photo);
  return clientPost('users/links/photo', form, token, true);
}

export async function savePhotoUrl(token: string, data: unknown) {
  return clientPost('users/links/photo', data, token);
}

export async function getPhotoUploadSignature(token: string) {
  return clientPost('users/links/photo-upload-signature', {}, token);
}

export async function updateVideo(token: string, data: FormData | Record<string, unknown>) {
  const form =
    data instanceof FormData
      ? data
      : (() => {
          const f = new FormData();
          Object.entries(data).forEach(([k, v]) => {
            if (v != null) f.append(k, v as string);
          });
          return f;
        })();
  return clientPost('users/links/video', form, token, true);
}

export async function getVideoUploadSignature(token: string) {
  return clientPost('users/links/video-upload-signature', {}, token);
}

// ──────────────────────────────────────────────
// Contacts
// ──────────────────────────────────────────────

export async function updateContact(token: string, data: unknown) {
  return clientPost('users/contacts', data, token);
}

export async function createContact(profileId: string, body: unknown) {
  return clientPost(`profiles/${profileId}/contacts`, body);
}

export async function createV3Contact(token: string, data: unknown) {
  return clientPost('contacts', data, token);
}

export async function updateV3Contact(token: string, contactId: string, data: unknown) {
  return clientPost(`contacts/${contactId}`, data, token);
}

export async function deleteContact(token: string, contactId: string) {
  return clientDelete(`contacts/${contactId}`, token);
}

// ──────────────────────────────────────────────
// Analytics
// ──────────────────────────────────────────────

export async function getUserAnalytics(token: string) {
  return clientGet('users/analytics', token);
}

export async function trackReferralClick(code: string) {
  return clientPost('referral/v', { code });
}

// ──────────────────────────────────────────────
// Cards
// ──────────────────────────────────────────────

export async function createCard(token: string) {
  const res = await clientPost<{ id: string }>('cards', undefined, token);
  return 'data' in res ? res.data : null;
}

export async function registerCard(cardId: string, token: string) {
  const res = await clientPost<{ success: boolean }>('cards/register', { card_id: cardId }, token);
  if ('data' in res && res.status === 200) return { success: true };
  return { success: false, error: 'Failed to register card' };
}

// ──────────────────────────────────────────────
// Groups
// ──────────────────────────────────────────────

export async function getGroups(token: string) {
  const res = await clientGet<unknown[]>('groups', token);
  return 'data' in res ? res.data : [];
}

export async function createGroup(token: string, data: unknown) {
  return clientPost('groups', data, token);
}

export async function getGroup(token: string, groupName: string) {
  const res = await clientGet(`groups/${groupName}`, token);
  return 'data' in res ? res.data : null;
}

export async function updateGroup(token: string, groupName: string, data: unknown) {
  return clientPost(`groups/${groupName}`, data, token);
}

export async function deleteGroup(token: string, groupName: string) {
  return clientDelete(`groups/${groupName}`, token);
}

export async function updateGroupPhoto(
  token: string,
  groupName: string,
  data: { photoType: string; photo?: File },
) {
  const form = new FormData();
  form.append('photoType', data.photoType);
  if (data.photo) form.append('photo', data.photo);
  return clientPost(`groups/${groupName}/photo`, form, token, true);
}

// ──────────────────────────────────────────────
// Stripe / payments
// ──────────────────────────────────────────────

export async function createCheckoutProduct(data: unknown) {
  return clientPost('stripe/create-checkout-product', data);
}

export async function createCheckoutDesignLater(data: unknown) {
  return clientPost('stripe/create-checkout-design-later', data);
}

export async function createCheckoutSession(token: string, data: unknown) {
  return clientPost('stripe/create-checkout-session', data, token);
}

export async function getCheckoutSession(sessionId: string) {
  return clientGet(`stripe/checkout-session/${sessionId}`);
}

export async function createCustomerPortalSession(token: string) {
  return clientPost('stripe/create-portal-session', {}, token);
}

export async function createCheckoutWithImageUpload(data: {
  email?: string;
  product?: string;
  engraving_color?: string;
  success_url?: string;
  cancel_url?: string;
  cardName?: string;
  metadata?: unknown;
  discount?: unknown;
  logoFile?: File;
}) {
  const form = new FormData();
  if (data.email) form.append('email', data.email);
  if (data.product) form.append('product', data.product);
  if (data.engraving_color) form.append('engraving_color', data.engraving_color);
  if (data.success_url) form.append('success_url', data.success_url);
  if (data.cancel_url) form.append('cancel_url', data.cancel_url);
  if (data.cardName) form.append('cardName', data.cardName);
  if (data.metadata) form.append('metadata', JSON.stringify(data.metadata));
  if (data.discount) form.append('discount', JSON.stringify(data.discount));
  if (data.logoFile) form.append('logo', data.logoFile);
  return clientPost('stripe/create-checkout-with-image', form, null, true);
}

// ──────────────────────────────────────────────
// Support
// ──────────────────────────────────────────────

export async function sendContactUs(data: unknown) {
  return clientPost('support/contact-us', data);
}

// ──────────────────────────────────────────────
// Apple Wallet
// ──────────────────────────────────────────────

export async function generateAppleWalletPass(token: string) {
  return clientGet('passes/generate', token);
}

// ──────────────────────────────────────────────
// Affiliate
// ──────────────────────────────────────────────

export async function applyToBeAffiliate(token: string) {
  return clientPost('affiliate/apply', {}, token);
}

export async function getAffiliateDashboard(token: string) {
  return clientGet('affiliate/dashboard', token);
}

export async function getAffiliateSignups(token: string) {
  return clientGet('affiliate/signups', token);
}

// ──────────────────────────────────────────────
// Admin: users
// ──────────────────────────────────────────────

export async function adminUpdateProfile(
  token: string,
  userData: { profile_id: string; [key: string]: unknown },
) {
  const { profile_id, ...rest } = userData;
  return clientPost(`admin/users/${profile_id}/links`, rest, token);
}

export async function adminUpdateUserGroup(token: string, profileId: string, groupData: unknown) {
  return clientPut(`admin/users/${profileId}`, groupData, token);
}

export async function adminUpdateStaffRole(token: string, userId: string, isStaff: boolean) {
  return clientPut(`admin/users/${userId}/staff-role`, { staff: isStaff }, token);
}

export async function adminUpdateAffiliateRole(
  token: string,
  userId: string,
  isAffiliate: boolean,
  referralCode?: string,
) {
  const body: Record<string, unknown> = { affiliate: isAffiliate };
  if (referralCode) body.referral_code = referralCode;
  return clientPut(`admin/users/${userId}/affiliate-role`, body, token);
}

export async function adminUpdateBappaGold(token: string, userId: string, isBappaGold: boolean) {
  return clientPost(`admin/users/${userId}/bappa-gold`, { is_bappa_gold: isBappaGold }, token);
}

export async function adminCreatePremiumTrial(token: string, userId: string, trialDays: number) {
  return clientPost(`admin/users/${userId}/premium-trial`, { trialDays }, token);
}

export async function generateDesignLink(token: string, transactionId: string, email: string) {
  return clientPost('admin/generate-design-link', { transactionId, email }, token);
}

// ──────────────────────────────────────────────
// Admin: affiliates & referrals
// ──────────────────────────────────────────────

export async function getAdminAffiliates(token: string, params: Record<string, string> = {}) {
  const q = new URLSearchParams(params).toString();
  return clientGet(`admin/affiliates${q ? `?${q}` : ''}`, token);
}

export async function createAdminAffiliate(token: string, data: unknown) {
  return clientPost('admin/affiliates', data, token);
}

export async function updateAdminAffiliate(token: string, id: string, data: unknown) {
  return clientPut(`admin/affiliates/${id}`, data, token);
}

export async function deleteAdminAffiliate(token: string, id: string) {
  return clientDelete(`admin/affiliates/${id}`, token);
}

export async function attributeSignupToAffiliate(
  token: string,
  email: string,
  referralCode: string,
) {
  return clientPost('admin/affiliates/attribute', { email, referral_code: referralCode }, token);
}

export async function getAdminReferrals(token: string, params: Record<string, string> = {}) {
  const q = new URLSearchParams(params).toString();
  return clientGet(`admin/referrals${q ? `?${q}` : ''}`, token);
}

export async function updateAdminReferral(token: string, id: string, data: unknown) {
  return clientPut(`admin/referrals/${id}`, data, token);
}

export async function deleteAdminReferral(token: string, id: string) {
  return clientDelete(`admin/referrals/${id}`, token);
}

export async function createAdminReferral(token: string, data: unknown) {
  return clientPost('admin/referrals', data, token);
}

export async function getAffiliateDetail(token: string, affiliateId: string) {
  return clientGet(`admin/affiliates/${affiliateId}/detail`, token);
}

export async function getAffiliateTransactions(token: string, affiliateId: string) {
  return clientGet(`admin/affiliates/${affiliateId}/transactions`, token);
}

// ──────────────────────────────────────────────
// Admin: payouts
// ──────────────────────────────────────────────

export async function getAdminPayouts(token: string, params: Record<string, string> = {}) {
  const q = new URLSearchParams(params).toString();
  return clientGet(`admin/payouts${q ? `?${q}` : ''}`, token);
}

export async function getUnpaidSummary(token: string, affiliateId: string) {
  return clientGet(`admin/payouts/unpaid/${affiliateId}`, token);
}

export async function createAdminPayout(token: string, data: unknown) {
  return clientPost('admin/payouts', data, token);
}

export async function updateAdminPayout(token: string, id: string, data: unknown) {
  return clientPut(`admin/payouts/${id}`, data, token);
}

// ──────────────────────────────────────────────
// Admin: Stripe lookup
// ──────────────────────────────────────────────

export async function lookupStripeTransaction(token: string, transactionId: string) {
  return clientGet(
    `admin/stripe/lookup?transaction_id=${encodeURIComponent(transactionId)}`,
    token,
  );
}

// ──────────────────────────────────────────────
// Admin: GoHighLevel
// ──────────────────────────────────────────────

export async function syncGoHighLevelContacts(token: string) {
  return clientPost('admin/gohighlevel/admin/sync-contacts', {}, token);
}

// ──────────────────────────────────────────────
// Staff
// ──────────────────────────────────────────────

export async function getStaffDashboard(token: string) {
  return clientGet('staff/dashboard', token);
}

export async function getStaffCards(
  token: string,
  { page = 1, limit = 20, search = '' } = {},
) {
  const q = `page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
  return clientGet(`staff/cards?${q}`, token);
}

export async function getStaffCardStats(token: string) {
  return clientGet('staff/cards/stats', token);
}

export async function getStaffCardPurchases(
  token: string,
  { page = 1, limit = 25, orderStatus = '', search = '', order = 'desc' } = {},
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort: 'createdAt',
    order,
  });
  if (orderStatus) params.set('orderStatus', orderStatus);
  if (search) params.set('search', search);
  return clientGet(`staff/card-purchases?${params}`, token);
}

export async function markCardPrinted(token: string, orderId: string) {
  return clientPatch(`staff/orders/${orderId}/milestone`, { action: 'printed' }, token);
}

export async function shipOrderManual(
  token: string,
  orderId: string,
  data: { carrier: string; trackingNumber: string; sendEmail: boolean },
) {
  return clientPatch(`staff/orders/${orderId}/ship`, data, token);
}

export async function resendOrderShippingEmail(token: string, orderId: string) {
  return clientPost(`staff/orders/${orderId}/resend-shipping-email`, {}, token);
}

export async function getShippoRates(
  token: string,
  orderId: string,
  data: { address: unknown; packageType: string; customPkg?: unknown },
) {
  const body: Record<string, unknown> = { address: data.address, packageType: data.packageType };
  if (data.packageType === 'custom' && data.customPkg) body.customPkg = data.customPkg;
  return clientPost(`staff/orders/${orderId}/shippo/rates`, body, token);
}

export async function purchaseShippoLabel(token: string, orderId: string, rateId: string) {
  return clientPost(`staff/orders/${orderId}/shippo/purchase`, { rateId }, token);
}

export async function generateCardIds(token: string, purchaseId: string) {
  return clientPost(`staff/card-purchases/${purchaseId}/generate-card-ids`, {}, token);
}

export async function markOrderDelivered(token: string, orderId: string) {
  return clientPatch(`staff/orders/${orderId}/milestone`, { action: 'delivered' }, token);
}

export async function handDeliverOrder(token: string, orderId: string) {
  return clientPatch(`staff/orders/${orderId}/milestone`, { action: 'hand_delivered' }, token);
}
