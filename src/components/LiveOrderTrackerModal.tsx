import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { X, Phone, MessageSquare, MapPin, CheckCircle, Clock, Navigation, Bike, Store, Send } from 'lucide-react';

interface LiveOrderTrackerModalProps {
  order: Order;
  onClose: () => void;
}

export const LiveOrderTrackerModal: React.FC<LiveOrderTrackerModalProps> = ({
  order,
  onClose,
}) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('PLACED');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'driver' | 'user'; text: string; time: string }>>([
    {
      sender: 'driver',
      text: `Hello! I am ${order.driverName}. I have picked up your order from ${order.restaurant.name}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Dynamic progress simulator
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStatus('CONFIRMED'), 3000);
    const timer2 = setTimeout(() => setCurrentStatus('PREPARING'), 7000);
    const timer3 = setTimeout(() => setCurrentStatus('DISPATCHED'), 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Driver auto reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'driver',
          text: 'Sure, noted! Reaching your location in 10 minutes.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  const getStatusStepIndex = () => {
    switch (currentStatus) {
      case 'PLACED': return 1;
      case 'CONFIRMED': return 2;
      case 'PREPARING': return 3;
      case 'DISPATCHED': return 4;
      case 'DELIVERED': return 5;
      default: return 1;
    }
  };

  const stepIndex = getStatusStepIndex();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] relative">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#FC8019] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                LIVE ORDER TRACKING
              </span>
              <span className="text-xs text-slate-300 font-medium">Order ID: {order.id}</span>
            </div>
            <h2 className="font-extrabold text-lg sm:text-xl text-white mt-0.5">
              Arriving in 22 - 25 mins
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            id="close-order-tracker-modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Animated Map Route Simulation Visualizer */}
          <div className="relative h-48 sm:h-56 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner flex flex-col items-center justify-center">
            
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Route Line */}
            <div className="absolute w-3/4 h-1 bg-slate-300 top-1/2 -translate-y-1/2 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FC8019] transition-all duration-1000"
                style={{ width: `${(stepIndex / 4) * 100}%` }}
              />
            </div>

            {/* Restaurant Marker */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center shadow-md">
                <Store className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-[10px] font-black text-slate-800 mt-1 bg-white px-2 py-0.5 rounded-md shadow-xs border border-slate-200 truncate max-w-[100px]">
                {order.restaurant.name}
              </span>
            </div>

            {/* Moving Delivery Driver Marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 flex flex-col items-center z-10"
              style={{ left: `${Math.min(80, Math.max(15, (stepIndex / 4) * 80))}%` }}
            >
              <div className="w-12 h-12 bg-[#FC8019] text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 ring-4 ring-white animate-bounce">
                <Bike className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-slate-900 bg-amber-300 px-2 py-0.5 rounded-md shadow-md mt-1 shrink-0">
                {order.driverName} (KA 05 EQ 8812)
              </span>
            </div>

            {/* User Location Marker */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-800 mt-1 bg-white px-2 py-0.5 rounded-md shadow-xs border border-slate-200">
                Home
              </span>
            </div>

            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center space-x-1.5">
              <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <span>Driver Live Location Updated Just Now</span>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">
              Order Status Timeline
            </h3>

            <div className="space-y-4">
              {[
                { title: 'Order Received & Placed', desc: 'Sent to restaurant kitchen', step: 1 },
                { title: 'Confirmed by Restaurant', desc: `${order.restaurant.name} accepted order`, step: 2 },
                { title: 'Food Being Prepared', desc: 'Chef is preparing your meal fresh', step: 3 },
                { title: 'Out for Delivery', desc: `${order.driverName} picked up your package`, step: 4 },
                { title: 'Delivered', desc: 'Enjoy your food!', step: 5 },
              ].map((s) => {
                const isDone = stepIndex >= s.step;
                const isCurrent = stepIndex === s.step;
                return (
                  <div key={s.step} className="flex items-start space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isDone ? <CheckCircle className="w-4 h-4" /> : s.step}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isCurrent ? 'text-[#FC8019]' : 'text-slate-800'}`}>
                        {s.title}
                        {isCurrent && <span className="ml-2 text-xs text-[#FC8019] animate-pulse">(In Progress)</span>}
                      </div>
                      <div className="text-xs text-slate-500">{s.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Partner Contact Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-extrabold text-lg shrink-0">
                RK
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase">Your Delivery Partner</div>
                <div className="text-base font-extrabold text-slate-900">{order.driverName}</div>
                <div className="text-xs text-slate-500 font-semibold">{order.driverVehicle}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <a
                href={`tel:${order.driverPhone}`}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                id="call-driver-btn"
              >
                <Phone className="w-4 h-4" />
                <span>Call Driver</span>
              </a>

              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                id="chat-driver-toggle-btn"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Live Chat</span>
              </button>
            </div>
          </div>

          {/* Live Chat Drawer */}
          {isChatOpen && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 animate-in slide-in-from-top-2">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between border-b pb-2">
                <span>Chat with {order.driverName}</span>
                <span className="text-[10px] text-emerald-600 font-bold">Online</span>
              </div>

              <div className="max-h-40 overflow-y-auto space-y-2 text-xs pr-1">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`p-2.5 rounded-2xl max-w-[80%] font-medium ${
                        msg.sender === 'user'
                          ? 'bg-[#FC8019] text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message (e.g. Leave at door)..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-[#FC8019]"
                  id="chat-input-text"
                />
                <button
                  type="submit"
                  className="bg-[#FC8019] hover:bg-orange-600 text-white p-2 rounded-xl transition-colors"
                  id="send-chat-msg-btn"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Order Item Summary Receipt */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm border-b pb-2">
              Order Receipt ({order.items.length} items)
            </h4>
            <div className="divide-y divide-slate-100 text-xs">
              {order.items.map((it) => (
                <div key={it.cartItemId} className="py-2 flex justify-between">
                  <span className="font-semibold text-slate-800">
                    {it.quantity}x {it.menuItem.name}
                  </span>
                  <span className="font-bold text-slate-900">₹{it.itemTotalPrice}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-2 flex justify-between font-extrabold text-sm text-slate-900">
              <span>Paid Amount</span>
              <span className="text-[#FC8019]">₹{order.grandTotal}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
