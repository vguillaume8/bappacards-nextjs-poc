'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Link from 'next/link';
import { useAuth } from '@/context/AuthProvider';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select the text
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleCopy}
      sx={{
        borderColor: '#EB1C24',
        color: '#EB1C24',
        '&:hover': { borderColor: '#D71920', backgroundColor: 'rgba(235,28,36,0.05)' },
      }}
    >
      {copied ? 'Copied!' : 'Copy Link'}
    </Button>
  );
}

export default function AffiliateContent() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);

  const handleApply = async () => {
    if (!currentUser) {
      router.push('/signup?redirect=/become-an-affiliate');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/affiliates/apply`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const link = data?.referralLink ?? data?.link;
      if (!link) {
        throw new Error('Affiliate account created but no referral link was returned. Please contact support@bappacards.com.');
      }
      setReferralLink(link);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (referralLink) {
    return (
      <Box sx={{ py: { xs: 10, md: 16 }, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              backgroundColor: '#EB1C24',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              fontSize: '2rem',
            }}
          >
            ✓
          </Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2 }}
          >
            You&apos;re an Affiliate!
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.65)', mb: 5 }}>
            Your unique referral link is ready. Share it anywhere and earn 20% commission on every confirmed sale.
          </Typography>

          <Box
            sx={{
              backgroundColor: '#F8F8F8',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 2,
              px: 3,
              py: 2,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Typography
              variant="body2"
              sx={{ flex: 1, fontFamily: 'monospace', wordBreak: 'break-all', color: 'rgba(0,0,0,0.75)' }}
            >
              {referralLink}
            </Typography>
            <CopyButton text={referralLink} />
          </Box>

          <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)', mt: 3 }}>
            Track your earnings and referrals in your account dashboard.
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
          color: '#fff',
          py: { xs: 10, md: 14 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="p"
            variant="overline"
            sx={{ color: '#EB1C24', letterSpacing: 4, mb: 2 }}
          >
            AFFILIATE PROGRAM
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
          >
            Earn with BappaCards
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 400, mb: 2 }}>
            Share your referral link. Earn 20% commission on every sale.
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.6 }}>
            Instant access. No approval required. Start earning today.
          </Typography>
        </Container>
      </Box>

      {/* Perks */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              {
                title: 'Your Unique Link',
                description: 'Get a personal referral link the moment you sign up. Share it in content, social posts, emails, or anywhere your audience hangs out.',
              },
              {
                title: '20% Commission',
                description: 'Earn 20% on every card sale you refer — $14 per Bappa Custom, $20 per Bappa Platinum. Commissions increase as you hit sales milestones.',
              },
              {
                title: 'Track Everything',
                description: 'See your clicks, conversions, and earnings in your affiliate dashboard. Know what\'s working and optimize accordingly.',
              },
            ].map((perk, i) => (
              <Grid key={i} size={{ xs: 12, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    textAlign: 'center',
                    '&:hover': { boxShadow: '0 6px 24px rgba(0,0,0,0.08)' },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(235,28,36,0.1)',
                        mx: 'auto',
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: '#EB1C24',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 1.5 }}
                    >
                      {perk.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>
                      {perk.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Card */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="sm">
          <Card
            elevation={0}
            sx={{
              border: '2px solid rgba(0,0,0,0.1)',
              borderRadius: 4,
              textAlign: 'center',
              overflow: 'visible',
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <Typography
                variant="h5"
                sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2 }}
              >
                Become an Affiliate
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.65)', mb: 4, lineHeight: 1.7 }}>
                {currentUser
                  ? 'Click below to activate your affiliate account and get your referral link instantly.'
                  : 'Sign in or create an account to get your referral link. It only takes a minute.'}
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                  {error}
                </Alert>
              )}

              <Button
                variant="contained"
                size="large"
                onClick={handleApply}
                disabled={loading}
                fullWidth
                sx={{
                  backgroundColor: '#EB1C24',
                  color: '#fff',
                  fontWeight: 700,
                  py: 1.75,
                  fontSize: '1rem',
                  '&:hover': { backgroundColor: '#D71920' },
                  '&.Mui-disabled': { backgroundColor: 'rgba(235,28,36,0.5)', color: '#fff' },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: '#fff' }} />
                ) : currentUser ? (
                  'Activate My Affiliate Account'
                ) : (
                  'Sign In to Get Started'
                )}
              </Button>

              {!currentUser && (
                <Typography variant="body2" sx={{ mt: 2, color: 'rgba(0,0,0,0.5)' }}>
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/signup?redirect=/become-an-affiliate"
                    style={{ color: '#EB1C24', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Sign up free
                  </Link>
                </Typography>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Want more context link to Partners */}
      <Box sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)', mb: 2 }}>
            Looking for a deeper partnership with tiered commissions and brand-level benefits?
          </Typography>
          <Button
            href="/partners"
            variant="outlined"
            sx={{
              borderColor: 'rgba(0,0,0,0.2)',
              color: 'rgba(0,0,0,0.7)',
              '&:hover': { borderColor: '#EB1C24', color: '#EB1C24' },
            }}
          >
            Learn about the Brand Partner Program
          </Button>
        </Container>
      </Box>
    </>
  );
}
