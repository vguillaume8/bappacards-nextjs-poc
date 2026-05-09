'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

interface Plan {
  title: string;
  subtitle: string;
  badge?: string;
  price: string;
  priceYearly?: string;
  period: string;
  periodYearly?: string;
  yearlyDiscount?: string;
  description: string;
  buttonText: string;
  footerText: string;
  featured?: boolean;
  darkBg?: boolean;
  headerBg: string;
  buttonBg: string;
  iconBg: string;
  iconColor: string;
  features: string[];
  href: string;
}

const plans: Plan[] = [
  {
    title: 'Bappa Standard',
    subtitle: 'For individuals getting started',
    price: 'Free',
    period: 'FOREVER',
    description:
      'Your professional identity, always on you. Share your contact details with a tap or scan. No paper, no app required on the other end.',
    buttonText: 'Start for Free',
    footerText: 'No credit card required',
    headerBg: 'linear-gradient(135deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.02) 100%)',
    buttonBg: 'linear-gradient(45deg, #EB1C24 30%, #ff3378 90%)',
    iconBg: 'rgba(235, 28, 36, 0.1)',
    iconColor: '#EB1C24',
    features: [
      'Unlimited digital card shares',
      'Custom branding options',
      'Social media integration',
    ],
    href: '/sign-up',
  },
  {
    title: 'Bappa Premium',
    subtitle: 'For professionals who need more',
    badge: '7-Day Free Trial',
    price: '$5',
    priceYearly: '$50',
    period: 'AFTER 7-DAY FREE TRIAL',
    periodYearly: 'PER YEAR, AFTER 7-DAY FREE TRIAL',
    yearlyDiscount: '17%',
    description:
      'Turn every connection into an insight. Premium unlocks advanced analytics, location-based tap tracking, and full profile customization.',
    buttonText: 'Start Free Trial',
    footerText: 'Try all premium features for 7 days free',
    headerBg: 'linear-gradient(135deg, #8B3DFF 0%, #A97FFF 100%)',
    buttonBg: 'linear-gradient(45deg, #8B3DFF 30%, #A97FFF 90%)',
    iconBg: 'rgba(139, 61, 255, 0.1)',
    iconColor: '#8B3DFF',
    features: [
      'Full Profile Customization – change fonts, colors, and layout',
      'Upload Videos as Your Background',
      'Verified Badge – build trust and credibility',
      'Apple Wallet Integration',
      'Contact Prioritization – tag contacts as High, Medium, or Low',
      'Link Analytics – track which links get the most engagement',
      'Tap Location Tracking',
      'City-Based Connection Mapping',
    ],
    href: '/sign-up',
  },
  {
    title: 'Bappa Premium Plus',
    subtitle: 'The full Bappa suite',
    badge: 'Best Value',
    price: '$12',
    priceYearly: '$120',
    period: 'PER MONTH',
    periodYearly: 'PER YEAR',
    yearlyDiscount: '17%',
    description:
      'Everything in Premium, plus BappaConnect — our AI-powered relationship management platform.',
    buttonText: 'Get Premium Plus',
    footerText: 'Includes BappaCards Premium + BappaConnect Pro',
    featured: true,
    headerBg: 'linear-gradient(135deg, #1a6b4a 0%, #2eb87a 100%)',
    buttonBg: 'linear-gradient(45deg, #1a6b4a 30%, #2eb87a 90%)',
    iconBg: 'rgba(26, 107, 74, 0.1)',
    iconColor: '#1a6b4a',
    features: [
      'Everything in Bappa Premium',
      'BappaConnect Pro — 2,500 Contacts CRM',
      'AI-Powered Contact Research',
      'Smart Email Drafting',
      'Automated Follow-Up Workflows',
      'Calendar Event Scheduling',
      'Contact Enrichment & Social Insights',
    ],
    href: '/sign-up',
  },
  {
    title: 'Bappa Enterprise',
    subtitle: 'For organizations requiring custom solutions',
    price: 'Contact Us',
    period: 'FOR CUSTOM PRICING',
    description:
      'Take control with a secure, customizable platform designed for large organizations. Manage teams, track ROI, and integrate seamlessly with your existing CRM.',
    buttonText: 'Contact Us',
    footerText: 'Custom enterprise-grade solutions',
    darkBg: true,
    headerBg: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%)',
    buttonBg: 'white',
    iconBg: 'rgba(255,255,255,0.1)',
    iconColor: 'white',
    features: [
      'Team admin dashboard',
      'Advanced analytics',
      'Branded card templates',
      'Contact management system',
      'Custom integrations',
    ],
    href: '/contact',
  },
];

