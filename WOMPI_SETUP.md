# 🔧 Guía de Configuración Completa de Wompi

## 📋 Tabla de Contenidos

1. [Variables de Entorno](#variables-de-entorno)
2. [Configurar Webhooks en Wompi](#configurar-webhooks-en-wompi)
3. [Configurar N8N](#configurar-n8n)
4. [Probar la Integración](#probar-la-integración)
5. [Pasar a Producción](#pasar-a-producción)

---

## 1. Variables de Entorno

### Obtener tus Llaves de Wompi

1. Regístrate en [comercios.wompi.co](https://comercios.wompi.co/)
2. Ve a **"Desarrollo"** > **"Programadores"**
3. Copia tus llaves:
   - **Llave pública**: `pub_test_...` (para sandbox) o `pub_prod_...` (para producción)
   - **Llave privada**: `prv_test_...` o `prv_prod_...`

### Obtener Secretos de Integración

En la misma sección de **"Programadores"**, encontrarás:

- **Eventos**: `test_events_...` o `prod_events_...`
- **Integridad**: `test_integrity_...` o `prod_integrity_...`

Estos secretos son CRÍTICOS para validar que los webhooks realmente vienen de Wompi.

### Configurar archivo .env

```env
# ============================================
# WOMPI
# ============================================
# Llaves de autenticación
PUBLIC_WOMPI_PUBLIC_KEY=pub_prod_fQQmbrfPuQPUeNQagkofLRwcN6zPqNUk
WOMPI_PRIVATE_KEY=prv_prod_1LpIBuXHyg90qzbdSSV04YbTieXb4H4o

# Secretos de integración técnica (para validar webhooks)
WOMPI_EVENTS_SECRET=prod_events_uNH4Nc75hw38pQ4KJRnaGqOQmtUraxu3
WOMPI_INTEGRITY_SECRET=prod_integrity_lTpetJcpl1LEXUSAUMb4ZATc2lgRrYg9

# Configuración
PUBLIC_WOMPI_ENVIRONMENT=test
PUBLIC_SITE_URL=http://localhost:4321

# ============================================
# N8N
# ============================================
PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/wompi-payment
```

---

## 2. Configurar Webhooks en Wompi

### URL del Webhook

Wompi necesita saber dónde enviar las notificaciones de transacciones:

**Desarrollo/Local:**

```
http://localhost:4321/api/wompi-webhook
```

**Producción:**

```
https://marmolesdeluxe.com/api/wompi-webhook
```

### Pasos en el Portal de Wompi

1. Ve a [comercios.wompi.co](https://comercios.wompi.co/)
2. Navega a **"Desarrollo"** > **"Eventos"**
3. Haz clic en **"Agregar URL"**
4. Pega la URL de tu webhook
5. Selecciona el evento: **`transaction.updated`**
6. Guarda la configuración

### ⚠️ Importante para Desarrollo Local

Si estás desarrollando localmente, Wompi NO puede enviar webhooks directamente a `localhost`. Necesitas usar un túnel:

**Opción 1: ngrok (recomendado)**

```bash
ngrok http 4321
```

Copia la URL HTTPS que te da ngrok (ej: `https://abc123.ngrok.io`) y úsala en Wompi:

```
https://abc123.ngrok.io/api/wompi-webhook
```

**Opción 2: Cloudflare Tunnel**

```bash
cloudflared tunnel --url http://localhost:4321
```

---

## 3. Configurar N8N

### Instalación de N8N

```bash
npm install -g n8n
n8n
```

N8N estará disponible en: `http://localhost:5678`

### Importar Workflow

1. Abre N8N: `http://localhost:5678`
2. Ve a **"Workflows"** > **"Import from File"**
3. Selecciona el archivo: `n8n-workflow-wompi.json`
4. Activa el workflow

### Configurar Credenciales

El workflow necesita:

#### Google Sheets (Opcional - para guardar transacciones)

1. En N8N, ve al nodo **"Guardar en Google Sheets"**
2. Clic en **"Create New Credential"**
3. Autoriza con tu cuenta de Google
4. Selecciona o crea un Google Sheet
5. En el `.env`, agrega el ID del sheet:
   ```env
   GOOGLE_SHEET_ID=1abc123xyz456
   ```

#### Telegram (Opcional - para notificaciones)

1. Habla con [@BotFather](https://t.me/BotFather) en Telegram
2. Crea un bot: `/newbot`
3. Copia el token
4. Obtén tu Chat ID hablando con [@userinfobot](https://t.me/userinfobot)
5. Agrega al `.env`:
   ```env
   TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
   TELEGRAM_CHAT_ID=123456789
   ```

#### Email (Opcional - para enviar confirmaciones)

Usa un servicio como SendGrid, Mailgun, o SMTP:

```env
EMAIL_SERVICE_ID=tu_servicio
EMAIL_TEMPLATE_ID=tu_template
EMAIL_PUBLIC_KEY=tu_llave
```

---

## 4. Probar la Integración

### Paso 1: Verificar Variables de Entorno

```bash
# Verifica que las variables estén cargadas
npm run dev
```

Deberías ver en consola:

```
✅ Configuración de Wompi válida
```

### Paso 2: Crear Pago de Prueba

Ve a: `http://localhost:4321/ejemplos-pago`

Haz clic en cualquier botón de pago para generar un enlace de pago de Wompi.

### Paso 3: Completar Pago en Sandbox

Wompi te redirigirá a su checkout. Usa estas tarjetas de prueba:

**Tarjeta Aprobada:**

- Número: `4242 4242 4242 4242`
- CVV: `123`
- Fecha: Cualquier fecha futura

**Tarjeta Rechazada:**

- Número: `4111 1111 1111 1111`

### Paso 4: Verificar Webhook

Después de completar el pago:

1. **Vercel/Servidor**: Revisa los logs para ver el webhook recibido
2. **N8N**: Ve al workflow y verifica que se ejecutó
3. **Google Sheets**: Verifica que se guardó el registro
4. **Email/Telegram**: Verifica que llegaron las notificaciones

---

## 5. Pasar a Producción

### Checklist Pre-Producción

- [ ] Cambiar llaves de `test` a `prod` en `.env`
- [ ] Cambiar `PUBLIC_WOMPI_ENVIRONMENT=production`
- [ ] Actualizar `PUBLIC_SITE_URL` con tu dominio real
- [ ] Configurar webhook en Wompi con URL de producción
- [ ] Verificar que N8N esté accesible (si es externo)
- [ ] Realizar prueba con monto mínimo real ($1000 COP)
- [ ] Verificar que los emails de confirmación llegan
- [ ] Revisar logs de producción

### Variables de Producción

```env
# PRODUCCIÓN - USA DINERO REAL ⚠️
PUBLIC_WOMPI_PUBLIC_KEY=pub_prod_TU_LLAVE_REAL
WOMPI_PRIVATE_KEY=prv_prod_TU_LLAVE_PRIVADA_REAL
WOMPI_EVENTS_SECRET=prod_events_TU_SECRET_REAL
WOMPI_INTEGRITY_SECRET=prod_integrity_TU_SECRET_REAL
PUBLIC_WOMPI_ENVIRONMENT=production
PUBLIC_SITE_URL=https://marmolesdeluxe.com
```

### URL del Webhook en Producción

Actualiza en Wompi:

```
https://marmolesdeluxe.com/api/wompi-webhook
```

### Monitoreo

- Revisa los logs de Wompi en el portal de comercios
- Monitorea las ejecuciones de N8N
- Configura alertas en caso de fallos

---

## 🔐 Seguridad

### ✅ Lo que SÍ hacemos

1. **Validación de firma**: Usamos `WOMPI_INTEGRITY_SECRET` para validar que los webhooks vienen de Wompi
2. **Secretos en servidor**: Los secretos NUNCA se exponen al frontend
3. **HTTPS en producción**: Todos los webhooks deben usar HTTPS

### ❌ Lo que NO debes hacer

- ❌ NO subas el archivo `.env` a Git
- ❌ NO compartas tus llaves privadas o secretos
- ❌ NO uses llaves de producción en desarrollo
- ❌ NO ignores errores de validación de firma

---

## 📚 Recursos Adicionales

- [Documentación Wompi](https://docs.wompi.co/)
- [Referencia API](https://docs.wompi.co/reference)
- [Ambientes y Llaves](https://docs.wompi.co/docs/colombia/ambientes-y-llaves/)
- [Webhooks](https://docs.wompi.co/docs/colombia/eventos/)

---

## ❓ Problemas Comunes

### Webhook no llega

1. Verifica que la URL del webhook esté correcta en Wompi
2. Si es local, usa ngrok o cloudflare tunnel
3. Verifica los logs en el portal de Wompi

### Firma inválida

1. Verifica que `WOMPI_INTEGRITY_SECRET` sea correcto
2. Asegúrate de usar el secret correcto (test vs prod)
3. Revisa los logs del endpoint `/api/wompi-webhook`

### N8N no recibe datos

1. Verifica que `PUBLIC_N8N_WEBHOOK_URL` esté correcta
2. Asegúrate de que N8N esté corriendo
3. Revisa el workflow en N8N para errores

---

## 🎯 Próximos Pasos

Una vez configurado todo:

1. Prueba un pago de extremo a extremo
2. Verifica que todos los sistemas reciben la información
3. Personaliza los emails y notificaciones
4. Configura reportes en Google Sheets
5. ¡Empieza a recibir pagos reales! 💰
