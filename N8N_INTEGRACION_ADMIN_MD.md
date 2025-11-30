# 🔄 INTEGRACIÓN N8N - ADMIN MÁRMOLES DELUXE

**Proyecto:** Actualización del Agente Multifuncional N8N para Admin MD  
**Fecha de Actualización:** 21 de Noviembre de 2025  
**Versión:** 2.0  
**Estado:** Pendiente de Implementación

---

## 🎯 OBJETIVO DE LA ACTUALIZACIÓN

Conectar el **Agente Multifuncional N8N existente** con el nuevo sistema **admin.marmolesdeluxe.com** para automatizar:

1. Generación y envío de cotizaciones por WhatsApp
2. Actualización automática de Google Calendar
3. Sincronización bidireccional con la base de datos del admin
4. Notificaciones a vendedores sobre consultas de clientes
5. Seguimiento de conversiones (cotización → venta)

---

## 📋 ESTADO ACTUAL DEL AGENTE N8N

### Flujos Existentes (10 Principales)

```
✅ FLUJO_001: Gestión de Contactos
✅ FLUJO_002: Respuestas WhatsApp Automáticas
✅ FLUJO_003: Agendamiento y Recordatorios
✅ FLUJO_004: Reportes Automáticos
✅ FLUJO_005: Formularios Web
✅ FLUJO_006: Sincronización Multi-plataforma
✅ FLUJO_007: Envíos Masivos (Marketing)
✅ FLUJO_008: Facturación Automática
✅ FLUJO_009: Monitoreo de Salud del Sistema
✅ FLUJO_010: Encuestas de Satisfacción
```

### Infraestructura Actual

```
Servidor: [Especificar: Raspberry Pi 5 / VPS / DigitalOcean]
n8n Version: [Especificar versión actual]
Base de Datos: Supabase / PostgreSQL local
Conectores Activos:
  - WhatsApp Business API (Meta)
  - Gmail
  - Google Calendar
  - Google Sheets
  - OpenAI GPT-3.5/4
```

---

## 🆕 NUEVOS FLUJOS REQUERIDOS PARA ADMIN MD

### FLUJO_011: Generación de Cotizaciones desde WhatsApp

**Trigger:** Cliente solicita cotización por WhatsApp

**Proceso:**

```
1. CAPTURA DE DATOS
   ├─ Nombre del cliente
   ├─ Teléfono
   ├─ Material solicitado
   ├─ Metros cuadrados/lineales
   └─ Ubicación (Cali o fuera)

2. NOTIFICACIÓN A VENDEDOR
   ├─ Enviar alerta a vendedor de turno
   ├─ Incluir datos capturados
   └─ Link directo a /calculadora/nueva-cotizacion

3. ESPERA DE RESPUESTA
   ├─ Vendedor genera cotización en admin
   ├─ Sistema crea PDF
   └─ PDF se almacena en Google Drive

4. WEBHOOK DESDE ADMIN
   ├─ Admin envía a n8n:
   │   ├─ URL del PDF
   │   ├─ Número de WhatsApp del cliente
   │   ├─ Datos de la cotización
   │   └─ ID de cotización
   
5. ENVÍO POR WHATSAPP
   ├─ n8n descarga PDF desde Drive
   ├─ Genera mensaje personalizado
   └─ Envía a cliente

6. ALMACENAMIENTO
   ├─ Guarda conversación en BD
   └─ Actualiza estado en admin
```

**Nodos n8n Necesarios:**

```
- Webhook (recibir desde admin)
- WhatsApp Business Cloud (envío)
- Google Drive (descarga PDF)
- HTTP Request (llamadas a admin API)
- Code (JS para formateo de mensajes)
- Supabase (registro de actividad)
```

---

### FLUJO_012: Sincronización Bidireccional Admin ↔ N8N

**Objetivo:** Mantener sincronizados los datos entre el admin y n8n

**Casos de Uso:**

