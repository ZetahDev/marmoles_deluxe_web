export interface Stone {
  name: string;
  image: string;
  design: string;
}

const S3_BUCKET = "marmolesdeluxe";
const S3_REGION = "us-east-2";
const S3_BASE_URL = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`;

/**
 * Formats a filename into a human-readable name
 * @param filename The raw filename from S3
 * @returns Formatted name with spaces instead of underscores and without extension
 */
function formatStoneName(filename: string): string {
  // Remove file extension and path
  const baseFilename = filename.split("/").pop()?.split(".")[0] || "";

  // Normalize and remove design suffixes if present (accept "design", "designs", "desing", etc.)
  const cleanBase = baseFilename.replace(/_(?:desing|design)s?$/i, "");

  // Replace underscores with spaces and capitalize words
  return cleanBase.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Lists files from S3 bucket using the public XML API
 * @param prefix The folder prefix to list (e.g., 'PIEDRA+SINTERIZADA/ALTEA')
 * @returns Array of file keys
 */
async function listS3Files(prefix: string): Promise<string[]> {
  try {
    const url = `${S3_BASE_URL}/?list-type=2&prefix=FOTOS/${prefix}/`;
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(
        `⚠️ Failed to fetch S3 listing for ${prefix}: ${response.status}`
      );
      return [];
    }

    const xmlText = await response.text();

    // Parse XML to extract file keys
    const keyMatches = xmlText.matchAll(/<Key>(.*?)<\/Key>/g);
    const keys: string[] = [];

    for (const match of keyMatches) {
      const key = match[1];
      // Only include image files (webp, png, jpg)
      if (/\.(webp|png|jpg|jpeg)$/i.test(key)) {
        keys.push(key);
      }
    }

    return keys;
  } catch (error) {
    console.error(`❌ Error listing S3 files for ${prefix}:`, error);
    return [];
  }
}

/**
 * Groups S3 files into Stone objects (pairs main image with design image)
 * @param files Array of S3 file keys
 * @returns Array of Stone objects
 */
function groupStoneFiles(files: string[]): Stone[] {
  const stoneMap = new Map<string, { image?: string; design?: string }>();

  files.forEach((file) => {
    const filename = file.split("/").pop() || "";
    const baseName = filename.replace(/\.(webp|png|jpg|jpeg)$/i, "");

    // Detect design files by known suffixes and normalize main name
    const isDesign = /_(?:desing|design)s?$/i.test(baseName);
    const mainName = isDesign
      ? baseName.replace(/_(?:desing|design)s?$/i, "")
      : baseName;

    const existing = stoneMap.get(mainName) || {};
    if (isDesign) {
      stoneMap.set(mainName, { ...existing, design: `${S3_BASE_URL}/${file}` });
    } else {
      stoneMap.set(mainName, { ...existing, image: `${S3_BASE_URL}/${file}` });
    }
  });

  // Convert map to Stone array
  const stones: Stone[] = [];
  stoneMap.forEach((value, key) => {
    if (value.image) {
      // Only include if main image exists
      stones.push({
        name: formatStoneName(key),
        image: value.image,
        design: value.design || value.image, // Fallback to main image if no design
      });
    }
  });

  return stones;
}

// Default fallback data when S3 fetching fails
const fallbackData: Record<string, Stone[]> = {
  MARMOL: [
    {
      name: "Blanco Carrara",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Blanco_Carrara.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Blanco_Carrara_desing.png",
    },
    {
      name: "Crema Marfil",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Crema_Marfil.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Crema_Marfil_desing.png",
    },
    {
      name: "Marrón Emperador",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Marron_Emperador.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/MARMOL/Marron_Emperador_desing.png",
    },
  ],
  QUARSTONE: [
    {
      name: "Blanco Estelar",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Estelar%20.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Estelar_desing.png",
    },
    {
      name: "Blanco Extra",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Extra.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Extra_desing.png",
    },
    {
      name: "Blanco Polar",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Polar%20.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Polar_desing.png",
    },
    {
      name: "Gris Estelar",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Gris_Estelar.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Gris_Estelar_desing.png",
    },
    {
      name: "Negro Estelar",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Negro_estelar.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Negro_estelar_desing.png",
    },
    {
      name: "Quarstone Beige",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Quarstone_Beige%20.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Quarstone_Beige_desing.png",
    },
    {
      name: "Quarstone Gris Clasico",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Quarstone_Gris_Clasico.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Quarstone_Gris_Clasico_desing.png",
    },
    {
      name: "Rojo Estelar",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Rojo_Estelar%20.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Rojo_Estelar_desing%20.png",
    },
  ],
  "GRANITOS+NATURALES": [
    {
      name: "Amarillo Ornamental",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Amariilo_Ornamental%20.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Amariilo_Ornamental%20_desing.png",
    },
    {
      name: "Artic Cream",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Artic_Cream.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Artic_Cream_designs.png",
    },
    {
      name: "Bengal Black",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bengal_Black.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bengal_Black_designs.png",
    },
    {
      name: "Bianco Azurro",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bianco_Azurro.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bianco_Azurro_designs.png",
    },
    {
      name: "Bianco Miramare",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bianco_Miramare.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Bianco_Miramare_designs.png",
    },
    {
      name: "Black River",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Black_River.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Black_River_designs.png",
    },
    {
      name: "Blue Fantasy",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Blue_Fantasy.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Blue_Fantasy_designs.png",
    },
    {
      name: "Blue Sky",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Blue_Sky.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Blue_Sky_designs.png",
    },
    {
      name: "Delicatus",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Delicatus.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Delicatus_designs.png",
    },
    {
      name: "Golden White",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Golden_Withe.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Golden_Withe_designs.png",
    },
    {
      name: "Negro San Gabriel",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Negro_San_Gabriel.jpg",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Negro_San_Gabriel_desing.png",
    },
    {
      name: "Roma Exotico",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Roma_Exotico.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Roma_Exotico_desing.png",
    },
    {
      name: "Royal Gold",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Royal_Gold.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Royal_Gold_designs.png",
    },
    {
      name: "Silver Gray",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Silver_Gray_desing.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Silver_Gray.png",
    },
    {
      name: "Verde Ubatuba",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Verde_Ubatuba.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Verde_Ubatuba_designs.png",
    },
    {
      name: "White Delicatus",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/White_Delicatus.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/White_Delicatus_designs.png",
    },
  ],
  "PIEDRA+SINTERIZADA/NEOLITH": [
    {
      name: "Artisan Silk",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Artisan_Silk.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Artisan_Silk_designs.png",
    },
    {
      name: "Black Obsession Silk",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Black_Obsession_Silk.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Black_Obsession_Silk_designs.png",
    },
    {
      name: "Rapolano Silk",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Rapolano_Silk.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/Rapolano_Silk_designs.png",
    },
    {
      name: "White Sands Silk",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/WhiteSands_Silk.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/NEOLITH/WhiteSands_Silk_designs.png",
    },
  ],
  "PIEDRA+SINTERIZADA/ALTEA": [
    {
      name: "Antracita Dark",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Antracita_Dark.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Antracita_Dark_designs.webp",
    },
    {
      name: "Black Marquina",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Black_Marquina.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Black_Marquina_designs.webp",
    },
    {
      name: "Calacatta Grey",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Grey.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Grey_designs.webp",
    },
    {
      name: "Calacatta Royale",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Royale.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Calacatta_Royale_designs.webp",
    },
    {
      name: "Cement Grey",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Cement_Grey.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Cement_Grey_designs.webp",
    },
    {
      name: "Laurent Gold",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Laurent_Gold.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Laurent_Gold_designs.webp",
    },
    {
      name: "Phantom Dark Grey",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Phantom_Dark_Grey.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Phantom_Dark_Grey_designs.webp",
    },
    {
      name: "Pulpis Grey",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pulpis_Grey.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pulpis_Grey_designs.webp",
    },
    {
      name: "Pure Black",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_Black.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_Black_designs.webp",
    },
    {
      name: "Pure White",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_White.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Pure_White_designs.webp",
    },
    {
      name: "Snow River",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Snow_River.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Snow_River_designs.webp",
    },
    {
      name: "Statuario",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Statuario.webp",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/ALTEA/Statuario_designs.webp",
    },
  ],

  "PIEDRA+SINTERIZADA/DEKTON": [
    {
      name: "Aeris",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aeris.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aeris_designs.png",
    },
    {
      name: "Aura",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aura.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Aura_designs.png",
    },
    {
      name: "Awake",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Awake.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Awake_designs.png",
    },
    {
      name: "Bergen",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Bergen.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/DEKTON/Bergen_designs.png",
    },
  ],

  "PIEDRA+SINTERIZADA/SILESTONE": [
    {
      name: "Brass Relish",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Brass_Relish.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Brass_Relish_designs.png",
    },
    {
      name: "Cala Blue",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cala_Blue.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cala_Blue_designs.png",
    },
    {
      name: "Cinder Craze",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cinder_Craze.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Cinder_Craze_designs.png",
    },
    {
      name: "Concrete Pulse",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Concrete_Pulse.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Concrete_Pulse_designs.png",
    },
    {
      name: "Gris Expo",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Gris_Expo.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Gris_Expo_designs.png",
    },
    {
      name: "Lime Delight",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Lime_Delight.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Lime_Delight_designs.png",
    },
    {
      name: "Miami White",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Miami_White.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Miami_White_designs.png",
    },
    {
      name: "Noka",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Noka.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Noka_designs.png",
    },
    {
      name: "Rougui",
      image:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Rougui.png",
      design:
        "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/PIEDRA+SINTERIZADA/SILESTONE/Rougui_designs.png",
    },
  ],
};

/**
 * Lists all stones from the specified S3 folder dynamically
 * @param category The folder category (MARMOL, GRANITOS+NATURALES, PIEDRA+SINTERIZADA/ALTEA, etc.)
 * @returns Promise with Stone[] data
 */
export async function listStonesFromS3(category: string): Promise<Stone[]> {
  try {
    console.log(`🔍 Fetching stones dynamically from S3 for: ${category}`);

    // List files from S3
    const files = await listS3Files(category);

    if (files.length === 0) {
      console.warn(
        `⚠️ No files found in S3 for ${category}, using fallback data`
      );
      return getFallbackData(category);
    }

    // Group files into Stone objects
    const stones = groupStoneFiles(files);

    console.log(`✅ Found ${stones.length} stones for ${category}`);
    return stones;
  } catch (error) {
    console.error(`❌ Error fetching stones for ${category}:`, error);
    return getFallbackData(category);
  }
}

/**
 * Gets fallback data for a category (used when S3 fetch fails)
 */
function getFallbackData(category: string): Stone[] {
  // Try exact match first
  if (fallbackData[category]) {
    return fallbackData[category];
  }

  // Look for partial matches
  for (const key in fallbackData) {
    if (key === category || key.includes(category) || category.includes(key)) {
      return fallbackData[key];
    }
  }

  console.warn(`No fallback data found for ${category}`);
  return [];
}
