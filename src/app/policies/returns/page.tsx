import React from 'react';
import Link from 'next/link';
import { RotateCcw, ShieldCheck, CheckCircle2, MessageCircle, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: '7-Day Return & Exchange Policy | RUAN',
  description: 'Understand our hassle-free 7-day size exchange and return policy for jewellery and clothing.'
};

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div>
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#C59B7B] transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </Link>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C59B7B] block">
          Customer Satisfaction
        </span>
        <h1 className="font-serif-luxury text-3xl font-bold text-[#1E232A] mt-1">
          7-Day Return & Exchange Policy
        </h1>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EBE5DC] shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-[#C59B7B]" /> 1. Easy 7-Day Window
          </h2>
          <p>
            At RUAN, we want you to be completely satisfied with your purchase. We offer a <strong>7-day return and size exchange policy</strong> from the date your package is delivered to your doorstep.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#C59B7B]" /> 2. Eligibility Criteria
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Items must be unused, unwashed, and in their original pristine condition.</li>
            <li>All original luxury brand tags, polybags, and velvet gift boxes must be returned intact.</li>
            <li>In the rare event that an item arrives damaged or defective in transit, please share a parcel opening video or photos with us on WhatsApp within 48 hours of delivery for an instant replacement.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C59B7B]" /> 3. Free Size Exchange
          </h2>
          <p>
            Bought a Kurti or Top and the size doesn't fit? We offer <strong>100% Free Doorstep Size Exchange</strong>. Our courier partner will deliver your replacement size and pick up the original package at the exact same time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider">
            4. Refund Process for COD Orders
          </h2>
          <p>
            For Cash on Delivery orders, once the returned package is received and quality-checked at our fulfillment hub, our team will initiate an instant refund directly to your Bank Account via <strong>UPI (GPay / PhonePe / Paytm) or IMPS Bank Transfer</strong> within 24 to 48 hours.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-[#25D366]" /> 5. How to Initiate a Return or Exchange
          </h2>
          <p>
            Simply message our dedicated care team on WhatsApp at <strong>+91 97296 56981</strong> or email us at <strong>support@auratrends.in</strong> with your Order ID (e.g. #ORD-8492) and reason for return. Our team will schedule the reverse pickup within 24 hours.
          </p>
        </section>

      </div>
    </div>
  );
}