```
ADMIN → N8N:
├─ Nueva cotización generada
├─ Cliente agendó instalación
├─ Pago recibido
├─ Instalación completada
└─ Material agregado a inventario

N8N → ADMIN:
├─ Nueva consulta de cliente
├─ Cliente respondió a cotización
├─ Cliente confirmó instalación
└─ Cliente solicitó cambios
```

**Implementación:**

```json
{
  "nombre": "Sincronización Bidireccional",
  "triggers": [
    {
      "tipo": "webhook",
      "url": "https://n8n.tudominio.com/webhook/admin-md",
      "metodo": "POST",
      "autenticacion": "Bearer Token"
    },
    {
      "tipo": "polling",
      "intervalo": "5 minutos",
      "endpoint": "https://admin.marmolesdeluxe.com/api/n8n/sync"
    }
  ],
  "acciones": [
    "Actualizar base de datos Supabase",
    "Enviar notificación WhatsApp",
    "Actualizar Google Calendar",
    "Registrar en logs"
  ]
}
```

---

### FLUJO_013: Recomendación Inteligente de Sobrantes

**Trigger:** Cliente solicita material específico

**Proceso:**

```
1. CAPTURA DE REQUERIMIENTO
   ├─ Material solicitado
   ├─ Dimensiones aproximadas
   └─ Presupuesto (opcional)

2. CONSULTA A ADMIN API
   ├─ GET /api/sobrantes/buscar
   ├─ Parámetros: material, dimensiones
   └─ Respuesta: lista de sobrantes disponibles

3. ANÁLISIS CON IA (OpenAI)
   ├─ Comparar requerimiento vs sobrantes
   ├─ Calcular compatibilidad
   └─ Generar recomendación

4. RESPUESTA AL CLIENTE
   ├─ SI hay sobrantes compatibles:
   │   ├─ "¡Tenemos material que te sirve en stock! 🎯"
   │   ├─ "Dimensiones: 200cm x 80cm"
   │   ├─ "Precio: $880,000 (vs $1,200,000 nuevo)"
   │   └─ "Ahorro: $320,000 (27%)"
   │
   └─ SI NO hay sobrantes:
       └─ "Cotizamos con material nuevo, te envío el presupuesto"

5. NOTIFICACIÓN A VENDEDOR
   └─ "Cliente interesado en [material], hay sobrante disponible"
```

**Nodos n8n:**

```
- WhatsApp Trigger
- HTTP Request (API admin)
- OpenAI (análisis de compatibilidad)
- IF (condición: sobrantes disponibles)
- WhatsApp Send
- Supabase (log de recomendaciones)
```

---

### FLUJO_014: Actualización Automática de Google Calendar

**Trigger:** Desde admin se agenda una instalación

**Proceso:**

```
1. WEBHOOK DESDE ADMIN
   Payload:
   {
     "evento": "nueva_instalacion",
     "cliente": "HERNANDO VILLEGAS",
     "telefono": "+57 300 123 4567",
     "fecha": "2025-11-25T09:00:00",
     "direccion": "Carrera 100 #15-25, Cali",
     "material": "Blanco Polar 2m²",
     "vendedor": "Miguel Ángel Vélez",
     "cotizacion_id": "COT-2025-089"
   }

2. CREAR EVENTO EN GOOGLE CALENDAR
   ├─ Título: "Instalación - HERNANDO VILLEGAS - Blanco Polar"
   ├─ Fecha/Hora: 2025-11-25 09:00
   ├─ Duración: 3 horas
   ├─ Ubicación: Carrera 100 #15-25, Cali
   ├─ Descripción:
   │   ├─ Cliente: HERNANDO VILLEGAS
   │   ├─ Tel: +57 300 123 4567
   │   ├─ Material: Blanco Polar 2m²
   │   ├─ Vendedor: Miguel Ángel Vélez
   │   └─ Cotización: COT-2025-089
   └─ Asistentes: vendedor@marmolesdeluxe.com

3. CONFIGURAR RECORDATORIOS
   ├─ 24 horas antes: Email + WhatsApp
   └─ 1 hora antes: WhatsApp

4. RESPUESTA A ADMIN
   ├─ event_id de Google Calendar
   ├─ URL del evento
   └─ Estado: "creado"
```

