'use client';

import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
}

export default function SizeGuideModal({ isOpen, onClose, categoryName = 'Tops' }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const measurements = [
    { size: 'XS', chestCm: '96 - 101', chestIn: '38 - 40', lengthCm: '70', lengthIn: '27.5', shoulderCm: '48', shoulderIn: '18.8' },
    { size: 'S', chestCm: '102 - 107', chestIn: '40 - 42', lengthCm: '72', lengthIn: '28.3', shoulderCm: '50', shoulderIn: '19.6' },
    { size: 'M', chestCm: '108 - 113', chestIn: '42 - 44', lengthCm: '74', lengthIn: '29.1', shoulderCm: '52', shoulderIn: '20.4' },
    { size: 'L', chestCm: '114 - 119', chestIn: '44 - 46', lengthCm: '76', lengthIn: '29.9', shoulderCm: '54', shoulderIn: '21.2' },
    { size: 'XL', chestCm: '120 - 125', chestIn: '46 - 48', lengthCm: '78', lengthIn: '30.7', shoulderCm: '56', shoulderIn: '22.0' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white max-w-xl w-full p-6 sm:p-8 shadow-2xl z-50">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center space-x-2">
              <Ruler size={18} className="text-neutral-900" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-900">
                Size Guide ({categoryName})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between py-4">
            <span className="text-xs text-neutral-500">All measurements taken flat.</span>
            <div className="inline-flex border border-neutral-200 p-0.5 bg-neutral-50">
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-semibold ${
                  unit === 'cm' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Centimeters (cm)
              </button>
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs font-semibold ${
                  unit === 'in' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Inches (in)
              </button>
            </div>
          </div>

          {/* Measurements Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 uppercase tracking-widest text-[10px]">
                  <th className="py-2.5 font-semibold">Size</th>
                  <th className="py-2.5 font-semibold">Chest Circumference</th>
                  <th className="py-2.5 font-semibold">Body Length</th>
                  <th className="py-2.5 font-semibold">Shoulder Drop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800 font-medium">
                {measurements.map((row) => (
                  <tr key={row.size} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-2.5 font-bold text-black">{row.size}</td>
                    <td className="py-2.5">{unit === 'cm' ? `${row.chestCm} cm` : `${row.chestIn} in`}</td>
                    <td className="py-2.5">{unit === 'cm' ? `${row.lengthCm} cm` : `${row.lengthIn} in`}</td>
                    <td className="py-2.5">{unit === 'cm' ? `${row.shoulderCm} cm` : `${row.shoulderIn} in`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure */}
          <div className="mt-6 pt-4 border-t border-neutral-100 bg-neutral-50/50 p-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-1">
              Measuring Tips
            </h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.<br />
              <strong>Length:</strong> Measure from the highest point of the shoulder seam straight down to the hem.<br />
              For our relaxed and boxy fits, order your true size for the intended drape, or size down for a slimmer fit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
