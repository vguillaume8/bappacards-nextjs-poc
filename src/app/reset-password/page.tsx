'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useAuth } from '@/context/AuthProvider';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [alertInfo, setAlertInfo] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { forgotPassword } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setAlertInfo({ show: false, type: 'success', message: '' });
    try {
      await forgotPassword(email);
      setAlertInfo({ show: true, type: 'success', message: 'A password reset has been submitted, please check your email for further instructions' });
    } catch {
      setAlertInfo({ show: true, type: 'error', message: 'An error occurred while resetting the password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/logoletterhedblk.png" alt="BappaCards" width={156} height={52} style={{ height: '52px', width: 'auto' }} priority />
        </Link>
      </Box>

      <Grid container sx={{ height: '100%' }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ maxWidth: 500, mx: 'auto', width: '100%' }}>
            {alertInfo.show && (
              <Alert severity={alertInfo.type} onClose={() => setAlertInfo((a) => ({ ...a, show: false }))} sx={{ mb: 2 }}>
                {alertInfo.message}
              </Alert>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '2rem', sm: '3rem' }, fontFamily: "'Poppins', sans-serif" }}>
                Reset your password
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                If you signed up with an email and password, reset your password below.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                If you signed up using Google, get help accessing your account at{' '}
                <Link href="https://accounts.google.com" style={{ color: '#EB1C24' }}>accounts.google.com</Link>.
              </Typography>
            </Box>

            <Box component="form" noValidate onSubmit={onSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&.Mui-focused fieldset': { borderColor: '#EB1C24' } }, '& .MuiInputLabel-root.Mui-focused': { color: '#EB1C24' } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={isLoading}
                disabled={!email}
                sx={{ mt: 3, mb: 2, py: 1.75, backgroundColor: '#EB1C24', borderRadius: '12px', fontWeight: 600, fontFamily: "'Poppins', sans-serif", textTransform: 'none', '&:hover': { backgroundColor: '#D71920' }, '& .MuiCircularProgress-root': { color: '#fff' } }}
              >
                Reset password
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link href="/log-in" style={{ color: '#EB1C24', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', fontFamily: "'Lato', sans-serif", fontSize: '0.9375rem' }}>
                  <span style={{ marginRight: '4px' }}>↩</span> Back to login
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6E6FA', borderRadius: '8px', overflow: 'hidden' }}>
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src="/bappa-tap.png" alt="Reset password illustration" fill style={{ objectFit: 'cover' }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
