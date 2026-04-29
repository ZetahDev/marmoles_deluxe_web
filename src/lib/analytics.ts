/**
 * Sistema de Analytics y Tracking del Embudo de Ventas
 * Para analizar comportamiento de usuarios desde Google Ads hasta conversión
 */

// Tipos de eventos del embudo
export enum FunnelEvent {
  // Top of Funnel (TOFU)
  PAGE_VIEW = "page_view",
  LANDING_PAGE_VIEW = "landing_page_view",

  // Middle of Funnel (MOFU)
  PRODUCT_CLICK = "product_click",
  PRODUCT_VIEW = "product_view",
  CATEGORY_VIEW = "category_view",
  GALLERY_INTERACTION = "gallery_interaction",
  SCROLL_DEPTH = "scroll_depth",
  TIME_ON_PAGE = "time_on_page",

  // Bottom of Funnel (BOFU)
  CONTACT_FORM_START = "contact_form_start",
  CONTACT_FORM_SUBMIT = "contact_form_submit",
  WHATSAPP_CLICK = "whatsapp_click",
  WHATSAPP_MESSAGE_SENT = "whatsapp_message_sent",
  PHONE_CLICK = "phone_click",
  PRICE_CALCULATOR_START = "price_calculator_start",

  // Conversión
  QUOTE_REQUESTED = "quote_requested",
  PAYMENT_INITIATED = "payment_initiated",
  PURCHASE = "purchase",

  // Abandono
  EXIT_INTENT = "exit_intent",
  FORM_ABANDONMENT = "form_abandonment",
}

// Segmentos de tráfico
export enum TrafficSource {
  GOOGLE_ADS = "google_ads",
  ORGANIC = "organic",
  SOCIAL = "social",
  DIRECT = "direct",
  REFERRAL = "referral",
}

interface AnalyticsEvent {
  event: FunnelEvent;
  properties?: Record<string, any>;
  value?: number;
}

interface WhatsAppOpenOptions {
  openInNewTab?: boolean;
  timeoutMs?: number;
}

const WHATSAPP_CONVERSION_SEND_TO =
  import.meta.env.PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO;
const WHATSAPP_CONVERSION_VALUE = Number(
  import.meta.env.PUBLIC_GOOGLE_ADS_WHATSAPP_VALUE ?? "1"
);
const WHATSAPP_CONVERSION_CURRENCY =
  import.meta.env.PUBLIC_GOOGLE_ADS_WHATSAPP_CURRENCY ?? "COP";
const WHATSAPP_CONVERSION_TIMEOUT_MS = Number(
  import.meta.env.PUBLIC_GOOGLE_ADS_WHATSAPP_TIMEOUT_MS ?? "900"
);

/**
 * Detecta la fuente de tráfico basada en UTM params
 */
export function getTrafficSource(): TrafficSource {
  if (typeof window === "undefined") return TrafficSource.DIRECT;

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source")?.toLowerCase();
  const utmMedium = urlParams.get("utm_medium")?.toLowerCase();
  const referrer = document.referrer.toLowerCase();

  // Google Ads
  if (
    utmSource?.includes("google") &&
    (utmMedium === "cpc" || utmMedium === "ppc")
  ) {
    return TrafficSource.GOOGLE_ADS;
  }

  // Orgánico
  if (referrer.includes("google") || referrer.includes("bing")) {
    return TrafficSource.ORGANIC;
  }

  // Redes sociales
  if (
    referrer.includes("facebook") ||
    referrer.includes("instagram") ||
    referrer.includes("twitter") ||
    utmMedium?.includes("social")
  ) {
    return TrafficSource.SOCIAL;
  }

  // Referido
  if (referrer && !referrer.includes(window.location.hostname)) {
    return TrafficSource.REFERRAL;
  }

  return TrafficSource.DIRECT;
}

/**
 * Obtiene parámetros UTM para segmentación
 */
export function getUTMParams() {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get("utm_source") || undefined,
    utm_medium: urlParams.get("utm_medium") || undefined,
    utm_campaign: urlParams.get("utm_campaign") || undefined,
    utm_term: urlParams.get("utm_term") || undefined,
    utm_content: urlParams.get("utm_content") || undefined,
    gclid: urlParams.get("gclid") || undefined, // Google Click ID
    fbclid: urlParams.get("fbclid") || undefined, // Facebook Click ID
  };
}

/**
 * Envía evento a Google Analytics 4
 */
