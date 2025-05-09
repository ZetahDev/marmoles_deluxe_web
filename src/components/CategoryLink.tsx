import React from 'react';

interface CategoryLinkProps {
  category: string;
  className?: string;
  children: React.ReactNode;
  useAnchor?: boolean;
}

/**
 * Component that creates a link to a specific stone category
 * This is useful for internal linking throughout the site
 * 
 * Permite dos modos de enlace:
 * - Con parámetros de URL: /piedra-sinterizada?categoria=neolith (por defecto)
 * - Con anclas: /piedra-sinterizada#neolith (cuando useAnchor=true)
 */
export default function CategoryLink({ 
  category, 
  className = "", 
  children,
  useAnchor = false
}: CategoryLinkProps) {
  const formattedCategory = category.toLowerCase();
  
  const href = useAnchor 
    ? `/piedra-sinterizada#${formattedCategory}` 
    : `/piedra-sinterizada?categoria=${formattedCategory}`;
  
  return (
    <a 
      href={href} 
      className={className}
      data-category={formattedCategory}
      data-link-type={useAnchor ? 'anchor' : 'param'}
      // Add tracking for analytics
      data-track="category-link"
    >
      {children}
    </a>
  );
} 