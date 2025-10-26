# 📊 Arquitectura y Flujo del Sistema de Pagos

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Navegador)                          │
│                                                                      │
│  ┌──────────────┐      ┌─────────────────┐      ┌────────────────┐ │
│  │   Sitio Web  │──────│ Formulario Pago │──────│ Wompi Checkout │ │
│  │   (Astro)    │      │   (Componente)  │      │   (Externo)    │ │
│  └──────────────┘      └─────────────────┘      └────────────────┘ │
│         │                                                 │          │
│         │                                                 │          │
└─────────┼─────────────────────────────────────────────────┼──────────┘
          │                                                 │
          │                                                 │
          ▼                                                 ▼
┌─────────────────────┐                          ┌──────────────────┐
│  Página Confirmación│                          │  Wompi Payment   │
│   /confirmacion-pago│                          │    Platform      │
└─────────────────────┘                          └──────────────────┘
                                                           │
                                                           │ Webhook
                                                           ▼
                                                  ┌─────────────────┐
                                                  │       N8N       │
                                                  │   (Automation)  │
                                                  └─────────────────┘
                                                           │
                        ┌──────────────────────────────────┼────────────────────────┐
                        │                                  │                        │
                        ▼                                  ▼                        ▼
              ┌──────────────────┐            ┌──────────────────┐      ┌────────────────┐
              │  Google Sheets   │            │  Email Service   │      │   Telegram     │
              │  (Registro DB)   │            │   (Cliente)      │      │   (Equipo)     │
              └──────────────────┘            └──────────────────┘      └────────────────┘
```

---

## 🔄 Flujo Detallado del Proceso de Pago

### PASO 1: Cliente Inicia el Pago

```
┌─────────────┐
│   Cliente   │
│   Navega    │
└──────┬──────┘
       │
       │ 1. Visita página con producto
       ▼
┌─────────────────────────────────┐
│  Página de Producto/Servicio    │
│                                  │
│  ┌────────────────────────────┐ │
│  │ Mármol Blanco Polar        │ │
│  │ $500,000 COP               │ │
│  │                            │ │
│  │ [Pagar con Wompi] ◄────────┼─┼─── WompiPaymentButton Component
│  └────────────────────────────┘ │
└─────────────────────────────────┘
```

### PASO 2: Formulario de Datos

```
Cliente hace clic en "Pagar"
       │
       ▼
┌──────────────────────────────────┐
│   Modal de Datos del Cliente     │
├──────────────────────────────────┤
│                                  │
│  Nombre: [___________________]   │
│  Email:  [___________________]   │
│  Teléfono: [_________________]   │
│                                  │
│  [Cancelar]  [Continuar Pago]    │
└──────────────────────────────────┘
       │
       │ 2. Completa datos
       ▼
   Validación
       │
       ├─ ❌ Inválido → Muestra error
       │
       └─ ✅ Válido
              │
              ▼
```

### PASO 3: Generación de Enlace

```
┌─────────────────────────────────────────┐
│  Procesamiento en el Cliente            │
├─────────────────────────────────────────┤
│                                          │
│  1. Generar referencia única:           │
│     ANT-1729875234567-ABC123             │
│                                          │
│  2. Convertir pesos a centavos:          │
│     $500,000 → 50,000,000 centavos       │
│                                          │
│  3. Construir URL de Wompi:              │
│     https://checkout.wompi.co/p/?        │
│     public-key=pub_test_xxx&             │
│     amount-in-cents=50000000&            │
│     reference=ANT-1729875234567-ABC123&  │
│     customer-data:email=...&             │
│     customer-data:full-name=...&         │
│     redirect-url=https://tu-sitio.com/   │
│                   confirmacion-pago      │
│                                          │
└─────────────────────────────────────────┘
       │
       │ 3. window.location.href = url
       ▼
