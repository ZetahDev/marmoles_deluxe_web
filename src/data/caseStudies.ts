export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  summary: string;
  location: string;
  propertyType: string;
  application: string;
  materialBrand: string;
  materialLine: string;
  materialReference: string;
  timelineLabel: string;
  timelineDays: number;
  timelineBreakdown: string[];
  scope: string[];
  challenge: string;
  solution: string;
  result: string;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  testimonial: {
    name: string;
    role: string;
    quote: string;
  };
  images: {
    cover: string;
    before: string;
    process: string;
    final: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "altea-cocina-cali",
    slug: "altea-cocina-cali",
    title: "Cocina residencial en Cali con piedra sinterizada Altea",
    summary:
      "Proyecto orientado a renovar una cocina de uso diario con una superficie de gran formato, baja absorción y estética limpia. El objetivo fue mejorar resistencia, mantenimiento y continuidad visual sin extender la obra más de una semana.",
    location: "Cali, Valle del Cauca",
    propertyType: "Apartamento residencial",
    application: "Mesón principal, isla de cocina y salpicadero",
    materialBrand: "Altea",
    materialLine: "Piedra sinterizada",
    materialReference: "Acabado tipo mármol claro en gran formato",
    timelineLabel: "5 días de fabricación e instalación",
    timelineDays: 5,
    timelineBreakdown: [
      "Día 1: visita técnica, validación de medidas y levantamiento.",
      "Día 2: definición final de despieces, vetas y cortes especiales.",
      "Día 3: fabricación, pulidos y revisión de acabados.",
      "Día 4: traslado, preparación del área e instalación principal.",
      "Día 5: ajustes finos, sellado, limpieza y entrega.",
    ],
    scope: [
      "Retiro de superficie anterior.",
      "Plantilla y verificación de nivelación.",
      "Fabricación en taller.",
      "Instalación de cubierta y salpicadero.",
      "Sellado final y limpieza de entrega.",
    ],
    challenge:
      "La cocina tenía circulación compacta y necesitaba una lectura visual continua entre mesón, isla y muro sin sobrecargar el espacio.",
    solution:
      "Se planteó un formato sinterizado de lectura homogénea, con recortes planificados desde la plantilla y una secuencia de instalación pensada para minimizar juntas visibles.",
    result:
      "El proyecto quedó con una imagen más limpia, mejor resistencia al uso diario y una ejecución compatible con una intervención corta de 5 días.",
    authorName: "Andrés Delgado",
    authorRole: "Asesor comercial y coordinación técnica",
    publishedAt: "2026-05-11",
    updatedAt: "2026-05-11",
    testimonial: {
      name: "Cliente residencial",
      role: "Proyecto de remodelación en cocina",
      quote:
        "Necesitábamos una cocina elegante pero práctica. El proceso fue claro y la instalación quedó muy limpia para el tiempo de obra.",
    },
    images: {
      cover: "/images/case-studies/altea-cover-ai.svg",
      before: "/images/case-studies/altea-before-ai.svg",
      process: "/images/case-studies/altea-process-ai.svg",
      final: "/images/case-studies/altea-final-ai.svg",
    },
  },
  {
    id: "neolith-barra-cali",
    slug: "neolith-barra-cali",
    title: "Barra social en Cali con Neolith para uso intensivo",
    summary:
      "Caso pensado para una barra social con alta exposición a calor, líquidos y reuniones frecuentes. La prioridad fue combinar presencia visual, facilidad de limpieza y un acabado coherente con el resto del ambiente.",
    location: "Cali, Valle del Cauca",
    propertyType: "Casa residencial",
    application: "Barra social y cubierta auxiliar",
    materialBrand: "Neolith",
    materialLine: "Superficie sinterizada",
    materialReference: "Acabado oscuro mate para uso intensivo",
    timelineLabel: "5 días entre validación, fabricación e instalación",
    timelineDays: 5,
    timelineBreakdown: [
      "Día 1: diagnóstico del mueble base y validación dimensional.",
      "Día 2: definición de cantos, uniones y sentido de veta.",
      "Día 3: fabricación y preensamble de piezas.",
      "Día 4: instalación de la barra y ajustes de nivel.",
      "Día 5: remates, revisión de uso y entrega.",
    ],
    scope: [
      "Revisión de mueble soporte.",
      "Plantilla de cantos y encuentros.",
      "Fabricación y transporte.",
      "Instalación de barra y remates.",
      "Entrega con recomendaciones de uso.",
    ],
    challenge:
      "La barra necesitaba soportar uso intensivo sin perder presencia visual y debía resolver encuentros delicados en esquinas y volados.",
    solution:
      "Se priorizó una superficie tipo Neolith por su comportamiento frente al calor y mantenimiento, con despiece pensado para controlar juntas y proteger puntos de mayor uso.",
    result:
      "Se obtuvo una barra de aspecto robusto y contemporáneo, preparada para reuniones frecuentes y con mantenimiento simple para el usuario final.",
    authorName: "Julián Herrera",
    authorRole: "Dirección de proyecto y despiece",
    publishedAt: "2026-05-11",
    updatedAt: "2026-05-11",
    testimonial: {
      name: "Cliente residencial",
      role: "Proyecto social y barra de apoyo",
      quote:
        "Buscábamos una superficie fuerte para reuniones y calor. La propuesta técnica nos ayudó a decidir mejor el material.",
    },
    images: {
      cover: "/images/case-studies/neolith-cover-ai.svg",
      before: "/images/case-studies/neolith-before-ai.svg",
      process: "/images/case-studies/neolith-process-ai.svg",
      final: "/images/case-studies/neolith-final-ai.svg",
    },
  },
  {
    id: "b2b-lobby-granito-cali",
    slug: "b2b-lobby-granito-cali",
    title: "Lobby comercial en Cali con granito de alto tránsito",
    summary:
      "Escenario de referencia para proyecto comercial donde importaban resistencia, lectura sobria y cumplimiento de tiempos. El enfoque fue resolver un material apto para tránsito y una instalación ordenada sin afectar por demasiado tiempo la operación del espacio.",
    location: "Cali, Valle del Cauca",
    propertyType: "Proyecto comercial",
    application: "Recepción, superficies de apoyo y detalle de muro",
    materialBrand: "Granito natural",
    materialLine: "Selección para alto tránsito",
    materialReference: "Granito oscuro de lectura sobria para tráfico frecuente",
    timelineLabel: "5 días con coordinación entre taller y obra",
    timelineDays: 5,
    timelineBreakdown: [
      "Día 1: revisión técnica del espacio y programación de accesos.",
      "Día 2: despiece, cortes y confirmación de entregables.",
      "Día 3: fabricación y control de calidad.",
      "Día 4: instalación de superficies principales.",
      "Día 5: remates, limpieza y validación final.",
    ],
    scope: [
      "Coordinación de acceso a obra.",
      "Fabricación de piezas a medida.",
      "Instalación por fases.",
      "Control de acabados.",
      "Entrega técnica del proyecto.",
    ],
    challenge:
      "El área exigía una intervención organizada, con imagen corporativa sólida y materiales capaces de soportar uso continuo.",
    solution:
      "Se propuso un granito natural de comportamiento confiable para alto tránsito, acompañado por una secuencia de trabajo que redujera interferencias con la operación del espacio.",
    result:
      "El resultado fue una recepción más sólida y duradera, con mejor percepción de calidad y una obra ejecutada en tiempos controlados.",
    authorName: "Laura Martínez",
    authorRole: "Coordinación B2B y soporte de especificación",
    publishedAt: "2026-05-11",
    updatedAt: "2026-05-11",
    testimonial: {
      name: "Coordinación de obra",
      role: "Proyecto comercial",
      quote:
        "La claridad en tiempos y alcances fue clave. La intervención se programó bien y la solución material fue coherente con el uso del espacio.",
    },
    images: {
      cover: "/images/case-studies/granito-cover-ai.svg",
      before: "/images/case-studies/granito-before-ai.svg",
      process: "/images/case-studies/granito-process-ai.svg",
      final: "/images/case-studies/granito-final-ai.svg",
    },
  },
];
