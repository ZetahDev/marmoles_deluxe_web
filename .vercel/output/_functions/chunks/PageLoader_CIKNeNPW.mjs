import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

const PageLoader = ({ isLoading: initialLoading }) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);
  if (!isLoading) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-white z-50 flex items-center justify-center flex-col page-loader", children: [
    /* @__PURE__ */ jsx("div", { className: "relative mb-4", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/images/logo.png",
        alt: "Mármoles Deluxe",
        className: "w-32 h-32 object-contain animate-pulse"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "w-24 h-24 border-t-4 border-b-4 border-marmoles-gold rounded-full animate-spin" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-marmoles-black font-medium", children: "Cargando productos..." })
  ] });
};

export { PageLoader as P };
