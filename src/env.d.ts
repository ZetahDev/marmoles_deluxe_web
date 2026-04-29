/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_AWS_ACCESS_KEY_ID?: string;
  readonly PUBLIC_AWS_SECRET_ACCESS_KEY?: string;
  readonly PUBLIC_AWS_REGION?: string;
  readonly PUBLIC_AWS_BUCKET_NAME?: string;

  // Wompi Payment Gateway
  readonly PUBLIC_WOMPI_ENVIRONMENT: "test" | "production";

  // Llaves de TEST
  readonly PUBLIC_WOMPI_PUBLIC_KEY_TEST?: string;
  readonly WOMPI_PRIVATE_KEY_TEST?: string;
  readonly PUBLIC_WOMPI_EVENTS_SECRET_TEST?: string;
  readonly PUBLIC_WOMPI_INTEGRITY_SECRET_TEST?: string;

  // Llaves de PRODUCCIÓN
  readonly PUBLIC_WOMPI_PUBLIC_KEY_PROD?: string;
  readonly WOMPI_PRIVATE_KEY_PROD?: string;
  readonly PUBLIC_WOMPI_EVENTS_SECRET_PROD?: string;
  readonly PUBLIC_WOMPI_INTEGRITY_SECRET_PROD?: string;

  readonly PUBLIC_SITE_URL: string;

  // N8N Webhook
  readonly PUBLIC_N8N_WEBHOOK_URL?: string;

  // Google Sheets
  readonly GOOGLE_SHEET_ID?: string;

  // Telegram
  readonly TELEGRAM_BOT_TOKEN?: string;
  readonly TELEGRAM_CHAT_ID?: string;

  // Email
  readonly EMAIL_SERVICE_ID?: string;
  readonly EMAIL_TEMPLATE_ID?: string;
  readonly EMAIL_PUBLIC_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
