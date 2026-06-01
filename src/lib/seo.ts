import type { GeoFaqItem } from "./business";

export interface SeoPageConfig {
  title: string;
  description: string;
  canonical: string;
  primaryKeyword: string;
  localArea?: string;
  schemaType?: "WebPage" | "Service" | "CollectionPage" | "HomePage";
  faq?: GeoFaqItem[];
}

export const publicSiteRoutes = [
  "/",
  "/b2b",
  "/casos-de-estudio",
  "/contactanos",
  "/granitos-naturales",
  "/marmoles",
  "/nosotros",
  "/otros-servicios",
  "/piedra-exotica",
  "/piedra-sinterizada",
  "/piedra-sinterizada/altea",
  "/piedra-sinterizada/artemarmol",
  "/piedra-sinterizada/dekton",
  "/piedra-sinterizada/neolith",
  "/piedra-sinterizada/silestone",
  "/piedra-sinterizada/terracina",
  "/politicas-garantia",
  "/productos-sellado",
  "/proyectos",
] as const;

// Rutas de soporte SEO/operación interna:
// existen para pruebas, campañas o transición, pero no deben indexarse ni exponerse en navegación principal.
export const internalSupportRoutes = [
  "/blanco-polar",
  "/precios",
  "/mesones-de-cocina-cali",
  "/mesones-de-cocina-jamundi",
  "/mesones-de-cocina-palmira",
] as const;
