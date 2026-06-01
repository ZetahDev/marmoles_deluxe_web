# Tasks SEO - Estado de Ejecución

Última actualización: 2026-06-01

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
  - ⬜ Quartz/Blanco Polar: ajuste final exacto al sprint GSC pendiente (copy y primeras 100 palabras según plantilla objetivo).
  - ⬜ Precios: ajuste final exacto al sprint GSC pendiente (primeras 100 palabras + snippet exacto de CTR).
  - ⬜ Mesones/encimeras: falta publicar/alinear página canónica objetivo final para ese cluster.

- 🟡 **Contenido comercial profundo (anti-thin content real)**
  - ✅ `precios` con tabla/rangos y FAQs.
  - ✅ `blanco-polar` con estructura comercial y FAQs.
  - ⬜ Definir si `blanco-polar` y `precios` pasan a **indexables públicas** o se mantienen de soporte.
  - ⬜ Si se publican: robustecer a versión long-form completa (>700 palabras por intención clave).

## 2) SEO técnico pendiente

- 🟡 **Sitemap final coherente con decisión de negocio**
  - ✅ Subrutas de marca de sinterizadas están en sitemap.
  - ✅ Rutas de soporte local/comercial siguen fuera de sitemap.
  - ⬜ Decisión final pendiente para `precios` y `blanco-polar` (indexables vs soporte).

- 🟡 **Canonical + redirecciones finales**
  - ✅ Redirección vigente: `/blanco-polar` -> `/quartzstone?material=blanco-polar`.
  - ⬜ Definir canonical final del cluster cuarzo (ruta dedicada vs hub con query).
  - ⬜ Congelar política definitiva para evitar señales mixtas futuras.

- 🟡 **Enlazado interno estratégico**
  - ✅ Enlaces añadidos desde Home, Quartzstone, Proyectos, Casos de estudio, Otros servicios.
  - ⬜ Completar malla exacta del sprint GSC para URLs objetivo finales de “precios” y “mesones/encimeras”.

- ⬜ **Validación técnica formal de sitemap/URLs**
  - Check formal pendiente:
  - URLs canónicas responden `200`.
  - Sin redirecciones internas dentro de sitemap.
  - Sin URLs `noindex` dentro de sitemap.

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
  - ⬜ Añadir bloque comparativo más explícito (material vs uso vs mantenimiento).
  - ⬜ CTA persistente y medición de microconversión (scroll-depth, click CTA, abandono).

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

## 6) Estado del repo (medio camino)

- ✅ Cambios implementados y committeados en micro commits.
- ⬜ Falta decisión final de publicación para `precios` y `blanco-polar` como páginas SEO públicas o de soporte interno.

## Próximo bloque recomendado (ejecución inmediata)

1. Cerrar decisión final de indexación para `precios` y `blanco-polar`.
2. Ejecutar ajuste exacto Sprint GSC (title/H1/meta/primeras 100 palabras) en esas URLs finales.
3. Correr validación técnica formal de sitemap + 200/301/noindex.
