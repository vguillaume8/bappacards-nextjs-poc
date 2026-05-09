import type { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing — BappaCards | Plans for Every Professional',
  description:
    'Choose your BappaCards plan. Bappa Standard is free forever. Bappa Premium starts at $5/mo. Bappa Premium Plus at $12/mo includes AI-powered relationship management.',
  openGraph: {
    title: 'Pricing — BappaCards | Plans for Every Professional',
    description:
      'Choose from Bappa Standard (Free), Premium ($5/mo), or Premium Plus ($12/mo) with BappaConnect AI.',
    type: 'website',
    url: 'https://bappacards.com/pricing',
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
