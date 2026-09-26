import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Cash on Delivery Policy | RUAN',
  description: 'Learn about our pan-India delivery timeline, courier partners, and Cash on Delivery guidelines.'
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div>
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#C59B7B] transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </Link>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C59B7B] block">
          RUAN Logistics
        </span>
        <h1 className="font-serif-luxury text-3xl font-bold text-[#1E232A] mt-1">
          Shipping & Cash on Delivery (COD) Policy
        </h1>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EBE5DC] shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#C59B7B]" /> 1. Pan-India Delivery Coverage
          </h2>
          <p>
            RUAN ships to over 24,000+ PIN codes across all 28 states and 8 union territories in India. We partner exclusively with top-tier courier services including <strong>Delhivery</strong>, <strong>Shadowfax</strong>, <strong>Xpressbees</strong>, and <strong>Ekart Logistics</strong> to ensure timely, insured delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#C59B7B]" /> 2. Dispatch & Delivery Timelines
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Order Processing:</strong> All orders are verified and dispatched within 24 to 48 hours of placement.</li>
            <li><strong>Metro Cities (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata):</strong> Delivered within 2 to 4 business days.</li>
            <li><strong>Tier 2 & Tier 3 Cities:</strong> Delivered within 4 to 6 business days.</li>
            <li><strong>Northeast & Remote Regions:</strong> Delivered within 6 to 8 business days.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C59B7B]" /> 3. Cash on Delivery (COD) Guidelines
          </h2>
          <p>
            We proudly offer <strong>Cash on Delivery (COD)</strong> with ₹0 advance payment required.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Please ensure someone is available at the delivery address on the expected delivery day with exact cash or digital UPI (GPay, PhonePe, Paytm).</li>
            <li>The delivery executive will call the recipient number printed on the parcel prior to delivery.</li>
            <li>For COD verification, you will receive an automated delivery OTP on your registered phone number which must be handed to the delivery agent to receive the parcel.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#C59B7B]" /> 4. Shipping Charges & Free Delivery Threshold
          </h2>
          <p>
            We offer <strong>FREE Shipping</strong> on all orders with a cart value of <strong>₹499 or above</strong>. For orders below ₹499, a nominal nominal shipping fee of ₹50 is applied at checkout to cover logistics and packaging.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#1E232A] uppercase tracking-wider">
            5. Tracking Your Shipment
          </h2>
          <p>
            Once your order is dispatched, you will receive courier AWB tracking information. You can track your parcel live anytime by visiting our <Link href="/" className="text-[#C59B7B] underline font-bold">Track Your Order</Link> page or messaging us on WhatsApp with your Order ID.
          </p>
        </section>

      </div>
    </div>
  );
}
