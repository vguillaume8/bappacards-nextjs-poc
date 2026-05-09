'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Box, Container, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getProfile } from '@/lib/api';
import type { BappaProfile } from '@/lib/api';
import { useAuth } from '@/context/AuthProvider';
import ExchangeContactForm from '@/components/profile/ExchangeContactForm';

export default function ExchangeFormPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultLocation = searchParams.get('location') || '';
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<BappaProfile | undefined>(undefined);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchProfile = useCallback(async () => {
    const token = currentUser ? await currentUser.getIdToken() : undefined;
    const res = await getProfile(id, token);
    if (res.status === 404) {
      router.replace('/');
      return;
    }
    if ('data' in res) setProfile(res.data);
  }, [id, currentUser, router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!profile) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="sm"
      disableGutters={isSmall}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: isSmall ? 2 : 4,
        px: isSmall ? 2 : undefined,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 480 }}>
        <ExchangeContactForm
          profileId={profile.profile_id ?? id}
          profile={profile}
          mode="page"
          defaultLocation={defaultLocation}
          hideNotes
        />
      </Box>
    </Container>
  );
}
