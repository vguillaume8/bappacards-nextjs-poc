export interface ComparisonRow {
  stage?: string;
  feature?: string;
  competitor: string;
  bappa: string;
}

export interface ComparisonData {
  slug: string;
  competitorName: string;
  meta: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
    keywords: string;
  };
  hero: {
    h1: string;
    subhead: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  problemSection: {
    h2: string;
    body: string;
    bullets: string[];
    closer: string;
  };
  arcTable: {
    h2: string;
    intro: string;
    rows: Array<{ stage: string; competitor: string; bappa: string }>;
    closer?: string;
  };
  featureMatrix: {
    h2: string;
    rows: Array<{ feature: string; competitor: string; bappa: string }>;
  };
  whatYouLose: {
    h2: string;
    items: Array<{ title: string; body: string }>;
  };
  whySwitch: {
    h2: string;
    items: Array<{ title: string; body: string }>;
  };
  testimonials: {
    h2: string;
    items: Array<{ quote: string; author: string; title: string }>;
  };
  migration: {
    h2: string;
    steps: string[];
    footer?: string;
  };
  faq: {
    h2: string;
    items: Array<{ q: string; a: string }>;
  };
  finalCta: {
    h2: string;
    body: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
}

const vsHihello: ComparisonData = {
  slug: 'hihello',
  competitorName: 'HiHello',
  meta: {
    title: 'HiHello Alternative - Bappa | The Card That Follows Up For You',
    description:
      'HiHello captures contacts. Bappa captures them AND tells you exactly how to follow up. Same digital business card, plus an AI that closes deals.',
    canonical: 'https://bappacards.com/vs/hihello',
    ogImage: 'https://bappacards.com/og-image.jpg',
    keywords: 'HiHello alternative, Bappa vs HiHello, digital business card',
  },
  hero: {
    h1: 'The HiHello alternative that actually follows up for you.',
    subhead:
      'HiHello captures the contact. Bappa captures it - then an AI tells you who they are, what you have in common, and exactly how to follow up. One platform. One subscription.',
    primaryCtaLabel: 'Get your Bappa card - starts at $70',
    secondaryCtaLabel: 'See a 2-minute demo',
  },
  problemSection: {
    h2: 'You traded paper for pixels. You still have a follow-up problem.',
    body: "HiHello solved one piece of the puzzle - visitors tap, their info lands in your phone, no more paper sign-in sheets. But then what?\n\nThe contact sits in your phone. Or your CRM. Or a spreadsheet. You still have to:",
    bullets: [
      'Research who they are manually',
      'Figure out what you have in common',
      'Decide when and how to reach out',
      'Write the follow-up from scratch',
      'Remember to actually send it',
    ],
    closer: 'The capture problem is solved. The follow-up problem is still entirely on you.',
  },
  arcTable: {
    h2: 'Capture → Understand → Follow up → Scale',
    intro: 'Bappa handles the full arc of a professional relationship:',
    rows: [
      { stage: 'Capture', competitor: '✓ Tap-to-share card', bappa: '✓ Tap-to-share card' },
      { stage: 'Understand', competitor: '✗ Manual research', bappa: '✓ AI pulls full profile in 90 seconds' },
      { stage: 'Follow up', competitor: '✗ You write it yourself', bappa: '✓ AI gives talking points, common ground, approach' },
      { stage: 'Scale', competitor: '✗ Individual tool', bappa: '✓ Teams tier - shared pipeline, leaderboards' },
    ],
  },
  featureMatrix: {
    h2: 'Bappa vs HiHello - feature by feature',
    rows: [
      { feature: 'Digital business card (NFC + QR)', competitor: '✓', bappa: '✓' },
      { feature: 'Tap-to-share contact capture', competitor: '✓', bappa: '✓' },
      { feature: 'Multiple card profiles', competitor: '✓', bappa: '✓' },
      { feature: 'Contact organization', competitor: 'Basic', bappa: '✓ Tags + workflows' },
      { feature: 'AI contact research', competitor: '✗', bappa: '✓ Full profile in 90 sec' },
      { feature: 'Compatibility scoring', competitor: '✗', bappa: '✓' },
      { feature: 'Follow-up talking points', competitor: '✗', bappa: '✓' },
      { feature: 'Intention gallery templates', competitor: '✗', bappa: '✓' },
      { feature: 'Team / shared pipeline', competitor: 'HiHello Business ($6/seat)', bappa: '✓ Teams tier' },
      { feature: 'Pricing', competitor: 'Free / $6-$10 seat', bappa: '$5 Premium / $12 Connect' },
      { feature: 'Physical NFC card', competitor: '$5-$40', bappa: '$50 Preferred / $70 Custom / $100 Platinum' },
    ],
  },
  whatYouLose: {
    h2: "Three things HiHello can't do for you",
    items: [
      {
        title: 'Research before the follow-up call.',
        body: "You met someone at a networking event last week. HiHello saved their name and email. Before you call them, you Google them, scroll LinkedIn, check Instagram - that's 20 minutes of manual work per contact. Bappa's AI does it in 90 seconds.",
      },
      {
        title: 'Know what to actually say.',
        body: "HiHello hands you a contact and wishes you luck. Bappa hands you a compatibility score, 3 talking points, what you have in common, and the best angle to approach them. The first call stops being cold.",
      },
      {
        title: 'Scale across your team.',
        body: "HiHello Business exists, but it's still a contact directory. Bappa Teams gives you a shared pipeline, leaderboards, and collaborative workflows - your whole team working the same relationships.",
      },
    ],
  },
  whySwitch: {
    h2: 'Why switch to Bappa',
    items: [
      { title: 'Built for follow-up, not just capture.', body: "HiHello's feature set ends where the real work begins. Bappa's starts there." },
      { title: 'One subscription covers the full arc.', body: "Cards + Connect for $12/mo. No stitching HiHello to a CRM to a research tool to a scheduler." },
      { title: 'The AI is the point, not an add-on.', body: 'HiHello is a card with some extras. Bappa is an AI relationship engine with a card as the input layer.' },
    ],
  },
  testimonials: {
    h2: 'What users are saying',
    items: [
      { quote: "I switched from HiHello in two weeks. The contact capture is identical, but the AI research is the reason I won't go back.", author: '[Name]', title: '[Title]' },
      { quote: "Before Bappa, I'd forget to follow up with people I met at open houses within 48 hours. Now I have talking points waiting for me when I open the app.", author: '[Name]', title: '[Title]' },
    ],
  },
  migration: {
    h2: 'Switching from HiHello takes about 10 minutes',
    steps: [
      'Export your HiHello contacts as CSV',
      'Import into Bappa Connect (one-click)',
      'AI starts researching your existing contacts immediately',
      'Order your new Bappa NFC card (arrives in 3-5 business days)',
      "You're live - no data lost, everything enriched",
    ],
  },
  faq: {
    h2: 'Frequently asked questions',
    items: [
      { q: 'Can I keep my HiHello card while I try Bappa?', a: "Yes. Order your Bappa card at bappacards.com/products and run both in parallel until your new card arrives. Subscriptions (Premium $5/mo, Connect $12/mo) include a 7-day trial on first subscribe if you want to test Connect's AI layer before committing." },
      { q: 'Does Bappa work on iPhone and Android?', a: "Yes. The tap-to-share works on any NFC-enabled phone (most phones made after 2015). Recipients don't need the app." },
      { q: 'What happens to my contacts if I cancel?', a: "You can export everything as CSV at any time. We don't hold your data hostage." },
      { q: 'Is Bappa more expensive than HiHello?', a: "Bappa Premium is $5/mo (same tier as HiHello's paid plan). Connect (with AI) is $12/mo - cheaper than stitching HiHello + a CRM + a research tool together." },
      { q: 'Can I use Bappa without the physical card?', a: 'Yes. The digital card works standalone. Physical NFC cards are optional (one-time purchase, $50-$100).' },
    ],
  },
  finalCta: {
    h2: "Stop capturing contacts you won't follow up with.",
    body: "Get your Bappa card - starts at $70. Takes 2 minutes to order. Ships in 3-5 business days. Add Connect ($12/mo) when you're ready for the AI follow-up layer - 7-day trial included.",
    primaryLabel: 'Get My Card',
    secondaryLabel: 'See a 2-minute demo',
  },
};

const vsPopl: ComparisonData = {
  slug: 'popl',
  competitorName: 'Popl',
  meta: {
    title: 'Popl Alternative - Bappa | The Card That Follows Up For You',
    description:
      'Popl grows your network. Bappa closes it. Digital business card + AI that tells you exactly how to follow up with every contact.',
    canonical: 'https://bappacards.com/vs/popl',
    ogImage: 'https://bappacards.com/og-image.jpg',
    keywords: 'Popl alternative, Popl vs Bappa, Popl competitor',
  },
  hero: {
    h1: 'The Popl alternative that actually follows up for you.',
    subhead:
      "Popl helps you grow your network. Bappa helps you close it. Tap-to-share card, plus an AI that tells you who each contact is, what you have in common, and exactly how to follow up. One platform. One subscription.",
    primaryCtaLabel: 'Get your Bappa card - starts at $70',
    secondaryCtaLabel: 'See a 2-minute demo',
  },
  problemSection: {
    h2: "You've added 500 contacts this quarter. How many did you follow up with?",
    body: "Popl is great at one thing: growing your network. Tap, share, capture - repeat. Your contact count goes up. Your leaderboard climbs. Your analytics dashboard looks healthy.\n\nBut volume isn't outcomes.\n\nLook at the contacts you captured last month. How many:",
    bullets: [
      'Got a follow-up within 48 hours?',
      'Turned into a call, meeting, or deal?',
      'You can actually remember without scrolling?',
    ],
    closer: 'If the answer is "not many," Popl isn\'t the problem - but Popl isn\'t the solution either. Capture is solved. Conversion is still entirely on you.',
  },
  arcTable: {
    h2: 'Capture → Understand → Follow up → Scale',
    intro: 'Bappa handles the full arc of a professional relationship:',
    rows: [
      { stage: 'Capture', competitor: '✓ Tap-to-share NFC card, tags, stickers', bappa: '✓ Tap-to-share NFC card' },
      { stage: 'Understand', competitor: '✗ Basic contact analytics', bappa: '✓ AI pulls full profile in 90 seconds' },
      { stage: 'Follow up', competitor: '✗ Manual, or CRM sync to HubSpot/Salesforce', bappa: '✓ AI gives talking points, common ground, approach' },
      { stage: 'Scale', competitor: '✓ Popl Teams - analytics, leaderboards', bappa: '✓ Bappa Teams - shared pipeline, leaderboards, AI workflows' },
    ],
    closer: 'Popl treats the contact as the finish line. Bappa treats it as the starting line.',
  },
  featureMatrix: {
    h2: 'Bappa vs Popl - feature by feature',
    rows: [
      { feature: 'Digital business card (NFC + QR)', competitor: '✓', bappa: '✓' },
      { feature: 'Multiple form factors (card, sticker, keychain)', competitor: '✓', bappa: '✓ (card focus)' },
      { feature: 'Tap-to-share contact capture', competitor: '✓', bappa: '✓' },
      { feature: 'Contact analytics (views, taps, clicks)', competitor: '✓', bappa: '✓' },
      { feature: 'AI contact research', competitor: '✗', bappa: '✓ Full profile in 90 sec' },
      { feature: 'Compatibility scoring', competitor: '✗', bappa: '✓' },
      { feature: 'Follow-up talking points', competitor: '✗', bappa: '✓' },
      { feature: 'CRM integration', competitor: '✓ HubSpot, Salesforce', bappa: '✓ Connect is the CRM' },
      { feature: 'Team leaderboards', competitor: '✓', bappa: '✓' },
      { feature: 'Entry-level pricing', competitor: '$9.99/mo Pro', bappa: '$5/mo Premium' },
      { feature: 'Mid-tier with AI', competitor: 'Not available', bappa: '$12/mo Connect' },
    ],
  },
  whatYouLose: {
    h2: "Three things Popl can't do for you",
    items: [
      { title: 'Know who you just met.', body: "Popl shows you that someone tapped your card at 3:47pm on Tuesday. It doesn't tell you who they are, what they do, what they care about. Bappa's AI builds a complete picture in 90 seconds." },
      { title: "Skip the 'what do I say?' moment.", body: "Popl hands you a contact and a CRM sync. Then you're on your own. Bappa hands you a compatibility score, 3 talking points, what you have in common, and the best approach." },
      { title: 'Get follow-up without stitching three tools together.', body: "Popl + HubSpot + a research tool + a scheduler = 4 subscriptions. Bappa = 1 subscription. Card, CRM, AI research, workflows, and team pipeline all in one place." },
    ],
  },
  whySwitch: {
    h2: 'Why switch to Bappa',
    items: [
      { title: 'Built for conversion, not just capture.', body: "Popl's dashboard shows you how many people you met. Bappa's dashboard shows you who's ready to hear from you, what to say, and when." },
      { title: 'One subscription, not five.', body: "Cards + Connect for $12/mo replaces Popl Pro + HubSpot + LinkedIn Sales Nav + Calendly + a research subscription." },
      { title: "The AI is the product, not a feature.", body: "Popl is a card with analytics layered on top. Bappa is an AI relationship engine with a card as the input device." },
    ],
  },
  testimonials: {
    h2: 'What users are saying',
    items: [
      { quote: "I moved off Popl because I had 800 contacts and no idea what to do with any of them. Bappa's AI tells me who to call back first, every Monday morning.", author: '[Name]', title: '[Title]' },
      { quote: "Popl's leaderboard made our sales team compete on taps. Bappa's leaderboard made them compete on follow-ups.", author: '[Name]', title: 'Sales Director' },
    ],
  },
  migration: {
    h2: 'Switching from Popl takes about 10 minutes',
    steps: [
      'Export your Popl contacts as CSV (Popl dashboard → Contacts → Export)',
      'Import into Bappa Connect (one-click)',
      'AI starts researching your existing contacts immediately - no manual tagging needed',
      'Order your new Bappa NFC card (arrives in 3-5 business days)',
      "You're live - no data lost, every contact now enriched",
    ],
    footer: "Running a Popl Teams account? Contact us - we'll handle bulk migration for your whole team, free.",
  },
  faq: {
    h2: 'Frequently asked questions',
    items: [
      { q: 'Can I keep my Popl card while I try Bappa?', a: "Yes. Order your Bappa card at bappacards.com/products and run both in parallel for the first week. Most users cancel Popl once their Bappa card arrives." },
      { q: 'Does Bappa have stickers and keychains like Popl?', a: "Not yet - our product focus is the card plus the relationship engine around it." },
      { q: 'Is Bappa cheaper than Popl?', a: "Yes at entry tier. Bappa Premium is $5/mo vs Popl Pro at $9.99/mo." },
      { q: 'Can I use Bappa without the physical card?', a: "Yes. The digital card works standalone. Physical NFC cards are a one-time purchase ($50-$100), not a recurring cost." },
    ],
  },
  finalCta: {
    h2: 'Stop counting contacts. Start closing them.',
    body: "Get your Bappa card - starts at $70. Takes 2 minutes to order. Ships in 3-5 business days. Add Connect ($12/mo) when you're ready for the AI follow-up layer - 7-day trial included.",
    primaryLabel: 'Get My Card',
    secondaryLabel: 'See a 2-minute demo video',
  },
};

const vsMobilo: ComparisonData = {
  slug: 'mobilo',
  competitorName: 'Mobilo',
  meta: {
    title: 'Mobilo Alternative - Bappa | Premium Card + AI Follow-Up Engine',
    description:
      'Mobilo gives you a premium card and CRM sync. Bappa gives you that plus an AI that tells every rep exactly how to follow up.',
    canonical: 'https://bappacards.com/vs/mobilo',
    ogImage: 'https://bappacards.com/og-image.jpg',
    keywords: 'Mobilo alternative, Mobilo vs Bappa, Mobilo card competitor',
  },
  hero: {
    h1: 'The Mobilo alternative that actually follows up for you.',
    subhead:
      "Mobilo gives your team premium cards and CRM sync. Bappa gives you that - plus an AI that tells every rep who each contact is, what you have in common, and exactly how to follow up. One platform. One subscription.",
    primaryCtaLabel: 'Get Bappa cards for your team - starts at $70/card',
    secondaryCtaLabel: 'Book a team demo',
  },
  problemSection: {
    h2: 'A beautiful card and a clean CRM sync. Then what?',
    body: "Mobilo nails the premium capture experience. The cards feel expensive. The team dashboard is tidy. Contacts flow into HubSpot or Salesforce without friction.\n\nAnd then the real work starts - and Mobilo hands it off.\n\nYour reps still have to:",
    bullets: [
      'Research each new contact manually (LinkedIn, company site, recent news)',
      "Decide who's worth chasing and who isn't",
      'Figure out what to say on the first follow-up',
      'Remember to actually send it',
      'Report back in the team standup on what moved',
    ],
    closer: 'Mobilo solved the capture UX. The follow-up burden still falls entirely on your people.',
  },
  arcTable: {
    h2: 'Capture → Understand → Follow up → Scale',
    intro: 'Bappa handles the full arc of a professional relationship:',
    rows: [
      { stage: 'Capture', competitor: '✓ Premium metal/PVC NFC cards', bappa: '✓ Premium NFC cards (Preferred / Custom / Platinum)' },
      { stage: 'Understand', competitor: '✗ Manual research, or data enrichment add-on', bappa: '✓ AI pulls full profile in 90 seconds' },
      { stage: 'Follow up', competitor: '✗ Manual, CRM sync only', bappa: '✓ AI gives talking points, common ground, approach' },
      { stage: 'Scale', competitor: '✓ Team dashboards, CRM push', bappa: '✓ Bappa Teams - shared pipeline, leaderboards, AI workflows' },
    ],
    closer: "Mobilo pushes data into your CRM. Bappa is the CRM, plus an AI layer that makes every contact immediately actionable.",
  },
  featureMatrix: {
    h2: 'Bappa vs Mobilo - feature by feature',
    rows: [
      { feature: 'Premium NFC business card', competitor: '✓', bappa: '✓' },
      { feature: 'Tap-to-share contact capture', competitor: '✓', bappa: '✓' },
      { feature: 'Team dashboard', competitor: '✓', bappa: '✓' },
      { feature: 'CRM integration', competitor: '✓ HubSpot, Salesforce, Pipedrive', bappa: '✓ Connect is the CRM' },
      { feature: 'AI contact research', competitor: '✗', bappa: '✓ Full profile in 90 sec' },
      { feature: 'Follow-up talking points', competitor: '✗', bappa: '✓' },
      { feature: 'Entry-level pricing', competitor: '$5/user/mo', bappa: '$5/mo Premium' },
      { feature: 'Mid-tier with AI', competitor: 'Not available', bappa: '$12/mo Connect' },
    ],
  },
  whatYouLose: {
    h2: "Three things Mobilo can't do for you",
    items: [
      { title: 'Research contacts automatically.', body: "Mobilo syncs contacts to your CRM. Then what? You still open LinkedIn, Google their company, check Twitter. Bappa's AI hands you a complete picture in 90 seconds." },
      { title: 'Tell reps what to say.', body: "Mobilo gives you clean data. Bappa gives you clean data plus talking points, compatibility scores, and the best angle to open with." },
      { title: 'Replace your research stack.', body: "Mobilo + Salesforce + LinkedIn Sales Nav + a research tool = four subscriptions and four login screens. Bappa = one." },
    ],
  },
  whySwitch: {
    h2: 'Why switch to Bappa',
    items: [
      { title: 'Same premium card quality.', body: "Bappa's Platinum metal card matches Mobilo's premium tier quality - laser engraved, NFC enabled, luxury packaging." },
      { title: 'Built-in AI follow-up.', body: "Mobilo hands the contact to your CRM. Bappa tells you what to do with it." },
      { title: 'One subscription for the full stack.', body: "Cards + Connect for $12/mo handles everything Mobilo + CRM + research tool would cost separately." },
    ],
  },
  testimonials: {
    h2: 'What users are saying',
    items: [
      { quote: "We used Mobilo for 18 months. Great card, clean Salesforce sync. But we were still doing all the follow-up work manually. Bappa changed that.", author: '[Name]', title: 'VP Sales' },
    ],
  },
  migration: {
    h2: 'Switching from Mobilo takes about 15 minutes',
    steps: [
      'Export your Mobilo contacts as CSV',
      'Import into Bappa Connect (one-click)',
      'AI starts enriching your existing contacts immediately',
      'Order Bappa NFC cards for your team (arrives in 3-5 business days)',
      "You're live - no data lost, every contact enriched",
    ],
  },
  faq: {
    h2: 'Frequently asked questions',
    items: [
      { q: 'Does Bappa match Mobilo card quality?', a: "Yes. Bappa Platinum is a premium laser-engraved metal NFC card. Bappa Custom offers full design customization on PVC." },
      { q: 'Does Bappa integrate with Salesforce?', a: "Bappa Connect is itself a CRM. Native Salesforce/HubSpot integrations are on the roadmap." },
      { q: 'Is Bappa cheaper than Mobilo?', a: "Bappa Premium ($5/mo) is comparable to Mobilo's entry tier. Bappa Connect ($12/mo) adds AI that Mobilo doesn't offer at any price." },
    ],
  },
  finalCta: {
    h2: 'Your team deserves cards that follow up.',
    body: "Get Bappa cards for your team - starts at $70/card. Add Connect ($12/mo per rep) for AI-powered follow-up on every contact. 7-day trial included.",
    primaryLabel: 'Get Team Cards',
    secondaryLabel: 'Book a team demo',
  },
};

const vsBlinq: ComparisonData = {
  slug: 'blinq',
  competitorName: 'Blinq',
  meta: {
    title: 'Blinq Alternative - Bappa | The Card That Follows Up For You',
    description:
      'Blinq is rated #1 on G2 for ease of use. Bappa matches the capture UX - then adds an AI that tells you exactly who to call back, what to say, and when.',
    canonical: 'https://bappacards.com/vs/blinq',
    ogImage: 'https://bappacards.com/og-image.jpg',
    keywords: 'Blinq alternative, Bappa vs Blinq, Blinq competitor, digital business card',
  },
  hero: {
    h1: 'The Blinq alternative that actually follows up for you.',
    subhead:
      "Blinq is the easiest way to share a digital business card. Bappa is the easiest way to share a card - and close the loop. Same tap-to-share simplicity, plus an AI that tells you who each contact is, what you have in common, and exactly how to follow up.",
    primaryCtaLabel: 'Get your Bappa card - starts at $70',
    secondaryCtaLabel: 'See a 2-minute demo',
  },
  problemSection: {
    h2: 'Easy capture is table stakes. Easy follow-up is not.',
    body: "Blinq earned its G2 #1 spot the right way: a beautiful app, frictionless tap-to-share, and a free tier that just works. There's nothing to fix about how Blinq captures contacts.\n\nThe problem starts the moment the contact lands in your phone.\n\nA clean capture experience doesn't tell you:",
    bullets: [
      'Who that person actually is (beyond name + email)',
      "Whether they're worth calling back this week",
      'What you have in common to break the ice',
      'When and how to reach out',
      'What to say in the first 30 seconds',
    ],
    closer: "Easy capture is solved across the entire category. Easy follow-up isn't - not by Blinq, not by anyone. That's where Bappa lives.",
  },
  arcTable: {
    h2: 'Capture → Understand → Follow up → Scale',
    intro: 'Bappa handles the full arc of a professional relationship:',
    rows: [
      { stage: 'Capture', competitor: '✓ Tap-to-share card, mobile-first UX', bappa: '✓ Tap-to-share card, mobile-first UX' },
      { stage: 'Understand', competitor: '✗ Contact list + analytics', bappa: '✓ AI pulls full profile in 90 seconds' },
      { stage: 'Follow up', competitor: '✗ Manual, or CRM sync (Business tier)', bappa: '✓ AI gives talking points, common ground, approach' },
      { stage: 'Scale', competitor: '✓ Blinq Business - team dashboard, basic CRM sync', bappa: '✓ Teams tier - shared pipeline, leaderboards, AI workflows' },
    ],
    closer: "Blinq won G2 by being the easiest place to capture a contact. Bappa wins on what happens next.",
  },
  featureMatrix: {
    h2: 'Bappa vs Blinq - feature by feature',
    rows: [
      { feature: 'Digital business card (NFC + QR)', competitor: '✓', bappa: '✓' },
      { feature: 'Tap-to-share contact capture', competitor: '✓', bappa: '✓' },
      { feature: 'G2 ease-of-use rating', competitor: '#1', bappa: 'Top rated' },
      { feature: 'AI contact research', competitor: '✗', bappa: '✓ Full profile in 90 sec' },
      { feature: 'Follow-up talking points', competitor: '✗', bappa: '✓' },
      { feature: 'CRM integration', competitor: '✓ Business tier', bappa: '✓ Connect is the CRM' },
      { feature: 'Entry-level pricing', competitor: 'Free / $5/mo Business', bappa: 'Free / $5/mo Premium' },
      { feature: 'Mid-tier with AI', competitor: 'Not available', bappa: '$12/mo Connect' },
    ],
  },
  whatYouLose: {
    h2: "Three things Blinq can't do for you",
    items: [
      { title: 'Know who just tapped your card.', body: "Blinq tells you when and where. Bappa tells you who - their background, role, recent news, and what you share in common. All in 90 seconds." },
      { title: 'Write the follow-up for you.', body: "Blinq hands you a contact. Bappa hands you talking points, a compatibility score, and the angle that will land best." },
      { title: 'Replace your entire follow-up stack.', body: "Blinq + a CRM + research + a scheduler = 3-4 subscriptions. Bappa = 1." },
    ],
  },
  whySwitch: {
    h2: 'Why switch to Bappa',
    items: [
      { title: 'Same ease of use, better outcomes.', body: "Bappa is just as easy to share. The difference is what happens after the share." },
      { title: 'AI built for follow-up, not tacked on.', body: "Blinq is a card with a contact list. Bappa is an AI relationship engine with a card as the input." },
      { title: 'Competitive on price.', body: "Bappa Premium ($5/mo) matches Blinq Business. Bappa Connect ($12/mo) adds AI that Blinq doesn't offer at any price." },
    ],
  },
  testimonials: {
    h2: 'What users are saying',
    items: [
      { quote: "Blinq was my favorite card for two years. I switched when I realized I was still doing all the follow-up work in my head. Bappa does that part for me.", author: '[Name]', title: '[Title]' },
    ],
  },
  migration: {
    h2: 'Switching from Blinq takes about 10 minutes',
    steps: [
      'Export your Blinq contacts as CSV',
      'Import into Bappa Connect (one-click)',
      'AI starts researching your existing contacts',
      'Order your new Bappa NFC card (arrives in 3-5 business days)',
      "You're live",
    ],
  },
  faq: {
    h2: 'Frequently asked questions',
    items: [
      { q: 'Is Bappa as easy to use as Blinq?', a: "Yes - sharing your Bappa card is one tap or QR scan. No app required for recipients." },
      { q: 'Is Bappa cheaper than Blinq?', a: "Same price at entry tier. Bappa Premium is $5/mo, same as Blinq Business. Bappa Connect ($12/mo) adds AI that Blinq doesn't offer." },
      { q: 'Does Bappa have a free tier?', a: "Yes. Bappa Standard is free forever - unlimited card shares, custom branding, social media integration." },
    ],
  },
  finalCta: {
    h2: "The easiest card to share - and the easiest follow-up to send.",
    body: "Get your Bappa card - starts at $70. Add Connect ($12/mo) when you're ready for AI follow-up. 7-day trial included.",
    primaryLabel: 'Get My Card',
    secondaryLabel: 'See a 2-minute demo',
  },
};

const vsUniqode: ComparisonData = {
  slug: 'uniqode',
  competitorName: 'Uniqode',
  meta: {
    title: 'Uniqode Alternative - Bappa | Card + AI Follow-Up, Without the Enterprise Tax',
    description:
      "Uniqode locks down your team's branding. Bappa makes every contact actionable. Cards, AI follow-up, and team management in one subscription.",
    canonical: 'https://bappacards.com/vs/uniqode',
    ogImage: 'https://bappacards.com/og-image.jpg',
    keywords: 'Uniqode alternative, Beaconstac alternative, Uniqode vs Bappa',
  },
  hero: {
    h1: 'The Uniqode alternative that turns every contact into a follow-up.',
    subhead:
      "Uniqode controls how your team's cards look. Bappa controls what happens after the tap. Tap-to-share digital cards, plus an AI that tells every rep who each contact is, what you have in common, and exactly how to follow up.",
    primaryCtaLabel: 'Get Bappa cards for your team - starts at $70/card',
    secondaryCtaLabel: 'Book a team demo',
  },
  problemSection: {
    h2: "A locked-down card design doesn't make a follow-up happen.",
    body: "Uniqode is built for a specific buyer: a brand or IT lead who wants every card across the company to look identical, sync into Salesforce, and report cleanly to a marketing-ops dashboard.\n\nA perfectly branded card and a clean CRM sync still leave your team with:",
    bullets: [
      'Manual research on every new contact',
      "No idea who's worth chasing first this week",
      'Cold first outreach, written from scratch',
      'Five tools open to do what should be one',
      'A reporting dashboard that measures activity, not outcomes',
    ],
    closer: 'Uniqode solved policy. The follow-up burden still falls entirely on your people.',
  },
  arcTable: {
    h2: 'Capture → Understand → Follow up → Scale',
    intro: 'Bappa handles the full arc of a professional relationship:',
    rows: [
      { stage: 'Capture', competitor: '✓ Branded NFC + QR cards, enforced templates', bappa: '✓ Tap-to-share NFC card, deep customization' },
      { stage: 'Understand', competitor: '✗ Contact list pushed to CRM', bappa: '✓ AI pulls full profile in 90 seconds' },
      { stage: 'Follow up', competitor: '✗ Manual, in your CRM', bappa: '✓ AI gives talking points, common ground, approach' },
      { stage: 'Scale', competitor: '✓ Admin policy, SSO, audit logs (higher tiers)', bappa: '✓ Teams tier - shared pipeline, leaderboards, AI workflows' },
    ],
    closer: 'Uniqode is built for the brand team that wants control. Bappa is built for the revenue team that wants outcomes.',
  },
  featureMatrix: {
    h2: 'Bappa vs Uniqode - feature by feature',
    rows: [
      { feature: 'Digital business card (NFC + QR)', competitor: '✓', bappa: '✓' },
      { feature: 'Tap-to-share contact capture', competitor: '✓', bappa: '✓' },
      { feature: 'Brand enforcement / locked templates', competitor: '✓ Admin policy', bappa: '✓ Teams tier policy controls' },
      { feature: 'CRM integration', competitor: '✓ Salesforce, HubSpot, MS Dynamics', bappa: '✓ Connect is the CRM' },
      { feature: 'AI contact research', competitor: '✗', bappa: '✓ Full profile in 90 sec' },
      { feature: 'Follow-up talking points', competitor: '✗', bappa: '✓' },
      { feature: 'Entry-level pricing', competitor: '$5/user/mo Lite (limited)', bappa: '$5/mo Premium' },
      { feature: 'Mid-tier pricing', competitor: '$15/user/mo Pro', bappa: '$12/mo Connect (with AI)' },
      { feature: 'Plus tier', competitor: '$30/user/mo Plus', bappa: 'Teams tier - competitive at scale' },
    ],
  },
  whatYouLose: {
    h2: "Three things Uniqode can't do for you",
    items: [
      { title: "Enrich contacts automatically.", body: "Uniqode syncs to Salesforce. Bappa's AI researches every new contact - their background, company news, shared connections - in 90 seconds." },
      { title: "Tell reps what to say.", body: "Uniqode gives you policy control. Bappa gives you AI-powered talking points and compatibility scores that actually close deals." },
      { title: "Skip the enterprise pricing tiers.", body: "Uniqode's useful features are locked behind $15-30/user tiers. Bappa gives you cards + AI + team pipeline at $12/mo." },
    ],
  },
  whySwitch: {
    h2: 'Why switch to Bappa',
    items: [
      { title: 'Built for revenue teams, not brand teams.', body: "Uniqode optimizes for brand consistency. Bappa optimizes for follow-up conversion." },
      { title: 'No enterprise pricing tax.', body: "The features you actually need - AI research, team pipeline, workflows - are in Bappa's $12/mo tier, not a $30/user enterprise plan." },
      { title: 'One platform, not four.', body: "Cards + CRM + AI research + team pipeline in one subscription. No stitching Uniqode + Salesforce + research tools together." },
    ],
  },
  testimonials: {
    h2: 'What users are saying',
    items: [
      { quote: "We came from Uniqode because it had everything our brand team wanted. We left because it had nothing our sales team needed. Bappa fixed that.", author: '[Name]', title: 'Head of Sales' },
    ],
  },
  migration: {
    h2: 'Switching from Uniqode takes about 15 minutes',
    steps: [
      'Export your Uniqode contacts as CSV',
      'Import into Bappa Connect (one-click)',
      'AI starts enriching your existing contacts',
      'Order Bappa NFC cards for your team',
      "You're live - brand guidelines can be set in Bappa Teams admin",
    ],
  },
  faq: {
    h2: 'Frequently asked questions',
    items: [
      { q: "Does Bappa support brand enforcement like Uniqode?", a: "Yes - Bappa Teams includes template locking and admin policy controls for card design." },
      { q: 'Is Bappa cheaper than Uniqode?', a: "Yes significantly. Bappa Premium is $5/mo vs Uniqode Lite at $5/user. Bappa Connect ($12/mo) includes AI that Uniqode doesn't offer at any price tier." },
      { q: 'Does Bappa integrate with Salesforce?', a: "Bappa Connect is itself a CRM. Native Salesforce integrations are on the roadmap for enterprise users." },
    ],
  },
  finalCta: {
    h2: 'Your brand is locked down. Your follow-up should be too.',
    body: "Get Bappa cards for your team - starts at $70/card. Add Connect ($12/mo per rep) for AI-powered follow-up. 7-day trial included.",
    primaryLabel: 'Get Team Cards',
    secondaryLabel: 'Book a team demo',
  },
};

export const COMPARISONS: Record<string, ComparisonData> = {
  hihello: vsHihello,
  popl: vsPopl,
  mobilo: vsMobilo,
  blinq: vsBlinq,
  uniqode: vsUniqode,
};

export const COMPARISON_SLUGS = Object.keys(COMPARISONS);
