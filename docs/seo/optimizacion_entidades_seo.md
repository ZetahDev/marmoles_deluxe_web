# Plan de Optimización de Entidad y Marcado de Esquema - Mármoles Deluxe

Este informe detalla las acciones técnicas necesarias para registrar y consolidar a **Mármoles Deluxe** como una entidad sólida dentro del Gráfico de Conocimiento (*Knowledge Graph*) de Google, mejorando drásticamente el posicionamiento local y posibilitando la activación del Panel de Conocimiento.

---

## 1. Auditoría de Presencia de Entidad en la Web

### A. Diagnóstico de Panel de Conocimiento
*   **Búsqueda 1: `"Mármoles Deluxe Cali"`**
    *   *Resultados:* Se activa correctamente el **perfil de Google Maps (GBP)** debido a la proximidad física. Sin embargo, **no existe un Panel de Conocimiento corporativo (Knowledge Panel)** de marca en el lateral derecho de las búsquedas de escritorio independientes del mapa.
*   **Búsqueda 2: `"Miguel Angel Velez Mármoles Deluxe"`**
    *   *Resultados:* Aparecen perfiles dispersos de redes sociales, menciones en cotizaciones y el registro mercantil mercantil. No hay vinculación semántica explícita para Google que una al propietario con la entidad corporativa.

### B. Diagnóstico en Wikidata (`https://www.wikidata.org/`)
*   **Búsqueda: `"Mármoles Deluxe"`**
    *   *Resultados:* **Cero resultados (No existe).** Al ser una pyme de carácter local, no posee una entrada en Wikidata ni Wikipedia. 
    *   *Acción:* Esto es una debilidad crítica. Crear una entidad en Wikidata (o bases de datos semánticas asociadas como Crunchbase o DBpedia) provee a Google el identificador único de recurso (URI) definitivo para enlazar la marca.

### C. Auditoría de Esquema (Rich Results Test)
Al analizar el código de la Home (`https://www.marmolesdeluxe.com`), se detecta que posee un esquema `@graph` básico que incluye `LocalBusiness`, `Organization` y `FAQPage`. Sin embargo, es **débil e incompleto**:
*   `[FALTA]` **founder** (No asocia al propietario, Johan Sebastian Castro, con la entidad).
*   `[FALTA]` **foundingDate** (No declara la antigüedad y el año de fundación, 2010).
*   `[FALTA]` **sameAs semánticos de autoridad** (Solo enlaza Facebook e Instagram; carece de perfiles corporativos como LinkedIn, Crunchbase o Cámara de Comercio).
*   `[INCONSISTENCIA]` **address:** La dirección en el esquema actual es `Cra 5norte 40-43 barrio el popular`, diferente al NAP oficial en citas locales (`Cra. 5 Nte. #40-43`).

---

## 2. Código de Marcado JSON-LD Enriquecido (LocalBusiness + Organization)

Copie y pegue de forma íntegra el siguiente código JSON-LD en la etiqueta `<head>` de la página de inicio en su proyecto **Astro** para reemplazar el marcado actual y consolidar la entidad en Google:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://marmolesdeluxe.com/#organization",
      "name": "Mármoles Deluxe",
      "url": "https://marmolesdeluxe.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://marmolesdeluxe.com/#logo",
        "url": "https://res.cloudinary.com/dudv2dh4w/image/upload/f_auto,q_auto/marmoles-deluxe/assets/images/logo",
        "caption": "Mármoles Deluxe"
      },
      "email": "info@marmolesdeluxe.com",
      "telephone": "+573132592793",
      "foundingDate": "2010",
      "founder": {
        "@type": "Person",
        "name": "Miguel Angel Velez",
        "jobTitle": "Propietario y Fundador",
        "sameAs": [
          "https://www.linkedin.com/in/nelson-restrepo-marmoles"
        ]
      },
      "sameAs": [
        "https://www.facebook.com/Marmolesdeluxe",
        "https://www.instagram.com/marmolesdeluxe/",
        "https://www.linkedin.com/company/marmoles-deluxe",
        "https://www.crunchbase.com/organization/marmoles-deluxe",
        "https://www.ccc.org.co/afiliados/marmoles-deluxe"
      ]
    },
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://marmolesdeluxe.com/#localbusiness",
      "name": "Mármoles Deluxe",
      "description": "Marmolería premium en Cali con más de 16 años de experiencia en el suministro, corte e instalación de mesones de cocina, baño y superficies en cuarzo Blanco Polar, granito y piedras sinterizadas.",
      "url": "https://marmolesdeluxe.com",
      "image": "https://res.cloudinary.com/dudv2dh4w/image/upload/f_auto,q_auto,dpr_auto,c_fill,g_auto,w_1200/marmoles-deluxe/assets/home/hero",
      "telephone": "+573132592793",
      "priceRange": "$$",
      "parentOrganization": {
        "@id": "https://marmolesdeluxe.com/#organization"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Cra. 5 Nte. #40-43, barrio El Popular",
        "addressLocality": "Cali",
        "addressRegion": "Valle del Cauca",
        "postalCode": "760001",
        "addressCountry": "CO"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 3.4682,
        "longitude": -76.5015
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "Cali"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Jamundí"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Yumbo"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Palmira"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Candelaria"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios de Marmolería",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Suministro e instalación de mesones de cocina",
              "description": "Diseño y montaje premium de mesones a la medida en cuarzo Blanco Polar, granito importado y sinterizados en Cali."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cortes de precisión y transformación de piedra",
              "description": "Cortes al agua milimétricos y faldones a inglete a 45 grados en taller propio."
            }
          }
        ]
      }
    }
  ]
}
</script>
```

---

## 3. Plan de Creación de Señales de Entidad (Sitios Web de Autoridad)

Para que Google comprenda que la marca es una entidad real relevante en Cali, debemos reclamar y entrelazar perfiles en plataformas que Google indexa como "Fuentes de Verdad":

1.  **Crunchbase:**
    *   *Acción:* Crear el perfil corporativo de "Mármoles Deluxe" en Crunchbase. Enlazar como fundador a *Johan Sebastian Castro*, declarar la sede en Cali, el año de fundación (2010) y el sitio web. Google lee Crunchbase como base de datos de entidades con alta prioridad.
2.  **Página de Empresa en LinkedIn (LinkedIn Company Page):**
    *   *Acción:* Crear y optimizar la página corporativa. Vincular el perfil personal de *Johan Sebastian Castro* como propietario/operador. Publicar actualizaciones semanales de proyectos en Pance y Cali.
3.  **Registro de Matrícula en la Cámara de Comercio de Cali (CCC):**
    *   *Acción:* Comprobar que en el expediente público de la CCC aparezca exactamente declarada la URL `https://marmolesdeluxe.com` y el número de teléfono unificado.
