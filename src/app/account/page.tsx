'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  Trash2,
  ShieldCheck,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { ShippingAddress } from '@/types/ecommerce';

export default function CustomerAccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, updateProfile, saveAddress, deleteAddress } = useAuth();
  const { orders, getUserOrders, setIsTrackModalOpen } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  // Profile Edit Form State
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);

  // New Address Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newAddressLine, setNewAddressLine] = useState('');
  const [newLandmark, setNewLandmark] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/account/login');
    }
    if (user) {
      setProfileName(user.name);
      setProfilePhone(user.phone);
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-xs text-gray-500">
        Loading customer portal...
      </div>
    );
  }

  // Get orders belonging to this user
  const userOrders = getUserOrders(user.email).concat(
    orders.filter((o) => o.shippingAddress.mobileNumber === user.phone && !o.customerEmail)
  );

  // Deduplicate orders
  const uniqueOrders = Array.from(new Map(userOrders.map((o) => [o.id, o])).values());

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileName, profilePhone);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const addr: ShippingAddress = {
      fullName: newFullName.trim() || user.name,
      mobileNumber: newPhone.replace(/\D/g, '') || user.phone,
      pincode: newPincode.trim(),
      city: newCity.trim(),
      state: newState.trim(),
      addressLine: newAddressLine.trim(),
      landmark: newLandmark.trim() || undefined
    };

    saveAddress(addr);
    setShowAddAddress(false);
    setNewAddressLine('');
    setNewPincode('');
    setNewCity('');
    setNewState('');
    setNewLandmark('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Account Overview Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE5DC] shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1E232A] text-[#E8D5C4] flex items-center justify-center font-serif-luxury text-2xl font-bold shadow-sm">
            {user.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1E232A]">
                {user.name}
              </h1>
              <span className="bg-[#F3EAE2] text-[#A57C5D] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Privileged Customer
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              📞 +91 {user.phone} • ✉️ {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#featured"
            className="px-4 py-2.5 bg-[#FAF7F2] hover:bg-gray-100 text-[#1E232A] text-xs font-bold rounded-xl border border-[#EBE5DC] transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Tabs + Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sidebar Tabs (3 cols) */}
        <div className="md:col-span-4 lg:col-span-3 space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#1E232A] text-white shadow-md'
                : 'bg-white hover:bg-[#FAF7F2] text-gray-700 border border-[#EBE5DC]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-[#C59B7B]" /> My Orders
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'orders' ? 'bg-[#C59B7B] text-white' : 'bg-gray-100 text-gray-600'}`}>
              {uniqueOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-[#1E232A] text-white shadow-md'
                : 'bg-white hover:bg-[#FAF7F2] text-gray-700 border border-[#EBE5DC]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#C59B7B]" /> Saved Addresses
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'addresses' ? 'bg-[#C59B7B] text-white' : 'bg-gray-100 text-gray-600'}`}>
              {user.addresses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#1E232A] text-white shadow-md'
                : 'bg-white hover:bg-[#FAF7F2] text-gray-700 border border-[#EBE5DC]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-[#C59B7B]" /> Profile Settings
            </span>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>
        </div>

        {/* Content Area (9 cols) */}
        <div className="md:col-span-8 lg:col-span-9">
          
          {/* TAB 1: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif-luxury text-xl font-bold text-[#1E232A]">
                  Order History & Live Tracking
                </h2>
                <button
                  onClick={() => setIsTrackModalOpen(true)}
                  className="text-xs text-[#A57C5D] hover:underline font-bold"
                >
                  Track by Order ID
                </button>
              </div>

              {uniqueOrders.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-[#EBE5DC] text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-gray-400 flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-luxury text-lg font-bold text-[#1E232A]">No Orders Placed Yet</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Browse our viral 18K anti-tarnish waterproof jewellery and pure Jaipur cotton kurtis!
                  </p>
                  <Link
                    href="/#featured"
                    className="inline-block px-6 py-2.5 bg-[#1E232A] text-white text-xs font-bold rounded-xl hover:bg-[#C59B7B] transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                uniqueOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl p-5 border border-[#EBE5DC] shadow-xs hover:border-[#C59B7B]/50 transition-all space-y-4"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#1E232A]">#{order.id}</span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'Dispatched'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-gray-400 block">Total Amount (COD)</span>
                          <span className="text-sm font-bold text-[#C59B7B]">₹{order.total}</span>
                        </div>
                        <Link
                          href={`/track?id=${order.id}`}
                          className="px-3 py-1.5 bg-[#1E232A] hover:bg-[#C59B7B] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Truck className="w-3.5 h-3.5" /> Track Package
                        </Link>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img
                            src={it.product.images[0]}
                            alt={it.product.name}
                            className="w-12 h-14 object-cover rounded-lg border border-gray-100 shrink-0"
                          />
                          <div className="flex-1 text-xs">
                            <h4 className="font-semibold text-[#1E232A]">{it.product.name}</h4>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              Qty: {it.quantity} {it.selectedSize ? `• Size: ${it.selectedSize}` : ''}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-[#1E232A]">₹{it.product.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Courier Dispatch Alert (If Dispatched) */}
                    {order.courierName && order.awbNumber && (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between text-emerald-950">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-emerald-700" />
                          <span>
                            Shipped via <strong>{order.courierName}</strong> (AWB: <span className="font-mono">{order.awbNumber}</span>)
                          </span>
                        </div>
                        {order.trackingUrl && (
                          <a
                            href={order.trackingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-800 font-bold underline flex items-center gap-1"
                          >
                            Courier Site <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif-luxury text-xl font-bold text-[#1E232A]">
                    Delivery Addresses
                  </h2>
                  <p className="text-xs text-gray-500">
                    Saved addresses will automatically pre-fill at checkout.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-4 py-2 bg-[#1E232A] hover:bg-[#C59B7B] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Add New Address
                </button>
              </div>

              {/* Add Address Form */}
              {showAddAddress && (
                <form
                  onSubmit={handleSaveNewAddress}
                  className="bg-white p-6 rounded-2xl border border-[#C59B7B]/40 shadow-md space-y-4 animate-fadeIn"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#A57C5D]">
                    New Delivery Destination
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1E232A] mb-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Recipient Name"
                        value={newFullName}
                        onChange={(e) => setNewFullName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#C59B7B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1E232A] mb-1">10-Digit Phone</label>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="Recipient Contact"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#C59B7B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] mb-1">House/Flat/Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 302, Royal Palms, MG Road"
                      value={newAddressLine}
                      onChange={(e) => setNewAddressLine(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#C59B7B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1E232A] mb-1">PIN Code *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="6-digit PIN"
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#C59B7B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1E232A] mb-1">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#C59B7B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1E232A] mb-1">State *</label>
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#C59B7B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] mb-1">Landmark (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Opposite Post Office"
                      value={newLandmark}
                      onChange={(e) => setNewLandmark(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#C59B7B]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#1E232A] text-white text-xs font-bold rounded-lg hover:bg-[#C59B7B] transition-colors cursor-pointer"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Address Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.addresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-[#EBE5DC] shadow-xs flex flex-col justify-between space-y-3 relative group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-[#1E232A]">{addr.fullName}</span>
                        {idx === 0 && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {addr.addressLine}<br />
                        {addr.landmark && `Landmark: ${addr.landmark}`}<br />
                        {addr.city}, {addr.state} - <strong>{addr.pincode}</strong><br />
                        📞 +91 {addr.mobileNumber}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-end">
                      <button
                        onClick={() => deleteAddress(idx)}
                        className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-1 cursor-pointer p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EBE5DC] shadow-xs space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-serif-luxury text-xl font-bold text-[#1E232A]">
                  Personal Profile
                </h2>
                <p className="text-xs text-gray-500">
                  Update your personal details and primary contact number.
                </p>
              </div>

              {profileSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-[#1E232A] mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#C59B7B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E232A] mb-1">
                    Registered Email (Read-Only)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E232A] mb-1">
                    10-Digit Mobile Number
                  </label>
                  <div className="relative">
                    <span className="text-xs text-gray-500 font-bold absolute left-3 top-2.5">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full pl-12 pr-3 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#C59B7B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1E232A] hover:bg-[#C59B7B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
