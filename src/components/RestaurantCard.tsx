import React from 'react';
import { Restaurant } from '../types';
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-left group focus:outline-hidden transition-all duration-300 transform hover:-translate-y-1 w-full"
      id={`restaurant-card-${restaurant.id}`}
    >
      {/* Image Banner */}
      <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-xs mb-3 bg-slate-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Discount Header Badge */}
        {restaurant.discountHeader && (
          <div className="absolute bottom-3 left-3 text-white font-black text-lg sm:text-xl tracking-tight uppercase drop-shadow-md">
            {restaurant.discountHeader} {restaurant.discountSubheader}
          </div>
        )}

        {/* Pure Veg Badge if applicable */}
        {restaurant.isVeg && (
          <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
            Pure Veg
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="px-1">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-[#FC8019] transition-colors truncate">
            {restaurant.name}
          </h3>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 mt-1">
          <div className="flex items-center bg-emerald-600 text-white px-1.5 py-0.5 rounded-md">
            <Star className="w-3 h-3 fill-white text-white mr-1" />
            <span>{restaurant.rating}</span>
          </div>
          <span>•</span>
          <div className="flex items-center text-slate-700">
            <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <span>{restaurant.deliveryTimeMinutes} mins</span>
          </div>
          <span>•</span>
          <span className="text-slate-600">₹{restaurant.costForTwo} for two</span>
        </div>

        <p className="text-xs text-slate-500 truncate mt-1">
          {restaurant.cuisines.join(', ')}
        </p>

        <p className="text-xs text-slate-400 truncate mt-0.5">
          {restaurant.location} • {restaurant.distanceKm} km
        </p>
      </div>
    </button>
  );
};
