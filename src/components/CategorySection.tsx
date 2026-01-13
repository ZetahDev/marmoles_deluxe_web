import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

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

interface CategorySectionProps {
  category: Category;
  itemsPerPage?: number;
}

export default function CategorySection({
  category,
  itemsPerPage = 12, // Default to 12 items per page
}: CategorySectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [materialFilter, setMaterialFilter] = useState<string | null>(null);
  const [isThisCategory, setIsThisCategory] = useState(false);

  // Handle URL-based search filter
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const materialParam = params.get("material");
    const categoriaParam = params.get("categoria");

    if (materialParam && categoriaParam) {
      // Check if this category matches the URL parameter
      const categorySlug = category.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      if (categorySlug === categoriaParam) {
        // This is our target category - set filter
        const normalizedMaterial = materialParam
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        setMaterialFilter(normalizedMaterial);
        setIsThisCategory(true);
      }
    }
  }, [category.title]);

  // Filter stones based on material parameter
  const filteredStones = materialFilter
    ? category.stones.filter((stone) => {
        const stoneSlug = stone.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return (
          stoneSlug === materialFilter || stoneSlug.includes(materialFilter)
        );
      })
    : category.stones;

  // Open modal automatically when filter is set
  useEffect(() => {
    if (isThisCategory && materialFilter && filteredStones.length > 0) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        const event = new CustomEvent("modal-state-change", {
          detail: { id: materialFilter },
        });
        document.dispatchEvent(event);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isThisCategory, materialFilter, filteredStones.length]);

  // Listen for modal close to clear filter and restore URL
  useEffect(() => {
    const handleModalClose = () => {
      if (materialFilter) {
        setMaterialFilter(null);
        setIsThisCategory(false);
        // Clean URL
        if (typeof window !== "undefined") {
          window.history.pushState({}, "", window.location.pathname);
        }
      }
    };

    document.addEventListener("modal-close", handleModalClose);
    return () => document.removeEventListener("modal-close", handleModalClose);
  }, [materialFilter]);

  // Calculate total pages (using filtered stones)
  const totalPages = Math.ceil(filteredStones.length / itemsPerPage);

  // Get items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStones.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Optional: Scroll to top of section on page change
    const sectionElement = document.getElementById(
      category.title.toLowerCase()
    );
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id={category.title.toLowerCase()} className="scroll-mt-24 mb-16">
      <h2 className="text-3xl font-bold text-center mb-4">{category.title}</h2>

      {/* Features as subtitle */}
      {category.features && category.features.length > 0 && (
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start text-sm text-gray-700"
                >
                  <span className="mr-2 flex-shrink-0">
                    {feature.split(" ")[0]}
                  </span>
                  <span>{feature.substring(feature.indexOf(" ") + 1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {currentItems.map((stone) => (
          <ProductCard
            key={stone.name}
            name={stone.name}
            description="Piedra sinterizada de alta calidad"
            images={[stone.image, stone.design]}
            category={category.title}
            slug={stone.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}
            precioPublico={category.precioPublico}
            unidad={category.unidad}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            Anterior
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? "bg-marmoles-gold text-white font-bold"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
