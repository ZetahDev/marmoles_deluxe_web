import { fetchDesignImagesFromAdminApi } from "../api/adminCatalog";
import { normalizeText, slugify } from "../utils";
import cloudinaryIndex from "../../data/cloudinary-index.json";

export interface Stone {
  name: string;
  image: string;
  design: string;
}

export interface PublicCatalogCategory {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
  sort_order?: number;
}

export interface PublicCatalogProduct {
  id: string;
  name: string;
  slug?: string;
  category_id?: string;
  provider?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PublicCatalogMedia {
  product_id: string;
  id?: string;
  public_id?: string;
  provider?: string;
  transforms?: Record<string, unknown>;
  url?: string;
  thumbnail_url?: string;
  is_primary?: boolean;
  sort_order?: number;
}

export interface PublicCatalogData {
  generatedAt?: string;
  categories: PublicCatalogCategory[];
  products: PublicCatalogProduct[];
  media: PublicCatalogMedia[];
}

export interface ProviderStoneGroup {
  provider: string;
  slug: string;
  stones: Stone[];
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
  return normalizeText(str).replace(/[^a-z0-9]+/g, "");
}

function toProviderLabel(provider: string): string {
  const normalized = normalize(provider);
  if (!normalized) return "Otros";
  if (normalized === "artemarmol" || normalized === "artemarmoles") return "Artemarmol";
  if (normalized === "altea") return "Altea";
  if (normalized === "dekton") return "Dekton";
  if (normalized === "neolith") return "Neolith";
  if (normalized === "silestone") return "Silestone";
  if (normalized === "terracina") return "Terracina";
  return provider.trim();
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

function matchesCategoryBase(candidateName: string, targetCategory: string): boolean {
  const candidate = normalize(candidateName);
  const target = normalize(targetCategory);
  if (!candidate || !target) return false;
  return candidate.startsWith(target);
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

function isCloudinaryDeliveryUrl(value: string): boolean {
  return /^https?:\/\/res\.cloudinary\.com\//i.test(value);
}

function toCloudinaryFetchUrl(cloudName: string, sourceUrl: string): string {
  return `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${encodeURIComponent(sourceUrl)}`;
}

export async function fetchPublicCatalogData(): Promise<PublicCatalogData | null> {
  const baseUrl =
    import.meta.env.PUBLIC_ADMIN_API_BASE_URL ||
    import.meta.env.ADMIN_API_BASE_URL ||
    process.env.PUBLIC_ADMIN_API_BASE_URL ||
    process.env.ADMIN_API_BASE_URL;

  if (!baseUrl) {
    console.warn(
      "PUBLIC_ADMIN_API_BASE_URL/ADMIN_API_BASE_URL no configurada. Usando cloudinary-index.json"
    );
    return null;
  }

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    console.log("[catalog] fetchPublicCatalogData:start", {
      baseUrl: normalizedBaseUrl,
    });
    const response = await fetch(`${normalizedBaseUrl}/api/public/catalog`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      console.warn("[catalog] fetchPublicCatalogData:non_ok_response", {
        status: response.status,
        statusText: response.statusText,
      });
      console.warn(
        `Catalogo API respondio ${response.status}. Usando cloudinary-index.json`
      );
      return null;
    }
    const payload = await response.json();
    console.log("[catalog] fetchPublicCatalogData:success", {
      categories: payload?.data?.categories?.length ?? 0,
      products: payload?.data?.products?.length ?? 0,
      media: payload?.data?.media?.length ?? 0,
      generatedAt: payload?.data?.generatedAt ?? null,
    });
    return payload?.data ?? null;
  } catch (error) {
    console.error("[catalog] fetchPublicCatalogData:error", error);
    console.error("Error consultando catalogo API. Usando cloudinary-index.json:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function buildCloudinaryIndexProviderGroups(categoryName: string): ProviderStoneGroup[] {
  const categories = (cloudinaryIndex as any)?.categories ?? {};
  const groups = Object.entries(categories)
    .filter(([key]) => matchesCategoryBase(key, categoryName))
    .map(([key, stones]) => {
      const providerName = toProviderLabel(key.split("/").pop() ?? key);
      return {
        provider: providerName,
        slug: slugify(providerName),
        stones: (stones as any[]).map((stone) => ({
          name: stone.name ?? "",
          image: stone.image ?? "",
          design: stone.design ?? stone.image ?? "",
        })),
      };
    })
    .filter((group) => group.stones.length > 0);

  return groups;
}

function listStonesFromCloudinaryIndex(categoryName: string): Stone[] {
  const categories = (cloudinaryIndex as any)?.categories ?? {};
  const matchedEntries = Object.entries(categories).filter(([key]) =>
    matchesCategoryBase(key, categoryName) || matchesCategoryName(key, categoryName)
  );

  if (matchedEntries.length === 0) return [];

  return matchedEntries.flatMap(([, stones]) =>
    (stones as any[]).map((stone) => ({
      name: stone.name ?? "",
      image: stone.image ?? "",
      design: stone.design ?? stone.image ?? "",
    }))
  );
}

function findStoneFromCloudinaryIndex(categoryName: string, stoneName: string): Stone | null {
  const categoryStones = listStonesFromCloudinaryIndex(categoryName);
  const normalizedTargetName = normalize(stoneName);
  return (
    categoryStones.find((stone) => normalize(stone.name) === normalizedTargetName) ?? null
  );
}

function sortMediaItems(media: PublicCatalogMedia[]): PublicCatalogMedia[] {
  return [...media].sort((left, right) => {
    const leftPrimary = left.is_primary ? 1 : 0;
    const rightPrimary = right.is_primary ? 1 : 0;
    if (leftPrimary !== rightPrimary) return rightPrimary - leftPrimary;
    return (left.sort_order ?? 9999) - (right.sort_order ?? 9999);
  });
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
  const catalog = await fetchPublicCatalogData();
  if (!catalog) {
    console.warn("Catalogo API no disponible. Usando cloudinary-index.json");
    return listStonesFromCloudinaryIndex(categoryName);
  }

  const { categories, products, media } = catalog;
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

  const mapped = categoryProducts.flatMap((p: any) => {
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
      if (/^https?:\/\//i.test(normalized)) {
        return isCloudinaryDeliveryUrl(normalized)
          ? normalized
          : toCloudinaryFetchUrl(cloudName, normalized);
      }
      return `https://res.cloudinary.com/${cloudName}/image/upload/${normalized}`;
    };

    const localStone = findStoneFromCloudinaryIndex(categoryName, p.name);
    const apiImage = buildUrl(mainMedia?.url || mainMedia?.public_id || "");
    const apiDesign = buildUrl(designMedia?.url || designMedia?.public_id || "");

    // Prefer local Cloudinary pair when API arrives with external URLs (ex: legacy CDN links).
    const canUseLocalPair =
      Boolean(localStone?.image && localStone?.design) &&
      ((!isCloudinaryDeliveryUrl(apiImage) && Boolean(apiImage)) ||
        (!isCloudinaryDeliveryUrl(apiDesign) && Boolean(apiDesign)));

    const finalImage = canUseLocalPair
      ? localStone!.image
      : apiImage || localStone?.image || "";
    const finalDesign = canUseLocalPair
      ? localStone!.design
      : apiDesign || localStone?.design || "";

    // The UI requires the material image + design image pair.
    if (!finalImage || !finalDesign) return [];

    return [{
      name: p.name,
      image: finalImage,
      design: finalDesign,
    }];
  });

  if (mapped.length === 0) {
    return listStonesFromCloudinaryIndex(categoryName);
  }

  return mapped;
}

function resolveProductProvider(product: PublicCatalogProduct): string {
  const metadataProvider =
    typeof product.metadata?.provider === "string" ? product.metadata.provider : "";
  return toProviderLabel((product.provider || metadataProvider || "Otros").trim());
}

function mapProductToStone(
  product: PublicCatalogProduct,
  media: PublicCatalogMedia[],
  categoryName: string
): Stone | null {
  const productMedia = sortMediaItems(
    media.filter((item) => item.product_id === product.id)
  );
  const mainMedia = productMedia[0];
  const designMedia =
    productMedia.find(
      (item) =>
        item.public_id?.toLowerCase().includes("design") ||
        item.public_id?.toLowerCase().includes("desing")
    ) || productMedia[1] || mainMedia;

  const cloudName = import.meta.env.CLOUDINARY_CLOUD_NAME || "dudv2dh4w";
  const buildUrl = (publicId: string) => {
    if (!publicId) return "";
    const normalized = normalizeCloudinaryPublicId(publicId);
    if (/^https?:\/\//i.test(normalized)) {
      return isCloudinaryDeliveryUrl(normalized)
        ? normalized
        : toCloudinaryFetchUrl(cloudName, normalized);
    }
    return `https://res.cloudinary.com/${cloudName}/image/upload/${normalized}`;
  };

  const localStone = findStoneFromCloudinaryIndex(categoryName, product.name);
  const apiImage = buildUrl(
    mainMedia?.url || mainMedia?.thumbnail_url || mainMedia?.public_id || ""
  );
  const apiDesign = buildUrl(
    designMedia?.url || designMedia?.thumbnail_url || designMedia?.public_id || ""
  );

  const canUseLocalPair =
    Boolean(localStone?.image && localStone?.design) &&
    ((!isCloudinaryDeliveryUrl(apiImage) && Boolean(apiImage)) ||
      (!isCloudinaryDeliveryUrl(apiDesign) && Boolean(apiDesign)));

  const finalImage = canUseLocalPair
    ? localStone!.image
    : apiImage || localStone?.image || "";
  const finalDesign = canUseLocalPair
    ? localStone!.design
    : apiDesign || localStone?.design || finalImage;

  if (!finalImage) return null;

  return {
    name: product.name,
    image: finalImage,
    design: finalDesign || finalImage,
  };
}

export async function listProviderGroupsFromCatalog(
  categoryName: string
): Promise<ProviderStoneGroup[]> {
  const catalog = await fetchPublicCatalogData();
  if (!catalog) {
    const fallbackGroups = buildCloudinaryIndexProviderGroups(categoryName);
    console.log("[catalog] listProviderGroupsFromCatalog:fallback_no_catalog", {
      categoryName,
      groups: fallbackGroups.map((group) => ({
        provider: group.provider,
        stones: group.stones.length,
      })),
    });
    return fallbackGroups;
  }

  const category = catalog.categories.find((item) =>
    matchesCategoryName(item.name, categoryName) ||
    item.id === categoryName ||
    item.slug === categoryName
  );

  console.log("[catalog] listProviderGroupsFromCatalog:category_lookup", {
    categoryName,
    availableCategories: catalog.categories.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
    })),
    matchedCategory: category
      ? { id: category.id, name: category.name, slug: category.slug }
      : null,
  });

