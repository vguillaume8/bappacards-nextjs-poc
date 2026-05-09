import type { Metadata } from 'next';
import MicrositeTemplate from '@/components/MicrositeTemplate';

export const metadata: Metadata = {
  title: 'Faculty & Research Solutions — Bappa Digital Business Cards',
  description:
    'Connect faculty and researchers with digital business cards that share publications, lab contacts, and collaboration opportunities. Built for academic networking.',
  alternates: { canonical: 'https://bappacards.com/solutions/higher-ed/faculty-research' },
  openGraph: {
    title: 'Faculty & Research Solutions — Bappa',
    description:
      'Connect faculty and researchers with digital business cards that share publications, lab contacts, and collaboration opportunities.',
    url: 'https://bappacards.com/solutions/higher-ed/faculty-research',
  },
};

export default function FacultyResearchPage() {
  return (
    <MicrositeTemplate
      pageTitle="Faculty & Research Solutions — Bappa Digital Business Cards"
      pageDescription="Connect minds and advance research with Bappa digital business cards."
      heroTitle="Connect Minds, Advance Research"
      heroSubtext="Faculty and researchers spend careers building knowledge and relationships. Bappa gives them a single digital touchpoint that shares their work, contact info, and collaboration interests — everywhere from international conferences to cross-department meetings."
      heroBackground="black"
      challengeTitle="The Faculty Networking Challenge"
      challengeContent="Academic professionals attend dozens of conferences and colloquia each year, meeting potential collaborators, industry partners, and grant opportunities. Yet the infrastructure for making and sustaining these connections hasn't evolved in decades. Paper business cards with just a name and email miss the rich context of a researcher's work. A faculty member's latest publications, research interests, lab website, and LinkedIn profile all live on separate platforms — and none of them fit on a paper card."
      solutionTitle="The Bappa Solution"
      solutionContent="A Bappa card for faculty brings everything together. Their profile links directly to their academic bio page, ResearchGate profile, Google Scholar, lab website, and key publications. When they tap their card at a conference, the recipient gets everything they need to understand the scope of the researcher's work and reach out for collaboration. And because profiles update in real-time, a publication added this morning is accessible by tonight's networking reception."
      benefitsTitle="Built for Academic Professionals"
      benefits={[
        {
          title: 'Research Portfolio at a Tap',
          description: 'Link directly to publications, preprints, Google Scholar, ResearchGate, and lab websites — all accessible from one tap or scan.',
          icon: '🔬',
        },
        {
          title: 'Conference Networking',
          description: 'Share a complete academic profile at conferences, symposia, and colloquia without fumbling for cards. Works on any smartphone, no app required.',
          icon: '🌍',
        },
        {
          title: 'Collaboration Facilitation',
          description: 'List research interests and open collaboration opportunities on your profile to attract the right partners from every interaction.',
          icon: '🤝',
        },
        {
          title: 'Institutional Branding',
          description: 'Every faculty card reflects your institution\'s brand identity, reinforcing your university\'s reputation at every external engagement.',
          icon: '🏛',
        },
      ]}
      useCasesTitle="Faculty Use Cases"
      useCases={[
        {
          scenario: 'Academic Conference',
          howBappaHelps: 'Faculty tap cards to share their research profile — publications, interests, and contact — instantly with colleagues from other institutions. No more legible handwriting required.',
          impact: 'More meaningful follow-up collaborations post-conference',
        },
        {
          scenario: 'Industry Partnership Meeting',
          howBappaHelps: 'Faculty share their Bappa card with industry partners, who immediately see the research portfolio and lab capabilities relevant to partnership discussions.',
          impact: 'Faster research commercialization and partnership development',
        },
        {
          scenario: 'Guest Lecture & Speaking',
          howBappaHelps: 'Show the Bappa QR code at the start of a talk. Attendees scan and have the faculty member\'s full academic profile, follow-up contact, and publication list before the lecture ends.',
          impact: 'Greater post-lecture engagement and citation of work',
        },
      ]}
      impactTitle="The Impact"
      impactBullets={[
        'Faculty spend less time managing contact info and more time on research and teaching',
        'Research collaboration opportunities increase when full academic context is shareable in one tap',
        'Industry partnership discussions accelerate when partners can immediately see research capabilities',
        'Institutional profile strengthens when every faculty card reflects consistent branding',
      ]}
      ctaText="Equip your faculty with modern networking tools"
      ctaButtonText="Get in Touch"
      ctaHref="/contact"
    />
  );
}
