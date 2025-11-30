# 📋 CONTEXTO COMPLETO - ADMIN MÁRMOLES DELUXE

**Proyecto:** Sistema Administrativo para Mármoles Deluxe  
**Subdominio:** https://admin.marmolesdeluxe.com/  
**Fecha de Creación:** 21 de Noviembre de 2025  
**Versión:** 1.0  
**Autor:** Sistema de Documentación Automatizada

---

## 🎯 VISIÓN GENERAL DEL NEGOCIO

### ¿Qué es Mármoles Deluxe?

**Mármoles Deluxe (MD)** es una empresa especializada en la **venta, transformación e instalación de superficies de piedra natural y sinterizada** en Cali, Colombia. Se especializa en:

- 🪨 **Piedra Sinterizada** (Altea, Dekton, Silestone)
- ⬜ **Quartzstone** (Blanco Polar - producto estrella)
- 🌋 **Granitos Naturales**
- 🏛️ **Mármoles**

### Diferenciadores de Mercado

#### ✅ Servicios Incluidos (sin costo adicional)

A diferencia de competidores como Homecenter y almacenes de cadena, MD incluye:

1. **Hueco brillado del lavaplatos**
2. **Hueco de horno**
3. **Huecos para llave y jabonera**
4. **Salpicadero de 7 cm**
5. **Faldón de 4 cm**
6. **Transporte incluido\*** (solo en Cali - casco urbano)

> **Nota:** Fuera del casco urbano de Cali se cobra **$8,000 COP por kilómetro recorrido**.

#### 🎯 Producto Estrella: Blanco Polar

- **Material:** Quartzstone Blanco Polar
- **Ventaja:** Stock en bodega propia (contenedor completo)
- **Precio público:** Desde $650,000/m² lineal
- **Precio mínimo negociable:** $550,000/m² lineal
- **Costo de adquisición:** $125,000/m² (inversión en contenedor)
- **Margen de utilidad:** 340% - 420%

---

## 🏗️ ARQUITECTURA DEL SISTEMA ADMIN

### Estructura de Roles y Permisos

```
┌─────────────────────────────────────────┐
│         ADMIN.MARMOLESDELUXE.COM        │
└─────────────────────────────────────────┘
              │
              ├─── 👤 ADMIN (Acceso Total)
              │    ├─ Gestión de usuarios
              │    ├─ Configuración de precios maestros
              │    ├─ Acceso a contabilidad completa
              │    ├─ Gestión de Google Drive/Sheets/Calendar
              │    └─ Control del Agente N8N
              │
              ├─── 💼 VENDEDOR (Acceso Operativo)
              │    ├─ Calculadora de cotizaciones
              │    ├─ Generación de PDFs de cotización
              │    ├─ Consulta de sobrantes de material
              │    ├─ Acceso a calendario (solo lectura)
              │    ├─ Visualización de negocios cerrados
              │    └─ SIN acceso a costos de compra reales
              │
              └─── 📊 CONTADOR (Acceso Financiero)
                   ├─ Reportes de utilidades
                   ├─ Costos reales de compra
                   ├─ Análisis de sobrantes
                   ├─ Facturación y contabilidad
                   └─ Google Sheets de contabilidad
```

---

## 📊 INTEGRACIÓN CON GOOGLE WORKSPACE

### 1. Google Sheets - Bases de Datos Manuales

**Objetivo:** Lectura y visualización mejorada de datos existentes con filtros avanzados.

#### Hojas de cálculo principales:

```
📈 NEGOCIOS_CERRADOS.xlsx
├─ Cliente
├─ Material
├─ Metros cuadrados
├─ Precio total
├─ Fecha de venta
├─ Vendedor
└─ Estado (entregado/pendiente)

💰 COSTOS_UTILIDADES.xlsx
├─ Material
├─ Precio de compra
├─ Precio de venta
├─ Utilidad bruta
├─ Margen %
└─ Fecha de transacción

🧩 SOBRANTES_MATERIAL.xlsx
├─ Material
├─ Color
├─ Dimensiones (largo x ancho en cm)
├─ Metros cuadrados
├─ Ubicación en bodega
├─ Costo original
├─ Precio sugerido de venta
└─ Estado (disponible/reservado/vendido)
```

#### Funcionalidades del Admin:

- **Visualización mejorada:** Tablas interactivas con búsqueda y filtros
- **Filtros inteligentes:**
  - Por rango de fechas
  - Por material/color
  - Por vendedor
  - Por estado
  - Por rango de utilidad
- **Sincronización automática:** Lectura cada 5 minutos vía Google Sheets API
- **Recomendaciones de sobrantes:** Si una cotización coincide con medidas de sobrantes disponibles

---

### 2. Google Calendar - Gestión de Agenda

**Objetivo:** Visualización de agenda de instalaciones y entregas.

#### Eventos sincronizados:

```
📅 CALENDARIO_INSTALACIONES
├─ Fecha y hora de instalación
├─ Cliente
├─ Dirección
├─ Material contratado
├─ Vendedor responsable
└─ Estado (confirmado/completado/cancelado)

🚚 CALENDARIO_ENTREGAS
├─ Fecha de entrega de material
├─ Proveedor
├─ Material esperado
└─ Responsable de recepción
```

#### Integración con Agente N8N:

- Actualización automática de eventos desde WhatsApp
- Recordatorios automáticos 24h antes
- Componente SSR (Server-Side Rendering) para mostrar calendario en tiempo real

---

### 3. Google Drive - Documentación Centralizada

**Objetivo:** Almacenamiento y gestión de documentos críticos del negocio.

