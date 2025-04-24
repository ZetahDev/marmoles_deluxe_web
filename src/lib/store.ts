import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavbarState {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
}

// Create store with persist middleware to keep state across page changes
export const useNavbarStore = create<NavbarState>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    }),
    {
      name: 'navbar-storage', // unique name for localStorage
      partialize: (state) => ({ isMobileMenuOpen: state.isMobileMenuOpen })
    }
  )
); 