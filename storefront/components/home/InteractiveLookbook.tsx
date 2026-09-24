'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, Sparkles, X } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { toast } from 'sonner';
import { MOCK_PRODUCTS } from '../../lib/mock-data';

interface Hotspot {
  id: string;
  top: string;
  left: string;
  productId: number;
  label: string;
}

interface Look {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  hotspots: Hotspot[];
}

const LOOKS: Look[] = [
  {
    id: 'look-1',
    title: 'THE EVERYDAY EDIT',
    subtitle: 'Look 01 — Relaxed Tailoring & Fluid Layering',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85',
    hotspots: [
      {
        id: 'hs-1',
        top: '32%',
        left: '46%',
        productId: 104, // Trench
        label: 'Classic Trench',
      },
      {
        id: 'hs-2',
        top: '46%',
        left: '52%',
        productId: 101, // Boxy Tee
        label: 'Relaxed Tee',
      },
      {
        id: 'hs-3',
        top: '74%',
        left: '49%',
        productId: 103, // Trousers
        label: 'Fluid Trousers',
      },
    ],
  },
  {
    id: 'look-2',
    title: 'THE WEEKEND CAPSULE',
    subtitle: 'Look 02 — Soft Layering & Easy Denim',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1600&q=85',
    hotspots: [
      {
        id: 'hs-4',
        top: '40%',
        left: '48%',
        productId: 102, // French Terry Hoodie
        label: 'Soft Knit Hoodie',
      },
      {
        id: 'hs-5',
        top: '76%',
        left: '52%',
        productId: 106, // Denim / Trousers
        label: 'Classic Denim',
      },
    ],
  },
];

export default function InteractiveLookbook() {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const { addItem, openCart } = useCartStore();

  const currentLook = LOOKS[activeLookIndex];

  const handleQuickAdd = (productId: number) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    addItem(product, product.sizes?.[0] || 'M', product.colors?.[0]?.name, product.colors?.[0]?.hex, 1);

    toast.success(
      <div className="flex items-center justify-between gap-3 w-full">
        <div>
          <p className="text-xs font-semibold text-neutral-900">{product.name}</p>
          <p className="text-[11px] text-neutral-500">Added to your bag from Lookbook</p>
        </div>
      </div>,
      {
        description: 'Selected from styling editorial.',
        action: {
          label: 'View Bag',
          onClick: () => openCart(),
        },
      }
    );
  };

  return (
    <section className="relative w-full bg-neutral-900 text-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title with Look Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={13} className="text-white" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/80 font-semibold">
                Shop the Look
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display text-white font-medium">
              Shop The Complete Look
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-md">
              Tap any hotspot pin to explore individual pieces and add them directly to your bag.
            </p>
          </div>

          {/* Look Switcher Pills */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {LOOKS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookIndex(idx);
                  setActiveHotspotId(null);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${activeLookIndex === idx
                    ? 'bg-white text-neutral-950 shadow-md'
                    : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'
                  }`}
              >
                Look 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Lookbook Canvas */}
        <div className="relative w-full h-[620px] sm:h-[720px] bg-neutral-950 overflow-hidden shadow-2xl">
          {/* Main Editorial Image */}
          <Image
            src={currentLook.image}
            alt={currentLook.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-[center_35%] transition-all duration-700"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Look Details Tag */}
          <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
            <span className="glass-dark text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 font-semibold text-white/90">
              {currentLook.subtitle}
            </span>
          </div>

          {/* Pulsating Radar Hotspots */}
          {currentLook.hotspots.map((hs) => {
            const product = MOCK_PRODUCTS.find((p) => p.id === hs.productId);
            if (!product) return null;

            const isActive = activeHotspotId === hs.id;

            return (
              <div
                key={hs.id}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ top: hs.top, left: hs.left }}
              >
                {/* Radar Hotspot Pin */}
                <button
                  onClick={() => setActiveHotspotId(isActive ? null : hs.id)}
                  className="relative group/pin flex items-center justify-center cursor-pointer"
                  aria-label={`View ${product.name}`}
                >
                  <span className="radar-pin w-9 h-9 rounded-full bg-white/40 flex items-center justify-center backdrop-blur-xs transition-transform duration-200 group-hover/pin:scale-110">
                    <span className="w-3.5 h-3.5 rounded-full bg-white shadow-md border border-neutral-900" />
                  </span>

                  {/* Micro label pill */}
                  <span className="absolute left-10 glass-dark text-[10px] uppercase tracking-wider font-semibold text-white px-2 py-0.5 whitespace-nowrap shadow-md opacity-90 group-hover/pin:opacity-100 hidden sm:inline-block">
                    {hs.label}
                  </span>
                </button>

                {/* Floating Product Popover Card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-12 sm:bottom-auto sm:top-10 sm:left-6 sm:translate-x-0 w-72 bg-white text-neutral-900 shadow-2xl p-4 z-30 border border-neutral-200/80"
                    >
                      {/* Close popover */}
                      <button
                        onClick={() => setActiveHotspotId(null)}
                        className="absolute top-2.5 right-2.5 text-neutral-400 hover:text-black p-1"
                      >
                        <X size={15} />
                      </button>

                      <div className="flex gap-3">
                        <div className="relative w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden">
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                              {product.category?.name}
                            </span>
                            <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1 mt-0.5">
                              {product.name}
                            </h4>
                            <div className="mt-1 flex items-center space-x-1.5">
                              <span className="text-xs font-display font-bold text-neutral-950">
                                {product.price_formatted}
                              </span>
                              {product.original_price && (
                                <span className="text-[10px] text-neutral-400 line-through">
                                  {product.original_price_formatted}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 flex items-center gap-2">
                            <button
                              onClick={() => handleQuickAdd(product.id)}
                              className="flex-1 bg-neutral-950 text-white text-[10px] uppercase tracking-widest font-semibold py-2 px-3 flex items-center justify-center gap-1.5 hover:bg-black transition-colors"
                            >
                              <ShoppingBag size={11} />
                              <span>Add to Bag</span>
                            </button>
                            <Link
                              href={`/product/${product.slug}`}
                              className="p-2 border border-neutral-200 text-neutral-700 hover:text-black hover:border-black transition-colors"
                              title="View details"
                            >
                              <ArrowRight size={13} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
