import type { Metadata } from 'next';
import AdClient from './AdClient';

export const metadata: Metadata = {
  title: 'Bappa Platinum — Premium Metal NFC Business Card | BappaCards',
  description:
    'Order the Bappa Platinum laser-engraved metal NFC business card. One tap shares your full digital profile. Premium quality, fast shipping. Limited-time offer available.',
  openGraph: {
    title: 'Bappa Platinum — Premium Metal NFC Business Card',
    description:
      'Laser-engraved metal NFC business card. One tap to share everything.',
    url: 'https://bappacards.com/ad',
    images: [{ url: 'https://bappacards.com/og-bappa-platinum.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bappa Platinum — Premium Metal NFC Business Card',
    description: 'Laser-engraved metal NFC business card. One tap to share everything.',
  },
  robots: { index: false, follow: false },
};

export default function AdPage() {
  return <AdClient />;
}
