/* empty css                                    */
import { c as createAstro, a as createComponent, e as renderComponent, f as renderTemplate, m as maybeRenderHead, g as renderScript, b as addAttribute } from '../../chunks/astro/server_Cx8UOM8M.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ChzZyyJe.mjs';
import { A as API_URL } from '../../chunks/config_Dec4CqDx.mjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v as validateToken } from '../../chunks/auth_CWrnEh9N.mjs';
export { renderers } from '../../renderers.mjs';

create()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      setAuth: (authData) => set({
        accessToken: authData?.accessToken ?? null,
        isAuthenticated: !!authData?.accessToken
      }),
      logout: () => set({
        accessToken: null,
        isAuthenticated: false
      })
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

const getMaterials = async () => {
  const response = await fetch(`${API_URL}/materiales`);
  if (!response.ok) {
    throw new Error("Failed to fetch materials");
  }
  return response.json();
};

const $$Astro = createAstro("https://marmolesdeluxe.com");
const $$Materiales = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Materiales;
  const isAuthenticated = await validateToken();
  if (!isAuthenticated) {
    return Astro2.redirect("/admin");
  }
  const materials = await getMaterials();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Materiales" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="bg-white shadow sm:rounded-lg"> <div class="px-4 py-5 sm:p-6"> <h3 class="text-lg font-medium leading-6 text-gray-900">Nuevo Material</h3> <form id="materialForm" class="mt-5 space-y-4"> <div> <label for="nombre" class="block text-sm font-medium text-gray-700">
Nombre
</label> <input type="text" id="nombre" name="nombre" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"> </div> <div> <label for="descripcion" class="block text-sm font-medium text-gray-700">
Descripción
</label> <textarea id="descripcion" name="descripcion" rows="3" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea> </div> <div> <label for="imagen" class="block text-sm font-medium text-gray-700">
Imagen
</label> <input type="file" id="imagen" name="imagen" accept="image/*" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"> </div> <div> <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
Guardar Material
</button> </div> </form> </div> </div> <div class="bg-white shadow sm:rounded-lg"> <div class="px-4 py-5 sm:p-6"> <h3 class="text-lg font-medium leading-6 text-gray-900">Materiales Existentes</h3> <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"> ${materials.map((material) => renderTemplate`<div class="bg-white overflow-hidden shadow rounded-lg"> <div class="p-5"> <div class="flex items-center"> <div class="flex-shrink-0"> <img class="h-12 w-12 rounded-full"${addAttribute(material.imagen, "src")}${addAttribute(material.nombre, "alt")}> </div> <div class="ml-4"> <h4 class="text-lg font-medium text-gray-900">${material.nombre}</h4> </div> </div> <div class="mt-4"> <p class="text-sm text-gray-500">${material.descripcion}</p> </div> </div> </div>`)} </div> </div> </div> </div> ${renderScript($$result2, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/admin/materiales.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/admin/materiales.astro", void 0);

const $$file = "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/admin/materiales.astro";
const $$url = "/admin/materiales";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Materiales,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