#### Estructura de carpetas:

```
📁 MARMOLES_DELUXE_DRIVE/
│
├─── 📂 CONTRATOS/
│    ├─ Cliente_NombreCompleto_FechaContrato.pdf
│    └─ ...
│
├─── 📂 ORDENES_TRABAJO/
│    ├─ OT_001_Cliente_Material.pdf
│    └─ ...
│
├─── 📂 COTIZACIONES/
│    ├─ COT_2025_001_Cliente.pdf
│    └─ COT_2025_002_Cliente.pdf
│
├─── 📂 CONTABILIDAD/
│    ├─ Facturas_Emitidas/
│    ├─ Facturas_Recibidas/
│    └─ Declaraciones/
│
└─── 📂 FOTOGRAFIAS_INSTALACIONES/
     ├─ Cliente_Fecha_Before.jpg
     └─ Cliente_Fecha_After.jpg
```

#### Funcionalidades:

- **Búsqueda inteligente** por cliente, fecha, tipo de documento
- **Generación automática** de PDFs de cotización
- **Subida automática** desde el admin

---

## 🤖 AGENTE MULTIFUNCIONAL N8N

### Resumen de Capacidades

El **Agente N8N** es el puente de comunicación entre WhatsApp/Telegram y todos los sistemas de MD.

#### Funcionalidades principales:

```
🔹 COMUNICACIÓN:
├─ Respuestas automáticas 24/7
├─ Análisis de intención con IA (OpenAI)
├─ Escalamiento a agente humano cuando es necesario
└─ Multi-canal: WhatsApp + Telegram

🔹 AGENDAMIENTO:
├─ Verificación de disponibilidad en Google Calendar
├─ Creación automática de citas
├─ Recordatorios 24h y 1h antes
└─ Sincronización bidireccional con BD

🔹 COTIZACIONES:
├─ Captura de medidas y material solicitado
├─ Generación automática de PDF de cotización
├─ Envío por WhatsApp
└─ Almacenamiento en Google Drive + BD

🔹 FACTURACIÓN:
├─ Generación de factura post-instalación
├─ Envío automático por Email + WhatsApp
└─ Recordatorios de cobro (7/15/30 días)

🔹 REPORTES:
├─ Reportes diarios/semanales/mensuales
├─ Análisis de tendencias de venta
└─ NPS y satisfacción del cliente

🔹 MONITOREO:
├─ Salud del sistema
├─ Alertas de errores
└─ Uptime 99%+
```

### Integración con Admin

- **Actualización de Google Calendar:** Solo SSR (Server-Side Rendering)
- **Logs de conversaciones:** Accesibles desde el admin
- **Control manual:** Pausar/reanudar flujos desde el admin
- **Configuración:** Plantillas de respuestas editables

---

## 🧮 CALCULADORA DE COTIZACIONES (Aplicación Principal)

### Ruta de Acceso

```
https://admin.marmolesdeluxe.com/calculadora
```

### Objetivo

Generar cotizaciones precisas para clientes mostrando:

- **Al cliente:** Precio final de venta
- **Al vendedor:** Precio mínimo negociable, utilidad esperada, margen de negociación
- **Al contador:** Costo real de compra, utilidad bruta, margen porcentual

---

### 📊 ESTRUCTURA DE PRECIOS POR MATERIAL

#### 1. Piedra Sinterizada - Marca ALTEA

```json
{
  "material": "Piedra Sinterizada",
  "marca": "Altea",
  "precio_venta_publico": 960000,
  "precio_minimo_venta": 900000,
  "costo_compra": 487000,
  "unidad": "metro lineal instalado",
  "incluye": [
    "Hueco brillado lavaplatos",
    "Hueco de horno",
    "Llave y jabonera",
    "Salpicadero 7cm",
    "Faldón 4cm",
    "Transporte (solo Cali)"
  ],
  "margen_utilidad_publico": "97%",
  "margen_utilidad_minimo": "85%"
}
```

#### 2. Quartzstone - Blanco Polar (Producto Estrella)

```json
{
  "material": "Quartzstone",
  "color": "Blanco Polar",
  "precio_venta_publico": 650000,
  "precio_minimo_venta": 550000,
  "costo_compra": 125000,
  "unidad": "metro cuadrado",
  "stock_bodega": true,
  "margen_utilidad_publico": "420%",
  "margen_utilidad_minimo": "340%",
  "nota": "Stock en bodega - Venta prioritaria"
}
```

#### 3. Quartzstone - Otros Colores

```json
{
  "material": "Quartzstone",
  "color": "Otros colores",
  "precio_venta_publico": 750000,
  "precio_minimo_venta": 700000,
  "costo_compra": null,
  "unidad": "metro cuadrado",
  "stock_bodega": false,
  "margen_utilidad_publico": "variable",
  "margen_utilidad_minimo": "variable",
  "nota": "Pedido bajo demanda"
}
```

#### 4. Piedra Sinterizada - Dekton

```json
{
  "material": "Piedra Sinterizada",
  "marca": "Dekton",
  "precio_venta_publico": null,
  "precio_minimo_venta": null,
  "costo_compra": null,
  "unidad": "metro cuadrado",
  "requiere_configuracion": true,
  "nota": "Precio debe ser ingresado manualmente por admin"
}
```

#### 5. Piedra Sinterizada - Silestone

```json
{
  "material": "Piedra Sinterizada",
  "marca": "Silestone",
  "precio_venta_publico": null,
  "precio_minimo_venta": null,
  "costo_compra": null,
  "unidad": "metro cuadrado",
  "requiere_configuracion": true,
  "nota": "Precio debe ser ingresado manualmente por admin"
}
```

