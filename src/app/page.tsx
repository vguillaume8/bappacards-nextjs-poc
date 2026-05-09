import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NfcIcon from '@mui/icons-material/Nfc';
import QrCodeIcon from '@mui/icons-material/QrCode';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { getDemoProfile } from '@/lib/api';

export const metadata: Metadata = {
  title: 'BappaCards — Digital Business Cards with NFC Tap Sharing',
  description:
    'Replace paper cards with a digital business card that works with NFC, QR codes, and Apple Wallet. Real-time analytics included. Free to start.',
  openGraph: {
    title: 'BappaCards — Digital Business Cards',
    description: 'NFC + QR + Apple Wallet digital business cards for modern professionals.',
  },
};

const features = [
  {
    icon: <NfcIcon sx={{ fontSize: 40, color: '#EB1C24' }} />,
    title: 'NFC Tap Sharing',
    description: 'Tap your card against any smartphone and instantly share your full digital profile. No app download required.',
  },
  {
    icon: <QrCodeIcon sx={{ fontSize: 40, color: '#EB1C24' }} />,
    title: 'QR Code Ready',
    description: 'Every card includes a unique QR code for presentations, events, email signatures, and social bios.',
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 40, color: '#EB1C24' }} />,
    title: 'Real-Time Analytics',
    description: 'See who viewed your card, when they opened it, and what links they clicked — all in your dashboard.',
  },
  {
    icon: <AccountCircleIcon sx={{ fontSize: 40, color: '#EB1C24' }} />,
    title: 'Apple Wallet',
    description: 'Add your digital card to Apple Wallet so it is always one swipe away on your iPhone.',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 40, color: '#EB1C24' }} />,
    title: 'Team Management',
    description: 'Centrally manage cards for your entire team with consistent branding and easy onboarding.',
  },
  {
    icon: <PhoneAndroidIcon sx={{ fontSize: 40, color: '#EB1C24' }} />,
    title: 'Video Backgrounds',
    description: 'Stand out with a video background on your profile that plays when someone opens your card.',
  },
];

const stats = [
  { number: '50,000+', label: 'Professionals' },
  { number: '2M+', label: 'Cards Shared' },
  { number: '4.9★', label: 'App Rating' },
  { number: '$0', label: 'Paper Waste' },
];

const faqs = [
  {
    q: 'Do recipients need to download an app?',
    a: 'No. Recipients just tap or scan and your full profile loads instantly in their browser. No app download needed.',
  },
  {
    q: 'Can I update my card after sharing?',
    a: 'Yes. Update your information once and everyone who has your card automatically sees the new details.',
  },
  {
    q: 'What does the free plan include?',
    a: 'The free plan includes one digital card, QR code sharing, and basic analytics. NFC and team features require a paid plan.',
  },
  {
    q: 'Is BappaCards GDPR compliant?',
    a: 'Yes. We follow data minimization principles and give recipients full control over their data.',
  },
];

