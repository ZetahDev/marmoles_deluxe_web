# Design System: Marmoles Deluxe Web

Este documento registra el modelo visual y tecnico usado en la portada actual (`src/pages/index.astro`) para replicar nuevas vistas con el mismo nivel estetico, comercial y de rendimiento.

## Objetivo de diseno

Marmoles Deluxe debe sentirse como una marca premium de superficies, no como un catalogo generico de materiales. La experiencia combina lujo sobrio, prueba visual, copy de conversion directa y componentes rapidos de escanear.

El estilo base es:

- Fondo negro, blanco puro y dorado como sistema principal.
- Fotografia de piedra, cocinas, banos y detalles como protagonista.
- Jerarquia tipografica fuerte, con titulares grandes y copy corto.
- Contraste alto, bordes limpios, sombras profundas y animaciones discretas.
- CTA comercial directo hacia WhatsApp, visita tecnica o portafolio.

## Stack y convenciones tecnicas

El sitio usa Astro como base, Tailwind CSS para estilos, React solo donde hay interactividad puntual y Cloudinary para imagenes optimizadas.

Fuentes de referencia:

- `src/pages/index.astro`: composicion principal, hero, secciones, animaciones y CTAs.
- `src/layouts/Layout.astro`: shell global, navbar, footer, floating UI, tracking y preloads.
- `src/styles/global.css`: base Tailwind, container global y soporte de `prefers-reduced-motion`.
- `tailwind.config.mjs`: tokens de marca, fuente Inter y radios.
- `src/components/Navbar.astro`: navegacion fija, blur, dropdown de materiales y logo dorado.
- `src/components/Footer.astro`: cierre negro, links, contacto y carrusel de marcas.
- `src/components/CarouselWrapper.tsx`, `TestimonialCarousel.tsx`, `ContactForm.jsx`: patrones React reutilizables.

Regla de implementacion: construir primero en Astro estatico. Hidratar React solo cuando haya estado local, carousel, formulario, modal o tracking de interaccion.

## Tokens visuales

### Color

Tokens Tailwind existentes:

```txt
marmoles.gold  #D4AF37
marmoles.black #000000
marmoles.white #FFFFFF
```

Uso recomendado:

- `marmoles-black`: fondos hero, portafolio, CTA final, footer y paneles premium.
- `marmoles-white`: secciones limpias de lectura y fondos base.
- `marmoles-gold`: acento de marca, CTA principal, links, subrayados, estados activos y detalles de lujo.
- `gray-50`, `gray-100`, `gray-600`, `gray-700`: secciones editoriales, tarjetas suaves y cuerpo de texto.
- `green-400/500/600`: confirmacion, incluido, gratis, WhatsApp y validacion positiva.
- `red-500`: comparativos negativos o costos adicionales.

No reemplazar el blanco por crema ni el negro por slate. La identidad depende del contraste blanco/negro/dorado.

### Tipografia

Fuente global: `Inter`, fallback `sans-serif`.

Escala usada en portada:

- Hero H1: `text-4xl sm:text-5xl md:text-7xl`, `font-bold`, `tracking-tight`, `leading-tight`.
- H2 de seccion: `text-4xl md:text-5xl`, `font-bold`.
- H3 de tarjeta o bloque: `text-xl` a `text-2xl`, `font-bold` o `font-semibold`.
- Body destacado: `text-lg md:text-2xl`, `font-light` en hero.
- Body normal: `text-base` a `text-xl`, `text-gray-600/700`, `leading-relaxed`.
- Labels o preheaders: `text-xs` a `text-sm`, `uppercase`, `tracking-widest`, `font-bold`.

Regla: los titulares pueden ser intensos y comerciales; el cuerpo debe ser claro, corto y orientado a la decision.

### Espaciado y contenedores

