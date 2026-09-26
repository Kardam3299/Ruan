'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Package,
  Truck,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  ShoppingBag,
  Clock
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SITE_CONFIG, getWhatsAppOrderNotificationUrl } from '@/config/site';

export default function OrderSuccessPage() {
  const { activeOrder, setIsTrackModalOpen } = useStore();

  const order = activeOrder || {
    id: 'ORD-9281',
    items: [],
    subtotal: 1299,
    discount: 0,
    shippingFee: 0,
    total: 1299,
    paymentMethod: 'COD' as const,
    shippingAddress: {
      fullName: 'Customer',
      mobileNumber: '9876543210',
      pincode: '110001',
      city: 'New Delhi',
      state: 'Delhi',
      addressLine: 'Delivery Address'
    },
    status: 'Confirmed' as const,
    createdAt: new Date().toISOString(),
    estimatedDeliveryDate: '24 Sep 2026'
  };

  const whatsappOwnerNotifyUrl = getWhatsAppOrderNotificationUrl({
    id: order.id,
    customerName: order.shippingAddress.fullName,
    customerPhone: order.shippingAddress.mobileNumber,
    address: order.shippingAddress.addressLine,
    city: order.shippingAddress.city,
    state: order.shippingAddress.state,
    pincode: order.shippingAddress.pincode,
    total: order.total,
    paymentMethod: order.paymentMethod,
    items: (order.items || []).map((i) => ({
      title: i.product?.name || 'RUAN Product',
      quantity: i.quantity || 1,
      selectedSize: i.selectedSize,
      price: i.product?.price || order.total,
    })),
  });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE5DC] shadow-xl text-center space-y-8">
        
        {/* Animated Success Badge */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner ring-8 ring-emerald-50/60">
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>
          
          <div className="space-y-1.5 pt-2">
            <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-[#C59B7B] bg-[#FAF7F2] px-3.5 py-1 rounded-full border border-[#EBE5DC]">
              Order Placed Successfully
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#1E232A]">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              We received your order for <strong className="text-gray-800">Cash on Delivery</strong>. Our team is hand-packaging your items with care.
            </p>
          </div>
        </div>

        {/* 3-Step Simple Visual Timeline */}
        <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#EBE5DC]">
          <div className="grid grid-cols-3 gap-2 text-center relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                ✓
              </div>
              <span className="text-[11px] font-bold text-[#1E232A]">Confirmed</span>
              <span className="text-[10px] text-gray-400 hidden sm:block">Payment: COD</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#EBE5DC] text-[#A57C5D] flex items-center justify-center text-xs font-bold">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-gray-600">Packaging</span>
              <span className="text-[10px] text-gray-400 hidden sm:block">Quality Check</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#EBE5DC] text-gray-400 flex items-center justify-center text-xs font-bold">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-gray-600">Dispatched</span>
              <span className="text-[10px] text-gray-400 hidden sm:block">Delivering to You</span>
            </div>
          </div>
        </div>

        {/* Order Details Highlight Box */}
        <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-6 border border-[#EBE5DC] text-left space-y-4">
          
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block font-medium">Order Number</span>
              <span className="font-mono text-base sm:text-lg font-bold text-[#1E232A]">
                #{order.id}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block font-medium">Total to Pay (COD)</span>
              <span className="text-lg sm:text-xl font-bold text-[#C59B7B]">
                ₹{order.total}
              </span>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-gray-700">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#C59B7B] shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400 block text-[11px]">Estimated Delivery</span>
                <strong className="text-[#1E232A] font-semibold">{order.estimatedDeliveryDate}</strong>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400 block text-[11px]">Payment Mode</span>
                <strong className="text-emerald-700 font-semibold">Cash On Delivery (₹0 Advance)</strong>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="pt-3 border-t border-gray-200 text-xs text-gray-700 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#C59B7B] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="text-gray-400 block text-[11px]">Delivery Address</span>
              <strong className="text-[#1E232A]">{order.shippingAddress.fullName}</strong> (+91 {order.shippingAddress.mobileNumber})<br />
              <span className="text-gray-600">{order.shippingAddress.addressLine}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</span>
            </div>
          </div>
        </div>

        {/* User-Friendly Action Buttons */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary Action: WhatsApp Confirmation */}
            <a
              href={whatsappOwnerNotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Confirm Order on WhatsApp</span>
            </a>

            {/* Secondary Action: Live Tracking */}
            <button
              onClick={() => setIsTrackModalOpen(true)}
              className="w-full sm:flex-1 py-3.5 px-6 bg-[#1E232A] hover:bg-[#C59B7B] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-colors flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
            >
              <Package className="w-5 h-5 text-[#C59B7B]" />
              <span>Live Order Tracking</span>
            </button>
          </div>

          {/* Tertiary Return Link */}
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#C59B7B] transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Continue Browsing RUAN Collection</span>
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-5 border-t border-gray-100 flex flex-wrap items-center justify-center gap-5 text-xs text-gray-500">
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4" /> 7-Day Free Size Exchange
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B7B]" /> 100% Anti-Tarnish Guarantee
          </span>
        </div>

      </div>
    </div>
  );
}
