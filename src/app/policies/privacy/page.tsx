import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & Terms | RUAN',
  description: 'Understand how RUAN protects your personal information, address data, and order confidentiality.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div>
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#C59B7B] transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </Link>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C59B7B] block">
          Customer Data Protection
        </span>
        <h1 className="font-serif-luxury text-3xl font-bold text-[#1E232A] mt-1">
          Privacy Policy & Terms of Service
        </h1>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EBE5DC] shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#C59B7B]" /> 1. Information We Collect
          </h2>
          <p>
            When you place an order on RUAN, we collect your Full Name, 10-digit Mobile Number, Shipping Address, and Pincode. This information is used strictly to fulfill your order and facilitate delivery via our logistics partners.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C59B7B]" /> 2. Confidentiality & Third-Party Sharing
          </h2>
          <p>
            We respect your privacy. We never sell, rent, or trade your personal information to third-party advertisers. Your contact details are shared solely with our courier partners (e.g. Delhivery, Shadowfax) so that delivery executives can contact you to complete parcel handover.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider">
            3. Order Communications
          </h2>
          <p>
            We use your mobile number to send transactional order confirmations, courier AWB tracking links, and delivery status notifications via SMS or WhatsApp. You can opt out of promotional messages anytime.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider">
            4. Contact Our Privacy Officer
          </h2>
          <p>
            If you have any questions regarding your data or wish to have your records removed from our system, please contact us at <strong>privacy@auratrends.in</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
