'use client';

import React from 'react';
import { Truck, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

import { SITE_CONFIG } from '@/config/site';

export const AnnouncementBar: React.FC = () => {
  const { setIsTrackModalOpen } = useStore();

  return (
    <div className="bg-[#1E232A] text-[#FAF7F2] text-xs py-2 px-4 border-b border-[#C59B7B]/30 select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
        <div className="flex items-center justify-center gap-4 text-[11px] sm:text-xs tracking-wide">
          <span className="flex items-center gap-1.5 font-medium text-[#E8D5C4]">
            <Truck className="w-3.5 h-3.5 text-[#C59B7B]" />
            Cash On Delivery Available Across India
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B7B]" />
            Free Express Shipping on Orders Above ₹499
          </span>
          <span className="hidden lg:inline text-white/30">|</span>
          <span className="hidden lg:flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Anti-Tarnish & Waterproof Guarantee
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <button
            onClick={() => setIsTrackModalOpen(true)}
            className="text-[#E8D5C4] hover:text-white transition-colors underline underline-offset-4 cursor-pointer font-medium"
          >
            Track Your Order
          </button>
          <span className="text-white/30">|</span>
          <a
            href={SITE_CONFIG.support.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Need Help? WhatsApp 24x7
          </a>
        </div>
      </div>
    </div>
  );
};