El container global aplica `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. En secciones especiales se usa `max-w-5xl` o `max-w-6xl` para controlar lectura.

Ritmo de secciones:

- Hero: `min-h-[90vh]`, centrado vertical, contenido maximo `max-w-5xl`.
- Secciones principales: `py-20` o `py-24`.
- Secciones SEO/confianza/FAQ: `py-16`.
- Gaps de grids: `gap-8`, `gap-12`, `gap-16`.

Evitar layouts apretados. La marca debe respirar, especialmente cuando hay imagenes de alto valor.

### Radios, bordes y sombras

Radios:

- Botones y campos: `rounded-lg` o `rounded-xl`.
- Tarjetas y paneles: `rounded-2xl` o `rounded-3xl`.
- Imagenes destacadas: `rounded-2xl`.
- Badges pequenos: `rounded-full`.

Sombras:

- Tarjetas base: `shadow-md`, `shadow-lg`.
- Panel ganador, formularios e imagenes premium: `shadow-2xl`.
- CTA dorado: `hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]`.

Los bordes suelen ser suaves: `border-gray-100`, `border-white/10`, `border-marmoles-gold/20`. En paneles premium, el borde dorado puede ser protagonista.

## Arquitectura de la portada

### 1. Navbar fijo

Modelo:

- Header fijo: `fixed w-full top-0 left-0 z-50`.
- Fondo transparente con `backdrop-blur-md` en desktop.
- Borde inferior sutil `border-white/20`.
- Logo centrado en desktop, menu hamburguesa nativo en mobile.
- Links dorados con subrayado animado `group-hover:w-full`.
- Dropdown de Materiales en desktop con fondo `bg-white/80 backdrop-blur-md`.

Replicacion:

- No crear navs locales en paginas nuevas. Usar `Layout.astro`.
- Mantener el logo como regreso a home.
- En desktop no mostrar `Inicio`; el logo cumple esa funcion.
- En mobile usar menu nativo con checkbox/details, no hidratar React si no es necesario.

### 2. Hero premium con imagen de fondo

Modelo actual:

- Seccion negra `bg-marmoles-black text-white`.
- Imagen Cloudinary full bleed con `object-cover opacity-60`.
- Overlay vertical: `bg-gradient-to-t from-black via-black/50 to-transparent`.
- Contenido centrado.
- Badge dorado superior.
- H1 de alto impacto con palabra clave en degradado dorado.
- Parrafo corto con una frase en `strong`.
- CTA principal dorado y CTA secundario borde blanco.
- Prueba social pequena debajo.

Reglas para nuevas vistas:

- El primer viewport debe tener una senal clara del producto o servicio mediante imagen real o hero visual.
- Si se usa imagen de fondo, siempre definir `width`, `height`, `fetchpriority` cuando sea critica y `decoding="async"`.
- Mantener una sola idea comercial fuerte. No llenar el hero con demasiados chips, metricas o tarjetas.
- El CTA principal debe ser accionable y especifico: cotizar, agendar visita, ver portafolio o hablar por WhatsApp.

### 3. Franja de prueba social

Modelo:

- Fondo `bg-neutral-900`, borde inferior `border-white/10`.
- Grid `grid-cols-2 md:grid-cols-4`.
- Icono grande, valor numerico y label uppercase con tracking.

Uso:

- Ideal despues del hero para validar experiencia, velocidad, garantia o proyectos.
- Mantener maximo 4 metricas.
- Los labels deben ser cortos y escaneables.

### 4. Secciones de valor

Modelo:

- Fondo blanco, texto negro.
- Header centrado con H2 y parrafo gris.
- Grid de 3 tarjetas.
- Tarjetas `bg-gray-50`, `rounded-2xl`, `border-gray-100`, hover a blanco y `shadow-2xl`.
- Numero decorativo absoluto en esquina con baja opacidad.
- Accent pill dorado.

Uso:

- Para servicios, beneficios, procesos o razones de compra.
- Cada tarjeta debe tener titulo, descripcion concreta y una etiqueta de cierre.
- No usar tarjetas si el contenido requiere comparacion o narrativa; usar paneles o listas.

### 5. Comparativo de propuesta todo incluido

Modelo:

- Fondo `bg-gray-50`.
- Header centrado con preheader dorado.
- Grid `lg:grid-cols-12`.
- Competencia: panel blanco, `lg:col-span-5`, opacidad inicial `opacity-80`.
- Marmoles Deluxe: panel negro, `lg:col-span-7`, borde dorado, `shadow-2xl`, ligera escala `lg:scale-105`.
- Filas con icono de estado, titulo, microcopy y badges `INCLUIDO`.
- CTA dentro del panel ganador.

Uso:

- Para diferenciarse de competencia, planes, paquetes o opciones.
- El panel ganador debe tener mayor peso visual y texto mas contundente.
- No convertir este bloque en una tabla convencional si el objetivo es venta; el contraste emocional es parte del patron.

### 6. Portafolio visual

Modelo:

- Fondo negro.
- Header centrado con label dorado.
- H2 con gradiente de blanco a gris.
- Carousel React visible con imagen `h-80 object-cover`, tarjeta negra y texto blanco.
- Link textual dorado al portafolio completo.

Uso:

- Cada pagina de material o servicio debe tener una seccion visual si existen proyectos o imagenes reales.
- Las imagenes deben estar optimizadas con `buildCloudinaryImageSet`.
- Evitar placeholders o imagenes pequenas estiradas.

### 7. Garantia con imagen inclinada

Modelo:

- Fondo `bg-gradient-to-b from-marmoles-white to-gray-100`.
- Layout 2 columnas.
- Imagen con `rounded-2xl shadow-2xl rotate-2 hover:rotate-0`.
- Lista numerada con circulos negros y numeros dorados.
- Link final con borde inferior dorado.

Uso:

- Para politicas, confianza, procesos o pasos.
- La microinteraccion de rotacion debe ser sutil y tener transicion `duration-500`.

### 8. Testimonios

Modelo:

- Fondo blanco.
- Titulo centrado con salto de linea y span dorado.
- Carousel React con tarjeta negra, texto gris italic, estrellas doradas y nombre en blanco.

Uso:

- Mantener testimonios breves y especificos.
- Usar carousel solo si hay varias pruebas sociales; si son 2 o menos, preferir grid simple.

### 9. Bloque SEO/confianza

Modelo:

- Fondo degradado suave `from-gray-50 to-white`.
- Panel blanco con `rounded-3xl`, borde dorado suave y sombra.
- Badge uppercase con tracking alto.
- Grid de bullets en mini tarjetas `bg-gray-50`.

Uso:

- Este bloque existe para reforzar E-E-A-T: experiencia real, ubicacion, evidencia visual, trayectoria, marcas y cobertura.
- En paginas nuevas adaptar `title`, `answer` y bullets al tema de la pagina, no copiar generico.

### 10. CTA final y formulario

Modelo:

- Fondo negro con blobs difusos dorado y azul muy sutiles.
- Grid 2 columnas.
- Copy de decision con lista de valor gratuito.
- Panel blanco para formulario con `rounded-2xl shadow-2xl`.
- Inputs con borde dorado, foco dorado y boton full width.

Uso:

- El CTA final debe cerrar la pagina con accion clara.
- Formularios siempre deben tener fallback o camino hacia WhatsApp.
- Usar mensajes de validacion visibles y estados `loading`, `success`, `error`.

### 11. FAQ y mapa

Modelo FAQ:

- Fondo blanco.
- Header centrado.
- Lista vertical de articles `rounded-2xl border bg-gray-50 p-6 shadow-sm`.

Modelo mapa:

- Altura fija `h-96`.
- Iframe full width con `filter: grayscale(100%)`.
- Tarjeta de ubicacion flotante abajo izquierda.

Uso:

- FAQ debe responder objeciones reales de compra y busqueda local.
- Mapa solo cuando la pagina tenga intencion local o contacto.

## Animaciones y movimiento

### Entrada inicial del hero

Se usa `tailwindcss-animate`:

- `animate-in fade-in slide-in-from-bottom-4 duration-700`.
- H1 con `slide-in-from-bottom-6 duration-1000 delay-200`.
- Parrafo con `slide-in-from-bottom-8 duration-1000 delay-300`.
- CTAs con `slide-in-from-bottom-10 duration-1000 delay-500`.

Regla: animar jerarquia de arriba hacia abajo, con delays cortos. No animar todo al mismo tiempo.

### Reveal on scroll

Clase local:

```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

