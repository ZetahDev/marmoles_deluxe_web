import { c as createAstro, a as createComponent, m as maybeRenderHead, e as renderComponent, b as addAttribute, f as renderTemplate, g as renderScript, d as renderSlot, r as renderHead } from './astro/server_Cx8UOM8M.mjs';
import 'kleur/colors';
/* empty css                              */
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
/* empty css                         */
import 'clsx';
import { $ as $$Index } from './index_LJJs1GYQ.mjs';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const phoneNumber = "573132592793";
  const message = "¡Hola! Vengo de su página web y me interesa el descuento del 15% 🛒";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2e3);
    return () => clearTimeout(timer);
  }, []);
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: whatsappUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center",
      "aria-label": "Contactar por WhatsApp",
      style: { position: "fixed", bottom: "1rem", right: "1rem" },
      onMouseEnter: () => setTooltipVisible(true),
      onMouseLeave: () => setTooltipVisible(false),
      onClick: (e) => {
        e.preventDefault();
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => {
            window.open(whatsappUrl, "_blank");
          });
        } else {
          window.open(whatsappUrl, "_blank");
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-8 h-8",
            width: "32",
            height: "32",
            fill: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
          }
        ),
        tooltipVisible && /* @__PURE__ */ jsx("span", { className: "absolute right-full mr-3 bg-white text-gray-900 px-2 py-1 rounded text-sm whitespace-nowrap shadow-md", children: "¡Contáctanos por WhatsApp!" })
      ]
    }
  );
};

const useNavbarStore = create()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }))
    }),
    {
      name: "navbar-storage",
      partialize: (state) => ({ isMobileMenuOpen: state.isMobileMenuOpen })
    }
  )
);

const MobileMenu = ({ navItems, currentPath }) => {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useNavbarStore();
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (isMobileMenuOpen && !target.closest("#mobile-menu") && !target.closest("#mobile-menu-button")) {
        setMobileMenuOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen, setMobileMenuOpen]);
  const toggleSubmenu = (event) => {
    event.preventDefault();
    const submenu = event.currentTarget.nextElementSibling;
    if (submenu) {
      submenu.classList.toggle("hidden");
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "md:hidden p-2 text-marmoles-gold hover:text-marmoles-gold transition-colors",
        id: "mobile-menu-button",
        "aria-label": "Menú",
        onClick: toggleMobileMenu,
        "aria-expanded": isMobileMenuOpen,
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "h-6 w-6",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: isMobileMenuOpen ? /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2",
                d: "M6 18L18 6M6 6l12 12"
              }
            ) : /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2",
                d: "M4 6h16M4 12h16M4 18h16"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `md:hidden absolute top-16 left-0 w-full bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg transition-all duration-300 ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`,
        id: "mobile-menu",
        "aria-hidden": !isMobileMenuOpen,
        children: /* @__PURE__ */ jsx("div", { className: "px-4 py-3 space-y-3", children: navItems.map((item, index) => {
          if (item.isLogo) {
            return /* @__PURE__ */ jsx("a", { href: item.href, className: "block", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/logo.png",
                alt: "Mármoles Deluxe Logo",
                className: "h-12 w-auto mx-auto logo-gold"
              }
            ) }, `mobile-item-${index}`);
          }
          if (item.items) {
            return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "text-sm font-medium text-gray-800 hover:text-marmoles-gold w-full text-left flex justify-between items-center",
                  onClick: toggleSubmenu,
                  children: [
                    item.label,
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "h-4 w-4 transition-transform",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "hidden pl-4 space-y-2", children: item.items.map(({ href, label }, subIndex) => /* @__PURE__ */ jsx(
                "a",
                {
                  href,
                  className: `block text-sm font-medium hover:text-marmoles-gold py-2 ${currentPath === href || currentPath.endsWith(href) ? "text-marmoles-gold" : "text-gray-800"}`,
                  onClick: () => setMobileMenuOpen(false),
                  children: label
                },
                `mobile-subitem-${index}-${subIndex}`
              )) })
            ] }, `mobile-item-${index}`);
          }
          return /* @__PURE__ */ jsx(
            "a",
            {
              href: item.href,
              className: `block text-sm font-medium py-2 ${item.href && (currentPath === item.href || currentPath.endsWith(item.href)) ? "text-marmoles-gold" : "text-gray-800 hover:text-marmoles-gold"}`,
              onClick: () => setMobileMenuOpen(false),
              children: item.label
            },
            `mobile-item-${index}`
          );
        }) })
      }
    )
  ] });
};

