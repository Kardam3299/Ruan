'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Plus,
  Trash2,
  Edit,
  DollarSign,
  TrendingUp,
  Sparkles,
  Check,
  X,
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types/ecommerce';

export default function AdminProductsPage() {
  const { products, addProduct, deleteProduct } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for New Product
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Oxidised Earrings' | 'Necklace Sets' | 'Ethnic Kurti Sets' | 'Western Tops'>('Oxidised Earrings');
  const [meeshoCost, setMeeshoCost] = useState<number>(250);
  const [sellingPrice, setSellingPrice] = useState<number>(649);
  const [mrp, setMrp] = useState<number>(1299);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [sizesInput, setSizesInput] = useState('S, M, L, XL, XXL');
  const [isAntiTarnish, setIsAntiTarnish] = useState(true);

  // Live Margin Calculation
  const netProfit = Math.max(0, sellingPrice - meeshoCost);
  const marginPercent = sellingPrice > 0 ? Math.round((netProfit / sellingPrice) * 100) : 0;
  const discountPercent = mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 50;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const defaultImg =
      imageUrl.trim() ||
      (category.includes('Earrings')
        ? 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'
        : category.includes('Necklace')
        ? 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop');

    const sizes =
      category === 'Ethnic Kurti Sets' || category === 'Western Tops'
        ? sizesInput.split(',').map((s) => s.trim()).filter(Boolean)
        : undefined;

    addProduct({
      slug,
      name: name.trim(),
      category,
      price: Number(sellingPrice),
      mrp: Number(mrp),
      meeshoCost: Number(meeshoCost),
      discountPercentage: discountPercent,
      rating: 4.9,
      reviewsCount: 1,
      images: [defaultImg],
      description: description.trim() || 'Handcrafted luxury piece with premium anti-tarnish finish.',
      material: material.trim() || '316L Stainless Steel with 18K PVD Gold Electroplating',
      inStock: true,
      stockStatus: 'In Stock - Ready to Dispatch',
      sizes,
      isFeatured: true,
      isNewArrival: true,
      isAntiTarnish,
      specifications: {
        'Material': material.trim() || 'Premium Stainless Steel / Cotton',
        'Quality Seal': isAntiTarnish ? '100% Anti-Tarnish & Waterproof' : 'Standard Fine Craft',
        'Packaging': 'Luxury Velvet Gift Box Included'
      },
      shippingInfo: 'Free Delivery on orders above ₹499. Dispatched in 24 hours via Delhivery.',
      returnPolicy: '7-Day Easy Return and Size Exchange.'
    });

    setShowAddModal(false);
    setName('');
    setImageUrl('');
    setDescription('');
    setMaterial('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59B7B] font-bold">
            Catalog & Reseller Pricing
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-0.5">
            Products & Margin Manager
          </h1>
          <p className="text-xs text-gray-400">
            Set your selling price vs Meesho cost and see your net profit margins automatically.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#C59B7B] hover:bg-[#b87d5b] text-[#1E232A] text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-[#1A1F26] p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search products by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#14171C] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C59B7B]"
          />
        </div>

        <div className="text-xs text-gray-400">
          Active Products: <strong className="text-white">{products.length}</strong> items in live store
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#1A1F26] rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-white/5 text-gray-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Meesho Cost</th>
                <th className="py-3.5 px-4">Selling Price</th>
                <th className="py-3.5 px-4">Net Profit Margin</th>
                <th className="py-3.5 px-4">Live Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {filteredProducts.map((prod) => {
                const cost = prod.meeshoCost || Math.round(prod.price * 0.45);
                const profit = prod.price - cost;
                const margin = Math.round((profit / prod.price) * 100);

                return (
                  <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-11 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                        />
                        <div>
                          <Link
                            href={`/products/${prod.slug}`}
                            target="_blank"
                            className="font-semibold text-white hover:text-[#C59B7B] line-clamp-1 flex items-center gap-1"
                          >
                            {prod.name} <ExternalLink className="w-3 h-3 opacity-60" />
                          </Link>
                          <span className="text-[10px] text-gray-400">MRP: ₹{prod.mrp}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-300">
                      <span className="bg-white/5 px-2 py-1 rounded-md text-[11px]">
                        {prod.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-gray-400">
                      ₹{cost}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-white">
                      ₹{prod.price}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-emerald-400">
                          +₹{profit}
                        </span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold border border-emerald-500/30">
                          {margin}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        In Stock (Live)
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD PRODUCT MODAL WITH LIVE MARGIN CALCULATOR */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#1A1F26] rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-[#C59B7B]/40 shadow-2xl relative max-h-[92vh] overflow-y-auto space-y-5">
            
            {/* Close */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59B7B] font-bold">
                Catalog Expansion
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mt-0.5">
                Add New Product to Store
              </h3>
            </div>

            {/* LIVE PROFIT ENGINE PREVIEW BANNER */}
            <div className="bg-linear-to-r from-[#C59B7B]/20 via-[#C59B7B]/10 to-transparent p-4 rounded-2xl border border-[#C59B7B]/40 flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-400 block">Live Profit Margin Preview:</span>
                <span className="text-sm font-bold text-white">
                  Meesho Cost: ₹{meeshoCost} ➔ Selling: ₹{sellingPrice}
                </span>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-black text-base block">
                  +₹{netProfit} Profit
                </span>
                <span className="text-[10px] text-emerald-300 font-semibold">
                  {marginPercent}% Net Margin
                </span>
              </div>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              
              {/* Name */}
              <div>
                <label className="block text-gray-300 font-bold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 18K Gold Plated Vintage Floral Choker"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#14171C] border border-white/20 rounded-xl text-white focus:border-[#C59B7B]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-300 font-bold mb-1">Product Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#14171C] border border-white/20 rounded-xl text-white focus:border-[#C59B7B]"
                >
                  <option value="Oxidised Earrings">Oxidised Earrings</option>
                  <option value="Necklace Sets">Necklace Sets</option>
                  <option value="Ethnic Kurti Sets">Ethnic Kurti Sets</option>
                  <option value="Western Tops">Western Tops</option>
                </select>
              </div>

              {/* Pricing Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Meesho Wholesale Cost (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={meeshoCost}
                    onChange={(e) => setMeeshoCost(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#14171C] border border-white/20 rounded-xl text-white focus:border-[#C59B7B]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Your Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#14171C] border border-[#C59B7B] rounded-xl text-white font-bold focus:border-[#C59B7B]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Strike-through MRP (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={mrp}
                    onChange={(e) => setMrp(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#14171C] border border-white/20 rounded-xl text-white focus:border-[#C59B7B]"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  Product Image URL (Leave blank for high-fashion preset)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#14171C] border border-white/20 rounded-xl text-white focus:border-[#C59B7B]"
                />
              </div>

              {/* Material & Craftsmanship */}
              <div>
                <label className="block text-gray-300 font-bold mb-1">Material & Specs</label>
                <input
                  type="text"
                  placeholder="e.g. 18K PVD Gold Electroplating on Surgical Stainless Steel"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#14171C] border border-white/20 rounded-xl text-white focus:border-[#C59B7B]"
                />
              </div>

              {/* Sizes (if clothing) */}
              {(category === 'Ethnic Kurti Sets' || category === 'Western Tops') && (
                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Available Sizes (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={sizesInput}
                    onChange={(e) => setSizesInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#14171C] border border-white/20 rounded-xl text-white focus:border-[#C59B7B]"
                  />
                </div>
              )}

              {/* Anti-Tarnish Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="antiTarnishCheck"
                  checked={isAntiTarnish}
                  onChange={(e) => setIsAntiTarnish(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C59B7B] focus:ring-[#C59B7B]"
                />
                <label htmlFor="antiTarnishCheck" className="text-gray-300 font-medium">
                  Enable 100% Anti-Tarnish & Waterproof Badge on Storefront
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#C59B7B] hover:bg-[#b87d5b] text-[#1E232A] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  Publish to Live Storefront
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
