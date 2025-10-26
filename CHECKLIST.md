# ✅ Checklist de Implementación - Sistema de Pagos Wompi

Usa este checklist para asegurarte de que todo está configurado correctamente.

## 📋 Fase 1: Configuración Inicial (30 minutos)

### 1.1 Cuenta de Wompi

- [ ] Creada cuenta en https://comercios.wompi.co/
- [ ] Verificación de identidad completada
- [ ] Acceso al panel de comercios
- [ ] Credenciales de prueba obtenidas:
  - [ ] Public Key (`pub_test_...`)
  - [ ] Private Key (`prv_test_...`)

### 1.2 Variables de Entorno

- [ ] Archivo `.env` creado (copiado de `.env.example`)
- [ ] `PUBLIC_WOMPI_PUBLIC_KEY` configurada
- [ ] `WOMPI_PRIVATE_KEY` configurada
- [ ] `PUBLIC_WOMPI_ENVIRONMENT=test` configurada
- [ ] `PUBLIC_SITE_URL=http://localhost:4321` configurada
- [ ] Servidor reiniciado después de configurar

### 1.3 Dependencias

- [ ] `npm install` ejecutado
- [ ] No hay errores de dependencias
- [ ] Servidor de desarrollo inicia correctamente: `npm run dev`
- [ ] No hay errores en la consola

---

## 📋 Fase 2: Pruebas Básicas (20 minutos)

### 2.1 Componente de Pago

- [ ] Página `/ejemplos-pago` carga sin errores
- [ ] Botones "Pagar con Wompi" se muestran
- [ ] Al hacer clic, aparece el formulario
- [ ] Formulario valida campos vacíos
- [ ] Formulario valida email inválido
- [ ] Formulario valida teléfono (10 dígitos)

### 2.2 Flujo de Pago Completo

- [ ] Datos del cliente se completan correctamente
- [ ] "Continuar al Pago" redirige a Wompi
- [ ] URL de Wompi incluye todos los parámetros:
  - [ ] `public-key`
  - [ ] `amount-in-cents`
  - [ ] `reference`
  - [ ] `customer-data:email`
  - [ ] `customer-data:full-name`
  - [ ] `customer-data:phone-number`
  - [ ] `redirect-url`

### 2.3 Pago de Prueba

- [ ] Tarjeta de prueba 4242 4242 4242 4242 funciona
- [ ] Pago se procesa exitosamente en Wompi
- [ ] Redirect a `/confirmacion-pago?id=...` funciona
- [ ] Página de confirmación muestra:
  - [ ] ✅ "Pago Exitoso"
  - [ ] ID de transacción
  - [ ] Referencia
  - [ ] Monto correcto
  - [ ] Datos del cliente
  - [ ] Próximos pasos
  - [ ] Información de contacto

### 2.4 Panel de Wompi

- [ ] Transacción aparece en https://comercios.wompi.co/transactions
- [ ] Estado es "APPROVED"
- [ ] Monto es correcto
- [ ] Referencia es correcta

---

## 📋 Fase 3: Configuración de N8N (45 minutos)

### 3.1 Instalación de N8N

- [ ] Docker instalado (si usas Docker)
- [ ] N8N corriendo: `docker run -p 5678:5678 n8nio/n8n`
- [ ] N8N accesible en http://localhost:5678
- [ ] Cuenta de N8N creada

### 3.2 Workflow Importado

- [ ] Workflow JSON copiado de `SETUP_N8N.md`
- [ ] Workflow importado en N8N
- [ ] Workflow renombrado: "Wompi Payment Processing"
- [ ] Workflow guardado

### 3.3 Configuración de Nodos

#### Webhook Node

- [ ] Path configurado: `wompi-payment`
- [ ] Method: POST
- [ ] Response Mode: Last Node
- [ ] URL completa copiada: `http://localhost:5678/webhook/wompi-payment`

#### Function Node

- [ ] Código de procesamiento pegado
- [ ] No hay errores de sintaxis

#### IF Node

- [ ] Condición configurada: `{{ $json.status }} equals APPROVED`

#### Google Sheets Node

- [ ] Cuenta de Google conectada
- [ ] Hoja de cálculo seleccionada
- [ ] Sheet: "Sheet1" seleccionado
- [ ] Columnas mapeadas correctamente

#### Email Node (Gmail)

- [ ] Cuenta de Gmail conectada
- [ ] Template de email configurado
- [ ] Variables mapeadas: `{{ $json.customerEmail }}`, etc.

#### Telegram Node

- [ ] Bot token configurado
- [ ] Chat ID configurado
- [ ] Template de mensaje configurado

### 3.4 Activación

- [ ] Workflow activado (toggle verde)
- [ ] No hay errores en ningún nodo
- [ ] Workflow aparece en lista de "Active Workflows"

