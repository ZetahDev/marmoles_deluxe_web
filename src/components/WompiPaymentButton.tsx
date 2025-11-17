import React, { useState, useEffect } from "react";
import type { PaymentType, WompiCustomer, WompiProduct } from "../types/wompi";
import {
  generateReference,
  pesosTosCents,
  generateIntegritySignature,
} from "../types/wompi";
import { wompiConfig } from "../lib/wompiConfig";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

// Declarar tipos globales de Wompi
declare global {
  interface Window {
    WidgetCheckout?: new (config: {
      currency: string;
      amountInCents: number;
      reference: string;
      publicKey: string;
      signature: {
        integrity: string;
      };
      redirectUrl?: string;
      expirationTime?: string;
      taxInCents?: {
        vat?: number;
        consumption?: number;
      };
      customerData?: {
        email: string;
        fullName: string;
        phoneNumber: string;
        phoneNumberPrefix?: string;
        legalId?: string;
        legalIdType?: string;
      };
      shippingAddress?: {
        addressLine1: string;
        city: string;
        phoneNumber: string;
        region: string;
        country: string;
        addressLine2?: string;
        name?: string;
        postalCode?: string;
      };
    }) => {
      open: (callback: (result: any) => void) => void;
    };
  }
}

interface WompiPaymentButtonProps {
  paymentType: PaymentType;
  productName: string;
  productDescription: string;
  price: number; // Precio en pesos colombianos
  quantity?: number;
  sku?: string;
  buttonText?: string;
  className?: string;
}

