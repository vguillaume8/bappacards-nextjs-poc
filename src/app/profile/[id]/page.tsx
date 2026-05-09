import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProfileServer } from '@/lib/api';
import ProfileView from '@/components/profile/ProfileView';

// Revalidate every hour
export const revalidate = 3600;

interface ProfilePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ openExchangeContact?: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = await getProfileServer(id);

  if (!profile) {
    return {
      title: 'Profile Not Found | BappaCards',
    };
  }

  const fullName = [profile.firstname, profile.lastname].filter(Boolean).join(' ');
  const title = profile.title
    ? `${fullName}, ${profile.title} | BappaCards`
    : `${fullName} | BappaCards`;
  const description = profile.title
    ? `Connect with ${fullName}, ${profile.title}. View their digital business card and get in touch.`
    : `Connect with ${fullName}. View their digital business card and get in touch.`;
  const image = profile.profile_photo;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bappacards.com';
  const url = `${siteUrl}/profile/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'BappaCards',
      type: 'profile',
      ...(image && { images: [{ url: image, width: 800, height: 800, alt: fullName }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { id } = await params;
  const { openExchangeContact } = await searchParams;
  const profile = await getProfileServer(id);

  if (!profile) {
    notFound();
  }

  // JSON-LD Person schema
  const fullName = [profile.firstname, profile.lastname].filter(Boolean).join(' ');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: fullName,
    jobTitle: profile.title,
    worksFor: profile.company ? { '@type': 'Organization', name: profile.company } : undefined,
    image: profile.profile_photo,
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bappacards.com'}/profile/${id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* SSR-visible profile data for search engines */}
      <noscript>
        <div style={{ padding: '16px' }}>
          <h1>{fullName}</h1>
          {profile.title && <p>{profile.title}</p>}
          {profile.company && <p>{profile.company}</p>}
        </div>
      </noscript>
      <ProfileView
        profile={profile}
        initialExchangeOpen={openExchangeContact === 'true'}
      />
    </>
  );
}
