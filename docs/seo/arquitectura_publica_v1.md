# Arquitectura Pública SEO v1 (Decisión Ejecutada)

Fecha: 2026-06-01

## Objetivo

Cerrar el desfase entre informes SEO y experiencia pública actual sin romper navegación ni estructura funcional del sitio.

## Decisión

1. Se mantiene la arquitectura pública visible actual:
   - `/quartzstone`
   - `/piedra-sinterizada`
   - demás rutas corporativas vigentes.
2. Las rutas creadas como soporte táctico permanecen internas:
   - `/blanco-polar`
   - `/precios`
   - `/mesones-de-cocina-cali`
   - `/mesones-de-cocina-jamundi`
   - `/mesones-de-cocina-palmira`
3. Blanco Polar se canaliza al flujo existente:
   - `301 /blanco-polar -> /quartzstone?material=blanco-polar`

## Reglas técnicas aplicadas

- Rutas internas fuera de `sitemap.xml`.
- Rutas internas con `noindex,nofollow`.
- Rutas internas en `robots.txt` como `Disallow`.
- Navegación pública sin exposición de rutas internas.

## Impacto esperado

- Preserva UX y arquitectura existente de catálogo.
- Evita canibalización y ruido de indexación.
- Permite probar mejoras SEO tácticas sin comprometer rutas principales.

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
