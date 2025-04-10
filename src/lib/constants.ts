export const testimonies = [
  {
    name: "María González",
    text: "Excelente trabajo en mi cocina. El mármol quedó perfecto y la instalación fue muy profesional.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
  },
  {
    name: "Juan Pérez",
    text: "Muy satisfecho con el servicio. Cumplieron con los tiempos y la calidad es excepcional.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
  },
  {
    name: "Ana Martínez",
    text: "La mejor decisión para renovar mi baño. El equipo es muy profesional y el resultado es increíble.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000",
  },
  {
    name: "Carlos Rodríguez",
    text: "Trabajo impecable en mi sala. El mármol quedó espectacular y la instalación fue muy limpia.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000",
  },
  {
    name: "Laura Sánchez",
    text: "Excelente atención y calidad en el trabajo. Mi cocina quedó hermosa con el mármol instalado.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000",
  },
];

export const projects = [
  {
    title: "Cocina Moderna",
    description: "Diseño contemporáneo con mármol de alta calidad",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1000",
  },
  {
    title: "Baño de Lujo",
    description: "Acabados premium en mármol natural",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000",
  },
  {
    title: "Isla de Cocina",
    description: "Centro de entretenimiento con acabados de lujo",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000",
  },
  {
    title: "Sala Principal",
    description: "Diseño elegante con mármol italiano",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000",
  },
  {
    title: "Baño Principal",
    description: "Espacio de relax con acabados premium",
    image:
      "https://images.unsplash.com/photo-1584622781564-4f00a87b4046?q=80&w=1000",
  },
  {
    title: "Comedor Formal",
    description: "Elegancia y estilo en cada detalle",
    image:
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1000",
  },
];

export const marbleProducts = [
  {
    name: "Mármol Carrara",
    description:
      "Mármol blanco italiano con vetas grises suaves, perfecto para espacios elegantes.",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1000",
    features: [
      "Resistente a manchas",
      "Ideal para interiores",
      "Fácil mantenimiento",
    ],
  },
  {
    name: "Mármol Negro Marquina",
    description:
      "Mármol negro intenso con vetas blancas, ideal para diseños modernos y contrastantes.",
    image:
      "https://images.unsplash.com/photo-1600585154363-67eb9e2ea2ea?q=80&w=1000",
    features: ["Alta durabilidad", "Acabado brillante", "Resistente al calor"],
  },
];

export const graniteProducts = [
  {
    name: "Granito Negro Absoluto",
    description:
      "Granito negro puro con cristales finos, perfecto para cocinas y superficies de trabajo.",
    image:
      "https://images.unsplash.com/photo-1600573472591-ee6981cf35e6?q=80&w=1000",
    features: [
      "Extremadamente durable",
      "Resistente a rayones",
      "Bajo mantenimiento",
    ],
  },
  {
    name: "Granito Blanco Siena",
    description:
      "Granito blanco con motas negras y grises, ideal para espacios luminosos.",
    image:
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?q=80&w=1000",
    features: ["Alta resistencia", "No se mancha fácilmente", "Versátil"],
  },
];

export const quartzProducts = [
  {
    name: "Cuarzo Blanco Puro",
    description:
      "Cuarzo engineered de color blanco puro, perfecto para diseños minimalistas.",
    image:
      "https://images.unsplash.com/photo-1600573472573-8b7b7578a5b9?q=80&w=1000",
    features: ["No poroso", "Antibacterial", "Resistente a impactos"],
  },
  {
    name: "Cuarzo Veined Gold",
    description:
      "Cuarzo con vetas doradas sobre fondo crema, ideal para espacios lujosos.",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1000",
    features: ["Uniforme", "No requiere sellado", "Resistente a ácidos"],
  },
];

// Función para obtener la ruta correcta de la imagen con la URL base
function getImagePath(path: string): string {
  // Extraer solo el nombre del archivo
  const filename = path.split("/").pop();
  // Construir la ruta con la URL base (en tiempo de ejecución)
  const BASE_URL = "/marmoles_deluxe_web";
  return `${BASE_URL}/images/${filename}`;
}

export const sinteredStoneProducts = [
  {
    name: "Artisan Silk",
    description: "Piedra sinterizada con un acabado sedoso y elegante.",
    images: [
      getImagePath("/src/assets/images/Artisan_Silk.png"),
      getImagePath("/src/assets/images/Artisan_Silk_designs.png"),
    ],
    features: ["Ultra resistente", "100% reciclable", "Resistente a UV"],
  },
  {
    name: "Black Obsession Silk",
    description:
      "Piedra sinterizada negra con un acabado sedoso y sofisticado.",
    images: [
      getImagePath("/src/assets/images/Black_Obssesion_Silk.png"),
      getImagePath("/src/assets/images/Black_Obsession_Silk_designs.png"),
    ],
    features: ["Resistente a rayos UV", "No se mancha", "Apto para exterior"],
  },
  {
    name: "Rapolano Silk",
    description:
      "Piedra sinterizada con un diseño inspirado en el mármol Rapolano.",
    images: [
      getImagePath("/src/assets/images/Rapolano_Silk.png"),
      getImagePath("/src/assets/images/Rapolano_Silk_designs.png"),
    ],
    features: [
      "Durabilidad excepcional",
      "Fácil mantenimiento",
      "Resistente a impactos",
    ],
  },
  {
    name: "White Sands Silk",
    description: "Piedra sinterizada blanca con un acabado suave y moderno.",
    images: [
      getImagePath("/src/assets/images/WhiteSands_Silk.png"),
      getImagePath("/src/assets/images/WhiteSands_Silk_designs.png"),
    ],
    features: [
      "Estilo contemporáneo",
      "Resistente a manchas",
      "Ideal para interiores",
    ],
  },
];
