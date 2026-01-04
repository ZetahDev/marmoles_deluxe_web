const S3_BASE_URL = 'https://marmolesdeluxe.s3.us-east-2.amazonaws.com';

function groupStoneFiles(files) {
  const stoneMap = new Map();

  files.forEach((file) => {
    const filename = file.split('/').pop() || '';
    const baseName = filename.replace(/\.(webp|png|jpg|jpeg)$/i, '');

    const isDesign = /_(?:desing|design)s?$/i.test(baseName);
    const mainName = isDesign
      ? baseName.replace(/_(?:desing|design)s?$/i, '')
      : baseName;

    const existing = stoneMap.get(mainName) || {};
    if (isDesign) {
      stoneMap.set(mainName, { ...existing, design: `${S3_BASE_URL}/${file}` });
    } else {
      stoneMap.set(mainName, { ...existing, image: `${S3_BASE_URL}/${file}` });
    }
  });

  const stones = [];
  stoneMap.forEach((value, key) => {
    if (value.image) {
      stones.push({
        name: key,
        image: value.image,
        design: value.design || value.image,
      });
    }
  });

  return stones;
}

// Two scenarios: design listed after main, and design listed before main
const filesScenario1 = [
  'FOTOS/PIEDRA+SINTERIZADA/AMASIA/Amasia_Texturizado.webp',
  'FOTOS/PIEDRA+SINTERIZADA/AMASIA/Amasia_Texturizado_designs.webp',
];

const filesScenario2 = [
  'FOTOS/PIEDRA+SINTERIZADA/AMASIA/Amasia_Texturizado_designs.webp',
  'FOTOS/PIEDRA+SINTERIZADA/AMASIA/Amasia_Texturizado.webp',
];

console.log('Scenario 1 (main then designs):');
console.log(JSON.stringify(groupStoneFiles(filesScenario1), null, 2));

console.log('\nScenario 2 (designs then main):');
console.log(JSON.stringify(groupStoneFiles(filesScenario2), null, 2));
