import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Brand Partner Program — BappaCards',
  description:
    'Earn 20-30% commissions as a BappaCards Brand Partner. Tiered commission structure with recurring revenue from subscriptions. No inventory, no fulfillment.',
  alternates: { canonical: 'https://bappacards.com/partners' },
  openGraph: {
    title: 'BappaCards Brand Partner Program',
    description:
      'Earn 20-30% commissions as a BappaCards Brand Partner. Tiered commission structure with recurring revenue from subscriptions. No inventory, no fulfillment.',
    url: 'https://bappacards.com/partners',
  },
  twitter: { card: 'summary_large_image' },
};

const faqItems = [
  {
    question: 'How do I get paid?',
    answer: 'Commissions are paid out monthly via PayPal or direct bank transfer. You need a minimum of $50 in earned commissions to trigger a payout.',
  },
  {
    question: 'When do I start earning commissions?',
    answer: 'Your commissions begin the moment your first referred sale is confirmed. You\'ll receive a unique referral link once you sign up as a partner.',
  },
  {
    question: 'Do I need to buy inventory?',
    answer: 'No. BappaCards handles all fulfillment, shipping, and customer service. You focus on sharing — we handle the rest.',
  },
  {
    question: 'What counts toward my tier advancement?',
    answer: 'Total confirmed sales (physical card purchases) through your referral link count toward tier advancement. Subscription revenue does not count toward tiers but does earn ongoing commissions.',
  },
  {
    question: 'How long do referral cookies last?',
    answer: 'Referral cookies are valid for 30 days. If someone clicks your link and purchases within 30 days, you earn the commission.',
  },
  {
    question: 'Can I be a partner if I\'m outside the US?',
    answer: 'Yes. BappaCards ships internationally and we have partners in multiple countries. Payouts are processed in USD.',
  },
  {
    question: 'Is there an application fee?',
    answer: 'No. Becoming a BappaCards Brand Partner is completely free. We recommend purchasing a card so you can authentically promote the product.',
  },
  {
    question: 'Can I use paid advertising to promote my link?',
    answer: 'You may use paid advertising, but you may not bid on branded keywords (BappaCards, Bappa Cards, etc.) or misrepresent the product. See our partner guidelines for full details.',
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* Hero */}
      <Box sx={{ backgroundColor: '#000', color: '#fff', py: { xs: 12, md: 18 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography
            component="p"
            variant="overline"
            sx={{ color: '#EB1C24', letterSpacing: 4, mb: 2, fontSize: '0.8rem' }}
          >
            BRAND PARTNER PROGRAM
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3, color: '#fff' }}
          >
            BAPPA CARDS BRAND PARTNER PROGRAM
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.75, mb: 6, fontWeight: 400 }}>
            Earn repeatable income with a product that fits your brand.
          </Typography>
          <Button
            href="/become-an-affiliate"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#EB1C24',
              color: '#fff',
              fontWeight: 700,
              px: 6,
              py: 1.75,
              fontSize: '1rem',
              '&:hover': { backgroundColor: '#D71920' },
            }}
          >
            Apply Now
          </Button>
        </Container>
      </Box>

      {/* Premier Digital Card */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                component="h2"
                variant="h4"
                sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
              >
                The Premier Digital Business Card
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.8, mb: 2 }}>
                BappaCards is a premium NFC-enabled digital business card that works on both iPhone and Android — with zero app required for recipients. One tap shares your complete professional profile.
              </Typography>
              <Box component="ul" sx={{ pl: 0, listStyle: 'none', mt: 3 }}>
                {['NFC tap sharing — works instantly', 'Compatible with all iPhones and Android phones', 'No app needed for recipients', 'Real-time profile updates', 'Built-in analytics dashboard'].map((item, i) => (
                  <Box key={i} component="li" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EB1C24', flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.75)' }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ bgcolor: '#111', borderRadius: 4, height: 300 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Beyond Affiliates */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            Beyond Affiliates
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}>
            We built our partner program for people who want to grow with us, not just post a link.
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: 'Brand Partner',
                description: 'You\'re more than a referral link. You represent the brand — you use the product, believe in it, and share it with your audience because it genuinely adds value.',
              },
              {
                title: 'Passive Scaling',
                description: 'Your commissions grow as your sales accumulate. Hit tier milestones and your earn rate increases — permanently. Sales from 6 months ago still count toward your tier.',
              },
              {
                title: 'Pure Promotion',
                description: 'No inventory to hold. No products to ship. No customer service to handle. You promote, we deliver. The only thing you manage is your content.',
              },
            ].map((card, i) => (
              <Grid key={i} size={{ xs: 12, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    '&:hover': { boxShadow: '0 6px 24px rgba(0,0,0,0.1)' },
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Box sx={{ width: 40, height: 4, backgroundColor: '#EB1C24', borderRadius: 2, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 1.5 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Partner Profile */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            The Partner Profile
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}>
            Who thrives as a BappaCards Brand Partner?
          </Typography>
          <Grid container spacing={3}>
            {[
              { title: 'Aligned', description: 'You operate in a space where networking and professional image matter — sales, real estate, entrepreneurship, coaching, finance, or any B2B field.' },
              { title: 'Authentic', description: 'You use BappaCards yourself. Your audience sees it as a natural extension of how you work, not a random sponsorship.' },
              { title: 'Consistent', description: 'You create content regularly and have an engaged audience — whether 1,000 or 100,000 followers. Quality beats quantity.' },
              { title: 'Professional', description: 'You take your online presence seriously. You\'re someone who shows up polished, delivers value, and builds trust over time.' },
            ].map((item, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', gap: 2, p: 3, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 3 }}>
                  <Box sx={{ width: 48, height: 48, backgroundColor: '#EB1C24', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{item.title[0]}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontFamily: "'Poppins', serif", fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>{item.description}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Ideal Audiences */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 6, textAlign: 'center' }}
          >
            Ideal Audiences
          </Typography>
          <Grid container spacing={2}>
            {[
              'Sales professionals and business development teams',
              'Real estate agents and mortgage brokers',
              'Entrepreneurs, coaches, and consultants',
              'Corporate professionals in finance, tech, and healthcare',
              'Event marketers, conference organizers, and trade show exhibitors',
            ].map((audience, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5, backgroundColor: '#fff', borderRadius: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EB1C24', flexShrink: 0 }} />
                  <Typography variant="body1">{audience}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* The Lineup */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 6, textAlign: 'center' }}
          >
            The Lineup
          </Typography>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {[
              { name: 'Bappa Custom', price: '$70', description: 'Fully customized NFC card with your name, logo, and design. The flagship product for professionals who want a premium, branded experience.' },
              { name: 'Bappa Platinum', price: '$100', description: 'Premium metal NFC card with a sleek, heavy feel. Makes a lasting first impression and signals serious professionalism.' },
            ].map((product, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6 }}>
                <Card elevation={0} sx={{ height: '100%', border: '2px solid rgba(0,0,0,0.08)', borderRadius: 3, '&:hover': { borderColor: '#EB1C24', boxShadow: '0 6px 24px rgba(235,28,36,0.1)' } }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ bgcolor: '#111', borderRadius: 2, height: 160, mb: 3 }} />
                    <Typography variant="h5" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700 }}>{product.name}</Typography>
                    <Typography sx={{ color: '#EB1C24', fontWeight: 700, fontSize: '1.5rem', mb: 1.5 }}>{product.price}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>{product.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography
            component="h3"
            variant="h5"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
          >
            Recurring Revenue — Subscription Plans
          </Typography>
          <Grid container spacing={2}>
            {[
              { name: 'Premium', price: '$1/mo', earn: '$0.20/mo per user', description: 'Basic analytics and additional link slots' },
              { name: 'Premium+', price: '$2/mo', earn: '$0.40/mo per user', description: 'Video backgrounds, gallery, and CRM integration' },
              { name: 'Teams', price: '$10/mo + $1/user', earn: '$2+/mo per team', description: 'Admin dashboard, bulk updates, team analytics' },
            ].map((plan, i) => (
              <Grid key={i} size={{ xs: 12, md: 4 }}>
                <Box sx={{ p: 3, backgroundColor: '#F8F8F8', borderRadius: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <Typography variant="h6" sx={{ fontFamily: "'Poppins', serif", fontWeight: 600 }}>{plan.name}</Typography>
                  <Typography sx={{ color: '#EB1C24', fontWeight: 700, my: 0.5 }}>{plan.price}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)', mb: 1 }}>{plan.description}</Typography>
                  <Typography variant="caption" sx={{ color: '#EB1C24', fontWeight: 600 }}>You earn: {plan.earn}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Commission Structure */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            Commission Structure
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center', mb: 6 }}>
            Three tiers. All permanent once reached.
          </Typography>
          <TableContainer sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#000' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>Tier</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>Commission Rate</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>Bappa Custom ($70)</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>Bappa Platinum ($100)</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>Requirement</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { tier: 'Tier 1', rate: '20%', custom: '$14.00', platinum: '$20.00', req: 'Starting tier' },
                  { tier: 'Tier 2', rate: '25%', custom: '$17.50', platinum: '$25.00', req: '500+ lifetime sales' },
                  { tier: 'Tier 3', rate: '30%', custom: '$21.00', platinum: '$30.00', req: '1,000+ lifetime sales' },
                ].map((row, i) => (
                  <TableRow key={i} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell sx={{ fontWeight: 600 }}>{row.tier}</TableCell>
                    <TableCell sx={{ color: '#EB1C24', fontWeight: 700, fontSize: '1.1rem' }}>{row.rate}</TableCell>
                    <TableCell>{row.custom}</TableCell>
                    <TableCell>{row.platinum}</TableCell>
                    <TableCell sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.875rem' }}>{row.req}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Tier Advancement */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 6, textAlign: 'center' }}
          >
            Tier Advancement
          </Typography>
          <Grid container spacing={3}>
            {[
              { tier: '20%', range: '0 – 499 sales', description: 'Your starting rate. Every sale still earns meaningful commission from day one.', color: '#888' },
              { tier: '25%', range: '500 – 999 sales', description: 'Hit 500 lifetime sales and your rate permanently bumps to 25%. Retroactive on all new sales from that point forward.', color: '#555' },
              { tier: '30%', range: '1,000+ sales', description: 'The top tier. A permanent 30% commission on all sales. Once you\'re here, you stay here.', color: '#EB1C24' },
            ].map((item, i) => (
              <Grid key={i} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    p: 4,
                    borderTop: `4px solid ${item.color}`,
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    textAlign: 'center',
                    height: '100%',
                  }}
                >
                  <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, color: item.color, fontFamily: "'Poppins', serif" }}>
                    {item.tier}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)', mb: 2 }}>{item.range}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.7 }}>{item.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Earnings Potential */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            Earnings Potential
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center', mb: 6 }}>
            Based on Bappa Custom ($70) sales
          </Typography>
          <TableContainer sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#000' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>Monthly Sales</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>Tier 1 (20%)</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>Tier 2 (25%)</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>Tier 3 (30%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { sales: 50, t1: '$700', t2: '$875', t3: '$1,050' },
                  { sales: 100, t1: '$1,400', t2: '$1,750', t3: '$2,100' },
                  { sales: 250, t1: '$3,500', t2: '$4,375', t3: '$5,250' },
                  { sales: 500, t1: '$7,000', t2: '$8,750', t3: '$10,500' },
                ].map((row, i) => (
                  <TableRow key={i} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell sx={{ fontWeight: 600 }}>{row.sales} cards/mo</TableCell>
                    <TableCell>{row.t1}</TableCell>
                    <TableCell>{row.t2}</TableCell>
                    <TableCell sx={{ color: '#EB1C24', fontWeight: 700 }}>{row.t3}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* High Conversion */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 6, textAlign: 'center' }}
          >
            Why BappaCards Converts
          </Typography>
          <Grid container spacing={3}>
            {[
              { title: 'Simple', description: 'One tap. No app. No friction. The simpler it is to demonstrate, the easier it is to sell.' },
              { title: 'Visual', description: 'The product is visually impressive in person. A live demo is your best sales tool — and you carry it with you everywhere.' },
              { title: 'Natural', description: 'You\'re networking with your card anyway. Every professional interaction is a potential sale without any extra effort.' },
              { title: 'Passive', description: 'Post content once, earn commissions indefinitely as your audience discovers it over time.' },
            ].map((item, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    height: '100%',
                  }}
                >
                  <Typography variant="h5" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, color: '#EB1C24', mb: 1.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How to Get Started */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 6, textAlign: 'center' }}
          >
            How to Get Started
          </Typography>
          <Grid container spacing={3}>
            {[
              { num: '01', title: 'Buy a Card', description: 'Purchase your own BappaCards product at bappacards.com. Use it daily — it\'s the most authentic way to promote what you actually use.' },
              { num: '02', title: 'Create Your Profile', description: 'Set up your BappaCard profile completely. A strong profile demonstrates the product\'s value and gives your audience something real to see.' },
              { num: '03', title: 'Sign Up as a Partner', description: 'Apply for the Brand Partner Program, get your unique referral link, and start sharing. Your commissions begin with your first confirmed sale.' },
            ].map((step, i) => (
              <Grid key={i} size={{ xs: 12, md: 4 }}>
                <Card elevation={0} sx={{ height: '100%', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography sx={{ fontSize: '3rem', fontWeight: 700, color: 'rgba(0,0,0,0.1)', fontFamily: "'Poppins', serif", lineHeight: 1 }}>
                      {step.num}
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: "'Poppins', serif", fontWeight: 600, mt: 1, mb: 1.5 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 6, textAlign: 'center' }}
          >
            Frequently Asked Questions
          </Typography>
          {faqItems.map((faq, i) => (
            <Accordion
              key={i}
              elevation={0}
              sx={{
                border: '1px solid rgba(0,0,0,0.08)',
                mb: 1,
                '&:before': { display: 'none' },
                borderRadius: '8px !important',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600, fontFamily: "'Poppins', serif" }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Final CTA */}
      <Box sx={{ py: { xs: 12, md: 16 }, backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography
            component="h2"
            variant="h3"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3, letterSpacing: 2 }}
          >
            READY TO BUILD?
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.7, mb: 5, fontWeight: 400 }}>
            Join the BappaCards Brand Partner Program and start earning today.
          </Typography>
          <Button

            href="/become-an-affiliate"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#EB1C24',
              color: '#fff',
              fontWeight: 700,
              px: 6,
              py: 1.75,
              fontSize: '1rem',
              '&:hover': { backgroundColor: '#D71920' },
            }}
          >
            Apply Now
          </Button>
        </Container>
      </Box>
    </>
  );
}
