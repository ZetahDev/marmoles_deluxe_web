import { c as createAstro, a as createComponent, b as addAttribute, r as renderHead, d as renderSlot, e as renderComponent, f as renderTemplate } from './astro/server_Cx8UOM8M.mjs';
import 'kleur/colors';
/* empty css                              */
import { Toaster } from 'react-hot-toast';
import { $ as $$Index } from './index_LJJs1GYQ.mjs';
import { v as validateToken } from './auth_CWrnEh9N.mjs';

const $$Astro = createAstro("https://marmolesdeluxe.com");
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const isAuthenticated = await validateToken();
  if (!isAuthenticated) {
    return Astro2.redirect("/admin");
  }
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title || "Panel de Administraci\xF3n"}</title>${renderHead()}</head> <body> <div class="min-h-screen bg-gray-100"> <main class="py-10"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> ${renderSlot($$result, $$slots["default"])} </div> </main> </div> ${renderComponent($$result, "Toaster", Toaster, { "position": "top-right" })} ${renderComponent($$result, "SpeedInsights", $$Index, {})} </body></html>`;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
