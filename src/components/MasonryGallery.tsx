import React, { useEffect, useState } from "react";
import "./MasonryGallery.css";

interface DesignImage {
  url: string;
  category: string;
  name: string;
}

export default function MasonryGallery() {
  const [images, setImages] = useState<DesignImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12); // Initial "prelanzamiento" count

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch("/api/designs.json");
        if (response.ok) {
          const data = await response.json();
          setImages(data);
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

  // Progressive loading effect ("falling" images)
  useEffect(() => {
    if (!loading && images.length > 0) {
      const interval = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= images.length) {
            clearInterval(interval);
            return prev;
          }
          // Accelerate loading: add more items per tick as we go
          return prev + 4;
        });
      }, 100); // New batch every 100ms
      return () => clearInterval(interval);
    }
  }, [loading, images.length]);

  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <p className="text-gray-400">Preparando galería...</p>
        </div>
      ) : (
        <div className="masonry-grid">
          {images.slice(0, visibleCount).map((img, index) => (
            <div
              key={`${img.category}-${img.name}-${index}`}
              className="masonry-item mb-4 break-inside-avoid animate-in"
              style={{ animationDelay: `${(index % 10) * 50}ms` }}
            >
              <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={img.url}
                  alt={`Diseño con ${img.name} - ${img.category}`}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-marmoles-gold text-xs font-bold uppercase tracking-wider mb-1">
                    {img.category}
                  </span>
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {img.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">No se encontraron diseños.</p>
        </div>
      )}
    </div>
  );
}
