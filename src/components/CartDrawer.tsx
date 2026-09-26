'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    shippingFee,
    finalTotal,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    coupon,
    couponError,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
    }
  };

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-[#EBE5DC]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EBE5DC] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif-luxury text-xl font-bold text-[#1E232A]">Your Shopping Bag</h2>
              <span className="bg-[#F3EAE2] text-[#A57C5D] text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((total, i) => total + i.quantity, 0)} Items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#FAF7F2] px-5 py-3 border-b border-[#EBE5DC]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="flex items-center gap-1 text-[#1E232A]">
                <Truck className="w-3.5 h-3.5 text-[#C59B7B]" />
                {amountNeededForFreeShipping > 0 ? (
                  <>Add <strong className="text-[#A57C5D]">₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Delivery</strong></>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> You've unlocked FREE Shipping!
                  </span>
                )}
              </span>
              <span className="text-gray-500 font-semibold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-linear-to-r from-[#C59B7B] to-emerald-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#F3EAE2] rounded-full flex items-center justify-center text-[#C59B7B]">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#1E232A]">Your Bag is Empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our viral anti-tarnish jewellery and handcrafted ethnic wear collections!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#1E232A] text-white text-xs font-bold rounded-lg hover:bg-[#C59B7B] transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || 'default'}-${idx}`}
                  className="flex gap-3.5 bg-white p-3.5 rounded-xl border border-[#EBE5DC] shadow-xs hover:border-[#C59B7B]/40 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg border border-gray-100 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-[#1E232A] line-clamp-2 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-1 text-[10px] text-gray-600">
                        {item.selectedSize && (
                          <span className="bg-gray-100 px-1.5 py-0.5 rounded font-medium">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="bg-[#F3EAE2] text-[#A57C5D] px-1.5 py-0.5 rounded font-medium">
                            {item.selectedColor}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                          className="p-1 px-2 hover:bg-gray-200 text-gray-600 rounded-l-lg transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1E232A]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                          className="p-1 px-2 hover:bg-gray-200 text-gray-600 rounded-r-lg transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#1E232A]">
                          ₹{item.product.price * item.quantity}
                        </span>
                        <span className="block text-[10px] text-gray-400 line-through">
                          ₹{item.product.mrp * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#EBE5DC] space-y-3.5">
              
              {/* Coupon Code Engine */}
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EBE5DC]">
                {coupon.applied ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs">
                    <span className="text-emerald-800 font-medium flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      Code <strong>{coupon.code}</strong> Applied (₹{coupon.discountAmount} Saved)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-600 text-[11px] font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder="Try code DIRECT15"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-8 pr-2 py-1.5 text-xs uppercase bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C59B7B] font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#1E232A] text-white text-xs font-bold rounded-lg hover:bg-[#C59B7B] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#1E232A]">₹{cartSubtotal}</span>
                </div>
                {coupon.applied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({coupon.code})</span>
                    <span>- ₹{coupon.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700">FREE</span>
                    ) : (
                      <span>₹{shippingFee}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1E232A] pt-2 border-t border-gray-100">
                  <span>Total Payable</span>
                  <span className="text-base text-[#C59B7B]">₹{finalTotal}</span>
                </div>
              </div>

              {/* Trust Tag */}
              <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 py-1">
                <span className="flex items-center gap-1 font-medium text-[#1E232A]">
                  <Truck className="w-3.5 h-3.5 text-[#C59B7B]" /> Cash On Delivery Available
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 7-Day Easy Returns
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-[#1E232A] hover:bg-[#C59B7B] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group cursor-pointer"
              >
                <span>Proceed to Checkout (COD Available)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