**Nodos n8n:**

```
- Webhook
- Google Calendar (Create Event)
- Schedule Trigger (para recordatorios)
- WhatsApp Business Cloud
- Gmail
- HTTP Request (respuesta a admin)
```

---

### FLUJO_015: Seguimiento Post-Instalación

**Trigger:** Instalación marcada como completada en admin

**Proceso:**

```
1. WEBHOOK DESDE ADMIN
   {
     "evento": "instalacion_completada",
     "cliente": "HERNANDO VILLEGAS",
     "telefono": "+57 300 123 4567",
     "fecha_instalacion": "2025-11-25",
     "material": "Blanco Polar 2m²",
     "total": 1380000,
     "cotizacion_id": "COT-2025-089"
   }

2. ESPERAR 24 HORAS (Schedule)

3. ENVIAR ENCUESTA DE SATISFACCIÓN
   WhatsApp:
   "Hola HERNANDO! 👋
   
   Esperamos que estés disfrutando tu nuevo mesón 
   de Blanco Polar 😊
   
   ¿Podrías calificarnos del 1 al 10?
   
   1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟"

4. CAPTURAR RESPUESTA
   ├─ SI NPS >= 9: "¡Gracias! Nos ayudarías con una reseña en Google?"
   ├─ SI NPS 7-8: "Gracias por tu feedback 💙"
   └─ SI NPS <= 6: Alerta a admin + llamada del vendedor

5. GUARDAR EN BD
   ├─ Tabla: encuestas_satisfaccion
   ├─ Datos: NPS, comentarios, fecha
   └─ Vincular con cotizacion_id

6. ACTUALIZAR ADMIN
   POST /api/encuestas/resultado
```

**Nodos n8n:**

```
- Webhook
- Wait (24 horas)
- WhatsApp Send
- WhatsApp Trigger (captura respuesta)
- IF (según NPS)
- Supabase Insert
- HTTP Request (a admin)
```

---

## 🔗 ENDPOINTS REQUERIDOS EN ADMIN

### API Routes a Crear en Next.js

```typescript
// /api/n8n/cotizacion-generada
POST /api/n8n/cotizacion-generada
Body: {
  cotizacion_id: string,
  pdf_url: string,
  cliente_telefono: string,
  cliente_nombre: string,
  material: string,
  total: number
}
Response: { success: true, n8n_job_id: string }

// /api/n8n/sync
GET /api/n8n/sync
Query: { last_sync: timestamp }
Response: {
  nuevas_cotizaciones: [],
  instalaciones_programadas: [],
  pagos_recibidos: []
}

// /api/n8n/evento-calendar
POST /api/n8n/evento-calendar
Body: {
  event_id: string,
  calendar_url: string,
  cliente_id: string
}
Response: { success: true }

// /api/sobrantes/buscar
GET /api/sobrantes/buscar
Query: { material: string, metros: number }
Response: {
  hay_sobrantes: boolean,
  sobrantes: [
    {
      id: string,
      material: string,
      dimensiones: string,
      precio_original: number,
      precio_sobrante: number,
      ahorro: number,
      ubicacion: string
    }
  ]
}

// /api/encuestas/resultado
POST /api/encuestas/resultado
Body: {
  cotizacion_id: string,
  nps: number,
  comentarios: string,
  fecha: timestamp
}
Response: { success: true }

// /api/n8n/webhook-status
GET /api/n8n/webhook-status
Response: {
  status: "online" | "offline",
  last_ping: timestamp,
  flujos_activos: number
}
```

---

## 🔐 AUTENTICACIÓN ENTRE ADMIN Y N8N