---

## 📋 Fase 4: Configuración de Servicios Externos (30 minutos)

### 4.1 Google Sheets

- [ ] Hoja de cálculo creada
- [ ] Nombre: "Transacciones Mármoles Deluxe"
- [ ] Columnas configuradas:
  ```
  Timestamp | ID Transacción | Referencia | Estado | Tipo de Pago |
  Cliente | Email | Teléfono | Producto | Cantidad | Monto |
  Método de Pago | Metadata
  ```
- [ ] ID de la hoja copiado de la URL
- [ ] ID agregado a `.env`: `GOOGLE_SHEET_ID=...`

### 4.2 Bot de Telegram

- [ ] Conversación con @BotFather iniciada
- [ ] Comando `/newbot` ejecutado
- [ ] Nombre del bot configurado
- [ ] Username del bot configurado
- [ ] Token del bot guardado
- [ ] Grupo/Canal creado para notificaciones
- [ ] Bot agregado al grupo
- [ ] Chat ID obtenido (usando @userinfobot)
- [ ] Token agregado a `.env`: `TELEGRAM_BOT_TOKEN=...`
- [ ] Chat ID agregado a `.env`: `TELEGRAM_CHAT_ID=...`

### 4.3 Servicio de Email

Marca la opción que uses:

**Gmail:**

- [ ] Cuenta de Gmail configurada en N8N
- [ ] OAuth completado
- [ ] Email de prueba enviado exitosamente

**SendGrid:**

- [ ] Cuenta creada
- [ ] API Key generada
- [ ] API Key configurada en N8N
- [ ] Sender verificado

**Otro:**

- [ ] Servicio: ******\_\_\_******
- [ ] Configurado en N8N
- [ ] Probado exitosamente

---

## 📋 Fase 5: Exposición del Webhook (20 minutos)

### 5.1 Ngrok (para desarrollo)

- [ ] Ngrok instalado: https://ngrok.com/download
- [ ] Ngrok ejecutándose: `ngrok http 5678`
- [ ] URL HTTPS copiada (ej: `https://abc123.ngrok.io`)
- [ ] `.env` actualizado: `PUBLIC_N8N_WEBHOOK_URL=https://abc123.ngrok.io/webhook/wompi-payment`
- [ ] Servidor Astro reiniciado

### 5.2 Registro en Wompi

- [ ] Panel de Wompi → Webhooks abierto
- [ ] URL del webhook agregada
- [ ] Evento seleccionado: `transaction.updated`
- [ ] Webhook guardado
- [ ] Estado: Activo

---

## 📋 Fase 6: Pruebas del Flujo Completo (30 minutos)

### 6.1 Preparación

- [ ] N8N corriendo
- [ ] Ngrok corriendo (si aplica)
- [ ] Servidor Astro corriendo (`npm run dev`)
- [ ] Consola de N8N abierta en pestaña (Executions)
- [ ] Panel de Wompi abierto en pestaña
- [ ] Google Sheets abierto en pestaña
- [ ] Telegram abierto

### 6.2 Prueba 1: Pago de Anticipo

- [ ] Navegar a `/ejemplos-pago`
- [ ] Clic en "Pagar Anticipo" (primer ejemplo)
- [ ] Completar formulario:
  - Nombre: Tu Nombre
  - Email: tu@email.com
  - Teléfono: 3001234567
- [ ] Clic en "Continuar al Pago"
- [ ] Redirect a Wompi exitoso
- [ ] Completar pago con tarjeta: 4242 4242 4242 4242
- [ ] Redirect de vuelta al sitio
- [ ] Página de confirmación muestra datos correctos
- [ ] **Verificaciones:**
  - [ ] Transacción en panel de Wompi
  - [ ] Ejecución del workflow en N8N (exitosa)
  - [ ] Nueva fila en Google Sheets
  - [ ] Email recibido en tu@email.com
  - [ ] Notificación en Telegram

### 6.3 Prueba 2: Servicio

- [ ] Repetir proceso con "Servicio de Instalación"
- [ ] Todas las verificaciones pasan ✅

### 6.4 Prueba 3: Producto del Catálogo

- [ ] Repetir proceso con "Granito Negro Absoluto"
- [ ] Todas las verificaciones pasan ✅

### 6.5 Prueba 4: Pago Rechazado

- [ ] Iniciar pago
- [ ] Usar tarjeta rechazada: 4111 1111 1111 1111
- [ ] Verificar que:
  - [ ] Página de confirmación muestra "Pago Rechazado"
  - [ ] No se guarda en Google Sheets (IF node filtra)
  - [ ] No se envía email de confirmación
  - [ ] No se envía notificación a Telegram

