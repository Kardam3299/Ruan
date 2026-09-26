'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

import { SITE_CONFIG } from '@/config/site';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappNumber = SITE_CONFIG.owner.whatsappNumber;
  const defaultMessage = encodeURIComponent(
    'Hi RUAN! I want to enquire about products and Cash on Delivery order options.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Customer Support"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      {/* Tooltip */}
      <div className="hidden sm:block mr-3 bg-white/95 backdrop-blur-sm text-[#1E232A] px-3.5 py-2 rounded-full shadow-lg border border-[#EBE5DC] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Chat with us on WhatsApp <span className="text-emerald-600 font-bold">• Online</span>
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-xl hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat with RUAN on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </aside>
  );
};
