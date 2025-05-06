/* empty css                                 */
import { a as createComponent, m as maybeRenderHead, b as addAttribute, f as renderTemplate, e as renderComponent, g as renderScript } from '../chunks/astro/server_Cx8UOM8M.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C4WX7Gd5.mjs';
import { P as ProductCard } from '../chunks/ProductCard_BBpe3mai.mjs';
import 'clsx';
import { P as PageLoader } from '../chunks/PageLoader_CIKNeNPW.mjs';
export { renderers } from '../renderers.mjs';

const granitosNaturales = [
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
    name: "Roma Ex\xF3tico",
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
    image: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Silver_Gray_desing.png",
    design: "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/GRANITOS+NATURALES/Silver_Gray.png"
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
];
createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="container mx-auto px-4 py-16"> <h2 class="text-3xl font-bold text-center mb-12">Granitos Naturales</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> ${granitosNaturales.map((stone, index) => renderTemplate`<div class="group relative overflow-hidden rounded-lg shadow-lg"> <div class="relative h-64 overflow-hidden bg-gray-100"> <img${addAttribute(stone.image, "src")}${addAttribute(stone.name, "alt")} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async"${addAttribute(index < 4 ? "high" : "low", "fetchpriority")} width="400" height="256"> <img${addAttribute(stone.design, "src")}${addAttribute(`${stone.name} dise\xF1o`, "alt")} class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" loading="lazy" decoding="async" width="400" height="256"> </div> <div class="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"> <h3 class="text-lg font-semibold">${stone.name}</h3> </div> </div>`)} </div> </div>`;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/GranitosNaturales.astro", void 0);

const $$GranitosNaturales = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Granitos Naturales - M\xE1rmoles Deluxe" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageLoader", PageLoader, { "client:load": true, "isLoading": true, "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/PageLoader.tsx", "client:component-export": "default" })} ${maybeRenderHead()}<main class="py-20 pt-24"> <div class="container mx-auto px-4"> <h1 class="text-4xl md:text-5xl font-bold text-center mb-12">
Granitos Naturales
</h1> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"> ${granitosNaturales.map((stone) => renderTemplate`${renderComponent($$result2, "ProductCard", ProductCard, { "client:load": true, "name": stone.name, "description": "Granito natural de alta calidad", "images": [stone.image, stone.design], "features": [
    "Resistente a manchas",
    "Alta durabilidad",
    "Elegancia natural",
    "Resistente al calor"
  ], "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/ProductCard.tsx", "client:component-export": "default" })}`)} </div> </div> </main> ` })} ${renderScript($$result, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/granitos-naturales.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/granitos-naturales.astro", void 0);

const $$file = "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/granitos-naturales.astro";
const $$url = "/granitos-naturales";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$GranitosNaturales,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
