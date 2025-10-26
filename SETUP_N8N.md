# 🔄 Automatización de Pagos con N8N

Este documento describe el flujo completo de automatización para procesar pagos de Wompi utilizando N8N, Google Sheets, Email y Telegram.

## 📊 Diagrama de Flujo

```
Cliente → Wompi Checkout → Pago Exitoso
                              ↓
                    Wompi Webhook → N8N
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
            Google Sheets          Validación
                    ↓                   ↓
            Email Cliente         Telegram (Equipo)
```

## 🎯 Objetivos del Flujo

1. **Registrar transacciones** en Google Sheets automáticamente
2. **Enviar confirmación** por email al cliente
3. **Notificar al equipo** vía Telegram
4. **Mantener historial** de todas las transacciones

---

## 📋 Pre-requisitos

### 1. N8N Local (Docker)

Asegúrate de tener N8N corriendo en Docker:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Accede a: `http://localhost:5678`

### 2. Google Sheets

1. Crea una hoja de cálculo en Google Sheets
2. Nómbrala: "Transacciones Mármoles Deluxe"
3. Crea las siguientes columnas en la primera fila:

| Timestamp | ID Transacción | Referencia | Estado | Tipo de Pago | Cliente | Email | Teléfono | Producto | Cantidad | Monto | Método de Pago | Metadata |
| --------- | -------------- | ---------- | ------ | ------------ | ------- | ----- | -------- | -------- | -------- | ----- | -------------- | -------- |

4. Copia el ID de la hoja (está en la URL):
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```

### 3. Bot de Telegram

1. Habla con [@BotFather](https://t.me/botfather)
2. Crea un nuevo bot: `/newbot`
3. Guarda el **token** que te da
4. Crea un grupo o canal para notificaciones
5. Agrega el bot al grupo
6. Obtén el **Chat ID** del grupo usando: [@userinfobot](https://t.me/userinfobot)

### 4. Configuración de Email

Opciones:

- **EmailJS** (recomendado para frontend): https://www.emailjs.com/
- **SendGrid** (más profesional)
- **Gmail SMTP** (más simple)

---

## 🔧 Configuración del Workflow en N8N

### Workflow 1: Recepción de Webhook de Wompi

#### Paso 1: Webhook Node

1. En N8N, crea un nuevo workflow
2. Agrega un nodo **Webhook**
3. Configura:
   - **Path**: `wompi-payment`
   - **Method**: POST
   - **Response Mode**: Last Node
   - **Response Code**: 200

La URL completa será: `http://localhost:5678/webhook/wompi-payment`

**Importante**: En producción, necesitarás exponer este webhook con:

- **ngrok** (para pruebas): `ngrok http 5678`
- **Dominio propio** con HTTPS
- **Cloudflare Tunnel**

#### Paso 2: Function Node - Procesar Datos de Wompi

```javascript
// Extraer datos del webhook de Wompi
const webhookData = $input.item.json;
const transaction = webhookData.data.transaction;

// Formatear datos para Google Sheets
const formattedData = {
  timestamp: new Date().toISOString(),
  transactionId: transaction.id,
  reference: transaction.reference,
  status: transaction.status,
  paymentType: transaction.metadata?.paymentType || "N/A",
  customerName: transaction.customer_data.full_name,
  customerEmail: transaction.customer_email,
  customerPhone: transaction.customer_data.phone_number,
  productName: transaction.metadata?.productName || "N/A",
  quantity: transaction.metadata?.quantity || 1,
  amount: transaction.amount_in_cents / 100, // Convertir a pesos
  paymentMethod: transaction.payment_method_type,
  metadata: JSON.stringify(transaction.metadata || {}),
};

return {
  json: formattedData,
};
```

#### Paso 3: IF Node - Validar Estado

Agrega un nodo **IF** para procesar solo pagos aprobados:

- **Condition**: `{{ $json.status }}` equals `APPROVED`

