import React from 'react';
import { Zap, Clock, ShieldCheck, Plus, ShoppingBag } from 'lucide-react';
import { INSTAMART_ITEMS } from '../data/mockData';
import { CartItem } from '../types';

interface InstamartViewProps {
  onAddToCart: (item: any) => void;
  cartCount: number;
  openCart: () => void;
}

export const InstamartView: React.FC<InstamartViewProps> = ({
  onAddToCart,
  cartCount,
  openCart,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
            <span>SWIGGY INSTAMART</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Groceries delivered in <span className="text-amber-300 underline underline-offset-4">10 Mins</span>
          </h1>
          <p className="text-sm font-medium opacity-90">
            Fresh fruits, dairy, snacks, cold beverages, and daily essentials at your doorstep.
          </p>
        </div>
      </div>

      {/* Items Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">
            Top Essentials & Munchies
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAMART_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              id={`instamart-item-${item.id}`}
            >
              <div>
                <div className="relative h-32 rounded-xl overflow-hidden mb-2 bg-slate-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 left-1 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-black px-1.5 py-0.5 rounded-md flex items-center space-x-1">
                    <Clock className="w-2.5 h-2.5 text-amber-400" />
                    <span>{item.deliveryTime}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-bold uppercase">{item.category}</div>
                <h3 className="font-bold text-slate-900 text-xs line-clamp-2 mt-0.5">{item.name}</h3>
                <div className="text-[10px] text-slate-500">{item.unit}</div>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">₹{item.price}</div>
                  {item.originalPrice && (
                    <div className="text-[10px] text-slate-400 line-through">₹{item.originalPrice}</div>
                  )}
                </div>

                <button
                  onClick={() =>
                    onAddToCart({
                      id: item.id,
                      restaurantId: 'instamart-store',
                      name: item.name,
                      description: `${item.unit} - Delivered in 10 mins`,
                      price: item.price,
                      image: item.image,
                      isVeg: true,
                      category: item.category,
                    })
                  }
                  className="bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-black text-xs px-3 py-1.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                  id={`instamart-add-btn-${item.id}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
