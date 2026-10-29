'use client';

import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle2, RotateCcw, MapPin, Banknote, ShieldCheck } from 'lucide-react';
import { useCurrency } from '../providers/CurrencyProvider';

export default function DeliveryPincodeChecker() {
  const { formatPrice } = useCurrency();
  const [pincode, setPincode] = useState('');
  const [checkedPincode, setCheckedPincode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [estimatedDate, setEstimatedDate] = useState<string>('');

  const calculateDeliveryDate = () => {
    const delivery = new Date();
    // 3 business days delivery estimation
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
    <div className="border border-neutral-200/80 bg-neutral-50/60 p-3.5 sm:p-4 space-y-3 font-sans">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-widest text-neutral-500 font-semibold text-[10.5px] font-display flex items-center gap-1.5">
          <MapPin size={13} className="text-neutral-700 shrink-0" />
          Delivery &amp; COD Availability
        </span>
        {checkedPincode && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[10.5px] uppercase tracking-wider font-semibold text-neutral-600 hover:text-black underline underline-offset-2 cursor-pointer font-display transition-colors"
          >
            Change PIN
          </button>
        )}
      </div>

      {!checkedPincode ? (
        <form onSubmit={handleCheck} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value.replace(/\D/g, ''));
                if (error) setError(null);
              }}
              placeholder="Enter 6-digit delivery PIN (e.g. 110001)"
              className="flex-1 bg-white border border-neutral-300 text-xs px-3.5 py-2.5 outline-none focus:border-neutral-950 font-mono transition-colors"
            />
            <button
              type="submit"
              className="bg-neutral-950 text-white text-[11px] uppercase tracking-wider font-semibold px-4 py-2.5 hover:bg-black transition-colors cursor-pointer font-display shrink-0"
            >
              Check
            </button>
          </div>
          {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
        </form>
      ) : (
        <div className="space-y-2.5 pt-0.5">
          <div className="flex items-start gap-2.5 text-xs text-neutral-800">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-neutral-900 font-display">
                Delivering to PIN Code {checkedPincode}
              </p>
              <p className="text-[11px] text-neutral-600 font-light">
                Estimated arrival by <strong className="text-neutral-950 font-medium">{estimatedDate || '3 Business Days'}</strong> (Dispatches within 24 hours).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-neutral-200/60 text-[11px]">
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

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[10.5px] text-neutral-400 border-t border-neutral-200/50">
        <span className="flex items-center gap-1 text-neutral-600">
          <Truck size={12} className="text-neutral-700 shrink-0" /> Free Shipping over {formatPrice(1999)}
        </span>
        <span className="hidden sm:inline">&bull;</span>
        <span className="flex items-center gap-1 text-neutral-600">
          <ShieldCheck size={12} className="text-neutral-700 shrink-0" /> 100% Genuine Atelier Guarantee
        </span>
      </div>
    </div>
  );
}
