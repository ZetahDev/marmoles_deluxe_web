import React, { useEffect } from 'react';
import { useStoneCategoryStore } from '../store/stoneCategoryStore';

interface StoneCategory {
  title: string;
  stones: any[]; // Using any here for simplicity, but you should define proper type
}

interface FilteredCategoryViewProps {
  categories: StoneCategory[];
  renderCategory: (category: StoneCategory, index: number) => React.ReactNode;
}

/**
 * Component that filters and renders stone categories based on the active filter
 * from the stoneCategoryStore
 */
export default function FilteredCategoryView({ 
  categories, 
  renderCategory 
}: FilteredCategoryViewProps) {
  const { activeCategory, resetCategory } = useStoneCategoryStore();

  // Reset category filter when component unmounts
  useEffect(() => {
    return () => {
      resetCategory();
    };
  }, [resetCategory]);

  // If there's an active category filter, only show that category
  // Otherwise, show all categories
  const categoriesToShow = activeCategory
    ? categories.filter(cat => cat.title === activeCategory)
    : categories;

  return (
    <>
      {/* Show a "clear filter" button if a category is active */}
      {activeCategory && (
        <div className="flex justify-center mb-8">
          <button
            onClick={() => resetCategory()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm flex items-center transition-colors"
          >
            <span className="mr-2">Viendo solo: {activeCategory}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
      
      {/* Render the filtered categories */}
      {categoriesToShow.map((category, index) => renderCategory(category, index))}
    </>
  );
} 