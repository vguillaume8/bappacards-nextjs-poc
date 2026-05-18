import type { Metadata } from 'next';
import BappaConnectContent from './BappaConnectContent';

export const metadata: Metadata = {
  title: 'Bappa Connect — CRM & PRM for Professional Networkers',
  description:
    'Bappa Connect is the CRM built for networkers. Manage contacts, track relationships, and grow your pipeline — all connected to your BappaCards digital business card.',
  alternates: { canonical: 'https://bappacards.com/bappa-connect' },
  openGraph: {
    title: 'Bappa Connect — CRM for Professional Networkers',
    description:
      'Bappa Connect is the CRM built for networkers. Manage contacts, track relationships, and grow your pipeline — all connected to your BappaCards digital business card.',
    url: 'https://bappacards.com/bappa-connect',
  },
  twitter: { card: 'summary_large_image' },
};

export default function BappaConnectPage() {
  return <BappaConnectContent />;
}
