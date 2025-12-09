# 📊 Análisis del Embudo de Ventas - Mármoles Deluxe

## Objetivo

Rastrear el comportamiento de usuarios desde Google Ads hasta la conversión (WhatsApp/Cotización) y identificar puntos de fuga en el embudo.

---

## 🎯 Embudo de Ventas Actual

```
┌─────────────────────────────────────────────────────────────┐
│ TOFU (Top of Funnel) - Adquisición                         │
├─────────────────────────────────────────────────────────────┤
│ 1. Usuario ve anuncio en Google Ads                        │
│    ├─ utm_source=google                                     │
│    ├─ utm_medium=cpc                                        │
│    └─ gclid=[google_click_id]                              │
│                                                             │
│ 2. Click en anuncio → Landing Page                         │
│    ├─ Productos: Blanco Polar, Quartzstone, etc.          │
│    ├─ Categorías: Mármoles, Quarstone, Granitos           │
│    └─ Tracking: page_view                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ MOFU (Middle of Funnel) - Consideración                    │
├─────────────────────────────────────────────────────────────┤
│ 3. Exploración de productos                                 │
│    ├─ Click en ProductCard → product_click                 │
│    ├─ Ver galería de imágenes → gallery_interaction        │
│    ├─ Scroll profundo → scroll_depth (25%, 50%, 75%)       │
│    └─ Tiempo en página → time_on_page (10s, 30s, 60s)     │
│                                                             │
│ 4. Interacción con contenido                                │
│    ├─ Ver precios y características                         │
│    ├─ Comparar entre productos                              │
│    └─ Leer testimonios                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ BOFU (Bottom of Funnel) - Decisión                         │
├─────────────────────────────────────────────────────────────┤
│ 5. Intento de contacto                                      │
│    ├─ Click en WhatsApp Button → whatsapp_click            │
│    ├─ Inicio formulario contacto → contact_form_start      │
│    ├─ Click en teléfono → phone_click                      │
│    └─ Uso calculadora de precios → price_calculator_start  │
│                                                             │
│ 6. Abandono o Conversión                                    │
│    ├─ Abandono formulario → form_abandonment               │
│    ├─ Exit intent → exit_intent                            │
│    ├─ Envío formulario → contact_form_submit               │
│    └─ Mensaje WhatsApp → whatsapp_message_sent ✅          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ CONVERSIÓN - Cierre de Venta                                │
├─────────────────────────────────────────────────────────────┤
│ 7. Cotización → Venta                                       │
│    ├─ Cotización solicitada → quote_requested              │
│    ├─ Pago iniciado → payment_initiated                    │
│    └─ Compra completada → purchase 💰                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Puntos Críticos de Fuga

### 1. **Landing Page → Exploración** (TOFU → MOFU)

**Problema potencial**: Usuario llega pero no interactúa con productos

**Métricas a revisar**:

- Bounce rate por fuente de tráfico
- Tiempo en página < 10 segundos
- Scroll depth < 25%

**Causas comunes**:

- Anuncio no alineado con landing page
- Carga lenta de página
- Hero section no atractivo
- Falta de prueba social visible

**Acciones**:

```javascript
// Trackear bounce rápido
if (timeOnPage < 5 && scrollDepth < 10) {
  trackEvent({
    event: "quick_bounce",
    properties: {
      utm_source,
      utm_campaign,
      device_type,
    },
  });
}
```

---

### 2. **Exploración → Intento de Contacto** (MOFU → BOFU)

**Problema potencial**: Usuario ve productos pero no intenta contactar

**Métricas a revisar**:

- Ratio product_view / whatsapp_click
- Ratio gallery_interaction / contact_form_start
- Tiempo en página > 60s sin conversión

**Causas comunes**:

- Precios no claros
- WhatsApp button no visible
- Falta de urgencia (FOMO)
- Formulario de contacto complicado

**Acciones**:

- A/B test posición del WhatsApp button
- Agregar "Cotización gratis en 24h"
- Mostrar stock limitado de Blanco Polar

---

### 3. **Intento de Contacto → Conversión** (BOFU → Conversión)

**Problema CRÍTICO**: Usuario hace click en WhatsApp pero no envía mensaje

**Métricas a revisar**:

- Ratio whatsapp_click / whatsapp_message_sent
- form_abandonment rate
- exit_intent después de click WhatsApp

**Causas comunes**:

- WhatsApp Web no carga
- Mensaje pre-rellenado muy largo
- Usuario cambia de opinión al abrir WhatsApp
- Falta de incentivo inmediato

**Acciones mejoradas**:

```tsx
// En WhatsAppButton.tsx - Mensaje más corto y con urgencia
const message = `Hola! Vi ${productName} en su sitio web y quiero una cotización hoy.`;

