'use client';

import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import { CircularProgress, Box } from '@mui/material';

export default function AnalyticsPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) router.replace('/log-in?redirect=/analytics');
  }, [currentUser, router]);

  if (!currentUser)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );

  return <AnalyticsDashboard />;
}
