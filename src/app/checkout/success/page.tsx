'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  TextField,
  Snackbar,
} from '@mui/material';
import {
  CheckCircle,
  ContactMail,
  Analytics,
  QrCode2,
  Palette,
  TrendingUp,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import { useAuth } from '@/context/AuthProvider';
import { sendContactUs, getCheckoutSession } from '@/lib/api';
import { withReferralCode } from '@/lib/referral';
import { PRODUCT_NAMES } from '@/lib/products';

const PREMIUM_FEATURES = [
  { icon: <ContactMail sx={{ fontSize: 40 }} />, title: 'Digital Business Card', description: 'NFC and QR code enabled card for instant sharing' },
  { icon: <Analytics sx={{ fontSize: 40 }} />, title: 'Analytics & Insights', description: 'Track views, taps, and engagement on your profile' },
  { icon: <ContactMail sx={{ fontSize: 40 }} />, title: 'Contact Management', description: 'Organize and manage all your networking contacts' },
  { icon: <Palette sx={{ fontSize: 40 }} />, title: 'Profile Customization', description: 'Customize your digital profile with your brand' },
  { icon: <TrendingUp sx={{ fontSize: 40 }} />, title: 'Lead Capture', description: 'Capture leads and build your network effortlessly' },
  { icon: <QrCode2 sx={{ fontSize: 40 }} />, title: 'QR Code Generator', description: 'Generate custom QR codes for any occasion' },
];

interface StripeSession {
  id: string;
  payment_status?: string;
  customer_email?: string;
  amount_total?: number;
  currency?: string;
  metadata?: Record<string, string>;
}

function isStripeSession(obj: unknown): obj is StripeSession {
  return typeof obj === 'object' && obj !== null && 'id' in obj && typeof (obj as Record<string, unknown>).id === 'string';
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sessionValid, setSessionValid] = useState<boolean | null>(null);
  const [sessionData, setSessionData] = useState<StripeSession | null>(null);

  const sessionId = searchParams.get('session_id');
  const productType = searchParams.get('product');
  const affiliateCode = searchParams.get('via');

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        setSessionValid(false);
        setLoading(false);
        return;
      }
      try {
        const res = await getCheckoutSession(sessionId);
        if ('data' in res && isStripeSession(res.data)) {
          setSessionData(res.data);
          setSessionValid(true);
        } else {
          setSessionValid(false);
        }
      } catch {
        setSessionValid(false);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, [sessionId]);

  const getProductName = () => PRODUCT_NAMES[productType ?? ''] || 'Premium Business Card';

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setNotification({ show: true, message: 'Please fill in all fields', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    try {
      await sendContactUs({
        name: contactForm.name,
        email: contactForm.email,
        concern: `Order Support - Session: ${sessionId}`,
        message: contactForm.message,
      });
      setNotification({ show: true, message: "Message sent! We'll get back to you within 24–48 hours.", type: 'success' });
      setContactForm({ name: '', email: '', message: '' });
    } catch {
      setNotification({ show: true, message: 'Failed to send message. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (sessionValid === false) {
    return (
      <Container maxWidth="sm" sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>Invalid or Missing Order</Typography>
          <Typography variant="body2">We could not verify this order. If you completed a purchase, please check your email for a confirmation, or contact support.</Typography>
        </Alert>
        <Button variant="contained" component={Link} href="/" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
          Return to Home
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          mt: { xs: '64px', md: '80px' },
          '&::before': {
            content: '""', position: 'absolute', inset: 0,
            backgroundImage: 'url(/logoletterhedblk.png)',
            backgroundPosition: 'center', backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat', opacity: 0.08, zIndex: 0,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 100, height: 100, borderRadius: '50%',
              bgcolor: 'rgba(235,28,36,0.2)', border: '4px solid #EB1C24', mb: 3,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.05)', opacity: 0.9 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          >
            <CheckCircle sx={{ fontSize: 60, color: '#EB1C24' }} />
          </Box>

          <Typography variant="h1" component="h1" sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' }, color: '#FFF' }}>
            Thank You for Your Order!
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "'Lato',sans-serif", mb: 4, maxWidth: 600, mx: 'auto', color: 'rgba(255,255,255,0.9)' }}>
            Your {getProductName()} order has been received and is being processed
          </Typography>
          {sessionId && (
            <Chip
              label={`Order ID: ${sessionId.slice(-12)}`}
              sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '0.9rem', px: 2, py: 2.5, borderRadius: '8px' }}
            />
          )}
          {sessionData?.customer_email && (
            <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}>
              Confirmation sent to {sessionData.customer_email}
            </Typography>
          )}
        </Container>
      </Box>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={4}>
          {/* Next Steps */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h4" sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, mb: 3 }}>
                  What Happens Next?
                </Typography>

                <Alert severity="info" sx={{ mb: 3, borderRadius: '12px' }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>Confirmation Email Sent</Typography>
                  <Typography variant="body2">We've sent a confirmation email with your order details. Please check your inbox (and spam folder).</Typography>
                </Alert>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[
                    { n: 1, title: 'Order Processing', body: 'Your custom business card design is being prepared by our production team.' },
                    {
                      n: 2, title: 'Create Your BappaCards Account',
                      body: currentUser
                        ? 'Great! You already have an account. Access your dashboard to manage your profile and start networking.'
                        : 'Create your free account to activate your digital profile and access premium features.',
                      cta: !currentUser,
                    },
                    { n: 3, title: 'Upgrade to Premium (7-Day Free Trial)', body: 'Click "Upgrade Now" in your dashboard to activate your complimentary 7-day trial of Bappa Premium and unlock all features!' },
                    { n: 4, title: 'Card Production & Delivery', body: 'Your cards will be manufactured and shipped within 3–5 business days. You\'ll receive tracking information via email.' },
                  ].map((step, i) => (
                    <React.Fragment key={step.n}>
                      {i > 0 && <Divider />}
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#EB1C24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem', flexShrink: 0 }}>
                          {step.n}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, mb: 1 }}>{step.title}</Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, mb: step.cta ? 2 : 0 }}>{step.body}</Typography>
                          {step.cta && (
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                              <Button variant="contained" startIcon={<SignupIcon />} component={Link} href={withReferralCode('/sign-up')}
                                sx={{ bgcolor: '#EB1C24', borderRadius: '12px', textTransform: 'none', fontWeight: 600 }}>
                                Sign Up
                              </Button>
                              <Button variant="outlined" startIcon={<LoginIcon />} component={Link} href="/log-in"
                                sx={{ borderColor: '#EB1C24', color: '#EB1C24', borderRadius: '12px', textTransform: 'none', fontWeight: 600 }}>
                                Log In
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </React.Fragment>
                  ))}
                </Box>

                {currentUser && (
                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Button variant="contained" size="large" startIcon={<DashboardIcon />}
                      onClick={() => router.push('/dashboard')}
                      sx={{ bgcolor: '#EB1C24', borderRadius: '12px', py: 1.5, px: 4, textTransform: 'none', fontWeight: 600, fontSize: '1.1rem' }}>
                      Go to Dashboard
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '2px solid #EB1C24' }}>
              <Box sx={{ bgcolor: '#EB1C24', color: 'white', p: 3, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700 }}>Order Summary</Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Product</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>{getProductName()}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Status</Typography>
                <Chip label="Processing" color="primary" sx={{ fontWeight: 600, borderRadius: '8px' }} />

                {affiliateCode && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Referral Code</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{affiliateCode}</Typography>
                  </>
                )}

                {/* Contact form */}
                <Box sx={{ bgcolor: '#f5f5f5', borderRadius: '12px', p: 2, mt: 3 }}>
                  <Typography variant="h6" sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, mb: 2, fontSize: '1rem' }}>Need Help?</Typography>
                  <form onSubmit={handleContactSubmit}>
                    <TextField fullWidth size="small" name="name" label="Your Name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} sx={{ mb: 2 }} required />
                    <TextField fullWidth size="small" name="email" label="Email" type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} sx={{ mb: 2 }} required />
                    <TextField fullWidth size="small" name="message" label="Message" multiline rows={3} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} sx={{ mb: 2 }} required />
                    <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}
                      sx={{ bgcolor: '#EB1C24', borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}>
                      {isSubmitting ? <CircularProgress size={24} /> : 'Send Message'}
                    </Button>
                  </form>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
                    Response time: 24–48 hours
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Premium Features */}
      <Box sx={{ bgcolor: '#f8f9fa', py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontFamily: "'Poppins',sans-serif", textAlign: 'center', fontWeight: 700, mb: 2 }}>
            Your Bappa Premium Benefits
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#555', mb: 6, maxWidth: 700, mx: 'auto' }}>
            Your purchase includes access to our full suite of premium networking tools
          </Typography>
          <Grid container spacing={3}>
            {PREMIUM_FEATURES.map((feature, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Card sx={{ height: '100%', borderRadius: '12px', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(235,28,36,0.1)', color: '#EB1C24', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, mb: 1.5 }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA for non-logged-in users */}
      {!currentUser && (
        <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: '#000', color: '#FFF', textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography variant="h3" component="h2" sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, mb: 3, fontSize: { xs: '2rem', md: '2.5rem' }, color: '#FFF' }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: "'Lato',sans-serif", fontWeight: 400, mb: 4, opacity: 0.9 }}>
              Create your account now to set up your digital profile and be ready when your cards arrive
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="contained" size="large" startIcon={<SignupIcon />}
                component={Link} href={withReferralCode('/sign-up')}
                sx={{ bgcolor: '#EB1C24', borderRadius: '12px', py: 2, px: 5, fontSize: '1.1rem', textTransform: 'none', fontWeight: 600 }}>
                Create Account
              </Button>
              <Button variant="outlined" size="large" startIcon={<LoginIcon />}
                component={Link} href="/log-in"
                sx={{ color: '#FFF', borderColor: '#FFF', borderWidth: '2px', '&:hover': { borderColor: '#EB1C24', borderWidth: '2px' }, borderRadius: '12px', py: 2, px: 5, fontSize: '1.1rem', textTransform: 'none', fontWeight: 600 }}>
                Log In
              </Button>
            </Box>
            <Alert severity="success" sx={{ mt: 4, borderRadius: '12px', bgcolor: 'rgba(235,28,36,0.1)', border: '2px solid rgba(235,28,36,0.3)', '& .MuiAlert-icon': { color: '#EB1C24' } }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, color: '#FFF' }}>
                🎉 Activate Your Complimentary 7-Day Premium Trial
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                After signing up, click <strong>&ldquo;Upgrade Now&rdquo;</strong> in your dashboard to start your complimentary 7-day trial of Bappa Premium and unlock all features!
              </Typography>
            </Alert>
          </Container>
        </Box>
      )}

      <Snackbar
        open={notification.show}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, show: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setNotification({ ...notification, show: false })} severity={notification.type} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
