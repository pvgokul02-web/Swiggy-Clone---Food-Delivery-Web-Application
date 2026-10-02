import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Clock, Star, Leaf, Percent } from 'lucide-react';

export type SortOption = 'relevance' | 'time' | 'rating' | 'cost-low' | 'cost-high';

interface RestaurantFiltersProps {
  fastDeliveryFilter: boolean;
  setFastDeliveryFilter: (val: boolean) => void;
  ratingFilter: boolean;
  setRatingFilter: (val: boolean) => void;
  pureVegFilter: boolean;
  setPureVegFilter: (val: boolean) => void;
  offersFilter: boolean;
  setOffersFilter: (val: boolean) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  totalCount: number;
}

export const RestaurantFilters: React.FC<RestaurantFiltersProps> = ({
  fastDeliveryFilter,
  setFastDeliveryFilter,
  ratingFilter,
  setRatingFilter,
  pureVegFilter,
  setPureVegFilter,
  offersFilter,
  setOffersFilter,
  sortBy,
  setSortBy,
  totalCount,
}) => {
  return (
    <div className="py-4 my-2 border-b border-slate-100">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Restaurants with online food delivery in Bengaluru
          <span className="ml-2 text-sm font-semibold text-slate-400">({totalCount})</span>
        </h2>
      </div>

      <div className="flex items-center space-x-3 overflow-x-auto scrollbar-none py-1">
        
        {/* Fast Delivery Pill */}
        <button
          onClick={() => setFastDeliveryFilter(!fastDeliveryFilter)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0 ${
            fastDeliveryFilter
              ? 'bg-[#FC8019] text-white border-[#FC8019] shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          id="filter-fast-delivery"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Fast Delivery (&lt;25 mins)</span>
        </button>

        {/* Rating 4.0+ Pill */}
        <button
          onClick={() => setRatingFilter(!ratingFilter)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0 ${
            ratingFilter
              ? 'bg-[#FC8019] text-white border-[#FC8019] shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          id="filter-rating-4plus"
        >
          <Star className="w-3.5 h-3.5" />
          <span>Ratings 4.0+</span>
        </button>

        {/* Pure Veg Pill */}
        <button
          onClick={() => setPureVegFilter(!pureVegFilter)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0 ${
            pureVegFilter
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          id="filter-pure-veg"
        >
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>Pure Veg</span>
        </button>

        {/* Offers Pill */}
        <button
          onClick={() => setOffersFilter(!offersFilter)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0 ${
            offersFilter
              ? 'bg-[#FC8019] text-white border-[#FC8019] shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          id="filter-offers"
        >
          <Percent className="w-3.5 h-3.5" />
          <span>Offers</span>
        </button>

        {/* Sort Selector Dropdown */}
        <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-bold text-slate-700 shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
          <span className="text-slate-400 font-normal">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-transparent text-slate-800 font-bold focus:outline-hidden cursor-pointer"
            id="filter-sort-select"
          >
            <option value="relevance">Relevance</option>
            <option value="time">Delivery Time</option>
            <option value="rating">Rating</option>
            <option value="cost-low">Cost: Low to High</option>
            <option value="cost-high">Cost: High to Low</option>
          </select>
        </div>

      </div>
    </div>
  );
};
