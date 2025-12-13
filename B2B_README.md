# Vista B2B - Gran Formato

## 📋 Descripción

Nueva página especializada para **clientes empresariales** (constructoras, arquitectos, diseñadores) con enfoque en proyectos de gran formato y ventas mayoristas.

**URL**: `/b2b-gran-formato`

---

## 🎯 Características Principales

### 1. **Hero Section Impactante**
- Mensaje claro para audiencia B2B
- CTAs dobles: "Solicitar Cotización" y "Ver Materiales"
- Badge "Soluciones B2B" para diferenciación visual

### 2. **Beneficios Específicos B2B**
- ✅ Precios especiales por volumen
- ✅ Asesoría técnica especializada
- ✅ Plazos de entrega garantizados
- ✅ Logística especializada
- ✅ Soporte post-venta extendido
- ✅ Facturación flexible

### 3. **Tipos de Proyectos Atendidos**
- **Residencial**: Torres, conjuntos, urbanizaciones
- **Comercial**: Centros comerciales, retail
- **Corporativo**: Oficinas, sedes empresariales
- **Hotelería**: Hoteles, restaurantes

### 4. **Catálogo de Materiales Gran Formato**
- **Piedra Sinterizada**: 320x160 cm, 320x144 cm, 260x120 cm
- **Quartzstone**: 305x140 cm, 300x200 cm
- **Granito Natural**: 280x180 cm, cortes personalizados
- **Mármol Natural**: Formatos variables según cantera

### 5. **Proceso de Trabajo B2B (6 Pasos)**
1. Contacto Inicial
2. Reunión Técnica
3. Cotización Personalizada
4. Aprobación y Contrato
5. Suministro y Logística
6. Instalación y Soporte

### 6. **Estadísticas Clave**
- 16+ años de experiencia
- 500+ proyectos completados
- 50+ arquitectos aliados
- 98% satisfacción

### 7. **Formulario B2B Especializado** (Componente React)
Campos específicos para leads empresariales:
- Nombre completo
- Empresa
- Cargo
- Teléfono
- Email
- Ciudad del proyecto
- Tipo de proyecto (select)
- Metros cuadrados estimados
- Descripción detallada
- Aceptación de términos

**Funcionalidad**:
- Validación en tiempo real
- Envío directo por WhatsApp
- Tracking con Google Analytics
- Mensaje personalizado según tipo de proyecto

---

## 🛠️ Implementación Técnica

### Archivos Creados

1. **`src/pages/b2b-gran-formato.astro`** (438 líneas)
   - Página principal con todas las secciones
   - SEO optimizado para búsquedas B2B
   - Integración con ContactFormB2B
   - Animaciones CSS personalizadas

2. **`src/components/ContactFormB2B.tsx`** (365 líneas)
   - Componente React con TypeScript
   - Validación completa de campos
   - Integración con analytics
   - Estados de loading y éxito
   - Manejo de errores

### Actualización de Navegación

**`src/components/Navbar.astro`**:
```astro
{ href: "/b2b-gran-formato", label: "B2B / Gran Formato" },
```

---

## 📱 Integración WhatsApp

El formulario genera automáticamente un mensaje estructurado:

```
🏢 *SOLICITUD B2B - GRAN FORMATO*

👤 *Datos de Contacto:*
• Nombre: [nombre]
• Empresa: [empresa]
• Cargo: [cargo]
• Teléfono: [telefono]
• Email: [email]

📍 *Proyecto:*
• Tipo: [tipo]
• Ciudad: [ciudad]
• M² estimados: [metros]

📝 *Descripción:*
[descripcion]

---
Solicitud enviada desde www.marmolesdeluxe.com/b2b-gran-formato
```

**Número de contacto**: +57 313 259 2793

---

## 🎨 Diseño UI/UX

### Paleta de Colores
- **Primario**: `marmoles-gold` (dorado premium)
- **Secundario**: `marmoles-black` (negro elegante)
- **Acentos**: Gradientes from-gray-50 to-white

### Componentes Visuales
- Cards con hover effects
- Badges de información
- Grid layouts responsivos (1/2/3 columnas)
- Iconos SVG inline
- Animaciones fadeIn

### Responsive Design
- **Mobile**: 1 columna, padding reducido
- **Tablet**: 2 columnas
- **Desktop**: 3 columnas, máximo 7xl container

---

## 📊 SEO y Metadatos

### Keywords
```
gran formato Cali, suministro constructoras, piedra arquitectura, 
proyecto comercial mármol, venta mayorista granito, arquitectos Cali, 
constructoras Valle del Cauca, láminas gran formato
```

### Open Graph
- Title: "B2B Gran Formato - Mármoles Deluxe | Proyectos Arquitectónicos"
- Description: Soluciones para arquitectos y constructoras
- Image: `/images/contactanos-og.jpg`

### Structured Data
- Schema.org via `SEOSchemaData` component
- LocalBusiness markup
- Geo tags para Cali

---

## 🚀 Próximas Mejoras

### Fase 2
- [ ] Portal de clientes con login
- [ ] Historial de cotizaciones
- [ ] Descarga de catálogos en PDF
- [ ] Calculadora de m² en tiempo real
- [ ] Galería de proyectos comerciales

### Fase 3
- [ ] API de disponibilidad en tiempo real
- [ ] Sistema de pedidos online
- [ ] Dashboard de seguimiento de obra
- [ ] Integración con CRM

---

## 📝 Notas de Desarrollo

### Dependencias
- React 19
- TypeScript
- Astro 5
- TailwindCSS 4

### Analytics Tracking
```typescript
trackFormStart("b2b_contact_form");
trackFormSubmit("b2b_contact_form", {
  tipo_proyecto: formData.tipoProyecto,
  ciudad: formData.ciudad,
  metros: formData.metros || "no_especificado",
});
```

### Validaciones Implementadas
- Email formato válido
- Teléfono formato internacional
- Campos requeridos marcados con *
- Checkbox de términos obligatorio

---

## 🔗 Enlaces Relacionados

- [Página B2B](https://www.marmolesdeluxe.com/b2b-gran-formato)
- [Formulario de Contacto Principal](/contactanos)
- [Otros Servicios](/otros-servicios) (incluye mención B2B)
- [Políticas y Garantías](/politicas-garantia)

---

## 📞 Contacto B2B

- **Teléfono**: +57 313 259 2793
- **Email**: comercial@marmolesdeluxe.com
- **WhatsApp**: +57 313 259 2793
- **Dirección**: Cl. 43a Nte. #5N 69, Cali

---

**Fecha de Implementación**: Diciembre 2025  
**Versión**: 1.0  
**Autor**: GitHub Copilot + Developer
