'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Search,
  Truck,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Filter,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order, OrderStatus } from '@/types/ecommerce';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, updateOrderCourier } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Editing courier
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [courierInput, setCourierInput] = useState('Delhivery Surface');
  const [awbInput, setAwbInput] = useState('');

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'All' ? true : order.status === statusFilter;
    const matchesSearch = searchQuery
      ? order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shippingAddress.mobileNumber.includes(searchQuery) ||
        order.shippingAddress.city.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesStatus && matchesSearch;
  });

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

  const handleSaveCourier = (orderId: string) => {
    if (!awbInput.trim()) return;
    updateOrderCourier(orderId, courierInput, awbInput.trim());
    setEditingOrderId(null);
    setAwbInput('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59B7B] font-bold">
            Order Fulfillment
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-0.5">
            Meesho Dispatch Operations
          </h1>
          <p className="text-xs text-gray-400">
            Copy customer delivery data in 1-click and link courier AWB numbers to customer tracking.
          </p>
        </div>

        <div className="text-xs text-gray-400 bg-[#1A1F26] px-4 py-2 rounded-xl border border-white/10">
          Total Orders: <strong className="text-white">{orders.length}</strong>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#1A1F26] p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by Order ID, name, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#14171C] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C59B7B]"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap gap-1.5 text-xs w-full md:w-auto">
          {['All', 'Placed', 'Confirmed', 'Dispatched', 'Out for Delivery', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#C59B7B] text-[#1E232A]'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-[#1A1F26] rounded-2xl p-12 text-center text-xs text-gray-500 border border-white/10">
            No orders match the current search or status filter.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#1A1F26] rounded-2xl p-5 border border-white/10 shadow-sm space-y-4 hover:border-[#C59B7B]/40 transition-colors"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-base font-bold text-white">#{order.id}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {order.paymentMethod === 'COD' ? 'Cash On Delivery' : 'Prepaid'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-gray-400 block">Collect from Customer</span>
                    <span className="text-base font-bold text-[#E8D5C4]">₹{order.total}</span>
                  </div>

                  {/* 1-Click Copy For Meesho */}
                  <button
                    onClick={() => copyForMeesho(order)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                      copiedId === order.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#C59B7B] hover:bg-[#b87d5b] text-[#1E232A]'
                    }`}
                  >
                    {copiedId === order.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied for Meesho!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> 1-Click Copy for Meesho
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Grid: Customer Details + Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Customer Address */}
                <div className="bg-[#14171C] p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-300">Customer Delivery Info</span>
                    <a
                      href={`https://wa.me/91${order.shippingAddress.mobileNumber}?text=${encodeURIComponent(
                        `Hi ${order.shippingAddress.fullName}, thank you for ordering with RUAN (Order #${order.id}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Customer
                    </a>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">{order.shippingAddress.fullName}</strong><br />
                    📞 <strong>+91 {order.shippingAddress.mobileNumber}</strong><br />
                    {order.shippingAddress.addressLine}<br />
                    {order.shippingAddress.landmark && `Landmark: ${order.shippingAddress.landmark}`}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} - <strong>{order.shippingAddress.pincode}</strong>
                  </p>
                </div>

                {/* Items to Order on Meesho */}
                <div className="bg-[#14171C] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="font-bold text-gray-300 block">Items Ordered:</span>
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <img
                          src={it.product.images[0]}
                          alt={it.product.name}
                          className="w-10 h-10 object-cover rounded-lg border border-white/10 shrink-0"
                        />
                        <div className="truncate flex-1">
                          <span className="font-semibold text-white truncate block text-[11px]">
                            {it.product.name}
                          </span>
                          <span className="text-gray-400 text-[10px]">
                            Qty: <strong className="text-white">{it.quantity}</strong> {it.selectedSize ? `• Size: ${it.selectedSize}` : ''}
                          </span>
                        </div>
                        <span className="font-bold text-[#E8D5C4]">₹{it.product.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Status Updater & Courier AWB Input */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#14171C] p-3 rounded-xl">
                
                {/* Status Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-semibold">Change Order Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className="bg-[#1A1F26] border border-white/20 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 focus:border-[#C59B7B]"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {/* Courier / AWB Info */}
                <div>
                  {order.awbNumber ? (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-400 font-medium">
                        {order.courierName}: <strong className="font-mono text-white">{order.awbNumber}</strong>
                      </span>
                      {order.trackingUrl && (
                        <a
                          href={order.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C59B7B] hover:underline flex items-center gap-0.5 text-[11px]"
                        >
                          Track <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        onClick={() => {
                          setEditingOrderId(order.id);
                          setAwbInput(order.awbNumber || '');
                        }}
                        className="text-gray-400 hover:text-white underline text-[11px] cursor-pointer ml-1"
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingOrderId(order.id)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer border border-white/10"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#C59B7B]" /> Add Courier & AWB Code
                    </button>
                  )}
                </div>

              </div>

              {/* Edit Courier Form */}
              {editingOrderId === order.id && (
                <div className="bg-[#14171C] border border-[#C59B7B]/40 p-3 rounded-xl flex flex-col sm:flex-row gap-2 items-center text-xs animate-fadeIn">
                  <select
                    value={courierInput}
                    onChange={(e) => setCourierInput(e.target.value)}
                    className="bg-[#1A1F26] border border-white/20 text-white rounded-lg px-2.5 py-1.5 text-xs w-full sm:w-44"
                  >
                    <option value="Delhivery Surface">Delhivery Surface</option>
                    <option value="Shadowfax Logistics">Shadowfax Logistics</option>
                    <option value="Xpressbees Express">Xpressbees Express</option>
                    <option value="Ekart Logistics">Ekart Logistics</option>
                    <option value="Ecom Express">Ecom Express</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Paste Meesho Courier AWB number"
                    value={awbInput}
                    onChange={(e) => setAwbInput(e.target.value)}
                    className="bg-[#1A1F26] border border-white/20 text-white rounded-lg px-3 py-1.5 text-xs flex-1 w-full focus:outline-none focus:border-[#C59B7B]"
                  />

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleSaveCourier(order.id)}
                      className="px-4 py-1.5 bg-[#C59B7B] hover:bg-[#b87d5b] text-[#1E232A] rounded-lg font-bold transition-colors cursor-pointer text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingOrderId(null)}
                      className="px-3 py-1.5 text-gray-400 hover:text-white text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}
