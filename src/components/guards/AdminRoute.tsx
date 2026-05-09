'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace('/log-in');
    } else if (userData && userData.role !== 'admin') {
      router.replace('/dashboard');
    }
  }, [currentUser, userData, router]);

  if (!currentUser || !userData || userData.role !== 'admin') return null;
  return <>{children}</>;
}
