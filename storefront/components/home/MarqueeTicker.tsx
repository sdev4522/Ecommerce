'use client';

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Sparkles } from 'lucide-react';

export default function MarqueeTicker() {
  const items = [
    { text: 'FREE EXPRESS SHIPPING ON ORDERS OVER ₹1,999', icon: Truck },
    { text: '100% AUTHENTIC GUARANTEED PRODUCTS', icon: ShieldCheck },
    { text: 'EASY 7-DAY DOORSTEP RETURNS & REPLACEMENTS', icon: RotateCcw },
    { text: 'CASH ON DELIVERY & INSTANT UPI PAYMENT AVAILABLE', icon: CreditCard },
    { text: 'NEW ARRIVALS & EXCLUSIVE SEASONAL DEALS', icon: Sparkles },
    { text: 'ROUND-THE-CLOCK CUSTOMER CARE SUPPORT', icon: ShieldCheck },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-neutral-950 text-white py-3 border-y border-neutral-800 select-none">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* First repetition */}
        <div className="flex items-center space-x-8 text-[11px] font-semibold tracking-[0.2em] uppercase pr-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={`first-${idx}`}>
                <span className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors cursor-default">
                  <Icon size={12} className="text-white shrink-0" />
                  {item.text}
                </span>
                <span className="text-neutral-700 font-display text-xs">•</span>
              </React.Fragment>
            );
          })}
        </div>

        {/* Second repetition for seamless loop */}
        <div className="flex items-center space-x-8 text-[11px] font-semibold tracking-[0.2em] uppercase pr-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={`second-${idx}`}>
                <span className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors cursor-default">
                  <Icon size={12} className="text-white shrink-0" />
                  {item.text}
                </span>
                <span className="text-neutral-700 font-display text-xs">•</span>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
