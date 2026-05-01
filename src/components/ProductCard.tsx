"use client";

import React, { useState, useCallback, useEffect, useId } from "react";
import { openWhatsAppTracked, trackProductClick } from "../lib/analytics";
import MaterialModal from "./MaterialModal";
import { useMaterialModalStore } from "../store/materialModalStore";
import {
  buildCloudinaryImageSet,
  CLOUDINARY_PRESETS,
} from "../lib/images/cloudinary";

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
  unidad = "m2",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metros, setMetros] = useState<string>("");
  const [precioCalculado, setPrecioCalculado] = useState<number | null>(null);
  const metrosInputId = useId();
  const materialLabel = category ? `${category} - ${name}` : name;
  const cardImage = buildCloudinaryImageSet(images[0], CLOUDINARY_PRESETS.card);

  const handleMetrosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setMetros(valor);

    if (valor && precioPublico && Number.parseFloat(valor) > 0) {
      const metrosNum = Number.parseFloat(valor);
      setPrecioCalculado(metrosNum * precioPublico);
      return;
    }

    setPrecioCalculado(null);
  };

  const handleWhatsAppCotizacion = useCallback(() => {
    if (!metros || !precioCalculado) {
      alert("Por favor ingresa los metros cuadrados");
      return;
    }

    const message =
      `Hola, me interesa una cotizacion para:\n\n` +
      `Material: ${materialLabel}\n` +
      `Metros: ${metros} ${unidad}\n` +
      `Precio estimado: $${precioCalculado.toLocaleString("es-CO")} COP\n\n` +
      `Podrian confirmarme disponibilidad y detalles?`;

    openWhatsAppTracked(
      `https://wa.me/+573132592793?text=${encodeURIComponent(message)}`,
      "product_quote",
      materialLabel
    );
  }, [materialLabel, metros, precioCalculado, unidad]);

  const handleWhatsAppClick = useCallback(() => {
    const message = `Hola, estoy interesado en obtener mas informacion sobre la piedra sinterizada: ${materialLabel}.`;

    openWhatsAppTracked(
      `https://wa.me/+573132592793?text=${encodeURIComponent(message)}`,
      "product_info",
      materialLabel
    );
  }, [materialLabel]);

  const materialToOpen = useMaterialModalStore((state) => state.materialToOpen);
  const clearMaterialToOpen = useMaterialModalStore(
    (state) => state.clearMaterialToOpen
  );

  useEffect(() => {
    if (!materialToOpen) return;

    const isExactMatch = materialToOpen === slug;
    const isPartialMatch = slug && slug.includes(materialToOpen);

    if (isExactMatch || isPartialMatch) {
      setIsModalOpen(true);
      clearMaterialToOpen();
    }
  }, [materialToOpen, slug, clearMaterialToOpen]);

  useEffect(() => {
    const handleModalStateChange = (e: CustomEvent) => {
      const { id } = e.detail;
      if (id === slug) {
        setIsModalOpen(true);
      }
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

  const handleClick = () => {
    trackProductClick(name, category || "producto", precioPublico);

    if (precioCalculado && metros) {
      useMaterialModalStore.getState().setCotizacion({
        material: materialLabel,
        metros,
        unidad,
        precioCalculado,
      });
    } else {
      useMaterialModalStore.getState().clearCotizacion();
    }

    document.dispatchEvent(
      new CustomEvent("modal-state-change", {
        detail: { id: slug },
      })
    );
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <>
      <article
        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full max-w-md w-full overflow-hidden"
        onClick={handleClick}
        onKeyDown={handleCardKeyDown}
        role="button"
        tabIndex={0}
        style={{ maxWidth: "100%" }}
      >
        <div className="flex-1">
          <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden bg-gray-100">
            <img
              src={cardImage.src}
              srcSet={cardImage.srcSet}
              sizes={cardImage.sizes}
              alt={`${name} - vista previa`}
              className="w-full h-full object-contain object-center rounded-lg"
              style={{ maxWidth: "100%", display: "block", height: "100%" }}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />

            {images.length > 1 && (
              <div className="absolute bottom-3 left-3 bg-black/55 text-white text-xs px-2 py-1 rounded-full">
                {images.length} vistas
              </div>
            )}

            {price && (
              <div className="absolute top-4 right-4 bg-marmoles-gold text-white px-3 py-1 rounded-full text-sm font-semibold z-20">
                {price}
              </div>
            )}
          </div>
        </div>

        <div className="px-5 py-4">
          <h3 className="text-lg font-bold text-marmoles-black mb-2 truncate">{name}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>

          {precioPublico && precioPublico > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
              <div className="mb-3">
                <label
                  htmlFor={metrosInputId}
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Calcular precio estimado
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={metrosInputId}
                    type="number"
                    min="0"
                    step="0.01"
                    value={metros}
                    onChange={handleMetrosChange}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Ej: 3.5"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-marmoles-gold focus:border-transparent outline-none"
                  />
                  <span className="text-sm text-gray-600 whitespace-nowrap">{unidad}</span>
                </div>
              </div>

              {precioCalculado && (
                <div className="bg-white p-3 rounded-md border border-marmoles-gold/20">
                  <div className="text-xl font-bold text-marmoles-gold mb-2">
                    ${precioCalculado.toLocaleString("es-CO")}{" "}
                    <span className="text-sm font-normal text-gray-600">COP</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    * Precio referencial simulado. Incluye servicios estandar Marmoles Deluxe.
                    Sujeto a confirmacion segun medio de pago.
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
                  Enviar cotizacion
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhatsAppClick();
                  }}
                  className="w-full bg-marmoles-black text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300 focus:ring-2 focus:ring-marmoles-gold focus:outline-none text-sm"
                >
                  Solicitar informacion
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
              Solicitar informacion
            </button>
          )}
        </div>
      </article>

      {isModalOpen && (
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
      )}
    </>
  );
};

export default React.memo(ProductCard);