// Trackear si el usuario volvió después de abrir WhatsApp
window.addEventListener("focus", () => {
  if (whatsAppClickedAt && Date.now() - whatsAppClickedAt < 120000) {
    trackEvent({
      event: "whatsapp_return_without_conversion",
      properties: { product_name: productName },
    });
  }
});
```

---

## 📈 Implementación del Tracking

### Paso 1: Actualizar componentes clave

#### WhatsAppButton.tsx

```tsx
import { trackWhatsAppClick } from '@/lib/analytics';

<button onClick={() => {
  trackWhatsAppClick('product_page', productName);
  // Abrir WhatsApp
}}>
```

#### ProductCard.tsx

```tsx
import { trackProductClick } from '@/lib/analytics';

<div onClick={() => {
  trackProductClick(product.name, product.category, product.price);
}}>
```

#### ContactForm.jsx

```tsx
import { trackFormStart, trackFormSubmit, trackFormAbandonment } from '@/lib/analytics';

// Al hacer focus en primer campo
onFocus={() => trackFormStart('contact_form')}

// Al enviar
onSubmit={() => trackFormSubmit('contact_form', formData)}

// Al salir sin completar (useEffect con cleanup)
useEffect(() => {
  return () => {
    if (formStarted && !formSubmitted) {
      trackFormAbandonment('contact_form', completedFields, totalFields);
    }
  };
}, []);
```

---

### Paso 2: Agregar script al Layout

En `src/layouts/Layout.astro`, después de los scripts de GA/GTM:

```astro
<script>
  import { initializeAnalytics } from '@/lib/analytics';

  // Esperar a que el DOM cargue
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalytics);
  } else {
    initializeAnalytics();
  }
</script>
```

---

## 🎯 Configuración de Google Analytics 4

### Eventos personalizados a configurar en GA4:

1. **Conversiones**:

   - `whatsapp_click` → Marcar como conversión
   - `contact_form_submit` → Marcar como conversión
   - `quote_requested` → Marcar como conversión
   - `purchase` → Marcar como conversión

2. **Embudos personalizados**:

   ```
   Embudo: Google Ads → WhatsApp
   ├─ page_view (Landing)
   ├─ product_click
   ├─ gallery_interaction
   ├─ whatsapp_click
   └─ whatsapp_message_sent (conversión)
   ```

3. **Segmentos de audiencia**:
   - **Abandonadores de WhatsApp**: `whatsapp_click` sin `whatsapp_message_sent` en 5 min
   - **Exploradores profundos**: `scroll_depth` >= 75% + `time_on_page` >= 60s
   - **Interesados en Blanco Polar**: `product_click` where `product_name` = "Blanco Polar"

---

## 📊 Dashboard de Análisis (Google Data Studio)

### KPIs principales a monitorear:

```
┌────────────────────────────────────────────────────────┐
│ Tasa de Conversión por Etapa                          │
├────────────────────────────────────────────────────────┤
│ Landing Page → Exploración:        85%  ▓▓▓▓▓▓▓░░░   │
│ Exploración → Intento Contacto:    42%  ▓▓▓▓░░░░░░   │
│ Intento → WhatsApp Abierto:        78%  ▓▓▓▓▓▓▓░░░   │
│ WhatsApp → Mensaje Enviado:        23%  ▓▓░░░░░░░░   │← CRÍTICO
│                                                        │
│ Conversión Total (Landing → Venta): 6.3%              │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ Fuentes de Tráfico - Últimos 7 días                   │
├────────────────────────────────────────────────────────┤
│ Google Ads:        1,243 visitas  →  78 conversiones  │
│ Orgánico:           856 visitas  →  64 conversiones  │
│ Facebook Ads:       432 visitas  →  19 conversiones  │
│ Directo:            287 visitas  →  31 conversiones  │
│                                                        │
│ Mejor ROI: Orgánico (7.5%)                            │
│ Peor ROI:  Facebook Ads (4.4%)                        │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ Productos más consultados vs. conversiones            │
├────────────────────────────────────────────────────────┤
│ Blanco Polar:      287 clics  →  41 WhatsApp (14.3%) │
│ Carrara Grigio:    198 clics  →  23 WhatsApp (11.6%) │
│ Negro Angola:      156 clics  →  18 WhatsApp (11.5%) │
│ Travertino:        134 clics  →   9 WhatsApp  (6.7%) │
│                                                        │
│ Oportunidad: Mejorar CTR de Travertino                │
└────────────────────────────────────────────────────────┘
```

---

## 🔧 Optimizaciones Recomendadas

### 1. **Mejorar conversión WhatsApp → Mensaje**

```tsx
// Agregar incentivo en el mensaje pre-rellenado
const urgencyMessage = `
🔥 *PROMO HOY*: Blanco Polar con 15% descuento
Hola! Quiero cotización para ${productName}

¿Tienen disponibilidad esta semana?
`;

