# Estructura de Carpetas para Imágenes S3

Esta carpeta refleja la estructura que tienes en S3. Coloca aquí las imágenes localmente antes de subirlas.

## Estructura Esperada

```
FOTOS/
├── MARMOL/
│   ├── Blanco_Carrara.webp
│   ├── Blanco_Carrara_designs.webp
│   └── ...
├── QUARSTONE/
│   ├── Blanco_Polar.webp
│   ├── Blanco_Polar_designs.webp
│   └── ...
├── GRANITOS+NATURALES/
│   └── ...
└── PIEDRA+SINTERIZADA/
    ├── ALTEA/
    │   ├── Pure_White.webp
    │   ├── Pure_White_designs.webp
    │   ├── Black_Marquina.webp
    │   ├── Black_Marquina_designs.webp
    │   └── ...
    ├── DEKTON/
    │   └── ...
    ├── NEOLITH/
    │   └── ...
    └── SILESTONE/
        └── ...
```

## Workflow

1. **Organiza tus imágenes** en estas carpetas
2. **Genera el índice**: `npm run generate-s3-index`
3. **Sube las imágenes a S3**:
   ```bash
   aws s3 sync ./FOTOS s3://marmolesdeluxe/FOTOS --acl public-read
   ```
4. **Sube el índice generado**:
   ```bash
   aws s3 cp ./public/s3-index.json s3://marmolesdeluxe/FOTOS/index.json --acl public-read
   ```

## Naming Convention

- Imagen principal: `Nombre_Piedra.webp`
- Imagen de diseño: `Nombre_Piedra_designs.webp` o `Nombre_Piedra_desing.webp`
- Usa guión bajo `_` para separar palabras
- El sistema convierte automáticamente `_` a espacios y capitaliza
