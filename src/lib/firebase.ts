'use client';

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  indexedDBLocalPersistence,
  type Auth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return _app;
}

function getFirebaseAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
}

// Proxy that defers Firebase initialization until first client-side access.
// This prevents SSR from failing when env vars are absent at build time.
export const auth: Auth = new Proxy({} as Auth, {
  get(_target, prop: string | symbol) {
    const instance = getFirebaseAuth();
    const value = (instance as unknown as Record<string | symbol, unknown>)[prop];
    // eslint-disable-next-line @typescript-eslint/ban-types
    return typeof value === 'function' ? (value as Function).bind(instance) : value;
  },
});

export const recoverFromIndexedDBError = async (): Promise<boolean> => {
  try {
    await setPersistence(getFirebaseAuth(), browserLocalPersistence);
    return true;
  } catch {
    return false;
  }
};

const handlePersistenceError = (error: Error, isRetry = false) => {
  const isIndexedDBError =
    error.message?.includes('IndexedDB') || (error as { code?: string }).code === 'unavailable';
  if (isIndexedDBError) {
    console.warn('IndexedDB unavailable, switching to localStorage');
  }
  setPersistence(getFirebaseAuth(), browserLocalPersistence).catch((fallbackError) => {
    if (!isRetry) {
      setTimeout(() => handlePersistenceError(fallbackError, true), 1000);
    }
  });
};

// Only run on the client — avoids SSR/build failures when env vars are absent
if (typeof window !== 'undefined') {
  setPersistence(getFirebaseAuth(), indexedDBLocalPersistence).catch(handlePersistenceError);
}
