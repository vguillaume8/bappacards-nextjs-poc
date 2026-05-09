'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';

const CONNECT_URL = 'https://connect.bappacards.com';

const features = [
  {
    title: 'Contact Management',
    description: 'Organize every connection you make. Add notes, tags, and follow-up reminders so no relationship falls through the cracks.',
  },
  {
    title: 'Relationship Intelligence',
    description: 'Track how you met, when you last connected, and what matters to them. Build genuine relationships with context at your fingertips.',
  },
  {
    title: 'Team Networking',
    description: 'Share contact insights across your team. When one person connects, everyone benefits from the relationship context.',
  },
  {
    title: 'Seamless with BappaCards',
    description: 'Contacts who exchange info via your BappaCard flow directly into Bappa Connect. Zero manual data entry required.',
  },
  {
    title: 'Pipeline & Opportunities',
    description: 'Track deals and opportunities tied to your network. Know which relationships are driving revenue and which need nurturing.',
  },
  {
    title: 'Automated Follow-ups',
    description: 'Set smart reminders to follow up at the right time. Never miss an opportunity because you forgot to reach out.',
  },
];

const platformSteps = [
  { label: 'Cards', description: 'Share your BappaCard — NFC tap, QR scan, or direct link', color: '#EB1C24' },
  { label: 'Connect', description: 'Contacts flow automatically into your CRM', color: '#000' },
  { label: 'Teams', description: 'Share insights across your entire organization', color: '#333' },
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with core CRM features',
    features: ['Up to 100 contacts', 'Basic contact management', 'BappaCards integration', 'Mobile app access'],
    cta: 'Get Started Free',
    href: '/signup',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$5',
    period: '/month',
    description: 'For professionals who network seriously',
    features: ['Unlimited contacts', 'Relationship intelligence', 'Pipeline tracking', 'Automated follow-ups', 'Advanced analytics'],
    cta: 'Start Free Trial',
    href: '/signup',
    highlight: true,
  },
  {
    name: 'Premium Plus',
    price: '$12',
    period: '/month',
    description: 'For teams and power users',
    features: ['Everything in Premium', 'Team sharing & collaboration', 'Custom fields & tags', 'API access', 'Priority support'],
    cta: 'Start Free Trial',
    href: '/signup',
    highlight: false,
  },
];

export default function BappaConnectContent() {
  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
          color: '#fff',
          py: { xs: 10, md: 16 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="p"
            variant="overline"
            sx={{ color: '#EB1C24', letterSpacing: 4, mb: 2 }}
          >
            BAPPA CONNECT
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
          >
            CRM Built for Networkers
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 400, mb: 6, maxWidth: 600, mx: 'auto' }}>
            Manage contacts, track relationships, and grow your pipeline — all connected to your BappaCards digital business card.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              href="/signup"
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
              Get Started Free
            </Button>
            <Button
              href={CONNECT_URL}
              target="_blank"
              rel="noopener noreferrer"
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
              Go to Bappa Connect
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Platform Bridge */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            Your Complete Professional Network Platform
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center', mb: 8 }}>
            From first tap to lasting relationship — all in one connected ecosystem
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 2, md: 4 }, flexWrap: 'wrap' }}>
            {platformSteps.map((step, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: step.color,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 1.5,
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', fontFamily: "'Poppins', serif" }}>
                      {step.label}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', maxWidth: 120, textAlign: 'center', fontSize: '0.75rem' }}>
                    {step.description}
                  </Typography>
                </Box>
                {i < platformSteps.length - 1 && (
                  <Box
                    sx={{
                      color: '#EB1C24',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    →
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            Everything You Need to Manage Your Network
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center', mb: 6 }}>
            Built specifically for how networkers actually work
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    '&:hover': { boxShadow: '0 6px 24px rgba(0,0,0,0.09)', borderColor: 'rgba(235,28,36,0.2)' },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ width: 40, height: 4, backgroundColor: '#EB1C24', borderRadius: 2, mb: 2 }} />
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Poppins', serif", fontWeight: 600, mb: 1.5 }}
                    >
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

      {/* Pricing */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            Simple, Transparent Pricing
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center', mb: 6 }}>
            Start free. Upgrade when you need more.
          </Typography>
          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            {plans.map((plan, i) => (
              <Grid key={i} size={{ xs: 12, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: plan.highlight ? '2px solid #EB1C24' : '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'visible',
                  }}
                >
                  {plan.highlight && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -14,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#EB1C24',
                        color: '#fff',
                        px: 2,
                        py: 0.5,
                        borderRadius: 10,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Most Popular
                    </Box>
                  )}
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography variant="h6" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700 }}>
                      {plan.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, my: 1.5 }}>
                      <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: "'Poppins', serif", color: plan.highlight ? '#EB1C24' : 'inherit' }}>
                        {plan.price}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)' }}>
                        {plan.period}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', mb: 3 }}>
                      {plan.description}
                    </Typography>
                    <Box component="ul" sx={{ pl: 0, listStyle: 'none', flex: 1, mb: 3 }}>
                      {plan.features.map((f, j) => (
                        <Box key={j} component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#EB1C24', flexShrink: 0 }} />
                          <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.75)' }}>{f}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      href={plan.href}
                      variant={plan.highlight ? 'contained' : 'outlined'}
                      fullWidth
                      sx={
                        plan.highlight
                          ? {
                              backgroundColor: '#EB1C24',
                              color: '#fff',
                              fontWeight: 700,
                              py: 1.5,
                              '&:hover': { backgroundColor: '#D71920' },
                            }
                          : {
                              borderColor: 'rgba(0,0,0,0.2)',
                              color: 'rgba(0,0,0,0.8)',
                              fontWeight: 700,
                              py: 1.5,
                              '&:hover': { borderColor: '#EB1C24', color: '#EB1C24' },
                            }
                      }
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.4)', textAlign: 'center', mt: 4 }}>
            Need a custom Enterprise plan?{' '}
            <Link href="/contact" style={{ color: '#EB1C24', textDecoration: 'none', fontWeight: 600 }}>
              Contact us
            </Link>{' '}
            for tailored pricing.
          </Typography>
        </Container>
      </Box>

      {/* Final CTA */}
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
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
          >
            Ready to turn connections into relationships?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7, mb: 5 }}>
            Join thousands of professionals using Bappa Connect to manage their network.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              href="/signup"
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
              Get Started Free
            </Button>
            <Button
              href={CONNECT_URL}
              target="_blank"
              rel="noopener noreferrer"
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
              Go to Bappa Connect
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
