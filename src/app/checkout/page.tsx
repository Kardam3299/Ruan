'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Tag,
  AlertCircle,
  Lock,
  Phone,
  MapPin,
  User,
  CreditCard,
  Banknote
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';
import { ShippingAddress } from '@/types/ecommerce';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    cart,
    cartSubtotal,
    shippingFee,
    finalTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    placeOrder,
    setActiveOrder
  } = useStore();

  const [fullName, setFullName] = useState(user?.name || '');
  const [mobileNumber, setMobileNumber] = useState(user?.phone || '');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Prepaid'>('COD');

  // Auto-fill from user if user loads
  React.useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name);
      if (!mobileNumber) setMobileNumber(user.phone);
      if (user.addresses && user.addresses.length > 0 && !addressLine) {
        const def = user.addresses[0];
        setAddressLine(def.addressLine);
        setPincode(def.pincode);
        setCity(def.city);
        setState(def.state);
        if (def.landmark) setLandmark(def.landmark);
      }
    }
  }, [user]);

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill city/state based on Indian pincode lookup demo
  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPincode(val);

    if (val.length === 6) {
      // Basic state guess for smoother UX
      const firstDigit = val[0];
      if (firstDigit === '1') { setCity('New Delhi / NCR'); setState('Delhi'); }
      else if (firstDigit === '2') { setCity('Lucknow / Kanpur'); setState('Uttar Pradesh'); }
      else if (firstDigit === '3') { setCity('Jaipur / Jodhpur'); setState('Rajasthan'); }
      else if (firstDigit === '4') { setCity('Mumbai / Pune'); setState('Maharashtra'); }
      else if (firstDigit === '5') { setCity('Hyderabad / Bengaluru'); setState('Karnataka'); }
      else if (firstDigit === '6') { setCity('Chennai / Kochi'); setState('Tamil Nadu'); }
      else if (firstDigit === '7') { setCity('Kolkata'); setState('West Bengal'); }
      else if (firstDigit === '8') { setCity('Patna / Ranchi'); setState('Bihar'); }
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setFormError('Please enter a valid 10-digit mobile number for courier delivery.');
      return;
    }

    if (pincode.length !== 6) {
      setFormError('Please enter a valid 6-digit PIN code.');
      return;
    }

    if (!addressLine.trim()) {
      setFormError('Please provide your complete house/flat number and street address.');
      return;
    }

    if (!city.trim() || !state.trim()) {
      setFormError('Please enter your city and state.');
      return;
    }

    setIsSubmitting(true);

    const shippingAddress: ShippingAddress = {
      fullName: fullName.trim(),
      mobileNumber: cleanPhone,
      pincode: pincode.trim(),
      city: city.trim(),
      state: state.trim(),
      addressLine: addressLine.trim(),
      landmark: landmark.trim() || undefined
    };

    // Simulate smooth processing
    setTimeout(() => {
      const order = placeOrder(shippingAddress, paymentMethod, user?.id, user?.email);
      setIsSubmitting(false);
      router.push('/order-success');
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold text-[#1E232A]">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-gray-500">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#1E232A] text-white text-xs font-bold rounded-xl hover:bg-[#C59B7B] transition-colors"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Back button */}
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#C59B7B] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT: MINIMAL CHECKOUT FORM (Prompt 4 Item 3) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE5DC] shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h1 className="font-serif-luxury text-2xl font-bold text-[#1E232A]">
                  Cash on Delivery Checkout
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Enter your delivery address for fast doorstep dispatch.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Secure
              </div>
            </div>

            {formError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              {/* Customer Contact */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#A57C5D] flex items-center gap-1.5">
                  <User className="w-4 h-4" /> 1. Customer Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] mb-1">
                      10-Digit Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-gray-500 font-bold">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full pl-12 pr-3 py-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Courier partner will call this number & send delivery OTP.
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#A57C5D] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> 2. Delivery Address
                </h3>

                <div>
                  <label className="block text-xs font-bold text-[#1E232A] mb-1">
                    House / Flat / Building / Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 402, Sunshine Heights, 5th Cross Road"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 560034"
                      value={pincode}
                      onChange={handlePincodeChange}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karnataka"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E232A] mb-1">
                    Nearby Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Opposite City Hospital or Near Metro Station"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                  />
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#A57C5D] flex items-center gap-1.5">
                  <Banknote className="w-4 h-4" /> 3. Select Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* COD Option (Recommended) */}
                  <label
                    className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#1E232A] bg-[#FAF7F2] shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="mt-1 text-[#1E232A] focus:ring-[#C59B7B]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#1E232A]">Cash on Delivery</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                          POPULAR
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        Pay cash or UPI at your doorstep upon parcel handover. Zero advance required!
                      </p>
                    </div>
                  </label>

                  {/* Prepaid Option */}
                  <label
                    className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'Prepaid'
                        ? 'border-[#1E232A] bg-[#FAF7F2] shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Prepaid'}
                      onChange={() => setPaymentMethod('Prepaid')}
                      className="mt-1 text-[#1E232A] focus:ring-[#C59B7B]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#1E232A]">Prepaid (UPI / Cards)</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        Fast contact-free delivery via PhonePe, GPay, Paytm, or Credit/Debit Cards.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Order Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#1E232A] hover:bg-[#C59B7B] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {isSubmitting
                      ? 'Confirming Order...'
                      : paymentMethod === 'COD'
                      ? `Place Cash on Delivery Order (Pay ₹${finalTotal})`
                      : `Proceed to Pay ₹${finalTotal}`}
                  </span>
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-2">
                  By placing your order, you agree to RUAN's 7-Day Return & Delivery Policy.
                </p>
              </div>

            </form>

          </div>
        </div>


        {/* RIGHT: ORDER SUMMARY (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#EBE5DC] shadow-xs space-y-4">
            
            <h3 className="font-serif-luxury text-lg font-bold text-[#1E232A] pb-3 border-b border-gray-100">
              Order Summary ({cart.reduce((t, i) => t + i.quantity, 0)} Items)
            </h3>

            {/* Items list preview */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-gray-100">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 pt-3 first:pt-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-16 object-cover rounded-lg border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 text-xs">
                    <h4 className="font-semibold text-[#1E232A] line-clamp-1">{item.product.name}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-[#1E232A]">₹{item.product.price * item.quantity}</span>
                      <span className="text-[10px] text-gray-400 line-through">₹{item.product.mrp * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 text-xs text-gray-600 pt-4 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1E232A]">₹{cartSubtotal}</span>
              </div>

              {coupon.applied && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({coupon.code})</span>
                  <span>- ₹{coupon.discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Doorstep Delivery</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[#1E232A] pt-3 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-lg text-[#C59B7B]">₹{finalTotal}</span>
              </div>
            </div>

            {/* COD Trust callout */}
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#C59B7B]/30 text-xs text-gray-700 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#A57C5D]">
                <Truck className="w-4 h-4" /> 100% Genuine COD Promise:
              </div>
              <p className="text-[11px] leading-relaxed">
                You pay <strong>₹{finalTotal}</strong> directly to the courier executive only after the package is delivered to your address.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
