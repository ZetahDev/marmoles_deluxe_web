"use client";

import React, { useState, useCallback, lazy, Suspense } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

interface ProductCardProps {
  name: string;
  description: string;
  images: string[];
  price?: string;
  features?: string[];
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  images,
  price,
  features = [],
  category = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Optimización: Deferred execution - sólo ejecutar cuando el usuario interactúa
  const handleWhatsAppClick = useCallback(() => {
    const message = `Hola, estoy interesado en obtener más información sobre la piedra sinterizada: ${category ? `${category} - ` : ""}${name}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/+573132592793?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  }, [category, name]);

  // Optimización: Especificar dimensiones para prevenir layout shifts 
  const imageHeight = 200;
  
  return (
    <article 
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full max-w-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1">
        <div className="relative aspect-video w-full mb-6 overflow-hidden">
          <Carousel className="w-full h-full absolute inset-0">
            <CarouselContent className="h-full">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="h-full w-full"
                >
                  <div className="w-full h-full overflow-hidden bg-gray-100">
                    <img
                      src={image}
                      alt={`${name} ${index === 0 ? '' : '- diseño'}`}
                      className="w-full h-full object-cover rounded-lg"
                      style={{ 
                        objectPosition: "left bottom", 
                        height: imageHeight,
                        width: "100%",
                        contentVisibility: "auto"
                      }}
                      loading="lazy"
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "low"}
                      onLoad={(e) => {
                        // Optimización: Marcar la imagen como completamente cargada para Largest Contentful Paint
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

        {features.length > 0 && (
          <ul className="space-y-2 mb-4">
            {features.map((feature) => (
              <li
                className="flex items-center text-sm text-gray-600"
                key={feature}
              >
                <svg
                  className="w-4 h-4 text-marmoles-gold mr-2"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-5 pb-5 mt-auto">
        <button 
          onClick={handleWhatsAppClick}
          className="w-full bg-marmoles-black text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300 focus:ring-2 focus:ring-marmoles-gold focus:outline-none text-sm"
        >
          Solicitar Información
        </button>
      </div>
    </article>
  );
};

// Exportar como componente memoizado para evitar re-renders innecesarios
export default React.memo(ProductCard);
