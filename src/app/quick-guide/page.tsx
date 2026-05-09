import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quick Start Guide — BappaCards',
  description:
    'Get your BappaCards digital business card set up in 5 minutes. Quick start guide with step-by-step instructions.',
  alternates: { canonical: 'https://bappacards.com/quick-guide' },
  openGraph: {
    title: 'BappaCards Quick Start Guide',
    description:
      'Get your BappaCards digital business card set up in 5 minutes. Quick start guide with step-by-step instructions.',
    url: 'https://bappacards.com/quick-guide',
  },
};

const steps = [
  {
    number: '01',
    title: 'Create Your Free Profile',
    description:
      'Go to bappacards.com/sign-up and create your account. Sign up with Google for instant access, or use your email address. No credit card required.',
    tip: 'Use Google sign-in for the fastest experience — one click and you\'re in.',
  },
  {
    number: '02',
    title: 'Set Up Your Info',
    description:
      'Navigate to the Personal Info tab and fill in your First Name, Last Name, professional Title, Email, and Phone number. This is what contacts will see on your card.',
    tip: 'Your Title is prime real estate — make it specific: "Senior Sales Director at Acme Corp" beats just "Sales."',
  },
  {
    number: '03',
    title: 'Add Photo & Media',
    description:
      'Go to the Media tab and upload a professional headshot. Use a square image (1:1 ratio) at least 400×400px for best quality. Optionally add a cover image to brand your card.',
    tip: 'Good lighting and a clean background make a massive difference. Even a phone selfie works if the lighting is right.',
  },
  {
    number: '04',
    title: 'Add Your Links',
    description:
      'Head to the Social Media tab and add your Website, Instagram, LinkedIn, TikTok, and any payment links (Venmo, Cash App). Drag to reorder — put your most important link first.',
    tip: 'Add a Calendly or booking link to let people schedule meetings directly from your card.',
  },
  {
    number: '05',
    title: 'Share Your Card',
    description:
      'Your card is live! Share it 3 ways: (1) NFC tap — hold your BappaCard to any iPhone or Android, (2) QR code — let someone scan your screen or a printed copy, (3) Direct link — text or email your profile URL.',
    tip: 'Recipients never need to download an app to view your card.',
  },
];

const proTips = [
  {
    title: 'Keep it current',
    description: 'Update your card whenever you change jobs, numbers, or launch a new project. Changes appear instantly everywhere your link has been shared.',
  },
  {
    title: 'Enable Contact Exchange',
    description: 'Turn on Contact Exchange in Settings to prompt viewers to share their contact info when they view your card. Great for lead generation at events.',
  },
  {
    title: 'Check your analytics',
    description: 'Visit the Analytics tab weekly to see who\'s engaging with your card and which links get the most clicks.',
  },
  {
    title: 'Print your QR code',
    description: 'Add your QR code to your email signature, slide decks, and printed materials so people can always find your digital card.',
  },
];

export default function QuickGuidePage() {
  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #EB1C24 0%, #8B0000 100%)',
          color: '#fff',
          py: { xs: 10, md: 14 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
          >
            Quick Start Guide
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85, fontWeight: 400, mb: 2 }}>
            Set up your BappaCards digital business card in 5 minutes
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            No app download required for recipients. Works on every smartphone.
          </Typography>
        </Container>
      </Box>

      {/* Steps */}
      <Box sx={{ py: { xs: 8, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 8, textAlign: 'center' }}
          >
            5 Steps to Your Digital Business Card
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {steps.map((step, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  gap: { xs: 3, md: 5 },
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'flex-start' },
                }}
              >
                <Box
                  sx={{
                    minWidth: { xs: 'auto', sm: 80 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: '#EB1C24',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      fontFamily: "'Poppins', serif",
                    }}
                  >
                    {step.number}
                  </Box>
                  {i < steps.length - 1 && (
                    <Box
                      sx={{
                        width: 2,
                        height: { xs: 0, sm: 40 },
                        backgroundColor: 'rgba(235,28,36,0.2)',
                        mt: 1,
                        display: { xs: 'none', sm: 'block' },
                      }}
                    />
                  )}
                </Box>

                <Card
                  elevation={0}
                  sx={{
                    flex: 1,
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography
                      variant="h5"
                      sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2 }}
                    >
                      {step.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.8, mb: 2 }}>
                      {step.description}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: 'rgba(235,28,36,0.05)',
                        borderLeft: '3px solid #EB1C24',
                        px: 2,
                        py: 1.5,
                        borderRadius: '0 8px 8px 0',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#EB1C24', fontWeight: 500 }}>
                        Pro tip: {step.tip}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Pro Tips */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 6, textAlign: 'center' }}
          >
            Pro Tips for Maximum Impact
          </Typography>
          <Grid container spacing={3}>
            {proTips.map((tip, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 4,
                        backgroundColor: '#EB1C24',
                        borderRadius: 2,
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Poppins', serif", fontWeight: 600, mb: 1.5 }}
                    >
                      {tip.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>
                      {tip.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2 }}
          >
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7, mb: 5 }}>
            Create your digital business card in under 5 minutes. Free to start.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button

              href="/sign-up"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#EB1C24',
                color: '#fff',
                fontWeight: 700,
                px: 5,
                py: 1.5,
                '&:hover': { backgroundColor: '#D71920' },
              }}
            >
              Create Your Free Card
            </Button>
            <Button

              href="/guide"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.4)',
                color: '#fff',
                fontWeight: 700,
                px: 5,
                py: 1.5,
                '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.05)' },
              }}
            >
              Full User Guide
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
