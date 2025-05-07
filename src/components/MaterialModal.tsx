import React, { useEffect, useRef, useState } from 'react';
import { useMaterialModalStore } from '../store/materialModalStore';

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
  const resetImageIndex = useMaterialModalStore((state) => state.resetImageIndex);
  const modalRef = useRef<HTMLDivElement>(null);

  // Responsiveness: prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      resetImageIndex();
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, resetImageIndex]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // URL logic (split as recommended)
  useEffect(() => {
    if (isOpen) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newUrl = `${window.location.pathname}?material=${slug}`;
      window.history.pushState({}, '', newUrl);
    }
  }, [isOpen, title]);
  useEffect(() => {
    if (!isOpen) {
      window.history.pushState({}, '', window.location.pathname);
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
        text: `¡Mira este hermoso material ${category?.toLowerCase() || ''} de Mármoles Deluxe!`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 sm:py-8 transition-all duration-500 ${isOpen ? 'opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'}`}
    >
      <div className={`fixed inset-0 bg-black/70 backdrop-blur-md transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      <div
        ref={modalRef}
        className={`relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl transform overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm p-2 sm:p-4 lg:p-6 shadow-2xl transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}
      >
        {/* Header */}
        <div className="absolute right-2 top-2 flex gap-2 z-10">
          <button
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
            onClick={handleShare}
            title="Compartir"
          >
            <svg
              className="h-6 w-6"
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
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
            onClick={onClose}
            title="Cerrar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Images */}
          <div className="space-y-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg" style={{ maxWidth: '100%' }}>
              <img
                src={allImages[currentImageIndex]}
                alt={`${title} - vista ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((currentImageIndex - 1 + allImages.length) % allImages.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 rounded-full flex items-center justify-center z-10 text-marmoles-gold border border-marmoles-gold/20 hover:border-marmoles-gold transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((currentImageIndex + 1) % allImages.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 rounded-full flex items-center justify-center z-10 text-marmoles-gold border border-marmoles-gold/20 hover:border-marmoles-gold transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    className={`aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-200 ${currentImageIndex === index ? 'ring-2 ring-marmoles-gold opacity-100' : 'hover:opacity-75 opacity-60'}`}
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
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-marmoles-gold/10 text-marmoles-gold mb-2">
              {category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
            {features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Características</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <svg
                        className="w-5 h-5 text-marmoles-gold mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pt-2">
              <button
                onClick={() => {
                  const message = `Hola, estoy interesado en obtener más información sobre ${category ? `${category} - ` : ""}${title}.`;
                  const encodedMessage = encodeURIComponent(message);
                  window.open(`https://wa.me/+573132592793?text=${encodedMessage}`, '_blank');
                }}
                className="w-full bg-marmoles-black text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300 focus:ring-2 focus:ring-marmoles-gold focus:outline-none text-sm font-medium"
              >
                Solicitar Información
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialModal; 