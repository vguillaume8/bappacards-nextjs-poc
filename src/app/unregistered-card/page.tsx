'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import Image from 'next/image';
import { useAuth } from '@/context/AuthProvider';
import { registerCard } from '@/lib/api';

export default function UnregisteredCardPage() {
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    if (!cardId) router.replace('/');
  }, [cardId, router]);

  const handleRegister = async () => {
    if (!currentUser) {
      router.push('/log-in');
      return;
    }
    setOpenConfirm(false);
    try {
      setIsRegistering(true);
      setRegisterError('');
      if (!cardId) return;
      const token = await currentUser.getIdToken();
      const result = await registerCard(cardId, token);
      if (result.success) {
        setRegisterSuccess(true);
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setRegisterError((result as { success: false; error?: string }).error || 'Failed to register card');
      }
    } catch {
      setRegisterError('An error occurred while registering the card');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 8, pb: 8 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Image
            src="/logoletterhedblk.png"
            alt="BappaCards"
            width={180}
            height={60}
            style={{ objectFit: 'contain', marginBottom: '16px' }}
          />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Unregistered Card
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            The card with ID <strong>{cardId}</strong> is not currently registered to any user.
          </Typography>
        </Box>

        {registerError && <Alert severity="error" sx={{ mb: 3 }}>{registerError}</Alert>}
        {registerSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Card successfully registered! Redirecting to dashboard...
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          {currentUser ? (
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => setOpenConfirm(true)}
              disabled={isRegistering || registerSuccess}
              sx={{ py: 1.5 }}
            >
              {isRegistering ? <CircularProgress size={24} color="inherit" /> : 'Register This Card'}
            </Button>
          ) : (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                  You need to be logged in to register this card.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<LoginIcon />}
                  component={Link}
                  href={`/log-in?cardId=${encodeURIComponent(cardId ?? '')}`}
                  sx={{ py: 1.5 }}
                >
                  Log In
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  startIcon={<PersonAddIcon />}
                  component={Link}
                  href={`/sign-up?cardId=${encodeURIComponent(cardId ?? '')}`}
                  sx={{ py: 1.5 }}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            BappaCards — Connect with a tap
          </Typography>
          <Button variant="text" component={Link} href="/" size="small" sx={{ mt: 1 }}>
            Return to Home
          </Button>
        </Box>
      </Paper>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Register this card?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to register card <strong>{cardId}</strong> to your account? This card
            will be linked to your profile and can be used to share your contact information.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleRegister} variant="contained" autoFocus>
            Register Card
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