### Método Recomendado: Bearer Token

**Configuración en n8n:**

```javascript
// Nodo HTTP Request - Headers
{
  "Authorization": "Bearer ${ADMIN_API_TOKEN}",
  "Content-Type": "application/json"
}
```

**Configuración en Admin (Next.js):**

```typescript
// middleware.ts o api route
export async function verificarN8NToken(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  
  if (!token || token !== process.env.N8N_SECRET_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  return null; // Autenticación exitosa
}
```

**Variables de Entorno:**

```env
# Admin (.env.local)
N8N_WEBHOOK_URL=https://n8n.tudominio.com/webhook/admin-md
N8N_SECRET_TOKEN=tu_token_secreto_seguro_aqui

# n8n (variables de entorno)
ADMIN_API_URL=https://admin.marmolesdeluxe.com/api
ADMIN_API_TOKEN=tu_token_secreto_seguro_aqui
```

---

## 📱 PLANTILLAS DE MENSAJES WHATSAPP

### Mensaje: Cotización Lista

```javascript
const mensajeCotizacion = (datos) => `
¡Hola ${datos.cliente_nombre}! 👋

Tu cotización está lista 📋

*Material:* ${datos.material}
*Total:* $${datos.total.toLocaleString('es-CO')} COP

Descarga tu cotización aquí:
${datos.pdf_url}

*Condiciones:*
• Validez: 15 días
• Anticipo: 60% ($${(datos.total * 0.6).toLocaleString('es-CO')})
• Saldo: 40% ($${(datos.total * 0.4).toLocaleString('es-CO')})
• Entrega: 5 días hábiles

¿Tienes alguna pregunta? 😊
`;
```

### Mensaje: Recordatorio 24h Antes

```javascript
const mensajeRecordatorio24h = (datos) => `
Hola ${datos.cliente_nombre}! 👋

Te recordamos tu instalación programada para mañana:

📅 *Fecha:* ${datos.fecha}
🕐 *Hora:* ${datos.hora}
📍 *Dirección:* ${datos.direccion}
🪨 *Material:* ${datos.material}

*Importante:*
✅ La superficie debe estar nivelada
✅ Tener disponible el lavaplatos
✅ Despejar el área de trabajo

¿Alguna duda? Escríbenos 😊
`;
```

### Mensaje: Recomendación de Sobrante

```javascript
const mensajeSobrante = (datos) => `
¡Excelente noticia! 🎯

Tenemos material en stock que te sirve:

*Material:* ${datos.material}
*Dimensiones:* ${datos.dimensiones}
*Precio material nuevo:* $${datos.precio_original.toLocaleString('es-CO')}
*Precio sobrante:* $${datos.precio_sobrante.toLocaleString('es-CO')}

💰 *¡Ahorras $${datos.ahorro.toLocaleString('es-CO')}!* (${datos.porcentaje_ahorro}%)

Es el mismo material, misma calidad, entrega inmediata.

¿Te interesa? 😊
`;
```

---

## 🔄 FLUJO COMPLETO DE INTEGRACIÓN

### Diagrama de Secuencia

```
Cliente (WhatsApp)  →  n8n  →  Admin MD  →  n8n  →  Cliente (WhatsApp)
      │                  │         │          │              │
      │ "Quiero cotizar" │         │          │              │
      │─────────────────>│         │          │              │
      │                  │         │          │              │
      │                  │ Webhook │          │              │
      │                  │────────>│          │              │
      │                  │   Notif vendedor   │              │
      │                  │         │          │              │
      │                  │    Vendedor genera │              │
      │                  │    cotización en   │              │
      │                  │    /calculadora    │              │
      │                  │         │          │              │
      │                  │<────────│ Webhook  │              │
      │                  │   PDF + datos      │              │
      │                  │         │          │              │
      │                  │ Descarga PDF       │              │
      │                  │ de Drive           │              │
      │                  │         │          │              │
      │                  │ Envía WhatsApp     │              │
      │<─────────────────────────────────────────────────────│
      │         "Tu cotización: [PDF]"                       │
      │                  │         │          │              │
```

