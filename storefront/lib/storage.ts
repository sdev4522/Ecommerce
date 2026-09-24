import { StateStorage } from 'zustand/middleware';

/**
 * Resilient StateStorage adapter for Zustand persistence.
 * Prevents SSR crashes, security policy exceptions, and private browsing/quota issues.
 */
export const safeLocalStorage: StateStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Ignore quota or security restriction in private mode
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore
    }
  },
};
