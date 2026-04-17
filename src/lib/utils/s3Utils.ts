import { fetchDesignImagesFromAdminApi } from "../api/adminCatalog";

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

/**
 * Normaliza nombres para comparación robusta (ej: "GRANITOS+NATURALES" -> "granitosnaturales")
 */
function normalize(str: string): string {
  if (!str) return "";
  return str.trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[^a-z0-9]+/g, "");   // Solo letras y números
}

async function fetchCatalogFromApi() {
  const baseUrl = import.meta.env.PUBLIC_ADMIN_API_BASE_URL;
  if (!baseUrl) return null;
  try {
    const response = await fetch(`${baseUrl}/api/public/catalog`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching catalog:", error);
    return null;
  }
}

export async function fetchAllDesignImages(): Promise<DesignImage[]> {
  const urls = await fetchDesignImagesFromAdminApi();
  if (!urls) return [];
  return urls.map(url => ({
    url,
    category: "General",
    name: "Diseño Marmoles Deluxe"
  })).sort(() => Math.random() - 0.5);
}

export async function listStonesFromS3(categoryName: string): Promise<Stone[]> {
  const catalog = await fetchCatalogFromApi();
  if (!catalog || !catalog.data) {
    console.warn("?? Catálogo vacío o API no disponible");
    return [];
  }
  
  const { categories, products, media } = catalog.data;
  const targetNorm = normalize(categoryName);
  
  // Buscar categoría por coincidencia parcial normalizada
  const category = categories.find((c: any) => normalize(c.name).includes(targetNorm) || targetNorm.includes(normalize(c.name)));
  if (!category) {
    console.warn(`?? Categoría no encontrada: ${categoryName} (Normalizada: ${targetNorm})`);
    return [];
  }

  const categoryProducts = products.filter((p: any) => p.category_id === category.id);
  const cloudName = import.meta.env.CLOUDINARY_CLOUD_NAME;
  
  return categoryProducts.map((p: any) => {
    const productMedia = media.filter((m: any) => m.product_id === p.id);
    const mainMedia = productMedia.find((m: any) => m.is_primary) || productMedia[0];
    const designMedia = productMedia.find((m: any) => 
      m.public_id?.toLowerCase().includes("design") || 
      m.public_id?.toLowerCase().includes("desing")
    ) || productMedia[1] || mainMedia;

    const buildUrl = (publicId: string) => 
      publicId ? `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}` : "";

    return {
      name: p.name,
      image: buildUrl(mainMedia?.public_id),
      design: buildUrl(designMedia?.public_id)
    };
  });
}