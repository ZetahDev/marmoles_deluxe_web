import React, { useRef, useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";

const carouselImgs = [
  "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Polar.webp",
  "https://marmolesdeluxe.s3.us-east-2.amazonaws.com/FOTOS/QUARSTONE/Blanco_Polar_desing.webp",
];

export default function PromoBlancoPolarModal() {
  const [open, setOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const modalRef = useRef<HTMLDialogElement>(null);
  const firstModalElementRef = useRef<HTMLButtonElement>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndex(
      (prev) => (prev - 1 + carouselImgs.length) % carouselImgs.length
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % carouselImgs.length);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === modalRef.current) setOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        firstModalElementRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Banner Sección - Designed to stop the scroll */}
      <section className="relative py-10 bg-gradient-to-r from-marmoles-white to-gray-50 border-y border-marmoles-gold/20 scroll-mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Thumbnail / Trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative flex-shrink-0 w-full md:w-auto focus:outline-none"
            aria-label="Ver detalles de la promoción"
          >
            <div className="relative overflow-hidden rounded-xl shadow-2xl border-2 border-marmoles-gold transform group-hover:scale-105 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-3 py-1 text-xs z-10">
                26% OFF
              </div>
              <img
                src={carouselImgs[1]}
                alt="Diseño Blanco Polar"
                className="w-full md:w-64 h-48 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="bg-white/90 text-marmoles-black px-4 py-2 rounded-full font-bold text-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Ver Oferta 🔍
                </span>
              </div>
            </div>
          </button>

          {/* Copy and CTA */}
          <div className="flex-1 text-center md:text-left max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-3 border border-red-200 uppercase tracking-wide">
              🔥 Stock Limitado - Entrega Inmediata
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-marmoles-black mb-2 leading-tight">
              ¿Quieres una cocina blanca{" "}
              <span className="text-marmoles-gold">impecable y moderna?</span>
            </h2>
            <p className="text-xl font-bold text-gray-800 mb-4">
              Quartzstone Blanco Polar: La elegancia del mármol, la resistencia
              del cuarzo.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-marmoles-black">
                  $550.000
                </span>
                <span className="text-lg text-gray-400 font-medium line-through decoration-red-500/50">
                  $750.000
                </span>
                <span className="text-sm text-gray-500 font-normal">/m²</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => setOpen(true)}
                className="px-8 py-3 bg-marmoles-black text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all"
              >
                Ver Detalles y Fotos
              </button>
              <a
                href="https://wa.me/+573132592793?text=Hola,%20vi%20la%20oferta%20del%20Blanco%20Polar%20a%20$550.000%20y%20quiero%20separar%20mi%20l%C3%A1mina%20antes%20de%20que%20se%20acaben."
                target="_blank"
                rel="noopener"
                className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
              >
                <span>Solicitar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {open && (
        <dialog
          ref={modalRef}
          open
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/80 backdrop-blur-sm m-0 p-4 border-none"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative">
            {/* Close Button */}
            <button
              ref={firstModalElementRef}
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-gray-800"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            {/* Carousel */}
            <div className="relative h-64 bg-gray-100 flex items-center justify-center">
              <img
                src={carouselImgs[carouselIndex]}
                alt={`Blanco Polar - Vista ${carouselIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Carousel Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors"
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {carouselImgs.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === carouselIndex
                        ? "bg-marmoles-gold w-4"
                        : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Blanco Polar Quartzstone
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-xs text-gray-500">
                      (Producto Estrella)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 line-through">
                    $750.000
                  </div>
                  <div className="text-3xl font-black text-marmoles-gold">
                    $550.000
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    por metro cuadrado
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-gray-600 leading-relaxed">
                  No es solo "piedra blanca". Es la solución definitiva para
                  tener una cocina iluminada, higiénica y moderna sin gastar una
                  fortuna.
                </p>
                <ul className="space-y-2">
                  {[
                    "Superficie altamente higiénica y fácil de limpiar.",
                    "Resistencia superior al impacto y rayado.",
                    "Color uniforme y acabado brillante duradero.",
                    "Garantía de calidad respaldo directo.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <Check
                        size={16}
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://wa.me/+573132592793?text=Hola,%20quiero%20reservar%20el%20Blanco%20Polar%20con%20el%2026%25%20de%20descuento.%20%C2%BFMe%20pueden%20ayudar?"
                target="_blank"
                rel="noopener"
                className="block w-full text-center bg-marmoles-gold text-marmoles-black font-bold text-lg py-4 rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1"
              >
                RECLAMAR MI DESCUENTO AHORA →
              </a>
              <p className="text-center text-xs text-gray-400 mt-3">
                * Oferta válida hasta agotar existencias. Aplican T&C.
              </p>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
