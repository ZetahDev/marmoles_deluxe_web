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
  // New: Material to open from URL parameter
  materialToOpen: string | null;
  setMaterialToOpen: (material: string | null) => void;
  clearMaterialToOpen: () => void;
}

export const useMaterialModalStore = create<MaterialModalState>((set) => ({
  currentImageIndex: 0,
  setCurrentImageIndex: (index) => set({ currentImageIndex: index }),
  resetImageIndex: () => set({ currentImageIndex: 0 }),
  cotizacion: null,
  setCotizacion: (cotizacion) => set({ cotizacion }),
  clearCotizacion: () => set({ cotizacion: null }),
  // New: Material to open from URL parameter
  materialToOpen: null,
  setMaterialToOpen: (material) => set({ materialToOpen: material }),
  clearMaterialToOpen: () => set({ materialToOpen: null }),
}));

// Helper function to initialize from URL (call this once at app level)
export function initMaterialFromURL() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const material = params.get("material");

  if (material) {
    // Normalize to slug format
    const normalizedMaterial = material
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    useMaterialModalStore.getState().setMaterialToOpen(normalizedMaterial);
  }
}
