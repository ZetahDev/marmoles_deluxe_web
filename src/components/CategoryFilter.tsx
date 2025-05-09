import { useEffect } from 'react';
import { useStoneCategoryStore } from '../store/stoneCategoryStore';

/**
 * Component that handles URL parameter extraction and applies:
 * 1. Category filtering via store state
 * 2. Smooth scrolling to the selected category section
 * 
 * Soporta dos métodos de navegación:
 * - Parámetros de URL: ?categoria=neolith
 * - Anclas/hash: #neolith
 */
export default function CategoryFilter() {
  const { setActiveCategory } = useStoneCategoryStore();

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    // Función para activar una categoría
    const activateCategory = (categoryParam: string) => {
      // Normalizar el parámetro a minúsculas
      const category = categoryParam.toLowerCase();
      
      // Mapear a la categoría con formato correcto
      let formattedCategory: string | null = null;
      
      if (category === 'neolith') formattedCategory = 'Neolith';
      else if (category === 'altea') formattedCategory = 'Altea';
      else if (category === 'dekton') formattedCategory = 'Dekton';
      else if (category === 'silestone') formattedCategory = 'Silestone';
      
      // Si es una categoría válida, aplicar filtro y scroll
      if (formattedCategory) {
        // Establecer categoría activa en el store
        setActiveCategory(formattedCategory);
        
        // Hacer scroll suave a la sección (incluso si está filtrado)
        setTimeout(() => {
          const element = document.getElementById(category);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    // MÉTODO 1: Comprobar parámetros de URL (?categoria=neolith)
    const params = new URLSearchParams(window.location.search);
    const categoryFromParams = params.get('categoria');
    
    if (categoryFromParams) {
      activateCategory(categoryFromParams);
      return; // Si hay parámetro URL, usarlo y no procesar el hash
    }
    
    // MÉTODO 2: Comprobar hash/ancla (#neolith)
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      // Quitar el # inicial
      const categoryFromHash = hash.substring(1);
      activateCategory(categoryFromHash);
    }

    // Listener para cambios en el hash (para navegación dentro de la página)
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash && newHash.length > 1) {
        activateCategory(newHash.substring(1));
      } else {
        // Si el hash está vacío, limpiar el filtro
        setActiveCategory(null);
      }
    };

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashChange);
    
    // Limpieza del efecto
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [setActiveCategory]);

  // Este componente no renderiza nada visible
  return null;
} 