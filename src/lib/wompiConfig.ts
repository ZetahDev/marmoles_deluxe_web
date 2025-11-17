import type { WompiConfig } from "../types/wompi";

// Determinar ambiente
const environment =
  (import.meta.env.PUBLIC_WOMPI_ENVIRONMENT as "test" | "production") || "test";
const isProduction = environment === "production";

// Seleccionar llaves según el ambiente
const publicKey = isProduction
  ? import.meta.env.PUBLIC_WOMPI_PUBLIC_KEY_PROD
  : import.meta.env.PUBLIC_WOMPI_PUBLIC_KEY_TEST;

const privateKey = isProduction
  ? import.meta.env.WOMPI_PRIVATE_KEY_PROD
  : import.meta.env.WOMPI_PRIVATE_KEY_TEST;

const eventsSecret = isProduction
  ? import.meta.env.PUBLIC_WOMPI_EVENTS_SECRET_PROD
  : import.meta.env.PUBLIC_WOMPI_EVENTS_SECRET_TEST;

const integritySecret = isProduction
  ? import.meta.env.PUBLIC_WOMPI_INTEGRITY_SECRET_PROD
  : import.meta.env.PUBLIC_WOMPI_INTEGRITY_SECRET_TEST;

// Configuración de Wompi desde variables de entorno
export const wompiConfig: WompiConfig = {
  publicKey: publicKey || "pub_test_default",
  privateKey,
  eventsSecret,
  integritySecret,
  environment,
  redirectUrl: `${
    import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321"
  }/confirmacion-pago`,
  webhookUrl: import.meta.env.PUBLIC_N8N_WEBHOOK_URL,
};

// Validar que las variables de entorno estén configuradas
export function validateWompiConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!publicKey) {
    errors.push(
      `PUBLIC_WOMPI_PUBLIC_KEY_${
        isProduction ? "PROD" : "TEST"
      } no está configurada`
    );
  }

  if (!import.meta.env.PUBLIC_SITE_URL) {
    errors.push("PUBLIC_SITE_URL no está configurada");
  }

  if (!import.meta.env.PUBLIC_N8N_WEBHOOK_URL) {
    console.warn(
      "⚠️ PUBLIC_N8N_WEBHOOK_URL no está configurada. Los webhooks no funcionarán."
    );
  }

  if (!integritySecret) {
    console.warn(
      `⚠️ PUBLIC_WOMPI_INTEGRITY_SECRET_${
        isProduction ? "PROD" : "TEST"
      } no está configurada. La validación de webhooks no será segura.`
    );
  }

  if (!eventsSecret) {
    console.warn(
      `⚠️ PUBLIC_WOMPI_EVENTS_SECRET_${
        isProduction ? "PROD" : "TEST"
      } no está configurada.`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Log de configuración (solo en desarrollo)
if (import.meta.env.DEV) {
  console.log("🔧 Wompi Config:", {
    environment: wompiConfig.environment,
    publicKey: publicKey?.substring(0, 15) + "...",
    redirectUrl: wompiConfig.redirectUrl,
    webhookUrl: wompiConfig.webhookUrl,
    hasIntegritySecret: !!integritySecret,
    integritySecretPreview: integritySecret?.substring(0, 25) + "...",
  });

  const validation = validateWompiConfig();
  if (!validation.valid) {
    console.error("❌ Errores en configuración de Wompi:", validation.errors);
  } else {
    console.log(
      `✅ Configuración de Wompi válida (ambiente: ${environment.toUpperCase()})`
    );
  }
}
