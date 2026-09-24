'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../lib/types';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
  badgeText?: string;
}

const DEFAULT_FALLBACK_COLORS: Array<{
  name: string;
  hex: string;
  image?: string;
}> = [
    { name: 'Onyx Black', hex: '#1A1A1A' },
    { name: 'Royal Cobalt', hex: '#1E40AF' },
    { name: 'Warm Terracotta', hex: '#EA580C' },
    { name: 'Sand Ecru', hex: '#E6DECE' },
  ];

export default function ProductCard({
  product,
  className = '',
  badgeText,
}: ProductCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isFavorite = isInWishlist(product.id);

  // Available colors or curated neutral palette fallback to match minimal aesthetic
  const productColors =
    product.colors && product.colors.length > 0
      ? product.colors
      : DEFAULT_FALLBACK_COLORS.slice(0, 2 + (product.id % 3));

  const currentColor = productColors[selectedColorIndex];
  const activeImage = currentColor?.image || product.image_url;
  const hoverImage =
    product.hover_image_url || product.images?.[1] || activeImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedSize = product.sizes?.[0] || 'Standard';
    addItem(product, selectedSize, currentColor?.name, currentColor?.hex, 1);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);

    toast.success(
      <div className="flex items-center justify-between gap-3 w-full">
        <div>
          <p className="text-xs font-semibold text-neutral-900">{product.name}</p>
          <p className="text-[11px] text-neutral-500">
            Added {selectedSize} {currentColor ? `• ${currentColor.name}` : ''}
          </p>
        </div>
      </div>,
      {
        description: 'Added to your bag.',
        action: {
          label: 'View Bag',
          onClick: () => openCart(),
        },
      }
    );
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);

    if (!isFavorite) {
      toast.success(`Saved "${product.name}" to your wishlist.`);
    } else {
      toast.info(`Removed from wishlist.`);
    }
  };

  const displayBadge = badgeText || product.badge || null;

  const categoryName =
    product.category?.name?.toUpperCase() || product.brand?.name?.toUpperCase() || "LUNE";

  return (
    <div
      className={`group relative flex flex-col bg-[#fbfaf8] border border-neutral-200/60 rounded-[4px] overflow-hidden transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_10px_28px_-6px_rgba(45,33,29,0.07)] ${className}`}
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#f6f5f3] overflow-hidden">
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full relative"
        >
          {activeImage ? (
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-102"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              <ShoppingBag size={28} strokeWidth={1.5} />
            </div>
          )}

          {/* Secondary Image Crossfade on Hover */}
          {hoverImage && hoverImage !== activeImage && (
            <Image
              src={hoverImage}
              alt={`${product.name} alternate`}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-102 pointer-events-none"
            />
          )}
        </Link>

        {/* Top-Left '● NEW' Badge */}
        {displayBadge && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none select-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-semibold tracking-wider text-neutral-900 uppercase shadow-2xs font-display">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
              <span>{displayBadge}</span>
            </span>
          </div>
        )}

        {/* Top-Right Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-xs text-neutral-700 hover:text-black active:scale-90 transition-all duration-150 cursor-pointer shadow-xs"
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            strokeWidth={1.75}
            className={`transition-colors ${isFavorite
              ? 'fill-red-600 text-red-600'
              : 'text-neutral-700 hover:text-black'
              }`}
          />
        </button>
      </div>

      {/* 2. Product Details Bottom Area */}
      <div className="p-4 pt-2 flex flex-col justify-between flex-1">
        <div>
          {/* Category Tag */}
          <span className="block text-[10.5px] font-bold uppercase tracking-wider text-neutral-800 line-clamp-1">
            {categoryName}
          </span>

          {/* Title */}
          <h3 className="mt-0.5">
            <Link
              href={`/product/${product.slug}`}
              className="text-[13.5px] font-semibold text-neutral-900 hover:text-neutral-600 tracking-tight line-clamp-1 transition-colors"
            >
              {product.name}
            </Link>
          </h3>
        </div>

        {/* 3. Bottom Row: Pricing + Quick Add Button */}
        <div className="mt-3.5 pt-1 flex items-center justify-between">
          {/* Pricing */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-bold text-neutral-950 font-sans">
              {product.price_formatted}
            </span>

            {product.original_price &&
              product.original_price > product.price && (
                <span className="text-xs text-neutral-400 line-through font-sans">
                  {product.original_price_formatted}
                </span>
              )}
          </div>

          {/* Quick-Add Shopping Bag Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`h-8 rounded-lg flex items-center justify-center gap-1.5
          overflow-hidden transition-all duration-200 ease-out
          cursor-pointer shadow-2xs active:scale-90
          ${isAdded
                ? 'w-8 bg-emerald-100 text-emerald-700'
                : 'w-8 group-hover:w-[105px] bg-[#e5e5e7] group-hover:bg-[#d8d8da] text-neutral-800'
              }
        `}
            title="Add to bag"
            aria-label="Add to bag"
          >
            {isAdded ? (
              <Check
                size={14}
                className="stroke-[2.5] shrink-0"
              />
            ) : (
              <>
                <ShoppingBag
                  size={15}
                  strokeWidth={1.75}
                  className="shrink-0"
                />

                <span
                  className="
                max-w-0 opacity-0 whitespace-nowrap overflow-hidden
                transition-all duration-200 ease-out
                group-hover:max-w-[70px]
                group-hover:opacity-100
              "
                >
                  Add to bag
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
