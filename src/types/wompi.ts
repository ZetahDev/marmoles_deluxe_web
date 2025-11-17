// Tipos para la integración con Wompi Payment Gateway
// Documentación: https://docs.wompi.co/

// Estados posibles de una transacción
export type WompiTransactionStatus =
  | "PENDING" // Pendiente de pago
  | "APPROVED" // Aprobada
  | "DECLINED" // Rechazada
  | "VOIDED" // Anulada
  | "ERROR"; // Error en el procesamiento

// Tipos de pago que manejamos
export type PaymentType =
  | "ANTICIPO" // Pago de anticipo/seña
  | "SERVICIO" // Servicio específico
  | "PRODUCTO_CATALOGO"; // Producto del catálogo

// Información del cliente
export interface WompiCustomer {
  name: string;
  email: string;
  phone: string;
  legalId?: string; // Documento de identidad (opcional)
  legalIdType?: "CC" | "NIT"; // Tipo de documento
}

// Detalles del producto/servicio
export interface WompiProduct {
  name: string;
  description: string;
  price: number; // Precio en COP (pesos colombianos)
  quantity: number;
  type: PaymentType;
  sku?: string; // SKU del producto (opcional)
}

// Datos para crear un enlace de pago
export interface WompiPaymentLink {
  publicKey: string; // Public key de Wompi (test o prod)
  reference: string; // Referencia única de la transacción
  amount: number; // Monto total en centavos (ej: 50000 = $500.00 COP)
  currency: "COP"; // Moneda (siempre COP para Colombia)
  customer: WompiCustomer;
  products: WompiProduct[];
  redirectUrl: string; // URL de retorno después del pago
  expirationTime?: string; // Tiempo de expiración ISO 8601 (opcional)
  metadata?: Record<string, any>; // Metadata adicional
}

// Respuesta del webhook de Wompi
export interface WompiWebhookEvent {
  event: "transaction.updated"; // Tipo de evento
  data: {
    transaction: WompiTransaction;
  };
  sent_at: string; // Timestamp del evento
  timestamp: number; // Unix timestamp
  signature: {
    checksum: string; // Hash para validar integridad
    properties: string[]; // Propiedades incluidas en el checksum
  };
  environment: "production" | "test";
}

// Detalles completos de una transacción
export interface WompiTransaction {
  id: string; // ID único de la transacción en Wompi
  status: WompiTransactionStatus;
  reference: string; // Referencia que enviamos
  amount_in_cents: number; // Monto en centavos
  currency: "COP";
  customer_email: string;
  customer_data: {
    full_name: string;
    phone_number: string;
    legal_id?: string;
    legal_id_type?: string;
  };
  payment_method_type: string; // CARD, NEQUI, PSE, etc.
  payment_method: {
    type: string;
    extra: Record<string, any>;
    installments?: number;
  };
  redirect_url: string;
  shipping_address: any | null;
  payment_link_id: string | null;
  created_at: string; // ISO 8601 timestamp
  finalized_at: string | null;
  status_message: string | null;
  metadata?: Record<string, any>;
}

// Datos para registrar en Google Sheets (via N8N)
export interface TransactionRecord {
  timestamp: string; // Fecha y hora de la transacción
  transactionId: string; // ID de Wompi
  reference: string; // Referencia interna
  status: WompiTransactionStatus;
  paymentType: PaymentType;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  quantity: number;
  amount: number; // Monto en pesos (no en centavos)
  paymentMethod: string;
  metadata?: string; // JSON stringificado
}

// Parámetros que recibiremos en la URL de confirmación
export interface ConfirmationPageParams {
  id?: string; // ID de la transacción (parámetro de Wompi)
  reference?: string; // Nuestra referencia
  status?: WompiTransactionStatus;
}

