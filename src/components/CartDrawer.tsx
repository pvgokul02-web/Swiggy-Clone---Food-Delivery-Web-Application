import React, { useState } from 'react';
import { CartItem, Address, Coupon, Order } from '../types';
import { X, ShoppingBag, Plus, Minus, Tag, ShieldCheck, MapPin, CheckCircle2, ArrowRight, CreditCard, Wallet, Banknote } from 'lucide-react';
import { AVAILABLE_COUPONS } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onClearCart: () => void;
  selectedAddress: Address;
  onChangeAddress: () => void;
  onPlaceOrderSuccess: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  selectedAddress,
  onChangeAddress,
  onPlaceOrderSuccess,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [tip, setTip] = useState(20);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Compute Bill Summary
  const itemTotal = cartItems.reduce((sum, item) => sum + item.itemTotalPrice, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (itemTotal >= appliedCoupon.minOrderValue) {
      discountAmount = Math.min(
        (itemTotal * appliedCoupon.discountPercent) / 100,
        appliedCoupon.maxDiscount
      );
    }
  }

  const deliveryFee = itemTotal > 199 ? 0 : 30;
  const platformFee = 6;
  const taxes = Math.round(itemTotal * 0.05); // 5% GST
  const grandTotal = Math.max(0, Math.round(itemTotal - discountAmount + deliveryFee + platformFee + taxes + tip));

  const handleApplyCoupon = (coupon: Coupon) => {
    if (itemTotal < coupon.minOrderValue) {
      setCouponError(`Add items worth ₹${coupon.minOrderValue - itemTotal} more to apply ${coupon.code}`);
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponCode(coupon.code);
    setCouponError('');
  };

  const handleManualCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (found) {
      handleApplyCoupon(found);
    } else {
      setCouponError('Invalid Coupon Code');
      setAppliedCoupon(null);
    }
  };

  const restaurant = cartItems.length > 0 ? {
    id: cartItems[0].menuItem.restaurantId,
    name: 'Meghana Foods', // fallback name
    image: cartItems[0].menuItem.image,
    cuisines: ['Biryani', 'Andhra'],
    rating: 4.6,
    ratingCount: '10K+',
    deliveryTimeMinutes: 25,
    costForTwo: 500,
    location: 'Koramangala',
    distanceKm: 2.3,
    isVeg: false,
    items: [],
  } : null;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `SWG-${Math.floor(100000 + Math.random() * 900000)}`,
        restaurant: restaurant!,
        items: [...cartItems],
        itemTotal,
        discountAmount,
        couponCode: appliedCoupon?.code,
        deliveryFee,
        platformFee,
        taxes,
        tip,
        grandTotal,
        address: selectedAddress,
        paymentMethod,
        status: 'PLACED',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedDeliveryMinutes: 25,
        driverName: 'Ramesh Kumar',
        driverPhone: '+91 98765 43210',
        driverRating: 4.9,
        driverVehicle: 'TVS Jupiter (KA 05 EQ 8812)',
      };

      onClearCart();
      setIsSubmitting(false);
      onPlaceOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-50 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-100 flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#FC8019]" />
              <h2 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight">
                Your Cart
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              id="close-cart-drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-[#FC8019]" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Your cart is empty
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Good food is always waiting for you. Explore restaurants and add your favorite dishes!
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#FC8019] hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all"
                id="empty-cart-browse-btn"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              
              {/* Delivery Address Card */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#FC8019] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Delivery Address
                    </div>
                    <div className="text-sm font-extrabold text-slate-800">
                      {selectedAddress.title}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {selectedAddress.addressLine1}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onChangeAddress}
                  className="text-xs font-bold text-[#FC8019] hover:underline shrink-0"
                  id="cart-change-address-btn"
                >
                  CHANGE
                </button>
              </div>

              {/* Cart Items List */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
                  Order Items ({cartItems.length})
                </div>

                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.cartItemId} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div
                          className={`w-3 h-3 rounded-xs border shrink-0 flex items-center justify-center ${
                            item.menuItem.isVeg ? 'border-emerald-600' : 'border-rose-600'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 ${
                              item.menuItem.isVeg ? 'bg-emerald-600 rounded-full' : 'bg-rose-600 rotate-45'
                            }`}
                          />
                        </div>
                        <div className="truncate">
                          <div className="text-sm font-bold text-slate-900 truncate">
                            {item.menuItem.name}
                          </div>
                          {item.selectedOptions.length > 0 && (
                            <div className="text-[10px] text-slate-500 truncate">
                              {item.selectedOptions.map((o) => o.optionName).join(', ')}
                            </div>
                          )}
                          <div className="text-xs font-extrabold text-slate-700">
                            ₹{item.itemTotalPrice}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center border border-slate-200 rounded-lg px-2 py-1 space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50/50 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="hover:text-emerald-900"
                          id={`cart-minus-${item.cartItemId}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="hover:text-emerald-900"
                          id={`cart-plus-${item.cartItemId}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupons Section */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900">
                  <Tag className="w-4 h-4 text-[#FC8019]" />
                  <span>APPLY COUPON</span>
                </div>

                <form onSubmit={handleManualCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ENTER COUPON CODE"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold tracking-wider uppercase text-slate-800 focus:outline-hidden focus:border-[#FC8019]"
                    id="coupon-code-input"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                    id="apply-coupon-submit-btn"
                  >
                    APPLY
                  </button>
                </form>

                {couponError && (
                  <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2 rounded-lg">
                    {couponError}
                  </p>
                )}

                {appliedCoupon && (
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-800">
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>
                        '{appliedCoupon.code}' applied! Saved ₹{discountAmount}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponCode('');
                      }}
                      className="text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Available Quick Coupons */}
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-bold text-slate-400">Available Offers:</p>
                  {AVAILABLE_COUPONS.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleApplyCoupon(c)}
                      className="w-full text-left p-2 bg-orange-50/60 border border-orange-200/60 rounded-xl hover:bg-orange-100/60 transition-colors flex items-center justify-between"
                      id={`quick-coupon-${c.code}`}
                    >
                      <div>
                        <div className="text-xs font-black text-[#FC8019]">{c.code}</div>
                        <div className="text-[11px] text-slate-600">{c.description}</div>
                      </div>
                      <span className="text-xs font-bold text-[#FC8019] hover:underline">
                        APPLY
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Tip */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2">
                <div className="text-xs font-bold text-slate-900">
                  Delivery Partner Tip
                </div>
                <div className="flex gap-2">
                  {[20, 30, 50].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTip(tip === amount ? 0 : amount)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        tip === amount
                          ? 'bg-[#FC8019] text-white border-[#FC8019]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2">
                <div className="text-xs font-bold text-slate-900">
                  Select Payment Method
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-2 rounded-xl text-xs font-bold border flex flex-col items-center space-y-1 transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#FC8019] bg-orange-50/60 text-[#FC8019]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    id="pay-method-upi"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>UPI (GPay/PhonePe)</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-2 rounded-xl text-xs font-bold border flex flex-col items-center space-y-1 transition-all ${
                      paymentMethod === 'CARD'
                        ? 'border-[#FC8019] bg-orange-50/60 text-[#FC8019]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    id="pay-method-card"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-2 rounded-xl text-xs font-bold border flex flex-col items-center space-y-1 transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#FC8019] bg-orange-50/60 text-[#FC8019]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    id="pay-method-cod"
                  >
                    <Banknote className="w-4 h-4" />
                    <span>Pay on Delivery</span>
                  </button>
                </div>
              </div>

              {/* Detailed Bill Summary */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2 text-xs">
                <div className="font-extrabold text-slate-900 uppercase tracking-wider pb-1">
                  Bill Details
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Item Total</span>
                  <span className="font-bold text-slate-900">₹{itemTotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase">FREE</span>
                  ) : (
                    <span className="font-bold text-slate-900">₹{deliveryFee}</span>
                  )}
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Platform Fee</span>
                  <span className="font-bold text-slate-900">₹{platformFee}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>GST & Restaurant Charges</span>
                  <span className="font-bold text-slate-900">₹{taxes}</span>
                </div>

                {tip > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Tip</span>
                    <span className="font-bold text-slate-900">₹{tip}</span>
                  </div>
                )}

                <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>To Pay</span>
                  <span className="text-base text-[#FC8019]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Safety banner */}
              <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-slate-100/70 p-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Contactless Delivery & Hygienic Packaging Ensured</span>
              </div>

            </div>
          )}

          {/* Footer Place Order Button */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-white border-t border-slate-100 shadow-lg">
              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full bg-[#FC8019] hover:bg-orange-600 text-white font-extrabold text-base py-3.5 px-6 rounded-2xl shadow-lg shadow-orange-500/25 flex items-center justify-between transition-all transform active:scale-98 disabled:opacity-50"
                id="place-order-checkout-btn"
              >
                <div className="text-left">
                  <div className="text-xs uppercase opacity-90">PAYING VIA {paymentMethod}</div>
                  <div className="text-lg">₹{grandTotal}</div>
                </div>

                <div className="flex items-center space-x-1">
                  <span>{isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
