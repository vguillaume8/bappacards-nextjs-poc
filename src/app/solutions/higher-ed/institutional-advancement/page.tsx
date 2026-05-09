import type { Metadata } from 'next';
import MicrositeTemplate from '@/components/MicrositeTemplate';

export const metadata: Metadata = {
  title: 'Institutional Advancement & Alumni Engagement Solutions — Bappa',
  description:
    'Build lasting alumni and donor relationships with Bappa digital business cards. Track engagement, share giving opportunities, and represent your institution\'s prestige.',
  alternates: { canonical: 'https://bappacards.com/solutions/higher-ed/institutional-advancement' },
  openGraph: {
    title: 'Institutional Advancement & Alumni Engagement Solutions — Bappa',
    description:
      'Build lasting alumni and donor relationships with Bappa digital business cards.',
    url: 'https://bappacards.com/solutions/higher-ed/institutional-advancement',
  },
};

export default function InstitutionalAdvancementPage() {
  return (
    <MicrositeTemplate
      pageTitle="Institutional Advancement & Alumni Engagement Solutions — Bappa"
      pageDescription="Build lasting alumni and donor relationships with Bappa digital business cards."
      heroTitle="Build Lasting Alumni and Donor Relationships"
      heroSubtext="Your advancement team makes your institution's future possible. Give them a tool worthy of the conversations they're having — a digital business card that reflects the prestige of your institution and makes every major gift officer interaction memorable."
      heroBackground="red"
      challengeTitle="The Advancement Challenge"
      challengeContent="Advancement and alumni relations staff attend galas, reunions, regional events, and donor meetings year-round, always representing the institution at its highest level. Yet many still hand out inexpensive paper cards that don't reflect the quality of the relationships they're building. Paper cards get lost, contact info goes out of date, and there's no way to know whether a card led to a next conversation — let alone a donation."
      solutionTitle="The Bappa Solution"
      solutionContent="Bappa gives your advancement team a premium digital presence that matches the importance of the relationships they're cultivating. A major gift officer's card can link directly to the giving portal, current impact reports, and campaign priorities — all updated in real-time as initiatives evolve. Alumni relations staff can carry the institution's brand into every regional chapter event, reunion, and networking gathering. And because Bappa tracks every engagement, you know exactly which events and interactions are driving advancement outcomes."
      benefitsTitle="Built for Advancement Teams"
      benefits={[
        {
          title: 'Premium Brand Representation',
          description: 'A beautifully branded digital card that reflects your institution\'s prestige at every donor meeting, alumni event, and stewardship interaction.',
          icon: '🏆',
        },
        {
          title: 'Giving Portal Integration',
          description: 'Link directly to your giving portal, endowment campaigns, and impact reports. A donor can go from meeting your gift officer to making a gift in minutes.',
          icon: '💼',
        },
        {
          title: 'Alumni Engagement Tracking',
          description: 'See which alumni events generate the most engagement. Know which regional chapters are most active and which need more attention.',
          icon: '📊',
        },
        {
          title: 'Stewardship Made Easy',
          description: 'Donors who tap your card get immediate access to campaign updates and impact stories. Ongoing stewardship happens every time they revisit your profile.',
          icon: '🤝',
        },
      ]}
      useCasesTitle="Advancement Use Cases"
      useCases={[
        {
          scenario: 'Major Gift Cultivation Event',
          howBappaHelps: 'Gift officers share their Bappa card at cultivation dinners. Prospects tap to receive a profile linking to the officer\'s bio, campaign priorities, and giving portal — a polished follow-up resource in the prospect\'s pocket.',
          impact: 'Higher cultivation to commitment conversion rates',
        },
        {
          scenario: 'Alumni Regional Chapter Event',
          howBappaHelps: 'Alumni relations staff tap cards with chapter members, sharing upcoming events, volunteer opportunities, and giving campaigns. Every alum walks away with a direct line to the institution.',
          impact: 'Greater chapter engagement and event attendance',
        },
        {
          scenario: 'Annual Giving Campaign',
          howBappaHelps: 'Staff cards link directly to the campaign giving page. Every interaction — from chance encounters to planned meetings — can lead directly to a donation in seconds.',
          impact: 'Shortened path from conversation to gift',
        },
      ]}
      impactTitle="The Impact"
      impactBullets={[
        'Advancement staff make a stronger first impression at donor meetings with a premium digital card that matches the institution\'s brand',
        'Shortened giving path — donors can move from introduction to online gift in a single session',
        'Alumni engagement data helps identify high-potential donors and active volunteer prospects',
        'Consistent branding across all advancement staff cards strengthens institutional identity at external events',
      ]}
      ctaText="Elevate your advancement team's impact"
      ctaButtonText="Talk to Our Team"
      ctaHref="/contact"
    />
  );
}