```

### PASO 4: Checkout de Wompi

```
┌──────────────────────────────────────────┐
│       Wompi Checkout (Externo)           │
├──────────────────────────────────────────┤
│                                          │
│  Mármol Blanco Polar - Anticipo 50%     │
│  $500,000 COP                            │
│                                          │
│  Cliente: Juan Pérez                     │
│  Email: juan@example.com                 │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Número de Tarjeta                  │ │
│  │ [____-____-____-____]              │ │
│  │                                    │ │
│  │ CVV      Fecha Venc.               │ │
│  │ [___]    [__/__]                   │ │
│  │                                    │ │
│  │ [💳 Pagar $500,000]                │ │
│  └────────────────────────────────────┘ │
└──────────────────────────────────────────┘
       │
       │ 4. Cliente completa pago
       ▼
   Procesamiento
       │
       ├─ ✅ APROBADO
       │     │
       │     ├─── Redirect al sitio
       │     │    /confirmacion-pago?id=txn_xxx
       │     │
       │     └─── Webhook a N8N
       │          (async, en paralelo)
       │
       └─ ❌ RECHAZADO
             └─── Redirect al sitio
                  /confirmacion-pago?id=txn_xxx&status=DECLINED
```

### PASO 5: Página de Confirmación

```
Cliente es redirigido a tu sitio
       │
       ▼
┌───────────────────────────────────────────┐
│  /confirmacion-pago?id=txn_12345          │
├───────────────────────────────────────────┤
│                                           │
│  PaymentConfirmation Component            │
│         │                                 │
│         │ useEffect(() => {               │
│         │   fetchTransactionDetails()     │
│         │ })                              │
│         ▼                                 │
│  ┌─────────────────────────────────────┐ │
│  │ GET https://production.wompi.co/    │ │
│  │     v1/transactions/txn_12345       │ │
│  └─────────────────────────────────────┘ │
│         │                                 │
│         ▼                                 │
│  ┌─────────────────────────────────────┐ │
│  │  ✅ ¡Pago Exitoso!                  │ │
│  │                                     │ │
│  │  ID: txn_12345                      │ │
│  │  Referencia: ANT-1729875234567-...  │ │
│  │  Monto: $500,000 COP                │ │
│  │  Estado: APROBADO                   │ │
│  │                                     │ │
│  │  📋 Próximos Pasos:                 │ │
│  │  1. Email de confirmación           │ │
│  │  2. Contacto en 24h                 │ │
│  │  3. Entrega del servicio            │ │
│  │                                     │ │
│  │  📞 Contacto: ...                   │ │
│  └─────────────────────────────────────┘ │
└───────────────────────────────────────────┘
```

### PASO 6: Automatización N8N (En Paralelo)

```
Wompi envía webhook
       │
       ▼
┌────────────────────────────────────────┐
│  N8N Webhook Listener                  │
│  http://tu-n8n.com/webhook/wompi-pmt   │
└────────────────────────────────────────┘
       │
       │ POST con datos de transacción
       ▼
