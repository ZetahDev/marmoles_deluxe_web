# Tablero KPI por URL Canónica (Base Operativa)

## URLs foco (fase 1)

- `/`
- `/mesones-de-cocina`
- `/blanco-polar`
- `/precios`

## KPI por URL

| URL | Query objetivo | Impresiones | Clics | CTR | Posición prom. | Rebote (GA4) | Conversiones (WA/Form) | Último cambio |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | `marmolistas en cali` |  |  |  |  |  |  |  |
| `/mesones-de-cocina` | `mesones de cocina cali` |  |  |  |  |  |  |  |
| `/blanco-polar` | `cuarzo blanco polar cali` |  |  |  |  |  |  |  |
| `/precios` | `marmoles cali precios` |  |  |  |  |  |  |  |

## Control semanal GA4/GTM (cluster `/precios`)

### Eventos a monitorear (7 días)

| Evento | Parámetros esperados | Meta operativa |
| --- | --- | --- |
| `precios_cta_click` | `page=/precios`, `cta=whatsapp-precios-main|whatsapp-precios-sticky` | Tendencia semanal al alza |
| `whatsapp_click` | `click_context` de enlace WA | Correlación con `precios_cta_click` |
| `precios_scroll_50` | `page=/precios` | Mayor que `precios_scroll_90` |
| `precios_scroll_90` | `page=/precios` | Detectar consumo profundo de página |
| `precios_exit_intent` | `page=/precios` | Reducir con mejoras de copy/CTA |

### Lectura rápida semanal

1. Comparar `precios_cta_click` vs semana anterior.
2. Revisar distribución de clic por `cta` (main vs sticky).
3. Calcular ratio de intención: `precios_cta_click / precios_scroll_50`.
4. Si cae el ratio 2 semanas seguidas, iterar copy de CTA principal y bloque comparativo.

## Plan CTR (2-4 semanas) - URLs foco

1. Semana 1: probar variante de `title` + `meta description` en `/precios`.
2. Semana 2: probar variante de snippet en `/mesones-de-cocina`.
3. Semana 3: probar variante de snippet en `/blanco-polar`.
4. Semana 4: conservar ganadores por CTR y documentar cambio en columna `Último cambio`.

## Ritual de mejora mensual (4 semanas)

1. Semana 1: titles, H1 y metadescriptions.
2. Semana 2: expansión de contenido en páginas con rebote alto.
3. Semana 3: enlaces internos desde páginas con mayor autoridad.
4. Semana 4: ajuste de snippets para mejorar CTR.

## Baseline de referencia (Mayo 2026)

- Clics orgánicos GSC: `1,280`
- CTR promedio: `4.1%`
- Posición promedio: `8.6`
- Llamadas GBP: `85`