#### Paso 4: Google Sheets Node - Guardar Transacción

1. Agrega nodo **Google Sheets**
2. Conecta con tu cuenta de Google
3. Configura:
   - **Operation**: Append
   - **Document**: Selecciona tu hoja
   - **Sheet**: Sheet1
   - **Columns**: Mapea cada campo

Mapeo de columnas:

```
Timestamp → {{ $json.timestamp }}
ID Transacción → {{ $json.transactionId }}
Referencia → {{ $json.reference }}
Estado → {{ $json.status }}
Tipo de Pago → {{ $json.paymentType }}
Cliente → {{ $json.customerName }}
Email → {{ $json.customerEmail }}
Teléfono → {{ $json.customerPhone }}
Producto → {{ $json.productName }}
Cantidad → {{ $json.quantity }}
Monto → {{ $json.amount }}
Método de Pago → {{ $json.paymentMethod }}
Metadata → {{ $json.metadata }}
```

#### Paso 5: Email Node - Notificar Cliente

**Opción A: Using Gmail**

1. Agrega nodo **Gmail**
2. Conecta tu cuenta
3. Configura:

```
To: {{ $json.customerEmail }}
Subject: ✅ Confirmación de Pago - Mármoles Deluxe

Hola {{ $json.customerName }},

¡Gracias por tu pago!

📋 DETALLES DE TU TRANSACCIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• ID Transacción: {{ $json.transactionId }}
• Referencia: {{ $json.reference }}
• Monto: ${{ $json.amount }} COP
• Producto/Servicio: {{ $json.productName }}
• Cantidad: {{ $json.quantity }}
• Método de Pago: {{ $json.paymentMethod }}
• Fecha: {{ $json.timestamp }}

🎯 PRÓXIMOS PASOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣ Nuestro equipo revisará tu pago en las próximas 24 horas
2️⃣ Te contactaremos para coordinar el servicio o envío
3️⃣ Realizaremos la entrega según lo acordado

📞 ¿NECESITAS AYUDA?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: info@marmolesdeluxe.com
💬 WhatsApp: +57 300 123 4567
🕐 Horario: Lun-Vie 8AM-6PM, Sáb 9AM-2PM

Gracias por confiar en Mármoles Deluxe 🏛️

---
Este es un correo automático. Por favor no respondas a este mensaje.
Para soporte, usa los canales de contacto mencionados arriba.
```

**Opción B: Using Send Email Node**

Si prefieres SMTP:

```javascript
From: noreply@marmolesdeluxe.com
To: {{ $json.customerEmail }}
Subject: ✅ Confirmación de Pago - Mármoles Deluxe
// (Mismo contenido que arriba)
```

#### Paso 6: Telegram Node - Notificar Equipo

1. Agrega nodo **Telegram**
2. Configura las credenciales:
   - Bot Token: `tu_telegram_bot_token`
3. Configura:
   - **Chat ID**: `tu_telegram_chat_id`
   - **Text**:

```
🔔 NUEVO PAGO RECIBIDO

💰 Monto: ${{ $json.amount }} COP
👤 Cliente: {{ $json.customerName }}
📧 Email: {{ $json.customerEmail }}
📱 Teléfono: {{ $json.customerPhone }}

📦 Producto: {{ $json.productName }}
🔢 Cantidad: {{ $json.quantity }}
💳 Método: {{ $json.paymentMethod }}

🆔 Ref: {{ $json.reference }}
⏰ {{ $json.timestamp }}

✅ Estado: {{ $json.status }}
```

#### Paso 7: Respond to Webhook

Agrega un nodo **Respond to Webhook** al final:

```json
{
  "status": "success",
  "message": "Webhook received and processed"
}
```

---

## 📝 Workflow Completo (JSON para Importar)

Guarda esto como `wompi-n8n-workflow.json`:

```json
{
  "name": "Wompi Payment Processing",
  "nodes": [
    {
      "parameters": {
        "path": "wompi-payment",
        "options": {}
      },
      "name": "Webhook Wompi",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "functionCode": "// Procesar webhook de Wompi\nconst webhookData = $input.item.json;\nconst transaction = webhookData.data.transaction;\n\nconst formattedData = {\n  timestamp: new Date().toISOString(),\n  transactionId: transaction.id,\n  reference: transaction.reference,\n  status: transaction.status,\n  paymentType: transaction.metadata?.paymentType || 'N/A',\n  customerName: transaction.customer_data.full_name,\n  customerEmail: transaction.customer_email,\n  customerPhone: transaction.customer_data.phone_number,\n  productName: transaction.metadata?.productName || 'N/A',\n  quantity: transaction.metadata?.quantity || 1,\n  amount: transaction.amount_in_cents / 100,\n  paymentMethod: transaction.payment_method_type,\n  metadata: JSON.stringify(transaction.metadata || {})\n};\n\nreturn { json: formattedData };"
      },
      "name": "Process Data",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{ $json.status }}",
              "value2": "APPROVED"
            }
          ]
        }
      },
      "name": "If Approved",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "sheetId": "Sheet1",
        "range": "A:M",
        "options": {}
      },
      "name": "Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [850, 200]
    },
    {
      "parameters": {
        "sendTo": "={{ $json.customerEmail }}",
        "subject": "Confirmación de Pago - Mármoles Deluxe",
        "message": "=Hola {{ $json.customerName }},\\n\\n¡Gracias por tu pago!\\n\\nDetalles de tu transacción:\\n- Monto: ${{ $json.amount }} COP\\n- Referencia: {{ $json.reference }}\\n\\nNos pondremos en contacto contigo pronto.\\n\\nSaludos,\\nMármoles Deluxe"
      },
      "name": "Email Cliente",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 1,
      "position": [850, 300]
    },
    {
      "parameters": {
        "chatId": "TU_CHAT_ID",
        "text": "=🔔 NUEVO PAGO\\n\\n💰 ${{ $json.amount }} COP\\n👤 {{ $json.customerName }}\\n📧 {{ $json.customerEmail }}\\n\\n📦 {{ $json.productName }}\\n🆔 {{ $json.reference }}"
      },
      "name": "Telegram Notificación",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1,
      "position": [850, 400]
    }
  ],
  "connections": {
    "Webhook Wompi": {
      "main": [[{ "node": "Process Data", "type": "main", "index": 0 }]]
    },
    "Process Data": {
      "main": [[{ "node": "If Approved", "type": "main", "index": 0 }]]
    },
    "If Approved": {
      "main": [
        [
          { "node": "Google Sheets", "type": "main", "index": 0 },
          { "node": "Email Cliente", "type": "main", "index": 0 },
          { "node": "Telegram Notificación", "type": "main", "index": 0 }
        ]
      ]
    }
  }
}
```

---

## 🧪 Pruebas

### 1. Configurar Wompi en Ambiente de Prueba

1. Obtén tus credenciales de prueba en: https://comercios.wompi.co/
2. Agrega a tu `.env`:
   ```env
   PUBLIC_WOMPI_PUBLIC_KEY=pub_test_xxxxxxxxxx
   PUBLIC_WOMPI_ENVIRONMENT=test
   PUBLIC_SITE_URL=http://localhost:4321
   PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/wompi-payment
   ```

### 2. Exponer N8N con ngrok (para pruebas)

```bash
ngrok http 5678
```

Copia la URL HTTPS que te da (ej: `https://abc123.ngrok.io`) y actualiza:

```env
PUBLIC_N8N_WEBHOOK_URL=https://abc123.ngrok.io/webhook/wompi-payment
```

### 3. Configurar Webhook en Wompi

1. Ve a: https://comercios.wompi.co/webhooks
2. Agrega tu URL de ngrok: `https://abc123.ngrok.io/webhook/wompi-payment`
3. Selecciona eventos: `transaction.updated`