---

## 📊 DATOS A SINCRONIZAR

### Estructura de Datos entre Admin y n8n

```typescript
interface SyncData {
  // Desde Admin → n8n
  cotizaciones_nuevas: {
    id: string;
    numero: string;
    cliente_nombre: string;
    cliente_telefono: string;
    material: string;
    total: number;
    pdf_url: string;
    vendedor_id: string;
    created_at: timestamp;
  }[];
  
  instalaciones_programadas: {
    id: string;
    cotizacion_id: string;
    fecha: timestamp;
    direccion: string;
    calendar_event_id?: string;
    estado: 'programada' | 'completada' | 'cancelada';
  }[];
  
  // Desde n8n → Admin
  conversaciones_whatsapp: {
    cliente_telefono: string;
    mensaje: string;
    tipo: 'consulta' | 'respuesta_cotizacion' | 'confirmacion';
    timestamp: timestamp;
    requiere_atencion: boolean;
  }[];
  
  encuestas_nps: {
    cotizacion_id: string;
    nps_score: number;
    comentarios: string;
    fecha: timestamp;
  }[];
}
```

---

## 🛠️ CONFIGURACIÓN TÉCNICA

### Webhooks a Configurar en n8n

```json
{
  "webhooks": [
    {
      "nombre": "Admin - Cotización Generada",
      "url": "/webhook/cotizacion-generada",
      "metodo": "POST",
      "autenticacion": "Bearer Token",
      "flujo_vinculado": "FLUJO_011"
    },
    {
      "nombre": "Admin - Instalación Programada",
      "url": "/webhook/instalacion-programada",
      "metodo": "POST",
      "autenticacion": "Bearer Token",
      "flujo_vinculado": "FLUJO_014"
    },
    {
      "nombre": "Admin - Instalación Completada",
      "url": "/webhook/instalacion-completada",
      "metodo": "POST",
      "autenticacion": "Bearer Token",
      "flujo_vinculado": "FLUJO_015"
    },
    {
      "nombre": "WhatsApp - Mensaje Entrante",
      "url": "/webhook/whatsapp-inbound",
      "metodo": "POST",
      "autenticacion": "Meta Verify Token",
      "flujo_vinculado": "FLUJO_002 + FLUJO_013"
    }
  ]
}
```

### Polling Jobs (Consultas Periódicas)

```json
{
  "cron_jobs": [
    {
      "nombre": "Sincronización Admin → n8n",
      "expresion_cron": "*/5 * * * *",
      "descripcion": "Cada 5 minutos",
      "flujo": "FLUJO_012",
      "endpoint": "GET https://admin.marmolesdeluxe.com/api/n8n/sync"
    },
    {
      "nombre": "Verificación de Salud",
      "expresion_cron": "*/15 * * * *",
      "descripcion": "Cada 15 minutos",
      "flujo": "FLUJO_009",
      "endpoint": "GET https://admin.marmolesdeluxe.com/api/n8n/health"
    }
  ]
}
```

---

## 🧪 TESTING DE INTEGRACIÓN

### Checklist de Pruebas

```
☐ Test 1: Envío de Cotización
  ├─ Generar cotización en admin
  ├─ Verificar webhook recibido en n8n
  ├─ Verificar PDF descargado de Drive
  ├─ Verificar mensaje enviado por WhatsApp
  └─ Verificar cliente recibe PDF

☐ Test 2: Recomendación de Sobrante
  ├─ Cliente solicita material por WhatsApp
  ├─ n8n consulta API de sobrantes
  ├─ Verificar respuesta con sobrante disponible
  └─ Verificar mensaje con precio de descuento

☐ Test 3: Creación de Evento en Calendar
  ├─ Agendar instalación en admin
  ├─ Verificar webhook a n8n
  ├─ Verificar evento creado en Google Calendar
  ├─ Verificar recordatorio 24h antes
  └─ Verificar recordatorio 1h antes

☐ Test 4: Encuesta Post-Instalación
  ├─ Marcar instalación como completada
  ├─ Esperar 24h (o simular)
  ├─ Verificar envío de encuesta
  ├─ Responder con NPS
  └─ Verificar guardado en BD

☐ Test 5: Sincronización Bidireccional
  ├─ Crear dato en admin
  ├─ Verificar recepción en n8n (< 5 min)
  ├─ Crear dato en n8n
  └─ Verificar recepción en admin (< 5 min)
```

