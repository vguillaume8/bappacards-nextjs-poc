'use client';

import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ManageProfile from '@/components/dashboard/ManageProfile';
import { CircularProgress, Box } from '@mui/material';

export default function DashboardPage() {
  const { currentUser, userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) router.replace('/log-in?redirect=/dashboard');
  }, [currentUser, router]);

  if (!currentUser || !userData)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );

  return <ManageProfile />;
}