export default function WompiPaymentButton({
  paymentType,
  productName,
  productDescription,
  price,
  quantity = 1,
  sku,
  buttonText = "Pagar con Wompi",
  className = "",
}: WompiPaymentButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const [customerData, setCustomerData] = useState<WompiCustomer>({
    name: "",
    email: "",
    phone: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  // Función para cargar el script de Wompi Widget bajo demanda
  const loadWompiWidget = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Verificar si el widget ya está disponible
      if (window.WidgetCheckout) {
        setWidgetLoaded(true);
        resolve();
        return;
      }

      // Verificar si el script ya está cargado
      const existingScript = document.getElementById("wompi-widget-script");
      if (existingScript) {
        // Script existe pero widget no está listo, esperar un poco
        setTimeout(() => {
          if (window.WidgetCheckout) {
            setWidgetLoaded(true);
            resolve();
          } else {
            reject(new Error("Widget no se cargó correctamente"));
          }
        }, 1000);
        return;
      }

      // Cargar el script
      const script = document.createElement("script");
      script.id = "wompi-widget-script";
      script.src = "https://checkout.wompi.co/widget.js";
      script.async = true;
      script.onload = () => {
        console.log("✅ Wompi Widget cargado correctamente");
        setWidgetLoaded(true);
        resolve();
      };
      script.onerror = () => {
        console.error("❌ Error cargando Wompi Widget");
        reject(new Error("Error cargando el widget de pago"));
      };
      document.body.appendChild(script);
    });
  };

  const handleGeneratePaymentLink = async () => {
    // Validar datos del cliente
    if (!customerData.name || !customerData.email || !customerData.phone) {
      alert("Por favor completa todos los campos del formulario");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email)) {
      alert("Por favor ingresa un email válido");
      return;
    }

    // Validar teléfono (formato colombiano)
    const phoneRegex = /^3\d{9}$/;
    if (!phoneRegex.test(customerData.phone.replace(/\s/g, ""))) {
      alert(
        "Por favor ingresa un teléfono válido (10 dígitos, iniciando con 3)"
      );
      return;
    }

    setIsGenerating(true);

    try {
      // Cargar el widget de Wompi si no está cargado
      if (!widgetLoaded) {
        try {
          await loadWompiWidget();
        } catch (error) {
          console.error("Error cargando Wompi Widget:", error);
          alert(
            "Error cargando el sistema de pagos. Por favor recarga la página e intenta nuevamente."
          );
          setIsGenerating(false);
          return;
        }
      }

      // Verificar que el widget esté cargado
      if (!window.WidgetCheckout) {
        alert(
          "El widget de pago aún no está cargado. Por favor espera un momento e intenta nuevamente."
        );
        setIsGenerating(false);
        return;
      }

      // Debug: Verificar configuración
      if (import.meta.env.DEV) {
        console.log("🔍 Wompi Config Check:", {
          environment: wompiConfig.environment,
          publicKey: wompiConfig.publicKey,
          hasIntegritySecret: !!wompiConfig.integritySecret,
          integritySecretPreview: wompiConfig.integritySecret
            ? wompiConfig.integritySecret.substring(0, 25) + "..."
            : "NO CONFIGURADO ❌",
        });
      }

      // Generar referencia única
      const reference = generateReference(paymentType);

      // Calcular monto total en centavos
      const totalAmount = pesosTosCents(price * quantity);

      // Generar firma de integridad (OBLIGATORIA según documentación)
      if (!wompiConfig.integritySecret) {
        alert(
          "Error de configuración: No se encontró el secreto de integridad. Por favor contacta al administrador."
        );
        setIsGenerating(false);
        return;
      }

      const signatureString = `${reference}${totalAmount}COP${wompiConfig.integritySecret}`;
      const signature = await generateIntegritySignature(signatureString);

      if (import.meta.env.DEV) {
        console.log("🔐 Firma de Integridad:", {
          reference,
          amount: totalAmount,
          currency: "COP",
          integritySecret: wompiConfig.integritySecret.substring(0, 25) + "...",
          signatureString: signatureString.substring(0, 60) + "...",
          signature: signature,
        });
      }

      // Configurar el Widget de Wompi según documentación oficial
      const widgetConfig = {
        currency: "COP" as const,
        amountInCents: totalAmount,
        reference: reference,
        publicKey: wompiConfig.publicKey,
        signature: {
          integrity: signature,
        },
        redirectUrl: wompiConfig.redirectUrl,
        customerData: {
          email: customerData.email,
          fullName: customerData.name,
          phoneNumber: customerData.phone,
          phoneNumberPrefix: "+57",
        },
      };

      if (import.meta.env.DEV) {
        console.log("🎯 Configurando Wompi Widget:", widgetConfig);
      }

      // Crear instancia del checkout según documentación: new WidgetCheckout({...})
      const checkout = new window.WidgetCheckout(widgetConfig);

      // Abrir el widget
      checkout.open((result: any) => {
        if (import.meta.env.DEV) {
          console.log("💳 Resultado del pago:", result);
        }

        setIsGenerating(false);

        if (result.transaction) {
          const transaction = result.transaction;
          const transactionStatus = transaction.status;

          if (transactionStatus === "APPROVED") {
            // Redirigir a página de confirmación
            window.location.href = `${wompiConfig.redirectUrl}?id=${transaction.id}&reference=${reference}&status=APPROVED`;
          } else if (transactionStatus === "DECLINED") {
            alert(
              "❌ Tu pago fue rechazado. Por favor intenta con otro método de pago."
            );
          } else if (transactionStatus === "PENDING") {
            window.location.href = `${wompiConfig.redirectUrl}?id=${transaction.id}&reference=${reference}&status=PENDING`;
          } else if (transactionStatus === "ERROR") {
            alert(
              "❌ Ocurrió un error procesando tu pago. Por favor intenta nuevamente."
            );
          }
        } else {
          // Usuario cerró el widget sin completar
          console.log("⚠️ Usuario cerró el widget sin completar el pago");
        }
      });

      setIsGenerating(false);
    } catch (error) {
      console.error("Error generando link de pago:", error);
      alert("Error al generar el link de pago. Por favor intenta nuevamente.");
      setIsGenerating(false);
    }
  };

  const getPaymentTypeLabel = () => {
    switch (paymentType) {
      case "ANTICIPO":
        return "Anticipo/Seña";
      case "SERVICIO":
        return "Servicio";
      case "PRODUCTO_CATALOGO":
        return "Producto del Catálogo";
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!showForm) {
    return (
      <Button onClick={() => setShowForm(true)} className={className} size="lg">
        {buttonText}
      </Button>
    );
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h3 className="text-xl font-bold text-gray-900">Datos de Pago</h3>
          <p className="text-sm text-gray-600 mt-1">{getPaymentTypeLabel()}</p>
        </div>

        {/* Resumen del producto */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">{productName}</h4>
          <p className="text-sm text-gray-600 mb-3">{productDescription}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Cantidad: {quantity}</span>
            <span className="text-lg font-bold text-[#8B4513]">
              {formatPrice(price * quantity)}
            </span>
          </div>
        </div>

        {/* Formulario de datos del cliente */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              value={customerData.name}
              onChange={(e) =>
                setCustomerData({ ...customerData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={customerData.email}
              onChange={(e) =>
                setCustomerData({ ...customerData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder="ejemplo@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              value={customerData.phone}
              onChange={(e) => {
                // Solo permitir números
                const value = e.target.value.replace(/\D/g, "");
                setCustomerData({ ...customerData, phone: value });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder="3001234567"
              maxLength={10}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              10 dígitos, iniciando con 3
            </p>
          </div>
        </div>

        {/* Información de seguridad */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            🔒 Tu pago es procesado de forma segura por Wompi. Serás redirigido
            a su plataforma para completar la transacción.
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowForm(false)}
            className="flex-1"
            disabled={isGenerating}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleGeneratePaymentLink}
            className="flex-1 bg-[#8B4513] hover:bg-[#6d3410]"
            disabled={isGenerating}
          >
            {isGenerating ? "Generando..." : "Continuar al Pago"}
          </Button>
        </div>

        {/* Ambiente de prueba */}
        {wompiConfig.environment === "test" && (
          <div className="text-center">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
              ⚠️ MODO PRUEBA
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