### 4. Realizar Pago de Prueba

Tarjetas de prueba de Wompi:

**Aprobada:**

```
Número: 4242 4242 4242 4242
CVV: 123
Fecha: Cualquier fecha futura
```

**Rechazada:**

```
Número: 4111 1111 1111 1111
CVV: 123
Fecha: Cualquier fecha futura
```

### 5. Verificar Flujo

1. ✅ Webhook recibido en N8N (ver ejecuciones)
2. ✅ Datos guardados en Google Sheets
3. ✅ Email enviado al cliente
4. ✅ Notificación en Telegram

---

## 🚀 Producción

### Cambios Necesarios:

1. **Wompi**: Cambiar a credenciales de producción

   ```env
   PUBLIC_WOMPI_PUBLIC_KEY=pub_prod_xxxxxxxxxx
   PUBLIC_WOMPI_ENVIRONMENT=production
   ```

2. **N8N**: Desplegar con dominio propio

   - Opción 1: VPS (DigitalOcean, AWS, etc.)
   - Opción 2: Railway.app
   - Opción 3: Render.com

3. **Webhook URL**: Actualizar a URL de producción con HTTPS

   ```env
   PUBLIC_N8N_WEBHOOK_URL=https://n8n.tudominio.com/webhook/wompi-payment
   ```

4. **Site URL**: URL de producción
   ```env
   PUBLIC_SITE_URL=https://marmolesdeluxe.com
   ```

---

## 📞 Soporte

Si tienes problemas:

1. **Logs de N8N**: Revisa las ejecuciones del workflow
2. **Logs de Wompi**: Panel de comercios → Webhooks
3. **Google Sheets**: Verifica permisos de la API
4. **Telegram**: Verifica que el bot esté en el grupo

---

## 🔐 Seguridad

### Validar Webhook de Wompi

Para producción, agrega validación de firma en el Function Node:

```javascript
const crypto = require("crypto");

const webhookData = $input.item.json;
const signature = webhookData.signature.checksum;
const privateKey = "tu_private_key"; // Desde variables de entorno

// Generar checksum
const properties = webhookData.signature.properties.sort();
const concatenated = properties
  .map((prop) => JSON.stringify(webhookData[prop]))
  .join("");

const expectedSignature = crypto
  .createHmac("sha256", privateKey)
  .update(concatenated)
  .digest("hex");

// Validar
if (signature !== expectedSignature) {
  throw new Error("Invalid webhook signature");
}

// Continuar con el procesamiento...
```

---

## 📊 Estructura de Google Sheets Recomendada

Crea pestañas adicionales para análisis:

1. **Transacciones** (principal)
2. **Dashboard** (resumen automático con fórmulas)
3. **Mensuales** (agrupado por mes)
4. **Por Tipo** (agrupado por tipo de pago)

Fórmulas útiles en Dashboard:

```
Total del Mes:
=SUMIF(Transacciones!A:A, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1), Transacciones!K:K)

Cantidad de Transacciones:
=COUNTIF(Transacciones!D:D, "APPROVED")

Promedio de Venta:
=AVERAGE(Transacciones!K:K)
```

---

## ✅ Checklist de Implementación

- [ ] N8N instalado y corriendo
- [ ] Google Sheet creada con columnas correctas
- [ ] Bot de Telegram configurado
- [ ] Credenciales de Wompi (test) obtenidas
- [ ] Variables de entorno configuradas
- [ ] Workflow de N8N importado y configurado
- [ ] Webhook expuesto (ngrok o producción)
- [ ] Webhook registrado en panel de Wompi
- [ ] Pago de prueba realizado exitosamente
- [ ] Email de confirmación recibido
- [ ] Notificación de Telegram recibida
- [ ] Datos en Google Sheets verificados

---

**¡Listo!** 🎉 Tu flujo de automatización de pagos está completo.
