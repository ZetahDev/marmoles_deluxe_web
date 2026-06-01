# Política Canonical y Migración SEO

## 1) Política canonical

- Cada intención principal debe tener **una URL canónica**:
  - Portafolio de cuarzos: `/quartzstone`.
  - Portafolio de sinterizadas: `/piedra-sinterizada`.
  - Páginas corporativas y de servicio existentes en navegación principal.
- Las rutas legacy o duplicadas se redirigen con `301` al destino canónico.
- `sitemap.xml` solo publica rutas canónicas activas.
- Las páginas de soporte táctico (campañas/pruebas internas) se mantienen fuera de sitemap y con `noindex,nofollow`.

## 2) Redirecciones 301 activas

- `/mesones-de-cocina-cali` -> `/mesones-de-cocina`
- `/encimeras-de-cocina-cali` -> `/mesones-de-cocina`

## 3) Reglas de calidad técnica

- No cadenas de redirección.
- No loops.
- Cada ruta canónica debe responder `200`.
- Cada ruta legacy mapeada debe responder `301`.

## 4) Convención para nuevas páginas

- Definir `title`, `description`, `canonical`, `primaryKeyword`, `schemaType` y `faq`.
- Integrar `GeoBusinessSchema` en páginas transaccionales/locales.
- Si una página es pública: incluirla en navegación y sitemap.
- Si una página es de soporte: no incluirla en navegación/sitemap, y aplicar `noindex,nofollow` + `Disallow` en `robots.txt`.
