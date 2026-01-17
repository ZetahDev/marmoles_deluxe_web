import React, { useState, useEffect } from "react";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón cuando el usuario haya scrolleado más de 400px
      const shouldShow = window.scrollY > 400;
      setIsVisible(shouldShow);
    };

    // Usar passive listener para mejor performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Verificar posición inicial
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 bg-rose-500 text-white rounded-full p-4 shadow-lg hover:bg-rose-600 transition-all duration-300 z-50 flex items-center justify-center ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Ir al inicio de la página"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <svg
        className="w-8 h-8"
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
};
