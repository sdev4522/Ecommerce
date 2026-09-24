'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import ProductCard from '../../components/product/ProductCard';

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-20 text-center">
        <span className="text-xs text-neutral-400">Loading wishlist...</span>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">
          Your Wishlist
        </span>
        <h1 className="text-3xl font-display text-neutral-900 font-medium">
          Saved Pieces ({items.length})
        </h1>
        <p className="text-xs text-neutral-500 mt-2">
          Keep track of pieces you love to revisit or purchase anytime.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-4 bg-neutral-50 p-8 border border-neutral-100 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-white shadow-xs mx-auto flex items-center justify-center text-neutral-400">
            <Heart size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-display text-neutral-900">Your wishlist is empty</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Click the heart icon on any piece to save your favorite items for later.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest bg-black text-white px-6 py-3 font-semibold hover:bg-neutral-800 transition-colors"
            >
              <span>Shop Collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
