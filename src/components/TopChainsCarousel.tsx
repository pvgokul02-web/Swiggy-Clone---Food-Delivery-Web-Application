import React from 'react';
import { Restaurant } from '../types';
import { Star, Clock } from 'lucide-react';

interface TopChainsCarouselProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const TopChainsCarousel: React.FC<TopChainsCarouselProps> = ({
  restaurants,
  onSelectRestaurant,
}) => {
  return (
    <section className="py-6 border-b border-slate-100">
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
        Top restaurant chains in Bengaluru
      </h2>

      <div className="flex items-center space-x-5 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {restaurants.map((rest) => (
          <button
            key={`top-${rest.id}`}
            onClick={() => onSelectRestaurant(rest)}
            className="shrink-0 w-64 sm:w-72 text-left group focus:outline-hidden transition-all duration-300 transform hover:-translate-y-1"
            id={`top-chain-card-${rest.id}`}
          >
            {/* Image Box */}
            <div className="relative h-44 rounded-2xl overflow-hidden shadow-xs mb-3">
              <img
                src={rest.image}
                alt={rest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Discount Overlay Tag */}
              {rest.discountHeader && (
                <div className="absolute bottom-3 left-3 text-white font-black text-lg tracking-tight uppercase drop-shadow-md">
                  {rest.discountHeader} {rest.discountSubheader}
                </div>
              )}

              {/* Rating Pill */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center space-x-1 text-xs font-bold text-slate-900 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                <span>{rest.rating}</span>
              </div>
            </div>

            {/* Restaurant Info */}
            <div>
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#FC8019] transition-colors truncate">
                {rest.name}
              </h3>
              
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 mt-1">
                <div className="flex items-center text-emerald-600">
                  <Star className="w-3.5 h-3.5 fill-emerald-600 mr-1" />
                  <span>{rest.rating}</span>
                </div>
                <span>•</span>
                <div className="flex items-center text-slate-600">
                  <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  <span>{rest.deliveryTimeMinutes} mins</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 truncate mt-1">
                {rest.cuisines.join(', ')}
              </p>
              
              <p className="text-xs text-slate-400 truncate">
                {rest.location}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
