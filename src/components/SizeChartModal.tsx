'use client';

import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const SizeChartModal: React.FC = () => {
  const { isSizeChartOpen, setIsSizeChartOpen, sizeChartCategory } = useStore();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isSizeChartOpen) return null;

  const kurtiSizes = [
    { size: 'S', bustIn: '36', bustCm: '91', waistIn: '32', waistCm: '81', hipIn: '38', hipCm: '96', lengthIn: '46', lengthCm: '117' },
    { size: 'M', bustIn: '38', bustCm: '96', waistIn: '34', waistCm: '86', hipIn: '40', hipCm: '101', lengthIn: '46', lengthCm: '117' },
    { size: 'L', bustIn: '40', bustCm: '101', waistIn: '36', waistCm: '91', hipIn: '42', hipCm: '106', lengthIn: '47', lengthCm: '119' },
    { size: 'XL', bustIn: '42', bustCm: '106', waistIn: '38', waistCm: '96', hipIn: '44', hipCm: '111', lengthIn: '47', lengthCm: '119' },
    { size: 'XXL', bustIn: '44', bustCm: '111', waistIn: '40', waistCm: '101', hipIn: '46', hipCm: '116', lengthIn: '48', lengthCm: '122' },
  ];

  const topSizes = [
    { size: 'XS', bustIn: '32', bustCm: '81', waistIn: '26', waistCm: '66', lengthIn: '20', lengthCm: '51' },
    { size: 'S', bustIn: '34', bustCm: '86', waistIn: '28', waistCm: '71', lengthIn: '21', lengthCm: '53' },
    { size: 'M', bustIn: '36', bustCm: '91', waistIn: '30', waistCm: '76', lengthIn: '21.5', lengthCm: '55' },
    { size: 'L', bustIn: '38', bustCm: '96', waistIn: '32', waistCm: '81', lengthIn: '22', lengthCm: '56' },
    { size: 'XL', bustIn: '40', bustCm: '101', waistIn: '34', waistCm: '86', lengthIn: '22.5', lengthCm: '57' },
  ];

  const isKurti = sizeChartCategory.toLowerCase().includes('kurti');
  const data = isKurti ? kurtiSizes : topSizes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#C59B7B]/30 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSizeChartOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 text-[#1E232A] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <Ruler className="w-5 h-5 text-[#C59B7B]" />
          <h3 className="font-serif-luxury text-xl font-bold text-[#1E232A]">
            Size Guide: {isKurti ? "Ethnic Kurti Sets" : "Western Tops"}
          </h3>
        </div>
        <p className="text-xs text-[#4A5568] mb-5">
          All measurements represent finished garment dimensions. We recommend choosing 1-2 inches looser than your body size for a comfortable fit.
        </p>

        {/* Unit Switcher */}
        <div className="flex items-center justify-between mb-4 bg-white p-1 rounded-lg border border-[#EBE5DC]">
          <span className="text-xs font-semibold px-2 text-[#1E232A]">Measurement Units:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                unit === 'in' ? 'bg-[#1E232A] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                unit === 'cm' ? 'bg-[#1E232A] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-[#EBE5DC] bg-white">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#1E232A] text-[#FAF7F2] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Size</th>
                <th className="py-3 px-3">Bust/Chest</th>
                <th className="py-3 px-3">Waist</th>
                {isKurti && <th className="py-3 px-3">Hips</th>}
                <th className="py-3 px-3">Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE5DC]">
              {data.map((row) => (
                <tr key={row.size} className="hover:bg-[#F3EAE2]/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-[#1E232A] bg-gray-50">{row.size}</td>
                  <td className="py-3 px-3 font-medium">{unit === 'in' ? `${row.bustIn}"` : `${row.bustCm} cm`}</td>
                  <td className="py-3 px-3 text-gray-700">{unit === 'in' ? `${row.waistIn}"` : `${row.waistCm} cm`}</td>
                  {isKurti && (
                    <td className="py-3 px-3 text-gray-700">
                      {unit === 'in' ? `${(row as any).hipIn}"` : `${(row as any).hipCm} cm`}
                    </td>
                  )}
                  <td className="py-3 px-3 text-gray-700">{unit === 'in' ? `${row.lengthIn}"` : `${row.lengthCm} cm`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure Tip */}
        <div className="mt-5 p-3.5 bg-[#F3EAE2] rounded-xl border border-[#C59B7B]/20 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#A57C5D]">
            <Sparkles className="w-4 h-4" />
            Tips for the Perfect Fit:
          </div>
          <p className="text-[#1E232A] leading-relaxed">
            • <strong>Bust:</strong> Measure around the fullest part of your chest with your arms relaxed.<br />
            • <strong>Waist:</strong> Measure around your natural waistline, just above your navel.<br />
            • <strong>Hips:</strong> Measure around the widest portion of your hip line.<br />
            • If you fall between two sizes, we suggest choosing the larger size.
          </p>
        </div>

        {/* Guarantee Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-[#EBE5DC]">
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <Check className="w-3.5 h-3.5" /> 7-Day Easy Size Exchange Available
          </span>
          <button
            onClick={() => setIsSizeChartOpen(false)}
            className="px-4 py-1.5 bg-[#1E232A] text-white text-xs font-semibold rounded-lg hover:bg-[#C59B7B] transition-colors cursor-pointer"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};