const $$Astro$2 = createAstro("https://marmolesdeluxe.com");
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navbar;
  const navItems = [
    {
      href: "/",
      label: "Logo",
      isLogo: true
    },
    {
      label: "Materiales",
      items: [
        { href: "/marmoles", label: "M\xE1rmoles" },
        { href: "/granitos-naturales", label: "Granito" },
        { href: "/quartzstone", label: "Quartzstone" },
        { href: "/piedra-sinterizada", label: "Piedra Sinterizada" }
      ]
    },
    //{ href: "/productos", label: "Productos" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/otros-servicios", label: "Otros Servicios" },
    { href: "/contactanos", label: "Cont\xE1ctanos" }
  ];
  const currentPath = Astro2.url.pathname;
  const isCurrentPathUnderMateriales = () => {
    const materialesItems = navItems.find((item) => item.label === "Materiales")?.items || [];
    return materialesItems.some((item) => currentPath.startsWith(item.href));
  };
  return renderTemplate`${maybeRenderHead()}<header class="fixed w-full top-0 left-0 z-50 backdrop-blur-md border-b border-white/20" data-astro-cid-5blmo7yk> <nav class="container mx-auto px-4" data-astro-cid-5blmo7yk> <div class="flex items-center justify-between h-16" data-astro-cid-5blmo7yk> <!-- Menú móvil con zustand (componente de React) --> ${renderComponent($$result, "MobileMenu", MobileMenu, { "navItems": navItems, "currentPath": currentPath, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/MobileMenu", "client:component-export": "default", "data-astro-cid-5blmo7yk": true })} <!-- Menú para escritorio --> <div class="hidden md:flex items-center justify-center space-x-12" data-astro-cid-5blmo7yk> ${navItems.map((item) => {
    if (item.isLogo) {
      return renderTemplate`<a${addAttribute(item.href, "href")} data-astro-cid-5blmo7yk> <img src="/images/logo.png" alt="Mármoles Deluxe Logo" class="h-12 w-auto logo-gold" data-astro-cid-5blmo7yk> </a>`;
    }
    if (item.items) {
      return renderTemplate`<div class="relative group" data-astro-cid-5blmo7yk> <button${addAttribute([
        "text-sm font-medium transition-colors relative group px-2 py-1",
        {
          "text-marmoles-gold": isCurrentPathUnderMateriales(),
          "text-marmoles-gold/95": !isCurrentPathUnderMateriales()
        }
      ], "class:list")} data-astro-cid-5blmo7yk> ${item.label} <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-marmoles-gold transition-all duration-300 group-hover:w-full" data-astro-cid-5blmo7yk></span> </button> <div class="absolute hidden group-hover:block w-48 bg-white/80 backdrop-blur-md border border-white/20 rounded-md shadow-lg py-2 mt-2" data-astro-cid-5blmo7yk> <div class="absolute -top-2 left-0 right-0 h-4 bg-transparent" data-astro-cid-5blmo7yk></div> ${item.items.map(({ href, label }) => renderTemplate`<a${addAttribute(href, "href")} class="block px-4 py-2 text-sm text-gray-800 hover:text-marmoles-gold hover:bg-white/20" data-astro-cid-5blmo7yk> ${label} </a>`)} </div> </div>`;
    }
    return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute([
      "text-sm font-medium transition-colors hover:text-marmoles-gold relative group",
      {
        "text-marmoles-gold": currentPath === item.href || currentPath.endsWith(item.href),
        "text-marmoles-gold/95": !(currentPath === item.href || currentPath.endsWith(item.href))
      }
    ], "class:list")} data-astro-cid-5blmo7yk> ${item.label} <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-marmoles-gold transition-all duration-300 group-hover:w-full" data-astro-cid-5blmo7yk></span> </a>`;
  })} </div> </div> </nav> </header> `;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/Navbar.astro", void 0);

const $$MarcasBanner = createComponent(($$result, $$props, $$slots) => {
  const logos = [
    { name: "Altea", file: "Altea.png" },
    { name: "Catemar", file: "catemar.png" },
    { name: "Dekton", file: "dekton.png" },
    { name: "Neolith", file: "neolith.webp" },
    { name: "Sensa", file: "Sensa.webp" },
    { name: "Silestone", file: "silestone.png" }
  ];
  const allLogos = [...logos, ...logos];
  function getLogoUrl(fileName) {
    return `/logos/${fileName}`;
  }
  return renderTemplate`${maybeRenderHead()}<section class="bg-marmoles-black py-2 overflow-hidden" data-astro-cid-gyiw6wlk> <div class="logos-container" data-astro-cid-gyiw6wlk> <div class="logos-slide" data-astro-cid-gyiw6wlk> ${allLogos.map((logo) => renderTemplate`<div class="logo-item" data-astro-cid-gyiw6wlk> <img${addAttribute(getLogoUrl(logo.file), "src")}${addAttribute(`Logo de ${logo.name}`, "alt")} class="h-10 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300" data-astro-cid-gyiw6wlk> </div>`)} </div> </div> </section> `;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/MarcasBanner.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="bg-marmoles-black text-white py-4 mt-auto" data-astro-cid-sz7xmlte> <div class="container mx-auto px-4 sm:px-6 max-w-6xl" data-astro-cid-sz7xmlte> <div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-astro-cid-sz7xmlte> <!-- Logo y descripción --> <div class="flex flex-col items-center md:items-start" data-astro-cid-sz7xmlte> <img${addAttribute("images/logo.png", "src")} alt="Mármoles Deluxe Logo" class="h-16 w-auto mb-4" data-astro-cid-sz7xmlte> <p class="text-sm text-gray-300 mt-2 text-center md:text-left" data-astro-cid-sz7xmlte>
Más de 16 años de experiencia en el suministro e instalación de superficies en piedras naturales y sinterizadas.
</p> </div> <!-- Enlaces rápidos --> <div class="text-center" data-astro-cid-sz7xmlte> <h3 class="text-lg font-semibold mb-4 text-marmoles-gold" data-astro-cid-sz7xmlte>Enlaces Rápidos</h3> <ul class="space-y-2" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="/productos" class="text-gray-300 hover:text-marmoles-gold transition-colors" data-astro-cid-sz7xmlte>Productos</a> </li> <li data-astro-cid-sz7xmlte> <a href="/piedra-sinterizada" class="text-gray-300 hover:text-marmoles-gold transition-colors" data-astro-cid-sz7xmlte>Piedra Sinterizada</a> </li> <li data-astro-cid-sz7xmlte> <a href="/nosotros" class="text-gray-300 hover:text-marmoles-gold transition-colors" data-astro-cid-sz7xmlte>Nosotros</a> </li> <li data-astro-cid-sz7xmlte> <a href="/contactanos" class="text-gray-300 hover:text-marmoles-gold transition-colors" data-astro-cid-sz7xmlte>Contáctanos</a> </li> </ul> </div> <!-- Contacto y redes sociales --> <div class="text-center md:text-right" data-astro-cid-sz7xmlte> <h3 class="text-lg font-semibold mb-4 text-marmoles-gold" data-astro-cid-sz7xmlte>Contáctanos</h3> <p class="text-gray-300 mb-2" data-astro-cid-sz7xmlte>Cl. 43a Nte. #5N 69, COMUNA 4, Cali</p> <p class="text-gray-300 mb-4" data-astro-cid-sz7xmlte>+57 3132592793</p> <div class="flex justify-center md:justify-end space-x-4 mt-4" data-astro-cid-sz7xmlte> <a href="https://www.instagram.com/marmolesdeluxe/" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-marmoles-gold transition-colors" aria-label="Instagram" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-sz7xmlte> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" data-astro-cid-sz7xmlte></path> <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z" data-astro-cid-sz7xmlte></path> <path d="M16.406 5.155c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" data-astro-cid-sz7xmlte></path> </svg> </a> <a href="https://www.facebook.com/Marmolesdeluxe" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-marmoles-gold transition-colors" aria-label="Facebook" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-sz7xmlte> <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" data-astro-cid-sz7xmlte></path> </svg> </a> </div> </div> </div> <!-- Marcas Banner con desplazamiento automático --> ${renderComponent($$result, "MarcasBanner", $$MarcasBanner, { "data-astro-cid-sz7xmlte": true })} <div class="border-t border-gray-800 mt-8 pt-8 text-center" data-astro-cid-sz7xmlte> <p class="text-sm text-gray-400" data-astro-cid-sz7xmlte>
&copy; ${currentYear} Mármoles Deluxe. Todos los derechos reservados.
</p> </div> </div> </footer> `;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro("https://marmolesdeluxe.com");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/57313/Desktop/marmoles_deluxe_web/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/node_modules/astro/components/ClientRouter.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://marmolesdeluxe.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "M\xE1rmoles Deluxe - Instalaci\xF3n, Transporte y Garant\xEDa de M\xE1rmoles"
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', "><title>", `</title><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" crossorigin="anonymous" media="print" onload="this.media='all'"><!-- Google Tag --><script async src="https://www.googletagmanager.com/gtag/js?id=G-NXQ0SL5DBV"><\/script>`, "", "", "", '</head> <body class="flex flex-col min-h-screen bg-marmoles-white text-marmoles-black" data-astro-cid-sckkx6r4> ', ' <main class="flex-grow" data-astro-cid-sckkx6r4> ', " </main> ", " ", " ", " ", " </body> </html>  <!-- Precargar im\xE1genes cr\xEDticas despu\xE9s de la carga inicial --> ", ""])), addAttribute(description, "content"), title, renderScript($$result, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"), renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-sckkx6r4": true }), renderComponent($$result, "ViewTransitions", $$ClientRouter, { "data-astro-cid-sckkx6r4": true }), renderHead(), renderComponent($$result, "Navbar", $$Navbar, { "data-astro-cid-sckkx6r4": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sckkx6r4": true }), renderComponent($$result, "WhatsAppButton", WhatsAppButton, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/WhatsAppButton", "client:component-export": "WhatsAppButton", "data-astro-cid-sckkx6r4": true }), renderComponent($$result, "SpeedInsights", $$Index, { "data-astro-cid-sckkx6r4": true }), renderScript($$result, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts"), renderScript($$result, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/Layout.astro?astro&type=script&index=2&lang.ts"));
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
