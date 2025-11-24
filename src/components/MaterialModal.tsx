import React, { useEffect, useRef, useState } from "react";
import { useMaterialModalStore } from "../store/materialModalStore";

interface MaterialModalProps {
  title: string;
  description: string;
  image: string;
  images?: string[];
  features?: string[];
  category?: string;
  isOpen: boolean;
  onClose: () => void;
}

const MaterialModal: React.FC<MaterialModalProps> = ({
  title,
  description,
  image,
  images = [],
  features = [],
  category = "",
  isOpen,
  onClose,
}) => {
  const allImages = images.length > 0 ? images : [image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const resetImageIndex = useMaterialModalStore(
    (state) => state.resetImageIndex
  );
  const cotizacion = useMaterialModalStore((state) => state.cotizacion);
  const clearCotizacion = useMaterialModalStore(
    (state) => state.clearCotizacion
  );
  const modalRef = useRef<HTMLDivElement>(null);

  // Responsiveness: prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      resetImageIndex();
      clearCotizacion(); // Limpiar cotización al cerrar modal
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, resetImageIndex, clearCotizacion]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // URL logic (split as recommended)
  useEffect(() => {
    if (isOpen) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const newUrl = `${window.location.pathname}?material=${slug}`;
      window.history.pushState({}, "", newUrl);
    }
  }, [isOpen, title]);
  useEffect(() => {
    if (!isOpen) {
      window.history.pushState({}, "", window.location.pathname);
    }
  }, [isOpen]);

  // Nuevo efecto para resetear el índice al abrir el modal
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  // Share logic
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${title} - Mármoles Deluxe`,
        text: `¡Mira este hermoso material ${
          category?.toLowerCase() || ""
        } de Mármoles Deluxe!`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("¡Enlace copiado al portapapeles!");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 px-2 pb-4 pt-10 sm:p-6 sm:pb-8 sm:pt-14 transition-all duration-300 ${
        isOpen
          ? "opacity-100 backdrop-blur-[4px]"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={modalRef}
        className={`relative w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto max-w-xl sm:max-w-2xl lg:max-w-5xl transform overflow-hidden rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/30 transition-all duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95"
        }`}
      >
        {/* Header buttons - Now positioned within the modal container */}
        <div className="absolute right-3 top-3 sm:right-4 sm:top-4 flex gap-2 z-20">
          <button
            className="rounded-full p-2 sm:p-2.5 bg-white/95 shadow-lg text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200 border border-gray-200"
            onClick={handleShare}
            title="Compartir"
            aria-label="Compartir"
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
          <button
            className="rounded-full p-2 sm:p-2.5 bg-white/95 shadow-lg text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200 border border-gray-200"
            onClick={onClose}
            title="Cerrar"
            aria-label="Cerrar modal"
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {/* Images */}
          <div className="space-y-2 sm:space-y-3">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:rounded-xl shadow-lg"
              style={{ maxWidth: "100%" }}
            >
              <img
                src={allImages[currentImageIndex]}
                alt={`${title} - vista ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                style={{ maxWidth: "100%", height: "auto", display: "block" }}
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (currentImageIndex - 1 + allImages.length) %
                          allImages.length
                      )
                    }
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center z-10 text-marmoles-gold border-2 border-marmoles-gold/20 hover:border-marmoles-gold transition-all duration-200 shadow-lg hover:scale-110"
                    aria-label="Imagen anterior"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (currentImageIndex + 1) % allImages.length
                      )
                    }
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center z-10 text-marmoles-gold border-2 border-marmoles-gold/20 hover:border-marmoles-gold transition-all duration-200 shadow-lg hover:scale-110"
                    aria-label="Imagen siguiente"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  {/* Indicador de posición */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-white text-xs sm:text-sm font-medium">
                      {currentImageIndex + 1} / {allImages.length}
                    </span>
                  </div>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    className={`aspect-square overflow-hidden rounded-md sm:rounded-lg cursor-pointer transition-all duration-200 ${
                      currentImageIndex === index
                        ? "ring-2 sm:ring-3 ring-marmoles-gold opacity-100 scale-105"
                        : "hover:opacity-75 opacity-60 hover:scale-105"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={img}
                      alt={`${title} - miniatura ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-3 sm:space-y-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-marmoles-gold/10 text-marmoles-gold">
                  {category}
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-2">
                  {title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {description}
                </p>
              </div>

              {/* Cotización guardada - Mobile First */}
              {cotizacion && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 sm:p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                        Cotización Lista
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Tu simulación está preparada para enviar
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 bg-white rounded-lg p-3 sm:p-4 border border-green-100">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-lg">📐</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-medium">
                          Material
                        </p>
                        <p className="text-sm sm:text-base font-semibold truncate">
                          {cotizacion.material}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-lg">📏</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 font-medium">
                            Cantidad
                          </p>
                          <p className="text-sm sm:text-base font-semibold">
                            {cotizacion.metros} {cotizacion.unidad}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-lg">💰</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 font-medium">
                            Precio est.
                          </p>
                          <p className="text-sm sm:text-base font-bold text-green-600">
                            ${(cotizacion.precioCalculado / 1000000).toFixed(1)}
                            M
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        💡 Precio simulado incluye servicios estándar MD. Sujeto
                        a confirmación según medio de pago.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {features.length > 0 && (
                <div className="space-y-2.5 sm:space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-1 h-5 bg-marmoles-gold rounded-full"></span>
                    Características
                  </h3>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 sm:gap-3 text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-marmoles-gold mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm sm:text-base leading-snug flex-1">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Botón siempre al final - Sticky en mobile */}
            <div className="pt-4 sm:pt-5 mt-auto border-t border-gray-100">
              <button
                onClick={() => {
                  let message: string;

                  if (cotizacion) {
                    message =
                      `Hola, me interesa una cotización para:\n\n` +
                      `📐 Material: ${cotizacion.material}\n` +
                      `📏 Metros: ${cotizacion.metros} ${cotizacion.unidad}\n` +
                      `💰 Precio estimado: $${cotizacion.precioCalculado.toLocaleString(
                        "es-CO"
                      )} COP\n\n` +
                      `¿Podrían confirmarme disponibilidad y detalles?`;
                  } else {
                    message = `Hola, estoy interesado en obtener más información sobre ${
                      category ? `${category} - ` : ""
                    }${title}.`;
                  }

                  const encodedMessage = encodeURIComponent(message);
                  window.open(
                    `https://wa.me/+573132592793?text=${encodedMessage}`,
                    "_blank"
                  );
                }}
                className={`w-full py-3 sm:py-3.5 rounded-lg sm:rounded-xl transition-all duration-300 focus:ring-2 focus:outline-none text-sm sm:text-base font-semibold shadow-lg flex items-center justify-center gap-2 ${
                  cotizacion
                    ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 hover:shadow-xl"
                    : "bg-marmoles-black text-white hover:bg-opacity-90 focus:ring-marmoles-gold hover:shadow-xl"
                }`}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {cotizacion
                  ? "Enviar Cotización por WhatsApp"
                  : "Solicitar Información"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialModal;
