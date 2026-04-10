import cloudinaryIndex from "../../data/cloudinary-index.json";

type BrandLogoMap = Record<string, string>;

interface CloudinaryAssets {
  branding: {
    logoMain: string;
    brandLogos: BrandLogoMap;
  };
  home: {
    hero: string;
    detail: string;
    projectBlackDiamond: string;
    projectRoyalWhite: string;
    projectIslaInfinity: string;
    projectLobbyMajestic: string;
    projects: string[];
  };
  promo: {
    blancoPolar: string[];
  };
  seo: {
    default: string;
    contact: string;
    projects: string;
    piedraSinterizada: string;
  };
}

export const cloudinaryAssets = cloudinaryIndex.assets as CloudinaryAssets;

export function getBrandLogo(brandName: string): string {
  const entries = Object.entries(cloudinaryAssets.branding.brandLogos);
  const found = entries.find(
    ([key]) => key.toLowerCase() === brandName.toLowerCase()
  );
  return found?.[1] ?? cloudinaryAssets.branding.logoMain;
}

