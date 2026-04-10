const CLOUDINARY_UPLOAD_MARKER = "/image/upload/";

type CloudinaryPreset = {
  defaultWidth: number;
  widths: number[];
  sizes: string;
  transforms: string[];
};

export const CLOUDINARY_PRESETS: Record<string, CloudinaryPreset> = {
  hero: {
    defaultWidth: 1920,
    widths: [768, 1024, 1366, 1600, 1920, 2560],
    sizes: "100vw",
    transforms: ["f_auto", "q_auto", "dpr_auto", "c_fill", "g_auto"],
  },
  card: {
    defaultWidth: 768,
    widths: [320, 480, 640, 768, 960],
    sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
    transforms: ["f_auto", "q_auto", "dpr_auto", "c_limit"],
  },
  modal: {
    defaultWidth: 1280,
    widths: [480, 768, 1024, 1280, 1600],
    sizes: "(max-width: 1024px) 100vw, 60vw",
    transforms: ["f_auto", "q_auto", "dpr_auto", "c_fit"],
  },
  masonry: {
    defaultWidth: 640,
    widths: [320, 480, 640, 900],
    sizes: "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw",
    transforms: ["f_auto", "q_auto", "dpr_auto", "c_fill", "g_auto"],
  },
  logo: {
    defaultWidth: 320,
    widths: [120, 180, 240, 320, 480],
    sizes: "(max-width: 768px) 120px, 180px",
    transforms: ["f_auto", "q_auto", "dpr_auto", "c_fit"],
  },
  seo: {
    defaultWidth: 1200,
    widths: [1200],
    sizes: "1200px",
    transforms: ["f_auto", "q_auto", "dpr_auto", "c_fill", "g_auto"],
  },
};

export function isCloudinaryUrl(url: string): boolean {
  return (
    typeof url === "string" &&
    url.includes("res.cloudinary.com") &&
    url.includes(CLOUDINARY_UPLOAD_MARKER)
  );
}

export function withCloudinaryTransforms(
  url: string,
  transforms: string[]
): string {
  if (!isCloudinaryUrl(url) || transforms.length === 0) {
    return url;
  }

  const markerIndex = url.indexOf(CLOUDINARY_UPLOAD_MARKER);
  if (markerIndex < 0) {
    return url;
  }

  const prefix = url.slice(0, markerIndex + CLOUDINARY_UPLOAD_MARKER.length);
  const suffix = url
    .slice(markerIndex + CLOUDINARY_UPLOAD_MARKER.length)
    .replace(/^\/+/, "");

  return `${prefix}${transforms.join(",")}/${suffix}`;
}

export function buildCloudinarySrcSet(
  url: string,
  widths: number[],
  transforms: string[]
): string {
  if (!isCloudinaryUrl(url) || widths.length === 0) {
    return "";
  }

  return widths
    .map((width) => {
      const transformedUrl = withCloudinaryTransforms(url, [
        ...transforms,
        `w_${width}`,
      ]);
      return `${transformedUrl} ${width}w`;
    })
    .join(", ");
}

export function buildCloudinaryImageSet(
  url: string,
  preset: CloudinaryPreset
): {
  src: string;
  srcSet?: string;
  sizes?: string;
} {
  if (!isCloudinaryUrl(url)) {
    return { src: url };
  }

  return {
    src: withCloudinaryTransforms(url, [
      ...preset.transforms,
      `w_${preset.defaultWidth}`,
    ]),
    srcSet: buildCloudinarySrcSet(url, preset.widths, preset.transforms),
    sizes: preset.sizes,
  };
}

export function buildSeoImageUrl(url: string): string {
  return buildCloudinaryImageSet(url, CLOUDINARY_PRESETS.seo).src;
}

