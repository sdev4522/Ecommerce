'use client';

import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle2, RotateCcw, MapPin, Banknote, ShieldCheck } from 'lucide-react';

export default function DeliveryPincodeChecker() {
  const [pincode, setPincode] = useState('');
  const [checkedPincode, setCheckedPincode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [estimatedDate, setEstimatedDate] = useState<string>('');

  const calculateDeliveryDate = () => {
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 3);
    const formatted = delivery.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    setEstimatedDate(formatted);
  };

  useEffect(() => {
    const saved = localStorage.getItem('maison_delivery_pincode');
    if (saved) {
      setCheckedPincode(saved);
      calculateDeliveryDate();
    }
  }, []);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setError('Please enter a valid 6-digit postal pincode.');
      return;
    }
    setError(null);
    setCheckedPincode(clean);
    localStorage.setItem('maison_delivery_pincode', clean);
    calculateDeliveryDate();
  };

  const handleReset = () => {
    setCheckedPincode(null);
    setPincode('');
    localStorage.removeItem('maison_delivery_pincode');
  };

  return (
    <div className="border border-neutral-200/90 bg-neutral-50/60 p-4 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-widest text-neutral-500 font-semibold text-[10px] flex items-center gap-1.5">
          <MapPin size={13} className="text-neutral-700" />
          Delivery & COD Availability
        </span>
        {checkedPincode && (
          <button
            onClick={handleReset}
            className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 hover:text-black underline underline-offset-2"
          >
            Change PIN Code
          </button>
        )}
      </div>

      {!checkedPincode ? (
        <form onSubmit={handleCheck} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value.replace(/\D/g, ''));
                if (error) setError(null);
              }}
              placeholder="Enter 6-digit PIN code (e.g. 110001)"
              className="flex-1 bg-white border border-neutral-300 text-xs px-3.5 py-2.5 outline-none focus:border-neutral-950 font-mono"
            />
            <button
              type="submit"
              className="bg-neutral-950 text-white text-[11px] uppercase tracking-wider font-semibold px-4 py-2.5 hover:bg-black transition-colors"
            >
              Check
            </button>
          </div>
          {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
        </form>
      ) : (
        <div className="space-y-2.5 pt-1">
          <div className="flex items-start gap-2.5 text-xs text-neutral-800">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-neutral-900">
                Delivering to PIN Code {checkedPincode}
              </p>
              <p className="text-[11px] text-neutral-500">
                Expected delivery by <strong className="text-neutral-900">{estimatedDate || '2-3 Business Days'}</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-200/60 text-[11px]">
            <div className="flex items-center gap-1.5 text-neutral-700">
              <Banknote size={13} className="text-emerald-600 shrink-0" />
              <span><strong>Cash on Delivery</strong> Available</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-700">
              <RotateCcw size={13} className="text-neutral-900 shrink-0" />
              <span><strong>7-Day</strong> Doorstep Returns</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 pt-2 text-[10px] text-neutral-400 border-t border-neutral-200/50">
        <span className="flex items-center gap-1">
          <Truck size={12} className="text-neutral-600" /> Free Shipping over ₹1,999
        </span>
        <span>&bull;</span>
        <span className="flex items-center gap-1">
          <ShieldCheck size={12} className="text-neutral-600" /> Tracked Delivery
        </span>
      </div>
    </div>
  );
}
