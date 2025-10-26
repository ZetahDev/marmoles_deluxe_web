import type { WompiConfig } from '../types/wompi';

// Configuración de Wompi desde variables de entorno
export const wompiConfig: WompiConfig = {
  publicKey: import.meta.env.PUBLIC_WOMPI_PUBLIC_KEY || 'pub_test_default',
  environment: (import.meta.env.PUBLIC_WOMPI_ENVIRONMENT as 'test' | 'production') || 'test',
  redirectUrl: `${import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321'}/confirmacion-pago`,
  webhookUrl: import.meta.env.PUBLIC_N8N_WEBHOOK_URL,
};

// Validar que las variables de entorno estén configuradas
export function validateWompiConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!import.meta.env.PUBLIC_WOMPI_PUBLIC_KEY) {
    errors.push('PUBLIC_WOMPI_PUBLIC_KEY no está configurada');
  }

  if (!import.meta.env.PUBLIC_SITE_URL) {
    errors.push('PUBLIC_SITE_URL no está configurada');
  }

  if (!import.meta.env.PUBLIC_N8N_WEBHOOK_URL) {
    console.warn('⚠️ PUBLIC_N8N_WEBHOOK_URL no está configurada. Los webhooks no funcionarán.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Log de configuración (solo en desarrollo)
if (import.meta.env.DEV) {
  console.log('🔧 Wompi Config:', {
    environment: wompiConfig.environment,
    publicKey: wompiConfig.publicKey.substring(0, 15) + '...',
    redirectUrl: wompiConfig.redirectUrl,
    webhookUrl: wompiConfig.webhookUrl,
  });

  const validation = validateWompiConfig();
  if (!validation.valid) {
    console.error('❌ Errores en configuración de Wompi:', validation.errors);
  } else {
    console.log('✅ Configuración de Wompi válida');
  }
}