// Agregar botón "Llamar ahora" como alternativa
<div className="flex gap-2">
  <WhatsAppButton message={urgencyMessage} />
  <PhoneButton
    onClick={() =>
      trackEvent({ event: "phone_click", properties: { from: "product_cta" } })
    }
  />
</div>;
```

### 2. **Remarketing para abandonadores**

En GTM, crear audiencia:

```javascript
// Usuarios que hicieron clic en WhatsApp pero no convirtieron
trigger: {
  event: 'whatsapp_click',
  conditions: [
    { event: 'whatsapp_message_sent', exists: false, within: '5 minutes' }
  ]
}

// Mostrar anuncio de retargeting con:
"¿Olvidaste pedir tu cotización? 🎁 15% descuento HOY en Blanco Polar"
```

### 3. **A/B Testing**

Probar variantes:

- Posición WhatsApp button (fixed bottom vs. inline)
- Mensaje pre-rellenado (corto vs. detallado)
- CTA text ("Cotizar por WhatsApp" vs. "Hablar con asesor")
- Mostrar precio vs. "Consultar precio"

---

## 📱 Integración con N8N (Ya existente)

Tu webhook de N8N (`PUBLIC_N8N_WEBHOOK_URL`) ya captura:

- Transacciones de Wompi
- Formularios de contacto

**Agregar**: Endpoint para eventos de analytics

```javascript
// En N8N, crear webhook nuevo:
POST https://n8n.marmolesdeluxe.com/webhook/analytics

// Body ejemplo:
{
  "event": "whatsapp_click",
  "utm_campaign": "blanco-polar-promo",
  "product": "Blanco Polar",
  "timestamp": "2025-12-09T10:15:30Z",
  "user_id": "[ga_client_id]"
}

// Flow N8N:
1. Webhook trigger
2. → Google Sheets (log evento)
3. → If (event === 'whatsapp_click' && no_conversion_5min)
   → Telegram alert a vendedores
   → "Cliente interesado en Blanco Polar, no envió WhatsApp. LLAMAR?"
```

---

## 🎓 Preguntas Clave que Responde este Sistema

1. **¿De dónde vienen mis mejores clientes?**
   → Segmento por `utm_source`, `utm_campaign`, `traffic_source`

2. **¿En qué punto pierdo más usuarios?**
   → Análisis del embudo: mayor caída entre whatsapp_click → message_sent

3. **¿Qué productos generan más interés pero menos ventas?**
   → Ratio `product_click` / `quote_requested` por producto

4. **¿Cuánto tiempo pasa el usuario antes de convertir?**
   → `time_on_page` promedio de usuarios que convierten

5. **¿Funciona mi campaña de Google Ads?**
   → Conversión de `gclid` presente vs. tráfico orgánico

6. **¿Por qué abandonan el formulario?**
   → `form_abandonment` con `completion_rate` < 50%

---

## 🚀 Próximos Pasos

1. ✅ Implementar tracking en componentes (WhatsAppButton, ProductCard, ContactForm)
2. ✅ Configurar eventos como conversiones en GA4
3. ✅ Crear dashboard en Google Data Studio/Looker
4. ⏳ Configurar alertas automáticas en N8N para abandonos
5. ⏳ A/B testing de CTAs de WhatsApp
6. ⏳ Implementar chat proactivo para usuarios con `scroll_depth` > 75%

---

## 📚 Recursos

- [Google Analytics 4 - Eventos personalizados](https://support.google.com/analytics/answer/9267735)
- [Facebook Pixel - Eventos estándar](https://developers.facebook.com/docs/meta-pixel/reference)
- [Google Tag Manager - Triggers](https://support.google.com/tagmanager/answer/7679316)
- [N8N - Google Sheets integration](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)
