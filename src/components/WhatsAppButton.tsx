import React, { useState, useEffect } from "react";
import { openWhatsAppTracked } from "../lib/analytics";

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const phoneNumber = "573132592793";

  useEffect(() => {
    // Aparece rápido para capturar atención en los primeros segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // Detectar dinámicamente la página actual para personalizar la intención de WhatsApp
  let message = "Hola! Me gustaría cotizar un proyecto de mesón para mi cocina y agendar visita técnica gratis.";
  let clickContext = "floating_button_general";
  let productLabel = "consulta general";

  if (typeof window !== "undefined") {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("quartzstone") || path.includes("blanco-polar")) {
      message = "Hola! Estoy interesado en cotizar Quartzstone Blanco Polar para el mesón de mi cocina. ¿Tienen láminas disponibles?";
      clickContext = "floating_button_quartzstone";
      productLabel = "Quartzstone Blanco Polar";
    } else if (path.includes("sinterizada")) {
      message = "Hola! Vi las piedras sinterizadas Altea y Dekton en su sitio web. Me gustaría cotizar una superficie para mi hogar.";
      clickContext = "floating_button_sinterizada";
      productLabel = "Piedra Sinterizada";
    } else if (path.includes("marmoles")) {
      message = "Hola! Me interesa cotizar mármoles importados para mi proyecto de baño o revestimiento. ¿Me podrían asesorar?";
      clickContext = "floating_button_marmoles";
      productLabel = "Mármoles";
    } else if (path.includes("granitos")) {
      message = "Hola! Quiero cotizar un mesón de Granito Natural para mi cocina. ¿Me ayudan con los precios?";
      clickContext = "floating_button_granitos";
      productLabel = "Granito Natural";
    } else if (path.includes("b2b")) {
      message = "Hola! Vengo de la sección de aliados constructores. Me gustaría recibir información de precios corporativos.";
      clickContext = "floating_button_b2b";
      productLabel = "Aliado B2B";
    }
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-2xl hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center hover:scale-110"
      aria-label="Contactar por WhatsApp"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
        transform: "translateZ(0)",
      }}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      onClick={(event) => {
        event.preventDefault();
        setShowNotificationBadge(false);
        openWhatsAppTracked(whatsappUrl, clickContext, productLabel);
      }}
    >
      {/* Indicador visual de Asesor Activo / Mensaje Pendiente 🟢 */}
      {showNotificationBadge && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] text-white font-extrabold items-center justify-center">
            1
          </span>
        </span>
      )}
      <svg
        className="w-8 h-8"
        width="32"
        height="32"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {tooltipVisible && (
        <span
          className="absolute right-full mr-3 bg-white text-gray-900 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shadow-xl border border-gray-100"
          style={{ pointerEvents: "none" }}
        >
          ¡Cotiza Gratis por WhatsApp! 💬
        </span>
      )}
    </a>
  );
};
