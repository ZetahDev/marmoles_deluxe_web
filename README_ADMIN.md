# Panel de Administrador - Mármoles Deluxe

Este panel de administrador permite gestionar el contenido multimedia de la página web de Mármoles Deluxe.

## Características

- **Acceso protegido**: Panel protegido con contraseña simple usando localStorage.
- **Gestión de contenido**: Organizado por categorías (Galería, Materiales, Testimonios).
- **Subida de archivos**: Interfaz intuitiva para arrastrar y soltar archivos o seleccionarlos.
- **Gestión de medios**: Visualización, copia de URL y eliminación de archivos subidos.

## Acceso al panel

La sección de administración está disponible en la ruta `/admin` del sitio web (por ejemplo, `https://tudominio.com/admin`). La contraseña predeterminada es `marmoles123`.

## Simulación vs. Implementación real

Esta implementación simula la interacción con un servicio de almacenamiento S3. Para una implementación real, se requeriría:

### Opción 1: UploadThing (requiere un pequeño backend)

1. Registrarse en [UploadThing](https://uploadthing.com/)
2. Configurar las credenciales de AWS S3 en UploadThing
3. Agregar la integración con Astro mediante un endpoint serverless

### Opción 2: ImageKit (implementación más sencilla)

1. Registrarse en [ImageKit](https://imagekit.io/)
2. Obtener las credenciales de API
3. Integrar directamente usando su SDK de cliente

## Estructura de archivos

```
src/
  ├── components/
  │   └── admin/
  │       ├── AdminLogin.jsx       # Componente de autenticación
  │       ├── AdminDashboard.jsx   # Panel principal
  │       ├── FileUploader.jsx     # Componente para subir archivos
  │       └── FilesList.jsx        # Listado de archivos
  ├── layouts/
  │   └── AdminLayout.astro        # Layout para la sección admin
  ├── lib/
  │   └── uploadthing.js           # Servicio para manejar subidas
  └── pages/
      └── admin.astro              # Página principal del admin
```

## Modificación de la contraseña

Para cambiar la contraseña predeterminada, edita el archivo `src/components/admin/AdminLogin.jsx` y modifica la constante `ADMIN_PASSWORD`.

## Integración con el sitio público

Los archivos subidos se almacenan temporalmente en localStorage para esta demostración. En una implementación real, los archivos subidos se podrían mostrar en la web pública consultando las URLs almacenadas en una base de datos o directamente desde el bucket de S3.

Las principales secciones que podrían mostrar los archivos subidos son:

- **Galería**: Imágenes de trabajos y proyectos
- **Materiales**: Catálogo de tipos de mármoles y materiales
- **Testimonios**: Fotos y opiniones de clientes

## Próximos pasos

Para completar la implementación real, sería necesario:

1. Configurar la integración con S3 mediante UploadThing o ImageKit
2. Implementar una base de datos para almacenar los metadatos de los archivos
3. Crear componentes públicos para mostrar los archivos subidos en las secciones correspondientes
4. Mejorar la seguridad del acceso al panel de administración

---

**Nota importante**: Este panel es una implementación básica y simulada. Para un entorno de producción, se recomienda implementar medidas de seguridad más robustas y un sistema de autenticación adecuado. 