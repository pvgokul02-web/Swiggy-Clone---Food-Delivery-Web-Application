import React, { useState } from 'react';
import { Sparkles, Star, MapPin, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { DINEOUT_RESTAURANTS } from '../data/mockData';

export const DineoutView: React.FC = () => {
  const [bookedSpots, setBookedSpots] = useState<Record<string, boolean>>({});

  const handleBookTable = (id: string, name: string) => {
    setBookedSpots((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-purple-800/30">
        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-purple-500/20 border border-purple-400/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-purple-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>SWIGGY DINEOUT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Flat <span className="text-purple-400 underline underline-offset-4">50% OFF</span> on Dining Out
          </h1>
          <p className="text-sm font-medium opacity-90 text-purple-100">
            Book tables at top microbreweries, bistros, and luxury dining spots across Bengaluru.
          </p>
        </div>
      </div>

      {/* Restaurants List */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900">
          Popular Dining Spots Near You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DINEOUT_RESTAURANTS.map((spot) => (
            <div
              key={spot.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              id={`dineout-card-${spot.id}`}
            >
              <div>
                <div className="relative h-48 w-full">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md uppercase">
                    {spot.offer}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center space-x-1 text-xs font-bold text-slate-900">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{spot.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-black text-slate-900 text-lg">{spot.name}</h3>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{spot.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{spot.cuisine}</p>
                  <div className="text-xs font-bold text-slate-800">
                    ₹{spot.costForTwo} for two
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                {bookedSpots[spot.id] ? (
                  <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-center text-xs font-bold flex items-center justify-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Table Reserved! Confirmation sent to phone</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleBookTable(spot.id, spot.name)}
                    className="w-full bg-[#FC8019] hover:bg-orange-600 text-white font-extrabold text-sm py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                    id={`book-table-btn-${spot.id}`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book a Table with Discount</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
