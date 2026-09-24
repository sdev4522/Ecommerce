'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Check, Zap } from 'lucide-react';
import { Product } from '../../lib/types';
import { motion, AnimatePresence } from 'motion/react';

interface StickyAddToCartBarProps {
  product: Product;
  selectedSize: string;
  selectedColorName?: string;
  activeImage: string;
  onAddToCart: () => void;
  onBuyNow?: () => void;
  isAdded: boolean;
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function StickyAddToCartBar({
  product,
  selectedSize,
  selectedColorName,
  activeImage,
  onAddToCart,
  onBuyNow,
  isAdded,
  targetRef,
}: StickyAddToCartBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      setIsVisible(rect.bottom < 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Quick purchase bar"
          className="fixed bottom-14 lg:bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] py-2.5 px-4 sm:px-6 lg:px-10"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3 sm:gap-4">
            {/* Left: Product preview */}
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative w-10 h-13 sm:w-11 sm:h-14 bg-neutral-100 shrink-0 overflow-hidden border border-neutral-200">
                <Image src={activeImage} alt={product.name} fill sizes="48px" className="object-cover object-top" />
              </div>

              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-neutral-950 truncate max-w-[130px] sm:max-w-xs font-display">
                  {product.name}
                </h4>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] text-neutral-500">
                  <span className="font-semibold text-neutral-900 font-display">{product.price_formatted}</span>
                  <span>&bull;</span>
                  <span className="bg-neutral-100 px-1.5 py-0.2 text-[10px] uppercase font-medium text-neutral-700">
                    {selectedSize}
                  </span>
                  {selectedColorName && <span className="hidden sm:inline text-neutral-400">&bull; {selectedColorName}</span>}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={onAddToCart}
                className="bg-white border border-neutral-950 text-neutral-950 text-xs uppercase tracking-wider font-semibold px-3.5 sm:px-5 py-2.5 hover:bg-neutral-50 active:scale-98 transition-all cursor-pointer flex items-center gap-1.5 font-display"
                aria-label="Add to shopping bag"
              >
                {isAdded ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={13} />
                    <span className="hidden sm:inline">Add to Bag</span>
                    <span className="sm:hidden">Bag</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onBuyNow || onAddToCart}
                className="bg-neutral-950 text-white text-xs uppercase tracking-widest font-semibold px-4 sm:px-6 py-2.5 sm:py-2.5 hover:bg-black active:scale-98 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer font-display"
              >
                <Zap size={13} className="text-white fill-white hidden xs:inline" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
