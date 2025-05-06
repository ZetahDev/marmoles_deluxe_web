import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthResponse } from '@/types/auth';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (authData: AuthResponse | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      setAuth: (authData) => set({
        accessToken: authData?.accessToken ?? null,
        isAuthenticated: !!authData?.accessToken,
      }),
      logout: () => set({
        accessToken: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);

// Helper function to get the auth token
export const getAuthToken = (): string | null => {
  return useAuthStore.getState().accessToken;
};