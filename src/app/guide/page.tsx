import type { Metadata } from 'next';
import GuideContent from './GuideContent';

export const metadata: Metadata = {
  title: 'User Guide — BappaCards Digital Business Card',
  description:
    'Complete guide to setting up and using your BappaCards digital business card. Learn profile setup, sharing, analytics, subscriptions, and more.',
  alternates: { canonical: 'https://bappacards.com/guide' },
  openGraph: {
    title: 'BappaCards User Guide',
    description:
      'Complete guide to setting up and using your BappaCards digital business card. Learn profile setup, sharing, analytics, subscriptions, and more.',
    url: 'https://bappacards.com/guide',
  },
};

export default function GuidePage() {
  return <GuideContent />;
}
