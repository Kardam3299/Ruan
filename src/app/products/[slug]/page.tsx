'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import {
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Ruler,
  ChevronDown,
  ChevronUp,
  MapPin,
  Check,
  Share2,
  Heart,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';
import { SITE_CONFIG } from '@/config/site';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const {
    addToCart,
    openSizeChart,
    wishlist,
    toggleWishlist,
    setIsCartOpen
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  // Accordion state
  const [openTab, setOpenTab] = useState<'specs' | 'shipping' | 'returns'>('specs');

  // Pincode delivery check state
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeResult('Cash on Delivery available! Expected delivery in 3-5 days.');
    } else {
      setPincodeResult('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  // Instant Buy Now Flow
  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsCartOpen(false);
    router.push('/checkout');
  };

  // Pre-filled WhatsApp Link (Prompt 3 Item 4)
  const variantText = selectedSize ? ` - Variant: ${selectedSize}` : '';
  const colorText = selectedColor ? ` - Color: ${selectedColor}` : '';
  const prefilledText = encodeURIComponent(
    `Hi RUAN, I want to order "${product.name}"${variantText}${colorText} - Price: ₹${product.price}. Please confirm Cash on Delivery availability.`
  );
  const whatsappOrderUrl = `https://wa.me/${SITE_CONFIG.owner.whatsappNumber}?text=${prefilledText}`;

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#C59B7B] transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <span>/</span>
        <span className="text-gray-400">{product.category}</span>
        <span>/</span>
        <span className="text-[#1E232A] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: IMAGE GALLERY (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Display Image */}
          <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-gray-100 border border-[#EBE5DC] group">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Discount Tag */}
            <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
              {product.discountPercentage}% OFF
            </div>

            {/* Anti-Tarnish Callout */}
            {product.isAntiTarnish && (
              <div className="absolute bottom-4 left-4 bg-[#1E232A]/90 backdrop-blur-xs text-[#C59B7B] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" /> 100% Anti-Tarnish & Waterproof
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1E232A] shadow-md transition-transform hover:scale-110 cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          {/* Thumbnails Navigation */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  activeImageIndex === index
                    ? 'border-[#C59B7B] ring-2 ring-[#C59B7B]/20 scale-95'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Fast Guarantee Strip */}
          <div className="p-4 bg-white rounded-xl border border-[#EBE5DC] flex items-center justify-around text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C59B7B]" /> Free COD Above ₹499
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-[#C59B7B]" /> 7-Day Easy Returns
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" /> Quality Verified
            </span>
          </div>
        </div>


        {/* RIGHT COLUMN: PRODUCT DETAILS & PURCHASE (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Badges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C59B7B]">
                {product.category}
              </span>
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-bold text-amber-900">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating} ({product.reviewsCount} verified reviews)
              </div>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E232A] leading-snug">
              {product.name}
            </h1>

            {/* Stock status indicator */}
            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {product.stockStatus}
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-white rounded-2xl border border-[#EBE5DC] shadow-xs space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#1E232A]">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                MRP ₹{product.mrp}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Save ₹{product.mrp - product.price} ({product.discountPercentage}% OFF)
              </span>
            </div>
            <p className="text-[11px] text-gray-500">
              Inclusive of all taxes. Free shipping on this item with Cash on Delivery option!
            </p>
          </div>

          {/* Material & Description Excerpt */}
          <div className="text-xs text-gray-600 leading-relaxed bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EBE5DC]">
            <strong className="text-[#1E232A] block mb-1">Craftsmanship & Material:</strong>
            {product.material}
          </div>

          {/* Size Variant Selector (If clothing) */}
          {product.sizes && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1E232A]">
                  Select Size: <span className="text-[#C59B7B]">{selectedSize}</span>
                </label>
                
                {/* Size Chart Modal Trigger */}
                <button
                  type="button"
                  onClick={() => openSizeChart(product.category)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#A57C5D] hover:text-[#1E232A] transition-colors underline cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#C59B7B]" /> Size Chart Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#1E232A] text-white border-[#1E232A] shadow-sm scale-102'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#C59B7B]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector (If available) */}
          {product.colors && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E232A]">
                Color: <span className="text-[#C59B7B]">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      selectedColor === col
                        ? 'bg-[#C59B7B] text-white border-[#C59B7B]'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E232A]">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* DUAL ACTION CTAs (Prompt 3 Item 4) */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Primary "Buy Now" Button (Opens instant checkout) */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#1E232A] hover:bg-[#C59B7B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#C59B7B] group-hover:text-white" />
                <span>Buy Now (Cash on Delivery)</span>
              </button>

              {/* Secondary Green "Order via WhatsApp" Button */}
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order via WhatsApp</span>
              </a>

            </div>

            {/* Quick Add to Bag Button */}
            <button
              type="button"
              onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
              className="w-full py-3 bg-white hover:bg-gray-50 border border-[#1E232A] text-[#1E232A] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Add to Shopping Bag</span>
            </button>
          </div>

          {/* Pincode Delivery Check */}
          <div className="p-4 bg-white rounded-xl border border-[#EBE5DC] space-y-2">
            <label className="text-xs font-bold text-[#1E232A] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C59B7B]" /> Check Estimated Delivery to Your City
            </label>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit PIN code"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#1E232A] text-white text-xs font-bold rounded-lg hover:bg-[#C59B7B] transition-colors cursor-pointer"
              >
                Check
              </button>
            </form>
            {pincodeResult && (
              <p className="text-[11px] font-medium text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                {pincodeResult}
              </p>
            )}
          </div>

          {/* ACCORDION TABS (Prompt 3 Item 5) */}
          <div className="border border-[#EBE5DC] rounded-xl overflow-hidden bg-white divide-y divide-[#EBE5DC]">
            
            {/* Tab 1: Product Specifications */}
            <div>
              <button
                type="button"
                onClick={() => setOpenTab(openTab === 'specs' ? ('' as any) : 'specs')}
                className="w-full p-4 text-left flex items-center justify-between font-bold text-xs text-[#1E232A] hover:bg-gray-50 cursor-pointer"
              >
                <span>Product Specifications & Details</span>
                {openTab === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openTab === 'specs' && (
                <div className="p-4 text-xs space-y-2 bg-[#FAF7F2] border-t border-[#EBE5DC] animate-fadeIn">
                  <p className="text-gray-700 leading-relaxed mb-3">{product.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="bg-white p-2.5 rounded-lg border border-[#EBE5DC]">
                        <span className="font-semibold text-[#A57C5D] block">{key}:</span>
                        <span className="text-[#1E232A]">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tab 2: Shipping Info */}
            <div>
              <button
                type="button"
                onClick={() => setOpenTab(openTab === 'shipping' ? ('' as any) : 'shipping')}
                className="w-full p-4 text-left flex items-center justify-between font-bold text-xs text-[#1E232A] hover:bg-gray-50 cursor-pointer"
              >
                <span>Shipping & Cash on Delivery (COD) Info</span>
                {openTab === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openTab === 'shipping' && (
                <div className="p-4 text-xs text-gray-700 space-y-2 bg-[#FAF7F2] border-t border-[#EBE5DC] animate-fadeIn">
                  <p className="leading-relaxed">{product.shippingInfo}</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Dispatches within 24 hours of order confirmation.</li>
                    <li>Cash on Delivery available with zero upfront advance payment.</li>
                    <li>Live SMS and website tracking provided via Delhivery / Shadowfax.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Tab 3: Return Policy */}
            <div>
              <button
                type="button"
                onClick={() => setOpenTab(openTab === 'returns' ? ('' as any) : 'returns')}
                className="w-full p-4 text-left flex items-center justify-between font-bold text-xs text-[#1E232A] hover:bg-gray-50 cursor-pointer"
              >
                <span>7-Day Return & Size Exchange Policy</span>
                {openTab === 'returns' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openTab === 'returns' && (
                <div className="p-4 text-xs text-gray-700 space-y-2 bg-[#FAF7F2] border-t border-[#EBE5DC] animate-fadeIn">
                  <p className="leading-relaxed">{product.returnPolicy}</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>7-day return window from the date of doorstep delivery.</li>
                    <li>Size exchanges are 100% free with door-to-door reverse pickup.</li>
                    <li>Items must be unused in original luxury packaging with tags intact.</li>
                  </ul>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