Script:

- `IntersectionObserver`.
- `threshold: 0.1`.
- Se anima una sola vez con `observer.unobserve(entry.target)`.

Uso:

- Aplicar a headers de seccion, tarjetas, columnas, carousels y paneles.
- Para grids, se puede usar `style="transition-delay: ${index * 100}ms"`.
- No usar para elementos criticos que puedan generar CLS.

### Microinteracciones

Patrones actuales:

- CTA dorado con brillo: `.btn-gold-shine::after`.
- Hover de CTA: `hover:-translate-y-1`, sombra dorada.
- Tarjetas de servicio: cambio de fondo, sombra y color de titulo.
- Navbar: subrayado crece de `w-0` a `w-full`.
- Imagen garantia: `rotate-2 hover:rotate-0`.
- Carrusel de marcas: animacion lineal infinita y pausa al hover.
- WhatsApp flotante: scale hover y badge ping.

Respeto a accesibilidad:

- `global.css` reduce animaciones bajo `prefers-reduced-motion: reduce`.
- No crear animaciones obligatorias para entender contenido.
- Evitar parallax pesado, scroll hijacking o efectos que compitan con la fotografia.

## Componentes reutilizables

### Boton primario dorado

Usar para accion principal:

```html
<a class="btn-gold-shine bg-marmoles-gold text-marmoles-black px-8 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:-translate-y-1">
  COTIZAR MI TRANSFORMACION AHORA
</a>
```

