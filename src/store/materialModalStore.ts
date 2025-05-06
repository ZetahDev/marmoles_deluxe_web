import { create } from 'zustand';

interface MaterialModalState {
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  resetImageIndex: () => void;
}

export const useMaterialModalStore = create<MaterialModalState>((set) => ({
  currentImageIndex: 0,
  setCurrentImageIndex: (index) => set({ currentImageIndex: index }),
  resetImageIndex: () => set({ currentImageIndex: 0 }),
})); 