---

## 📈 MÉTRICAS DE MONITOREO

### KPIs de Integración

```
DISPONIBILIDAD:
├─ Uptime de webhooks: Target >= 99.5%
├─ Tiempo de respuesta: Target < 2 segundos
└─ Tasa de errores: Target < 0.1%

FUNCIONALIDAD:
├─ Cotizaciones enviadas exitosamente: Target 100%
├─ Eventos creados en Calendar: Target 100%
├─ Encuestas enviadas: Target >= 95%
└─ Sincronizaciones exitosas: Target >= 99%

NEGOCIO:
├─ Tiempo promedio envío cotización: Target < 5 min
├─ Respuesta a encuesta NPS: Target >= 60%
├─ Conversión cotización → venta: Tracking
└─ Uso de sobrantes recomendados: Tracking
```

---

## 🚨 MANEJO DE ERRORES

### Estrategias de Recuperación

```javascript
// Ejemplo en n8n - Nodo Error Trigger

if (error.tipo === 'WhatsApp API Error') {
  // Reintentar hasta 3 veces con backoff exponencial
  const intentos = [1000, 5000, 15000]; // ms
  
  for (let i = 0; i < intentos.length; i++) {
    await sleep(intentos[i]);
    try {
      await enviarWhatsApp(datos);
      break; // Éxito
    } catch (e) {
      if (i === intentos.length - 1) {
        // Último intento falló
        await notificarAdmin({
          tipo: 'error_critico',
          mensaje: 'No se pudo enviar cotización por WhatsApp',
          cotizacion_id: datos.id,
          cliente: datos.cliente_telefono
        });
      }
    }
  }
}

if (error.tipo === 'Google Calendar Error') {
  // Guardar evento en BD para reintento manual
  await supabase.from('eventos_pendientes').insert({
    datos_evento: datos,
    error: error.message,
    intentos: 0,
    created_at: new Date()
  });
  
  await notificarAdmin({
    tipo: 'warning',
    mensaje: 'Evento no creado en Calendar, revisar manualmente'
  });
}

if (error.tipo === 'PDF Download Error') {
  // Intentar URL alternativa o notificar
  await notificarVendedor({
    mensaje: 'No se pudo descargar el PDF, verificar permisos de Drive',
    cotizacion_id: datos.id
  });
}
```

---

## 📝 DOCUMENTACIÓN PARA EL EQUIPO

### Guía Rápida para Vendedores

```markdown
# ¿Cómo funciona la integración con WhatsApp?

1. Cliente escribe a WhatsApp de Mármoles Deluxe
2. El agente automático (n8n) responde instantáneamente
3. Tú recibes una notificación con los datos del cliente
4. Ingresas a admin.marmolesdeluxe.com/calculadora
5. Generas la cotización (el PDF se crea solo)
6. En 2 minutos, el cliente recibe el PDF por WhatsApp
7. El agente te notifica si el cliente responde

No necesitas hacer nada manual, todo es automático 🚀
```

### Troubleshooting Común