┌────────────────────────────────────────┐
│  N8N Workflow: "Wompi Payment"         │
├────────────────────────────────────────┤
│                                        │
│  1️⃣ Webhook Node                       │
│      Recibe datos                      │
│      │                                 │
│      ▼                                 │
│  2️⃣ Function Node                      │
│      Procesa y formatea datos          │
│      {                                 │
│        timestamp: "...",               │
│        transactionId: "txn_12345",     │
│        customerName: "Juan Pérez",     │
│        amount: 500000,                 │
│        ...                             │
│      }                                 │
│      │                                 │
│      ▼                                 │
│  3️⃣ IF Node                            │
│      ¿status === 'APPROVED'?           │
│      │                                 │
│      ├─ ✅ SI                          │
│      │   │                             │
│      │   ├──────────────┬──────────────┤
│      │   │              │              │
│      │   ▼              ▼              ▼
│      │ 4️⃣ Google     5️⃣ Email      6️⃣ Telegram
│      │   Sheets        Cliente        Equipo
│      │   │              │              │
│      │   │              │              │
│      └─ ❌ NO          │              │
│          └──────────────┴──────────────┘
│                         │
│                         ▼
│  7️⃣ Respond to Webhook                 │
│      { status: "success" }             │
│                                        │
└────────────────────────────────────────┘
```

### PASO 7: Google Sheets

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  Google Sheets: "Transacciones Mármoles Deluxe"                                      │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ Timestamp           │ ID Trans.  │ Referencia     │ Estado   │ Tipo    │ Cliente ... │
├─────────────────────┼────────────┼────────────────┼──────────┼─────────┼─────────────┤
│ 2025-10-25 10:30:00 │ txn_12345  │ ANT-172987...  │ APPROVED │ ANTICIPO│ Juan Pérez  │
│ 2025-10-25 11:15:23 │ txn_67890  │ SRV-172988...  │ APPROVED │ SERVICIO│ María López │
│ 2025-10-25 14:22:45 │ txn_11111  │ PRD-172990...  │ APPROVED │ PRODUCTO│ Carlos Ruiz │
└──────────────────────────────────────────────────────────────────────────────────────┘
       ▲
       │
   Append Row
```

### PASO 8: Email al Cliente

```
┌─────────────────────────────────────────┐
│  Email enviado a: juan@example.com      │
├─────────────────────────────────────────┤
│                                         │
│  De: noreply@marmolesdeluxe.com         │
│  Asunto: ✅ Confirmación de Pago        │
│                                         │
│  Hola Juan Pérez,                       │
│                                         │
│  ¡Gracias por tu pago!                  │
│                                         │
│  📋 DETALLES DE TU TRANSACCIÓN:         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  • ID Transacción: txn_12345            │
│  • Referencia: ANT-1729875234567-ABC123 │
│  • Monto: $500,000 COP                  │
│  • Producto: Mármol Blanco Polar        │
│  • Método: CARD                         │
│                                         │
│  🎯 PRÓXIMOS PASOS:                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  1️⃣ Revisión (24h)                      │
│  2️⃣ Coordinación                        │
│  3️⃣ Entrega                             │
│                                         │
│  📞 CONTACTO:                           │
│  📧 info@marmolesdeluxe.com             │
│  💬 +57 300 123 4567                    │
│                                         │
│  Gracias por confiar en nosotros 🏛️     │
│                                         │
└─────────────────────────────────────────┘
```

### PASO 9: Telegram al Equipo

```
┌──────────────────────────────────┐
│  💬 Telegram: Grupo "Ventas"     │
├──────────────────────────────────┤
│                                  │
│  🤖 Bot Mármoles Deluxe          │
│  🔔 NUEVO PAGO RECIBIDO          │
│                                  │
│  💰 Monto: $500,000 COP          │
│  👤 Cliente: Juan Pérez          │
│  📧 Email: juan@example.com      │
│  📱 Teléfono: 3001234567         │
│                                  │
│  📦 Producto: Mármol Blanco...   │
│  🔢 Cantidad: 1                  │
│  💳 Método: CARD                 │
│                                  │
│  🆔 Ref: ANT-1729875234567-...   │
│  ⏰ 25/10/2025 10:30:00          │
│                                  │
│  ✅ Estado: APPROVED             │
│                                  │
└──────────────────────────────────┘
```

---

## 🔐 Flujo de Seguridad (Validación de Webhook)

