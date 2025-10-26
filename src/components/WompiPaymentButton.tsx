import React, { useState } from "react";
import type { PaymentType, WompiCustomer, WompiProduct } from "../types/wompi";
import {
  generateWompiPaymentUrl,
  generateReference,
  pesosTosCents,
} from "../types/wompi";
import { wompiConfig } from "../lib/wompiConfig";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

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

  const handleGeneratePaymentLink = () => {
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

    // Generar referencia única
    const reference = generateReference(paymentType);

    // Crear producto
    const product: WompiProduct = {
      name: productName,
      description: productDescription,
      price: price,
      quantity: quantity,
      type: paymentType,
      sku: sku,
    };

    // Calcular monto total en centavos
    const totalAmount = pesosTosCents(price * quantity);

    // Generar URL de pago
    const paymentUrl = generateWompiPaymentUrl({
      publicKey: wompiConfig.publicKey,
      reference: reference,
      amount: totalAmount,
      currency: "COP",
      customer: customerData,
      products: [product],
      redirectUrl: wompiConfig.redirectUrl,
      metadata: {
        paymentType: paymentType,
        sku: sku,
        quantity: quantity,
      },
    });

    // Log para debugging (en desarrollo)
    if (import.meta.env.DEV) {
      console.log("🔗 Payment Link Generated:", {
        reference,
        amount: totalAmount,
        customer: customerData,
        product,
      });
    }

    // Redirigir a Wompi
    window.location.href = paymentUrl;
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
