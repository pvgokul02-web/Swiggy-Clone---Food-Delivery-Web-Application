import React, { useState } from 'react';
import { Restaurant, MenuItem, CartItem } from '../types';
import { X, Search, Star, Utensils, ArrowRight } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onAddToCart: (item: MenuItem) => void;
  cartItems: CartItem[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectRestaurant,
  onAddToCart,
  cartItems,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularTags = ['Biryani', 'Pizza', 'Burger', 'Paneer', 'Chicken 65', 'Chai', 'Ice Cream'];

  const matchedRestaurants = RESTAURANTS.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisines.some((c) => c.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedDishes: { dish: MenuItem; restaurant: Restaurant }[] = [];
  RESTAURANTS.forEach((r) => {
    r.items.forEach((item) => {
      if (
        query &&
        (item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()))
      ) {
        matchedDishes.push({ dish: item, restaurant: r });
      }
    });
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-16 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#FC8019]" />
          <input
            type="text"
            placeholder="Search for restaurants, biryani, pizza, burgers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 font-extrabold text-base sm:text-lg focus:outline-hidden"
            autoFocus
            id="search-modal-main-input"
          />
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            id="close-search-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags if no query */}
        {!query && (
          <div className="p-6 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="bg-slate-100 hover:bg-orange-50 hover:text-[#FC8019] text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
                  id={`popular-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Matching Restaurants */}
            {matchedRestaurants.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
                  Restaurants ({matchedRestaurants.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedRestaurants.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        onSelectRestaurant(r);
                        onClose();
                      }}
                      className="p-3 rounded-2xl border border-slate-100 bg-white hover:border-[#FC8019] shadow-xs flex items-center space-x-3 text-left transition-all group"
                      id={`search-restaurant-${r.id}`}
                    >
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900 text-sm group-hover:text-[#FC8019] truncate">
                          {r.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {r.cuisines.join(', ')}
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-700 mt-0.5">
                          <span className="text-emerald-600">★ {r.rating}</span>
                          <span>•</span>
                          <span>{r.deliveryTimeMinutes} mins</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#FC8019] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Dishes */}
            {matchedDishes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
                  Dishes ({matchedDishes.length})
                </h3>
                <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-100">
                  {matchedDishes.map(({ dish, restaurant }) => (
                    <div key={dish.id} className="p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{dish.name}</div>
                          <div className="text-xs text-slate-500">
                            By {restaurant.name} • ₹{dish.price}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onAddToCart(dish);
                          onClose();
                        }}
                        className="bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors uppercase"
                        id={`search-add-dish-${dish.id}`}
                      >
                        ADD
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchedRestaurants.length === 0 && matchedDishes.length === 0 && (
              <div className="text-center py-10 text-slate-500">
                <Utensils className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="font-bold text-sm">No results found for "{query}"</p>
                <p className="text-xs text-slate-400 mt-1">Try searching for Biryani, Pizza, or Burger</p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
