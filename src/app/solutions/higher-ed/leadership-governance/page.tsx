import type { Metadata } from 'next';
import MicrositeTemplate from '@/components/MicrositeTemplate';

export const metadata: Metadata = {
  title: 'Leadership & Governance Solutions — Bappa Digital Business Cards',
  description:
    'Help university presidents, provosts, and board members connect with confidence using premium Bappa digital business cards built for institutional leadership.',
  alternates: { canonical: 'https://bappacards.com/solutions/higher-ed/leadership-governance' },
  openGraph: {
    title: 'Leadership & Governance Solutions — Bappa',
    description:
      'Help university presidents, provosts, and board members connect with confidence using premium Bappa digital business cards.',
    url: 'https://bappacards.com/solutions/higher-ed/leadership-governance',
  },
  twitter: { card: 'summary_large_image' },
};

export default function LeadershipGovernancePage() {
  return (
    <MicrositeTemplate
      heroTitle="Lead with Purpose, Connect with Confidence"
      heroSubtext="University presidents, provosts, trustees, and board members represent your institution at the highest levels. Give them a digital business card that reflects the gravity of those conversations and opens doors to the partnerships that shape your institution's future."
      heroBackground="red"
      challengeTitle="The Leadership Challenge"
      challengeContent="Senior university leaders operate in high-stakes environments — government meetings, foundation boardrooms, corporate partnership discussions, and international delegations. In these contexts, every detail signals institutional quality. A worn paper card handed to a senator or Fortune 500 CEO is a missed opportunity. Leadership needs a polished, modern contact method that reflects the institution's standing and makes follow-up effortless."
      solutionTitle="The Bappa Solution"
      solutionContent="Bappa's premium digital business card is the right tool for your institution's most important relationships. A president's card can link directly to their official bio, recent remarks, the institution's strategic plan, and their scheduler — giving contacts exactly what they need to understand the institution's direction and next steps for engagement. Board members get cards that connect their professional background to their institutional role, strengthening credibility in external discussions."
      benefitsTitle="Built for University Leadership"
      benefits={[
        {
          title: 'Executive-Level Presentation',
          description: 'A premium digital card that reflects the seriousness and prestige of your leadership role — no paper, no wear, no outdated information.',
          icon: '💼',
        },
        {
          title: 'Strategic Links',
          description: 'Link directly to your strategic plan, annual report, official bio, and key initiatives — the context every government, corporate, or foundation partner needs.',
          icon: '📋',
        },
        {
          title: 'Scheduler Integration',
          description: 'Add your scheduling link so decision-makers can book follow-up meetings directly from your card, accelerating the path from introduction to partnership.',
          icon: '📅',
        },
        {
          title: 'Board Member Profiles',
          description: 'Give board members and trustees branded cards that connect their professional standing to their institutional role, strengthening external credibility.',
          icon: '🏛',
        },
      ]}
      useCasesTitle="Leadership Use Cases"
      useCases={[
        {
          scenario: 'Government & Policy Meetings',
          howBappaHelps: 'The president or provost taps their card with legislators or policy staff, who immediately access the institution\'s official position papers, strategic initiatives, and scheduling contact.',
          impact: 'Stronger legislative relationships and policy influence',
        },
        {
          scenario: 'Corporate Partnership Discussions',
          howBappaHelps: 'Leadership shares a card with corporate executives that links to research capabilities, workforce development programs, and the partnership development contact.',
          impact: 'Faster partnership development and MOU signing',
        },
        {
          scenario: 'Board Retreat & Governance',
          howBappaHelps: 'Board members receive updated Bappa cards before each retreat, reflecting current committee assignments, institutional priorities, and the governance calendar.',
          impact: 'More professional board member representation at external events',
        },
      ]}
      impactTitle="The Impact"
      impactBullets={[
        'Leadership makes a stronger first impression in high-stakes meetings when every detail reflects institutional quality',
        'Government and foundation contacts convert at higher rates when they have immediate access to strategic context',
        'Board member engagement increases when trustees have branded cards that connect their professional standing to their governance role',
        'Scheduling conversion improves when the path from introduction to meeting is a single tap',
      ]}
      ctaText="Equip your leadership team for every room"
      ctaButtonText="Talk to Our Team"
      ctaHref="/contact"
    />
  );
}
