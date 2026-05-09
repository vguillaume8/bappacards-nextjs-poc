import type { Metadata } from 'next';
import MicrositeTemplate from '@/components/MicrositeTemplate';

export const metadata: Metadata = {
  title: 'Career Development & Employer Relations Solutions — Bappa',
  description:
    'Help students and employer partners network professionally with Bappa digital business cards. Built for career fairs, employer events, and professional development.',
  alternates: { canonical: 'https://bappacards.com/solutions/higher-ed/career-development' },
  openGraph: {
    title: 'Career Development & Employer Relations Solutions — Bappa',
    description:
      'Help students and employer partners network professionally with Bappa digital business cards.',
    url: 'https://bappacards.com/solutions/higher-ed/career-development',
  },
};

export default function CareerDevelopmentPage() {
  return (
    <MicrositeTemplate
      pageTitle="Career Development & Employer Relations Solutions — Bappa"
      pageDescription="Help students network like professionals with Bappa digital business cards."
      heroTitle="Empower Students to Network Like Professionals"
      heroSubtext="Give every student a professional digital business card before they set foot at their first career fair. And give your employer partners a modern way to share their opportunities — instantly, on any device."
      heroBackground="red"
      challengeTitle="The Career Services Challenge"
      challengeContent="Career services offices work hard to prepare students for the professional world, but students often arrive at career fairs without a polished way to present themselves. At the same time, employer partners bring mountains of paper cards and brochures that end up discarded. The result: missed connections, wasted materials, and no visibility into which relationships actually progressed."
      solutionTitle="The Bappa Solution"
      solutionContent="Bappa digital business cards give students a professional, branded presence before graduation. Career services can provision cards for all students as part of career readiness programming. Employer partners get their own Bappa cards to share open roles, recruiting contacts, and application links with a single tap. Every interaction is trackable, every connection is permanent, and every student leaves the fair with a complete digital record of who they met."
      benefitsTitle="Built for Career Services"
      benefits={[
        {
          title: 'Student Career Readiness',
          description: 'Give every student a professional digital card as part of their career development curriculum. They arrive at career fairs ready to impress.',
          icon: '🎓',
        },
        {
          title: 'Employer Partner Experience',
          description: 'Provide employer partners with Bappa cards to share their recruiting info. A premium experience that reflects well on your institution.',
          icon: '🤝',
        },
        {
          title: 'Event Engagement Tracking',
          description: 'See which employer-student connections happen at each event. Identify your most engaged employer partners and most active student networkers.',
          icon: '📊',
        },
        {
          title: 'Alumni Network Integration',
          description: 'Connect your career platform to Bappa so alumni mentors and industry contacts are easily accessible to students looking to build their network.',
          icon: '🌐',
        },
      ]}
      useCasesTitle="Career Services Use Cases"
      useCases={[
        {
          scenario: 'Campus Career Fair',
          howBappaHelps: 'Students tap employer cards to instantly save recruiting contacts and open role information. Employers tap student cards to capture candidate profiles for follow-up.',
          impact: '60% more employer-student connections per event',
        },
        {
          scenario: 'Employer Info Sessions',
          howBappaHelps: 'The presenting recruiter shares their Bappa card in the first 5 minutes. Every attendee walks away with the recruiter\'s direct contact, open roles, and application deadline.',
          impact: 'Higher offer conversion from recruited candidates',
        },
        {
          scenario: 'Professional Development Workshops',
          howBappaHelps: 'Students create and refine their Bappa cards as part of career prep workshops. Career counselors review and coach on profile content before major career events.',
          impact: 'Students arrive at events with polished, professional profiles',
        },
      ]}
      impactTitle="The Impact"
      impactBullets={[
        'Students build a professional digital presence before graduation — a skill and an asset they carry through their entire career',
        'Employer partners report higher quality candidate engagement when using digital over paper materials',
        'Career services can track event ROI with real engagement data for the first time',
        'Reduces printing and materials costs for both career services and employer partners',
      ]}
      ctaText="Transform your career services program"
      ctaButtonText="Talk to Our Team"
      ctaHref="/contact"
    />
  );
}
