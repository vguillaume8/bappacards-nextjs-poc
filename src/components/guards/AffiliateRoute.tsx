'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

export default function AffiliateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, userData } = useAuth();
  const router = useRouter();

  const isAllowed = userData?.role === 'affiliate' || userData?.role === 'admin';

  useEffect(() => {
    if (!currentUser) {
      router.replace('/log-in');
    } else if (userData && !isAllowed) {
      router.replace('/dashboard');
    }
  }, [currentUser, userData, isAllowed, router]);

  if (!currentUser || !userData || !isAllowed) return null;
  return <>{children}</>;
}
