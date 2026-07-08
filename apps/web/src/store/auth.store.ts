import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
  [key: string]: unknown;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  tenantId: string | null;
  setAuth: (token: string, user: AuthUser | null, tenantId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      tenantId: null,
      setAuth: (token, user, tenantId) => set({ token, user, tenantId }),
      logout: () => set({ token: null, user: null, tenantId: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