#### 6. Granitos Naturales

```json
{
  "material": "Granito Natural",
  "marca": "Diversos",
  "precio_venta_publico": null,
  "precio_minimo_venta": null,
  "costo_compra": null,
  "unidad": "metro cuadrado",
  "requiere_configuracion": true,
  "nota": "Precio varía según proveedor y color"
}
```

#### 7. Mármoles

```json
{
  "material": "Mármol",
  "marca": "Diversos",
  "precio_venta_publico": null,
  "precio_minimo_venta": null,
  "costo_compra": null,
  "unidad": "metro cuadrado",
  "requiere_configuracion": true,
  "nota": "Material natural sin garantía"
}
```

---

### 🔧 FUNCIONALIDADES DE LA CALCULADORA

#### Paso 1: Selección de Material

```
Usuario selecciona:
├─ Tipo de material (dropdown)
├─ Marca (si aplica)
└─ Color (si aplica)

Sistema muestra:
├─ Precio público sugerido
├─ Si hay stock en bodega
└─ Tiempos de entrega estimados
```

#### Paso 2: Ingreso de Medidas

```
Usuario ingresa:
├─ Metros lineales o cuadrados
├─ Cantidad de huecos (lavaplatos, horno, llave)
├─ Largo de salpicadero (cm)
├─ Largo de faldón (cm)
└─ Ubicación de instalación (dentro/fuera de Cali)

Sistema calcula:
├─ Superficie total
├─ Costo de transporte (si aplica)
└─ Complejidad de instalación
```

#### Paso 3: Configuración de Precios (Solo si material no tiene precio)

```
Admin/Contador ingresa:
├─ Costo de compra (COP/m²)
├─ Precio sugerido de venta (COP/m²)
└─ Precio mínimo de venta (COP/m²)

Sistema:
├─ Almacena en base de datos
├─ Asocia a material específico
└─ Permite edición posterior
```

#### Paso 4: Resultados

**Vista para el Cliente:**

```
╔════════════════════════════════════════╗
║   COTIZACIÓN MÁRMOLES DELUXE          ║
╠════════════════════════════════════════╣
║ Material: Blanco Polar Quartzstone    ║
║ Superficie: 3.5 m²                    ║
║ Incluye:                              ║
║   ✓ Instalación                       ║
║   ✓ Huecos lavaplatos y horno         ║
║   ✓ Salpicadero 7cm                   ║
║   ✓ Faldón 4cm                        ║
║   ✓ Transporte en Cali                ║
║                                        ║
║ PRECIO TOTAL: $2,275,000 COP          ║
╚════════════════════════════════════════╝
```

**Vista para el Vendedor:**

```
╔════════════════════════════════════════╗
║   INFORMACIÓN PARA NEGOCIACIÓN        ║
╠════════════════════════════════════════╣
║ Precio Público: $2,275,000            ║
║ Precio Mínimo: $1,925,000             ║
║ Rango negociable: $350,000            ║
║                                        ║
║ Utilidad esperada: $1,837,500         ║
║ Margen de utilidad: 420%              ║
║                                        ║
║ 💡 RECOMENDACIÓN:                     ║
║ Iniciar en $2,100,000                 ║
║ No bajar de $1,925,000                ║
╚════════════════════════════════════════╝
```

**Vista para el Contador:**

```
╔════════════════════════════════════════╗
║   ANÁLISIS FINANCIERO                 ║
╠════════════════════════════════════════╣
║ Precio de Venta: $2,275,000           ║
║ Costo de Compra: $437,500             ║
║ Utilidad Bruta: $1,837,500            ║
║ Margen Bruto: 420%                    ║
║                                        ║
║ Costo por m²: $125,000                ║
║ Venta por m²: $650,000                ║
║                                        ║
║ En precio mínimo ($1,925,000):        ║
║ Utilidad: $1,487,500                  ║
║ Margen: 340%                          ║
╚════════════════════════════════════════╝
```

---

### 🧩 RECOMENDACIÓN DE SOBRANTES

#### Lógica de Recomendación

Cuando un cliente solicita una cotización, el sistema verifica si hay sobrantes que coincidan:

```javascript
// Ejemplo de lógica
function verificarSobrantes(materialSolicitado, metrosCuadrados) {
  const sobrantes = obtenerSobrantesDisponibles(materialSolicitado);

  const coincidencias = sobrantes.filter((sobrante) => {
    return (
      sobrante.metrosCuadrados >= metrosCuadrados &&
      sobrante.estado === "disponible"
    );
  });

  if (coincidencias.length > 0) {
    return {
      recomendacion: true,
      mensaje: `¡Tenemos ${coincidencias.length} sobrante(s) que sirven para este proyecto!`,
      opciones: coincidencias.map((s) => ({
        codigo: s.codigo,
        dimensiones: `${s.largo}cm x ${s.ancho}cm`,
        precioDescuento: s.precioSugerido * 0.85, // 15% descuento
        utilidadAdicional: calcularUtilidad(
          s.costoOriginal,
          s.precioSugerido * 0.85
        ),
      })),
    };
  }

  return { recomendacion: false };
}
```

**Ventaja:** Las ventas de sobrantes generan **utilidades considerables** al aprovechar material que ya fue pagado.

---

## 📄 GENERACIÓN DE PDF DE COTIZACIÓN

### Flujo Completo

