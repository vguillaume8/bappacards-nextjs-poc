'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  type UserCredential,
} from 'firebase/auth';
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
  signInUser: (email: string, password: string) => Promise<UserCredential>;
  registerUser: (email: string, password: string, name: string) => Promise<UserCredential>;
  logoutUser: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  sendVerification: (user: User) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  getGoogleRedirectResult: () => Promise<UserCredential | null>;
}

const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  userData: null,
  refreshUserData: async () => null,
  signInUser: () => Promise.reject(new Error('AuthProvider not mounted')),
  registerUser: () => Promise.reject(new Error('AuthProvider not mounted')),
  logoutUser: () => Promise.reject(new Error('AuthProvider not mounted')),
  forgotPassword: () => Promise.reject(new Error('AuthProvider not mounted')),
  sendVerification: () => Promise.reject(new Error('AuthProvider not mounted')),
  signInWithGoogle: () => Promise.reject(new Error('AuthProvider not mounted')),
  getGoogleRedirectResult: () => Promise.reject(new Error('AuthProvider not mounted')),
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
          const token = await user.getIdToken(true);
          document.cookie = 'auth-token=1; path=/; SameSite=Strict';
          setCurrentUser(user);
          Sentry.setUser({ id: user.uid, email: user.email ?? undefined });

          try {
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
                document.cookie = 'auth-token=1; path=/; SameSite=Strict';
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
          document.cookie = 'auth-token=; path=/; max-age=0';
          setCurrentUser(null);
          setUserData(null);
          auth.signOut();
        }
      } else {
        document.cookie = 'auth-token=; path=/; max-age=0';
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

  const signInUser = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const registerUser = async (email: string, password: string, name: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(credential.user, { displayName: name });
    return credential;
  };

  const logoutUser = () => {
    document.cookie = 'auth-token=; path=/; max-age=0';
    return signOut(auth);
  };

  const forgotPassword = (email: string) => sendPasswordResetEmail(auth, email);

  const sendVerification = (user: User) =>
    sendEmailVerification(user, { url: 'https://bappacards.com/log-in' });

  const signInWithGoogle = () => signInWithRedirect(auth, googleProvider);

  const getGoogleRedirectResult = () => getRedirectResult(auth);

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
    <AuthContext.Provider
      value={{
        currentUser,
        userData,
        refreshUserData,
        signInUser,
        registerUser,
        logoutUser,
        forgotPassword,
        sendVerification,
        signInWithGoogle,
        getGoogleRedirectResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
