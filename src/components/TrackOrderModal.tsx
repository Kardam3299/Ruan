'use client';

import React, { useState } from 'react';
import { X, Search, Package, Truck, CheckCircle2, Clock, MapPin, ExternalLink, MessageCircle, AlertCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order, OrderStatus } from '@/types/ecommerce';
import { SITE_CONFIG } from '@/config/site';

export const TrackOrderModal: React.FC = () => {
  const { isTrackModalOpen, setIsTrackModalOpen, getOrderById } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isTrackModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = getOrderById(searchQuery);
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const steps: { label: string; status: OrderStatus; desc: string }[] = [
    { label: 'Order Placed', status: 'Placed', desc: 'Order received and waiting for store verification.' },
    { label: 'Confirmed', status: 'Confirmed', desc: 'Order verified for Cash on Delivery.' },
    { label: 'Dispatched', status: 'Dispatched', desc: 'Handed over to national courier partner.' },
    { label: 'Out for Delivery', status: 'Out for Delivery', desc: 'Delivery executive will call you at doorstep.' },
    { label: 'Delivered', status: 'Delivered', desc: 'Parcel successfully handed over.' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Placed': return 0;
      case 'Confirmed': return 1;
      case 'Dispatched': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const currentStepIndex = searchedOrder ? getStepIndex(searchedOrder.status) : 1;

  const supportWhatsAppUrl = searchedOrder
    ? `https://wa.me/${SITE_CONFIG.owner.whatsappNumber}?text=${encodeURIComponent(
        `Hi RUAN, I want an update regarding my order #${searchedOrder.id} for ${searchedOrder.shippingAddress.fullName}.`
      )}`
    : `https://wa.me/${SITE_CONFIG.owner.whatsappNumber}?text=Hi%20RUAN,%20I%20want%20to%20track%20my%20order.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-[#C59B7B]/30 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsTrackModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 text-[#1E232A] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <Package className="w-6 h-6 text-[#C59B7B]" />
          <h3 className="font-serif-luxury text-2xl font-bold text-[#1E232A]">Track Your Order</h3>
        </div>
        <p className="text-xs text-gray-600 mb-6">
          Enter your <strong>Order ID</strong> (e.g. <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200">ORD-8492</code>) or your <strong>10-digit Mobile Number</strong>.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="e.g. ORD-8492 or 9845123987"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#EBE5DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C59B7B] font-medium text-[#1E232A]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1E232A] hover:bg-[#C59B7B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Track Status
          </button>
        </form>

        {/* Search Results */}
        {hasSearched && !searchedOrder && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center text-xs text-amber-900 space-y-2">
            <div className="flex items-center justify-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              Order Not Found
            </div>
            <p>
              We couldn't find an order matching "<strong>{searchQuery}</strong>". Please check for any typos or message our WhatsApp helpline.
            </p>
            <a
              href={supportWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] font-bold hover:underline"
            >
              <MessageCircle className="w-4 h-4" /> Message Support on WhatsApp
            </a>
          </div>
        )}

        {searchedOrder && (
          <div className="space-y-6 animate-fadeIn">
            {/* Order Card Overview */}
            <div className="bg-white rounded-xl p-4 border border-[#EBE5DC] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#1E232A]">Order #{searchedOrder.id}</span>
                  <span className="bg-[#F3EAE2] text-[#A57C5D] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {searchedOrder.paymentMethod === 'COD' ? 'Cash on Delivery (₹0 Advance)' : 'Prepaid'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-500 block">Total Payable at Doorstep</span>
                <span className="text-base font-bold text-[#C59B7B]">₹{searchedOrder.total}</span>
              </div>
            </div>

            {/* Courier Info Box (if dispatched) */}
            {searchedOrder.courierName && searchedOrder.awbNumber && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-emerald-950">
                      Shipped via {searchedOrder.courierName}
                    </span>
                  </div>
                  {searchedOrder.trackingUrl && (
                    <a
                      href={searchedOrder.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-800 font-bold hover:underline"
                    >
                      Courier Tracking <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <p className="text-emerald-900">
                  AWB Tracking Number: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-200">{searchedOrder.awbNumber}</strong>
                </p>
                <p className="text-[11px] text-emerald-800">
                  Estimated Delivery: <strong>{searchedOrder.estimatedDeliveryDate}</strong>
                </p>
              </div>
            )}

            {/* 5-Step Visual Stepper */}
            <div className="bg-white rounded-xl p-5 border border-[#EBE5DC]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">Delivery Progress</h4>
              
              <div className="relative space-y-6">
                {steps.map((step, idx) => {
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={step.status} className="flex items-start gap-4 relative">
                      {/* Line connector */}
                      {idx < steps.length - 1 && (
                        <div
                          className={`absolute left-3.5 top-7 w-0.5 h-10 ${
                            idx < currentStepIndex ? 'bg-emerald-500' : 'bg-gray-200'
                          }`}
                        />
                      )}

                      {/* Icon Bubble */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                          isDone
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-gray-100 text-gray-400 border border-gray-300'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Label & Details */}
                      <div className="flex-1 -mt-0.5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-[#C59B7B]'
                                : isDone
                                ? 'text-[#1E232A]'
                                : 'text-gray-400'
                            }`}
                          >
                            {step.label}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#F3EAE2] text-[#A57C5D] rounded-full">
                              Current Status
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Address & Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-[#EBE5DC]">
                <div className="flex items-center gap-1.5 font-bold text-[#1E232A] mb-2">
                  <MapPin className="w-4 h-4 text-[#C59B7B]" />
                  Delivery Destination
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <strong>{searchedOrder.shippingAddress.fullName}</strong><br />
                  {searchedOrder.shippingAddress.addressLine}<br />
                  {searchedOrder.shippingAddress.landmark && `Landmark: ${searchedOrder.shippingAddress.landmark}`}<br />
                  {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} - <strong>{searchedOrder.shippingAddress.pincode}</strong><br />
                  Phone: +91 {searchedOrder.shippingAddress.mobileNumber}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#EBE5DC]">
                <span className="font-bold text-[#1E232A] mb-2 block">Order Items</span>
                <div className="space-y-2">
                  {searchedOrder.items.map((it, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <img
                        src={it.product.images[0]}
                        alt={it.product.name}
                        className="w-10 h-10 object-cover rounded border border-gray-100 shrink-0"
                      />
                      <div className="truncate flex-1">
                        <span className="font-medium text-[#1E232A] truncate block text-[11px]">{it.product.name}</span>
                        <span className="text-gray-500 text-[10px]">Qty: {it.quantity} {it.selectedSize ? `• Size: ${it.selectedSize}` : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp Help CTA */}
            <div className="pt-2 text-center">
              <a
                href={supportWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Ask About This Order on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
