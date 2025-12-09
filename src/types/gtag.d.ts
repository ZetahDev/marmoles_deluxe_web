// Declaración de tipos para Google Analytics, Google Tag Manager y Facebook Pixel
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (action: string, event: string, params?: Record<string, any>) => void;
    _fbq?: any;
  }
}

export {};
