# 🚀 GUÍA DE INICIO RÁPIDO - Pagos con Wompi

## ✅ Lo que se ha implementado

### 📦 Archivos Creados

1. **Tipos y Configuración:**

   - `src/types/wompi.ts` - Tipos TypeScript para Wompi
   - `src/lib/wompiConfig.ts` - Configuración centralizada
   - `src/env.d.ts` - Variables de entorno (actualizado)

2. **Componentes:**

   - `src/components/WompiPaymentButton.tsx` - Botón de pago reutilizable
   - `src/components/PaymentConfirmation.tsx` - Página de confirmación

3. **Páginas:**

   - `src/pages/confirmacion-pago.astro` - Confirmación post-pago
   - `src/pages/ejemplos-pago.astro` - Demostración de uso

4. **Documentación:**
   - `README_PAGOS_WOMPI.md` - Guía completa de implementación
   - `SETUP_N8N.md` - Configuración de automatizaciones
   - `.env.example` - Plantilla de variables de entorno
   - `.env` - Variables de entorno (configurar)

---

## 🎯 Próximos Pasos (EN ORDEN)

### 1️⃣ Obtener Credenciales de Wompi (15 min)

```bash
# 1. Ve a: https://comercios.wompi.co/
# 2. Regístrate como comercio
# 3. Ve a: Panel → API Keys
# 4. Copia tu Public Key (pub_test_...)
# 5. Copia tu Private Key (prv_test_...)
```

### 2️⃣ Configurar Variables de Entorno (5 min)

Edita el archivo `.env` que ya está creado:

```env
PUBLIC_WOMPI_PUBLIC_KEY=pub_test_TU_CLAVE_AQUI
WOMPI_PRIVATE_KEY=prv_test_TU_CLAVE_AQUI
PUBLIC_WOMPI_ENVIRONMENT=test
PUBLIC_SITE_URL=http://localhost:4321
```

### 3️⃣ Probar el Sistema (10 min)

```bash
# Instalar dependencias (si no lo has hecho)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre tu navegador en:

- http://localhost:4321/ejemplos-pago

Prueba con la tarjeta de Wompi:

```
Número: 4242 4242 4242 4242
CVV: 123
Fecha: 12/25
```

### 4️⃣ Configurar N8N (30 min)

```bash
# Levantar N8N con Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Luego sigue la guía en: **[SETUP_N8N.md](./SETUP_N8N.md)**

### 5️⃣ Configurar Webhook (15 min)

**Para desarrollo local (con ngrok):**

```bash
# Instalar ngrok
# https://ngrok.com/download

# Exponer N8N
ngrok http 5678

# Copia la URL HTTPS (ejemplo: https://abc123.ngrok.io)
# Actualiza .env:
PUBLIC_N8N_WEBHOOK_URL=https://abc123.ngrok.io/webhook/wompi-payment
```

**Registrar en Wompi:**

1. Ve a: https://comercios.wompi.co/webhooks
2. Agrega: `https://abc123.ngrok.io/webhook/wompi-payment`
3. Selecciona evento: `transaction.updated`

### 6️⃣ Configurar Google Sheets (10 min)

1. Crea una nueva hoja de cálculo
2. Agrega estas columnas en la fila 1:
   ```
   Timestamp | ID Transacción | Referencia | Estado | Tipo de Pago | Cliente | Email | Teléfono | Producto | Cantidad | Monto | Método de Pago | Metadata
   ```
3. Copia el ID de la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ID]/edit
   ```
4. Actualiza `.env`:
   ```env
   GOOGLE_SHEET_ID=tu_sheet_id_aqui
   ```

### 7️⃣ Configurar Telegram (10 min)

1. Habla con [@BotFather](https://t.me/botfather)
2. Ejecuta: `/newbot`
3. Sigue las instrucciones
4. Guarda el token que te da
5. Crea un grupo y agrega el bot
6. Usa [@userinfobot](https://t.me/userinfobot) para obtener el Chat ID
7. Actualiza `.env`:
   ```env
   TELEGRAM_BOT_TOKEN=tu_token_aqui
   TELEGRAM_CHAT_ID=tu_chat_id_aqui
   ```

---

## 🧪 Prueba Completa del Flujo

1. ✅ Abre: http://localhost:4321/ejemplos-pago
2. ✅ Haz clic en cualquier botón "Pagar"
3. ✅ Completa el formulario con datos de prueba
4. ✅ Haz clic en "Continuar al Pago"
5. ✅ Usa la tarjeta de prueba: 4242 4242 4242 4242
6. ✅ Completa el pago en Wompi
7. ✅ Serás redirigido a la página de confirmación
8. ✅ Verifica que:
   - Aparezca "Pago Exitoso"
   - Se muestre la información correcta
   - Llegue email al cliente
   - Llegue notificación a Telegram
   - Se registre en Google Sheets

---

## 📋 Cómo Usar en Tu Sitio

### Ejemplo Simple

```astro
---
import WompiPaymentButton from '../components/WompiPaymentButton';
---

<WompiPaymentButton
  client:load
  paymentType="ANTICIPO"
  productName="Mármol Blanco Polar"
  productDescription="Anticipo del 50%"
  price={500000}
  sku="MAR-BP-001"
/>
```

### Ejemplo en Página de Producto

```astro
---
import Layout from '../layouts/Layout.astro';
import WompiPaymentButton from '../components/WompiPaymentButton';

const producto = {
  nombre: 'Granito Negro Absoluto',
  descripcion: 'Granito premium de alta calidad',
  precio: 280000
};
---

<Layout title={producto.nombre}>
  <div class="container">
    <h1>{producto.nombre}</h1>
    <p>{producto.descripcion}</p>
    <p class="precio">${producto.precio.toLocaleString()} COP/m²</p>

    <WompiPaymentButton
      client:load
      paymentType="PRODUCTO_CATALOGO"
      productName={producto.nombre}
      productDescription={producto.descripcion}
      price={producto.precio}
      sku="GRA-NEG-ABS"
      buttonText="Comprar Ahora"
    />
  </div>
</Layout>
```

---

## 🔧 Troubleshooting Rápido

### Problema: "No se genera el enlace"

**Solución:**

```bash
# Verifica que las variables estén configuradas
npm run dev
# Revisa la consola, debe aparecer:
# ✅ Configuración de Wompi válida
```

### Problema: "Webhook no funciona"

**Solución:**

```bash
# Verifica que N8N esté corriendo
docker ps | grep n8n

# Verifica que ngrok esté corriendo
# Y que la URL de ngrok esté en .env y en Wompi
```

### Problema: "Email no llega"

**Solución:**

- Revisa los logs de N8N (http://localhost:5678)
- Ve a "Executions" y mira el último workflow
- Verifica que el nodo de email esté configurado

---

## 📚 Documentación Completa

- **Guía de Implementación:** [README_PAGOS_WOMPI.md](./README_PAGOS_WOMPI.md)
- **Setup de N8N:** [SETUP_N8N.md](./SETUP_N8N.md)
- **Docs de Wompi:** https://docs.wompi.co/

---

## 🎉 ¡Listo para Producción!

Cuando estés listo para producción:

1. Obtén credenciales de producción de Wompi
2. Cambia `PUBLIC_WOMPI_ENVIRONMENT=production`
3. Despliega N8N en un servidor con HTTPS
4. Actualiza todas las URLs a producción
5. Haz una transacción de prueba pequeña
6. ¡Empieza a recibir pagos! 💰

---

**¿Dudas?** Revisa los archivos README o la documentación de Wompi.

**¡Éxito con tu implementación!** 🚀