```
1. Usuario completa calculadora
   ↓
2. Sistema genera objeto JSON con todos los datos
   ↓
3. JSON se envía a Google Docs API
   ↓
4. Se crea documento desde plantilla Word
   ↓
5. Se rellenan campos dinámicos
   ↓
6. Se convierte a PDF
   ↓
7. Se almacena en Google Drive
   ↓
8. Se envía por WhatsApp vía Agente N8N
   ↓
9. Se guarda registro en BD (para historial)
```

---

### 🎨 ESTRUCTURA DEL JSON PARA COTIZACIÓN

#### JSON Completo (Ejemplo Real)

```json
{
  "cliente": {
    "nombre": "HERNANDO VILLEGAS",
    "identificacion": "16.123.456",
    "telefono": "+57 300 123 4567",
    "direccion": "Carrera 100 #15-25, Barrio Ciudad Jardín",
    "ciudad": "Cali",
    "email": "hernando.villegas@email.com"
  },

  "cotizacion": {
    "fecha": "21-11-2025",
    "numero": "COT-2025-089",
    "validez_dias": 15,
    "anticipo_porcentaje": 60,
    "pago_restante_porcentaje": 40,
    "tiempo_entrega_dias": 5
  },

  "proyecto": {
    "material": "Quartzstone Blanco Polar",
    "color": "Blanco Polar",
    "marca": "Quartzstone",
    "metros_cuadrados": 2,
    "espesor": "2 cm",
    "precio_por_m2": 650000,
    "acabado_borde": "Brillado",
    "metros_borde": 0,
    "precio_borde_metro": 0,
    "cortes_especiales": 3,
    "precio_por_corte": 0,
    "incluye_transporte": true,
    "precio_transporte": 0,
    "incluye_instalacion": true,
    "precio_instalacion_m2": 0
  },

  "calculos": {
    "subtotal_material": 1300000,
    "subtotal_cortes": 0,
    "subtotal_borde": 0,
    "subtotal_instalacion": 0,
    "subtotal_transporte": 0,
    "total_general": 1380000
  },

  "detalles": [
    {
      "concepto": "Suministro, corte y transformación Quartzstone Blanco Polar (2 m²)",
      "valor": 1300000
    },
    {
      "concepto": "Hueco brillado lavaplatos",
      "valor": 0
    },
    {
      "concepto": "Hueco de horno",
      "valor": 0
    },
    {
      "concepto": "Huecos para llave y jabonera",
      "valor": 0
    },
    {
      "concepto": "Salpicadero 7 cm",
      "valor": 0
    },
    {
      "concepto": "Faldón 4 cm",
      "valor": 0
    },
    {
      "concepto": "Transporte incluido (Cali)",
      "valor": 0
    },
    {
      "concepto": "Instalación profesional",
      "valor": 80000
    }
  ],

  "observaciones": [
    "El lavaplatos se entrega pegado al mesón.",
    "La estufa, grifería, lavaplatos y demás accesorios los suministra el cliente.",
    "La superficie donde se instalará el mesón debe estar a nivel.",
    "No se realizan trabajos eléctricos, de plomería ni de gas."
  ],

  "garantia": {
    "instalacion": "Todos nuestros servicios de instalación cuentan con una garantía de 1 año por mano de obra, contados a partir de la fecha de entrega a satisfacción.",
    "materiales_marmol_granito": "Mármol, granito natural y quartzstone no cuentan con garantía, dado que son materiales naturales o compuestos sin respaldo de fábrica frente a rayones, manchas o desgaste.",
    "materiales_sinterizada": "Las piedras sinterizadas cuentan con garantía de 10 años contra manchas y rayones, siempre y cuando se cumplan las recomendaciones de uso indicadas."
  },

  "recomendaciones_uso": {
    "limpieza_diaria": "Limpie diariamente con agua, jabón neutro y un paño suave. No use productos abrasivos ni esponjas de alambre.",
    "proteccion_manchas": "Limpie de inmediato derrames de café, vino, aceites y jugos ácidos para evitar manchas permanentes.",
    "cuidados_generales": [
      "Use tablas de cortar. No corte directamente sobre la superficie.",
      "Coloque soportes o bases para ollas calientes. Evite el contacto directo con temperaturas superiores a 150°C.",
      "No se pare sobre la piedra ni coloque peso excesivo en áreas no soportadas."
    ],
    "mantenimiento_anual": "Para mármoles y granitos naturales, aplique sellador cada 12 meses para proteger contra manchas.",
    "cuidados_sinterizada": [
      "Resistente a rayones, manchas y calor hasta 300°C.",
      "No requiere sellado periódico.",
      "Evite golpes fuertes en los bordes para prevenir astillado."
    ]
  },

  "vendedor": {
    "nombre": "Miguel Ángel Vélez López",
    "cargo": "Representante de Ventas",
    "empresa": "Mármoles Deluxe",
    "telefono": "+57 318 123 4567",
    "email": "ventas@marmolesdeluxe.com"
  },

  "empresa": {
    "nombre": "Mármoles Deluxe",
    "nit": "900.123.456-7",
    "direccion": "Calle 5 #38-25, Barrio San Fernando",
    "ciudad": "Cali",
    "telefono": "+57 2 123 4567",
    "whatsapp": "+57 318 123 4567",
    "email": "info@marmolesdeluxe.com",
    "web": "www.marmolesdeluxe.com",
    "instagram": "@marmolesdeluxe",
    "facebook": "Mármoles Deluxe Cali"
  }
}
```

---

### 🚀 ENVÍO AUTOMÁTICO POR WHATSAPP

Una vez generado el PDF:

