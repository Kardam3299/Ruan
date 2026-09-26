'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Package,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order, OrderStatus } from '@/types/ecommerce';
import { SITE_CONFIG } from '@/config/site';

export default function TrackOrderPage() {
  const { getOrderById } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Check URL params for ?id=ORD-xxxx
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const orderIdParam = urlParams.get('id');
      if (orderIdParam) {
        setSearchQuery(orderIdParam);
        const found = getOrderById(orderIdParam);
        if (found) {
          setSearchedOrder(found);
          setHasSearched(true);
        }
      }
    }
  }, [getOrderById]);

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div>
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#C59B7B] transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </Link>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C59B7B] block">
          Logistics Tracking
        </span>
        <h1 className="font-serif-luxury text-3xl font-bold text-[#1E232A] mt-1">
          Track Your Order
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          Enter your Order ID (e.g. <strong>ORD-8492</strong>) or your 10-digit mobile number below.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 rounded-2xl border border-[#EBE5DC] shadow-xs">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="e.g. ORD-8492 or 9845123987"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C59B7B] font-medium text-[#1E232A]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1E232A] hover:bg-[#C59B7B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Track Status
          </button>
        </form>
      </div>

      {/* Order Not Found */}
      {hasSearched && !searchedOrder && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center text-xs text-amber-900 space-y-2">
          <div className="flex items-center justify-center gap-1.5 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            Order Not Found
          </div>
          <p>
            We couldn't locate any order for "<strong>{searchQuery}</strong>". Please verify your Order ID or reach out to our WhatsApp care team.
          </p>
          <a
            href={supportWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#25D366] font-bold hover:underline pt-1"
          >
            <MessageCircle className="w-4 h-4" /> Message WhatsApp Support
          </a>
        </div>
      )}

      {/* Order Details Found */}
      {searchedOrder && (
        <div className="space-y-6 animate-fadeIn">
          {/* Order Overview Header */}
          <div className="bg-white rounded-2xl p-5 border border-[#EBE5DC] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#1E232A]">Order #{searchedOrder.id}</span>
                <span className="bg-[#F3EAE2] text-[#A57C5D] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {searchedOrder.paymentMethod === 'COD' ? 'Cash On Delivery' : 'Prepaid'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Ordered on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-gray-500 block">Total Payable at Doorstep</span>
              <span className="text-lg font-bold text-[#C59B7B]">₹{searchedOrder.total}</span>
            </div>
          </div>

          {/* Courier Banner */}
          {searchedOrder.courierName && searchedOrder.awbNumber && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-700" />
                  <span className="font-bold text-emerald-950 text-sm">
                    Dispatched via {searchedOrder.courierName}
                  </span>
                </div>
                {searchedOrder.trackingUrl && (
                  <a
                    href={searchedOrder.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-800 font-bold hover:underline"
                  >
                    Courier Partner Tracking <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="text-emerald-900">
                AWB Tracking ID: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-200">{searchedOrder.awbNumber}</strong>
              </p>
              <p className="text-emerald-800">
                Expected Doorstep Delivery: <strong>{searchedOrder.estimatedDeliveryDate}</strong>
              </p>
            </div>
          )}

          {/* 5-Stage Visual Stepper */}
          <div className="bg-white rounded-2xl p-6 border border-[#EBE5DC]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
              Live Shipment Progress
            </h4>
            
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
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-[#F3EAE2] text-[#A57C5D] rounded-full">
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
            <div className="bg-white p-5 rounded-2xl border border-[#EBE5DC]">
              <div className="flex items-center gap-1.5 font-bold text-[#1E232A] mb-2">
                <MapPin className="w-4 h-4 text-[#C59B7B]" />
                Delivery Address
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>{searchedOrder.shippingAddress.fullName}</strong><br />
                {searchedOrder.shippingAddress.addressLine}<br />
                {searchedOrder.shippingAddress.landmark && `Landmark: ${searchedOrder.shippingAddress.landmark}`}<br />
                {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} - <strong>{searchedOrder.shippingAddress.pincode}</strong><br />
                Phone: +91 {searchedOrder.shippingAddress.mobileNumber}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EBE5DC]">
              <span className="font-bold text-[#1E232A] mb-2 block">Order Items</span>
              <div className="space-y-2">
                {searchedOrder.items.map((it, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <img
                      src={it.product.images[0]}
                      alt={it.product.name}
                      className="w-11 h-11 object-cover rounded-lg border border-gray-200 shrink-0"
                    />
                    <div className="truncate flex-1">
                      <span className="font-medium text-[#1E232A] truncate block text-xs">{it.product.name}</span>
                      <span className="text-gray-500 text-[10px]">
                        Qty: {it.quantity} {it.selectedSize ? `• Size: ${it.selectedSize}` : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp Support CTA */}
          <div className="pt-2 text-center">
            <a
              href={supportWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Need Help With Delivery? Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
