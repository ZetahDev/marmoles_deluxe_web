/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_AWS_ACCESS_KEY_ID?: string;
  readonly PUBLIC_AWS_SECRET_ACCESS_KEY?: string;
  readonly PUBLIC_AWS_REGION?: string;
  readonly PUBLIC_AWS_BUCKET_NAME?: string;

  // Wompi Payment Gateway
  readonly PUBLIC_WOMPI_PUBLIC_KEY: string;
  readonly WOMPI_PRIVATE_KEY?: string;
  readonly PUBLIC_WOMPI_ENVIRONMENT: "test" | "production";
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