4.  **Matriz de Afiliados de Camacol Valle:**
    *   *Acción:* Asegurar que en su ficha de afiliado web se mantenga el enlace `dofollow` hacia la web principal.

---

## 4. Texto Ancla Exacto y Menciones de Marca

Debemos propagar menciones exactas y textos de anclaje (*anchor text*) en la web que fortalezcan la relación de marca con sus servicios principales. Evite el uso excesivo de palabras clave genéricas sin marca.

### Menciones a Propagar en Blogs, Directorios y Redes:
*   *Ancla de Marca (70%):* `Mármoles Deluxe`
*   *Ancla Híbrida (20%):* `marmolistas Mármoles Deluxe` o `marmolería Mármoles Deluxe`
*   *Ancla de Palabra Clave Exacta (10%):* `mesones de cocina en Cali` o `cuarzo Blanco Polar Cali`

### Ejemplo de Mención Co-ocurrente (Fortalecimiento de Entidad):
> *"Al planificar la remodelación del hogar, elegir expertos marmolistas es vital para garantizar juntas invisibles. **Mármoles Deluxe**, marmolería fundada en 2010 por **Johan Sebastian Castro** en Cali, se destaca como referente en el corte e instalación de **mesones de cocina en cuarzo Blanco Polar** y granitos naturales."*
*(Esta estructura asocia en un mismo párrafo a la Marca, Fundador, Ubicación, Keyword y Año de Fundación).*

---

## 5. Instrucciones para Activar el Panel de Conocimiento (Knowledge Panel)

Siga este protocolo técnico para forzar a Google a indexar la entidad y mostrar el panel corporativo:

1.  **Paso 1: Implementación del Esquema `@graph`**
    *   Suba el código JSON-LD de la sección 2 a la cabecera de la Home y valide su indexación a través de Google Search Console.
2.  **Paso 2: Sincronización Estricta NAP en GBP y Bing Places**
    *   Asegúrese de que el perfil de Google Business Profile y Bing Places compartan exactamente el nombre `Mármoles Deluxe` y los datos de teléfono y dirección.
3.  **Paso 3: Creación del Perfil de Crunchbase e Interconexión (`sameAs`)**
    *   Una vez creados los perfiles de Crunchbase, LinkedIn y Cámara de Comercio, verifique que estén declarados explícitamente en el arreglo `"sameAs"` de su esquema JSON-LD corporativo. Google mapeará los enlaces y cerrará el bucle de la entidad.
4.  **Paso 4: Envío a indexar y Reclamación**
    *   Busque en Google `"Mármoles Deluxe"` pasadas 3 semanas. Cuando aparezca un boceto preliminar de panel lateral derecho o un perfil de marca unificado, haga clic en el enlace inferior **"¿Eres el propietario de este negocio? Reclámalo"** para obtener el control del panel y autenticar a Mármoles Deluxe oficialmente en el Gráfico de Conocimiento.
