/* empty css                                 */
import { a as createComponent, f as renderTemplate, e as renderComponent, g as renderScript, m as maybeRenderHead } from '../chunks/astro/server_Cx8UOM8M.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C4WX7Gd5.mjs';
import { P as ProductCard } from '../chunks/ProductCard_BBpe3mai.mjs';
import 'clsx';
import { P as PageLoader } from '../chunks/PageLoader_CIKNeNPW.mjs';
export { renderers } from '../renderers.mjs';

const quarstone = [
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
    name: "Quarstone Gris Cl\xE1sico",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Quarstone_Gris_Clasico.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Quarstone_Gris_Clasico_desing.png"
  },
  {
    name: "Rojo Estelar",
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Rojo_Estelar%20.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Rojo_Estelar_desing%20.png"
  }
];
createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/Quarstone.astro", void 0);

const $$Quartzstone = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Quartzstone - M\xE1rmoles Deluxe" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageLoader", PageLoader, { "client:load": true, "isLoading": true, "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/PageLoader.tsx", "client:component-export": "default" })} ${maybeRenderHead()}<main class="py-20 pt-24"> <div class="container mx-auto px-4"> <h1 class="text-4xl md:text-5xl font-bold text-center mb-12">
Quartzstone
</h1> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"> ${quarstone.map((stone) => renderTemplate`${renderComponent($$result2, "ProductCard", ProductCard, { "client:load": true, "name": stone.name, "description": "Cuarzo de alta calidad y resistencia", "images": [stone.image, stone.design], "features": [
    "Resistente a rayones",
    "No poroso",
    "F\xE1cil mantenimiento",
    "Amplia gama de colores"
  ], "category": "Quartzstone", "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/ProductCard.tsx", "client:component-export": "default" })}`)} </div> </div> </main> ` })} ${renderScript($$result, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/quartzstone.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/quartzstone.astro", void 0);

const $$file = "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/quartzstone.astro";
const $$url = "/quartzstone";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Quartzstone,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
