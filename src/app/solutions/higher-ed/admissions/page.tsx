import type { Metadata } from 'next';
import MicrositeTemplate from '@/components/MicrositeTemplate';

export const metadata: Metadata = {
  title: 'Admissions & Enrollment Solutions — Bappa Digital Business Cards',
  description:
    'Transform college fairs and campus visits with Bappa digital business cards for admissions teams. Track engagement, update info instantly, and never lose a prospect.',
  alternates: { canonical: 'https://bappacards.com/solutions/higher-ed/admissions' },
  openGraph: {
    title: 'Admissions & Enrollment Solutions — Bappa',
    description:
      'Transform college fairs and campus visits with Bappa digital business cards for admissions teams. Track engagement, update info instantly, and never lose a prospect.',
    url: 'https://bappacards.com/solutions/higher-ed/admissions',
  },
  twitter: { card: 'summary_large_image' },
};

export default function AdmissionsPage() {
  return (
    <MicrositeTemplate
      heroTitle="Turn Campus Visits into Lasting Connections"
      heroSubtext="Give your admissions counselors the tool that makes every interaction count. Bappa digital business cards let prospects save your info instantly, while you track every engagement — from college fair taps to virtual session views."
      heroBackground="black"
      challengeTitle="The Admissions Challenge"
      challengeContent="Admissions counselors attend hundreds of events each year — college fairs, high school visits, campus open houses, and virtual sessions — handing out thousands of paper business cards that end up lost in a backpack or recycling bin. Without a digital solution, there's no way to know who engaged with your materials, no way to update outdated information instantly, and no seamless path from first contact to application."
      solutionTitle="The Bappa Solution"
      solutionContent="Bappa digital business cards give every admissions counselor a modern, professional profile that prospects can access with a tap or scan. When a student taps your Bappa card at a college fair, your complete profile — program highlights, contact info, scheduling link, and virtual tour — opens instantly on their phone. No app required. The student can save your contact, schedule a campus visit, or start their application right then and there. And you can see it all in your analytics dashboard."
      benefitsTitle="Built for Admissions Teams"
      benefits={[
        {
          title: 'Instant Digital Connections',
          description: 'Students tap or scan to save your complete counselor profile in seconds. No paper, no friction, no lost cards.',
          icon: '📱',
        },
        {
          title: 'Real-Time Profile Updates',
          description: 'Update your programs, deadlines, and contact info from your dashboard. Changes appear instantly everywhere your card has been shared.',
          icon: '🔄',
        },
        {
          title: 'Engagement Analytics',
          description: 'See which events generate the most interest, which links get clicked, and how often your profile is viewed — by event, by day, by counselor.',
          icon: '📊',
        },
        {
          title: 'CRM Integration',
          description: 'Connect Bappa to your existing CRM or enrollment platform. Contact exchanges flow directly into your pipeline.',
          icon: '🔗',
        },
      ]}
      useCasesTitle="Admissions Use Cases"
      useCases={[
        {
          scenario: 'College Fair',
          howBappaHelps: 'Counselors tap cards to interested students. Each interaction is logged with time, location, and profile view data. Students receive instant access to program info, application links, and scheduling.',
          impact: '3x increase in post-event engagement vs. paper cards',
        },
        {
          scenario: 'Campus Visit',
          howBappaHelps: 'Visitors tap the admissions office card during check-in and receive a custom digital welcome with tour details, counselor contacts, and next steps — all on their phone.',
          impact: 'Faster applicant conversion through seamless follow-up',
        },
        {
          scenario: 'Virtual Recruitment',
          howBappaHelps: 'Counselors share their Bappa profile link in Zoom chats, email campaigns, and social media. Prospects get the same polished experience whether in person or online.',
          impact: 'Seamless hybrid recruitment experience',
        },
      ]}
      impactTitle="The Impact"
      impactBullets={[
        '3x higher follow-up rate after college fair interactions compared to paper business cards',
        '100% reduction in print costs for business cards and recruitment materials',
        'Actionable engagement data from every interaction, enabling smarter counselor deployment',
        'Direct CRM integration eliminates manual data entry from contact collection',
      ]}
      ctaText="Ready to modernize your admissions outreach?"
      ctaButtonText="Get in Touch"
      ctaHref="/contact"
    />
  );
}
