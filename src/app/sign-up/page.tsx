'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  Snackbar,
  Alert,
  TextField,
} from '@mui/material';
import { Google, Visibility, VisibilityOff, Fingerprint, Person } from '@mui/icons-material';
import { useAuth } from '@/context/AuthProvider';
import { createUser, createGmailUser } from '@/lib/api';

function getReferralCode(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  return sessionStorage.getItem('referral_code') ?? undefined;
}

function checkPasswordStrength(pwd: string): { isStrong: boolean; message: string } {
  if (!pwd) return { isStrong: true, message: '' };
  if (pwd.length < 8) return { isStrong: false, message: 'Password must be at least 8 characters long' };
  const ok = /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /\d/.test(pwd) && /\W/.test(pwd);
  return ok
    ? { isStrong: true, message: 'Strong password' }
    : { isStrong: false, message: 'Password must contain uppercase, lowercase, numbers, and special characters' };
}

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = password === confirmPassword || confirmPassword === '';
  const passwordStrength = checkPasswordStrength(password);

  const router = useRouter();
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');

  const { signInWithGoogle, getGoogleRedirectResult } = useAuth();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const showError = (msg: string) => {
    setAlertMessage(msg);
    setOpenAlert(true);
  };

  // Handle Google OAuth redirect result when user returns from Google auth
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await getGoogleRedirectResult();
        if (!result || cancelled) return;
        const user = result.user;
        setIsLoading(true);
        try {
          const referralCode = getReferralCode();
          const response = await createGmailUser(user.email ?? '', referralCode, user.displayName ?? '');
          if (!('data' in response)) {
            showError((response as { message?: string }).message ?? 'An error occurred during signup');
          } else {
            setAlertMessage('Your account has been created successfully');
            setOpenAlert(true);
            setTimeout(() => {
              router.push(cardId ? `/log-in?cardId=${cardId}` : '/log-in');
            }, 2000);
          }
        } catch {
          showError('Error connecting to backend service');
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

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      // Browser navigates to Google — page unloads
    } catch (error) {
      const err = error as { message?: string };
      showError(err.message ?? 'An unexpected error occurred');
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      showError('Please fill in all required fields');
      return;
    }
    if (!passwordsMatch) {
      showError('Passwords do not match');
      return;
    }
    if (!passwordStrength.isStrong) {
      showError(passwordStrength.message);
      return;
    }

    // Require reCAPTCHA — fail hard if unavailable
    if (!executeRecaptcha) {
      showError('reCAPTCHA not loaded. Please refresh and try again.');
      return;
    }

    setIsLoading(true);
    try {
      const recaptchaToken = await executeRecaptcha('signup');
      if (!recaptchaToken) {
        showError('reCAPTCHA verification failed. Please try again.');
        setIsLoading(false);
        return;
      }

      const referralCode = getReferralCode();
      const response = await createUser(email, password, fullName, referralCode, recaptchaToken);

      if (!('data' in response)) {
        showError((response as { message?: string }).message ?? 'An error occurred during signup');
        return;
      }

      setAlertMessage('Your account has been created successfully');
      setOpenAlert(true);
      setTimeout(() => {
        router.push(cardId ? `/log-in?cardId=${cardId}` : '/log-in');
      }, 2000);
    } catch (error) {
      const err = error as { message?: string };
      showError(err.message ?? 'An unexpected error occurred');
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
            <Box sx={{ mb: 5, textAlign: 'center' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(235,28,36,0.08)', mb: 3 }}>
                <Image src="/bappa-logo-black.png" alt="Bappa" width={40} height={40} style={{ objectFit: 'contain' }} />
              </Box>
              <Typography variant="h2" component="h1" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: { xs: '2rem', sm: '2.5rem' }, lineHeight: 1.2, mb: 1.5, color: '#000', letterSpacing: '-0.02em' }}>
                Join BappaCards
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.125rem' }, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', maxWidth: '400px', mx: 'auto' }}>
                Start making connections that matter
              </Typography>
            </Box>

            <Box component="form" noValidate onSubmit={onSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoFocus
                sx={fieldSx}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Person sx={{ color: 'rgba(0,0,0,0.4)' }} /></InputAdornment> } }}
              />
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={fieldSx} />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!passwordStrength.isStrong && !!password}
                helperText={!passwordsMatch ? 'Passwords do not match' : passwordStrength.message}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!passwordsMatch}
                helperText={!passwordsMatch ? 'Passwords do not match' : ''}
                sx={fieldSx}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={isLoading}
                sx={{ mt: 4, mb: 2, py: 1.75, backgroundColor: '#EB1C24', color: '#fff', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, fontFamily: "'Poppins', sans-serif", textTransform: 'none', boxShadow: '0 6px 18px rgba(235,28,36,0.25)', '&:hover': { backgroundColor: '#D71920', boxShadow: '0 8px 24px rgba(235,28,36,0.35)', transform: 'translateY(-2px)' }, '& .MuiCircularProgress-root': { color: '#fff' } }}
              >
                Sign Up
              </Button>

              <Box sx={{ position: 'relative', my: 4 }}>
                <Divider />
                <Typography sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', backgroundColor: '#fff', px: 2, fontSize: '0.875rem', fontWeight: 500, color: 'rgba(0,0,0,0.5)', fontFamily: "'Lato', sans-serif" }}>
                  OR
                </Typography>
              </Box>

              <Button fullWidth variant="outlined" startIcon={<Google />} onClick={handleGoogleSignUp} sx={{ mb: 3, py: 1.75, borderColor: 'rgba(0,0,0,0.2)', borderWidth: '2px', borderRadius: '12px', color: '#000', fontSize: '1rem', fontWeight: 600, fontFamily: "'Poppins', sans-serif", textTransform: 'none', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', '&:hover': { borderWidth: '2px', borderColor: '#EB1C24', backgroundColor: 'rgba(235,28,36,0.04)', transform: 'translateY(-1px)' } }}>
                Sign up with Google
              </Button>

              <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0,0,0,0.08)', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9375rem', color: 'rgba(0,0,0,0.7)' }}>
                  Already have an account?{' '}
                  <Link href="/log-in" style={{ color: '#EB1C24', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
                </Typography>
              </Box>

              <Typography variant="body2" align="center" sx={{ mt: 2, fontFamily: "'Lato', sans-serif", color: 'rgba(0,0,0,0.5)' }}>
                By clicking Sign up, you agree to BappaCards&apos;s{' '}
                <Link href="/privacy-notice" style={{ color: 'inherit' }}>privacy notice</Link>,{' '}
                <Link href="/privacy-notice" style={{ color: 'inherit' }}>T&Cs</Link>{' '}
                and to receive offers, news and updates.
              </Typography>
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

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity={alertMessage.includes('successfully') ? 'success' : 'error'} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