```
1. PDF se carga a Google Drive
2. Se obtiene URL pública temporal (24h)
3. Agente N8N recibe:
   - Número de WhatsApp del cliente
   - URL del PDF
   - Mensaje personalizado
4. Envía mensaje:

   "¡Hola HERNANDO! 👋

   Tu cotización está lista 📋

   Material: Quartzstone Blanco Polar
   Total: $1,380,000 COP

   Descarga tu cotización aquí:
   [LINK_PDF]

   Validez: 15 días
   Anticipo: 60% ($828,000)
   Saldo: 40% ($552,000)

   ¿Tienes alguna pregunta? 😊"

5. Cliente descarga PDF directamente desde WhatsApp
```

---

## 💾 ALMACENAMIENTO DE COTIZACIONES (Historial)

### Base de Datos PostgreSQL/Supabase

```sql
CREATE TABLE cotizaciones (
  id SERIAL PRIMARY KEY,
  numero_cotizacion VARCHAR(50) UNIQUE NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW(),

  -- Cliente
  cliente_nombre VARCHAR(255),
  cliente_telefono VARCHAR(20),
  cliente_email VARCHAR(255),

  -- Proyecto
  material VARCHAR(100),
  marca VARCHAR(100),
  color VARCHAR(100),
  metros_cuadrados DECIMAL(10,2),

  -- Precios
  precio_unitario DECIMAL(10,2),
  total_general DECIMAL(10,2),

  -- Utilidad (solo visible para contador/admin)
  costo_compra DECIMAL(10,2),
  utilidad_bruta DECIMAL(10,2),
  margen_porcentual DECIMAL(5,2),

  -- Estado
  estado VARCHAR(50) DEFAULT 'enviada', -- enviada, aceptada, rechazada, negociando

  -- Vendedor
  vendedor_id INT REFERENCES usuarios(id),

  -- Archivos
  pdf_url TEXT,
  drive_file_id VARCHAR(255),

  -- JSON completo
  datos_json JSONB,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_cotizaciones_cliente ON cotizaciones(cliente_nombre);
CREATE INDEX idx_cotizaciones_fecha ON cotizaciones(fecha_creacion DESC);
CREATE INDEX idx_cotizaciones_vendedor ON cotizaciones(vendedor_id);
CREATE INDEX idx_cotizaciones_estado ON cotizaciones(estado);
CREATE INDEX idx_cotizaciones_material ON cotizaciones(material);
```

### Funcionalidades de Historial

```
BÚSQUEDA Y FILTROS:
├─ Por cliente (nombre, teléfono)
├─ Por vendedor
├─ Por rango de fechas
├─ Por material
├─ Por estado (enviada, aceptada, rechazada)
└─ Por rango de monto

ACCIONES:
├─ Ver detalles completos
├─ Descargar PDF original
├─ Re-enviar por WhatsApp
├─ Duplicar y editar
├─ Convertir en orden de trabajo
└─ Marcar como negocio cerrado

REPORTES:
├─ Tasa de conversión (enviadas → aceptadas)
├─ Tiempo promedio de respuesta
├─ Material más cotizado
├─ Vendedor con mayor conversión
└─ Utilidad promedio por cotización
```

---

## 🎨 RUTAS DEL NUEVO REPOSITORIO

### Estructura Propuesta para `admin.marmolesdeluxe.com`

```
/
├─ /login                    → Autenticación de usuarios
├─ /dashboard                → Panel principal
│
├─ /calculadora              → 🎯 Calculadora de cotizaciones (APP PRINCIPAL)
│   ├─ /nueva-cotizacion
│   ├─ /historial
│   └─ /configurar-precios
│
├─ /negocios
│   ├─ /cerrados             → Visualización de Google Sheet
│   ├─ /en-proceso
│   └─ /perdidos
│
├─ /materiales
│   ├─ /sobrantes            → Gestión de sobrantes
│   ├─ /inventario
│   └─ /proveedores
│
├─ /finanzas
│   ├─ /utilidades           → Solo contador/admin
│   ├─ /costos
│   └─ /reportes
│
├─ /calendario               → Integración Google Calendar (SSR)
│   ├─ /instalaciones
│   └─ /entregas
│
├─ /documentos               → Integración Google Drive
│   ├─ /contratos
│   ├─ /cotizaciones
│   ├─ /ordenes-trabajo
│   └─ /facturas
│
├─ /agente-n8n               → Control del agente
│   ├─ /conversaciones
│   ├─ /configuracion
│   └─ /estadisticas
│
└─ /configuracion
    ├─ /usuarios
    ├─ /precios-maestros
    └─ /integraciones
```

---

## 🔐 SEGURIDAD Y PERMISOS

### Matriz de Permisos

| Ruta/Funcionalidad              | Admin | Vendedor        | Contador     |
| ------------------------------- | ----- | --------------- | ------------ |
| **Calculadora - Nueva**         | ✅    | ✅              | ✅           |
| **Calculadora - Ver historial** | ✅    | ✅ (solo suyas) | ✅           |
| **Calculadora - Ver costos**    | ✅    | ❌              | ✅           |
| **Calculadora - Configurar**    | ✅    | ❌              | ✅           |
| **Negocios Cerrados**           | ✅    | ✅ (lectura)    | ✅           |
| **Sobrantes**                   | ✅    | ✅              | ✅           |
| **Utilidades**                  | ✅    | ❌              | ✅           |
| **Costos Reales**               | ✅    | ❌              | ✅           |
| **Google Drive**                | ✅    | ✅ (lectura)    | ✅           |
| **Google Calendar**             | ✅    | ✅ (lectura)    | ✅ (lectura) |
| **Agente N8N - Control**        | ✅    | ❌              | ❌           |
| **Agente N8N - Ver logs**       | ✅    | ✅              | ✅           |
| **Usuarios**                    | ✅    | ❌              | ❌           |
| **Precios Maestros**            | ✅    | ❌              | ✅           |