Variantes:

- Primario sobre negro: dorado con texto negro.
- Primario sobre blanco: negro con texto blanco si el dorado queda demasiado promocional.
- WhatsApp: verde solo cuando la accion sea explicitamente WhatsApp.

### Boton secundario

Usar para navegacion interna o contenido de apoyo:

```html
<a class="px-8 py-4 rounded-lg font-medium text-white border border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm">
  Ver Portafolio
</a>
```

Sobre fondo claro, invertir a texto negro y borde gris/dorado.

### Badge premium

```html
<span class="inline-block py-1 px-3 rounded-full bg-marmoles-gold/20 border border-marmoles-gold text-marmoles-gold text-xs font-bold">
  EXCLUSIVIDAD Y DISENO EN CADA DETALLE
</span>
```

Uso limitado: hero, comparativo o bloque de confianza. No llenar secciones con badges.

### Tarjeta de servicio

Estructura:

- Panel `group p-8 bg-gray-50 rounded-2xl border border-gray-100`.
- Numero decorativo absoluto.
- Titulo con hover dorado.
- Descripcion gris.
- Pill dorado suave.

### Panel ganador

Estructura:

- `bg-marmoles-black text-white rounded-3xl p-8 shadow-2xl border border-marmoles-gold`.
- Ribbon superior derecho dorado.
- Items con check verde y badge incluido.
- CTA dorado al cierre.

Usar cuando una opcion de Marmoles Deluxe debe contrastarse contra una alternativa inferior.

### Formulario

Campos:

- Labels `text-sm font-medium text-gray-700`.
- Inputs `px-4 py-3 rounded-lg border border-marmoles-gold`.
- Focus `focus:ring-2 focus:ring-marmoles-gold`.
- Boton `w-full`, alto, bold, con estado disabled.

Los formularios deben trackear inicio, envio y abandono cuando aplique.

## Imagenes y media

Usar Cloudinary mediante:

- `buildCloudinaryImageSet(asset, CLOUDINARY_PRESETS.hero)` para heroes.
- `CLOUDINARY_PRESETS.card` para tarjetas y portafolio.
- `CLOUDINARY_PRESETS.logo` para logos.
- `buildSeoImageUrl` para metadata.

Buenas practicas:

- Hero: preload con `rel="preload" as="image"` y `fetchpriority="high"`.
- Imagenes no criticas: `loading="lazy"`, `decoding="async"`.
- Definir `width` y `height` para reducir layout shift.
- Mantener aspect ratio estable: hero full bleed, tarjetas `h-80`, productos con `aspect-[4/3]`.
- No usar imagenes decorativas si no aportan prueba visual del material, proyecto o marca.

## Responsive

Patrones actuales:

