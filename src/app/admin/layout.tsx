'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  Package,
  ShoppingBag,
  ExternalLink,
  Lock,
  Unlock,
  LogOut,
  Sparkles,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Check PIN auth on mount
  useEffect(() => {
    const savedPinAuth = sessionStorage.getItem('aura_admin_auth');
    if (savedPinAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master seller PIN is 8899
    if (pinInput.trim() === '8899') {
      setIsAuthenticated(true);
      sessionStorage.setItem('aura_admin_auth', 'true');
      setPinError(null);
    } else {
      setPinError('Incorrect Seller Security PIN. (Default Master PIN: 8899)');
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem('aura_admin_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#14171C] flex items-center justify-center text-xs text-gray-400">
        Authenticating Seller Console...
      </div>
    );
  }

  // Security Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#14171C] text-white flex items-center justify-center p-4">
        <div className="bg-[#1E232A] rounded-3xl p-8 max-w-md w-full border border-[#C59B7B]/30 shadow-2xl space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-[#C59B7B]/10 border border-[#C59B7B]/40 text-[#C59B7B] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C59B7B] font-bold">
              Protected Seller Console
            </span>
            <h1 className="font-serif-luxury text-2xl font-bold text-white">
              RUAN Reseller Admin
            </h1>
            <p className="text-xs text-gray-400">
              Enter your 4-digit Master Seller PIN to manage Meesho fulfillment & products.
            </p>
          </div>

          {pinError && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{pinError}</span>
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                autoFocus
                placeholder="Enter 4-Digit PIN (e.g. 8899)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full py-3 px-4 bg-[#14171C] border border-white/20 rounded-xl text-center text-lg font-mono tracking-widest text-white focus:outline-none focus:border-[#C59B7B] focus:ring-1 focus:ring-[#C59B7B]"
              />
              <span className="text-[11px] text-gray-500 mt-2 block">
                Default Master PIN: <strong className="text-[#C59B7B]">8899</strong>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C59B7B] hover:bg-[#b87d5b] text-[#1E232A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-white/10">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              ← Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Meesho Fulfillment', href: '/admin/orders', icon: Package },
    { name: 'Products & Margins', href: '/admin/products', icon: ShoppingBag }
  ];

  return (
    <div className="min-h-screen bg-[#14171C] text-gray-200 flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#1A1F26] border-r border-white/10 flex flex-col justify-between p-5 shrink-0">
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#C59B7B] text-[#1E232A] flex items-center justify-center font-serif-luxury font-bold text-lg">
              R
            </div>
            <div>
              <span className="font-serif-luxury text-base font-bold text-white block leading-tight">
                RUAN
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C59B7B] font-bold">
                Seller Control Room
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#C59B7B] text-[#1E232A] shadow-md'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs rounded-xl transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#C59B7B]" /> View Live Store
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">• Online</span>
          </Link>

          <button
            onClick={handleLock}
            className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-rose-900/30 text-rose-400 text-xs rounded-xl transition-colors cursor-pointer font-medium"
          >
            <Lock className="w-3.5 h-3.5" /> Lock Seller Console
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

    </div>
  );
}
