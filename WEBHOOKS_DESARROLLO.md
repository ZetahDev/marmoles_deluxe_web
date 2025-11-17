# 🔧 Configurar Webhooks en Desarrollo Local

## ❌ El Problema

Wompi **NO puede enviar webhooks a `localhost`** porque:

- Tu computadora no es accesible desde internet
- Wompi está en sus servidores y necesita una URL pública
- `http://localhost:4321` solo funciona en tu máquina

## ✅ La Solución: Túneles

Los túneles crean una URL pública temporal que redirige a tu `localhost`.

---

## Opción 1: ngrok (Recomendado) 🚀

### Instalación

**Windows (PowerShell):**

```powershell
# Opción A: Con Chocolatey
choco install ngrok

# Opción B: Descarga directa
# 1. Ve a https://ngrok.com/download
# 2. Descarga ngrok.exe
# 3. Muévelo a una carpeta en tu PATH o úsalo directamente
```

**Verificar instalación:**

```powershell
ngrok version
```

### Uso Básico

1. **Inicia tu servidor Astro:**

   ```powershell
   npm run dev
   ```

   Tu sitio corre en `http://localhost:4321`

2. **En otra terminal, inicia ngrok:**

   ```powershell
   ngrok http 4321
   ```

3. **Verás algo como esto:**

   ```
   ngrok

   Session Status                online
   Account                       tu_cuenta@email.com (Plan: Free)
   Version                       3.x.x
   Region                        United States (us)
   Latency                       45ms
   Web Interface                 http://127.0.0.1:4040
   Forwarding                    https://abc123def456.ngrok.io -> http://localhost:4321

   Connections                   ttl     opn     rt1     rt5     p50     p90
                                 0       0       0.00    0.00    0.00    0.00
   ```

4. **Copia la URL HTTPS:**
   ```
   https://abc123def456.ngrok.io
   ```
   ⚠️ Esta URL cambia cada vez que reinicias ngrok (en plan Free)

### Configurar en Wompi

1. Ve a: https://comercios.wompi.co/
2. **Desarrollo** → **Eventos**
3. Click en **"Agregar URL de Eventos"**
4. Pega:
   ```
   https://abc123def456.ngrok.io/api/wompi-webhook
   ```
5. Selecciona evento: **transaction.updated**
6. Guardar

### Monitorear Webhooks

ngrok tiene un panel web local para ver todos los requests:

```
http://127.0.0.1:4040
```

Abre esto en tu navegador mientras ngrok está corriendo para ver:

- ✅ Todos los webhooks que llegan
- 📊 Headers, body, respuestas
- 🔄 Opción de "replay" para probar

### Mantener URL Fija (Opcional - Plan Paid)

Si quieres que la URL no cambie:

1. Crear cuenta en https://dashboard.ngrok.com/
2. Configurar dominio personalizado
3. Usar:
   ```powershell
   ngrok http --domain=tu-dominio.ngrok.io 4321
   ```

---

## Opción 2: Cloudflare Tunnel 🌐

### Instalación

**Windows:**

```powershell
# Opción A: Con winget
winget install --id Cloudflare.cloudflared

# Opción B: Descarga directa
# Ve a https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
```

**Verificar:**

```powershell
cloudflared --version
```

### Uso

1. **Inicia tu servidor:**

   ```powershell
   npm run dev
   ```

2. **Inicia cloudflared:**

   ```powershell
   cloudflared tunnel --url http://localhost:4321
   ```

3. **Verás:**

   ```
   2025-11-15T10:30:00Z INF +--------------------------------------------------------------------------------------------+
   2025-11-15T10:30:00Z INF |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable): |
   2025-11-15T10:30:00Z INF |  https://abc-def-ghi.trycloudflare.com                                                     |
   2025-11-15T10:30:00Z INF +--------------------------------------------------------------------------------------------+
   ```

4. **Usa en Wompi:**
   ```
   https://abc-def-ghi.trycloudflare.com/api/wompi-webhook
   ```

### Ventajas de Cloudflare

- ✅ No requiere cuenta
- ✅ Gratis ilimitado
- ✅ Más rápido que ngrok Free
- ❌ URL cambia en cada reinicio (sin cuenta)

---

## Opción 3: localtunnel 🌍

### Instalación

```powershell
npm install -g localtunnel
```

### Uso

```powershell
# Inicia tu servidor
npm run dev

# En otra terminal
lt --port 4321
```

Obtendrás:

```
your url is: https://random-name-123.loca.lt
```

---

## 🧪 Probar la Configuración

### 1. Verificar que el túnel funciona

Abre la URL del túnel en tu navegador:

```
https://abc123.ngrok.io
```

Deberías ver tu sitio web de Mármoles Deluxe.

### 2. Probar el endpoint de webhook

```powershell
# Desde PowerShell
Invoke-WebRequest -Uri "https://abc123.ngrok.io/api/wompi-webhook" -Method POST -ContentType "application/json" -Body '{"test": true}'
```

Deberías ver en tu consola de Astro:

```
📥 Webhook recibido de Wompi: ...
```

### 3. Hacer un pago de prueba

1. Ve a: `https://abc123.ngrok.io/ejemplos-pago`
2. Haz click en un botón de pago
3. Completa el pago con tarjeta de prueba:
   - Número: `4242 4242 4242 4242`
   - CVV: `123`
   - Fecha: Cualquier futura
4. Verifica los logs en tu consola

### 4. Verificar en panel de ngrok

Si usas ngrok, ve a `http://127.0.0.1:4040` y verás:

- El webhook que envió Wompi
- Headers, body completo
- Tu respuesta

---

## 📋 Checklist de Configuración

- [ ] Servidor Astro corriendo (`npm run dev`)
- [ ] Túnel iniciado (ngrok/cloudflare)
- [ ] URL del túnel copiada
- [ ] Webhook configurado en Wompi con URL del túnel
- [ ] Evento `transaction.updated` seleccionado
- [ ] Pago de prueba completado
- [ ] Webhook recibido en logs

---

## 🐛 Troubleshooting

### "El webhook no llega"

1. **Verifica que el túnel esté corriendo:**

   ```powershell
   # Debe estar activo en una terminal
   ngrok http 4321
   ```

2. **Verifica la URL en Wompi:**

   - Debe ser la URL del túnel (https://...)
   - Debe terminar en `/api/wompi-webhook`
   - Debe tener HTTPS, no HTTP

3. **Verifica los logs de Wompi:**

   - Ve a comercios.wompi.co
   - Desarrollo → Eventos
   - Click en tu webhook
   - Revisa "Historial de entregas"

4. **Verifica que Astro esté corriendo:**
   ```powershell
   # Debes ver esto:
   astro  v5.x.x ready in XXX ms
   ```

### "Invalid webhook signature"

Esto es normal si:

- Estás usando llaves de `test` pero `prod_integrity_secret`
- O viceversa

**Solución:** Asegúrate de que en tu `.env`:

```env
# Si usas pub_test_... usa también:
WOMPI_INTEGRITY_SECRET=test_integrity_...

# Si usas pub_prod_... usa también:
WOMPI_INTEGRITY_SECRET=prod_integrity_...
```

Verifica con:

```powershell
npm run check-wompi
```

### "ngrok command not found"

**Windows:**

1. Descarga de https://ngrok.com/download
2. Extrae `ngrok.exe`
3. Muévelo a una carpeta en tu PATH, o
4. Úsalo con ruta completa: `C:\ruta\a\ngrok.exe http 4321`

---

## 💡 Tips

### Workflow Recomendado

```powershell
# Terminal 1: Servidor Astro
npm run dev

# Terminal 2: Túnel
ngrok http 4321

# Configurar webhook en Wompi con URL de ngrok
# Hacer pruebas de pago
# Verificar logs en ambas terminales + panel ngrok (http://127.0.0.1:4040)
```

### Para N8N Local

Si también tienes N8N local en `localhost:5678`:

```powershell
# Terminal 1: Astro
npm run dev

# Terminal 2: N8N
n8n

# Terminal 3: Túnel para Astro
ngrok http 4321

# Terminal 4: Túnel para N8N (si lo necesitas accesible públicamente)
ngrok http 5678
```

Pero normalmente no necesitas exponer N8N porque el webhook llega primero a tu endpoint `/api/wompi-webhook` que luego lo reenvía a N8N por localhost.

---

## 🚀 Pasar a Producción

Cuando estés listo para producción:

1. **Desplegar a Vercel/Netlify/otro host**
2. **Obtener dominio público:**

   ```
   https://marmolesdeluxe.com
   ```

3. **Actualizar webhook en Wompi:**

   ```
   https://marmolesdeluxe.com/api/wompi-webhook
   ```

4. **Actualizar .env de producción:**

   ```env
   PUBLIC_WOMPI_ENVIRONMENT=production
   PUBLIC_SITE_URL=https://marmolesdeluxe.com
   ```

5. **Ya NO necesitarás túneles** porque tendrás una URL pública permanente

---

## 📚 Recursos

- [ngrok Docs](https://ngrok.com/docs)
- [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Wompi Webhooks](https://docs.wompi.co/docs/colombia/eventos/)
