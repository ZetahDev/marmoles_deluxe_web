type PublicCatalogResponse = {
  data?: {
    products?: Array<{
      id: string;
      name: string;
      category_id?: string;
    }>;
    media?: Array<{
      product_id: string;
      public_id: string;
      provider?: string;
      transforms?: Record<string, unknown>;
    }>;
  };
};

export async function fetchDesignImagesFromAdminApi() {
  const baseUrl = import.meta.env.PUBLIC_ADMIN_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const response = await fetch(`${baseUrl}/api/public/catalog`);
    if (!response.ok) return null;
    const payload = (await response.json()) as PublicCatalogResponse;

    const media = payload.data?.media ?? [];
    if (media.length === 0) return null;

    const urls = media.map((item) => {
      if (item.provider === "cloudinary" && item.public_id) {
        return `https://res.cloudinary.com/${import.meta.env.CLOUDINARY_CLOUD_NAME || "dudv2dh4w"}/image/upload/${item.public_id}`;
      }
      return item.public_id;
    });

    return urls.filter(Boolean);
  } catch {
    return null;
  }
}

