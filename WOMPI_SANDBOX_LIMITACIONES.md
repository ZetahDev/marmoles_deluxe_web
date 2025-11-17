# ⚠️ Limitaciones de Wompi Sandbox (Modo Test)

## 🚫 Problema: No se pueden configurar Webhooks en Sandbox

### ¿Por qué no veo la opción de agregar URL de eventos?

Wompi **NO permite configurar webhooks en el ambiente SANDBOX (test)**. Esta es una limitación intencional del modo de pruebas.

**En modo Sandbox:**

- ❌ NO puedes configurar URL de eventos
- ❌ NO recibirás webhooks automáticos
- ✅ SÍ puedes hacer pagos de prueba
- ✅ SÍ puedes ver las transacciones en el portal

**En modo Producción:**

- ✅ SÍ puedes configurar URL de eventos
- ✅ SÍ recibirás webhooks automáticos
- ⚠️ Usarás dinero REAL

---

## 🔧 Soluciones Alternativas para Desarrollo

### Opción 1: Simular Webhooks Manualmente (Recomendado)

Puedes enviar webhooks simulados directamente a tu endpoint local:

#### Paso 1: Iniciar el servidor de desarrollo

```bash
npm run dev
```

#### Paso 2: Enviar webhook de prueba con PowerShell

```powershell
$webhookData = @{
    event = "transaction.updated"
    data = @{
        transaction = @{
            id = "12345-test-67890"
            status = "APPROVED"
            reference = "ANT-1731671234-ABC123"
            amount_in_cents = 50000000
            currency = "COP"
            customer_email = "cliente@example.com"
            customer_data = @{
                full_name = "Juan Pérez"
                phone_number = "+573001234567"
            }
            payment_method_type = "CARD"
            payment_method = @{
                type = "CARD"
                extra = @{}
            }
            redirect_url = "http://localhost:4321/confirmacion-pago"
            payment_link_id = $null
            created_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
            finalized_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
            status_message = $null
            metadata = @{
                paymentType = "ANTICIPO"
                productName = "Mármol Blanco Polar"
                quantity = 1
            }
        }
    }
    sent_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    timestamp = [int][double]::Parse((Get-Date -UFormat %s))
    signature = @{
        checksum = "test_checksum_12345"
        properties = @("data.transaction.id", "data.transaction.status")
    }
    environment = "test"
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:4321/api/wompi-webhook" -Method POST -Body $webhookData -ContentType "application/json"
```

### Opción 2: Usar Postman o Thunder Client

1. **Método**: POST
2. **URL**: `http://localhost:4321/api/wompi-webhook`
3. **Headers**: `Content-Type: application/json`
4. **Body** (JSON):

```json
{
  "event": "transaction.updated",
  "data": {
    "transaction": {
      "id": "test-12345-67890",
      "status": "APPROVED",
      "reference": "ANT-1731671234-ABC123",
      "amount_in_cents": 50000000,
      "currency": "COP",
      "customer_email": "cliente@example.com",
      "customer_data": {
        "full_name": "Juan Pérez",
        "phone_number": "+573001234567"
      },
      "payment_method_type": "CARD",
      "payment_method": {
        "type": "CARD",
        "extra": {}
      },
      "redirect_url": "http://localhost:4321/confirmacion-pago",
      "created_at": "2024-11-15T10:30:00.000Z",
      "finalized_at": "2024-11-15T10:30:05.000Z",
      "metadata": {
        "paymentType": "ANTICIPO",
        "productName": "Mármol Blanco Polar",
        "quantity": 1
      }
    }
  },
  "sent_at": "2024-11-15T10:30:05.000Z",
  "timestamp": 1731671405,
  "signature": {
    "checksum": "test_checksum",
    "properties": ["data.transaction.id", "data.transaction.status"]
  },
  "environment": "test"
}
```

### Opción 3: Consultar Transacciones Manualmente

Después de hacer un pago de prueba, consulta la transacción usando el API de Wompi:

