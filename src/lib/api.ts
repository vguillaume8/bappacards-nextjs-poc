const API_BASE = process.env.API_BASE_URL ?? 'https://api.bappacards.com/api/v1';

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

export async function getDemoProfile(profileId: string): Promise<BappaProfile | null> {
  try {
    const res = await fetch(`${API_BASE}/profiles/${profileId}`, {
      next: { revalidate: 3600 },
      headers: { Authorization: 'Bearer token' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json ?? null;
  } catch {
    return null;
  }
}
