import { create } from "zustand";

interface CotizacionData {
  material: string;
  metros: string;
  unidad: string;
  precioCalculado: number;
}

interface MaterialModalState {
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  resetImageIndex: () => void;
  cotizacion: CotizacionData | null;
  setCotizacion: (cotizacion: CotizacionData | null) => void;
  clearCotizacion: () => void;
}

export const useMaterialModalStore = create<MaterialModalState>((set) => ({
  currentImageIndex: 0,
  setCurrentImageIndex: (index) => set({ currentImageIndex: index }),
  resetImageIndex: () => set({ currentImageIndex: 0 }),
  cotizacion: null,
  setCotizacion: (cotizacion) => set({ cotizacion }),
  clearCotizacion: () => set({ cotizacion: null }),
}));
