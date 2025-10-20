// Declaración de tipos para Google Analytics y Google Tag Manager
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export {};
