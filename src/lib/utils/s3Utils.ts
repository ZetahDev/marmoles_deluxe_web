import { fetchDesignImagesFromAdminApi } from "../api/adminCatalog";
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

/**
 * Normaliza nombres para comparacion robusta (ej: "GRANITOS+NATURALES" -> "granitosnaturales")
 */
function normalize(str: string): string {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function buildCategoryAliases(categoryName: string): string[] {
  const aliases = new Set<string>();
  const raw = categoryName?.trim() ?? "";
  const full = normalize(raw);
  if (full) aliases.add(full);

  const slashParts = raw
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  if (slashParts.length > 1) {
    const lastSegment = normalize(slashParts[slashParts.length - 1] ?? "");
    if (lastSegment) aliases.add(lastSegment);
  }

  return Array.from(aliases);
}

function matchesCategoryName(candidateName: string, targetCategory: string): boolean {
  const candidate = normalize(candidateName);
  if (!candidate) return false;
  const aliases = buildCategoryAliases(targetCategory);
  return aliases.includes(candidate);
}

function normalizeCloudinaryPublicId(publicId: string): string {
  const clean = (publicId ?? "").trim().replace(/^\/+/, "");
  if (!clean) return "";
  if (/^https?:\/\//i.test(clean)) return clean;
  if (clean.startsWith("marmoles-deluxe/")) return clean;
  return `marmoles-deluxe/${clean}`;
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

function listStonesFromCloudinaryIndex(categoryName: string): Stone[] {
  const categories = (cloudinaryIndex as any)?.categories ?? {};
  const matchedCategoryKey = Object.keys(categories).find((key) =>
    matchesCategoryName(key, categoryName)
  );

  if (!matchedCategoryKey) return [];

  const stones = categories[matchedCategoryKey] ?? [];
  return stones.map((stone: any) => ({
    name: stone.name ?? "",
    image: stone.image ?? "",
    design: stone.design ?? stone.image ?? "",
  }));
}

export async function fetchAllDesignImages(): Promise<DesignImage[]> {
  const urls = await fetchDesignImagesFromAdminApi();
  if (!urls) return [];
  return urls
    .map((url) => ({
      url,
      category: "General",
      name: "Diseno Marmoles Deluxe",
    }))
    .sort(() => Math.random() - 0.5);
}

export async function listStonesFromS3(categoryName: string): Promise<Stone[]> {
  const catalog = await fetchCatalogFromApi();
  if (!catalog || !catalog.data) {
    console.warn("Catalogo API no disponible. Usando cloudinary-index.json");
    return listStonesFromCloudinaryIndex(categoryName);
  }

  const { categories, products, media } = catalog.data;
  const category = categories.find((c: any) =>
    matchesCategoryName(c.name, categoryName)
  );

  if (!category) {
    console.warn(
      `Categoria no encontrada en API: ${categoryName}. Usando cloudinary-index.json`
    );
    return listStonesFromCloudinaryIndex(categoryName);
  }

  const categoryProducts = products.filter((p: any) => p.category_id === category.id);
  const cloudName = import.meta.env.CLOUDINARY_CLOUD_NAME || "dudv2dh4w";

  const mapped = categoryProducts.map((p: any) => {
    const productMedia = media.filter((m: any) => m.product_id === p.id);
    const mainMedia = productMedia.find((m: any) => m.is_primary) || productMedia[0];
    const designMedia =
      productMedia.find(
        (m: any) =>
          m.public_id?.toLowerCase().includes("design") ||
          m.public_id?.toLowerCase().includes("desing")
      ) ||
      productMedia[1] ||
      mainMedia;

    const buildUrl = (publicId: string) => {
      if (!publicId) return "";
      const normalized = normalizeCloudinaryPublicId(publicId);
      if (/^https?:\/\//i.test(normalized)) return normalized;
      return `https://res.cloudinary.com/${cloudName}/image/upload/${normalized}`;
    };

    return {
      name: p.name,
      image: buildUrl(mainMedia?.public_id),
      design: buildUrl(designMedia?.public_id),
    };
  });

  if (mapped.length === 0) {
    return listStonesFromCloudinaryIndex(categoryName);
  }

  return mapped;
}
