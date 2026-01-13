"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { trackProductClick, trackWhatsAppClick } from "../lib/analytics";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import MaterialModal from "./MaterialModal";
import { useMaterialModalStore } from "../store/materialModalStore";

interface ProductCardProps {
  name: string;
  description: string;
  images: string[];
  price?: string;
  features?: string[];
  category?: string;
  slug: string;
  precioPublico?: number;
  unidad?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  images,
  price,
  features = [],
  category = "",
  slug,
  precioPublico,
  unidad = "m²",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metros, setMetros] = useState<string>("");
  const [precioCalculado, setPrecioCalculado] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calcular precio cuando cambian los metros
  const handleMetrosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setMetros(valor);

    if (valor && precioPublico && parseFloat(valor) > 0) {
      const metrosNum = parseFloat(valor);
      const precio = metrosNum * precioPublico;
      setPrecioCalculado(precio);
    } else {
      setPrecioCalculado(null);
    }
  };

  // Enviar cotización rápida por WhatsApp
  const handleWhatsAppCotizacion = useCallback(() => {
    if (!metros || !precioCalculado) {
      alert("Por favor ingresa los metros cuadrados");
      return;
    }

    // Trackear clic en WhatsApp con cotización
    trackWhatsAppClick(
      "product_quote",
      `${category ? `${category} - ` : ""}${name}`
    );

    const message =
      `Hola, me interesa una cotización para:\n\n` +
      `📐 Material: ${category ? `${category} - ` : ""}${name}\n` +
      `📏 Metros: ${metros} ${unidad}\n` +
      `💰 Precio estimado: $${precioCalculado.toLocaleString(
        "es-CO"
      )} COP\n\n` +
      `¿Podrían confirmarme disponibilidad y detalles?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/+573132592793?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  }, [category, name, metros, precioCalculado, unidad]);

  // Optimización: Deferred execution - sólo ejecutar cuando el usuario interactúa
  const handleWhatsAppClick = useCallback(() => {
    // Trackear clic en WhatsApp
    trackWhatsAppClick(
      "product_info",
      `${category ? `${category} - ` : ""}${name}`
    );

    const message = `Hola, estoy interesado en obtener más información sobre la piedra sinterizada: ${
      category ? `${category} - ` : ""
    }${name}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/+573132592793?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  }, [category, name]);

  useEffect(() => {
    const handleModalStateChange = (e: CustomEvent) => {
      const { id } = e.detail;
      // Support both exact match and partial match for URL sharing
      // Partial match: if the material parameter is contained in the slug
      // This allows URLs like ?material=travertino to match "travertino-gold"
      const isExactMatch = id === slug;
      const isPartialMatch = id && slug && slug.includes(id);
      setIsModalOpen(isExactMatch || isPartialMatch);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    document.addEventListener(
      "modal-state-change",
      handleModalStateChange as EventListener
    );
    document.addEventListener("modal-close", handleModalClose);

    return () => {
      document.removeEventListener(
        "modal-state-change",
        handleModalStateChange as EventListener
      );
      document.removeEventListener("modal-close", handleModalClose);
    };
  }, [slug]);

  const handleClick = (e: React.MouseEvent) => {
    // Verificar si el clic fue en un botón de navegación o dentro del carrusel
    if (
      carouselRef.current &&
      e.target instanceof Element &&
      carouselRef.current.contains(e.target) &&
      (e.target.closest("button") ||
        e.target.closest("svg") ||
        e.target.closest("path"))
    ) {
      // Si es un clic en los botones de navegación, no abrir el modal
      return;
    }

    // Trackear clic en producto
    trackProductClick(name, category || "producto", precioPublico);

    // Guardar cotización en Zustand si existe
    if (precioCalculado && metros) {
      useMaterialModalStore.getState().setCotizacion({
        material: `${category ? `${category} - ` : ""}${name}`,
        metros,
        unidad,
        precioCalculado,
      });
    } else {
      useMaterialModalStore.getState().clearCotizacion();
    }

    // Abrir el modal
    const event = new CustomEvent("modal-state-change", {
      detail: { id: slug },
    });
    document.dispatchEvent(event);
  };

  return (
    <>
      <article
        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full max-w-md w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{ maxWidth: "100%" }}
      >
        <div className="flex-1">
          <div className="relative aspect-video w-full mb-6 overflow-hidden">
            <Carousel
              className="w-full h-full absolute inset-0"
              ref={carouselRef}
            >
              <CarouselContent className="h-full">
                {images.map((image, index) => (
                  <CarouselItem key={index} className="h-full w-full">
                    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-gray-100">
                      <img
                        src={image}
                        alt={`${name} ${index === 0 ? "" : "- diseño"}`}
                        className="w-full h-full object-contain md:object-cover object-center rounded-lg"
                        style={{
                          contentVisibility: "auto",
                          maxWidth: "100%",
                          display: "block",
                          height: "100%",
                        }}
                        loading="lazy"
                        decoding="async"
                        fetchPriority={index === 0 ? "high" : "low"}
                        onLoad={(e) => {
                          if (index === 0) {
                            e.currentTarget.style.contentVisibility = "visible";
                          }
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Solo renderizar los controles cuando se necesiten */}
              {isHovered && (
                <>
                  <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 h-8 w-8 rounded-full flex items-center justify-center z-10 text-marmoles-gold hover:text-marmoles-gold border border-marmoles-gold/20 hover:border-marmoles-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" />
                  <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 h-8 w-8 rounded-full flex items-center justify-center z-10 text-marmoles-gold hover:text-marmoles-gold border border-marmoles-gold/20 hover:border-marmoles-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" />
                </>
              )}
            </Carousel>

            {price && (
              <div className="absolute top-4 right-4 bg-marmoles-gold text-white px-3 py-1 rounded-full text-sm font-semibold z-20">
                {price}
              </div>
            )}
          </div>
        </div>

        <div className="px-5 py-4">
          <h3 className="text-lg font-bold text-marmoles-black mb-2 truncate">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>

          {/* Mini Calculadora */}
          {precioPublico && precioPublico > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Calcular Precio Estimado
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={metros}
                    onChange={handleMetrosChange}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Ej: 3.5"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-marmoles-gold focus:border-transparent outline-none"
                  />
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {unidad}
                  </span>
                </div>
              </div>

              {precioCalculado && (
                <div className="bg-white p-3 rounded-md border border-marmoles-gold/20">
                  <div className="text-xl font-bold text-marmoles-gold mb-2">
                    ${precioCalculado.toLocaleString("es-CO")}{" "}
                    <span className="text-sm font-normal text-gray-600">
                      COP
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    * Precio referencial simulado. Incluye servicios estándar
                    Mármoles Deluxe. Sujeto a confirmación según medio de pago.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-5 pb-5 mt-auto space-y-2">
          {precioPublico && precioPublico > 0 ? (
            <>
              {precioCalculado ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhatsAppCotizacion();
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Enviar Cotización
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhatsAppClick();
                  }}
                  className="w-full bg-marmoles-black text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300 focus:ring-2 focus:ring-marmoles-gold focus:outline-none text-sm"
                >
                  Solicitar Información
                </button>
              )}
            </>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWhatsAppClick();
              }}
              className="w-full bg-marmoles-black text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300 focus:ring-2 focus:ring-marmoles-gold focus:outline-none text-sm"
            >
              Solicitar Información
            </button>
          )}
        </div>
      </article>

      <MaterialModal
        title={name}
        description={description}
        image={images[0]}
        images={images}
        features={features}
        category={category}
        isOpen={isModalOpen}
        onClose={() => {
          const event = new CustomEvent("modal-close");
          document.dispatchEvent(event);
        }}
      />
    </>
  );
};

// Exportar como componente memoizado para evitar re-renders innecesarios
export default React.memo(ProductCard);
