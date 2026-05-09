import type { Metadata } from 'next';
import MicrositeTemplate from '@/components/MicrositeTemplate';

export const metadata: Metadata = {
  title: 'Communications & Marketing Solutions — Bappa Digital Business Cards',
  description:
    'Amplify your university brand at every touchpoint with Bappa digital business cards. Turn every staff card into a branded ambassador for your institution.',
  alternates: { canonical: 'https://bappacards.com/solutions/higher-ed/communications-marketing' },
  openGraph: {
    title: 'Communications & Marketing Solutions — Bappa',
    description:
      'Amplify your university brand at every touchpoint with Bappa digital business cards.',
    url: 'https://bappacards.com/solutions/higher-ed/communications-marketing',
  },
};

export default function CommunicationsMarketingPage() {
  return (
    <MicrositeTemplate
      pageTitle="Communications & Marketing Solutions — Bappa Digital Business Cards"
      pageDescription="Amplify your brand at every touchpoint with Bappa digital business cards."
      heroTitle="Amplify Your Brand at Every Touchpoint"
      heroSubtext="Your communications and marketing team tells your institution's story to the world. Give them digital business cards that are as polished as the campaigns they create — and that drive traffic to every piece of content they produce."
      heroBackground="black"
      challengeTitle="The Communications Challenge"
      challengeContent="Communications and marketing professionals attend conferences, media events, vendor meetings, and partnership discussions constantly. Each touchpoint is an opportunity to represent the institution's brand and drive awareness of its latest initiatives. But traditional business cards are static — they can't link to the most recent press release, the latest campaign microsite, or the institution's social channels in a single, organized tap."
      solutionTitle="The Bappa Solution"
      solutionContent="Bappa gives communications and marketing staff a dynamic digital card that's always current. When they meet a journalist, the card links to the press contact page. When they're at a media conference, it links to the institution's latest announcements and brand assets. When a new campaign launches, update every staff card's link in the dashboard — and every card shared over the past year automatically reflects the new destination. Your brand always shows up at its best."
      benefitsTitle="Built for Communications Teams"
      benefits={[
        {
          title: 'Dynamic Content Links',
          description: 'Link to press releases, campaign microsites, social channels, and media kits. Update links in real-time as content changes — no reprinting required.',
          icon: '📣',
        },
        {
          title: 'Consistent Brand Identity',
          description: 'Every staff card follows your institution\'s brand guidelines — colors, fonts, logo, and messaging — enforced across all cards from your admin dashboard.',
          icon: '🎨',
        },
        {
          title: 'Media Relations',
          description: 'Share a media kit, press contact page, and latest announcements with a single tap at press events and media conferences.',
          icon: '📰',
        },
        {
          title: 'Campaign Amplification',
          description: 'Add your latest campaign\'s CTA to every staff card during active campaign periods. Turn every team member into a campaign touchpoint.',
          icon: '🚀',
        },
      ]}
      useCasesTitle="Communications Use Cases"
      useCases={[
        {
          scenario: 'Press Conference / Media Event',
          howBappaHelps: 'Communications staff share their Bappa card with journalists, who tap to access the press kit, embargoed materials, and direct contact for follow-up questions.',
          impact: 'More media coverage from faster journalist follow-through',
        },
        {
          scenario: 'Higher Ed Marketing Conference',
          howBappaHelps: 'Marketing staff network with peers and vendors using a card that showcases recent campaigns and links to brand case studies. A living portfolio in their pocket.',
          impact: 'Stronger peer relationships and vendor partnership opportunities',
        },
        {
          scenario: 'New Campaign Launch',
          howBappaHelps: 'The campaign link is updated across all marketing staff cards on launch day. Every interaction in the following weeks drives traffic to the campaign.',
          impact: 'Institution-wide campaign amplification at zero additional cost',
        },
      ]}
      impactTitle="The Impact"
      impactBullets={[
        'Brand consistency enforced across all staff cards without manual oversight of each employee',
        'Press contacts convert at higher rates when journalists have instant access to complete media resources',
        'Campaign landing page traffic increases when every staff interaction during a campaign period includes a direct link',
        'Communications team saves hours of reprinting and redistribution whenever contact info or links change',
      ]}
      ctaText="Make every staff card a brand ambassador"
      ctaButtonText="Get in Touch"
      ctaHref="/contact"
    />
  );
}
