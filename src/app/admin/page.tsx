'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Package,
  DollarSign,
  Truck,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  Shield,
  Sparkles
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order } from '@/types/ecommerce';

export default function AdminDashboardPage() {
  const { orders, products } = useStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Financial & KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Approximate Meesho wholesale cost is ~40% of retail price
  const estimatedMeeshoCost = Math.round(totalRevenue * 0.42);
  const estimatedProfit = Math.max(0, totalRevenue - estimatedMeeshoCost);
  const profitMarginPercent = totalRevenue > 0 ? Math.round((estimatedProfit / totalRevenue) * 100) : 0;

  const pendingOrders = orders.filter((o) => o.status === 'Placed' || o.status === 'Confirmed');
  const dispatchedOrders = orders.filter((o) => o.status === 'Dispatched' || o.status === 'Out for Delivery');
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered');

  const copyForMeesho = (order: Order) => {
    const itemDetails = order.items
      .map(
        (it) =>
          `- ${it.product.name} (Qty: ${it.quantity}${
            it.selectedSize ? `, Size: ${it.selectedSize}` : ''
          }${it.selectedColor ? `, Color: ${it.selectedColor}` : ''})`
      )
      .join('\n');

    const formatted = `=== MEESHO RESELLER DISPATCH DETAILS ===
Customer Name: ${order.shippingAddress.fullName}
Mobile Number: ${order.shippingAddress.mobileNumber}
Delivery Address: ${order.shippingAddress.addressLine}
${order.shippingAddress.landmark ? `Landmark: ${order.shippingAddress.landmark}` : ''}
City: ${order.shippingAddress.city}
State: ${order.shippingAddress.state}
Pincode: ${order.shippingAddress.pincode}
Payment Mode: Cash on Delivery (Collect: ₹${order.total})
Items to Order:
${itemDetails}
=======================================`;

    navigator.clipboard.writeText(formatted);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59B7B] font-bold">
            Live Business Analytics
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-0.5">
            Seller Overview
          </h1>
          <p className="text-xs text-gray-400">
            Real-time status of customer orders, COD collections, and Meesho reselling profits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-[#C59B7B] hover:bg-[#b87d5b] text-[#1E232A] text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <Package className="w-4 h-4" /> Meesho Fulfillment ({pendingOrders.length})
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-colors border border-white/10 flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-[#C59B7B]" /> Product Catalog ({products.length})
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Gross Sales */}
        <div className="bg-[#1A1F26] p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Total Gross Sales</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-gray-400">Across {orders.length} customer orders</p>
        </div>

        {/* Net Reseller Profit */}
        <div className="bg-[#1A1F26] p-5 rounded-2xl border border-[#C59B7B]/30 space-y-2 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#C59B7B]/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-[#C59B7B] text-xs font-bold">
            <span>Estimated Reseller Profit</span>
            <div className="p-2 rounded-lg bg-[#C59B7B]/20 text-[#C59B7B]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#E8D5C4]">₹{estimatedProfit.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-emerald-400 font-semibold">
            ~{profitMarginPercent}% Net Margin after Meesho supplier cost
          </p>
        </div>

        {/* Pending Meesho Action */}
        <div className="bg-[#1A1F26] p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Pending Meesho Orders</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-400">{pendingOrders.length}</div>
          <p className="text-[11px] text-gray-400">Needs ordering in Meesho app</p>
        </div>

        {/* Shipped / Delivered */}
        <div className="bg-[#1A1F26] p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>In Transit & Delivered</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            {dispatchedOrders.length + deliveredOrders.length}
          </div>
          <p className="text-[11px] text-gray-400">
            {deliveredOrders.length} Completed COD handovers
          </p>
        </div>

      </div>

      {/* Meesho Quick Workflow Alert */}
      <div className="bg-linear-to-r from-[#C59B7B]/20 via-[#C59B7B]/10 to-transparent p-5 rounded-2xl border border-[#C59B7B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm text-[#E8D5C4]">
            <Sparkles className="w-4 h-4 text-[#C59B7B]" />
            How to Fulfill Customer Orders into Meesho:
          </div>
          <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
            Click <strong>"1-Click Copy for Meesho"</strong> on any incoming order below. Open the Meesho app, search for the product, tap <em>"Are you reselling? → YES"</em>, enter the customer's retail price as your margin, and paste the address!
          </p>
        </div>
        <Link
          href="/admin/orders"
          className="px-4 py-2 bg-white text-[#1E232A] text-xs font-bold rounded-xl hover:bg-[#C59B7B] transition-colors shrink-0"
        >
          Open Order Manager →
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-[#1A1F26] rounded-2xl border border-white/10 overflow-hidden space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-luxury text-lg font-bold text-white">
            Recent Customer Orders
          </h3>
          <Link
            href="/admin/orders"
            className="text-xs text-[#C59B7B] hover:underline font-bold"
          >
            View All Orders ({orders.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-white/5 text-gray-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer & Phone</th>
                <th className="py-3 px-3">City / Destination</th>
                <th className="py-3 px-3">Amount (COD)</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Meesho Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-white">
                    #{order.id}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold block text-white">{order.shippingAddress.fullName}</span>
                    <span className="text-[11px] text-gray-400">+91 {order.shippingAddress.mobileNumber}</span>
                  </td>
                  <td className="py-3 px-3 text-gray-300">
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </td>
                  <td className="py-3 px-3 font-bold text-[#E8D5C4]">
                    ₹{order.total}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : order.status === 'Dispatched'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => copyForMeesho(order)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                        copiedId === order.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#C59B7B] hover:bg-[#b87d5b] text-[#1E232A]'
                      }`}
                    >
                      {copiedId === order.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy for Meesho
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
