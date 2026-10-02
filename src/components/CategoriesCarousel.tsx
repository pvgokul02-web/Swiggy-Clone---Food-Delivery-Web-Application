import React from 'react';
import { CuisineCategory } from '../types';

interface CategoriesCarouselProps {
  categories: CuisineCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

export const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-6 border-b border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          What's on your mind?
        </h2>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs font-bold text-[#FC8019] hover:underline"
            id="clear-category-filter"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="flex items-center space-x-6 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const isSelected = selectedCategory?.toLowerCase() === cat.name.toLowerCase();
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.name)}
              className={`flex flex-col items-center shrink-0 group focus:outline-hidden transition-all duration-200 ${
                isSelected ? 'scale-105' : 'hover:scale-105'
              }`}
              id={`category-item-${cat.id}`}
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 transition-all ${
                  isSelected
                    ? 'ring-4 ring-[#FC8019] shadow-lg shadow-orange-500/20'
                    : 'group-hover:shadow-md'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:rotate-2 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span
                className={`mt-2 text-xs sm:text-sm font-bold tracking-tight text-center ${
                  isSelected ? 'text-[#FC8019]' : 'text-slate-700 group-hover:text-slate-900'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