  if (!category) {
    const fallbackGroups = buildCloudinaryIndexProviderGroups(categoryName);
    console.warn("[catalog] listProviderGroupsFromCatalog:fallback_no_category", {
      categoryName,
      groups: fallbackGroups.map((group) => ({
        provider: group.provider,
        stones: group.stones.length,
      })),
    });
    return fallbackGroups;
  }

  const categoryProducts = catalog.products.filter(
    (product) => product.category_id === category.id
  );

  console.log("[catalog] listProviderGroupsFromCatalog:category_products", {
    categoryId: category.id,
    categoryName: category.name,
    totalProductsInCategory: categoryProducts.length,
    providersSeen: Array.from(
      new Set(categoryProducts.map((product) => resolveProductProvider(product)))
    ),
    sampleProducts: categoryProducts.slice(0, 10).map((product) => ({
      id: product.id,
      name: product.name,
      provider: resolveProductProvider(product),
    })),
  });

  const groups = new Map<string, ProviderStoneGroup>();

  for (const product of categoryProducts) {
    const provider = resolveProductProvider(product);
    const groupKey = slugify(provider);
    const stone = mapProductToStone(product, catalog.media, category.name);
    if (!stone) {
      console.warn("[catalog] listProviderGroupsFromCatalog:product_without_renderable_media", {
        productId: product.id,
        productName: product.name,
        provider,
        mediaCount: catalog.media.filter((item) => item.product_id === product.id).length,
      });
      continue;
    }

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        provider,
        slug: groupKey,
        stones: [],
      });
    }

    groups.get(groupKey)!.stones.push(stone);
  }

  const result = Array.from(groups.values()).filter((group) => group.stones.length > 0);
  console.log("[catalog] listProviderGroupsFromCatalog:result", {
    categoryName,
    groups: result.map((group) => ({
      provider: group.provider,
      slug: group.slug,
      stones: group.stones.length,
      sampleStoneNames: group.stones.slice(0, 5).map((stone) => stone.name),
    })),
  });

  if (result.length > 0) {
    return result;
  }

  const fallbackGroups = buildCloudinaryIndexProviderGroups(categoryName);
  console.warn("[catalog] listProviderGroupsFromCatalog:fallback_empty_result", {
    categoryName,
    groups: fallbackGroups.map((group) => ({
      provider: group.provider,
      stones: group.stones.length,
    })),
  });
  return fallbackGroups;
}
