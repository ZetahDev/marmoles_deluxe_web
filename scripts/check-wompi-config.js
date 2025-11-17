/**
 * Script de Diagnóstico de Configuración de Wompi
 *
 * Ejecutar con: npm run check-wompi
 *
 * Verifica que todas las variables de entorno estén correctamente configuradas
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno manualmente
const envPath = join(__dirname, "..", ".env");
let envVars = {};

try {
  const envContent = readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    line = line.trim();
    if (line && !line.startsWith("#")) {
      const [key, ...valueParts] = line.split("=");
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join("=").trim();
      }
    }
  });
} catch (error) {
  console.error("❌ Error leyendo .env:", error.message);
  process.exit(1);
}

const checks = {
  "✅ Configuración Válida": [],
  "⚠️ Advertencias": [],
  "❌ Errores Críticos": [],
};

// Check 0: Environment
const environment = envVars.PUBLIC_WOMPI_ENVIRONMENT;
const isProduction = environment === "production";
const envSuffix = isProduction ? "PROD" : "TEST";

if (!environment) {
  checks["❌ Errores Críticos"].push(
    "PUBLIC_WOMPI_ENVIRONMENT no está configurada"
  );
} else if (environment === "test") {
  checks["✅ Configuración Válida"].push(
    "Ambiente: TEST (Sandbox) - No se procesarán pagos reales"
  );
} else if (environment === "production") {
  checks["⚠️ Advertencias"].push(
    "Ambiente: PRODUCTION - Se procesarán pagos REALES con dinero"
  );
} else {
  checks["❌ Errores Críticos"].push(
    `PUBLIC_WOMPI_ENVIRONMENT tiene valor inválido: ${environment}`
  );
}

// Check 1: Public Key
const publicKey = envVars[`PUBLIC_WOMPI_PUBLIC_KEY_${envSuffix}`];
if (!publicKey) {
  checks["❌ Errores Críticos"].push(
    `PUBLIC_WOMPI_PUBLIC_KEY_${envSuffix} no está configurada`
  );
} else if (publicKey.includes("xxxxxxxxxx")) {
  checks["⚠️ Advertencias"].push(
    `PUBLIC_WOMPI_PUBLIC_KEY_${envSuffix} tiene el valor de ejemplo`
  );
} else if (publicKey.startsWith("pub_test_") && !isProduction) {
  checks["✅ Configuración Válida"].push(
    "Public Key (TEST) configurada correctamente"
  );
} else if (publicKey.startsWith("pub_prod_") && isProduction) {
  checks["✅ Configuración Válida"].push(
    "Public Key (PROD) configurada correctamente"
  );
} else {
  checks["❌ Errores Críticos"].push(
    `PUBLIC_WOMPI_PUBLIC_KEY_${envSuffix} tiene formato inválido o no coincide con el ambiente`
  );
}

// Check 2: Private Key
const privateKey = envVars[`WOMPI_PRIVATE_KEY_${envSuffix}`];
if (!privateKey) {
  checks["⚠️ Advertencias"].push(
    `WOMPI_PRIVATE_KEY_${envSuffix} no está configurada (opcional)`
  );
} else if (privateKey.includes("xxxxxxxxxx")) {
  checks["⚠️ Advertencias"].push(
    `WOMPI_PRIVATE_KEY_${envSuffix} tiene el valor de ejemplo`
  );
} else if (
  (privateKey.startsWith("prv_test_") && !isProduction) ||
  (privateKey.startsWith("prv_prod_") && isProduction)
) {
  checks["✅ Configuración Válida"].push(
    "Private Key configurada correctamente"
  );
} else {
  checks["❌ Errores Críticos"].push(
    `WOMPI_PRIVATE_KEY_${envSuffix} tiene formato inválido o no coincide con el ambiente`
  );
}

// Check 3: Events Secret
const eventsSecret = envVars[`PUBLIC_WOMPI_EVENTS_SECRET_${envSuffix}`];
if (!eventsSecret) {
  checks["⚠️ Advertencias"].push(
    `PUBLIC_WOMPI_EVENTS_SECRET_${envSuffix} no está configurada`
  );
} else if (eventsSecret.includes("xxxxxxxxxx")) {
  checks["⚠️ Advertencias"].push(
    `PUBLIC_WOMPI_EVENTS_SECRET_${envSuffix} tiene el valor de ejemplo`
  );
} else if (
  (eventsSecret.startsWith("test_events_") && !isProduction) ||
  (eventsSecret.startsWith("prod_events_") && isProduction)
) {
  checks["✅ Configuración Válida"].push(
    "Events Secret configurada correctamente"
  );
} else {
  checks["❌ Errores Críticos"].push(
    `PUBLIC_WOMPI_EVENTS_SECRET_${envSuffix} tiene formato inválido o no coincide con el ambiente`
  );
}

// Check 4: Integrity Secret
const integritySecret = envVars[`PUBLIC_WOMPI_INTEGRITY_SECRET_${envSuffix}`];
if (!integritySecret) {
  checks["❌ Errores Críticos"].push(
    `PUBLIC_WOMPI_INTEGRITY_SECRET_${envSuffix} no está configurada - REQUERIDA para validación de webhooks`
  );
} else if (integritySecret.includes("xxxxxxxxxx")) {
  checks["⚠️ Advertencias"].push(
    `PUBLIC_WOMPI_INTEGRITY_SECRET_${envSuffix} tiene el valor de ejemplo`
  );
} else if (
  (integritySecret.startsWith("test_integrity_") && !isProduction) ||
  (integritySecret.startsWith("prod_integrity_") && isProduction)
) {
  checks["✅ Configuración Válida"].push(
    "Integrity Secret configurada correctamente - Webhooks seguros ✓"
  );
} else {
  checks["❌ Errores Críticos"].push(
    `PUBLIC_WOMPI_INTEGRITY_SECRET_${envSuffix} tiene formato inválido o no coincide con el ambiente`
  );
}

// Check 5: Site URL
const siteUrl = envVars.PUBLIC_SITE_URL;
if (!siteUrl) {
  checks["❌ Errores Críticos"].push("PUBLIC_SITE_URL no está configurada");
} else if (siteUrl.includes("localhost")) {
  checks["⚠️ Advertencias"].push(
    `Site URL es localhost: ${siteUrl} - No funcionará para webhooks en producción`
  );
} else {
  checks["✅ Configuración Válida"].push(`Site URL: ${siteUrl}`);
}

// Check 6: N8N Webhook
const n8nUrl = envVars.PUBLIC_N8N_WEBHOOK_URL;
if (!n8nUrl) {
  checks["⚠️ Advertencias"].push(
    "PUBLIC_N8N_WEBHOOK_URL no está configurada - Los webhooks no se procesarán"
  );
} else if (n8nUrl.includes("localhost")) {
  checks["⚠️ Advertencias"].push(
    "N8N Webhook es localhost - Requiere túnel (ngrok) para recibir webhooks de Wompi"
  );
} else {
  checks["✅ Configuración Válida"].push(`N8N Webhook configurada: ${n8nUrl}`);
}

// Check 7: Verificar que todas las llaves del ambiente actual estén configuradas
const allKeysConfigured =
  publicKey && privateKey && eventsSecret && integritySecret;
if (allKeysConfigured) {
  checks["✅ Configuración Válida"].push(
    `Todas las llaves de ${envSuffix} están configuradas correctamente`
  );
}

// Mostrar resultados
console.log("\n" + "=".repeat(70));
console.log("🔍 DIAGNÓSTICO DE CONFIGURACIÓN DE WOMPI");
console.log("=".repeat(70) + "\n");

Object.entries(checks).forEach(([category, items]) => {
  if (items.length > 0) {
    console.log(`\n${category}:`);
    items.forEach((item) => console.log(`  • ${item}`));
  }
});

console.log("\n" + "=".repeat(70));

// Resumen final
const hasErrors = checks["❌ Errores Críticos"].length > 0;
const hasWarnings = checks["⚠️ Advertencias"].length > 0;

if (hasErrors) {
  console.log(
    "\n🚫 CONFIGURACIÓN INCOMPLETA - Corrige los errores críticos antes de continuar"
  );
  process.exit(1);
} else if (hasWarnings) {
  console.log("\n⚠️ CONFIGURACIÓN FUNCIONAL - Pero revisa las advertencias");
  process.exit(0);
} else {
  console.log("\n✅ CONFIGURACIÓN PERFECTA - Todo listo para procesar pagos");
  process.exit(0);
}