export default async function HomePage() {
  const demoProfile = await getDemoProfile('oI49yQ');

  return (
    <>
      {/* ── Hero ── */}
      <Box
        component="section"
        aria-label="Hero"
        sx={{
          background: 'linear-gradient(160deg, #000 0%, #111 50%, #1a0002 100%)',
          color: '#fff',
          py: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* decorative blur blob */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(235,28,36,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip
                label="NFC + QR + Apple Wallet"
                size="small"
                sx={{ backgroundColor: 'rgba(235,28,36,0.15)', color: '#EB1C24', mb: 3, fontWeight: 600 }}
              />
              <Typography
                component="h1"
                variant="h1"
                sx={{ color: '#fff', mb: 3, fontFamily: "'Poppins', serif" }}
              >
                The Business Card That Works While You Sleep
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255,255,255,0.75)', mb: 5, maxWidth: 480, fontSize: '1.2rem', lineHeight: 1.7 }}
              >
                Share your contact, socials, and portfolio with a tap — no app, no paper, no hassle. BappaCards is the digital business card that leaves a real impression.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  href="https://bappacards.com/signup"
                  sx={{
                    backgroundColor: '#EB1C24',
                    '&:hover': { backgroundColor: '#D71920' },
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    boxShadow: '0 6px 18px rgba(235,28,36,0.35)',
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="https://bappacards.com/products"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.35)',
                    color: '#fff',
                    '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.05)' },
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  View Pricing
                </Button>
              </Box>

              {/* Trust signals */}
              <Box sx={{ display: 'flex', gap: 3, mt: 5, flexWrap: 'wrap' }}>
                {['Free to start', 'No credit card', 'Works instantly'].map((t) => (
                  <Box key={t} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                    <Box
                      component="span"
                      sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#EB1C24', display: 'inline-block' }}
                    />
                    {t}
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Demo profile card — SSR'd from API */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box
                sx={{
                  width: 320,
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
                  background: '#fff',
                }}
              >
                {/* Card header */}
                <Box sx={{ backgroundColor: '#111', height: 100, position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -40,
                      left: 24,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      border: '3px solid #fff',
                      backgroundColor: '#EB1C24',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.5rem', fontFamily: "'Poppins', serif" }}>
                      {demoProfile?.firstname?.[0] ?? 'B'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ pt: 7, pb: 3, px: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#000', fontFamily: "'Poppins', serif" }}>
                    {demoProfile?.firstname
                      ? `${demoProfile.firstname} ${demoProfile.lastname ?? ''}`.trim()
                      : 'Bappa Demo User'}
                  </Typography>
                  {demoProfile?.title && (
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', mb: 0.5 }}>
                      {demoProfile.title}
                    </Typography>
                  )}
                  {demoProfile?.company && (
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)', mb: 2 }}>
                      {demoProfile.company}
                    </Typography>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: '#EB1C24', mt: 1, fontSize: '0.8rem' }}
                  >
                    Save Contact
                  </Button>

                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1.5, color: 'rgba(0,0,0,0.4)' }}>
                    Powered by BappaCards
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Stats Bar ── */}
      <Box component="section" aria-label="Stats" sx={{ backgroundColor: '#EB1C24', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            {stats.map((stat) => (
              <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Features ── */}
      <Box component="section" aria-label="Features" sx={{ py: { xs: 10, md: 14 }, backgroundColor: '#fafafa' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography component="h2" variant="h2" sx={{ mb: 2, fontFamily: "'Poppins', serif" }}>
              Everything You Need to Network Smarter
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.6)', maxWidth: 600, mx: 'auto' }}>
              BappaCards combines the best sharing technology with analytics that turn every card exchange into a business opportunity.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature) => (
              <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 3, height: '100%', p: 1 }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 1.5, fontFamily: "'Poppins', serif", fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── How It Works ── */}
      <Box component="section" aria-label="How it works" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography component="h2" variant="h2" sx={{ mb: 2, fontFamily: "'Poppins', serif" }}>
              Up and Running in 3 Minutes
            </Typography>
          </Box>

          <Grid container spacing={5}>
            {[
              { step: '01', title: 'Create your card', desc: 'Add your name, photo, title, links, and socials. Design it to match your personal brand.' },
              { step: '02', title: 'Share with one tap', desc: 'Hand your NFC card to anyone. They tap, your profile loads. No app download required.' },
              { step: '03', title: 'Track and follow up', desc: 'See who viewed your card and when. Use analytics to prioritize your follow-ups.' },
            ].map((item) => (
              <Grid key={item.step} size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: '#EB1C24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif", fontSize: '1.1rem' }}>
                    {item.step}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ mb: 1.5, fontFamily: "'Poppins', serif", fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.7 }}>
                  {item.desc}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── FAQ ── */}
      <Box component="section" aria-label="FAQ" sx={{ py: { xs: 10, md: 14 }, backgroundColor: '#fafafa' }}>
        <Container maxWidth="md">
          <Typography component="h2" variant="h2" sx={{ mb: 6, textAlign: 'center', fontFamily: "'Poppins', serif" }}>
            Frequently Asked Questions
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {faqs.map((faq) => (
              <Box key={faq.q} sx={{ borderBottom: '1px solid rgba(0,0,0,0.08)', pb: 3 }}>
                <Typography variant="h6" component="h3" sx={{ mb: 1.5, fontFamily: "'Poppins', serif", fontWeight: 600 }}>
                  {faq.q}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>
                  {faq.a}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── CTA ── */}
      <Box
        component="section"
        aria-label="Call to action"
        sx={{
          py: { xs: 10, md: 14 },
          background: 'linear-gradient(135deg, #000 0%, #1a0002 100%)',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <Container maxWidth="sm">
          <Typography component="h2" variant="h2" sx={{ color: '#fff', mb: 3, fontFamily: "'Poppins', serif" }}>
            Ready to Ditch Paper Cards?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 5, fontSize: '1.1rem' }}>
            Join over 50,000 professionals who have upgraded to BappaCards. Free to start, no credit card required.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="https://bappacards.com/signup"
            sx={{
              backgroundColor: '#EB1C24',
              '&:hover': { backgroundColor: '#D71920' },
              px: 6,
              py: 2,
              fontSize: '1.05rem',
              boxShadow: '0 8px 24px rgba(235,28,36,0.4)',
            }}
          >
            Create Your Free Card
          </Button>
        </Container>
      </Box>
    </>
  );
}
