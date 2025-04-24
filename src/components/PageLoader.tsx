import React, { useEffect, useState } from "react";

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading: initialLoading }) => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  useEffect(() => {
    // Se ejecuta solo en el cliente
    const handleLoad = () => {
      // Mantener el loader visible un poco más para una mejor experiencia
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    };

    // Si la página ya está cargada
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center flex-col page-loader">
      <div className="relative mb-4">
        <img 
          src="/images/logo.png" 
          alt="Mármoles Deluxe" 
          className="w-32 h-32 object-contain animate-pulse"
        />
      </div>
      <div className="w-24 h-24 border-t-4 border-b-4 border-marmoles-gold rounded-full animate-spin"></div>
      <p className="mt-4 text-marmoles-black font-medium">Cargando productos...</p>
    </div>
  );
};

export default PageLoader; 