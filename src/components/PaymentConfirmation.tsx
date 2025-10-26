import React, { useEffect, useState } from "react";
import type { WompiTransaction } from "../types/wompi";
import { centsToPesos } from "../types/wompi";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface PaymentConfirmationProps {
  transactionId?: string;
}

export default function PaymentConfirmation({
  transactionId,
}: PaymentConfirmationProps) {
  const [transaction, setTransaction] = useState<WompiTransaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (transactionId) {
      fetchTransactionDetails(transactionId);
    } else {
      setLoading(false);
      setError("No se proporcionó un ID de transacción");
    }
  }, [transactionId]);

  const fetchTransactionDetails = async (id: string) => {
    try {
      setLoading(true);
      // Llamada a la API pública de Wompi para obtener detalles de la transacción
      const response = await fetch(
        `https://production.wompi.co/v1/transactions/${id}`
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener la información de la transacción");
      }

      const data = await response.json();
      setTransaction(data.data);
    } catch (err) {
      console.error("Error fetching transaction:", err);
      setError("Error al obtener los detalles de la transacción");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(centsToPesos(cents));
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "APPROVED":
        return {
          icon: "✅",
          title: "¡Pago Exitoso!",
          message: "Tu pago ha sido procesado correctamente",
          color: "bg-green-50 border-green-200",
          textColor: "text-green-800",
        };
      case "PENDING":
        return {
          icon: "⏳",
          title: "Pago Pendiente",
          message: "Tu pago está siendo procesado",
          color: "bg-yellow-50 border-yellow-200",
          textColor: "text-yellow-800",
        };
      case "DECLINED":
        return {
          icon: "❌",
          title: "Pago Rechazado",
          message: "Tu pago no pudo ser procesado",
          color: "bg-red-50 border-red-200",
          textColor: "text-red-800",
        };
      case "VOIDED":
        return {
          icon: "🚫",
          title: "Pago Anulado",
          message: "Esta transacción ha sido anulada",
          color: "bg-gray-50 border-gray-200",
          textColor: "text-gray-800",
        };
      default:
        return {
          icon: "ℹ️",
          title: "Estado Desconocido",
          message: "No se pudo determinar el estado del pago",
          color: "bg-blue-50 border-blue-200",
          textColor: "text-blue-800",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8B4513]"></div>
        <p className="mt-4 text-gray-600">Verificando tu pago...</p>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <Card className="p-8 max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Error al Verificar el Pago
        </h2>
        <p className="text-gray-600 mb-6">
          {error || "No se pudo obtener la información de la transacción"}
        </p>
        <Button onClick={() => (window.location.href = "/")}>
          Volver al Inicio
        </Button>
      </Card>
    );
  }

  const statusInfo = getStatusInfo(transaction.status);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Estado del Pago */}
      <Card className={`p-8 text-center border-2 ${statusInfo.color}`}>
        <div className="text-7xl mb-4">{statusInfo.icon}</div>
        <h1 className={`text-3xl font-bold mb-2 ${statusInfo.textColor}`}>
          {statusInfo.title}
        </h1>
        <p className={`text-lg ${statusInfo.textColor}`}>
          {statusInfo.message}
        </p>
      </Card>

      {/* Detalles de la Transacción */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
          📋 Detalles de la Transacción
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">ID de Transacción:</span>
            <span className="font-mono text-sm font-semibold">
              {transaction.id}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Referencia:</span>
            <span className="font-mono text-sm font-semibold">
              {transaction.reference}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Monto:</span>
            <span className="text-xl font-bold text-[#8B4513]">
              {formatPrice(transaction.amount_in_cents)}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Método de Pago:</span>
            <span className="font-medium capitalize">
              {transaction.payment_method_type.replace("_", " ")}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Fecha:</span>
            <span className="font-medium">
              {formatDate(transaction.created_at)}
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{transaction.customer_email}</span>
          </div>
        </div>
      </Card>

      {/* Próximos Pasos */}
      {transaction.status === "APPROVED" && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🎯</span> Próximos Pasos
          </h2>

          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-2xl mr-3">1️⃣</span>
              <div>
                <p className="font-semibold text-gray-900">
                  Confirmación por Email
                </p>
                <p className="text-sm text-gray-600">
                  Recibirás un email con los detalles de tu compra y próximos
                  pasos
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-3">2️⃣</span>
              <div>
                <p className="font-semibold text-gray-900">
                  Coordinación de Servicio
                </p>
                <p className="text-sm text-gray-600">
                  Nuestro equipo se pondrá en contacto contigo en las próximas
                  24 horas para coordinar
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-3">3️⃣</span>
              <div>
                <p className="font-semibold text-gray-900">Ejecución</p>
                <p className="text-sm text-gray-600">
                  Realizaremos el servicio o enviaremos tu producto según lo
                  acordado
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Información de Contacto */}
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📞</span> ¿Necesitas Ayuda?
        </h2>

        <div className="space-y-3">
          <div className="flex items-center">
            <span className="text-2xl mr-3">📧</span>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <a
                href="mailto:info@marmolesdeluxe.com"
                className="font-semibold text-[#8B4513] hover:underline"
              >
                info@marmolesdeluxe.com
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-2xl mr-3">💬</span>
            <div>
              <p className="text-sm text-gray-600">WhatsApp</p>
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#8B4513] hover:underline"
              >
                +57 300 123 4567
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-2xl mr-3">🕐</span>
            <div>
              <p className="text-sm text-gray-600">Horario de Atención</p>
              <p className="font-semibold text-gray-900">
                Lunes a Viernes: 8:00 AM - 6:00 PM
                <br />
                Sábados: 9:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          size="lg"
        >
          🏠 Volver al Inicio
        </Button>

        <Button
          onClick={() => window.print()}
          className="bg-[#8B4513] hover:bg-[#6d3410]"
          size="lg"
        >
          🖨️ Imprimir Comprobante
        </Button>
      </div>

      {/* Nota sobre Email */}
      {transaction.status === "APPROVED" && (
        <div className="text-center">
          <p className="text-sm text-gray-500 italic">
            📬 Un comprobante detallado ha sido enviado a tu correo electrónico
          </p>
        </div>
      )}
    </div>
  );
}
