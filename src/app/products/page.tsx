import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Premium NFC Business Cards — BappaCards | Smart Digital Cards from $50',
  description:
    'Shop premium NFC-enabled business cards. Choose from Bappa Preferred ($50), Custom ($70), or Platinum Metal ($100). Fast shipping, waterproof, eco-friendly. One tap to share everything.',
  keywords:
    'nfc business cards, metal business cards, custom business cards, digital business cards, smart business cards, tap business cards',
  openGraph: {
    title: 'Premium NFC Business Cards — BappaCards',
    description:
      'Shop premium NFC-enabled business cards from $50. One tap to share everything.',
    url: 'https://bappacards.com/products',
    images: [{ url: 'https://bappacards.com/og-bappa-platinum.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium NFC Business Cards — BappaCards',
    description: 'Shop premium NFC-enabled business cards from $50.',
  },
  alternates: { canonical: 'https://bappacards.com/products' },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
