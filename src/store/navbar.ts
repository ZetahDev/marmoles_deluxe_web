import { create } from "zustand";

interface NavbarState {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
}

export const useNavbarStore = create<NavbarState>()((set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));
