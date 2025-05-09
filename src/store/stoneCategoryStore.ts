import { create } from 'zustand';

/**
 * Interface that defines the shape of our stone category state
 */
interface StoneCategoryState {
  // The currently active category (Neolith, Altea, Dekton, Silestone)
  activeCategory: string | null;
  // Function to set the active category
  setActiveCategory: (category: string | null) => void;
  // Function to reset the category filter
  resetCategory: () => void;
}

/**
 * Store for managing the active stone category across components
 * This will be used for filtering and scrolling functionality
 */
export const useStoneCategoryStore = create<StoneCategoryState>((set) => ({
  activeCategory: null,
  setActiveCategory: (category) => set({ activeCategory: category }),
  resetCategory: () => set({ activeCategory: null }),
})); 