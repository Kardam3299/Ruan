'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, Clock, MessageCircle, ShieldCheck, Truck, Sparkles, Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SITE_CONFIG } from '@/config/site';

export const Footer: React.FC = () => {
  const { setIsTrackModalOpen } = useStore();

  return (
    <footer className="bg-[#1E232A] text-[#FAF7F2] border-t border-[#C59B7B]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Bio */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-white leading-tight">
                RUAN
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C59B7B] font-semibold whitespace-nowrap mt-0.5">
                Luxury & Anti-Tarnish
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Curated everyday luxury. Handcrafted ethnic kurti sets and 18K gold-plated, anti-tarnish, waterproof jewellery designed for the modern Indian woman.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#C59B7B]">
              <span className="flex items-center gap-1 text-xs">
                <Truck className="w-3.5 h-3.5" /> COD All India
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Quality
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-[#C59B7B]">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link href="/#jewellery" className="hover:text-[#C59B7B] transition-colors">
                  Anti-Tarnish Jewellery
                </Link>
              </li>
              <li>
                <Link href="/#jewellery" className="hover:text-[#C59B7B] transition-colors">
                  Oxidised Tribal Jhumkas
                </Link>
              </li>
              <li>
                <Link href="/#clothing" className="hover:text-[#C59B7B] transition-colors">
                  Pure Mulmul Kurti Sets
                </Link>
              </li>
              <li>
                <Link href="/#clothing" className="hover:text-[#C59B7B] transition-colors">
                  Korean Floral Tops
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackModalOpen(true)}
                  className="hover:text-[#C59B7B] transition-colors cursor-pointer text-left"
                >
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Policy Pages */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-[#C59B7B]">
              Customer Care & Policies
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link href="/policies/shipping" className="hover:text-[#C59B7B] transition-colors">
                  Shipping & COD Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-[#C59B7B] transition-colors">
                  7-Day Return & Exchange
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-[#C59B7B] transition-colors">
                  Privacy Policy & Terms
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C59B7B] transition-colors">
                  About Our Brand
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C59B7B] transition-colors">
                  Contact Customer Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-[#C59B7B]">
              Connect With Us
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: <strong>{SITE_CONFIG.owner.phoneDisplay}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C59B7B] shrink-0" />
                <span>{SITE_CONFIG.owner.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C59B7B] shrink-0" />
                <span>Operating Hours: {SITE_CONFIG.owner.operatingHours}</span>
              </li>
              <li className="pt-2">
                <a
                  href={SITE_CONFIG.support.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-lg hover:bg-[#20bd5a] transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and Reseller Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} RUAN India. All Rights Reserved. Handcrafted with elegance.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made for Indian Fashion <Heart className="w-3 h-3 text-[#C59B7B]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