export function trackGA4Event({
  event,
  properties = {},
  value,
}: AnalyticsEvent) {
  if (typeof window === "undefined" || !window.gtag) return;

  const utmParams = getUTMParams();
  const trafficSource = getTrafficSource();

  window.gtag("event", event, {
    ...properties,
    ...utmParams,
    traffic_source: trafficSource,
    value,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Envía evento a Facebook Pixel
 */
export function trackFacebookEvent({
  event,
  properties = {},
  value,
}: AnalyticsEvent) {
  if (typeof window === "undefined" || !window.fbq) return;

  // Eventos estándar de Facebook (deben usar 'track')
  const standardEvents = [
    "ViewContent",
    "AddToCart",
    "AddToWishlist",
    "InitiateCheckout",
    "AddPaymentInfo",
    "Purchase",
    "Lead",
    "CompleteRegistration",
    "Contact",
    "CustomizeProduct",
    "Donate",
    "FindLocation",
    "Schedule",
    "StartTrial",
    "SubmitApplication",
    "Subscribe",
    "Search",
  ];

  // Mapeo de eventos personalizados a eventos estándar de Facebook
  const fbEventMap: Record<string, string> = {
    [FunnelEvent.PRODUCT_VIEW]: "ViewContent",
    [FunnelEvent.CONTACT_FORM_START]: "Lead",
    [FunnelEvent.WHATSAPP_CLICK]: "Contact",
    [FunnelEvent.QUOTE_REQUESTED]: "Lead",
    [FunnelEvent.PAYMENT_INITIATED]: "InitiateCheckout",
    [FunnelEvent.PURCHASE]: "Purchase",
  };

  const fbEvent = fbEventMap[event] || event;

  const eventData = {
    ...properties,
    value,
    currency: "COP",
  };

  // Si es un evento estándar, usar 'track', si no, usar 'trackCustom'
  if (standardEvents.includes(fbEvent)) {
    window.fbq("track", fbEvent, eventData);
  } else {
    window.fbq("trackCustom", fbEvent, eventData);
  }
}

/**
 * Envía evento a Google Tag Manager
 */
export function trackGTMEvent({ event, properties = {} }: AnalyticsEvent) {
  if (typeof window === "undefined" || !window.dataLayer) return;

  window.dataLayer.push({
    event,
    ...properties,
    traffic_source: getTrafficSource(),
    ...getUTMParams(),
  });
}

/**
 * Función principal para trackear eventos (envía a todas las plataformas)
 */
export function trackEvent(eventData: AnalyticsEvent) {
  trackGA4Event(eventData);
  trackFacebookEvent(eventData);
  trackGTMEvent(eventData);

  // Log en desarrollo
  if (import.meta.env.DEV) {
    console.log("📊 Analytics Event:", eventData);
  }
}

function createOneTimeCallback(callback: () => void) {
  let hasRun = false;
  return () => {
    if (hasRun) return;
    hasRun = true;
    callback();
  };
}

function tryTrackWhatsAppAdsConversion(done: () => void): boolean {
  if (
    typeof window === "undefined" ||
    !window.gtag ||
    !WHATSAPP_CONVERSION_SEND_TO
  ) {
    return false;
  }

  window.gtag("event", "conversion", {
    send_to: WHATSAPP_CONVERSION_SEND_TO,
    value: WHATSAPP_CONVERSION_VALUE,
    currency: WHATSAPP_CONVERSION_CURRENCY,
    event_callback: done,
  });

  return true;
}

/**
 * Trackea clics en productos
 */
export function trackProductClick(
  productName: string,
  category: string,
  price?: number
) {
  trackEvent({
    event: FunnelEvent.PRODUCT_CLICK,
    properties: {
      product_name: productName,
      product_category: category,
      price,
    },
    value: price,
  });
}

/**
 * Trackea clic en WhatsApp (punto crítico del embudo)
 */
export function trackWhatsAppClick(context: string, productName?: string) {
  trackEvent({
    event: FunnelEvent.WHATSAPP_CLICK,
    properties: {
      click_context: context,
      product_name: productName,
      page_url: window.location.href,
    },
  });
}

export function openWhatsAppTracked(
  whatsappUrl: string,
  context: string,
  productName?: string,
  options: WhatsAppOpenOptions = {}
) {
  if (typeof window === "undefined") return;

  trackWhatsAppClick(context, productName);

  const navigate = createOneTimeCallback(() => {
    if (options.openInNewTab === false) {
      window.location.href = whatsappUrl;
      return;
    }
    window.open(whatsappUrl, "_blank");
  });

  const timeoutMs =
    options.timeoutMs && options.timeoutMs > 0
      ? options.timeoutMs
      : WHATSAPP_CONVERSION_TIMEOUT_MS;

  const adsConversionTracked = tryTrackWhatsAppAdsConversion(navigate);
  if (adsConversionTracked) {
    window.setTimeout(navigate, timeoutMs);
    return;
  }

  navigate();
}

function normalizeWhatsAppPathname(pathname: string): string {
  if (!pathname) return "";
  return pathname.replace(/^\/+/, "");
}

function extractWhatsAppContext(anchor: HTMLAnchorElement): string {
  const explicitContext = anchor.getAttribute("data-whatsapp-context");
  if (explicitContext) return explicitContext;

  const source = anchor.getAttribute("data-whatsapp-source");
  if (source) return source;

  const href = anchor.getAttribute("href") ?? "";
  if (href.includes("wa.me/")) {
    const path = href.split("wa.me/")[1] ?? "";
    return `wa_link_${normalizeWhatsAppPathname(path).split("?")[0]}`;
  }

  return "wa_link";
}

function setupWhatsAppLinkTracking() {
  if (typeof document === "undefined") return;

  const handler = (event: MouseEvent) => {
    if (event.defaultPrevented) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest(
      "a[href*='wa.me/'],a[href*='api.whatsapp.com/'],a[href*='whatsapp.com/send']"
    ) as HTMLAnchorElement | null;

    if (!anchor) return;

    const href = anchor.href;
    if (!href) return;

    const context = extractWhatsAppContext(anchor);
    const productName =
      anchor.getAttribute("data-whatsapp-product") ?? undefined;

    event.preventDefault();
    openWhatsAppTracked(href, context, productName, {
      openInNewTab: anchor.target === "_self" ? false : true,
    });
  };

  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}

/**
 * Trackea inicio de formulario de contacto
 */
export function trackFormStart(formType: string) {
  trackEvent({
    event: FunnelEvent.CONTACT_FORM_START,
    properties: {
      form_type: formType,
    },
  });
}

/**
 * Trackea envío exitoso de formulario
 */
export function trackFormSubmit(
  formType: string,
  formData: Record<string, any>
) {
  trackEvent({
    event: FunnelEvent.CONTACT_FORM_SUBMIT,
    properties: {
      form_type: formType,
      ...formData,
    },
  });
}

/**
 * Trackea abandono de formulario
 */
export function trackFormAbandonment(
  formType: string,
  fieldsCompleted: number,
  totalFields: number
) {
  trackEvent({
    event: FunnelEvent.FORM_ABANDONMENT,
    properties: {
      form_type: formType,
      completion_rate: (fieldsCompleted / totalFields) * 100,
      fields_completed: fieldsCompleted,
      total_fields: totalFields,
    },
  });
}

/**
 * Trackea profundidad de scroll (para medir engagement)
 */
export function setupScrollTracking() {
  if (typeof window === "undefined") return;

  let scrollDepths = [25, 50, 75, 90, 100];
  let triggeredDepths = new Set<number>();

  const handleScroll = () => {
    const scrollPercentage =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;

    scrollDepths.forEach((depth) => {
      if (scrollPercentage >= depth && !triggeredDepths.has(depth)) {
        triggeredDepths.add(depth);
        trackEvent({
          event: FunnelEvent.SCROLL_DEPTH,
          properties: {
            scroll_depth: depth,
            page_url: window.location.pathname,
          },
        });
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
}

/**
 * Trackea tiempo en página
 */
export function setupTimeTracking() {
  if (typeof window === "undefined") return;

  const startTime = Date.now();
  const intervals = [10, 30, 60, 120, 300]; // segundos
  const triggered = new Set<number>();

  const checkTime = setInterval(() => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    intervals.forEach((interval) => {
      if (timeSpent >= interval && !triggered.has(interval)) {
        triggered.add(interval);
        trackEvent({
          event: FunnelEvent.TIME_ON_PAGE,
          properties: {
            time_seconds: interval,
            page_url: window.location.pathname,
          },
        });
      }
    });
  }, 5000);

  return () => clearInterval(checkTime);
}

/**
 * Detecta intención de salida (para remarketing)
 */
export function setupExitIntentTracking() {
  if (typeof window === "undefined") return;

  let exitIntentTriggered = false;

  const handleMouseLeave = (e: MouseEvent) => {
    if (e.clientY <= 0 && !exitIntentTriggered) {
      exitIntentTriggered = true;
      trackEvent({
        event: FunnelEvent.EXIT_INTENT,
        properties: {
          page_url: window.location.pathname,
          time_on_page: Math.floor((Date.now() - performance.now()) / 1000),
        },
      });
    }
  };

  document.addEventListener("mouseleave", handleMouseLeave);

  return () => document.removeEventListener("mouseleave", handleMouseLeave);
}

/**
 * Inicializa todos los trackers automáticos
 */
export function initializeAnalytics() {
  if (typeof window === "undefined") return;

  // Guarda UTM params en sessionStorage para persistencia
  const utmParams = getUTMParams();
  if (Object.values(utmParams).some((v) => v !== undefined)) {
    sessionStorage.setItem("utm_params", JSON.stringify(utmParams));
  }

  // Trackea vista de página con fuente de tráfico
  trackEvent({
    event: FunnelEvent.PAGE_VIEW,
    properties: {
      page_url: window.location.pathname,
      page_title: document.title,
    },
  });

  // Setup trackers automáticos
  const cleanupFunctions = [
    setupScrollTracking(),
    setupTimeTracking(),
    setupExitIntentTracking(),
    setupWhatsAppLinkTracking(),
  ];

  // Cleanup al desmontar
  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup?.());
  };
}
