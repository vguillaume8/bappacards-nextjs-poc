'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

interface GroupAdminRouteProps {
  children: React.ReactNode;
  groupName: string;
}

export default function GroupAdminRoute({ children, groupName }: GroupAdminRouteProps) {
  const { currentUser, userData } = useAuth();
  const router = useRouter();

  const isGroupAdmin =
    userData?.role === 'admin' ||
    (Array.isArray(userData?.groupAdminOf) &&
      (userData.groupAdminOf as string[]).includes(groupName));

  useEffect(() => {
    if (!currentUser) {
      router.replace('/log-in');
    } else if (userData && !isGroupAdmin) {
      router.replace('/dashboard');
    }
  }, [currentUser, userData, isGroupAdmin, router]);

  if (!currentUser || !userData || !isGroupAdmin) return null;
  return <>{children}</>;
}
