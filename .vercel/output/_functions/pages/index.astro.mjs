/* empty css                                 */
import { c as createAstro, a as createComponent, e as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cx8UOM8M.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C4WX7Gd5.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import { C as Carousel, a as CarouselContent, b as CarouselItem, c as CarouselPrevious, d as CarouselNext } from '../chunks/carousel_Iwv_yVgi.mjs';
import { C as ContactForm } from '../chunks/ContactForm_DV_iHTOS.mjs';
export { renderers } from '../renderers.mjs';

const CarouselWrapper = ({ items }) => {
  return /* @__PURE__ */ jsx("div", { className: "relative px-4", children: /* @__PURE__ */ jsxs(Carousel, { className: "w-full max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx(CarouselContent, { className: "gap-4", children: items.map((item) => /* @__PURE__ */ jsx(CarouselItem, { className: "basis-full", children: /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-marmoles-black text-marmoles-white rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: item.image,
          alt: item.title,
          className: "w-full h-80 object-cover"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mb-3", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: item.description })
      ] })
    ] }) }) }, item.title)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 mt-4", children: [
      /* @__PURE__ */ jsx(CarouselPrevious, { className: "static translate-y-0" }),
      /* @__PURE__ */ jsx(CarouselNext, { className: "static translate-y-0" })
    ] })
  ] }) });
};

function TestimonialCarousel({ testimonies }) {
  return /* @__PURE__ */ jsx("div", { className: "relative px-4", children: /* @__PURE__ */ jsxs(Carousel, { className: "w-full max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx(CarouselContent, { className: "gap-4", children: testimonies.map((testimony) => /* @__PURE__ */ jsx(CarouselItem, { className: "basis-full", children: /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-marbles-black text-marbles-white p-6 rounded-lg h-full flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full overflow-hidden mb-4", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: testimony.image,
          alt: testimony.name,
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { className: "text-lg mb-4 text-center max-w-2xl", children: testimony.text }),
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-marbles-gold", children: testimony.name })
    ] }) }) }, testimony.name)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 mt-4", children: [
      /* @__PURE__ */ jsx(CarouselPrevious, { className: "static translate-y-0" }),
      /* @__PURE__ */ jsx(CarouselNext, { className: "static translate-y-0" })
    ] })
  ] }) });
}

