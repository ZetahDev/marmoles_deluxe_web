/**
 * Script para generar index.json de las imágenes en S3
 *
 * Este script escanea las carpetas locales FOTOS/ y genera un archivo
 * index.json que mapea las URLs de S3. Así evitamos necesitar permisos
 * de ListBucket en S3.
 *
 * Uso:
 * 1. Coloca tus imágenes en ./FOTOS/ siguiendo la estructura de S3
 * 2. Ejecuta: npm run generate-s3-index
 * 3. Sube el index.json generado a: s3://marmolesdeluxe/FOTOS/index.json
 */

import { readdirSync, statSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const S3_BUCKET = "marmolesdeluxe";
const S3_REGION = "us-east-2";
const S3_BASE_URL = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`;

// Carpeta local donde están las imágenes
const BASE_DIR = "./FOTOS";

/**
 * Escanea recursivamente una carpeta y retorna todos los archivos de imagen
 */
function scanDirectory(dir, relativePath = "") {
  const files = [];

  if (!existsSync(dir)) {
    console.warn(`⚠️  La carpeta ${dir} no existe`);
    return files;
  }

  try {
    const items = readdirSync(dir);

    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        const newRelativePath = relativePath ? `${relativePath}/${item}` : item;
        files.push(...scanDirectory(fullPath, newRelativePath));
      } else if (/\.(webp|png|jpg|jpeg)$/i.test(item)) {
        const filePath = relativePath ? `${relativePath}/${item}` : item;
        files.push(filePath);
      }
    }
  } catch (error) {
    console.warn(`⚠️  No se pudo escanear ${dir}:`, error.message);
  }

  return files;
}

/**
 * Genera el índice agrupado por categorías
 */
function generateIndex() {
  console.log("🔍 Escaneando carpetas de FOTOS/...\n");

  if (!existsSync(BASE_DIR)) {
    console.error(`❌ La carpeta ${BASE_DIR} no existe.`);
    console.log(
      `\n💡 Crea la carpeta y coloca las imágenes siguiendo la estructura:`
    );
    console.log(`   FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_White.webp`);
    process.exit(1);
  }

  // Escanear todas las carpetas
  const allFiles = scanDirectory(BASE_DIR);

  // Agrupar por categoría (subcarpetas principales)
  const index = {};

  allFiles.forEach((file) => {
    const parts = file.split("/");
    let category = "FOTOS";

    // Determinar la categoría basada en la ruta
    if (parts.length >= 2) {
      // Para rutas como PIEDRA+SINTERIZADA/ALTEA/archivo.webp
      if (parts[0] === "PIEDRA+SINTERIZADA" && parts.length >= 3) {
        category = `FOTOS/${parts[0]}/${parts[1]}`;
      } else {
        // Para rutas como MARMOL/archivo.webp o QUARSTONE/archivo.webp
        category = `FOTOS/${parts[0]}`;
      }
    }

    // Crear el array si no existe
    if (!index[category]) {
      index[category] = [];
    }

    // Agregar la URL completa
    index[category].push(`${S3_BASE_URL}/FOTOS/${file}`);
  });

  // Mostrar resumen
  console.log("📊 Resumen:\n");
  Object.keys(index)
    .sort()
    .forEach((category) => {
      console.log(`   ${category}: ${index[category].length} archivos`);
    });

  return index;
}

// Generar y guardar el índice
try {
  console.log("📋 Generando índice de S3...\n");
  const index = generateIndex();

  const outputPath = "./public/s3-index.json";
  writeFileSync(outputPath, JSON.stringify(index, null, 2));

  console.log(`\n✅ Índice generado en: ${outputPath}`);
  console.log("\n📤 Próximos pasos:");
  console.log("   1. Sube las imágenes a S3:");
  console.log(
    `      aws s3 sync ${BASE_DIR} s3://marmolesdeluxe/FOTOS --acl public-read`
  );
  console.log("\n   2. Sube el índice a S3:");
  console.log(
    `      aws s3 cp ${outputPath} s3://marmolesdeluxe/FOTOS/index.json --acl public-read`
  );
} catch (error) {
  console.error("\n❌ Error generando el índice:", error.message);
  process.exit(1);
}
