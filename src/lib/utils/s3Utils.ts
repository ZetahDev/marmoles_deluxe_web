export interface Stone {
  name: string;
  image: string;
  design: string;
}

/**
 * Formats a filename into a human-readable name
 * @param filename The raw filename from S3
 * @returns Formatted name with spaces instead of underscores and without extension
 */
function formatStoneName(filename: string): string {
  // Remove file extension and path
  const baseFilename = filename.split('/').pop()?.split('.')[0] || '';
  
  // Skip design files (they end with _desing)
  if (baseFilename.endsWith('_desing')) {
    return '';
  }
  
  // Replace underscores with spaces and capitalize words
  return baseFilename
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// Default fallback data when S3 fetching fails
const fallbackData: Record<string, Stone[]> = {
  'MARMOL': [
    {
      name: "Blanco Carrara",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Blanco_Carrara.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Blanco_Carrara_desing.png"
    },
    {
      name: "Crema Marfil",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Crema_Marfil.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Crema_Marfil_desing.png"
    },
    {
      name: "Marrón Emperador",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Marron_Emperador.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Marron_Emperador_desing.png"
    }
  ],
  'QUARSTONE': [
    {
      name: "Blanco Estelar",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Estelar%20.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Estelar_desing.png"
    },
    {
      name: "Blanco Extra",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Extra.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Extra_desing.png"
    },
    {
      name: "Blanco Polar",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Polar%20.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Polar_desing.png"
    },
    {
      name: "Gris Estelar",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Gris_Estelar.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Gris_Estelar_desing.png"
    },
    {
      name: "Negro Estelar",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Negro_estelar.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Negro_estelar_desing.png"
    },
    {
      name: "Quarstone Beige",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Quarstone_Beige%20.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Quarstone_Beige_desing.png"
    },
    {
      name: "Quarstone Gris Clasico",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Quarstone_Gris_Clasico.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Quarstone_Gris_Clasico_desing.png"
    },
    {
      name: "Rojo Estelar",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Rojo_Estelar%20.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Rojo_Estelar_desing%20.png"
    }
  ],
  'GRANITOS+NATURALES': [
    {
      name: "Amarillo Ornamental",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Amariilo_Ornamental%20.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Amariilo_Ornamental%20_desing.png"
    },
    {
      name: "Artic Cream",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Artic_Cream.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Artic_Cream_designs.png"
    },
    {
      name: "Bengal Black",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bengal_Black.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bengal_Black_designs.png"
    },
    {
      name: "Bianco Azurro",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bianco_Azurro.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bianco_Azurro_designs.png"
    },
    {
      name: "Bianco Miramare",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bianco_Miramare.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bianco_Miramare_designs.png"
    },
    {
      name: "Black River",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Black_River.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Black_River_designs.png"
    },
    {
      name: "Blue Fantasy",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Blue_Fantasy.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Blue_Fantasy_designs.png"
    },
    {
      name: "Blue Sky",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Blue_Sky.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Blue_Sky_designs.png"
    },
    {
      name: "Delicatus",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Delicatus.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Delicatus_designs.png"
    },
    {
      name: "Golden White",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Golden_Withe.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Golden_Withe_designs.png"
    },
    {
      name: "Negro San Gabriel",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Negro_San_Gabriel.jpg",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Negro_San_Gabriel_desing.png"
    },
    {
      name: "Roma Exotico",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Roma_Exotico.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Roma_Exotico_desing.png"
    },
    {
      name: "Royal Gold",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Royal_Gold.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Royal_Gold_designs.png"
    },
    {
      name: "Silver Gray",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Silver_Gray.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Silver_Gray_desing.png"
    },
    {
      name: "Verde Ubatuba",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Verde_Ubatuba.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Verde_Ubatuba_designs.png"
    },
    {
      name: "White Delicatus",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/White_Delicatus.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/White_Delicatus_designs.png"
    }
  ],
  'PIEDRA+SINTERIZADA/NEOLITH': [
    {
      name: "Artisan Silk",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Artisan_Silk.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Artisan_Silk_designs.png",
    },
    {
      name: "Black Obsession Silk",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Black_Obsession_Silk.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Black_Obsession_Silk_designs.png",
    },
    {
      name: "Rapolano Silk",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Rapolano_Silk.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Rapolano_Silk_designs.png",
    },
    {
      name: "White Sands Silk",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/WhiteSands_Silk.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/WhiteSands_Silk_designs.png",
    }
  ],
  'PIEDRA+SINTERIZADA/ALTEA': [
    {
      name: "Antracita Dark",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Antracita_Dark.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Antracita_Dark_designs.png"
    },
    {
      name: "Black Marquina",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Black_Marquina.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Black_Marquina_designs.png"
    },
    {
      name: "Calacatta Grey",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Grey.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Grey_designs.png"
    },
    {
      name: "Calacatta Royale",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Royale.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Royale_designs.png"
    },
    {
      name: "Cement Grey",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Cement_Grey.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Cement_Grey_designs.png"
    },
    {
      name: "Laurent Gold",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Laurent_Gold.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Laurent_Gold_designs.png"
    },
    {
      name: "Phantom Dark Grey",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Phantom_Dark_Grey.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Phantom_Dark_Grey_designs.png"
    },
    {
      name: "Pulpis Grey",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pulpis_Grey.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pulpis_Grey_designs.png"
    },
    {
      name: "Pure Black",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_Black.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_Black_designs.png"
    },
    {
      name: "Pure White",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_White.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_White_designs.png"
    },
    {
      name: "Snow River",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Snow_River.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Snow_River_designs.png"
    },
    {
      name: "Statuario",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Statuario.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Statuario_designs.png"
    },
  ],

  'PIEDRA+SINTERIZADA/DEKTON': [

    {
      name: "Aeris",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aeris.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aeris_designs.png"
    },
    {
      name: "Aura",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aura.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aura_designs.png"
    },
    {
      name: "Awake",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Awake.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Awake_designs.png"
    },
    {
      name: "Bergen",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Bergen.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Bergen_designs.png"
    } 
  ],

  'PIEDRA+SINTERIZADA/SILESTONE': [
    {
      name: "Brass Relish",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Brass_Relish.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Brass_Relish_designs.png"
    },
    {
      name: "Cala Blue",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cala_Blue.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cala_Blue_designs.png"
    },
    {
      name: "Cinder Craze",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cinder_Craze.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cinder_Craze_designs.png"
    },
    {
      name: "Concrete Pulse",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Concrete_Pulse.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Concrete_Pulse_designs.png"
    },
    {
      name: "Gris Expo",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Gris_Expo.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Gris_Expo_designs.png"
    },
    {
      name: "Lime Delight",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Lime_Delight.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Lime_Delight_designs.png"
    },
    {
      name: "Miami White",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Miami_White.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Miami_White_designs.png"
    },
    {
      name: "Noka",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Noka.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Noka_designs.png"
    },
    {
      name: "Rougui",
      image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Rougui.png",
      design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Rougui_designs.png"
    }
  ]
};

/**
 * Lists all stones from the specified S3 folder
 * @param category The folder category (MARMOL, GRANITO, etc.)
 * @returns Promise with Stone[] data
 */
export async function listStonesFromS3(category: string): Promise<Stone[]> {
  try {
    console.log(`Retrieving stone data for ${category}`);
    
    // Try exact match first
    if (fallbackData[category]) {
      console.log(`Found ${fallbackData[category].length} stones for ${category}`);
      return fallbackData[category];
    }
    
    // If it's a subcategory with a path, try to find it directly
    for (const key in fallbackData) {
      if (key === category) {
        console.log(`Found ${fallbackData[key].length} stones for ${category} (exact match)`);
        return fallbackData[key];
      }
    }
    
    // If no direct match, look for partial matches
    for (const key in fallbackData) {
      if (key.includes(category)) {
        console.log(`Found ${fallbackData[key].length} stones for ${category} (partial match in key)`);
        return fallbackData[key];
      }
    }
    
    // If no partial match, check if any key is a substring of the query
    for (const key in fallbackData) {
      if (category.includes(key)) {
        console.log(`Found ${fallbackData[key].length} stones for ${category} (key in category)`);
        return fallbackData[key];
      }
    }
    
    console.warn(`No stones found for ${category}`);
    return [];
  } catch (error) {
    console.error("Error fetching stones:", error);
    return [];
  }
} 