- Mobile-first con Tailwind.
- Hero centrado, texto `text-4xl` y CTAs stacked.
- Desktop desde `md`: hero `text-7xl`, CTAs en fila, grids de 3 o 4 columnas.
- Comparativo: una columna en mobile, 12 columnas en desktop.
- CTA final: una columna mobile, dos columnas en `lg`.
- Navbar: hamburger mobile, nav completo desktop.

Reglas:

- En mobile, reducir densidad antes que achicar texto excesivamente.
- Evitar texto largo en botones; si no cabe, usar dos lineas controladas o copy mas corto.
- No usar layouts de tarjetas anidadas en mobile.
- Los CTAs deben ocupar ancho completo solo cuando facilite el tap.

## Copy y tono

Tono actual:

- Premium, directo y comercial.
- Promete claridad, rapidez, garantia y cero sorpresas.
- Usa contraste con alternativas: almacenes, costos ocultos, instalacion tercerizada.
- Habla en segunda persona cuando busca conversion.

Patrones de copy:

- Titulares aspiracionales: "Arte y precision", "Excelencia materializada".
- Beneficios concretos: instalacion en 5 dias, visita tecnica gratis, transporte incluido.
- Prueba social: anos, clientes, proyectos, testimonios.
- Objeciones resueltas: costos ocultos, limpieza, garantia, calidad del material.

Evitar:

- Texto corporativo generico.
- Parrafos largos en hero.
- Claims tecnicos sin prueba visual o enlace.
- Exceso de signos, emojis o urgencia artificial.

## SEO y confianza

Cada vista nueva debe considerar:

- `title`, `description`, `keywords` y canonical.
- Open Graph con `og:image`.
- `SEOSchemaData` cuando aplique.
- `GeoBusinessSchema` y `GeoFaqSection` en paginas con intencion local o comercial.
- Preguntas frecuentes especificas por material, servicio o zona.
- Senales reales: ubicacion, trayectoria, marcas, portafolio, garantia, politicas.

El contenido SEO debe integrarse visualmente. No crear bloques largos de texto sin diseno.

## Checklist para replicar una vista nueva

1. Usar `Layout.astro` para heredar navbar, footer, floating UI y tracking.
2. Definir metadatos, canonical, OG y schema cuando aplique.
3. Abrir con hero visual: imagen real, overlay, H1 fuerte, parrafo corto y CTA.
4. Agregar prueba social o contexto inmediatamente despues si la pagina vende.
5. Usar secciones `py-20/py-24` con container global.
6. Alternar fondos negro, blanco y gris claro para ritmo.
7. Reservar dorado para accion, enfasis y marca; no usarlo como fondo dominante salvo CTA.
8. Reutilizar tarjetas, panel ganador, formulario, FAQ y portafolio segun el objetivo.
9. Aplicar `animate-on-scroll` solo a bloques no criticos y respetar reduced motion.
10. Optimizar imagenes con Cloudinary y dimensiones explicitas.
11. Validar mobile, tablet y desktop antes de entregar.
12. Revisar que el copy responda una objecion o mueva a una accion.

## Anti-patrones

- Crear una landing con gradientes genericos sin fotografia real.
- Usar paletas crema, beige o slate que diluyan la marca.
- Meter cards dentro de cards.
- Repetir grids de 3 tarjetas en todas las secciones.
- Usar botones dorados para acciones secundarias.
- Poner demasiados badges, emojis o metricas arriba del fold.
- Hidratar React para menus o contenido que puede ser Astro/HTML.
- Usar imagenes sin `width`, `height`, `loading` o presets Cloudinary.
- Ignorar `prefers-reduced-motion`.
- Copiar el FAQ de home sin adaptarlo a la pagina.

## Criterio de calidad

Una vista nueva esta alineada con la portada cuando:

- En el primer viewport se reconoce claramente Marmoles Deluxe.
- Hay una imagen o evidencia visual de calidad suficiente.
- La jerarquia tipografica coincide con la portada.
- El CTA principal es visible, especifico y consistente.
- El dorado aparece como acento premium, no como decoracion excesiva.
- Las secciones tienen ritmo: negro para impacto, blanco para lectura, gris para comparacion.
- Las animaciones son suaves, utiles y no afectan rendimiento.
- El contenido comercial resuelve objeciones reales.
- La pagina se siente parte del mismo sistema aunque tenga estructura propia.
