'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Truck,
  RotateCcw,
  ShieldCheck,
  Zap,
  Star,
  ShoppingBag,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  Award
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS, CATEGORIES, CUSTOMER_REVIEWS } from '@/data/products';

export default function HomePage() {
  const { addToCart, wishlist, toggleWishlist, searchQuery } = useStore();

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: 'Trending Anti-Tarnish Jewellery & Designer Wear',
      subtitle: 'Festive Luxury Collection 2026',
      description: 'Crafted with 18K vacuum PVD gold plating. 100% waterproof, sweatproof & hypoallergenic.',
      tag: '🔥 Flat 50% Off Limited Time',
      ctaText: 'Shop Collection',
      ctaLink: '#featured',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Handcrafted Mulmul & Chikankari Kurti Sets',
      subtitle: 'Pure Jaipur Craftsmanship',
      description: 'Airy, featherlight pure cotton with intricate Gota Patti & authentic Lucknowi threadwork.',
      tag: '🌸 Cash On Delivery Available',
      ctaText: 'Explore Ethnic Wear',
      ctaLink: '#clothing',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Vintage German Silver & Tribal Oxidised Jhumkas',
      subtitle: 'Antique Heritage Jewelry',
      description: 'Lightweight statement earrings that never blacken or lose their radiant shine.',
      tag: '✨ Starts at Just ₹349',
      ctaText: 'View Jhumka Designs',
      ctaLink: '#jewellery',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1600&auto=format&fit=crop'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Filter products based on search and category
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory =
      selectedCategoryFilter === 'All' ? true : p.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO CAROUSEL */}
      <section className="relative overflow-hidden bg-[#1E232A] text-white">
        <div className="relative h-[480px] sm:h-[540px] lg:h-[620px] w-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Gradient Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out transform scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-[#1E232A]/90 via-[#1E232A]/60 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-[#1E232A] via-transparent to-black/30" />
              </div>

              {/* Content Box */}
              <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#C59B7B]/20 border border-[#C59B7B]/40 text-[#E8D5C4] px-3 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#C59B7B]" />
                    {slide.tag}
                  </div>

                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#C59B7B]">
                    {slide.subtitle}
                  </p>

                  <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-sm">
                    {slide.title}
                  </h1>

                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href={slide.ctaLink}
                      className="px-7 py-3.5 bg-[#C59B7B] hover:bg-[#b87d5b] text-[#1E232A] hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 group cursor-pointer"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <a
                      href="#categories"
                      className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors backdrop-blur-xs cursor-pointer"
                    >
                      View Categories
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentSlide ? 'w-8 bg-[#C59B7B]' : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>


      {/* 2. TRUST BADGES ROW (4 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          
          {/* Badge 1 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EBE5DC] shadow-sm hover:shadow-md transition-shadow flex items-start gap-3.5 group">
            <div className="p-3 rounded-xl bg-[#F3EAE2] text-[#A57C5D] group-hover:bg-[#1E232A] group-hover:text-white transition-colors shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1E232A]">Cash on Delivery</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Pay in cash or UPI at your doorstep with ₹0 advance.</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EBE5DC] shadow-sm hover:shadow-md transition-shadow flex items-start gap-3.5 group">
            <div className="p-3 rounded-xl bg-[#F3EAE2] text-[#A57C5D] group-hover:bg-[#1E232A] group-hover:text-white transition-colors shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1E232A]">7-Day Easy Returns</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Hassle-free size exchange and home reverse pickup.</p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EBE5DC] shadow-sm hover:shadow-md transition-shadow flex items-start gap-3.5 group">
            <div className="p-3 rounded-xl bg-[#F3EAE2] text-[#A57C5D] group-hover:bg-[#1E232A] group-hover:text-white transition-colors shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1E232A]">100% Anti-Tarnish</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Waterproof 18K PVD gold dipped & rust-proof.</p>
            </div>
          </div>

          {/* Badge 4 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EBE5DC] shadow-sm hover:shadow-md transition-shadow flex items-start gap-3.5 group">
            <div className="p-3 rounded-xl bg-[#F3EAE2] text-[#A57C5D] group-hover:bg-[#1E232A] group-hover:text-white transition-colors shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1E232A]">Fast Shipping India</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Dispatched in 24 hrs with live Delhivery tracking.</p>
            </div>
          </div>

        </div>
      </section>


      {/* 3. CATEGORY SHOWCASE GRID */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C59B7B]">
            Handpicked Curations
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E232A]">
            Explore by Category
          </h2>
          <p className="text-xs text-gray-500">
            From regal oxidised jhumkas to breathable pure Jaipur cotton kurti sets.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategoryFilter(cat.name);
                const el = document.getElementById('featured');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 text-left cursor-pointer border border-[#EBE5DC]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1E232A] via-[#1E232A]/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C59B7B]">
                  {cat.tag}
                </span>
                <h3 className="font-serif-luxury text-base sm:text-lg font-bold group-hover:text-[#E8D5C4] transition-colors mt-0.5">
                  {cat.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-300 mt-2 pt-2 border-t border-white/20">
                  <span>{cat.count}</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#C59B7B] group-hover:translate-x-1 transition-transform">
                    Shop Now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>


      {/* 4. FEATURED PRODUCTS SECTION */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C59B7B]">
              Bestsellers & New Arrivals
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E232A]">
              Trending This Week
            </h2>
            <p className="text-xs text-gray-500">
              High-converting styles with verified customer love & instant Cash on Delivery.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 text-xs">
            {['All', 'Oxidised Earrings', 'Necklace Sets', 'Ethnic Kurti Sets', 'Western Tops'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? 'bg-[#1E232A] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-[#EBE5DC] hover:border-[#C59B7B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#EBE5DC] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#C59B7B]/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Zoom */}
                <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
                  <Link href={`/products/${product.slug}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                  </Link>

                  {/* Discount Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-xs">
                    {product.discountPercentage}% OFF
                  </div>

                  {/* Anti Tarnish Badge */}
                  {product.isAntiTarnish && (
                    <div className="absolute bottom-2.5 left-2.5 bg-[#1E232A]/85 backdrop-blur-xs text-[#C59B7B] text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Anti-Tarnish
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-[#1E232A] shadow-sm transition-transform hover:scale-110 cursor-pointer"
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
                      }`}
                    />
                  </button>

                  {/* Quick View Link */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="absolute inset-x-3 bottom-3 py-2 bg-white/95 hover:bg-white text-[#1E232A] text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Details & Sizes
                  </Link>
                </div>

                {/* Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                      <span className="uppercase tracking-wider font-semibold text-[#A57C5D]">
                        {product.category}
                      </span>
                      <span className="flex items-center gap-0.5 font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {product.rating}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-xs sm:text-sm font-semibold text-[#1E232A] hover:text-[#C59B7B] line-clamp-2 transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  {/* Price Row & Add To Cart Button */}
                  <div className="pt-2 border-t border-gray-100 space-y-2.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm sm:text-base font-bold text-[#1E232A]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{product.mrp}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                        Save ₹{product.mrp - product.price}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="flex-1 py-2 bg-[#1E232A] hover:bg-[#C59B7B] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>

                      <Link
                        href={`/products/${product.slug}`}
                        className="p-2 border border-gray-200 hover:border-[#C59B7B] text-gray-600 hover:text-[#1E232A] rounded-xl transition-colors flex items-center justify-center"
                        title="View Product"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="text-[10px] text-gray-500 text-center flex items-center justify-center gap-1">
                      <Truck className="w-3 h-3 text-[#C59B7B]" /> Free COD Available
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 5. INSTAGRAM / CUSTOMER SHOWCASE SECTION */}
      <section className="bg-white py-16 border-y border-[#EBE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C59B7B]">
              Social Proof & Real Reviews
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E232A]">
              Loved by 15,000+ Indian Shoppers
            </h2>
            <p className="text-xs text-gray-500">
              See how our customers style RUAN anti-tarnish jewellery and handcrafted kurtis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EBE5DC] flex flex-col justify-between space-y-4 hover:border-[#C59B7B]/50 transition-colors shadow-xs"
              >
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={rev.userImage}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#C59B7B]/40"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#1E232A]">{rev.author}</h4>
                      {rev.verified && (
                        <span title="Verified Buyer">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500 block">{rev.city}</span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[10px] text-gray-400 ml-1">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs text-gray-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>

                {/* Tagged Product */}
                <div className="pt-2 border-t border-[#EBE5DC] text-[10px] text-gray-500 truncate">
                  Purchased: <strong className="text-[#1E232A]">{rev.productName}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-[#F3EAE2] text-[#A57C5D] px-5 py-2.5 rounded-full text-xs font-semibold">
              <Award className="w-4 h-4 text-[#C59B7B]" />
              Tag us @AuraTrendsIndia on Instagram to be featured on our site!
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
