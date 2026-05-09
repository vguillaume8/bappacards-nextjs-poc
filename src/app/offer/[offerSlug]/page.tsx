export const revalidate = 3600;

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import OfferClient from './OfferClient';

// ──────────────────────────────────────────────
// Static offer config — expand as campaigns are added
// ──────────────────────────────────────────────

interface OfferConfig {
  slug: string;
  headline: string;
  description: string;
  discount: number; // percentage 0–75
  accentColor: string;
  badgeLabel: string;
}

const OFFERS: Record<string, OfferConfig> = {
  'flash-sale': {
    slug: 'flash-sale',
    headline: 'Flash Sale — Bappa Platinum',
    description: 'Limited-time flash sale on the Bappa Platinum metal NFC business card.',
    discount: 20,
    accentColor: '#EB1C24',
    badgeLabel: '20% OFF — TODAY ONLY',
  },
  'spring-launch': {
    slug: 'spring-launch',
    headline: 'Spring Launch Special',
    description: 'Celebrate the season with our biggest Platinum discount of the year.',
    discount: 30,
    accentColor: '#2eb87a',
    badgeLabel: '30% OFF — SPRING LAUNCH',
  },
  'partner-deal': {
    slug: 'partner-deal',
    headline: 'Exclusive Partner Offer',
    description: "An exclusive deal for our partner's community. Upgrade your networking game.",
    discount: 25,
    accentColor: '#8B3DFF',
    badgeLabel: '25% OFF — EXCLUSIVE',
  },
};

export function generateStaticParams() {
  return Object.keys(OFFERS).map((slug) => ({ offerSlug: slug }));
}

interface PageProps {
  params: Promise<{ offerSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { offerSlug } = await params;
  const offer = OFFERS[offerSlug];
  if (!offer) return { title: 'Offer Not Found' };
  return {
    title: `${offer.headline} | BappaCards`,
    description: offer.description,
    openGraph: {
      title: `${offer.headline} | BappaCards`,
      description: offer.description,
      type: 'website',
      url: `https://bappacards.com/offer/${offerSlug}`,
    },
  };
}

export default async function OfferPage({ params }: PageProps) {
  const { offerSlug } = await params;
  const offer = OFFERS[offerSlug];
  if (!offer) notFound();
  return <OfferClient offer={offer} />;
}
