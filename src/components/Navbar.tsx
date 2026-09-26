'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingBag,
  Heart,
  Package,
  Menu,
  X,
  User,
  LogOut,
  MapPin,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsTrackModalOpen,
    searchQuery,
    setSearchQuery
  } = useStore();

  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const firstName = user ? user.name.split(' ')[0] : '';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE5DC] transition-all duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#1E232A] hover:text-[#C59B7B] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="group flex flex-col items-start text-left">
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#1E232A] group-hover:text-[#C59B7B] transition-colors leading-tight">
                RUAN
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#A57C5D] font-semibold whitespace-nowrap -mt-0.5">
                Luxury & Anti-Tarnish
              </span>
            </Link>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <Link
              href="/#categories"
              className="text-[#1E232A] hover:text-[#C59B7B] transition-colors py-1 relative group"
            >
              All Collections
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C59B7B] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/#jewellery"
              className="text-[#1E232A] hover:text-[#C59B7B] transition-colors py-1 relative group flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C59B7B]" />
              Jewellery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C59B7B] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/#clothing"
              className="text-[#1E232A] hover:text-[#C59B7B] transition-colors py-1 relative group"
            >
              Women's Wear
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C59B7B] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/#featured"
              className="text-[#1E232A] hover:text-[#C59B7B] transition-colors py-1 relative group"
            >
              New Arrivals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C59B7B] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <button
              onClick={() => setIsTrackModalOpen(true)}
              className="text-[#1E232A] hover:text-[#C59B7B] transition-colors py-1 relative group flex items-center gap-1 cursor-pointer"
            >
              <Package className="w-3.5 h-3.5 text-[#A57C5D]" />
              Track Order
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C59B7B] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Search Bar & Utility Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Desktop Search Input */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search jewellery, kurtis, tops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-52 lg:w-60 pl-9 pr-3 py-1.5 text-xs bg-white/80 border border-[#EBE5DC] rounded-full focus:outline-none focus:ring-1 focus:ring-[#C59B7B] focus:border-[#C59B7B] transition-all text-[#1E232A] placeholder:text-gray-400"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearchMobile(!showSearchMobile)}
              className="md:hidden p-2 text-[#1E232A] hover:text-[#C59B7B] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/#featured"
              className="p-2 text-[#1E232A] hover:text-[#C59B7B] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#C59B7B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Customer Account Button / Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-white border border-[#EBE5DC] hover:border-[#C59B7B] text-[#1E232A] text-xs font-semibold transition-all cursor-pointer shadow-xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#1E232A] text-[#E8D5C4] flex items-center justify-center text-[10px]">
                      {firstName[0]}
                    </div>
                    <span className="hidden sm:inline">Hi, {firstName}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      onMouseLeave={() => setUserDropdownOpen(false)}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#EBE5DC] py-2 z-50 text-xs text-[#1E232A] animate-fadeIn"
                    >
                      <div className="px-3.5 py-2 border-b border-gray-100">
                        <p className="font-bold truncate">{user?.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
                      </div>

                      <Link
                        href="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 hover:bg-[#FAF7F2] text-gray-700 hover:text-[#C59B7B] transition-colors font-medium"
                      >
                        <Package className="w-3.5 h-3.5" /> My Orders & Tracking
                      </Link>

                      <Link
                        href="/account?tab=addresses"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 hover:bg-[#FAF7F2] text-gray-700 hover:text-[#C59B7B] transition-colors font-medium"
                      >
                        <MapPin className="w-3.5 h-3.5" /> Saved Addresses
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-3.5 py-2 hover:bg-rose-50 text-rose-600 transition-colors font-semibold border-t border-gray-100 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/account/login"
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white border border-[#EBE5DC] hover:border-[#C59B7B] text-[#1E232A] hover:text-[#C59B7B] text-xs font-semibold transition-all shadow-xs"
                >
                  <User className="w-3.5 h-3.5 text-[#C59B7B]" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 p-2 bg-[#1E232A] text-white rounded-full hover:bg-[#C59B7B] transition-all px-3 sm:px-4 cursor-pointer shadow-sm group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#E8D5C4] group-hover:text-white transition-colors" />
              <span className="text-xs font-semibold tracking-wider hidden sm:inline">CART</span>
              <span className="bg-[#C59B7B] group-hover:bg-white group-hover:text-[#1E232A] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold transition-colors">
                {cartCount}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {showSearchMobile && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jewellery, kurtis, tops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#EBE5DC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C59B7B] text-[#1E232A]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EBE5DC] bg-[#FAF7F2] px-4 py-5 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3 font-medium text-sm">
            
            {/* Customer Account link mobile */}
            {isAuthenticated ? (
              <div className="bg-white p-3 rounded-xl border border-[#EBE5DC] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold block">Hi, {user?.name}</span>
                  <span className="text-[10px] text-gray-400">{user?.email}</span>
                </div>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-[#C59B7B] underline"
                >
                  My Orders
                </Link>
              </div>
            ) : (
              <Link
                href="/account/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 bg-[#1E232A] text-white rounded-xl text-center text-xs font-bold"
              >
                Sign In / Create Account
              </Link>
            )}

            <Link
              href="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-white/60 text-[#1E232A]"
            >
              All Categories
            </Link>
            <Link
              href="/#jewellery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-white/60 text-[#1E232A] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C59B7B]" />
              Anti-Tarnish Jewellery
            </Link>
            <Link
              href="/#clothing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-white/60 text-[#1E232A]"
            >
              Women's Ethnic & Western Wear
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTrackModalOpen(true);
              }}
              className="text-left py-2 px-3 rounded-md hover:bg-white/60 text-[#1E232A] flex items-center gap-2"
            >
              <Package className="w-4 h-4 text-[#C59B7B]" />
              Track Your Order (COD Status)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