```
Wompi envía webhook con firma
       │
       ▼
┌──────────────────────────────────────┐
│  N8N Function Node (Validación)      │
├──────────────────────────────────────┤
│                                      │
│  1. Recibir datos y firma:           │
│     signature.checksum               │
│                                      │
│  2. Obtener Private Key              │
│                                      │
│  3. Calcular firma esperada:         │
│     HMAC-SHA256(data, private_key)   │
│                                      │
│  4. Comparar firmas:                 │
│     ┌─────────────────────────┐     │
│     │ signature === expected? │     │
│     └─────────────────────────┘     │
│              │                       │
│       ┌──────┴──────┐               │
│       │             │               │
│       ✅ SI         ❌ NO           │
│       │             │               │
│       │             └─► Rechazar    │
│       │                 y loguear   │
│       │                             │
│       └─► Procesar                  │
│           normalmente               │
│                                      │
└──────────────────────────────────────┘
```

---

## 📊 Estados de la Transacción

```
                    Cliente Paga
                         │
                         ▼
                    ┌─────────┐
                    │ PENDING │ ◄─── Estado inicial
                    └────┬────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │APPROVED │    │DECLINED │    │  ERROR  │
    └────┬────┘    └────┬────┘    └────┬────┘
         │               │               │
         │               │               │
         ▼               ▼               ▼
    ✅ Éxito       ❌ Rechazado     ⚠️ Error
    │                   │               │
    │                   │               │
    ├─► Email           ├─► Email       ├─► Log
    ├─► Telegram        │   (error)     └─► Alerta
    └─► Google          └─► Sin registro
        Sheets              en Sheets


    Puede anularse:
    APPROVED ──────► VOIDED
                     (Anulado)
```

---

## 🌐 URLs del Sistema

```
┌─────────────────────────────────────────────────────────┐
│  DESARROLLO (Local)                                     │
├─────────────────────────────────────────────────────────┤
│  Sitio Web:        http://localhost:4321                │
│  Ejemplos:         http://localhost:4321/ejemplos-pago  │
│  Confirmación:     http://localhost:4321/confirmacion-  │
│                    pago?id=txn_xxx                       │
│  N8N:              http://localhost:5678                │
│  Webhook N8N:      http://localhost:5678/webhook/       │
│                    wompi-payment                         │
│  Ngrok (túnel):    https://abc123.ngrok.io              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  PRODUCCIÓN                                             │
├─────────────────────────────────────────────────────────┤
│  Sitio Web:        https://marmolesdeluxe.com           │
│  Confirmación:     https://marmolesdeluxe.com/          │
│                    confirmacion-pago?id=txn_xxx          │
│  N8N:              https://n8n.marmolesdeluxe.com       │
│  Webhook N8N:      https://n8n.marmolesdeluxe.com/      │
│                    webhook/wompi-payment                 │
└─────────────────────────────────────────────────────────┘
```

---

## 💾 Estructura de Datos

### Objeto de Transacción (Wompi)

```javascript
{
  id: "txn_12345",
  status: "APPROVED",
  reference: "ANT-1729875234567-ABC123",
  amount_in_cents: 50000000,
  currency: "COP",
  customer_email: "juan@example.com",
  customer_data: {
    full_name: "Juan Pérez",
    phone_number: "3001234567",
    legal_id: "1234567890",
    legal_id_type: "CC"
  },
  payment_method_type: "CARD",
  payment_method: {
    type: "CARD",
    extra: {
      last_four: "4242",
      brand: "VISA"
    }
  },
  created_at: "2025-10-25T10:30:00.000Z",
  finalized_at: "2025-10-25T10:30:15.000Z",
  metadata: {
    paymentType: "ANTICIPO",
    productName: "Mármol Blanco Polar",
    quantity: 1,
    sku: "MAR-BP-001"
  }
}
```

### Registro en Google Sheets

```
| Timestamp           | ID          | Referencia | ... |
|---------------------|-------------|------------|-----|
| 2025-10-25 10:30:00 | txn_12345   | ANT-17...  | ... |
```

---

Esta arquitectura garantiza:

- ✅ Pagos seguros con Wompi
- ✅ Confirmación inmediata al cliente
- ✅ Registro automático de transacciones
- ✅ Notificaciones en tiempo real
- ✅ Escalabilidad y mantenibilidad
