import React, { useEffect, useState, useMemo } from "react";
import "./MasonryGallery.css";
import {
  buildCloudinaryImageSet,
  CLOUDINARY_PRESETS,
} from "../lib/images/cloudinary";

interface DesignImage {
  url: string;
  category: string;
  name: string;
}

export default function MasonryGallery() {
  const [images, setImages] = useState<DesignImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch("/api/designs.json");
        if (response.ok) {
          const data = await response.json();
          // Shuffle images for a more dynamic look
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          setImages(shuffled);
          setLoading(false);
        } else {
          console.error("Failed to load gallery data");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading gallery:", err);
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  // Filter logic
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("Todos");
    images.forEach((img) => {
      if (img.category) cats.add(img.category);
    });
    return Array.from(cats).sort();
  }, [images]);

  const filteredImages = useMemo(() => {
    if (activeCategory === "Todos") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  // Progressive loading effect
  useEffect(() => {
    if (!loading && filteredImages.length > 0) {
      setVisibleCount(12); // Reset count when filter changes
      const interval = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= filteredImages.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 4;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loading, filteredImages.length, activeCategory]);

  return (
    <div className="container mx-auto px-4">
      {/* Category Filter */}
      {!loading && images.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-marmoles-gold border-marmoles-gold text-white shadow-lg scale-105"
                  : "bg-white border-gray-200 text-gray-600 hover:border-marmoles-gold hover:text-marmoles-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-marmoles-gold/30 border-t-marmoles-gold rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400 font-medium">Cargando inspiración...</p>
        </div>
      ) : (
        <div className="masonry-grid min-h-[600px]">
          {filteredImages.slice(0, visibleCount).map((img, index) => {
            const responsiveImage = buildCloudinaryImageSet(
              img.url,
              CLOUDINARY_PRESETS.masonry
            );

            return (
              <div
                key={`${img.category}-${img.name}-${index}`}
                className="masonry-item mb-6 break-inside-avoid animate-in"
                style={{ animationDelay: `${(index % 8) * 50}ms` }}
              >
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <img
                    src={responsiveImage.src}
                    srcSet={responsiveImage.srcSet}
                    sizes={responsiveImage.sizes}
                    alt={`Diseño con ${img.name} - ${img.category}`}
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-marmoles-black/90 via-marmoles-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-marmoles-gold text-xs font-bold uppercase tracking-[0.2em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {img.category}
                    </span>
                    <h3 className="text-white font-bold text-xl leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {img.name}
                    </h3>
                    <div className="w-8 h-1 bg-marmoles-gold mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-150"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filteredImages.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl shadow-inner">
          <p className="text-gray-400 italic">No se encontraron diseños en esta categoría.</p>
          <button 
            onClick={() => setActiveCategory("Todos")}
            className="mt-4 text-marmoles-gold underline font-medium"
          >
            Ver todos los proyectos
          </button>
        </div>
      )}
    </div>
  );
}
