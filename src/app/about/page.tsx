import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Award, Heart, Truck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About RUAN | Luxury Anti-Tarnish Jewellery & Designer Wear',
  description: 'Learn about RUAN, our craftsmanship, waterproof anti-tarnish guarantee, and pure Jaipuri cotton kurtis.'
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C59B7B]">
          Our Craft & Story
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#1E232A]">
          Everyday Luxury Made Accessible
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          Born from a passion to solve two major dilemmas of Indian fashion: expensive fine jewelry that tarnishes after three wears, and synthetic clothing that traps heat in Indian weather.
        </p>
      </div>

      {/* Story Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg border border-[#EBE5DC] aspect-16/9 relative">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop"
          alt="RUAN Craftsmanship"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1E232A]/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
          <div className="text-white">
            <span className="text-xs text-[#C59B7B] uppercase font-bold tracking-wider">Zero Compromise</span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold">18K PVD Anti-Tarnish Coating & Pure Breathable Mulmul</h3>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Quality */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-[#EBE5DC] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3EAE2] text-[#A57C5D] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif-luxury text-base font-bold text-[#1E232A]">18K PVD Gold Dipping</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Our jewellery utilizes vacuum PVD (Physical Vapor Deposition) technology, making it 10x more resilient than standard electroplating. Wear it to the gym, in the shower, or poolside without tarnishing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#EBE5DC] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3EAE2] text-[#A57C5D] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif-luxury text-base font-bold text-[#1E232A]">Pure Natural Fabrics</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every kurti set is sourced from Jaipur and Lucknow artisans using 100% pure Mulmul cotton and breathable Modal fabric. No cheap polyester blends, no skin itching.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#EBE5DC] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3EAE2] text-[#A57C5D] flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-serif-luxury text-base font-bold text-[#1E232A]">Pan-India COD Trust</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We believe you should see and hold your luxury before parting with your hard-earned money. We offer Cash on Delivery across all 28 states with zero advance payment.
          </p>
        </div>

      </div>

      {/* Quality Promise */}
      <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#C59B7B]/30 space-y-4 text-center">
        <h3 className="font-serif-luxury text-2xl font-bold text-[#1E232A]">
          Our Promise to Every Customer
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 max-w-2xl mx-auto leading-relaxed">
          If your size does not fit or if your jewelry doesn’t match the shine on our website, our team will arrange a hassle-free doorstep reverse pickup within 7 days. Your trust is our biggest asset.
        </p>
        <div className="pt-2">
          <Link
            href="/#featured"
            className="inline-block px-6 py-3 bg-[#1E232A] hover:bg-[#C59B7B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            Explore Our Catalog
          </Link>
        </div>
      </div>

    </div>
  );
}
