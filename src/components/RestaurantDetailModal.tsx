import React, { useState } from 'react';
import { Restaurant, MenuItem, SelectedOption, CartItem } from '../types';
import { X, Star, Clock, Search, Sparkles, ChevronDown, ChevronUp, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CustomizerModal } from './CustomizerModal';

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem, selectedOptions?: SelectedOption[]) => void;
  onRemoveFromCart: (menuItemId: string) => void;
  onOpenCart: () => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  onClose,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onOpenCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Biryani Specials': true,
    'Bestsellers': true,
    'Starters': true,
    'Veg Delights': true,
    'Veg Pizzas': true,
    'Non Veg Pizzas': true,
    'Signature Burgers': true,
    'Breakfast Specials': true,
    'Sundaes': true,
  });

  // Group items by category
  const categoriesMap: Record<string, MenuItem[]> = {};
  restaurant.items.forEach((item) => {
    if (isVegOnly && !item.isVeg) return;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return;

    const cat = item.category || 'Recommended';
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(item);
  });

  const getItemQuantity = (itemId: string) => {
    return cartItems
      .filter((ci) => ci.menuItem.id === itemId && ci.menuItem.restaurantId === restaurant.id)
      .reduce((sum, ci) => sum + ci.quantity, 0);
  };

  const handleAddClick = (item: MenuItem) => {
    if (item.customizable && item.optionGroups) {
      setCustomizingItem(item);
    } else {
      onAddToCart(item);
    }
  };

  const toggleCategory = (catName: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catName]: !(prev[catName] ?? true),
    }));
  };

  const currentCartCount = cartItems
    .filter((ci) => ci.menuItem.restaurantId === restaurant.id)
    .reduce((sum, ci) => sum + ci.quantity, 0);

  const currentCartTotal = cartItems
    .filter((ci) => ci.menuItem.restaurantId === restaurant.id)
    .reduce((sum, ci) => sum + ci.itemTotalPrice, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-50 w-full max-w-4xl h-full sm:h-[92vh] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Top Header Controls */}
        <div className="sticky top-0 z-20 bg-white border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center justify-between shadow-xs">
          <div>
            <h2 className="font-extrabold text-slate-900 text-lg sm:text-2xl truncate">
              {restaurant.name}
            </h2>
            <p className="text-xs text-slate-500 truncate">
              {restaurant.cuisines.join(', ')} • {restaurant.location}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            id="close-restaurant-detail-modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Restaurant Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
          
          {/* Restaurant Banner Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-emerald-600 text-white px-2 py-0.5 rounded-md text-sm font-extrabold">
                  <Star className="w-4 h-4 fill-white mr-1" />
                  <span>{restaurant.rating}</span>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  ({restaurant.ratingCount} ratings)
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-slate-700">
                  ₹{restaurant.costForTwo} for two
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
                <Clock className="w-4 h-4 text-[#FC8019]" />
                <span>{restaurant.deliveryTimeMinutes} mins delivery time</span>
                <span>•</span>
                <span>{restaurant.distanceKm} km away</span>
              </div>

              {restaurant.discountHeader && (
                <div className="inline-flex items-center space-x-1.5 bg-orange-50 text-[#FC8019] text-xs font-bold px-3 py-1 rounded-lg border border-orange-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{restaurant.discountHeader} {restaurant.discountSubheader}</span>
                </div>
              )}
            </div>

            {/* Outlet Image */}
            <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden shrink-0">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Menu Search & Veg Toggle Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#FC8019]/50"
                id="search-dishes-input"
              />
            </div>

            {/* Veg Only Toggle Switch */}
            <div className="flex items-center space-x-2 px-2 shrink-0">
              <span className="text-xs font-bold text-slate-700">Veg Only</span>
              <button
                onClick={() => setIsVegOnly(!isVegOnly)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 relative focus:outline-hidden ${
                  isVegOnly ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                id="toggle-veg-only"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    isVegOnly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Categories & Food Item List */}
          <div className="space-y-6">
            {Object.keys(categoriesMap).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl p-6 border border-slate-100">
                <p className="text-slate-500 font-semibold text-sm">
                  No dishes match your filter criteria.
                </p>
              </div>
            ) : (
              Object.entries(categoriesMap).map(([catName, items]) => {
                const isOpen = openCategories[catName] ?? true;
                return (
                  <div key={catName} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
                    {/* Category Title Accordion Header */}
                    <button
                      onClick={() => toggleCategory(catName)}
                      className="w-full p-4 sm:p-5 bg-white hover:bg-slate-50/80 flex items-center justify-between border-b border-slate-100 text-left"
                      id={`category-accordion-${catName.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        {catName} ({items.length})
                      </h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>

                    {/* Food Items list */}
                    {isOpen && (
                      <div className="divide-y divide-slate-100">
                        {items.map((item) => {
                          const quantity = getItemQuantity(item.id);
                          return (
                            <div
                              key={item.id}
                              className="p-4 sm:p-6 flex items-start justify-between gap-4 hover:bg-slate-50/40 transition-colors"
                              id={`menu-item-${item.id}`}
                            >
                              {/* Left Info */}
                              <div className="flex-1 space-y-1.5 pr-2">
                                {/* Veg/NonVeg Indicator Tag */}
                                <div className="flex items-center space-x-2">
                                  <div
                                    className={`w-4 h-4 rounded-xs border-2 flex items-center justify-center p-0.5 ${
                                      item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                                    }`}
                                  >
                                    <div
                                      className={`w-2 h-2 ${
                                        item.isVeg
                                          ? 'bg-emerald-600 rounded-full'
                                          : 'bg-rose-600 rotate-45'
                                      }`}
                                    />
                                  </div>
                                  {item.isBestseller && (
                                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                                      ★ Bestseller
                                    </span>
                                  )}
                                </div>

                                <h4 className="font-extrabold text-slate-900 text-base">
                                  {item.name}
                                </h4>

                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-slate-900 text-sm">
                                    ₹{item.price}
                                  </span>
                                  {item.originalPrice && (
                                    <span className="text-xs text-slate-400 line-through">
                                      ₹{item.originalPrice}
                                    </span>
                                  )}
                                </div>

                                {item.rating && (
                                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-700">
                                    <Star className="w-3 h-3 fill-emerald-600" />
                                    <span>{item.rating}</span>
                                    {item.ratingCount && (
                                      <span className="text-slate-400 font-normal">
                                        ({item.ratingCount})
                                      </span>
                                    )}
                                  </div>
                                )}

                                <p className="text-xs text-slate-500 line-clamp-2 pt-1 font-normal">
                                  {item.description}
                                </p>
                              </div>

                              {/* Right Image + ADD Button Box */}
                              <div className="relative shrink-0 w-28 sm:w-36 flex flex-col items-center">
                                <div className="w-28 sm:w-36 h-24 sm:h-28 rounded-2xl overflow-hidden shadow-xs">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>

                                {/* ADD / Counter Button */}
                                <div className="-mt-5 z-10">
                                  {quantity > 0 ? (
                                    <div className="bg-white border border-emerald-600 text-emerald-600 rounded-xl font-black text-sm px-3 py-1.5 shadow-md flex items-center space-x-3">
                                      <button
                                        onClick={() => onRemoveFromCart(item.id)}
                                        className="hover:text-emerald-800 focus:outline-hidden"
                                        id={`remove-item-${item.id}`}
                                      >
                                        <Minus className="w-4 h-4" />
                                      </button>
                                      <span>{quantity}</span>
                                      <button
                                        onClick={() => handleAddClick(item)}
                                        className="hover:text-emerald-800 focus:outline-hidden"
                                        id={`add-more-item-${item.id}`}
                                      >
                                        <Plus className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => handleAddClick(item)}
                                      className="bg-white border border-slate-200 text-emerald-600 hover:bg-slate-50 font-black text-sm px-6 py-2 rounded-xl shadow-md transition-all transform active:scale-95 uppercase tracking-wide"
                                      id={`add-first-item-${item.id}`}
                                    >
                                      ADD
                                    </button>
                                  )}
                                </div>

                                {item.customizable && (
                                  <span className="text-[10px] text-slate-400 font-bold mt-1">
                                    Customisable
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Floating Bottom Cart Bar if items exist */}
        {currentCartCount > 0 && (
          <div className="sticky bottom-0 z-30 bg-emerald-700 text-white p-4 px-6 flex items-center justify-between shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-800 p-2 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="font-black text-sm">
                  {currentCartCount} {currentCartCount === 1 ? 'item' : 'items'} | ₹{currentCartTotal}
                </div>
                <div className="text-[11px] text-emerald-200 font-medium">
                  Extra discounts will apply at checkout
                </div>
              </div>
            </div>

            <button
              onClick={onOpenCart}
              className="bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md"
              id="view-cart-bottom-bar"
            >
              View Cart →
            </button>
          </div>
        )}

      </div>

      {/* Item Customizer Modal */}
      {customizingItem && (
        <CustomizerModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onConfirm={(selectedOptions) => {
            onAddToCart(customizingItem, selectedOptions);
            setCustomizingItem(null);
          }}
        />
      )}
    </div>
  );
};
