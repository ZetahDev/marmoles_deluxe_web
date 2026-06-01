# Arquitectura Pública SEO v1 (Decisión Ejecutada)

Fecha: 2026-06-01

## Objetivo

Cerrar el desfase entre informes SEO y experiencia pública actual sin romper navegación ni estructura funcional del sitio.

## Decisión

1. Se mantiene la arquitectura pública visible actual:
   - `/quartzstone`
   - `/piedra-sinterizada`
   - `/blanco-polar`
   - `/precios`
   - `/mesones-de-cocina`
   - demás rutas corporativas vigentes.
2. Se eliminan rutas legacy locales no usadas para evitar deuda técnica.

## Reglas técnicas aplicadas

- Las rutas canónicas de negocio quedan indexables y en sitemap.
- Redirecciones legacy quedan solo para aliases activos.

## Impacto esperado

- Preserva UX y arquitectura existente de catálogo.
- Reduce canibalización por rutas duplicadas.
- Reduce deuda de archivos legacy.

## Próximo paso recomendado (P1.2)

Implementar subrutas públicas por marca bajo `/piedra-sinterizada/{marca}` manteniendo `/piedra-sinterizada` como hub principal.

## Estado P1.2

Implementado:

- `/piedra-sinterizada/altea`
- `/piedra-sinterizada/terracina`
- `/piedra-sinterizada/dekton`
- `/piedra-sinterizada/neolith`
- `/piedra-sinterizada/silestone`
- `/piedra-sinterizada/artemarmol`

Las subrutas son indexables (`index,follow`), están en sitemap y mantienen enlace directo hacia el catálogo filtrado del hub.
