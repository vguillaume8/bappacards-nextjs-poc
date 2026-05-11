import GetPremiumView from '@/components/checkout/GetPremiumView';

interface Props {
  params: Promise<{ product: string }>;
}

export default async function GetProductPage({ params }: Props) {
  const { product } = await params;
  return <GetPremiumView productSlug={product} />;
}
