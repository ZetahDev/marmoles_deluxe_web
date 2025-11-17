# 💳 Integración de Pagos con Wompi - Guía de Implementación

Esta guía te ayudará a implementar completamente el sistema de pagos con Wompi en tu sitio de Mármoles Deluxe.

> **📖 Nueva Guía Completa Disponible:** Para una configuración paso a paso completa incluyendo webhooks, secretos de integración y validación de firmas, consulta [WOMPI_SETUP.md](./WOMPI_SETUP.md)

## 📑 Índice

1. [Configuración Inicial](#1-configuración-inicial)
2. [Cómo Usar los Componentes](#2-cómo-usar-los-componentes)
3. [Flujo de Pago Completo](#3-flujo-de-pago-completo)
4. [Configuración de N8N](#4-configuración-de-n8n)
5. [Testing](#5-testing)
6. [Producción](#6-producción)

---

## 1. Configuración Inicial

### Paso 1: Obtener Credenciales de Wompi

1. **Crear cuenta en Wompi:**

   - Ve a: https://comercios.wompi.co/
   - Regístrate como comercio
   - Completa la verificación

2. **Obtener credenciales completas:**
   - Panel → **Desarrollo** → **Programadores**
   - Copia tu `Public Key` (empieza con `pub_test_` o `pub_prod_`)
   - Copia tu `Private Key` (empieza con `prv_test_` o `prv_prod_`)
   - **NUEVO:** Copia tu `Events Secret` (empieza con `test_events_` o `prod_events_`)
   - **NUEVO:** Copia tu `Integrity Secret` (empieza con `test_integrity_` o `prod_integrity_`)

### Paso 2: Configurar Variables de Entorno

1. **Copia el archivo de ejemplo:**

   ```bash
   cp .env.example .env
   ```

2. **Edita el archivo `.env`:**

   ```env
   # WOMPI
   # Llaves de autenticación
   PUBLIC_WOMPI_PUBLIC_KEY=pub_test_tu_clave_aqui
   WOMPI_PRIVATE_KEY=prv_test_tu_clave_aqui

   # Secretos de integración técnica (para validar webhooks)
   WOMPI_EVENTS_SECRET=test_events_tu_secret_aqui
   WOMPI_INTEGRITY_SECRET=test_integrity_tu_secret_aqui

   # Configuración
   PUBLIC_WOMPI_ENVIRONMENT=test
   PUBLIC_SITE_URL=http://localhost:4321

   # N8N (lo configuraremos después)
   PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/wompi-payment
   ```

### Paso 3: Instalar Dependencias

```bash
npm install
```

### Paso 4: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Visita: http://localhost:4321/ejemplos-pago

---

## 2. Cómo Usar los Componentes

### Componente: WompiPaymentButton

Este componente crea un botón de pago que:

1. Muestra un formulario para capturar datos del cliente
2. Genera un enlace de pago de Wompi
3. Redirige al cliente a la página de pago

#### Uso Básico

```astro
---
import WompiPaymentButton from '../components/WompiPaymentButton';
---

<WompiPaymentButton
  client:load
  paymentType="ANTICIPO"
  productName="Mármol Blanco Polar - Anticipo"
  productDescription="Anticipo del 50% para reservar mármol"
  price={500000}
  quantity={1}
  sku="MAR-BP-001"
  buttonText="Pagar Anticipo"
/>
```

#### Props del Componente

| Prop                 | Tipo                                              | Descripción                                  | Requerido |
| -------------------- | ------------------------------------------------- | -------------------------------------------- | --------- |
| `paymentType`        | `'ANTICIPO' \| 'SERVICIO' \| 'PRODUCTO_CATALOGO'` | Tipo de pago                                 | ✅        |
| `productName`        | `string`                                          | Nombre del producto/servicio                 | ✅        |
| `productDescription` | `string`                                          | Descripción detallada                        | ✅        |
| `price`              | `number`                                          | Precio en pesos colombianos                  | ✅        |
| `quantity`           | `number`                                          | Cantidad (default: 1)                        | ❌        |
| `sku`                | `string`                                          | Código SKU del producto                      | ❌        |
| `buttonText`         | `string`                                          | Texto del botón (default: "Pagar con Wompi") | ❌        |
| `className`          | `string`                                          | Clases CSS adicionales                       | ❌        |

#### Ejemplos de Uso

**Ejemplo 1: Pago de Anticipo**

```astro
<WompiPaymentButton
  client:load
  paymentType="ANTICIPO"
  productName="Anticipo Mármol Carrara"
  productDescription="Anticipo del 30% para reservar 10m² de mármol"
  price={900000}
  sku="MAR-CAR-ANT"
/>
```

**Ejemplo 2: Servicio de Instalación**

```astro
<WompiPaymentButton
  client:load
  paymentType="SERVICIO"
  productName="Instalación de Encimera"
  productDescription="Instalación profesional incluye corte y pulido"
  price={400000}
  sku="SRV-INST-ENC"
/>
```

**Ejemplo 3: Producto con Cantidad**

```astro
<WompiPaymentButton
  client:load
  paymentType="PRODUCTO_CATALOGO"
  productName="Granito Negro Absoluto"
  productDescription="Granito pulido de alta calidad"
  price={250000}
  quantity={5}
  sku="GRA-NEG-ABS"
/>
```

### Integración en Páginas Existentes

#### Opción 1: En una Página de Producto

```astro
---
// src/pages/productos/marmol-carrara.astro
import Layout from '../../layouts/Layout.astro';
import WompiPaymentButton from '../../components/WompiPaymentButton';

const product = {
  name: 'Mármol Carrara Premium',
  description: 'Mármol italiano de primera calidad con vetas grises',
  price: 450000,
  image: '/images/marmol-carrara.jpg'
};
---

<Layout title={product.name}>
  <div class="container mx-auto py-12">
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Imagen del Producto -->
      <div>
        <img src={product.image} alt={product.name} class="rounded-lg" />
      </div>

      <!-- Detalles y Pago -->
      <div>
        <h1 class="text-3xl font-bold mb-4">{product.name}</h1>
        <p class="text-gray-600 mb-6">{product.description}</p>

        <div class="mb-6">
          <span class="text-3xl font-bold text-[#8B4513]">
            ${product.price.toLocaleString('es-CO')} COP
          </span>
          <span class="text-gray-500 ml-2">por m²</span>
        </div>

        <!-- Botón de Pago -->
        <WompiPaymentButton
          client:load
          paymentType="PRODUCTO_CATALOGO"
          productName={product.name}
          productDescription={product.description}
          price={product.price}
          sku="MAR-CAR-PREM"
          buttonText="Comprar Ahora"
          className="w-full"
        />
      </div>
    </div>
  </div>
</Layout>
```

#### Opción 2: En un Modal o Popup

```astro
---
import WompiPaymentButton from '../components/WompiPaymentButton';
---

<button id="open-payment-modal" class="btn">
  Pagar Ahora
</button>

<dialog id="payment-modal" class="rounded-lg p-6">
  <h2 class="text-2xl font-bold mb-4">Completa tu Pago</h2>

  <WompiPaymentButton
    client:load
    paymentType="SERVICIO"
    productName="Servicio de Pulido"
    productDescription="Pulido profesional de mármol"
    price={350000}
    sku="SRV-PUL"
  />

  <button id="close-modal" class="mt-4">Cancelar</button>
</dialog>

<script>
  const modal = document.getElementById('payment-modal');
  document.getElementById('open-payment-modal')?.addEventListener('click', () => {
    modal?.showModal();
  });
  document.getElementById('close-modal')?.addEventListener('click', () => {
    modal?.close();
  });
</script>
```

#### Opción 3: En un Carrito de Compras

```astro
---
import WompiPaymentButton from '../components/WompiPaymentButton';

// Ejemplo de items en el carrito
const cartItems = [
  { name: 'Mármol Blanco', price: 300000, quantity: 3 },
  { name: 'Granito Negro', price: 250000, quantity: 2 }
];

const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
---

<div class="cart">
  {cartItems.map(item => (
    <div class="cart-item">
      <span>{item.name} x{item.quantity}</span>
      <span>${(item.price * item.quantity).toLocaleString('es-CO')}</span>
    </div>
  ))}

  <div class="total">
    <strong>Total: ${total.toLocaleString('es-CO')} COP</strong>
  </div>

  <WompiPaymentButton
    client:load
    paymentType="PRODUCTO_CATALOGO"
    productName="Carrito de Compras"
    productDescription={`Compra de ${cartItems.length} productos`}
    price={total}
    quantity={1}
    buttonText="Proceder al Pago"
  />
</div>
```

---

## 3. Flujo de Pago Completo

### Diagrama del Flujo

```
1. Cliente → Hace clic en "Pagar"
         ↓
2. Formulario → Completa datos (nombre, email, teléfono)
         ↓
3. Validación → Sistema valida datos
         ↓
4. Generación → Crea enlace de pago único
         ↓
5. Redirect → Cliente va a Wompi Checkout
         ↓
6. Pago → Cliente completa el pago
         ↓
7. Wompi → Procesa la transacción
         ↓
8. Redirect → Cliente regresa a /confirmacion-pago
         ↓
9. Webhook → Wompi notifica a N8N
         ↓
10. N8N → Ejecuta automatizaciones:
         - Guarda en Google Sheets
         - Envía email al cliente
         - Notifica por Telegram
```

### URLs Importantes

| URL                         | Propósito                           |
| --------------------------- | ----------------------------------- |
| `/ejemplos-pago`            | Página de demostración con ejemplos |
| `/confirmacion-pago?id=xxx` | Página de confirmación post-pago    |
| Webhook N8N                 | Recibe notificaciones de Wompi      |

---

## 4. Configuración de N8N

Consulta el archivo **[SETUP_N8N.md](./SETUP_N8N.md)** para:

- Instalación de N8N con Docker
- Configuración del workflow completo
- Integración con Google Sheets
- Configuración de notificaciones por Email y Telegram

---

## 5. Testing

### Tarjetas de Prueba de Wompi

**✅ Pago Aprobado:**

```
Número: 4242 4242 4242 4242
CVV: 123
Fecha: 12/25 (cualquier fecha futura)
```

**❌ Pago Rechazado:**

```
Número: 4111 1111 1111 1111
CVV: 123
Fecha: 12/25
```

### Checklist de Pruebas

- [ ] Formulario de pago se muestra correctamente
- [ ] Validación de email funciona
- [ ] Validación de teléfono funciona (10 dígitos)
- [ ] Redirect a Wompi funciona
- [ ] Pago con tarjeta aprobada funciona
- [ ] Redirect de vuelta a `/confirmacion-pago` funciona
- [ ] Página de confirmación muestra datos correctos
- [ ] Webhook de N8N se ejecuta
- [ ] Datos se guardan en Google Sheets
- [ ] Email de confirmación se envía al cliente
- [ ] Notificación de Telegram llega al equipo

### Debugging

**Ver logs en desarrollo:**

```javascript
// En el navegador (F12 → Console)
// Busca logs que empiezan con:
🔧 Wompi Config: ...
🔗 Payment Link Generated: ...
```

**Verificar configuración:**

```bash
# En tu terminal
npm run dev
# Revisa que no haya errores en la configuración de Wompi
```

---

## 6. Producción

### Checklist de Producción

#### Wompi

- [ ] Obtener credenciales de producción (`pub_prod_...`)
- [ ] Cambiar `PUBLIC_WOMPI_ENVIRONMENT=production`
- [ ] Configurar webhook en panel de Wompi
- [ ] Realizar transacción de prueba real (pequeña cantidad)

#### N8N

- [ ] Desplegar N8N en servidor con HTTPS
- [ ] Actualizar `PUBLIC_N8N_WEBHOOK_URL` con URL de producción
- [ ] Verificar que webhook está accesible públicamente
- [ ] Configurar credenciales de Google Sheets en N8N
- [ ] Configurar bot de Telegram en N8N
- [ ] Probar workflow completo

#### Sitio Web

- [ ] Actualizar `PUBLIC_SITE_URL` con dominio de producción
- [ ] Desplegar a Vercel/Netlify
- [ ] Verificar que todas las rutas funcionan
- [ ] Probar flujo completo end-to-end

#### Seguridad

- [ ] Implementar validación de firma de webhook (ver SETUP_N8N.md)
- [ ] Configurar HTTPS en todas las URLs
- [ ] No exponer Private Key en el frontend
- [ ] Implementar rate limiting en webhook

### Variables de Entorno en Producción

**Vercel:**

```bash
vercel env add PUBLIC_WOMPI_PUBLIC_KEY production
vercel env add PUBLIC_WOMPI_ENVIRONMENT production
vercel env add PUBLIC_SITE_URL production
vercel env add PUBLIC_N8N_WEBHOOK_URL production
```

**Netlify:**

```bash
# En el dashboard de Netlify:
Site Settings → Environment Variables → Add variable
```

---

## 📞 Soporte y Troubleshooting

### Problemas Comunes

**1. "No se genera el enlace de pago"**

- Verifica que `PUBLIC_WOMPI_PUBLIC_KEY` esté configurada
- Revisa la consola del navegador por errores
- Confirma que los datos del formulario sean válidos

**2. "Webhook no se ejecuta"**

- Verifica que N8N esté corriendo
- Confirma que el webhook esté registrado en Wompi
- En desarrollo, usa ngrok para exponer el webhook

**3. "Email no se envía"**

- Revisa las credenciales de email en N8N
- Verifica los logs de ejecución del workflow
- Confirma que el nodo de email esté conectado

**4. "Página de confirmación no muestra datos"**

- Verifica que la URL tenga el parámetro `?id=xxx`
- Revisa la consola del navegador
- Confirma que la transacción existe en Wompi

### Recursos Útiles

- **Documentación de Wompi:** https://docs.wompi.co/
- **Panel de Comercios:** https://comercios.wompi.co/
- **N8N Docs:** https://docs.n8n.io/
- **Soporte de Wompi:** soporte@wompi.co

---

## 🎉 ¡Todo Listo!

Has configurado exitosamente el sistema de pagos con Wompi. Ahora puedes:

1. ✅ Recibir pagos de anticipo
2. ✅ Cobrar por servicios específicos
3. ✅ Vender productos del catálogo
4. ✅ Automatizar confirmaciones por email
5. ✅ Recibir notificaciones en Telegram
6. ✅ Mantener registro en Google Sheets

**Próximos pasos sugeridos:**

- Personalizar emails de confirmación
- Agregar más productos a tu catálogo
- Crear reportes en Google Sheets
- Implementar sistema de facturas

---

**Desarrollado para Mármoles Deluxe** 🏛️