```bash
# Obtener detalles de una transacción
curl -X GET "https://sandbox.wompi.co/v1/transactions/TRANSACTION_ID" \
  -H "Authorization: Bearer pub_test_ryHKciVu9fYxH5ga7fe26G9v1u0vFb8o"
```

Luego procesa manualmente los datos en tu sistema.

---

## 🔄 Flujo de Desarrollo Recomendado

### Durante Desarrollo (Sandbox)

1. **Hacer pago de prueba** en `/ejemplos-pago`
2. **Simular webhook** manualmente (Opción 1 o 2)
3. **Verificar** que N8N recibe y procesa correctamente
4. **Validar** que los emails y notificaciones funcionan

### Para Pasar a Producción

1. **Cambiar a llaves de producción** en `.env`:

   ```env
   PUBLIC_WOMPI_PUBLIC_KEY=pub_prod_...
   WOMPI_PRIVATE_KEY=prv_prod_...
   WOMPI_EVENTS_SECRET=prod_events_...
   WOMPI_INTEGRITY_SECRET=prod_integrity_...
   PUBLIC_WOMPI_ENVIRONMENT=production
   ```

2. **Configurar webhook en Wompi** (ahora SÍ estará disponible):

   - Panel → Desarrollo → Eventos
   - Agregar URL: `https://marmolesdeluxe.com/api/wompi-webhook`
   - Seleccionar evento: `transaction.updated`

3. **Hacer prueba con monto mínimo** ($1.000 COP)

4. **Verificar webhook automático**

---

## 📝 Notas Importantes

### ⚠️ Validación de Firma en Test

En ambiente de pruebas, la validación de firma **fallará** porque los webhooks simulados no tienen un checksum válido.

**Solución temporal** para desarrollo:

Comentar temporalmente la validación en `src/pages/api/wompi-webhook.ts`:

```typescript
// Para DESARROLLO/TESTING - Deshabilitar validación
const skipValidation = true; // Cambiar a false en producción

if (wompiConfig.integritySecret && !skipValidation) {
  const isValid = await validateWebhookSignature(
    webhookEvent,
    wompiConfig.integritySecret
  );
  // ... resto del código
}
```

**IMPORTANTE**: ❌ NO subir esto a producción. La validación debe estar activa en producción.

---

## ✅ Credenciales Actuales

### Sandbox (Test) - Guardadas en `.env`

```env
PUBLIC_WOMPI_PUBLIC_KEY=pub_test_ryHKciVu9fYxH5ga7fe26G9v1u0vFb8o
WOMPI_PRIVATE_KEY=prv_test_2CIEXMkP6ubx6WMQH9GVnxqnBhZxohwb
WOMPI_EVENTS_SECRET=test_events_JK9j6EmOye8ku6h1GckkxUzjVHSryJkl
WOMPI_INTEGRITY_SECRET=test_integrity_RUD1ovw1E20Fvx4GhojiOGvyXtBrlGiv
```

### Producción - Para usar más adelante

```env
PUBLIC_WOMPI_PUBLIC_KEY=pub_prod_fQQmbrfPuQPUeNQagkofLRwcN6zPqNUk
WOMPI_PRIVATE_KEY=prv_prod_1LpIBuXHyg90qzbdSSV04YbTieXb4H4o
WOMPI_EVENTS_SECRET=prod_events_uNH4Nc75hw38pQ4KJRnaGqOQmtUraxu3
WOMPI_INTEGRITY_SECRET=prod_integrity_lTpetJcpl1LEXUSAUMb4ZATc2lgRrYg9
```

---

## 🎯 Resumen

| Característica      | Sandbox (Test)            | Producción              |
| ------------------- | ------------------------- | ----------------------- |
| Configurar Webhooks | ❌ NO disponible          | ✅ Disponible           |
| Pagos de prueba     | ✅ Sí (tarjeta 4242...)   | ❌ No (dinero real)     |
| Simular webhooks    | ✅ Manualmente            | ❌ Automáticos de Wompi |
| Validar firmas      | ⚠️ Opcional/Deshabilitado | ✅ Obligatorio          |

**Conclusión**: En desarrollo, usa webhooks simulados. En producción, Wompi enviará webhooks reales automáticamente.