export default function PricingClient() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const getPrice = (plan: Plan) => {
    if (
      (plan.title === 'Bappa Premium' || plan.title === 'Bappa Premium Plus') &&
      billingPeriod === 'yearly'
    ) {
      return plan.priceYearly ?? plan.price;
    }
    return plan.price;
  };

  const getPeriod = (plan: Plan) => {
    if (
      (plan.title === 'Bappa Premium' || plan.title === 'Bappa Premium Plus') &&
      billingPeriod === 'yearly'
    ) {
      return plan.periodYearly ?? plan.period;
    }
    return plan.period;
  };

  const showYearlySavings = (plan: Plan) =>
    (plan.title === 'Bappa Premium' || plan.title === 'Bappa Premium Plus') &&
    billingPeriod === 'yearly';

  return (
    <Box
      sx={{
        bgcolor: '#f5f5f5',
        pt: 8,
        pb: 16,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f6f6f8 0%, #f0f0f5 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#EB1C24',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              mb: 2,
            }}
          >
            Pricing
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 3,
            }}
          >
            Plans for Professionals at Every Scale
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666',
              maxWidth: '800px',
              mx: 'auto',
              mb: 2,
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Choose the perfect plan that fits your needs — whether you&apos;re an individual
            professional, growing team, or enterprise organization.
          </Typography>
        </Box>

        {/* Billing Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            {(['monthly', 'yearly'] as const).map((period) => (
              <Box
                key={period}
                onClick={() => setBillingPeriod(period)}
                sx={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: billingPeriod === period ? 700 : 500,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background:
                    billingPeriod === period
                      ? 'linear-gradient(135deg, #EB1C24 0%, #ff3378 100%)'
                      : 'transparent',
                  color: billingPeriod === period ? 'white' : '#666',
                  boxShadow:
                    billingPeriod === period ? '0 4px 12px rgba(235,28,36,0.25)' : 'none',
                  position: 'relative',
                  '&:hover': {
                    color: billingPeriod === period ? 'white' : '#EB1C24',
                  },
                }}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
                {period === 'yearly' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: 'linear-gradient(135deg, #dc004e 0%, #ff3378 100%)',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      padding: '2px 8px',
                      borderRadius: '8px',
                    }}
                  >
                    2 months free
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Plans Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: { xs: 4, md: 3 },
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan) => (
            <Box
              key={plan.title}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '24px',
                background: plan.darkBg
                  ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%)'
                  : 'white',
                overflow: 'hidden',
                boxShadow: plan.darkBg
                  ? '0 15px 50px rgba(0,0,0,0.15)'
                  : '0 15px 50px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                border: plan.darkBg ? 'none' : '1px solid rgba(0,0,0,0.03)',
                transform: plan.featured ? { xs: 'scale(1)', md: 'scale(1.03)' } : 'scale(1)',
                zIndex: plan.featured ? 1 : 0,
                '&:hover': {
                  transform: plan.featured
                    ? { xs: 'scale(1)', md: 'scale(1.05)' }
                    : 'translateY(-8px)',
                  boxShadow: plan.darkBg
                    ? '0 25px 60px rgba(0,0,0,0.2)'
                    : '0 25px 60px rgba(0,0,0,0.1)',
                },
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  p: 4,
                  borderBottom: plan.darkBg
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid rgba(0,0,0,0.05)',
                  background: plan.headerBg,
                }}
              >
                {plan.badge && (
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      mb: 2,
                    }}
                  >
                    {plan.badge}
                  </Box>
                )}
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: plan.featured || plan.darkBg || plan.badge ? 'white' : '#0f0f23',
                    mb: 1,
                  }}
                >
                  {plan.title}
                </Typography>
                <Typography
                  sx={{
                    color: plan.featured || plan.badge ? 'white' : '#EB1C24',
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  {plan.subtitle}
                </Typography>
              </Box>

              {/* Body */}
              <Box
                sx={{
                  p: 4,
                  flexGrow: 1,
                  bgcolor: plan.featured ? 'white' : 'transparent',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1rem',
                    color: plan.darkBg ? 'rgba(255,255,255,0.8)' : '#333',
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  {plan.description}
                </Typography>

                <Box sx={{ mb: 4 }}>
                  {plan.features.map((feature) => (
                    <Box
                      key={feature}
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: plan.iconBg,
                          color: plan.iconColor,
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          flexShrink: 0,
                          mt: 0.25,
                        }}
                      >
                        ✓
                      </Box>
                      <Typography
                        sx={{
                          color: plan.darkBg ? 'rgba(255,255,255,0.8)' : '#333',
                          fontSize: '0.9rem',
                          lineHeight: 1.4,
                        }}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Footer with price + CTA */}
              <Box
                sx={{
                  p: 4,
                  pt: 0,
                  mt: 'auto',
                  bgcolor: plan.featured ? 'white' : 'transparent',
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography
                    sx={{
                      fontSize: '3rem',
                      fontWeight: 700,
                      color: plan.darkBg ? 'white' : '#0f0f23',
                      lineHeight: 1,
                    }}
                  >
                    {getPrice(plan)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: plan.darkBg ? 'rgba(255,255,255,0.7)' : '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      mt: 0.5,
                    }}
                  >
                    {getPeriod(plan)}
                  </Typography>
                  {showYearlySavings(plan) && plan.yearlyDiscount && (
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        color: '#EB1C24',
                        fontWeight: 600,
                        mt: 1,
                      }}
                    >
                      Save {plan.yearlyDiscount} compared to monthly
                    </Typography>
                  )}
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  href={plan.href}
                  sx={{
                    background: plan.buttonBg,
                    color: plan.darkBg ? '#0f0f23' : 'white',
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    '&:hover': { opacity: 0.9, transform: 'translateY(-2px)' },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {plan.buttonText}
                </Button>

                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    color: plan.darkBg ? 'rgba(255,255,255,0.6)' : '#666',
                    textAlign: 'center',
                    mt: 2,
                  }}
                >
                  {plan.footerText}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
