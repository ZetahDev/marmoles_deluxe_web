export interface Stone {
  name: string;
  image: string;
  design: string;
  features?: string[];
}

// Define características por tipo de piedra (solo las 6 más importantes)
export const neolithFeatures: string[] = [
  "Resistente a la abrasión y al rayado",
  "Resistente a altas temperaturas",
  "Resistente a químicos, ácidos y solventes",
  "Baja absorción de líquidos",
  "Adecuado para manipular alimentos",
  "Puede usarse en interiores o exteriores",
  "25 años de garantía"
];

export const alteaFeatures: string[] = [
  "Resistente a la abrasión y al rayado",
  "Resistente a altas temperaturas",
  "Resistente a químicos, ácidos y solventes",
  "Baja absorción de líquidos",
  "Adecuado para manipular alimentos",
  "Puede usarse en interiores o exteriores",
  "10 años de garantía"
];

export const dektonFeatures: string[] = [
  "Resistente a la abrasión y al rayado",
  "Resistente a altas temperaturas",
  "Resistente a químicos, ácidos y solventes",
  "Baja absorción de líquidos",
  "Adecuado para manipular alimentos",
  "Puede usarse en interiores o exteriores",
  "25 años de garantía"
];

export const silestoneFeatures: string[] = [
  "Resistente a la abrasión y al rayado",
  "Resistente a altas temperaturas",
  "25 años de garantía",
  "Resistente a químicos, ácidos y solventes",
  "Baja absorción de líquidos",
  "Adecuado para manipular alimentos",
  "Puede usarse en interiores o exteriores"
];

// Definir datos de piedras
export const neolithStones: Stone[] = [
  {
    name: "Artisan Silk",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Artisan_Silk.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Artisan_Silk_designs.png",
    features: neolithFeatures
  },
  {
    name: "Black Obsession Silk",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Black_Obsession_Silk.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Black_Obsession_Silk_designs.png",
    features: neolithFeatures
  },
  {
    name: "Rapolano Silk",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Rapolano_Silk.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Rapolano_Silk_designs.png",
    features: neolithFeatures
  },
  {
    name: "White Sands Silk",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/WhiteSands_Silk.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/WhiteSands_Silk_designs.png",
    features: neolithFeatures
  }
];

export const alteaStones: Stone[] = [
  {
    name: "Antracita Dark",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Antracita_Dark.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Antracita_Dark_designs.png",
    features: alteaFeatures
  },
  {
    name: "Black Marquina",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Black_Marquina.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Black_Marquina_designs.png",
    features: alteaFeatures
  },
  {
    name: "Calacatta Grey",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Grey.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Grey_designs.png",
    features: alteaFeatures
  },
  {
    name: "Calacatta Royale",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Royale.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Royale_designs.png",
    features: alteaFeatures
  },
  {
    name: "Cement Grey",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Cement_Grey.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Cement_Grey_designs.png",
    features: alteaFeatures
  },
  {
    name: "Laurent Gold",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Laurent_Gold.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Laurent_Gold_designs.png",
    features: alteaFeatures
  },
  {
    name: "Phantom Dark Grey",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Phantom_Dark_Grey.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Phantom_Dark_Grey_designs.png",
    features: alteaFeatures
  },
  {
    name: "Pulpis Grey",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pulpis_Grey.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pulpis_Grey_designs.png",
    features: alteaFeatures
  },
  {
    name: "Pure Black",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_Black.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_Black_designs.png",
    features: alteaFeatures
  },
  {
    name: "Pure White",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_White.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_White_designs.png",
    features: alteaFeatures
  },
  {
    name: "Snow River",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Snow_River.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Snow_River_designs.png",
    features: alteaFeatures
  },
  {
    name: "Statuario",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Statuario.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Statuario_designs.png",
    features: alteaFeatures
  }
];

export const dektonStones: Stone[] = [
  {
    name: "Aeris",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aeris.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aeris_designs.png",
    features: dektonFeatures
  },
  {
    name: "Aura",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aura.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aura_designs.png",
    features: dektonFeatures
  },
  {
    name: "Awake",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Awake.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Awake_designs.png",
    features: dektonFeatures
  },
  {
    name: "Bergen",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Bergen.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Bergen_designs.png",
    features: dektonFeatures
  }
];

export const silestoneStones: Stone[] = [
  {
    name: "Brass Relish",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Brass_Relish.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Brass_Relish_designs.png",
    features: silestoneFeatures
  },
  {
    name: "Cala Blue",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cala_Blue.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cala_Blue_designs.png",
    features: silestoneFeatures
  },
  {
    name: "Cinder Craze",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cinder_Craze.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cinder_Craze_designs.png",
    features: silestoneFeatures
  },
  {
    name: "Concrete Pulse",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Concrete_Pulse.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Concrete_Pulse_designs.png",
    features: silestoneFeatures
  },
  {
    name: "Gris Expo",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Gris_Expo.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Gris_Expo_designs.png",
    features: silestoneFeatures
  },
  {
    name: "Lime Delight",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Lime_Delight.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Lime_Delight_designs.png",
    features: silestoneFeatures
  },
  {
    name: "Miami White",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Miami_White.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Miami_White_designs.png",
    features: silestoneFeatures
  },
  {
    name: "Noka",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Noka.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Noka_designs.png",
    features: silestoneFeatures
  },
  {
    name: "Rougui",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Rougui.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Rougui_designs.png",
    features: silestoneFeatures
  }
]; 