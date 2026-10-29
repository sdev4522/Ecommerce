'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Check, Zap } from 'lucide-react';
import { Product } from '../../lib/types';
import { useCurrency } from '../providers/CurrencyProvider';
import { motion, AnimatePresence } from 'motion/react';

interface StickyAddToCartBarProps {
  product: Product;
  selectedSize: string;
  selectedColorName?: string;
  activeImage: string;
  activePrice?: number;
  isOutOfStock?: boolean;
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
  activePrice,
  isOutOfStock,
  onAddToCart,
  onBuyNow,
  isAdded,
  targetRef,
}: StickyAddToCartBarProps) {
  const { formatPrice } = useCurrency();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      // Only show when the main CTA has scrolled completely above the viewport
      setIsVisible(rect.bottom < 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Quick purchase bar"
          className="fixed bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px))] lg:bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] py-2 sm:py-2.5 px-3 sm:px-6 lg:px-10"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2.5 sm:gap-4">
            {/* Left: Product preview */}
            <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0">
              <div className="relative w-10 h-12 sm:w-11 sm:h-14 bg-neutral-100 shrink-0 overflow-hidden border border-neutral-200 shadow-2xs">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                />
              </div>

              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-neutral-950 truncate max-w-[120px] sm:max-w-xs font-display">
                  {product.name}
                </h4>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] text-neutral-500 font-display">
                  <span className="font-bold text-neutral-950">
                    {formatPrice(activePrice ?? product.price)}
                  </span>
                  <span className="text-neutral-300">&bull;</span>
                  <span className="bg-neutral-100 px-1.5 py-0.5 text-[10px] uppercase font-semibold text-neutral-800">
                    {selectedSize}
                  </span>
                  {selectedColorName && (
                    <span className="hidden sm:inline text-neutral-400">
                      &bull; {selectedColorName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Actions (Dominant Add to Bag + Secondary Buy Now) */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Secondary CTA: Buy Now (hidden on ultra-small screens < 360px if needed, or compact) */}
              {!isOutOfStock && onBuyNow && (
                <button
                  type="button"
                  onClick={onBuyNow}
                  className="hidden sm:inline-flex bg-white hover:bg-neutral-50 active:scale-[0.98] border border-neutral-950 text-neutral-950 text-[11px] sm:text-xs uppercase tracking-wider font-semibold px-3.5 sm:px-4 py-2.5 transition-all cursor-pointer font-display items-center gap-1.5"
                >
                  <Zap size={13} className="text-neutral-950" />
                  <span>Buy Now</span>
                </button>
              )}

              {/* Dominant Primary CTA: Add to Bag */}
              <button
                type="button"
                onClick={onAddToCart}
                disabled={isOutOfStock}
                className="bg-neutral-950 hover:bg-black text-white text-[11px] sm:text-xs uppercase tracking-widest font-semibold px-4 sm:px-6 py-2.5 transition-all cursor-pointer flex items-center justify-center gap-1.5 font-display shadow-xs active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed min-h-[42px]"
                aria-label="Add to shopping bag"
              >
                {isOutOfStock ? (
                  <span>Out of Stock</span>
                ) : isAdded ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    <span className="whitespace-nowrap">Add to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