---

## 📋 Fase 7: Optimización y Seguridad (30 minutos)

### 7.1 Validación de Webhook

- [ ] Código de validación de firma agregado al Function Node
- [ ] Private Key configurada en variables de N8N
- [ ] Webhook de prueba validado correctamente
- [ ] Webhook con firma inválida rechazado

### 7.2 Manejo de Errores

- [ ] Error nodes agregados en N8N
- [ ] Notificaciones de error configuradas
- [ ] Logs de errores configurados

### 7.3 Variables de Entorno

- [ ] Todas las credenciales en `.env`
- [ ] `.env` en `.gitignore`
- [ ] `.env.example` actualizado con todas las variables
- [ ] No hay credenciales hardcodeadas en el código

### 7.4 Documentación

- [ ] README.md actualizado
- [ ] Comentarios en código agregados
- [ ] URLs de ejemplo actualizadas
- [ ] Datos de contacto actualizados

---

## 📋 Fase 8: Preparación para Producción (45 minutos)

### 8.1 Credenciales de Producción

- [ ] Credenciales de producción solicitadas en Wompi
- [ ] Credenciales de producción aprobadas
- [ ] Public Key de producción guardada
- [ ] Private Key de producción guardada

### 8.2 Despliegue de N8N

Marca la opción que uses:

**Railway.app:**

- [ ] Proyecto creado
- [ ] N8N desplegado
- [ ] Variables de entorno configuradas
- [ ] URL HTTPS obtenida

**Render.com:**

- [ ] Servicio creado
- [ ] N8N desplegado
- [ ] Variables de entorno configuradas
- [ ] URL HTTPS obtenida

**VPS Propio:**

- [ ] VPS configurado
- [ ] Docker instalado
- [ ] Nginx configurado
- [ ] SSL configurado (Certbot)
- [ ] N8N corriendo
- [ ] URL HTTPS obtenida

**Otro:**

- [ ] Servicio: ******\_\_\_******
- [ ] N8N desplegado
- [ ] URL HTTPS obtenida

### 8.3 Variables de Entorno de Producción

**En Vercel/Netlify (sitio web):**

- [ ] `PUBLIC_WOMPI_PUBLIC_KEY` (producción)
- [ ] `PUBLIC_WOMPI_ENVIRONMENT=production`
- [ ] `PUBLIC_SITE_URL` (tu dominio)
- [ ] `PUBLIC_N8N_WEBHOOK_URL` (URL de producción)

**En N8N (producción):**

- [ ] Todas las credenciales reconfiguradas para producción
- [ ] Google Sheets (puede ser la misma hoja)
- [ ] Telegram (mismo bot)
- [ ] Email (servicio de producción)

### 8.4 Webhook de Producción

- [ ] URL de webhook de producción configurada en Wompi
- [ ] Evento `transaction.updated` seleccionado
- [ ] Webhook activado
- [ ] Webhook de prueba funciona

### 8.5 Prueba en Producción

- [ ] Transacción real con monto pequeño ($5,000 COP)
- [ ] Pago procesado exitosamente
- [ ] Confirmación recibida
- [ ] Webhook ejecutado
- [ ] Todas las automatizaciones funcionan
- [ ] Monto refundado (si es prueba)

---

## 📋 Fase 9: Monitoreo y Mantenimiento

### 9.1 Monitoreo

- [ ] Dashboard de Google Sheets configurado
- [ ] Alertas de error en N8N configuradas
- [ ] Revisión diaria de transacciones programada
- [ ] Backup de workflows de N8N configurado

### 9.2 Documentación Interna

- [ ] Proceso de manejo de transacciones documentado
- [ ] Contactos de soporte documentados
- [ ] Procedimientos de emergencia documentados

### 9.3 Capacitación

- [ ] Equipo capacitado en:
  - [ ] Revisar transacciones en Wompi
  - [ ] Revisar Google Sheets
  - [ ] Responder a notificaciones de Telegram
  - [ ] Manejar problemas comunes

---

## 🎉 ¡Implementación Completa!

Si todas las casillas están marcadas ✅, tu sistema de pagos está listo para producción.

### Próximos Pasos Opcionales

- [ ] Implementar sistema de facturas
- [ ] Agregar más métodos de pago
- [ ] Crear reportes automáticos mensuales
- [ ] Implementar sistema de referidos
- [ ] Agregar programa de puntos/descuentos

---

## 📞 Soporte

Si tienes problemas en algún paso:

1. Revisa la documentación correspondiente
2. Consulta el [FAQ](./FAQ_PAGOS.md)
3. Contacta a soporte de Wompi: soporte@wompi.co

---

**Última revisión:** Octubre 2025  
**Versión del sistema:** 1.0.0