---

## 🎯 EXPERIENCIA DEL USUARIO FINAL (Cliente)

### Flujo de Interacción con MD

```
1. Cliente contacta vía WhatsApp
   ↓
2. Agente N8N responde automáticamente
   ↓
3. Captura información: material, medidas, ubicación
   ↓
4. Vendedor recibe notificación
   ↓
5. Vendedor usa calculadora en admin.marmolesdeluxe.com
   ↓
6. Genera cotización personalizada
   ↓
7. PDF se envía automáticamente por WhatsApp
   ↓
8. Cliente recibe cotización en < 10 minutos
   ↓
9. Cliente acepta/negocia
   ↓
10. Vendedor agenda instalación en Calendar
    ↓
11. Cliente recibe recordatorio 24h antes
    ↓
12. Instalación completada
    ↓
13. Factura automática generada y enviada
    ↓
14. Encuesta de satisfacción (NPS)
    ↓
15. Registro en "Negocios Cerrados"
```

### Ventajas Competitivas

✅ **Respuesta en < 10 minutos** (vs 2-3 horas de competencia)  
✅ **Cotización profesional en PDF** (vs mensaje de texto simple)  
✅ **Transparencia en servicios incluidos**  
✅ **Seguimiento automatizado**  
✅ **Recordatorios de citas**  
✅ **Facturación inmediata**  
✅ **Recomendaciones de sobrantes** (ahorro para el cliente)

---

## 📊 MÉTRICAS Y REPORTES

### KPIs del Negocio

```
📈 VENTAS:
├─ Total de cotizaciones enviadas/mes
├─ Tasa de conversión (cotizaciones → negocios cerrados)
├─ Ticket promedio
├─ Material más vendido
└─ Vendedor con mayor conversión

💰 FINANCIERO:
├─ Utilidad bruta/mes
├─ Margen promedio por venta
├─ Utilidad por vendedor
├─ ROI por material
└─ Utilidad de sobrantes vendidos

⚡ OPERATIVO:
├─ Tiempo promedio de respuesta (meta: < 10 min)
├─ Citas completadas vs canceladas
├─ Tiempo de instalación promedio
└─ Uptime del Agente N8N (meta: 99%)

😊 SATISFACCIÓN:
├─ NPS (Net Promoter Score)
├─ CSAT (Customer Satisfaction Score)
├─ Quejas/reclamos
└─ Reseñas positivas
```

### Reportes Automatizados

```
DIARIOS (via Email a Admin):
├─ Cotizaciones enviadas hoy
├─ Negocios cerrados hoy
└─ Alertas de sistema

SEMANALES (via Email a Admin + Contador):
├─ Resumen de ventas
├─ Utilidades de la semana
├─ Top 3 materiales vendidos
└─ Conversión por vendedor

MENSUALES (PDF + Google Sheets):
├─ Informe financiero completo
├─ Análisis de tendencias
├─ Proyección del siguiente mes
└─ Recomendaciones de inventario
```

---

## 🛠️ STACK TECNOLÓGICO RECOMENDADO

### Frontend (Admin)

```
Framework: Next.js 14 (App Router)
├─ TypeScript
├─ Tailwind CSS
├─ Shadcn/ui (componentes)
└─ React Hook Form + Zod (validación)

Estado Global:
├─ Zustand (para UI state)
└─ TanStack Query (para server state)

Autenticación:
└─ NextAuth.js + JWT
```

### Backend

```
API: Next.js API Routes
├─ Serverless functions
└─ Edge functions (para respuestas rápidas)

Base de Datos:
├─ Supabase (PostgreSQL)
└─ Prisma ORM

Storage:
└─ Google Drive API (documentos)
```

### Integraciones

```
Google Workspace:
├─ Google Sheets API v4
├─ Google Calendar API v3
├─ Google Drive API v3
└─ Google Docs API v1 (generación de PDFs)

Comunicación:
├─ WhatsApp Business API (Meta)
└─ n8n webhooks

IA:
└─ OpenAI GPT-4 (análisis de intención en Agente)
```

### DevOps

```
Hosting:
└─ Vercel (Next.js)

CI/CD:
└─ GitHub Actions

Monitoreo:
├─ Vercel Analytics
└─ Sentry (error tracking)

Dominio:
└─ admin.marmolesdeluxe.com (subdomain)
```

---

## 🚀 ROADMAP DE IMPLEMENTACIÓN

### Fase 1: MVP (4-6 semanas)

```
✅ Semana 1-2:
├─ Setup del proyecto Next.js
├─ Autenticación con roles (Admin, Vendedor, Contador)
├─ Integración con Supabase
└─ Diseño UI/UX básico

✅ Semana 3-4:
├─ Calculadora de cotizaciones (funcionalidad core)
├─ Configuración de precios maestros
├─ Generación de JSON para PDF
└─ Integración con Google Sheets (lectura)

✅ Semana 5-6:
├─ Generación de PDF vía Google Docs API
├─ Integración con Agente N8N (envío WhatsApp)
├─ Historial de cotizaciones
└─ Testing y correcciones
```

### Fase 2: Expansión (4-6 semanas)

```
✅ Semana 7-8:
├─ Visualización de Negocios Cerrados (Google Sheets)
├─ Gestión de sobrantes
├─ Recomendaciones automáticas de sobrantes
└─ Dashboard de métricas básicas

✅ Semana 9-10:
├─ Integración Google Calendar (SSR)
├─ Integración Google Drive (navegación de documentos)
├─ Reportes automáticos semanales/mensuales
└─ Panel de control del Agente N8N

✅ Semana 11-12:
├─ Refinamiento de permisos por rol
├─ Optimización de performance
├─ Documentación completa
└─ Capacitación de usuarios
```

