'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import { Google, Visibility, VisibilityOff, Fingerprint } from '@mui/icons-material';
import type { User } from 'firebase/auth';
import { useAuth } from '@/context/AuthProvider';
import { getAuthMe, createGmailUser } from '@/lib/api';

function getReferralCode(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  return sessionStorage.getItem('referral_code') ?? undefined;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'error' | 'warning' | 'success' | 'info'>('info');
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false);
  const [verificationCooldown, setVerificationCooldown] = useState(0);
  const [unverifiedUser, setUnverifiedUser] = useState<User | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const redirectParam = searchParams.get('redirect');

  const { signInUser, sendVerification, signInWithGoogle, getGoogleRedirectResult } = useAuth();

  const getPostLoginDest = () => {
    if (redirectParam) return redirectParam;
    if (cardId) return `/unregistered-card?cardId=${cardId}`;
    return '/dashboard';
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await getGoogleRedirectResult();
        if (!result || cancelled) return;
        const user = result.user;
        setIsLoading(true);
        try {
          const backendUser = await getAuthMe(await user.getIdToken());
          if (backendUser?.id) {
            router.replace(getPostLoginDest());
            return;
          }
          const referralCode = getReferralCode();
          const response = await createGmailUser(user.email ?? '', referralCode, user.displayName ?? '');
          if (!('data' in response)) {
            setAlertMessage('An error occurred completing your sign-in. Please try again.');
            setAlertSeverity('error');
          } else {
            router.replace(getPostLoginDest());
          }
        } catch {
          setAlertMessage('Error connecting to backend service');
          setAlertSeverity('error');
        } finally {
          if (!cancelled) setIsLoading(false);
        }
      } catch {
        // No redirect result — normal page load
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (verificationCooldown <= 0) return;
    const timer = setTimeout(() => setVerificationCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [verificationCooldown]);

  const handleSendVerification = async () => {
    if (!unverifiedUser || verificationCooldown > 0) return;
    try {
      await sendVerification(unverifiedUser);
      setVerificationCooldown(30);
      setAlertMessage('Verification email sent! Please check your inbox.');
      setAlertSeverity('success');
      setTimeout(() => setOpenVerificationDialog(false), 2000);
    } catch (error) {
      const err = error as { code?: string };
      if (err.code === 'auth/too-many-requests') {
        setAlertMessage('Too many requests. Please wait a moment and try again.');
        setAlertSeverity('error');
        setVerificationCooldown(60);
      } else {
        setAlertMessage('Failed to send verification email. Please try again.');
        setAlertSeverity('error');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch {
      setAlertMessage('Google sign-in failed. Please try again.');
      setAlertSeverity('error');
      setIsLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertMessage('Please enter both email and password');
      setAlertSeverity('error');
      return;
    }
    try {
      setIsLoading(true);
      const credentials = await signInUser(email, password);
      if (!credentials.user.emailVerified) {
        setUnverifiedUser(credentials.user);
        setOpenVerificationDialog(true);
        setAlertMessage('Your email is not verified. Please verify your email to continue.');
        setAlertSeverity('warning');
        setIsLoading(false);
        return;
      }
      const token = await credentials.user.getIdToken();
      await getAuthMe(token);
      router.replace(getPostLoginDest());
    } catch (error) {
      const err = error as { message?: string; code?: string };
      const msg =
        err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password'
          ? 'Invalid email or password'
          : (err.message ?? 'An error occurred during login');
      setAlertMessage(msg);
      setAlertSeverity('error');
    } finally {
      setIsLoading(false);
    }
  };

  const fieldSx = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(0,0,0,0.02)',
      transition: 'all 0.3s ease',
      '& fieldset': { borderColor: 'rgba(0,0,0,0.15)', borderWidth: '2px' },
      '&:hover': { backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', '& fieldset': { borderColor: 'rgba(235,28,36,0.4)' } },
      '&.Mui-focused': { backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(235,28,36,0.12)', '& fieldset': { borderColor: '#EB1C24', borderWidth: '2px' } },
    },
    '& .MuiInputLabel-root': { fontFamily: "'Lato', sans-serif", fontSize: '1rem', '&.Mui-focused': { color: '#EB1C24' } },
    '& .MuiOutlinedInput-input': { fontFamily: "'Lato', sans-serif", fontSize: '1rem', padding: '16px 14px' },
  };

  const btnSx = {
    py: 1.75,
    backgroundColor: '#EB1C24',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    textTransform: 'none' as const,
    boxShadow: '0 6px 18px rgba(235,28,36,0.25)',
    '&:hover': { backgroundColor: '#D71920', boxShadow: '0 8px 24px rgba(235,28,36,0.35)', transform: 'translateY(-2px)' },
    '& .MuiCircularProgress-root': { color: '#fff' },
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/logoletterhedblk.png" alt="BappaCards" width={156} height={52} style={{ height: '52px', width: 'auto' }} priority />
        </Link>
      </Box>

      <Grid container spacing={4} sx={{ width: '100%', alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center', py: { xs: 4, md: 0 } }}>
          <Box sx={{ maxWidth: 500, mx: 'auto', width: '100%' }}>
            {alertMessage && (
              <Alert severity={alertSeverity} sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', borderLeft: `4px solid ${alertSeverity === 'error' ? '#EB1C24' : alertSeverity === 'success' ? '#22C55E' : alertSeverity === 'warning' ? '#F59E0B' : '#3B82F6'}` }}>
                {alertMessage}
              </Alert>
            )}

            <Box sx={{ mb: 5, textAlign: 'center' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(235,28,36,0.08)', mb: 3 }}>
                <Image src="/bappa-logo-black.png" alt="Bappa" width={40} height={40} style={{ objectFit: 'contain' }} />
              </Box>
              <Typography variant="h2" component="h1" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: { xs: '2rem', sm: '2.5rem' }, lineHeight: 1.2, mb: 1.5, color: '#000', letterSpacing: '-0.02em' }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.125rem' }, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', maxWidth: '400px', mx: 'auto' }}>
                Log in to continue making connections that matter
              </Typography>
            </Box>

            <Box component="form" noValidate onSubmit={onSubmit}>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} sx={fieldSx} />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={fieldSx}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((s) => !s)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button type="submit" fullWidth variant="contained" loading={isLoading} sx={{ ...btnSx, mt: 4, mb: 2 }}>
                Log In
              </Button>

              <Box sx={{ position: 'relative', my: 4 }}>
                <Divider />
                <Typography sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', backgroundColor: '#fff', px: 2, fontSize: '0.875rem', fontWeight: 500, color: 'rgba(0,0,0,0.5)', fontFamily: "'Lato', sans-serif" }}>
                  OR
                </Typography>
              </Box>

              <Button onClick={handleGoogleSignIn} fullWidth variant="outlined" startIcon={<Google />} disabled={isLoading} sx={{ mb: 3, py: 1.75, borderColor: 'rgba(0,0,0,0.2)', borderWidth: '2px', borderRadius: '12px', color: '#000', fontSize: '1rem', fontWeight: 600, fontFamily: "'Poppins', sans-serif", textTransform: 'none', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', '&:hover': { borderWidth: '2px', borderColor: '#EB1C24', backgroundColor: 'rgba(235,28,36,0.04)', transform: 'translateY(-1px)' } }}>
                Continue with Google
              </Button>

              <Box sx={{ mb: 2 }}>
                <Link href="/reset-password" style={{ color: '#EB1C24', fontFamily: "'Lato', sans-serif", fontSize: '0.9375rem', fontWeight: 500, textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Box>

              <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0,0,0,0.08)', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9375rem', color: 'rgba(0,0,0,0.7)' }}>
                  Don&apos;t have an account?{' '}
                  <Link href="/sign-up" style={{ color: '#EB1C24', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', height: '900px', backgroundColor: '#000', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(-15deg) scale(1.8)', opacity: 0.08, zIndex: 0, pointerEvents: 'none' }}>
              <Fingerprint sx={{ fontSize: 400, color: '#fff' }} />
            </Box>
            <Box sx={{ position: 'relative', width: '100%', height: '100%', zIndex: 1, '&::after': { content: '""', position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(235,28,36,0.15) 0%,rgba(0,0,0,0.4) 100%)', zIndex: 1 } }}>
              <Image src="/bappa-tap.png" alt="BappaCards NFC tap" fill style={{ objectFit: 'cover' }} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: 40, left: 40, right: 40, zIndex: 2, color: '#fff' }}>
              <Typography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.3, mb: 1, textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>Leave Your Mark</Typography>
              <Typography variant="body1" sx={{ fontFamily: "'Lato', sans-serif", fontSize: '1rem', lineHeight: 1.6, opacity: 0.95, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>Connect with purpose. Share your story instantly.</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={openVerificationDialog}
        onClose={() => setOpenVerificationDialog(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: '16px', padding: 2 } } }}
      >
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem', fontFamily: "'Poppins', sans-serif" }}>Email Verification Required</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: "'Lato', sans-serif", mb: 2 }}>
            Your email address needs to be verified. Click below to send a verification email to {unverifiedUser?.email}.
          </DialogContentText>
          {alertMessage && openVerificationDialog && (
            <Alert severity={alertSeverity} sx={{ borderRadius: '12px', borderLeft: `4px solid ${alertSeverity === 'error' ? '#EB1C24' : alertSeverity === 'success' ? '#22C55E' : '#F59E0B'}` }}>
              {alertMessage}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button onClick={() => setOpenVerificationDialog(false)} sx={{ textTransform: 'none', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>Cancel</Button>
          <Button
            onClick={handleSendVerification}
            disabled={verificationCooldown > 0}
            variant="contained"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '12px', px: 3, fontFamily: "'Poppins', sans-serif", backgroundColor: '#EB1C24', '&:hover': { backgroundColor: '#D71920' } }}
          >
            {verificationCooldown > 0 ? `Resend in ${verificationCooldown}s` : 'Send Verification Email'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
