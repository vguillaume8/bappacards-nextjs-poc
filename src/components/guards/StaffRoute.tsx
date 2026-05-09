'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

export default function StaffRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, userData } = useAuth();
  const router = useRouter();

  const isAllowed = userData?.role === 'staff' || userData?.role === 'admin';

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
