'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import * as Sentry from '@sentry/nextjs';
import { auth, recoverFromIndexedDBError } from '@/lib/firebase';
import { getMe } from '@/lib/api';

interface UserData {
  id: string;
  role?: string;
  [key: string]: unknown;
}

interface AuthContextValue {
  currentUser: User | null;
  userData: UserData | null;
  refreshUserData: () => Promise<UserData | null>;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  userData: null,
  refreshUserData: async () => null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const storageListener = (event: StorageEvent) => {
      if (event.key?.includes('firebase:authUser')) {
        const unsub = auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
          unsub();
        });
      }
    };

    window.addEventListener('storage', storageListener);

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await user.getIdToken(true);
          setCurrentUser(user);
          Sentry.setUser({ id: user.uid, email: user.email ?? undefined });

          try {
            const token = await user.getIdToken();
            const data = await getMe(token);
            setUserData(data?.id ? data : null);
          } catch {
            setUserData(null);
          }
        } catch (error) {
          const err = error as Error;
          if (err.message?.includes('IndexedDB')) {
            const recovered = await recoverFromIndexedDBError();
            if (recovered && auth.currentUser) {
              try {
                const token = await auth.currentUser.getIdToken(true);
                setCurrentUser(auth.currentUser);
                const data = await getMe(token);
                setUserData(data?.id ? data : null);
                setPending(false);
                return;
              } catch {
                // fall through to signout
              }
            }
          }
          setCurrentUser(null);
          setUserData(null);
          auth.signOut();
        }
      } else {
        Sentry.setUser(null);
        setCurrentUser(null);
        setUserData(null);
      }
      setPending(false);
    });

    return () => {
      unsubscribe();
      window.removeEventListener('storage', storageListener);
    };
  }, []);

  const refreshUserData = async (): Promise<UserData | null> => {
    if (!currentUser) return null;
    try {
      const token = await currentUser.getIdToken();
      const data = await getMe(token);
      const valid = data?.id ? data : null;
      setUserData(valid);
      return valid;
    } catch (error) {
      const err = error as Error;
      if (err.message?.includes('IndexedDB')) {
        const recovered = await recoverFromIndexedDBError();
        if (recovered && currentUser) {
          try {
            const token = await currentUser.getIdToken();
            const data = await getMe(token);
            const valid = data?.id ? data : null;
            setUserData(valid);
            return valid;
          } catch {
            // fall through
          }
        }
      }
      setUserData(null);
      return null;
    }
  };

  if (pending) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, userData, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
