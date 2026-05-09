import type { Metadata } from 'next';
import AffiliateContent from './AffiliateContent';

export const metadata: Metadata = {
  title: 'Become an Affiliate — Earn with BappaCards',
  description:
    'Join the BappaCards affiliate program. Earn 20% commission on every sale you refer. Instant access, no approval needed.',
  alternates: { canonical: 'https://bappacards.com/become-an-affiliate' },
  openGraph: {
    title: 'Earn with BappaCards — Affiliate Program',
    description:
      'Join the BappaCards affiliate program. Earn 20% commission on every sale you refer. Instant access, no approval needed.',
    url: 'https://bappacards.com/become-an-affiliate',
  },
  twitter: { card: 'summary_large_image' },
};

export default function BecomeAnAffiliatePage() {
  return <AffiliateContent />;
}
