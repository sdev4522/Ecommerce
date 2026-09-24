import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeLocalStorage } from '../lib/storage';

export interface CustomerUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  orders_count?: number;
}

interface AuthStore {
  customer: CustomerUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot_password';

  // Modal actions
  openAuthModal: (mode?: 'login' | 'register' | 'forgot_password') => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot_password') => void;

  // Authentication actions
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; message?: string }>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
    phone?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      customer: null,
      token: null,
      isAuthenticated: false,
      isAuthModalOpen: false,
      authModalMode: 'login',

      openAuthModal: (mode = 'login') => {
        set({ isAuthModalOpen: true, authModalMode: mode });
      },

      closeAuthModal: () => {
        set({ isAuthModalOpen: false });
      },

      setAuthModalMode: (mode) => {
        set({ authModalMode: mode });
      },

      fetchProfile: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const res = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            if (data?.data) {
              set({ customer: data.data, isAuthenticated: true });
            }
          }
        } catch {
          // Keep existing customer state
        }
      },

      login: async ({ email, password }) => {
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email.trim(), password }),
          });

          const data = await res.json();

          if (res.ok && !data.error && data?.data?.token) {
            const token = data.data.token;

            // Fetch real customer profile from backend using Sanctum token
            let customerData: CustomerUser = {
              id: 1,
              name: email.split('@')[0],
              email: email.trim(),
            };

            try {
              const meRes = await fetch('/api/auth/me', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (meRes.ok) {
                const meJson = await meRes.json();
                if (meJson?.data) {
                  customerData = meJson.data;
                }
              }
            } catch {
              // Ignore profile fetch fallback
            }

            set({
              customer: customerData,
              token,
              isAuthenticated: true,
              isAuthModalOpen: false,
            });

            return { success: true, message: 'Welcome back! Signed in successfully.' };
          }

          if (data?.message) {
            return {
              success: false,
              message: data.message,
            };
          }

          return {
            success: false,
            message: 'Invalid email or password. Please check your credentials.',
          };
        } catch (err: any) {
          return {
            success: false,
            message: err?.message || 'Unable to connect to authentication server. Please try again.',
          };
        }
      },

      register: async ({ name, email, password, password_confirmation, phone }) => {
        try {
          const names = name.trim().split(' ');
          const first_name = names[0] || name.trim();
          const last_name = names.slice(1).join(' ') || 'Customer';

          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              first_name,
              last_name,
              name: name.trim(),
              email: email.trim(),
              phone: phone || '+91 98765 43210',
              password,
              password_confirmation: password_confirmation || password,
            }),
          });

          const data = await res.json();

          if (res.ok && !data.error) {
            // Auto login after registration
            const loginRes = await get().login({ email, password });
            if (loginRes.success) {
              return { success: true, message: 'Account created and signed in successfully!' };
            }

            return { success: true, message: data.message || 'Account created successfully! Please sign in.' };
          }

          if (data?.errors) {
            const firstError = Object.values(data.errors)[0] as string[];
            return {
              success: false,
              message: Array.isArray(firstError) ? firstError[0] : String(firstError),
            };
          }

          return {
            success: false,
            message: data?.message || 'Registration failed. Please check your details.',
          };
        } catch (err: any) {
          return {
            success: false,
            message: err?.message || 'Unable to connect to registration server. Please try again.',
          };
        }
      },

      logout: async () => {
        const token = get().token;
        if (token) {
          try {
            await fetch('/api/auth/logout', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } catch {
            // ignore
          }
        }

        set({
          customer: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'maison-auth-storage',
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({
        customer: state.customer,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
