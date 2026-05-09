import type { Metadata } from 'next';
import MicrositeTemplate from '@/components/MicrositeTemplate';

export const metadata: Metadata = {
  title: 'Student Affairs & Student Government Solutions — Bappa Digital Business Cards',
  description:
    'Empower student leaders with digital business cards that enhance campus life, student government networking, and professional development.',
  alternates: { canonical: 'https://bappacards.com/solutions/higher-ed/student-affairs' },
  openGraph: {
    title: 'Student Affairs & Student Government Solutions — Bappa',
    description:
      'Empower student leaders with digital business cards that enhance campus life and student government networking.',
    url: 'https://bappacards.com/solutions/higher-ed/student-affairs',
  },
  twitter: { card: 'summary_large_image' },
};

export default function StudentAffairsPage() {
  return (
    <MicrositeTemplate
      heroTitle="Empower Student Leaders, Enhance Campus Life"
      heroSubtext="Student government leaders, orientation staff, club officers, and residence life coordinators shape the campus experience. Give them a professional digital presence that helps them connect with students, build their leadership portfolio, and represent their organization with confidence."
      heroBackground="black"
      challengeTitle="The Student Affairs Challenge"
      challengeContent="Student leaders run serious organizations — student governments with budgets, orientation programs serving thousands of incoming students, and clubs that form the social fabric of campus life. Yet these leaders rarely have professional tools to match their responsibilities. They network by word of mouth, share Google forms by text, and have no digital record of the connections and programs they've built. The result: continuity problems as leadership turns over, and missed opportunities for students to build the professional network they'll need after graduation."
      solutionTitle="The Bappa Solution"
      solutionContent="Bappa gives student leaders a professional digital card they can use throughout their time on campus and carry into their careers. Student government officers can share cards at campus events that link to meeting schedules, budget documents, and their contact info. Orientation leaders can share a card with every incoming student that links to orientation resources, move-in day details, and their direct contact for questions. And because cards carry into the career world, building this habit early prepares students for professional networking before they graduate."
      benefitsTitle="Built for Student Leaders"
      benefits={[
        {
          title: 'Leadership Portfolio',
          description: 'Student leaders build a professional profile that documents their campus roles and achievements — a head start on their professional presence before graduation.',
          icon: '🌟',
        },
        {
          title: 'Campus Event Promotion',
          description: 'Club officers and student government leaders link to event registration, meeting schedules, and campus resources from their card. One tap gets every student the info they need.',
          icon: '📅',
        },
        {
          title: 'Orientation Program Support',
          description: 'Orientation leaders share cards with incoming students that link to all orientation resources, campus maps, and direct contact for questions. Reduce the flood of emails from day one.',
          icon: '🎓',
        },
        {
          title: 'Organizational Continuity',
          description: 'When student government leadership changes, new leaders get updated Bappa cards while existing shared links remain functional. No broken connections when officers graduate.',
          icon: '🔄',
        },
      ]}
      useCasesTitle="Student Affairs Use Cases"
      useCases={[
        {
          scenario: 'Student Government Campus Events',
          howBappaHelps: 'SGA officers share Bappa cards at town halls and campus events. Students tap to access meeting minutes, budget proposals, and direct contact with their representatives.',
          impact: 'Greater student government engagement and transparency',
        },
        {
          scenario: 'Club Fair & Organization Recruitment',
          howBappaHelps: 'Club officers share their Bappa card at the club fair, linking to sign-up forms, meeting schedules, and social media. Students connect once and stay connected all semester.',
          impact: 'Higher club membership retention after initial interest',
        },
        {
          scenario: 'Residence Life Programming',
          howBappaHelps: 'RAs and housing staff share Bappa cards with residents that link to programming schedules, maintenance request forms, and community resources.',
          impact: 'Better student engagement with residence life programs',
        },
      ]}
      impactTitle="The Impact"
      impactBullets={[
        'Student leaders build professional networking habits and a digital presence before entering the workforce',
        'Incoming students connect with orientation staff in a format they\'ll actually keep — no more lost paper schedules',
        'Student organizations improve recruitment and retention when interested students have a direct, lasting connection from day one',
        'Student affairs staff spend less time redistributing contact info and more time supporting students',
      ]}
      ctaText="Empower your student leaders with professional tools"
      ctaButtonText="Get in Touch"
      ctaHref="/contact"
    />
  );
}