```
❌ "El cliente no recibió la cotización"
✅ Solución:
   1. Verificar en /calculadora/historial que se generó
   2. Revisar estado: debe decir "Enviada"
   3. Si dice "Error", hacer clic en "Reenviar"
   4. Contactar a admin si persiste

❌ "El evento no se creó en Calendar"
✅ Solución:
   1. Ir a /calendario
   2. Buscar el evento manualmente
   3. Si no existe, crearlo manualmente
   4. Reportar el error a admin@marmolesdeluxe.com

❌ "El agente no responde mensajes"
✅ Solución:
   1. Verificar en /agente-n8n que está "Online"
   2. Si está "Offline", notificar inmediatamente
   3. Mientras tanto, responder manualmente
```

---

## 🎯 ROADMAP DE IMPLEMENTACIÓN

### Fase 1: Configuración Básica (Semana 1)

```
☐ Crear endpoints en Admin:
  ├─ /api/n8n/cotizacion-generada
  ├─ /api/n8n/sync
  └─ /api/sobrantes/buscar

☐ Configurar webhooks en n8n:
  ├─ Cotización generada
  └─ Instalación programada

☐ Implementar autenticación Bearer Token

☐ Testing de conexión básica
```

### Fase 2: Flujos Principales (Semana 2)

```
☐ FLUJO_011: Generación de cotizaciones
☐ FLUJO_012: Sincronización bidireccional
☐ FLUJO_013: Recomendación de sobrantes
☐ Testing end-to-end
```

### Fase 3: Flujos Secundarios (Semana 3)

```
☐ FLUJO_014: Google Calendar
☐ FLUJO_015: Encuestas post-instalación
☐ Configurar recordatorios automáticos
☐ Testing completo
```

### Fase 4: Optimización y Monitoreo (Semana 4)

```
☐ Implementar manejo de errores robusto
☐ Dashboard de métricas de integración
☐ Documentación para el equipo
☐ Capacitación de usuarios
☐ Go Live 🚀
```

---

## 🔗 RECURSOS NECESARIOS

### URLs y Credenciales

```
☐ URL de n8n: __________________________
☐ Admin API URL: https://admin.marmolesdeluxe.com
☐ Token de autenticación n8n → Admin: __________
☐ Token de autenticación Admin → n8n: __________
☐ WhatsApp Business Phone ID: __________________
☐ WhatsApp Access Token: _______________________
☐ Google Calendar ID: __________________________
☐ Google Drive Folder ID (PDFs): _______________
```

### Accesos Requeridos

```
☐ Acceso admin a n8n
☐ Acceso a Google Cloud Console (Calendar API)
☐ Acceso a Meta Business Manager (WhatsApp)
☐ Acceso a Supabase (o BD principal)
☐ Acceso a Google Drive con permisos de lectura
☐ Variables de entorno configuradas en ambos sistemas
```

---

## 📞 CONTACTO Y SOPORTE

```
Responsable de Integración: Johan Sebastián Castro López
Soporte Técnico n8n: [email/teléfono]
Soporte Admin MD: admin@marmolesdeluxe.com
Documentación n8n: https://docs.n8n.io
```

---

**Última Actualización:** 21 de Noviembre de 2025  
**Próxima Revisión:** Al completar Fase 1 de implementación  
**Estado:** 🟡 Pendiente de Implementación

---

## ✅ CHECKLIST PRE-IMPLEMENTACIÓN

```
Antes de comenzar, asegúrate de tener:

TÉCNICO:
☐ n8n instalado y funcionando
☐ Admin MD en desarrollo/staging
☐ Acceso a todas las APIs necesarias
☐ Tokens de autenticación generados
☐ Postman/Insomnia para testing

NEGOCIO:
☐ Aprobación de flujos de trabajo
☐ Plantillas de mensajes WhatsApp revisadas
☐ Equipo capacitado en uso básico
☐ Plan de comunicación a clientes

INFRAESTRUCTURA:
☐ Servidor n8n con capacidad suficiente
☐ Base de datos con espacio para logs
☐ Backups configurados
☐ Plan de contingencia si falla n8n
```

---

*Este documento debe actualizarse conforme se implementen los flujos y se descubran nuevas necesidades de integración.*
