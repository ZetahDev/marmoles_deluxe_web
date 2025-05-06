/* empty css                                 */
import { a as createComponent, e as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cx8UOM8M.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C4WX7Gd5.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { v as validateToken } from '../chunks/auth_CWrnEh9N.mjs';
import { Toaster } from 'react-hot-toast';
export { renderers } from '../renderers.mjs';

const AdminDashboard = () => {
  return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsx("div", { className: "bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 sm:p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Panel de Administración" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsx("a", { href: "/admin/materiales", className: "block", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300", children: /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8 text-indigo-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Materiales" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Gestionar materiales y productos" })
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsx("a", { href: "/admin/testimonios", className: "block", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300", children: /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8 text-indigo-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Testimonios" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Gestionar testimonios de clientes" })
        ] })
      ] }) }) }) })
    ] })
  ] }) }) });
};

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }) }),
      /* @__PURE__ */ jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Panel de Administración" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Ingresa tus credenciales para continuar" })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "mt-8 space-y-6", method: "POST", action: "/admin/login", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700", children: "Usuario" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 relative rounded-md shadow-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "username",
                name: "username",
                type: "text",
                required: true,
                className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                placeholder: "Ingresa tu usuario",
                value: username,
                onChange: (e) => setUsername(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Contraseña" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 relative rounded-md shadow-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "password",
                name: "password",
                type: "password",
                required: true,
                className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                placeholder: "Ingresa tu contraseña",
                value: password,
                onChange: (e) => setPassword(e.target.value)
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: isLoading,
          className: "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
          children: [
            /* @__PURE__ */ jsx("span", { className: "absolute left-0 inset-y-0 flex items-center pl-3", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-indigo-500 group-hover:text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" }) }) }),
            "Iniciar sesión"
          ]
        }
      ) })
    ] })
  ] }) });
};

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const isAuthenticated = await validateToken();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Panel de Administraci\xF3n" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8"> ${isAuthenticated ? renderTemplate`${renderComponent($$result2, "AdminDashboard", AdminDashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/admin/AdminDashboard", "client:component-export": "default" })}` : renderTemplate`${renderComponent($$result2, "AdminLogin", AdminLogin, {})}`} ${renderComponent($$result2, "Toaster", Toaster, { "position": "top-right" })} </main> ` })}`;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