### Fase 3: Optimización (2-4 semanas)

```
✅ Semana 13-14:
├─ Análisis de métricas de uso
├─ Optimización de flujos
├─ Mejoras UX basadas en feedback
└─ Automatizaciones adicionales

✅ Semana 15-16:
├─ Auditoría de seguridad
├─ Testing de carga
├─ Backup y recuperación
└─ Plan de contingencia
```

---

## 📞 CASOS DE USO DETALLADOS

### Caso 1: Vendedor Genera Cotización

```
1. Vendedor inicia sesión en admin.marmolesdeluxe.com
2. Navega a /calculadora/nueva-cotizacion
3. Completa formulario:
   - Cliente: HERNANDO VILLEGAS, +57 300 123 4567
   - Material: Quartzstone Blanco Polar
   - Metros cuadrados: 2
   - Ubicación: Cali
4. Sistema calcula automáticamente:
   - Precio público: $1,380,000
   - Precio mínimo: $1,150,000
   - Utilidad: $1,130,000 (oculta para vendedor)
5. Vendedor revisa y confirma
6. Sistema:
   - Genera JSON
   - Crea PDF vía Google Docs
   - Almacena en Drive
   - Envía por WhatsApp vía n8n
   - Guarda en BD
7. Vendedor recibe confirmación
8. Cliente recibe PDF en WhatsApp en < 2 minutos
```

### Caso 2: Contador Analiza Utilidades

```
1. Contador inicia sesión
2. Navega a /finanzas/utilidades
3. Selecciona rango de fechas: Noviembre 2025
4. Sistema muestra:
   - Total vendido: $45,800,000
   - Costo de compra: $12,300,000
   - Utilidad bruta: $33,500,000
   - Margen promedio: 272%
5. Contador exporta a Excel
6. Revisa detalles por material:
   - Blanco Polar: 15 ventas, $18,750,000, margen 420%
   - Altea: 8 ventas, $12,800,000, margen 97%
   - Sobrantes: 5 ventas, $4,250,000, margen 680%
7. Genera informe mensual para gerencia
```

### Caso 3: Admin Configura Nuevo Material (Dekton)

```
1. Admin recibe solicitud de cotización de Dekton (sin precio)
2. Navega a /calculadora/configurar-precios
3. Clic en "Agregar Nuevo Material"
4. Completa:
   - Material: Piedra Sinterizada
   - Marca: Dekton
   - Color: Aura 15
   - Costo de compra: $850,000/m²
   - Precio sugerido: $1,700,000/m²
   - Precio mínimo: $1,500,000/m²
5. Sistema guarda en BD
6. Vendedor puede ahora cotizar Dekton Aura 15
7. Sistema calcula automáticamente utilidades
```

### Caso 4: Sistema Recomienda Sobrante

```
1. Cliente solicita 1.5 m² de Quartzstone gris
2. Vendedor ingresa datos en calculadora
3. Sistema detecta sobrante disponible:
   - Material: Quartzstone Gris London
   - Dimensiones: 200cm x 80cm = 1.6 m²
   - Ubicación: Bodega A-12
   - Precio original: $750,000/m² → $1,200,000
   - Precio sobrante: $550,000/m² → $880,000
4. Sistema muestra alerta:
   "💡 ¡Tenemos un sobrante que sirve!
   Ahorro para el cliente: $320,000 (27%)
   Utilidad para MD: $755,000"
5. Vendedor ofrece al cliente:
   - Opción A: Material nuevo $1,200,000
   - Opción B: Sobrante $880,000 (ahorro $320,000)
6. Cliente elige Opción B
7. Sistema marca sobrante como "vendido"
8. Todos ganan:
   - Cliente ahorra 27%
   - MD vende material que estaba parado
   - Utilidad excepcional (680% margen)
```

---

## 💡 INNOVACIONES Y VENTAJAS COMPETITIVAS

### Lo que hace único a este sistema:

1. **Velocidad de respuesta:** Cotización en < 10 minutos vs 2-3 horas de competencia
2. **Recomendaciones inteligentes:** Sistema sugiere sobrantes automáticamente
3. **Transparencia controlada:** Cliente ve precio final, vendedor ve margen de negociación, contador ve todo
4. **Omnicanalidad:** WhatsApp + Email + Admin web
5. **Automatización completa:** Desde consulta hasta factura sin intervención manual
6. **Aprendizaje continuo:** Sistema aprende de cotizaciones exitosas
7. **Integración total:** Google Workspace + WhatsApp + BD propia

---

## 📋 CHECKLIST PRE-DESARROLLO

Antes de iniciar el desarrollo del nuevo repositorio, asegúrate de tener:

### Credenciales y Accesos

```
☐ Cuenta de Google Workspace activa
☐ API Keys de Google (Sheets, Calendar, Drive, Docs)
☐ Cuenta de WhatsApp Business API
☐ Cuenta de Supabase (o PostgreSQL local)
☐ Dominio admin.marmolesdeluxe.com configurado
☐ Acceso a n8n (instancia activa)
☐ Credenciales de OpenAI (para IA del agente)
```

### Datos y Documentos

