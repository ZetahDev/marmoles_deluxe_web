#!/usr/bin/env node

import { v2 as cloudinary } from "cloudinary";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { join, posix } from "path";

const S3_BUCKET = "marmolesdeluxe";
const S3_REGION = "us-east-2";
const S3_BASE_URL = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`;
const OUTPUT_FILE = "src/data/cloudinary-index.json";
const CLOUDINARY_PREFIX = "marmoles-deluxe";

const CATALOG_CATEGORIES = [
  "MARMOL",
  "QUARSTONE",
  "GRANITOS+NATURALES",
  "PIEDRA+SINTERIZADA/ALTEA",
  "PIEDRA+SINTERIZADA/DEKTON",
  "PIEDRA+SINTERIZADA/NEOLITH",
  "PIEDRA+SINTERIZADA/SILESTONE",
  "PIEDRA+SINTERIZADA/ARTEMARMOL",
];

const HOME_REMOTE_ASSETS = [
  {
    key: "hero",
    source:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
  },
  {
    key: "detail",
    source:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
  },
  {
    key: "projectBlackDiamond",
    source:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=60&w=600&auto=format&fit=crop",
  },
  {
    key: "projectRoyalWhite",
    source:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=60&w=600&auto=format&fit=crop",
  },
  {
    key: "projectIslaInfinity",
    source:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=60&w=600&auto=format&fit=crop",
  },
  {
    key: "projectLobbyMajestic",
    source:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=60&w=600&auto=format&fit=crop",
  },
];

function loadDotEnvFile(dotEnvPath = ".env") {
  if (!existsSync(dotEnvPath)) return;

  const content = readFileSync(dotEnvPath, "utf-8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) {
      continue;
    }

    const [keyPart, ...valueParts] = line.split("=");
    const key = keyPart.trim();
    if (!key || process.env[key]) {
      continue;
    }

    let value = valueParts.join("=").trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function parseArgs(argv) {
  const args = {
    dryRun: false,
    overwrite: false,
    concurrency: 6,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === "--dry-run") {
      args.dryRun = true;
    } else if (token === "--overwrite") {
      args.overwrite = true;
    } else if (token === "--concurrency" && argv[i + 1]) {
      args.concurrency = Number(argv[i + 1]);
      i += 1;
    } else if (token.startsWith("--concurrency=")) {
      args.concurrency = Number(token.split("=")[1]);
    }
  }

  if (!Number.isFinite(args.concurrency) || args.concurrency < 1) {
    args.concurrency = 6;
  }

  return args;
}

function ensureCloudinaryConfig() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) {
    throw new Error("CLOUDINARY_URL no está configurada en el entorno.");
  }

  const parsed = new URL(cloudinaryUrl);
  const cloudName = parsed.hostname;
  const apiKey = decodeURIComponent(parsed.username || "");
  const apiSecret = decodeURIComponent(parsed.password || "");
  if (!cloudName) {
    throw new Error("No se pudo extraer cloud name desde CLOUDINARY_URL.");
  }
  if (!apiKey || !apiSecret) {
    throw new Error(
      "No se pudo extraer api_key/api_secret desde CLOUDINARY_URL."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
  return { cloudName };
}

function normalizeSegment(value) {
  return decodeURIComponent(value)
    .replace(/\+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-_]+|[-_]+$/g, "")
    .toLowerCase();
}

function formatStoneName(value) {
  return value
    .replace(/_(?:desing|design)s?\s*$/i, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function filenameWithoutExt(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}

function isImageFile(filename) {
  return /\.(webp|png|jpe?g|avif)$/i.test(filename);
}

function isDesignStem(stem) {
  return /_(?:desing|design)s?\s*$/i.test(stem);
}

function normalizeStemForGrouping(stem) {
  return stem
    .replace(/_(?:desing|design)s?\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function toCloudinaryPublicIdFromS3Key(s3Key) {
  const cleanedKey = s3Key.replace(/^FOTOS\//, "");
  const parts = cleanedKey.split("/");
  const filename = parts.pop() ?? "";
  const stem = filenameWithoutExt(decodeURIComponent(filename));
  const normalizedParts = parts.map(normalizeSegment).filter(Boolean);
  const normalizedStem = normalizeSegment(stem);
  return posix.join(
    CLOUDINARY_PREFIX,
    "catalog",
    ...normalizedParts,
    normalizedStem
  );
}

function toCloudinaryUrl(cloudName, publicId) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
}

async function listS3Files(category) {
  const prefix = `FOTOS/${category}/`;
  const listUrl = `${S3_BASE_URL}/?list-type=2&prefix=${prefix}`;
  const response = await fetch(listUrl);
  if (!response.ok) {
    throw new Error(
      `No se pudo listar S3 para ${category}. Status: ${response.status}`
    );
  }

  const xml = await response.text();
  const keys = [...xml.matchAll(/<Key>(.*?)<\/Key>/g)]
    .map((match) => match[1])
    .filter((key) => isImageFile(key));

  return keys.sort((a, b) => a.localeCompare(b));
}

function createCatalogFromS3Keys(category, keys, cloudName) {
  const grouped = new Map();
  const designGallery = [];

  for (const key of keys) {
    const rawFilename = decodeURIComponent(key.split("/").pop() ?? "");
    const stem = filenameWithoutExt(rawFilename).trim();
    const canonical = normalizeStemForGrouping(stem);
    const publicId = toCloudinaryPublicIdFromS3Key(key);
    const deliveryUrl = toCloudinaryUrl(cloudName, publicId);
    const isDesign = isDesignStem(stem);
    const existing = grouped.get(canonical) ?? {};

    if (isDesign) {
      grouped.set(canonical, { ...existing, design: deliveryUrl });
      designGallery.push({
        name: formatStoneName(canonical),
        category: category.split("/").pop() ?? category,
        url: deliveryUrl,
      });
    } else {
      grouped.set(canonical, { ...existing, image: deliveryUrl });
    }
  }

  const stones = [...grouped.entries()]
    .map(([nameKey, value]) => {
      const image = value.image ?? value.design;
      const design = value.design ?? value.image;
      if (!image || !design) return null;

      return {
        name: formatStoneName(nameKey),
        image,
        design,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    category,
    stones,
    designGallery: designGallery.sort((a, b) => a.name.localeCompare(b.name)),
  };
}

function collectLocalAssets() {
  const tasks = [];
  const assetRefs = {
    logoMain: "",
    brandLogos: {},
  };

  const imagesDir = "public/images";
  const logosDir = "public/logos";

  const logoMainPath = join(imagesDir, "logo.webp");
  if (existsSync(logoMainPath)) {
    const publicId = `${CLOUDINARY_PREFIX}/assets/images/logo`;
    tasks.push({
      key: "logoMain",
      source: logoMainPath,
      publicId,
      kind: "asset",
    });
    assetRefs.logoMain = publicId;
  }

  if (existsSync(logosDir)) {
    const logoFiles = readdirSync(logosDir)
      .filter((file) => isImageFile(file))
      .sort((a, b) => a.localeCompare(b));

    for (const logoFile of logoFiles) {
      const stem = normalizeSegment(filenameWithoutExt(logoFile));
      const brandName = filenameWithoutExt(logoFile);
      const publicId = `${CLOUDINARY_PREFIX}/assets/logos/${stem}`;
      tasks.push({
        key: `brandLogo:${brandName}`,
        source: join(logosDir, logoFile),
        publicId,
        kind: "asset",
      });
      assetRefs.brandLogos[brandName] = publicId;
    }
  }

  return { tasks, assetRefs };
}

function collectRemoteAssets() {
  const tasks = [];
  const refs = {};

  for (const item of HOME_REMOTE_ASSETS) {
    const publicId = `${CLOUDINARY_PREFIX}/assets/home/${normalizeSegment(
      item.key
    )}`;
    tasks.push({
      key: `home:${item.key}`,
      source: item.source,
      publicId,
      kind: "asset",
    });
    refs[item.key] = publicId;
  }

  return { tasks, refs };
}

function uniqueTasks(tasks) {
  const byPublicId = new Map();

  for (const task of tasks) {
    if (!byPublicId.has(task.publicId)) {
      byPublicId.set(task.publicId, task);
    }
  }

  return [...byPublicId.values()];
}

async function listExistingResources(prefix) {
  const existing = new Map();
  let nextCursor;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix,
      max_results: 500,
      next_cursor: nextCursor,
    });

    for (const resource of result.resources ?? []) {
      existing.set(resource.public_id, resource.secure_url);
    }

    nextCursor = result.next_cursor;
  } while (nextCursor);

  return existing;
}

async function runConcurrently(items, concurrency, worker) {
  const results = [];
  let index = 0;

  async function runner() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => runner()
  );
  await Promise.all(workers);
  return results;
}

async function uploadTasks({
  tasks,
  dryRun,
  overwrite,
  existingResources,
  concurrency,
}) {
  return runConcurrently(tasks, concurrency, async (task) => {
    if (dryRun) {
      return { ...task, status: "dry-run" };
    }

    if (!overwrite && existingResources.has(task.publicId)) {
      return { ...task, status: "skipped-existing" };
    }

    const result = await cloudinary.uploader.upload(task.source, {
      public_id: task.publicId,
      overwrite,
      unique_filename: false,
      resource_type: "image",
    });

    return { ...task, status: "uploaded", secureUrl: result.secure_url };
  });
}

function ensureDirForFile(filePath) {
  const dir = filePath.split("/").slice(0, -1).join("/");
  if (dir && !existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function toS3UploadUrl(key) {
  return `${S3_BASE_URL}/${encodeURI(key).replace(/#/g, "%23")}`;
}

async function buildCatalog(cloudName) {
  const categories = {};
  const designGallery = [];
  const uploadTasks = [];

  for (const category of CATALOG_CATEGORIES) {
    const s3Keys = await listS3Files(category);
    const { stones, designGallery: designs } = createCatalogFromS3Keys(
      category,
      s3Keys,
      cloudName
    );

    categories[category] = stones;
    designGallery.push(...designs);

    for (const key of s3Keys) {
      uploadTasks.push({
        key: `catalog:${category}:${key}`,
        source: toS3UploadUrl(key),
        publicId: toCloudinaryPublicIdFromS3Key(key),
        kind: "catalog",
      });
    }
  }

  return {
    categories,
    designGallery: designGallery.sort((a, b) => a.name.localeCompare(b.name)),
    uploadTasks,
  };
}

function buildAssetsMap({
  cloudName,
  localAssetRefs,
  remoteAssetRefs,
  categories,
}) {
  const logoMainUrl = localAssetRefs.logoMain
    ? toCloudinaryUrl(cloudName, localAssetRefs.logoMain)
    : "";

  const brandLogos = Object.fromEntries(
    Object.entries(localAssetRefs.brandLogos).map(([name, publicId]) => [
      name,
      toCloudinaryUrl(cloudName, publicId),
    ])
  );

  const homeAssets = Object.fromEntries(
    Object.entries(remoteAssetRefs).map(([key, publicId]) => [
      key,
      toCloudinaryUrl(cloudName, publicId),
    ])
  );

  const quarstone =
    categories.QUARSTONE?.find((stone) =>
      stone.name.toLowerCase().includes("blanco polar")
    ) ?? null;

  const promoBlancoPolar = quarstone
    ? [quarstone.image, quarstone.design]
    : [
        toCloudinaryUrl(
          cloudName,
          `${CLOUDINARY_PREFIX}/catalog/quarstone/blanco_polar`
        ),
        toCloudinaryUrl(
          cloudName,
          `${CLOUDINARY_PREFIX}/catalog/quarstone/blanco_polar_desing`
        ),
      ];

  return {
    branding: {
      logoMain: logoMainUrl,
      brandLogos,
    },
    home: {
      ...homeAssets,
      projects: [
        homeAssets.projectBlackDiamond,
        homeAssets.projectRoyalWhite,
        homeAssets.projectIslaInfinity,
        homeAssets.projectLobbyMajestic,
      ].filter(Boolean),
    },
    promo: {
      blancoPolar: promoBlancoPolar,
    },
    seo: {
      default: homeAssets.hero || logoMainUrl,
      contact: homeAssets.detail || homeAssets.hero || logoMainUrl,
      projects:
        homeAssets.projectLobbyMajestic || homeAssets.detail || homeAssets.hero,
      piedraSinterizada: homeAssets.hero || logoMainUrl,
    },
  };
}

async function main() {
  loadDotEnvFile();
  const args = parseArgs(process.argv.slice(2));
  const { cloudName } = ensureCloudinaryConfig();

  console.log("🔎 Preparando inventario de catálogo desde S3...");
  const { categories, designGallery, uploadTasks: catalogUploadTasks } =
    await buildCatalog(cloudName);

  const { tasks: localAssetTasks, assetRefs: localAssetRefs } =
    collectLocalAssets();
  const { tasks: remoteAssetTasks, refs: remoteAssetRefs } =
    collectRemoteAssets();

  const allUploadTasks = uniqueTasks([
    ...catalogUploadTasks,
    ...localAssetTasks,
    ...remoteAssetTasks,
  ]);

  console.log(
    `🧩 Recursos detectados: ${allUploadTasks.length} (catálogo + assets fijos)`
  );

  let existingResources = new Map();
  if (!args.dryRun) {
    console.log("☁️ Consultando recursos existentes en Cloudinary...");
    existingResources = await listExistingResources(`${CLOUDINARY_PREFIX}/`);
    console.log(`✅ Recursos existentes encontrados: ${existingResources.size}`);
  }

  console.log(
    `🚀 Sincronizando en Cloudinary (dry-run=${args.dryRun}, overwrite=${args.overwrite}, concurrency=${args.concurrency})...`
  );
  const results = await uploadTasks({
    tasks: allUploadTasks,
    dryRun: args.dryRun,
    overwrite: args.overwrite,
    existingResources,
    concurrency: args.concurrency,
  });

  const uploaded = results.filter((r) => r.status === "uploaded").length;
  const skipped = results.filter((r) => r.status === "skipped-existing").length;
  const dryRun = results.filter((r) => r.status === "dry-run").length;

  console.log(
    `📦 Resultado sync: uploaded=${uploaded}, skippedExisting=${skipped}, dryRun=${dryRun}`
  );

  const assets = buildAssetsMap({
    cloudName,
    localAssetRefs,
    remoteAssetRefs,
    categories,
  });

  const cloudinaryIndex = {
    generatedAt: new Date().toISOString(),
    cloudName,
    source: {
      s3Bucket: S3_BUCKET,
      s3Region: S3_REGION,
      categories: CATALOG_CATEGORIES,
    },
    categories,
    designGallery,
    assets,
  };

  ensureDirForFile(OUTPUT_FILE);
  writeFileSync(OUTPUT_FILE, `${JSON.stringify(cloudinaryIndex, null, 2)}\n`);
  console.log(`📝 Índice actualizado en ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error("❌ Error ejecutando cloudinary:sync");
  console.error(error);
  process.exit(1);
});
