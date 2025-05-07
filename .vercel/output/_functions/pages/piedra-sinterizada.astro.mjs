/* empty css                                       */
import { c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_PWDZLNn0.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BXjG78Yq.mjs';
import { P as ProductCard } from '../chunks/ProductCard_Vr1AiKVd.mjs';
import { P as PageLoader } from '../chunks/PageLoader_CIKNeNPW.mjs';
export { renderers } from '../renderers.mjs';

const neolithFeatures = [
  "Resistente a la abrasión y al rayado",
  "Resistente a altas temperaturas",
  "Resistente a químicos, ácidos y solventes",
  "Baja absorción de líquidos",
  "Adecuado para manipular alimentos",
  "Puede usarse en interiores o exteriores",
  "25 años de garantía"
];
const alteaFeatures = [
  "Resistente a la abrasión y al rayado",
  "Resistente a altas temperaturas",
  "Resistente a químicos, ácidos y solventes",
  "Baja absorción de líquidos",
  "Adecuado para manipular alimentos",
  "Puede usarse en interiores o exteriores",
  "10 años de garantía"
];
const dektonFeatures = [
  "Resistente a la abrasión y al rayado",
  "Resistente a altas temperaturas",
  "Resistente a químicos, ácidos y solventes",
  "Baja absorción de líquidos",
  "Adecuado para manipular alimentos",
  "Puede usarse en interiores o exteriores",
  "25 años de garantía"
];
const silestoneFeatures = [
  "Resistente a la abrasión y al rayado",
  "Resistente a altas temperaturas",
  "25 años de garantía",
  "Resistente a químicos, ácidos y solventes",
  "Baja absorción de líquidos",
  "Adecuado para manipular alimentos",
  "Puede usarse en interiores o exteriores"
];
const neolithStones = [
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
const alteaStones = [
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
const dektonStones = [
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
const silestoneStones = [
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

const $$PiedraSinterizada = createComponent(($$result, $$props, $$slots) => {
  const stoneCategories = [
    { title: "Neolith", stones: neolithStones },
    { title: "Altea", stones: alteaStones },
    { title: "Dekton", stones: dektonStones },
    { title: "Silestone", stones: silestoneStones }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Piedra Sinterizada - M\xE1rmoles Deluxe" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageLoader", PageLoader, { "client:load": true, "isLoading": true, "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/PageLoader.tsx", "client:component-export": "default" })} ${maybeRenderHead()}<main class="py-20 pt-24"> <div class="container mx-auto px-4"> <h1 class="text-4xl md:text-5xl font-bold text-center mb-12">
Piedra Sinterizada
</h1> ${stoneCategories.map((category, index) => renderTemplate`<div> <h2 class="text-3xl font-bold text-center mb-8">${category.title}</h2> <div${addAttribute(`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${index < stoneCategories.length - 1 ? "mb-16" : ""}`, "class")}> ${category.stones.map((stone) => renderTemplate`${renderComponent($$result2, "ProductCard", ProductCard, { "client:load": true, "name": stone.name, "description": "Piedra sinterizada de alta calidad", "images": [stone.image, stone.design], "features": stone.features, "category": category.title, "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/ProductCard.tsx", "client:component-export": "default" })}`)} </div> </div>`)} </div> </main> ` })} ${renderScript($$result, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/piedra-sinterizada.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/piedra-sinterizada.astro", void 0);

const $$file = "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/piedra-sinterizada.astro";
const $$url = "/piedra-sinterizada";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PiedraSinterizada,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
