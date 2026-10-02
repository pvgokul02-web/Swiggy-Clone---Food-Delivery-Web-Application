import React from 'react';
import { Search, Percent, ShoppingBag, MapPin, ChevronDown, User, Sparkles, UtensilsCrossed, Zap, BookOpen } from 'lucide-react';
import { ActiveTab, Address } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  cartTotal: number;
  openCart: () => void;
  selectedAddress: Address;
  openAddressModal: () => void;
  openResumeModal: () => void;
  openSearchModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  openCart,
  selectedAddress,
  openAddressModal,
  openResumeModal,
  openSearchModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Swiggy Logo + Location Picker */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            <button 
              onClick={() => setActiveTab('food')} 
              className="flex items-center space-x-2 transition-transform hover:scale-105 focus:outline-hidden"
              id="swiggy-logo-button"
            >
              <div className="w-10 h-10 bg-[#FC8019] rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-extrabold text-xl tracking-tighter">
                S
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 hidden sm:inline-block">
                swiggy
              </span>
            </button>

            {/* Location Selector */}
            <button
              onClick={openAddressModal}
              className="flex items-center space-x-2 text-left group hover:opacity-90 focus:outline-hidden py-1 px-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              id="location-picker-button"
            >
              <MapPin className="w-5 h-5 text-[#FC8019] shrink-0" />
              <div className="max-w-[180px] sm:max-w-[240px] truncate">
                <div className="flex items-center text-sm font-bold text-slate-800 group-hover:text-[#FC8019] transition-colors">
                  <span className="truncate">{selectedAddress.title}</span>
                  <ChevronDown className="w-4 h-4 ml-1 text-[#FC8019]" />
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {selectedAddress.addressLine1}
                </div>
              </div>
            </button>
          </div>

          {/* Right Navigation & Resume Inspector Button */}
          <div className="flex items-center space-x-1 sm:space-x-6">
            
            {/* Swiggy Services Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('food')}
                className={`flex items-center space-x-2 py-2 text-sm font-bold transition-colors ${
                  activeTab === 'food' ? 'text-[#FC8019] border-b-2 border-[#FC8019]' : 'text-slate-700 hover:text-[#FC8019]'
                }`}
                id="nav-food-delivery"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Food Delivery</span>
              </button>

              <button
                onClick={() => setActiveTab('instamart')}
                className={`flex items-center space-x-2 py-2 text-sm font-bold transition-colors ${
                  activeTab === 'instamart' ? 'text-[#FC8019] border-b-2 border-[#FC8019]' : 'text-slate-700 hover:text-[#FC8019]'
                }`}
                id="nav-instamart"
              >
                <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Instamart</span>
                <span className="bg-orange-100 text-[#FC8019] text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase">
                  10 Mins
                </span>
              </button>

              <button
                onClick={() => setActiveTab('dineout')}
                className={`flex items-center space-x-2 py-2 text-sm font-bold transition-colors ${
                  activeTab === 'dineout' ? 'text-[#FC8019] border-b-2 border-[#FC8019]' : 'text-slate-700 hover:text-[#FC8019]'
                }`}
                id="nav-dineout"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Dineout</span>
              </button>

              <button
                onClick={openSearchModal}
                className="flex items-center space-x-2 text-slate-700 hover:text-[#FC8019] text-sm font-bold transition-colors"
                id="nav-search"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </nav>

            {/* Resume Tech Stack Inspector Highlighted Button */}
            <button
              onClick={openResumeModal}
              className="flex items-center space-x-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white text-xs sm:text-sm font-bold px-3 py-2 rounded-xl shadow-md transition-all transform active:scale-95 border border-slate-700"
              id="resume-tech-stack-button"
            >
              <BookOpen className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Resume / Tech Stack</span>
              <span className="sm:hidden">Backend</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border border-emerald-500/30">
                Java API
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm ${
                cartCount > 0
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              id="header-cart-button"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartCount > 0 ? `₹${cartTotal}` : 'Cart'}
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-100 py-2.5 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('food')}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'food' ? 'text-[#FC8019]' : ''}`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Food</span>
          </button>
          <button
            onClick={() => setActiveTab('instamart')}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'instamart' ? 'text-[#FC8019]' : ''}`}
          >
            <Zap className="w-4 h-4" />
            <span>Instamart</span>
          </button>
          <button
            onClick={() => setActiveTab('dineout')}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'dineout' ? 'text-[#FC8019]' : ''}`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Dineout</span>
          </button>
          <button
            onClick={openSearchModal}
            className="flex flex-col items-center space-y-0.5 text-slate-600"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>

      </div>
    </header>
  );
};
