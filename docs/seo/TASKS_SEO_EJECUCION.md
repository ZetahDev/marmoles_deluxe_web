# Tasks SEO - Estado de Ejecución

Última actualización: 2026-06-01 (tarde)

## 1) Pendientes críticos (impacto directo en tráfico/ventas)

- ✅ **Definir arquitectura final pública para páginas comerciales**
  - Decisión aplicada: navegación pública principal se mantiene en `/quartzstone` y `/piedra-sinterizada`.
  - Rutas de soporte se mantienen fuera de navegación principal.

- ✅ **Rutas por marca en sinterizadas publicadas**
  - `/piedra-sinterizada/altea`
  - `/piedra-sinterizada/terracina`
  - `/piedra-sinterizada/dekton`
  - `/piedra-sinterizada/neolith`
  - `/piedra-sinterizada/silestone`
  - `/piedra-sinterizada/artemarmol`

- 🟡 **Resolver “mina de oro” (posiciones 11-20) al 100%**
  - ✅ Home: title/H1/meta avanzados.
  - ✅ Subrutas sinterizadas: title/H1/meta creados.
  - ✅ Quartz/Blanco Polar: ajuste de copy y primeras 100 palabras aplicado en `/blanco-polar`.
  - ✅ Precios: ajuste de copy y primeras 100 palabras aplicado en `/precios`.
  - ✅ Mesones/encimeras: página canónica pública vigente en `/mesones-de-cocina`.
  - ⬜ Pendiente fino: iterar snippets de CTR con datos reales GSC en ventana 2-4 semanas.

- 🟡 **Contenido comercial profundo (anti-thin content real)**
  - ✅ `precios` con tabla/rangos y FAQs.
  - ✅ `blanco-polar` con estructura comercial y FAQs.
  - ✅ `blanco-polar` y `precios` definidos como **indexables públicas**.
  - ⬜ Pendiente: ampliar a versión long-form completa (>700 palabras por intención clave) con comparativas y casos.

## 2) SEO técnico pendiente

- 🟡 **Sitemap final coherente con decisión de negocio**
  - ✅ Subrutas de marca de sinterizadas están en sitemap.
  - ✅ `/precios` y `/blanco-polar` están en sitemap como rutas públicas indexables.
  - ⬜ Pendiente: validación técnica formal post-build (200/301/noindex) documentada en checklist.

- ✅ **Canonical + redirecciones finales**
  - ✅ Canonical público dedicado para Blanco Polar en `/blanco-polar`.
  - ✅ Redirección legacy vigente: `/encimeras-de-cocina-cali` -> `/mesones-de-cocina`.
  - ✅ Política congelada: hubs (`/quartzstone`, `/piedra-sinterizada`) + páginas objetivo indexables por intención.

- ✅ **Enlazado interno estratégico**
  - ✅ Enlaces añadidos desde Home, Quartzstone, Proyectos, Casos de estudio, Otros servicios.
  - ✅ Malla de anchors aplicada hacia `/precios`, `/mesones-de-cocina` y `/blanco-polar` en páginas de alta autoridad.

- ✅ **Validación técnica formal de sitemap/URLs**
  - ✅ `sitemap.xml` responde `200`.
  - ✅ URLs listadas en sitemap responden `200` en validación local.
  - ✅ Sin redirecciones internas detectadas en URLs del sitemap.
  - ✅ Sin páginas `noindex` dentro del sitemap (todas con `index, follow`).
  - 📝 Nota: la redirección legacy `/encimeras-de-cocina-cali` depende de `vercel.json` y se valida en ambiente Vercel.

## 3) Entidad local / GBP / citas (off-page)

- ⬜ **GBP**
  - Agregar categoría secundaria: `Tienda de muebles de cocina`.
  - Operar calendario de publicaciones 2/semana.

- ⬜ **Citas locales**
  - Corregir Yelp/Foursquare/Houzz: URL, teléfono, formato dirección, HTTPS.
  - Uniformidad NAP en todos los directorios.

- 🟡 **Entidad de marca externa**
  - ✅ En web: `founder`, `foundingDate`, `sameAs` ampliado.
  - ⬜ Fuera del sitio: reforzar menciones/perfiles de autoridad (Cámara, corporativos, etc.).

## 4) UX/CRO pendientes (web)

- 🟡 **Página de precios orientada a conversión real**
  - ✅ Tabla de rangos y FAQs creadas.
  - ✅ Bloque comparativo explícito implementado (material vs uso vs mantenimiento).
  - ✅ CTA persistente y medición de microconversión implementadas en `/precios` (scroll-depth, click CTA, abandono).

- ⬜ **Página por material con ruta de decisión**
  - Falta estandarizar plantilla comparativa (objeciones, mantenimiento, casos, CTA técnico) para cuarzos/sinterizadas.

- ⬜ **Rutas directas para campañas**
  - Definir landings de campaña por intención ciudad + material con política index/noindex clara.

## 5) Medición y operación

- 🟡 **Tablero operativo semanal**
  - ✅ Existe base: `docs/seo/tablero_kpis_por_url.md`.
  - ⬜ Cargar datos reales semanales y mantener histórico.

- ⬜ **Ritual mensual institucionalizado**
  - Definir responsables + fecha de corte + fuente única para:
  - Semana 1: titles/H1
  - Semana 2: contenido
  - Semana 3: internal links
  - Semana 4: CTR snippets

## 6) Estado del repo

- ✅ Cambios implementados y committeados en micro commits.
- ✅ Decisión final aplicada: `precios` y `blanco-polar` son páginas SEO públicas e indexables.

## Próximo bloque recomendado (ejecución inmediata)

1. Validar en Vercel la redirección `/encimeras-de-cocina-cali` -> `/mesones-de-cocina` con `301` en entorno productivo.
2. Validar eventos de microconversión en GA4/Tag Manager (nombres y parámetros en tiempo real).
3. Iniciar ciclo de optimización CTR con datos reales GSC (2-4 semanas).
