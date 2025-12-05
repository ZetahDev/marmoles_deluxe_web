import { create } from "zustand";

interface NavbarState {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
}

export const useNavbarStore = create<NavbarState>()((set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => {
    console.log("[Zustand] setMobileMenuOpen called with:", isOpen);
    set({ isMobileMenuOpen: isOpen });
  },
  toggleMobileMenu: () => {
    console.log("[Zustand] toggleMobileMenu called");
    set((state) => {
      console.log("[Zustand] Current state:", state.isMobileMenuOpen);
      const newState = !state.isMobileMenuOpen;
      console.log("[Zustand] New state:", newState);
      return { isMobileMenuOpen: newState };
    });
  },
}));
