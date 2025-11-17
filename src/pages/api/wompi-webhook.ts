import type { APIRoute } from "astro";
import type { WompiWebhookEvent } from "../../types/wompi";
import { validateWebhookSignature } from "../../types/wompi";
import { wompiConfig } from "../../lib/wompiConfig";

/**
 * Endpoint para recibir webhooks de Wompi
 * Este endpoint valida la firma del webhook y luego reenvía los datos a N8N
 *
 * ⚠️ IMPORTANTE PARA DESARROLLO:
 * Wompi NO puede enviar webhooks a localhost directamente.
 * Debes usar un túnel como ngrok o Cloudflare Tunnel:
 *
 * OPCIÓN 1 - ngrok (Recomendado):
 *   1. Instalar: https://ngrok.com/download
 *   2. Ejecutar: ngrok http 4321
 *   3. Copiar URL HTTPS: https://abc123.ngrok.io
 *   4. En Wompi usar: https://abc123.ngrok.io/api/wompi-webhook
 *
 * OPCIÓN 2 - Cloudflare Tunnel:
 *   1. Ejecutar: cloudflared tunnel --url http://localhost:4321
 *   2. Copiar URL generada
 *   3. En Wompi usar: https://tu-url.trycloudflare.com/api/wompi-webhook
 *
 * Configuración en Wompi:
 * 1. Ve a https://comercios.wompi.co/
 * 2. En "Desarrollo" > "Eventos"
 * 3. Agrega la URL del túnel: https://abc123.ngrok.io/api/wompi-webhook
 * 4. Selecciona el evento: transaction.updated
 *
 * Para PRODUCCIÓN:
 * Usa tu dominio real: https://marmolesdeluxe.com/api/wompi-webhook
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    // Leer el body del webhook
    const webhookEvent: WompiWebhookEvent = await request.json();

    console.log("📥 Webhook recibido de Wompi:", {
      event: webhookEvent.event,
      transactionId: webhookEvent.data?.transaction?.id,
      status: webhookEvent.data?.transaction?.status,
      reference: webhookEvent.data?.transaction?.reference,
    });

    // Validar la firma del webhook usando el integrity secret
    if (wompiConfig.integritySecret) {
      const isValid = await validateWebhookSignature(
        webhookEvent,
        wompiConfig.integritySecret
      );

      if (!isValid) {
        console.error("❌ Firma de webhook inválida");
        return new Response(
          JSON.stringify({
            success: false,
            error: "Invalid webhook signature",
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      console.log("✅ Firma de webhook validada correctamente");
    } else {
      console.warn(
        "⚠️ WOMPI_INTEGRITY_SECRET no configurado - webhook no validado"
      );
    }

    // Reenviar a N8N si está configurado
    if (wompiConfig.webhookUrl) {
      try {
        const n8nResponse = await fetch(wompiConfig.webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookEvent),
        });

        if (!n8nResponse.ok) {
          console.error("❌ Error al enviar a N8N:", n8nResponse.statusText);
        } else {
          console.log("✅ Webhook reenviado a N8N exitosamente");
        }
      } catch (n8nError) {
        console.error("❌ Error al conectar con N8N:", n8nError);
      }
    }

    // Responder a Wompi
    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook processed",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error procesando webhook:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
