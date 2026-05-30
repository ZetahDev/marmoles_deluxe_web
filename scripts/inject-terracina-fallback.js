#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";

const INDEX_PATH = "src/data/cloudinary-index.json";
const TARGET_CATEGORY = "PIEDRA+SINTERIZADA/TERRACINA";
const PIEDRA_PREFIX = "PIEDRA+SINTERIZADA/";
const PROVIDER_NAME = "terracina";

function parseArgs(argv) {
  const args = {
    apply: false,
    baseUrl:
      process.env.PUBLIC_ADMIN_API_BASE_URL ||
      process.env.ADMIN_API_BASE_URL ||
      process.env.PUBLIC_API_URL ||
      "",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--apply") args.apply = true;
    if (token === "--base-url" && argv[i + 1]) {
      args.baseUrl = argv[i + 1];
      i += 1;
    } else if (token.startsWith("--base-url=")) {
      args.baseUrl = token.split("=")[1] ?? "";
    }
  }

  return args;
}

function normalize(value) {
  return (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function normalizeCloudinaryPublicId(publicId) {
  const clean = (publicId ?? "").trim().replace(/^\/+/, "");
  if (!clean) return "";
  if (/^https?:\/\//i.test(clean)) return clean;
  if (clean.startsWith("marmoles-deluxe/")) return clean;
  return `marmoles-deluxe/${clean}`;
}

function isCloudinaryDeliveryUrl(value) {
  return /^https?:\/\/res\.cloudinary\.com\//i.test(value || "");
}

function toCloudinaryFetchUrl(cloudName, sourceUrl) {
  return `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${encodeURIComponent(sourceUrl)}`;
}

function buildUrl(value, cloudName) {
  if (!value) return "";
  const normalized = normalizeCloudinaryPublicId(value);
  if (/^https?:\/\//i.test(normalized)) {
    return isCloudinaryDeliveryUrl(normalized)
      ? normalized
      : toCloudinaryFetchUrl(cloudName, normalized);
  }
  return `https://res.cloudinary.com/${cloudName}/image/upload/${normalized}`;
}

function sortMedia(media) {
  return [...media].sort((left, right) => {
    const leftPrimary = left.is_primary ? 1 : 0;
    const rightPrimary = right.is_primary ? 1 : 0;
    if (leftPrimary !== rightPrimary) return rightPrimary - leftPrimary;
    return (left.sort_order ?? 9999) - (right.sort_order ?? 9999);
  });
}

function mapStoneFromProduct(product, mediaByProductId, cloudName) {
  const media = sortMedia(mediaByProductId.get(product.id) ?? []);
  if (media.length === 0) return null;

  const mainMedia = media[0];
  const designMedia =
    media.find((item) =>
      /(design|desing)/i.test(item.public_id || item.url || item.thumbnail_url || "")
    ) ||
    media[1] ||
    mainMedia;

  const image = buildUrl(mainMedia.url || mainMedia.thumbnail_url || mainMedia.public_id, cloudName);
  const design = buildUrl(
    designMedia.url || designMedia.thumbnail_url || designMedia.public_id,
    cloudName
  );
  if (!image) return null;

  return {
    name: product.name,
    image,
    design: design || image,
  };
}

async function fetchCatalog(baseUrl) {
  const normalized = baseUrl.replace(/\/+$/, "");
  const res = await fetch(`${normalized}/api/public/catalog`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`GET /api/public/catalog -> ${res.status} ${res.statusText}`);
  }
  const payload = await res.json();
  return payload?.data ?? null;
}

function reorderPiedraCategories(categoriesObj) {
  const allEntries = Object.entries(categoriesObj);
  const piedraEntries = allEntries.filter(([key]) => key.startsWith(PIEDRA_PREFIX));
  const otherEntries = allEntries.filter(([key]) => !key.startsWith(PIEDRA_PREFIX));
  const orderedPiedra = piedraEntries.sort((a, b) => {
    if (a[0] === TARGET_CATEGORY) return -1;
    if (b[0] === TARGET_CATEGORY) return 1;
    return a[0].localeCompare(b[0]);
  });
  return Object.fromEntries([...otherEntries, ...orderedPiedra]);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.baseUrl) {
    throw new Error(
      "Falta base URL. Usa --base-url=https://tu-admin o define PUBLIC_ADMIN_API_BASE_URL."
    );
  }

  const indexRaw = readFileSync(INDEX_PATH, "utf-8");
  const indexData = JSON.parse(indexRaw);

  const catalog = await fetchCatalog(args.baseUrl);
  if (!catalog) throw new Error("Respuesta sin data en /api/public/catalog");

  const categories = catalog.categories ?? [];
  const products = catalog.products ?? [];
  const media = catalog.media ?? [];
  const cloudName = indexData.cloudName || "dudv2dh4w";

  const piedraCategory = categories.find(
    (item) => normalize(item.name) === normalize("Piedra sinterizada")
  );
  if (!piedraCategory) {
    throw new Error("No se encontro categoria 'Piedra sinterizada' en API publica");
  }

  const terracinaProducts = products.filter((product) => {
    if (product.category_id !== piedraCategory.id) return false;
    const provider = product.provider || product.metadata?.provider || "";
    return normalize(provider) === PROVIDER_NAME;
  });

  const mediaByProductId = media.reduce((acc, item) => {
    const list = acc.get(item.product_id) ?? [];
    list.push(item);
    acc.set(item.product_id, list);
    return acc;
  }, new Map());

  const stones = terracinaProducts
    .map((product) => mapStoneFromProduct(product, mediaByProductId, cloudName))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  const report = {
    baseUrl: args.baseUrl,
    targetCategory: TARGET_CATEGORY,
    terracinaProductsFound: terracinaProducts.length,
    terracinaStonesRenderable: stones.length,
    terracinaStonesSample: stones.slice(0, 10).map((stone) => stone.name),
    mode: args.apply ? "apply" : "dry-run",
  };

  if (stones.length === 0) {
    console.log(JSON.stringify({ ...report, warning: "no_renderable_stones" }, null, 2));
    return;
  }

  const categoriesIndex = indexData.categories ?? {};
  categoriesIndex[TARGET_CATEGORY] = stones;
  indexData.categories = reorderPiedraCategories(categoriesIndex);
  indexData.generatedAt = new Date().toISOString();
  indexData.source = "public-catalog-terracina-inject";

  if (!args.apply) {
    console.log(JSON.stringify({ ...report, action: "no_changes_written" }, null, 2));
    return;
  }

  writeFileSync(INDEX_PATH, `${JSON.stringify(indexData, null, 2)}\n`, "utf-8");
  console.log(JSON.stringify({ ...report, action: "written", output: INDEX_PATH }, null, 2));
}

main().catch((error) => {
  console.error("[inject-terracina-fallback] error:", error.message);
  process.exit(1);
});
