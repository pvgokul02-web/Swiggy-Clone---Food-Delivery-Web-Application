/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoriesCarousel } from './components/CategoriesCarousel';
import { TopChainsCarousel } from './components/TopChainsCarousel';
import { RestaurantFilters, SortOption } from './components/RestaurantFilters';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { SearchModal } from './components/SearchModal';
import { InstamartView } from './components/InstamartView';
import { DineoutView } from './components/DineoutView';
import { ResumeTechStackModal } from './components/ResumeTechStackModal';

import {
  CUISINE_CATEGORIES,
  RESTAURANTS,
  SAVED_ADDRESSES,
} from './data/mockData';
import {
  ActiveTab,
  Restaurant,
  MenuItem,
  SelectedOption,
  CartItem,
  Address,
  Order,
} from './types';
import { MapPin, X, Check, Utensils, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('food');
  const [selectedAddress, setSelectedAddress] = useState<Address>(SAVED_ADDRESSES[0]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Filters & Sorting state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [fastDeliveryFilter, setFastDeliveryFilter] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [pureVegFilter, setPureVegFilter] = useState(false);
  const [offersFilter, setOffersFilter] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // Selected Restaurant Detail Modal State
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Live Order Tracking State
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Search & Resume Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Add item to cart handler
  const handleAddToCart = (menuItem: MenuItem, selectedOptions: SelectedOption[] = []) => {
    // If cart has items from a different restaurant, ask user or replace
    if (cartItems.length > 0 && cartItems[0].menuItem.restaurantId !== menuItem.restaurantId) {
      if (!window.confirm('Your cart contains items from another restaurant. Would you like to reset your cart for this order?')) {
        return;
      }
      setCartItems([]);
    }

    const optionsPrice = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
    const itemTotalPrice = menuItem.price + optionsPrice;

    // Unique cart item identifier based on options
    const optionsKey = selectedOptions.map((o) => o.optionId).sort().join('-');
    const cartItemId = `${menuItem.id}-${optionsKey || 'default'}`;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((ci) => ci.cartItemId === cartItemId);
      if (existingIdx > -1) {
        const updated = [...prev];
        const existing = updated[existingIdx];
        const newQty = existing.quantity + 1;
        updated[existingIdx] = {
          ...existing,
          quantity: newQty,
          itemTotalPrice: newQty * (menuItem.price + optionsPrice),
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            menuItem,
            quantity: 1,
            selectedOptions,
            itemTotalPrice,
          },
        ];
      }
    });
  };

  const handleRemoveFromCart = (menuItemId: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((ci) => ci.menuItem.id === menuItemId);
      if (existingIdx === -1) return prev;

      const existing = prev[existingIdx];
      if (existing.quantity > 1) {
        const updated = [...prev];
        const newQty = existing.quantity - 1;
        const unitPrice = existing.itemTotalPrice / existing.quantity;
        updated[existingIdx] = {
          ...existing,
          quantity: newQty,
          itemTotalPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        return prev.filter((_, idx) => idx !== existingIdx);
      }
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
    } else {
      setCartItems((prev) =>
        prev.map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const unitPrice = ci.itemTotalPrice / ci.quantity;
            return {
              ...ci,
              quantity: newQty,
              itemTotalPrice: newQty * unitPrice,
            };
          }
          return ci;
        })
      );
    }
  };

  // Filter & Sort Logic
  const filteredRestaurants = useMemo(() => {
    let result = [...RESTAURANTS];

    if (selectedCategory) {
      const lowerCat = selectedCategory.toLowerCase();
      result = result.filter(
        (r) =>
          r.cuisines.some((c) => c.toLowerCase().includes(lowerCat)) ||
          r.items.some((i) => i.category.toLowerCase().includes(lowerCat) || i.name.toLowerCase().includes(lowerCat))
      );
    }

    if (fastDeliveryFilter) {
      result = result.filter((r) => r.deliveryTimeMinutes <= 25);
    }

    if (ratingFilter) {
      result = result.filter((r) => r.rating >= 4.0);
    }

    if (pureVegFilter) {
      result = result.filter((r) => r.isVeg);
    }

    if (offersFilter) {
      result = result.filter((r) => !!r.discountHeader);
    }

    switch (sortBy) {
      case 'time':
        result.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'cost-low':
        result.sort((a, b) => a.costForTwo - b.costForTwo);
        break;
      case 'cost-high':
        result.sort((a, b) => b.costForTwo - a.costForTwo);
        break;
      default:
        break;
    }

    return result;
  }, [
    selectedCategory,
    fastDeliveryFilter,
    ratingFilter,
    pureVegFilter,
    offersFilter,
    sortBy,
  ]);

  const cartTotalCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const cartTotalPrice = cartItems.reduce((sum, ci) => sum + ci.itemTotalPrice, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-[#FC8019] selection:text-white">
      
      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        cartTotal={cartTotalPrice}
        openCart={() => setIsCartOpen(true)}
        selectedAddress={selectedAddress}
        openAddressModal={() => setIsAddressModalOpen(true)}
        openResumeModal={() => setIsResumeModalOpen(true)}
        openSearchModal={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Active Order Banner Floating at Top if exists */}
        {activeOrder && (
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 border border-slate-700 animate-in fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#FC8019] text-white rounded-xl flex items-center justify-center font-black animate-pulse">
                LIVE
              </div>
              <div>
                <div className="text-xs text-slate-300 font-bold uppercase">Order in progress #{activeOrder.id}</div>
                <div className="text-sm font-extrabold">{activeOrder.restaurant.name} • Arriving in 22 mins</div>
              </div>
            </div>

            <button
              onClick={() => setIsTrackerOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md shrink-0"
              id="view-live-tracking-banner-btn"
            >
              Track Order Live →
            </button>
          </div>
        )}

        {/* TAB 1: FOOD DELIVERY */}
        {activeTab === 'food' && (
          <>
            {/* Category Carousel ("What's on your mind?") */}
            <CategoriesCarousel
              categories={CUISINE_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Top Restaurant Chains Carousel */}
            <TopChainsCarousel
              restaurants={RESTAURANTS}
              onSelectRestaurant={(rest) => setSelectedRestaurant(rest)}
            />

            {/* Filters Bar */}
            <RestaurantFilters
              fastDeliveryFilter={fastDeliveryFilter}
              setFastDeliveryFilter={setFastDeliveryFilter}
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
              pureVegFilter={pureVegFilter}
              setPureVegFilter={setPureVegFilter}
              offersFilter={offersFilter}
              setOffersFilter={setOffersFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalCount={filteredRestaurants.length}
            />

            {/* Restaurants Main Grid */}
            <section className="py-2">
              {filteredRestaurants.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-xs">
                  <Utensils className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-black text-slate-900">
                    No restaurants found
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try clearing your filters or searching for another category.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setFastDeliveryFilter(false);
                      setRatingFilter(false);
                      setPureVegFilter(false);
                      setOffersFilter(false);
                    }}
                    className="mt-4 bg-[#FC8019] text-white font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => setSelectedRestaurant(restaurant)}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* TAB 2: INSTAMART (GROCERIES) */}
        {activeTab === 'instamart' && (
          <InstamartView
            onAddToCart={(item) => handleAddToCart(item)}
            cartCount={cartTotalCount}
            openCart={() => setIsCartOpen(true)}
          />
        )}

        {/* TAB 3: DINEOUT */}
        {activeTab === 'dineout' && <DineoutView />}

      </main>

      {/* Footer with Swiggy Branding and Resume Tech Stack Callout */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FC8019] text-white rounded-lg flex items-center justify-center font-extrabold text-lg">
                S
              </div>
              <span className="text-lg font-black text-white">swiggy</span>
            </div>
            <p className="text-slate-400">
              © 2026 Swiggy Technologies Pvt. Ltd. Full-Stack Engineering Showcase.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Tech Skills Architecture</h4>
            <ul className="space-y-2 text-slate-300">
              <li>Java 17 & Spring Boot 3</li>
              <li>Hibernate ORM & JPA</li>
              <li>MySQL Relational Database</li>
              <li>MongoDB NoSQL Document Store</li>
              <li>Jenkins CI/CD Pipeline & Maven</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Swiggy Services</h4>
            <ul className="space-y-2">
              <li>Food Delivery</li>
              <li>Swiggy Instamart</li>
              <li>Swiggy Dineout</li>
              <li>Swiggy Gourmet</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Resume Showcase</h4>
            <p className="text-slate-400 leading-relaxed mb-3">
              Need backend architecture details or resume bullet points for your Software Engineer resume?
            </p>
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="bg-[#FC8019] hover:bg-orange-600 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md"
              id="footer-open-resume-btn"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open Architecture Inspector</span>
            </button>
          </div>

        </div>
      </footer>

      {/* MODALS */}

      {/* Restaurant Detail Menu View Modal */}
      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenCart={() => {
            setSelectedRestaurant(null);
            setIsCartOpen(true);
          }}
        />
      )}

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={() => setCartItems([])}
        selectedAddress={selectedAddress}
        onChangeAddress={() => setIsAddressModalOpen(true)}
        onPlaceOrderSuccess={(newOrder) => {
          setIsCartOpen(false);
          setActiveOrder(newOrder);
          setIsTrackerOpen(true);
        }}
      />

      {/* Live Order Tracker Modal */}
      {isTrackerOpen && activeOrder && (
        <LiveOrderTrackerModal
          order={activeOrder}
          onClose={() => setIsTrackerOpen(false)}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectRestaurant={(rest) => setSelectedRestaurant(rest)}
        onAddToCart={(item) => handleAddToCart(item)}
        cartItems={cartItems}
      />

      {/* Resume & Backend Architecture Inspector Modal */}
      <ResumeTechStackModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Address Picker Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">Select Delivery Location</h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {SAVED_ADDRESSES.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setIsAddressModalOpen(false);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                    selectedAddress.id === addr.id
                      ? 'border-[#FC8019] bg-orange-50/50 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                  id={`select-address-${addr.id}`}
                >
                  <MapPin className="w-5 h-5 text-[#FC8019] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-slate-900 text-sm">{addr.title}</div>
                    <div className="text-xs text-slate-600 line-clamp-1">{addr.addressLine1}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{addr.addressLine2}</div>
                  </div>
                  {selectedAddress.id === addr.id && (
                    <Check className="w-5 h-5 text-[#FC8019] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
