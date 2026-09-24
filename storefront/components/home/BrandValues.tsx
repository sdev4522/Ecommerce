import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';

export default function BrandValues() {
  const values = [
    {
      icon: ShieldCheck,
      title: '100% Authentic Products',
      description: 'Every item is certified authentic and inspected for the highest quality standards.',
    },
    {
      icon: Truck,
      title: 'Fast & Secure Delivery',
      description: 'Dispatched within 24 hours with end-to-end live tracking right to your doorstep.',
    },
    {
      icon: RotateCcw,
      title: 'Hassle-Free 7-Day Returns',
      description: 'Quick doorstep pickup for size exchanges or refunds with zero questions asked.',
    },
    {
      icon: CreditCard,
      title: 'Secure & Flexible Payments',
      description: 'Pay via UPI, Credit/Debit cards, Net Banking, or choose Cash on Delivery.',
    },
  ];

  return (
    <section className="border-y border-neutral-200/80 bg-[#ffffff] py-12 sm:py-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.title} className="flex flex-col items-start space-y-3">
                <div className="w-11 h-11 rounded-lg bg-white shadow-xs border border-neutral-200 flex items-center justify-center text-neutral-900">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900 font-display">
                  {val.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