// Configuración de Wompi
export interface WompiConfig {
  publicKey: string;
  privateKey?: string; // Solo para backend (no lo usaremos)
  eventsSecret?: string; // Para validar webhooks (prod_events_)
  integritySecret?: string; // Para validar checksum (prod_integrity_)
  environment: "test" | "production";
  webhookUrl?: string; // URL del webhook de N8N
  redirectUrl: string; // URL base de confirmación
}

// Utilidad para generar URL de pago de Wompi
export async function generateWompiPaymentUrl(
  data: WompiPaymentLink,
  integritySecret?: string
): Promise<string> {
  const params = new URLSearchParams({
    "public-key": data.publicKey,
    currency: data.currency,
    "amount-in-cents": data.amount.toString(),
    reference: data.reference,
    "redirect-url": data.redirectUrl,
    "customer-data:email": data.customer.email,
    "customer-data:full-name": data.customer.name,
    "customer-data:phone-number": data.customer.phone,
  });

  // Agregar documento si existe
  if (data.customer.legalId && data.customer.legalIdType) {
    params.append("customer-data:legal-id", data.customer.legalId);
    params.append("customer-data:legal-id-type", data.customer.legalIdType);
  }

  // Agregar tiempo de expiración si existe
  if (data.expirationTime) {
    params.append("expiration-time", data.expirationTime);
  }

  // Generar firma de integridad si se proporciona el secret
  if (integritySecret) {
    const signatureString = `${data.reference}${data.amount}${data.currency}${integritySecret}`;
    const signature = await generateIntegritySignature(signatureString);
    params.append("signature:integrity", signature);

    // Debug log
    if (typeof window !== "undefined" && import.meta.env.DEV) {
      console.log("🔐 Firma de Integridad Generada:", {
        reference: data.reference,
        amount: data.amount,
        currency: data.currency,
        integritySecret: integritySecret.substring(0, 20) + "...",
        signatureString: signatureString.substring(0, 50) + "...",
        signature: signature.substring(0, 20) + "...",
      });
    }
  } else {
    // Warning si no hay integrity secret
    if (typeof window !== "undefined" && import.meta.env.DEV) {
      console.warn("⚠️ No se proporcionó integritySecret - El pago fallará");
    }
  }

  const finalUrl = `https://checkout.wompi.co/card?${params.toString()}`;

  // Debug log de URL final
  if (typeof window !== "undefined" && import.meta.env.DEV) {
    console.log("🔗 URL de Pago Generada:", finalUrl);
    console.log("📋 Parámetros:", Object.fromEntries(params));
  }

  return finalUrl;
}

// Generar firma de integridad SHA256
export async function generateIntegritySignature(
  data: string
): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Generar referencia única
export function generateReference(type: PaymentType): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const prefix = {
    ANTICIPO: "ANT",
    SERVICIO: "SRV",
    PRODUCTO_CATALOGO: "PRD",
  }[type];

  return `${prefix}-${timestamp}-${random}`;
}

// Convertir pesos a centavos
export function pesosTosCents(pesos: number): number {
  return Math.round(pesos * 100);
}

// Convertir centavos a pesos
export function centsToPesos(cents: number): number {
  return cents / 100;
}

// Validar firma de webhook de Wompi
export async function validateWebhookSignature(
  webhookEvent: WompiWebhookEvent,
  integritySecret: string
): Promise<boolean> {
  try {
    const { checksum, properties } = webhookEvent.signature;

    // Construir la cadena a validar usando las propiedades especificadas
    const dataToSign = properties
      .map((prop) => {
        // Navegar por el objeto usando la notación de punto
        const value = prop
          .split(".")
          .reduce((obj: any, key) => obj?.[key], webhookEvent);
        return String(value ?? "");
      })
      .join("");

    // Agregar el secret al final
    const signatureString = dataToSign + integritySecret;

    // Generar hash SHA256
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const calculatedChecksum = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return calculatedChecksum === checksum;
  } catch (error) {
    console.error("Error validating webhook signature:", error);
    return false;
  }
}
