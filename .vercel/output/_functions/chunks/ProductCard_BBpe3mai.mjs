import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React__default, { useRef, useEffect, useState, useCallback } from 'react';
import { C as Carousel, a as CarouselContent, b as CarouselItem, c as CarouselPrevious, d as CarouselNext } from './carousel_Iwv_yVgi.mjs';
import { create } from 'zustand';

const useMaterialModalStore = create((set) => ({
  currentImageIndex: 0,
  setCurrentImageIndex: (index) => set({ currentImageIndex: index }),
  resetImageIndex: () => set({ currentImageIndex: 0 })
}));

const MaterialModal = ({
  title,
  description,
  image,
  images = [],
  features = [],
  category = "",
  isOpen,
  onClose
}) => {
  const allImages = images.length > 0 ? images : [image];
  const currentImageIndex = useMaterialModalStore((state) => state.currentImageIndex);
  const setCurrentImageIndex = useMaterialModalStore((state) => state.setCurrentImageIndex);
  const resetImageIndex = useMaterialModalStore((state) => state.resetImageIndex);
  const modalRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      resetImageIndex();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, resetImageIndex]);
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);
  useEffect(() => {
    if (isOpen) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const newUrl = `${window.location.pathname}?material=${slug}`;
      window.history.pushState({}, "", newUrl);
    }
  }, [isOpen, title]);
  useEffect(() => {
    if (!isOpen) {
      window.history.pushState({}, "", window.location.pathname);
    }
  }, [isOpen]);
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${title} - Mármoles Deluxe`,
        text: `¡Mira este hermoso ${category?.toLowerCase() || ""} de Mármoles Deluxe!`,
        url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("¡Enlace copiado al portapapeles!");
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-500 ${isOpen ? "opacity-100 backdrop-blur-sm" : "pointer-events-none opacity-0"}`,
      style: { minHeight: "100dvh" },
      children: [
        /* @__PURE__ */ jsx("div", { className: `fixed inset-0 bg-black/70 backdrop-blur-md transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0"}` }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: modalRef,
            className: `relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl transform overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm p-2 sm:p-4 lg:p-6 shadow-2xl transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "absolute right-2 top-2 flex gap-2 z-10", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors",
                    onClick: handleShare,
                    title: "Compartir",
                    children: /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "h-6 w-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          }
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors",
                    onClick: onClose,
                    title: "Cerrar",
                    children: /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "h-6 w-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M6 18L18 6M6 6l12 12"
                          }
                        )
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/3] w-full overflow-hidden rounded-lg", children: /* @__PURE__ */ jsxs(Carousel, { className: "w-full h-full", children: [
                    /* @__PURE__ */ jsx(CarouselContent, { children: /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: allImages[currentImageIndex],
                        alt: `${title} - vista ${currentImageIndex + 1}`,
                        className: "w-full h-full object-cover"
                      }
                    ) }) }),
                    allImages.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(CarouselPrevious, { onClick: () => setCurrentImageIndex((currentImageIndex - 1 + allImages.length) % allImages.length), className: "absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 rounded-full flex items-center justify-center z-10 text-marmoles-gold border border-marmoles-gold/20 hover:border-marmoles-gold transition-all duration-200" }),
                      /* @__PURE__ */ jsx(CarouselNext, { onClick: () => setCurrentImageIndex((currentImageIndex + 1) % allImages.length), className: "absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 rounded-full flex items-center justify-center z-10 text-marmoles-gold border border-marmoles-gold/20 hover:border-marmoles-gold transition-all duration-200" })
                    ] })
                  ] }) }),
                  allImages.length > 1 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: allImages.map((img, index) => /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-200 ${currentImageIndex === index ? "ring-2 ring-marmoles-gold opacity-100" : "hover:opacity-75 opacity-60"}`,
                      onClick: () => setCurrentImageIndex(index),
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: img,
                          alt: `${title} - miniatura ${index + 1}`,
                          className: "h-full w-full object-cover"
                        }
                      )
                    },
                    index
                  )) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "inline-block px-3 py-1 rounded-full text-sm font-medium bg-marmoles-gold/10 text-marmoles-gold mb-2", children: category }),
                  /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900", children: title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600 leading-relaxed", children: description }),
                  features.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Características" }),
                    /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: features.map((feature, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start text-gray-600", children: [
                      /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "w-5 h-5 text-marmoles-gold mt-0.5 mr-2 flex-shrink-0",
                          fill: "currentColor",
                          viewBox: "0 0 20 20",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              fillRule: "evenodd",
                              d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                              clipRule: "evenodd"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { children: feature })
                    ] }, index)) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        const message = `Hola, estoy interesado en obtener más información sobre ${category ? `${category} - ` : ""}${title}.`;
                        const encodedMessage = encodeURIComponent(message);
                        window.open(`https://wa.me/+573132592793?text=${encodedMessage}`, "_blank");
                      },
                      className: "w-full bg-marmoles-black text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300 focus:ring-2 focus:ring-marmoles-gold focus:outline-none text-sm font-medium",
                      children: "Solicitar Información"
                    }
                  ) })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
};

