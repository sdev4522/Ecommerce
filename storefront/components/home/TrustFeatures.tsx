'use client';

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Banknote } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export default function TrustFeatures() {
  const features = [
    {
      icon: Truck,
      title: 'Free Express Delivery',
      desc: 'Complimentary courier shipping on all orders over ₹1,999. Dispatched within 24 hours.',
    },
    {
      icon: RotateCcw,
      title: '7-Day Easy Exchange',
      desc: 'Hassle-free size and style exchange with complimentary doorstep pickup.',
    },
    {
      icon: Banknote,
      title: 'Cash on Delivery Available',
      desc: 'Pay at your doorstep with physical cash or instant UPI scan. Zero extra fee.',
    },
    {
      icon: ShieldCheck,
      title: '100% Verified Authentic',
      desc: 'Direct manufacturer sourcing, premium certified materials, and full warranty.',
    },
  ];

  return (
    <section className="bg-black text-white border-y border-neutral-800 py-12 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="border-neutral-800 bg-neutral-950/70 p-5 hover:border-neutral-700 transition-all text-white flex items-start gap-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white">
                  <Icon size={18} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-white font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
