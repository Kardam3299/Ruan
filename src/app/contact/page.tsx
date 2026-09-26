'use client';

import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    orderId: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappDirectUrl = `https://wa.me/${SITE_CONFIG.owner.whatsappNumber}?text=${encodeURIComponent(
    'Hi RUAN Team, I need help regarding your products / my order.'
  )}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C59B7B]">
          Get in Touch
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#1E232A]">
          We're Here to Help
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
          Have questions about sizing, anti-tarnish jewelry, or order tracking? Reach out to our dedicated care team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Contact Info & Direct WhatsApp (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EBE5DC] shadow-xs space-y-6">
            <h3 className="font-serif-luxury text-lg font-bold text-[#1E232A]">
              Quick Support Channels
            </h3>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                Instant WhatsApp Helpline
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Fastest response for order status, size exchanges, and courier queries. Available 7 days a week.
              </p>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Chat with Us Now
              </a>
            </div>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C59B7B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1E232A]">Email Support</strong>
                  <span>support@auratrends.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C59B7B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1E232A]">Customer Care Hours</strong>
                  <span>Monday to Saturday: 10:00 AM – 8:00 PM IST</span><br />
                  <span>Sunday: 11:00 AM – 5:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C59B7B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1E232A]">Design Studio & Fulfilment</strong>
                  <span>Sector 62, Noida, Uttar Pradesh, 201309</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EBE5DC] shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1E232A]">Message Received</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you for contacting RUAN. Our customer concierge will review your message and reach out to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-[#1E232A] text-white text-xs font-bold rounded-lg hover:bg-[#C59B7B] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif-luxury text-lg font-bold text-[#1E232A] mb-4">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Iyer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E232A] mb-1">
                    Order ID (If inquiry is regarding an order)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ORD-8492"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E232A] mb-1">
                    How can we help you? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your question, size inquiry, or exchange request here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1E232A] hover:bg-[#C59B7B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
