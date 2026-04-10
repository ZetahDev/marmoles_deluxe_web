import cloudinaryIndex from "../../data/cloudinary-index.json";

export interface Stone {
  name: string;
  image: string;
  design: string;
}

interface DesignImage {
  url: string;
  category: string;
  name: string;
}

type CategoryMap = Record<string, Stone[]>;

const categories = (cloudinaryIndex.categories ?? {}) as CategoryMap;
const designGallery = (cloudinaryIndex.designGallery ?? []) as DesignImage[];

function normalizeCategory(category: string): string {
  return category
    .trim()
    .replace(/\s+/g, "")
    .replace(/_/g, "")
    .replace(/-/g, "")
    .toUpperCase();
}

function resolveCategory(category: string): string | null {
  const directMatch = categories[category];
  if (directMatch) {
    return category;
  }

  const target = normalizeCategory(category);
  const matchedKey = Object.keys(categories).find((key) => {
    const normalizedKey = normalizeCategory(key).replace(/\//g, "");
    return normalizedKey === target || normalizedKey.includes(target);
  });

  return matchedKey ?? null;
}

/**
 * Retorna todas las imágenes de diseños para la galería.
 * Sin fallback a S3: solo usa el índice Cloudinary versionado en el repo.
 */
export async function fetchAllDesignImages(): Promise<DesignImage[]> {
  if (designGallery.length === 0) {
    console.warn("?? cloudinary-index sin registros para designGallery");
    return [];
  }

  // Mantiene el comportamiento previo de barajar para efecto masonry.
  return [...designGallery].sort(() => Math.random() - 0.5);
}

/**
 * Mantiene la firma histórica para evitar cambios en páginas actuales.
 * Internamente obtiene datos desde Cloudinary indexado localmente.
 */
export async function listStonesFromS3(category: string): Promise<Stone[]> {
  const resolvedCategory = resolveCategory(category);

  if (!resolvedCategory) {
    console.warn(`?? Categoría no encontrada en cloudinary-index: ${category}`);
    return [];
  }

  const stones = categories[resolvedCategory] ?? [];
  return stones.map((stone) => ({ ...stone }));
}
