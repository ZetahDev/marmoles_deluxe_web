import React, { useEffect } from "react";
import { useStoneCategoryStore } from "../store/stoneCategoryStore";
import ProductCard from "./ProductCard";
import CategorySection from "./CategorySection";

interface Stone {
  name: string;
  image: string;
  design: string;
  features?: string[];
}

interface Category {
  title: string;
  stones: Stone[];
  features?: string[];
  precioPublico?: number;
  unidad?: string;
}

interface CategoryWrapperProps {
  categories: Category[];
  useAnchorLinks?: boolean; // Opción para usar anclas en lugar de parámetros
}

/**
 * Componente que maneja todo el sistema de filtrado y renderizado de categorías
 * Este componente reemplaza FilteredCategoryView pero es más fácil de integrar en Astro
 */
export default function CategoryWrapper({
  categories,
  useAnchorLinks = false,
}: CategoryWrapperProps) {
  const { activeCategory, resetCategory } = useStoneCategoryStore();

  // Efecto para actualizar la URL cuando cambia la categoría activa
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (activeCategory) {
      const category = activeCategory.toLowerCase();

      if (useAnchorLinks) {
        // Si usamos anclas, actualizar el hash sin recargar la página
        const newHash = `#${category}`;
        if (window.location.hash !== newHash) {
          // Actualizar hash sin causar recargas
          history.replaceState(null, "", newHash);
        }
      } else {
        // Si usamos parámetros, actualizar el parámetro
        const url = new URL(window.location.href);
        url.searchParams.set("categoria", category);
        history.replaceState(null, "", url);
      }
    } else {
      // Si no hay categoría activa, limpiar URL
      if (useAnchorLinks) {
        if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname);
        }
      } else {
        const url = new URL(window.location.href);
        if (url.searchParams.has("categoria")) {
          url.searchParams.delete("categoria");
          history.replaceState(null, "", url);
        }
      }
    }
  }, [activeCategory, useAnchorLinks]);

  // Si hay una categoría activa, filtramos las categorías
  const categoriesToShow = activeCategory
    ? categories.filter((cat) => cat.title === activeCategory)
    : categories;

  // Función para limpiar el filtro
  const handleClearFilter = () => {
    resetCategory();
  };

  return (
    <>
      {/* Mostrar botón de limpieza de filtro si hay una categoría activa */}
      {activeCategory && (
        <div className="flex justify-center mb-8">
          <button
            onClick={handleClearFilter}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm flex items-center transition-colors"
          >
            <span className="mr-2">Viendo solo: {activeCategory}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}

      {/* Renderizar las categorías filtradas */}
      {categoriesToShow.map((category, index) => (
        <CategorySection
          key={category.title}
          category={category}
          itemsPerPage={12}
        />
      ))}
    </>
  );
}
