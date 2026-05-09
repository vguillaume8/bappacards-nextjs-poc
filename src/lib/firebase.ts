'use client';

import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  indexedDBLocalPersistence,
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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

export const recoverFromIndexedDBError = async (): Promise<boolean> => {
  try {
    await setPersistence(auth, browserLocalPersistence);
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
  setPersistence(auth, browserLocalPersistence).catch((fallbackError) => {
    if (!isRetry) {
      setTimeout(() => handlePersistenceError(fallbackError, true), 1000);
    }
  });
};

if (typeof window !== 'undefined') {
  setPersistence(auth, indexedDBLocalPersistence).catch(handlePersistenceError);
}