const ProductCard = ({
  name,
  description,
  images,
  price,
  features = [],
  category = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleWhatsAppClick = useCallback(() => {
    const message = `Hola, estoy interesado en obtener más información sobre la piedra sinterizada: ${category ? `${category} - ` : ""}${name}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/+573132592793?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  }, [category, name]);
  const imageHeight = 200;
  useEffect(() => {
    const handleModalStateChange = (e) => {
      const { id } = e.detail;
      setIsModalOpen(id === name);
    };
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
    document.addEventListener("modal-state-change", handleModalStateChange);
    document.addEventListener("modal-close", handleModalClose);
    return () => {
      document.removeEventListener("modal-state-change", handleModalStateChange);
      document.removeEventListener("modal-close", handleModalClose);
    };
  }, [name]);
  const handleClick = () => {
    const event = new CustomEvent("modal-state-change", {
      detail: { id: name }
    });
    document.dispatchEvent(event);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "article",
      {
        className: "bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full max-w-md",
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onClick: handleClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-video w-full mb-6 overflow-hidden", children: [
            /* @__PURE__ */ jsxs(Carousel, { className: "w-full h-full absolute inset-0", children: [
              /* @__PURE__ */ jsx(CarouselContent, { className: "h-full", children: images.map((image, index) => /* @__PURE__ */ jsx(
                CarouselItem,
                {
                  className: "h-full w-full",
                  children: /* @__PURE__ */ jsx("div", { className: "w-full h-full overflow-hidden bg-gray-100", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: image,
                      alt: `${name} ${index === 0 ? "" : "- diseño"}`,
                      className: "w-full h-full object-cover rounded-lg",
                      style: {
                        objectPosition: "left bottom",
                        height: imageHeight,
                        width: "100%",
                        contentVisibility: "auto"
                      },
                      loading: "lazy",
                      decoding: "async",
                      fetchPriority: index === 0 ? "high" : "low",
                      onLoad: (e) => {
                        if (index === 0) {
                          e.currentTarget.style.contentVisibility = "visible";
                        }
                      }
                    }
                  ) })
                },
                index
              )) }),
              isHovered && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(CarouselPrevious, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 h-8 w-8 rounded-full flex items-center justify-center z-10 text-marmoles-gold hover:text-marmoles-gold border border-marmoles-gold/20 hover:border-marmoles-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" }),
                /* @__PURE__ */ jsx(CarouselNext, { className: "absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 h-8 w-8 rounded-full flex items-center justify-center z-10 text-marmoles-gold hover:text-marmoles-gold border border-marmoles-gold/20 hover:border-marmoles-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" })
              ] })
            ] }),
            price && /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 bg-marmoles-gold text-white px-3 py-1 rounded-full text-sm font-semibold z-20", children: price })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "px-5 py-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-marmoles-black mb-2 truncate", children: name }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4", children: description }),
            features.length > 0 && /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-4", children: features.map((feature) => /* @__PURE__ */ jsxs(
              "li",
              {
                className: "flex items-center text-sm text-gray-600",
                children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-4 h-4 text-marmoles-gold mr-2",
                      width: "16",
                      height: "16",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsx("path", { d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" })
                    }
                  ),
                  feature
                ]
              },
              feature
            )) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-5 pb-5 mt-auto", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                handleWhatsAppClick();
              },
              className: "w-full bg-marmoles-black text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300 focus:ring-2 focus:ring-marmoles-gold focus:outline-none text-sm",
              children: "Solicitar Información"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      MaterialModal,
      {
        title: name,
        description,
        image: images[0],
        images,
        features,
        category,
        isOpen: isModalOpen,
        onClose: () => {
          const event = new CustomEvent("modal-close");
          document.dispatchEvent(event);
        }
      }
    )
  ] });
};
const ProductCard$1 = React__default.memo(ProductCard);

export { ProductCard$1 as P };
