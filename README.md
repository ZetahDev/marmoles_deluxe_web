# Mármoles Deluxe - Sitio Web

Sitio web oficial de Mármoles Deluxe, especialistas en instalación de superficies en piedras naturales y sinterizadas.

## Tecnologías

- Astro
- TailwindCSS
- React (componentes interactivos)
- AWS S3 (almacenamiento de imágenes)

## Estructura de Recursos

### Imágenes y Recursos Estáticos

El sitio utiliza dos fuentes principales para sus recursos:

1. **Imágenes Locales (desarrollo)**:
   - Carpeta `public/logos/`: Logotipos de marcas 
   - Carpeta `public/images/`: Imágenes generales

2. **AWS S3 (producción)**:
   - Bucket: `marmolesdeluxe` en la región `us-east-2`
   - Estructura:
     - `/logos/`: Logotipos de marcas
     - `/FOTOS/`: Catálogo de productos y fotografías

### Manejo de Recursos

El componente `MarcasBanner.astro` tiene implementada una lógica que detecta automáticamente el entorno:
- En desarrollo: usa imágenes locales de `/public/logos/`
- En producción: usa imágenes de S3 (`https://marmolesdeluxe.s3.us-east-2.amazonaws.com/logos/`)

## Despliegue

El sitio se despliega automáticamente en GitHub Pages mediante un workflow de GitHub Actions:

1. Se activa al hacer push a la rama `main`
2. Instala dependencias y compila el proyecto
3. Configura las variables de entorno para acceder a S3
4. Copia recursos locales necesarios
5. Publica el contenido de la carpeta `dist/` en GitHub Pages

### Variables de Entorno

Para personalizar la configuración de S3, se pueden establecer secretos en el repositorio:

- `AWS_S3_BUCKET`: Nombre del bucket (predeterminado: 'marmolesdeluxe')
- `AWS_REGION`: Región AWS (predeterminado: 'us-east-2')

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la versión de producción
npm run preview
```

## Mantenimiento

Para agregar nuevos logotipos al banner de marcas:

1. Sube la imagen al bucket S3 en la carpeta `/logos/`
2. Añade la referencia en el array de logos en `src/components/MarcasBanner.astro`
3. Para pruebas locales, coloca una copia en `public/logos/`

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## AWS S3 Integration

This project dynamically loads stone product images from an AWS S3 bucket during the build process. To set up the AWS integration:

1. Create a `.env` file in the root of the project with the following variables:

```
PUBLIC_AWS_ACCESS_KEY_ID=your_access_key_here
PUBLIC_AWS_SECRET_ACCESS_KEY=your_secret_key_here
PUBLIC_AWS_REGION=us-east-2
PUBLIC_AWS_BUCKET_NAME=marmolesdeluxe
```

2. Replace the values with your actual AWS credentials.

3. The stone images should be organized in the S3 bucket according to the following structure:
   - `FOTOS/MARMOL/` - for marble images
   - `FOTOS/QUARSTONE/` - for quartzstone images  
   - `FOTOS/GRANITOS+NATURALES/` - for natural granite images
   - `FOTOS/PIEDRA+SINTERIZADA/NEOLITH/` - for Neolith synthetic stone images
   - `FOTOS/PIEDRA+SINTERIZADA/ALTEA/` - for Altea synthetic stone images
   - `FOTOS/PIEDRA+SINTERIZADA/DEKTON/` - for Dekton synthetic stone images
   - `FOTOS/PIEDRA+SINTERIZADA/SILESTONE/` - for Silestone synthetic stone images

4. Each stone should have two images:
   - A base image (e.g., `Stone_Name.png`)
   - A design image with the same name plus `_desing` suffix (e.g., `Stone_Name_desing.png`)

The system will automatically find these image pairs and create the stone catalog during the build process.