const $$Astro = createAstro("https://marmolesdeluxe.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const testimonies = [
    {
      name: "Mar\xEDa Gonz\xE1lez",
      text: "Excelente trabajo en mi cocina. El m\xE1rmol qued\xF3 perfecto y la instalaci\xF3n fue muy profesional.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000"
    },
    {
      name: "Juan P\xE9rez",
      text: "Muy satisfecho con el servicio. Cumplieron con los tiempos y la calidad es excepcional.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
    },
    {
      name: "Ana Mart\xEDnez",
      text: "La mejor decisi\xF3n para renovar mi ba\xF1o. El equipo es muy profesional y el resultado es incre\xEDble.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000"
    },
    {
      name: "Carlos Rodr\xEDguez",
      text: "Trabajo impecable en mi sala. El m\xE1rmol qued\xF3 espectacular y la instalaci\xF3n fue muy limpia.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000"
    },
    {
      name: "Laura S\xE1nchez",
      text: "Excelente atenci\xF3n y calidad en el trabajo. Mi cocina qued\xF3 hermosa con el m\xE1rmol instalado.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
    }
  ];
  const projects = [
    {
      title: "Cocina Moderna",
      description: "Dise\xF1o contempor\xE1neo con m\xE1rmol de alta calidad",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1000"
    },
    {
      title: "Ba\xF1o de Lujo",
      description: "Acabados premium en m\xE1rmol natural",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000"
    },
    {
      title: "Isla de Cocina",
      description: "Centro de entretenimiento con acabados de lujo",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000"
    },
    {
      title: "Sala Principal",
      description: "Dise\xF1o elegante con m\xE1rmol italiano",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000"
    },
    {
      title: "Ba\xF1o Principal",
      description: "Espacio de relax con acabados premium",
      image: "https://images.unsplash.com/photo-1584622781564-4f00a87b4046?q=80&w=1000"
    },
    {
      title: "Comedor Formal",
      description: "Elegancia y estilo en cada detalle",
      image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1000"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "M\xE1rmoles Deluxe - La calidad del m\xE1rmol en el coraz\xF3n de Cali" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative h-screen flex items-center justify-center text-marmoles-white" style="background-image: url('https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1000'); background-size: cover; background-position: center;"> <div class="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div> <div class="container mx-auto px-4 z-20 text-center"> <h1 class="text-4xl md:text-6xl font-bold mb-4"> <span class="text-marmoles-gold">Mármoles</span> Deluxe
</h1> <p class="text-base md:text-lg italic font-light tracking-wide mb-12 text-gray-200">
"La elegancia del mármol en el corazón de tu hogar"
</p> <div class="mt-12"> <p class="text-xl md:text-2xl my-12">
Instalación profesional de mármoles en 5 días hábiles
</p> <a href="#contacto" class="bg-marmoles-gold text-marmoles-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
¡Solicita ya!
</a> </div> </div> </section>  <section class="py-20 bg-marmoles-white"> <div class="container mx-auto px-4"> <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
Nuestros Servicios
</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="p-6 border border-marmoles-gold rounded-lg text-center"> <h3 class="text-xl font-semibold mb-4 text-marmoles-gold">
Instalación
</h3> <p>
Instalación profesional con los más altos estándares de calidad
</p> </div> <div class="p-6 border border-marmoles-gold rounded-lg text-center"> <h3 class="text-xl font-semibold mb-4 text-marmoles-gold">
Transporte
</h3> <p>Transporte seguro y especializado de materiales</p> </div> <div class="p-6 border border-marmoles-gold rounded-lg text-center"> <h3 class="text-xl font-semibold mb-4 text-marmoles-gold">
Garantía
</h3> <p>Garantía extendida en todos nuestros trabajos</p> </div> </div> </div> </section>  <section class="py-20 bg-marmoles-black text-marmoles-white"> <div class="container mx-auto px-4"> <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
Nuestros Proyectos
</h2> ${renderComponent($$result2, "CarouselWrapper", CarouselWrapper, { "client:load": true, "items": projects, "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/CarouselWrapper", "client:component-export": "CarouselWrapper" })} </div> </section>  <section class="py-20 bg-marmoles-white"> <div class="container mx-auto px-4"> <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
Testimonios
</h2> ${renderComponent($$result2, "TestimonialCarousel", TestimonialCarousel, { "client:load": true, "testimonies": testimonies, "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/TestimonialCarousel", "client:component-export": "TestimonialCarousel" })} </div> </section>  <section class="py-20 bg-marmoles-black text-marmoles-white"> <div class="container mx-auto px-4"> <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
¿Por qué elegirnos?
</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> <div class="text-center"> <div class="text-marmoles-gold text-4xl mb-4">5</div> <h3 class="text-xl font-semibold mb-2">Días de Entrega</h3> <p>Tiempo récord de instalación</p> </div> <div class="text-center"> <div class="text-marmoles-gold text-4xl mb-4">100%</div> <h3 class="text-xl font-semibold mb-2">Garantizado</h3> <p>Trabajos con garantía extendida</p> </div> <div class="text-center"> <div class="text-marmoles-gold text-4xl mb-4">24/7</div> <h3 class="text-xl font-semibold mb-2">Soporte</h3> <p>Atención personalizada</p> </div> <div class="text-center"> <div class="text-marmoles-gold text-4xl mb-4">✓</div> <h3 class="text-xl font-semibold mb-2">Calidad</h3> <p>Materiales premium</p> </div> </div> </div> </section>  <section id="contacto" class="py-20 bg-marmoles-white"> <div class="container mx-auto px-4"> <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
Solicita tu Visita Técnica
</h2> <div class="max-w-2xl mx-auto"> ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/ContactForm", "client:component-export": "default" })} </div> </div> </section>  <section class="py-20 bg-marmoles-white"> <div class="container mx-auto px-4"> <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
Nuestra Ubicación
</h2> <div class="w-full h-96 rounded-lg overflow-hidden shadow-lg"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.6549444444444!2d-76.53333333333333!3d3.433333333333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6c7c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sCl.%2043a%20Nte.%20%235N%2069%2C%20COMUNA%204%2C%20Cali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe> </div> <div class="mt-8 text-center"> <p class="text-lg font-medium">Visítanos en nuestra sede principal</p> <p class="text-marmoles-gold">
Cl. 43a Nte. #5N 69, COMUNA 4, Cali, Valle del Cauca
</p> </div> </div> </section> ` })}`;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/index.astro", void 0);

const $$file = "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