```
☐ Plantilla Word de cotización (formato actual)
☐ Logos y branding de Mármoles Deluxe
☐ Lista completa de materiales y precios actuales
☐ Google Sheet de Negocios Cerrados (ID y permisos)
☐ Google Sheet de Sobrantes (ID y permisos)
☐ Google Sheet de Utilidades (ID y permisos)
☐ Google Calendar ID para instalaciones
☐ Carpeta de Google Drive (ID y permisos)
```

### Información del Negocio

```
☐ NIT de Mármoles Deluxe
☐ Dirección completa
☐ Teléfonos de contacto
☐ Emails corporativos
☐ Redes sociales (Instagram, Facebook)
☐ Datos de vendedores (nombre, email, teléfono)
☐ Políticas de garantía actualizadas
☐ Términos y condiciones
```

---

## 🎓 CAPACITACIÓN REQUERIDA

### Para Vendedores (2-3 horas)

```
Módulo 1: Acceso y navegación (30 min)
├─ Login y seguridad
├─ Dashboard principal
└─ Navegación entre secciones

Módulo 2: Calculadora de cotizaciones (90 min)
├─ Ingreso de datos del cliente
├─ Selección de material y medidas
├─ Interpretación de precios sugeridos y mínimos
├─ Generación de PDF
└─ Envío por WhatsApp

Módulo 3: Herramientas adicionales (30 min)
├─ Consulta de historial
├─ Verificación de sobrantes
├─ Agenda de instalaciones
└─ Preguntas frecuentes
```

### Para Contador (1-2 horas)

```
Módulo 1: Análisis financiero (60 min)
├─ Visualización de costos reales
├─ Reportes de utilidades
├─ Exportación de datos
└─ Interpretación de márgenes

Módulo 2: Configuración de precios (30 min)
├─ Agregar nuevos materiales
├─ Actualizar costos de compra
└─ Definir precios sugeridos y mínimos
```

### Para Admin (3-4 horas)

```
Módulo 1: Gestión completa (120 min)
├─ Administración de usuarios
├─ Configuración de integraciones
├─ Control del Agente N8N
└─ Mantenimiento de Google Workspace

Módulo 2: Monitoreo y reportes (60 min)
├─ Dashboard de métricas
├─ Análisis de conversión
├─ Optimización de procesos
└─ Troubleshooting común
```

---

## 🔧 TROUBLESHOOTING COMÚN

### Problema: PDF no se genera

```
Posibles causas:
├─ Google Docs API sin permisos
├─ Plantilla Word no encontrada
├─ JSON con campos faltantes
└─ Límite de cuota de API excedido

Solución:
1. Verificar permisos en Google Cloud Console
2. Validar ID de plantilla en Drive
3. Revisar logs de error en /api/generar-pdf
4. Revisar cuota diaria de API
```

### Problema: WhatsApp no envía cotización

```
Posibles causas:
├─ Agente N8N desconectado
├─ Webhook no configurado
├─ Número de WhatsApp inválido
└─ Meta Business API suspendida

Solución:
1. Verificar estado de n8n en /agente-n8n
2. Revisar logs de webhook
3. Validar formato de número (+57...)
4. Verificar estado de cuenta en Meta Business
```

### Problema: Sobrantes no se muestran

```
Posibles causas:
├─ Google Sheet sin permisos de lectura
├─ Estructura de Sheet modificada
└─ Cache desactualizado

Solución:
1. Verificar permisos del Sheet
2. Validar nombres de columnas
3. Forzar recarga con Ctrl+F5
```

---

## 📊 ESTIMACIÓN DE COSTOS OPERATIVOS

### Costos Mensuales del Sistema Admin

```
INFRAESTRUCTURA:
├─ Vercel Pro: $20 USD
├─ Supabase Pro: $25 USD
├─ Google Workspace APIs: $10-30 USD (según uso)
├─ WhatsApp Business API: $30-50 USD
└─ Dominio SSL: $2 USD
SUBTOTAL: ~$87-127 USD/mes

SERVICIOS OPCIONALES:
├─ OpenAI API (IA): $20-50 USD
├─ Sentry (monitoring): $0 (free tier)
└─ Backups adicionales: $5-10 USD
SUBTOTAL: ~$25-60 USD/mes

TOTAL MENSUAL: ~$112-187 USD (~$450,000-750,000 COP)
```

### ROI Esperado

```
Con 10 cotizaciones/mes convertidas en venta:
├─ Utilidad promedio por venta: $1,500,000
├─ Total utilidad/mes: $15,000,000
├─ Costo del sistema: $750,000
├─ ROI: 1,900%
└─ El sistema se paga 20 veces cada mes
```

---

## 🎯 CONCLUSIÓN

Este documento define la **arquitectura completa** del sistema administrativo de Mármoles Deluxe, con énfasis en:

### Prioridades de Desarrollo

1. **Calculadora de Cotizaciones** (app principal)
2. Generación y envío de PDFs
3. Historial de cotizaciones
4. Integración con Google Workspace
5. Gestión de sobrantes
6. Reportes financieros
7. Control del Agente N8N

### Próximos Pasos

1. Revisar y aprobar este documento
2. Crear repositorio `admin-marmoles-deluxe`
3. Setup inicial de Next.js + Supabase
4. Implementar calculadora (Fase 1)
5. Integrar generación de PDF
6. Conectar con Agente N8N
7. Testing con usuarios reales
8. Deploy a producción

---

**Documento Creado:** 21 de Noviembre de 2025  
**Última Actualización:** 21 de Noviembre de 2025  
**Mantenido por:** Sistema de Documentación Automatizada  
**Contacto:** Johan Sebastián Castro López

---

_Este documento debe ser actualizado cada vez que se agreguen nuevos materiales, cambien precios, o se modifiquen procesos del negocio._
