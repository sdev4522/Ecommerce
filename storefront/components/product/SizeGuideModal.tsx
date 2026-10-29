'use client';

import React, { useState, useEffect } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
}

export default function SizeGuideModal({ isOpen, onClose, categoryName = 'Piece' }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const measurements = [
    { size: 'XS', chestCm: '96 - 101', chestIn: '38 - 40', lengthCm: '70', lengthIn: '27.5', shoulderCm: '48', shoulderIn: '18.8' },
    { size: 'S', chestCm: '102 - 107', chestIn: '40 - 42', lengthCm: '72', lengthIn: '28.3', shoulderCm: '50', shoulderIn: '19.6' },
    { size: 'M', chestCm: '108 - 113', chestIn: '42 - 44', lengthCm: '74', lengthIn: '29.1', shoulderCm: '52', shoulderIn: '20.4' },
    { size: 'L', chestCm: '114 - 119', chestIn: '44 - 46', lengthCm: '76', lengthIn: '29.9', shoulderCm: '54', shoulderIn: '21.2' },
    { size: 'XL', chestCm: '120 - 125', chestIn: '46 - 48', lengthCm: '78', lengthIn: '30.7', shoulderCm: '56', shoulderIn: '22.0' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-4">
        <div className="relative bg-white max-w-xl w-full p-5 sm:p-8 shadow-2xl z-50 border border-neutral-200">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center space-x-2">
              <Ruler size={18} className="text-neutral-900" />
              <h3 id="size-guide-title" className="text-sm font-semibold uppercase tracking-widest text-neutral-900 font-display">
                Size Guide ({categoryName})
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black transition-colors cursor-pointer"
              aria-label="Close size guide"
            >
              <X size={20} />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-2 py-4">
            <span className="text-xs text-neutral-500 font-light">All measurements taken flat.</span>
            <div className="inline-flex border border-neutral-200 p-0.5 bg-neutral-50">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-semibold cursor-pointer transition-colors ${
                  unit === 'cm' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Centimeters (cm)
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs font-semibold cursor-pointer transition-colors ${
                  unit === 'in' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Inches (in)
              </button>
            </div>
          </div>

          {/* Measurements Table */}
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-xs text-left min-w-[340px]">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 uppercase tracking-widest text-[10px] font-display">
                  <th className="py-2.5 font-semibold">Size</th>
                  <th className="py-2.5 font-semibold">Chest Circumference</th>
                  <th className="py-2.5 font-semibold">Body Length</th>
                  <th className="py-2.5 font-semibold">Shoulder Drop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800 font-medium">
                {measurements.map((row) => (
                  <tr key={row.size} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-2.5 font-bold text-black font-display">{row.size}</td>
                    <td className="py-2.5 font-mono text-[11px]">{unit === 'cm' ? `${row.chestCm} cm` : `${row.chestIn} in`}</td>
                    <td className="py-2.5 font-mono text-[11px]">{unit === 'cm' ? `${row.lengthCm} cm` : `${row.lengthIn} in`}</td>
                    <td className="py-2.5 font-mono text-[11px]">{unit === 'cm' ? `${row.shoulderCm} cm` : `${row.shoulderIn} in`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure */}
          <div className="mt-6 pt-4 border-t border-neutral-100 bg-neutral-50/70 p-3.5 sm:p-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-1.5 font-display">
              Measuring Tips &amp; Drape Note
            </h4>
            <p className="text-[11px] text-neutral-600 leading-relaxed font-light">
              <strong>Chest:</strong> Measure around the fullest part of your chest, keeping tape level.<br />
              <strong>Length:</strong> Measure from the highest point of the shoulder seam straight down to hem.<br />
              For our relaxed, dropped-shoulder cuts, order your true size for the intended drape, or size down for a slimmer silhouette.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
