import React, { useState, useEffect } from 'react';

interface MaterialSearchProps {
  onSearchChange?: (searchTerm: string) => void;
  placeholder?: string;
}

/**
 * Componente de búsqueda de materiales por nombre
 * Permite a los usuarios buscar materiales en tiempo real
 */
export default function MaterialSearch({
  onSearchChange,
  placeholder = "Buscar material por nombre...",
}: MaterialSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const formatSlugToReadableText = (value: string) =>
    value
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  // Leer el término de búsqueda desde la URL al cargar
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    const materialParam = params.get("material");

    if (searchParam) {
      setSearchTerm(formatSlugToReadableText(searchParam));
      setIsActive(true);
      return;
    }

    if (materialParam) {
      const readableTerm = formatSlugToReadableText(materialParam);
      setSearchTerm(readableTerm);
      setIsActive(true);
    }
  }, []);

  // Actualizar URL cuando cambia el término de búsqueda
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timeoutId = setTimeout(() => {
      const url = new URL(window.location.href);
      
      if (searchTerm.trim()) {
        // Convertir el término de búsqueda a slug
        const slug = searchTerm
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        
        url.searchParams.set("search", slug);
        setIsActive(true);
      } else {
        url.searchParams.delete("search");
        setIsActive(false);
      }

      // Actualizar URL sin recargar la página
      window.history.replaceState({}, "", url.toString());

      // Notificar al componente padre si existe callback
      if (onSearchChange) {
        onSearchChange(searchTerm);
      }

      // Disparar evento personalizado para que otros componentes reaccionen
      const event = new CustomEvent("material-search", {
        detail: { searchTerm: searchTerm.trim() },
      });
      document.dispatchEvent(event);
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearchChange]);

  const handleClear = () => {
    setSearchTerm("");
    setIsActive(false);
    
    // Limpiar URL
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("search");
      window.history.replaceState({}, "", url.toString());
    }

    // Notificar limpieza
    if (onSearchChange) {
      onSearchChange("");
    }

    const event = new CustomEvent("material-search", {
      detail: { searchTerm: "" },
    });
    document.dispatchEvent(event);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        {/* Icono de búsqueda */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className={`w-5 h-5 transition-colors ${
              isActive ? "text-marmoles-gold" : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input de búsqueda */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
            isActive
              ? "border-marmoles-gold bg-yellow-50 focus:border-marmoles-gold focus:ring-2 focus:ring-marmoles-gold focus:ring-opacity-20"
              : "border-gray-300 bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          }`}
        />

        {/* Botón de limpiar */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Indicador de búsqueda activa */}
      {isActive && searchTerm && (
        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-marmoles-gold rounded-full animate-pulse"></span>
          Buscando: <span className="font-semibold">{searchTerm}</span>
        </div>
      )}
    </div>
  );
}
