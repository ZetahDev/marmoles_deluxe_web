# ❓ Preguntas Frecuentes (FAQ) - Sistema de Pagos Wompi

## 📋 Índice

- [General](#general)
- [Configuración](#configuración)
- [Desarrollo](#desarrollo)
- [N8N](#n8n)
- [Producción](#producción)
- [Problemas Comunes](#problemas-comunes)

---

## General

### ¿Qué es Wompi?

Wompi es una pasarela de pagos colombiana que permite recibir pagos con tarjetas de crédito, débito, PSE, Nequi y otros métodos. Es similar a Stripe o PayPal pero optimizada para Colombia.

### ¿Por qué no usamos un backend?

Para mantener costos bajos, usamos:

- **Astro** (frontend estático) - Gratis en Vercel/Netlify
- **Wompi** (procesamiento de pagos) - Solo comisión por transacción
- **N8N** (automatizaciones) - Gratis auto-hospedado
- **Google Sheets** (base de datos) - Gratis

### ¿Es seguro?

Sí, muy seguro:

- Los datos de tarjeta nunca pasan por tu servidor
- Wompi está certificado PCI DSS nivel 1
- Las transacciones usan HTTPS
- Los webhooks pueden validarse con firma HMAC

### ¿Cuánto cobra Wompi?

Tarifas aproximadas (verificar en wompi.co):

- Tarjetas de crédito: ~2.99% + $900 COP
- Tarjetas débito: ~1.49% + $900 COP
- PSE: ~$3,500 COP fijo
- Nequi: ~1.95% + $900 COP

Sin costo mensual, solo pagas por transacción exitosa.

---

## Configuración

### ¿Dónde obtengo las credenciales de Wompi?

1. Regístrate en: https://comercios.wompi.co/
2. Verifica tu identidad (toma 1-2 días hábiles)
3. Ve a: Panel → Configuración → API Keys
4. Copia tus claves de prueba (`pub_test_` y `prv_test_`)

### ¿Cuál es la diferencia entre Public Key y Private Key?

- **Public Key** (`pub_test_...`): Va en el frontend, genera enlaces de pago. Segura de exponer.
- **Private Key** (`prv_test_...`): Solo para backend/N8N, valida webhooks. NUNCA expongas en frontend.

### ¿Cómo configuro las variables de entorno?

```bash
# 1. Copia el archivo de ejemplo
cp .env.example .env

# 2. Edita .env con tus credenciales
# 3. Reinicia el servidor
npm run dev
```

### ¿Qué pasa si no tengo N8N configurado aún?

El sistema de pagos funcionará igual:

- ✅ Los pagos se procesarán
- ✅ La página de confirmación funcionará
- ❌ No se guardarán en Google Sheets
- ❌ No se enviarán emails automáticos
- ❌ No llegarán notificaciones a Telegram

Puedes configurar N8N después.

---

## Desarrollo

### ¿Cómo pruebo sin hacer pagos reales?

Usa las credenciales de prueba (`pub_test_...`) y estas tarjetas:

**Pago Aprobado:**

```
Número: 4242 4242 4242 4242
CVV: 123
Fecha: 12/25
```

**Pago Rechazado:**

```
Número: 4111 1111 1111 1111
CVV: 123
Fecha: 12/25
```

### ¿Cómo veo los pagos de prueba?

En el panel de Wompi: https://comercios.wompi.co/transactions

Ahí verás todas las transacciones de prueba y producción.

### ¿Puedo personalizar el componente de pago?

Sí, totalmente. El componente `WompiPaymentButton.tsx` es tuyo para modificar:

- Cambiar estilos (Tailwind CSS)
- Agregar campos adicionales
- Modificar validaciones
- Cambiar el flujo del formulario

### ¿Cómo integro el botón de pago en mi página?

```astro
---
import WompiPaymentButton from '../components/WompiPaymentButton';
---

<WompiPaymentButton
  client:load
  paymentType="PRODUCTO_CATALOGO"
  productName="Mi Producto"
  productDescription="Descripción"
  price={100000}
  sku="PROD-001"
/>
```

### ¿Por qué necesito `client:load`?

Es una directiva de Astro que indica que el componente React debe cargarse e hidratarse en el cliente. Sin esto, el componente sería solo HTML estático sin interactividad.

---

## N8N

### ¿Qué es N8N?

N8N es una herramienta de automatización (como Zapier o Make) que puedes auto-hospedar gratis. Conecta Wompi con Google Sheets, Email y Telegram.

### ¿Tengo que usar Docker?

No es obligatorio, pero es lo más fácil. Alternativas:

- **Docker** (recomendado): `docker run n8nio/n8n`
- **npm**: `npx n8n`
- **Cloud**: Railway, Render, DigitalOcean

### ¿Cómo expongo N8N para recibir webhooks en desarrollo?

Usa **ngrok** (gratis):

```bash
# Terminal 1: Corre N8N
docker run -it --rm -p 5678:5678 n8nio/n8n

# Terminal 2: Expón con ngrok
ngrok http 5678

# Copia la URL HTTPS (ej: https://abc123.ngrok.io)
# Úsala en .env como PUBLIC_N8N_WEBHOOK_URL
```

### ¿El workflow de N8N viene incluido?

Sí, en `SETUP_N8N.md` hay un JSON listo para importar. Solo:

1. Abre N8N
2. Clic en "Import from File"
3. Pega el JSON
4. Configura credenciales

### ¿Qué pasa si N8N se cae?

Los pagos seguirán procesándose normalmente. Solo perderás:

- Registro en Google Sheets (puedes recuperar desde panel de Wompi)
- Emails automáticos (puedes enviar manualmente)
- Notificaciones de Telegram

Wompi reintentará enviar el webhook varias veces.

---

## Producción

### ¿Cómo paso a producción?

1. **Obtén credenciales de producción** en Wompi
2. **Actualiza `.env`**:
   ```env
   PUBLIC_WOMPI_PUBLIC_KEY=pub_prod_...
   PUBLIC_WOMPI_ENVIRONMENT=production
   PUBLIC_SITE_URL=https://tudominio.com
   ```
3. **Despliega N8N** en un servidor con HTTPS
4. **Actualiza webhook** en Wompi con la URL de producción
5. **Haz una transacción de prueba** (monto pequeño)

### ¿Dónde despliego N8N en producción?

Opciones (de más fácil a más complejo):

**Fácil (con costo):**

- Railway.app ($5-10/mes)
- Render.com ($7/mes)
- DigitalOcean App Platform ($5/mes)

**Intermedio:**

- DigitalOcean Droplet + Docker ($6/mes)
- AWS Lightsail ($3.50/mes)

**Avanzado:**

- VPS propio con Nginx + SSL

### ¿Necesito SSL/HTTPS?

**Sí, obligatorio en producción.** Wompi solo envía webhooks a URLs HTTPS.

Para tu sitio:

- Vercel/Netlify te dan HTTPS gratis

Para N8N:

- Railway/Render te dan HTTPS gratis
- En VPS usa Certbot (Let's Encrypt) gratis

### ¿Cómo protejo el webhook de N8N?

1. **Validar firma de Wompi** (ver `SETUP_N8N.md`)
2. **Usar URL no obvia**: `/webhook/wompi-payment-secret-abc123`
3. **Rate limiting** en Nginx
4. **Firewall**: Solo permitir IPs de Wompi

### ¿Puedo usar otro servicio de email?

Sí, N8N soporta:

- Gmail (SMTP gratis, límite 500/día)
- SendGrid (API, 100 emails/día gratis)
- Mailgun (API)
- Amazon SES (muy barato)
- Resend (desarrolladores)

### ¿Qué pasa si uso más de 100 emails/día?

Opciones:

- **SendGrid**: $14.95/mes para 50k emails
- **Amazon SES**: $0.10 por 1000 emails
- **Mailgun**: $35/mes para 50k emails

---

## Problemas Comunes

### El botón de pago no aparece

**Solución:**

1. Verifica que `client:load` esté presente
2. Revisa la consola del navegador (F12)
3. Verifica que React esté instalado: `npm list react`

### Error: "PUBLIC_WOMPI_PUBLIC_KEY is not defined"

**Solución:**

1. Verifica que `.env` existe
2. Verifica que la variable esté sin comillas
3. Reinicia el servidor: `Ctrl+C` → `npm run dev`

### El formulario no valida el email

**Solución:**
El componente usa regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

Si necesitas validación diferente, modifica en `WompiPaymentButton.tsx`:

```typescript
const emailRegex = /tu-regex-aqui/;
```

### Redirect a Wompi no funciona

**Solución:**

1. Abre la consola (F12)
2. Busca: "🔗 Payment Link Generated"
3. Verifica que la URL sea válida
4. Prueba la URL manualmente en el navegador

### Página de confirmación muestra error

**Causas comunes:**

- No hay parámetro `?id=` en la URL
- La transacción no existe en Wompi
- Problema de CORS (solo en desarrollo)

**Solución:**

```javascript
// En PaymentConfirmation.tsx, verifica:
console.log("Transaction ID:", transactionId);
```

### Webhook de N8N no se ejecuta

**Checklist:**

- [ ] N8N está corriendo
- [ ] Workflow está activado (toggle verde)
- [ ] URL del webhook es accesible (prueba con Postman)
- [ ] Webhook está registrado en panel de Wompi
- [ ] En desarrollo, ngrok está corriendo

**Debugging:**

```bash
# Prueba el webhook manualmente
curl -X POST http://localhost:5678/webhook/wompi-payment \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### Email no llega al cliente

**Checklist:**

- [ ] Nodo de email está conectado en el workflow
- [ ] Credenciales de email están configuradas
- [ ] Workflow se ejecutó (ver "Executions" en N8N)
- [ ] Email del cliente es válido
- [ ] Revisar carpeta de spam

**Ver logs:**
En N8N → Executions → Última ejecución → Ver output del nodo de email

### Notificación de Telegram no llega

**Checklist:**

- [ ] Bot está en el grupo/canal
- [ ] Bot tiene permisos para enviar mensajes
- [ ] Chat ID es correcto (puede ser negativo)
- [ ] Token del bot es correcto

**Probar bot manualmente:**

```bash
curl -X POST https://api.telegram.org/bot<TOKEN>/sendMessage \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "<CHAT_ID>", "text": "Test"}'
```

### Google Sheets no se actualiza

**Checklist:**

- [ ] Sheet ID es correcto
- [ ] N8N tiene acceso a Google Sheets (OAuth)
- [ ] Nombre de la hoja es correcto ("Sheet1")
- [ ] Columnas están mapeadas correctamente

**Permisos:**
En N8N → Credentials → Google Sheets → Reautenticar

### Transacción queda en PENDING

**Causas:**

- Banco está procesando (puede tomar minutos)
- PSE requiere confirmación del cliente
- Nequi requiere aprobar en la app

**Qué hacer:**
Esperar. Wompi enviará un webhook cuando cambie a APPROVED o DECLINED.

### Pago aprobado pero webhook dice PENDING

Los webhooks de Wompi se envían en cada cambio de estado:

1. Webhook con `PENDING`
2. Webhook con `APPROVED` (pocos segundos después)

Tu workflow debe procesar solo los `APPROVED` (ya lo hace con el IF node).

---

## 🆘 ¿Aún tienes problemas?

### Recursos de Ayuda

1. **Documentación:**

   - README_PAGOS_WOMPI.md (guía completa)
   - SETUP_N8N.md (configuración de automatizaciones)
   - ARQUITECTURA.md (diagramas y flujos)

2. **Logs y Debugging:**

   ```bash
   # Frontend (en navegador)
   F12 → Console → Busca mensajes con 🔧 🔗

   # N8N
   http://localhost:5678 → Executions

   # Wompi
   https://comercios.wompi.co/transactions
   ```

3. **Soporte Oficial:**

   - Wompi: soporte@wompi.co
   - N8N: https://community.n8n.io/
   - Astro: https://astro.build/chat

4. **Verificar Estado de Servicios:**
   - Wompi: https://status.wompi.co/
   - Vercel: https://www.vercel-status.com/

---

## 💡 Tips y Mejores Prácticas

### Desarrollo

- Siempre usa credenciales de prueba
- Mantén logs de todas las transacciones
- Prueba todos los flujos antes de producción

### Seguridad

- Nunca expongas la Private Key en el frontend
- Valida la firma del webhook en producción
- Usa HTTPS en todas las URLs
- Implementa rate limiting

### N8N

- Mantén backups del workflow
- Documenta cambios en el workflow
- Prueba cada nodo individualmente
- Usa variables de entorno en N8N

### Producción

- Empieza con transacciones pequeñas
- Monitorea los logs las primeras semanas
- Ten un plan de respaldo si N8N falla
- Configura alertas para errores críticos

---

**¿Encontraste un problema no listado aquí?**
Documéntalo para ayudar a otros:

1. Describe el problema
2. Anota el error exacto
3. Documenta la solución
4. Agrégalo a este FAQ

---

**Última actualización:** Octubre 2025
