'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../lib/types';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCurrency } from '../providers/CurrencyProvider';
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
  const { formatPrice } = useCurrency();
  const [selectedColorIndex] = useState(0);
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

  const isOutOfStock =
    product.is_out_of_stock ||
    (typeof product.quantity === 'number' && product.quantity <= 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

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

  const displayBadge = isOutOfStock
    ? 'SOLD OUT'
    : badgeText || product.badge || null;

  const categoryName =
    product.brand?.name?.toUpperCase() ||
    product.category?.name?.toUpperCase() ||
    'LUNE';

  const discountPercent =
    product.original_price && product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100
        )
      : 0;

  return (
    <div
      className={`@container group relative flex flex-col bg-[#fbfaf8] border border-neutral-200/70 rounded-[4px] overflow-hidden transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_8px_24px_-6px_rgba(45,33,29,0.08)] ${className}`}
    >
      {/* 1. Image Container with Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full bg-[#f6f5f3] overflow-hidden">
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full relative"
          aria-label={`View details for ${product.name}`}
        >
          {activeImage ? (
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              <ShoppingBag size={28} strokeWidth={1.5} />
            </div>
          )}

          {/* Secondary Image Crossfade on Hover (Desktop) */}
          {hoverImage && hoverImage !== activeImage && (
            <Image
              src={hoverImage}
              alt={`${product.name} alternate`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103 pointer-events-none"
            />
          )}
        </Link>

        {/* Top-Left Badge (Bounded so it never collides with wishlist button) */}
        {displayBadge && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 pointer-events-none select-none max-w-[calc(100%-44px)]">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase shadow-2xs font-display backdrop-blur-xs truncate ${
                isOutOfStock
                  ? 'bg-neutral-900/90 text-white'
                  : 'bg-white/95 text-neutral-900'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  isOutOfStock ? 'bg-rose-500' : 'bg-neutral-950'
                }`}
              />
              <span className="truncate">{displayBadge}</span>
            </span>
          </div>
        )}

        {/* Top-Right Wishlist Heart Button with Accessible Touch Target */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs text-neutral-700 hover:text-black active:scale-90 transition-all duration-150 cursor-pointer shadow-xs flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={15}
            strokeWidth={1.75}
            className={`transition-colors ${
              isFavorite
                ? 'fill-red-600 text-red-600'
                : 'text-neutral-700 hover:text-black'
            }`}
          />
        </button>
      </div>

      {/* 2. Product Details Bottom Area */}
      <div className="p-2.5 sm:p-3.5 flex flex-col justify-between flex-1 gap-2">
        <div>
          {/* Category / Brand Tag */}
          <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 font-display truncate">
            {categoryName}
          </span>

          {/* Product Title (2-line clamp with min-height keeps cards consistent) */}
          <h3 className="mt-0.5 min-h-[2.4em] line-clamp-2 leading-snug">
            <Link
              href={`/product/${product.slug}`}
              className="text-xs sm:text-[13.5px] font-medium text-neutral-900 hover:text-neutral-600 tracking-tight transition-colors line-clamp-2"
              title={product.name}
            >
              {product.name}
            </Link>
          </h3>
        </div>

        {/* 3. Bottom Row: Responsive Action Layout (Never clipped!) */}
        <div className="product-card-action-row mt-auto pt-1">
          {/* Pricing with Dynamic Currency */}
          <div className="flex items-baseline gap-1.5 flex-wrap min-w-0">
            <span className="text-xs sm:text-sm font-bold text-neutral-950 font-sans tracking-tight">
              {formatPrice(product.price)}
            </span>

            {product.original_price &&
              product.original_price > product.price && (
                <span className="text-[10.5px] sm:text-xs text-neutral-400 line-through font-sans">
                  {formatPrice(product.original_price)}
                </span>
              )}

            {discountPercent > 0 && (
              <span className="text-[9.5px] font-semibold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200/50 font-sans">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Purchase CTA */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`
              product-card-cta-expandable
              h-8.5 rounded-[4px] flex items-center justify-center gap-1.5
              transition-all duration-200 ease-out cursor-pointer shadow-2xs
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950
              disabled:opacity-50 disabled:cursor-not-allowed
              whitespace-nowrap overflow-hidden
              /* In narrow cards (< 230px): Full width, always visible text without hover requirement */
              w-full text-xs font-semibold uppercase tracking-normal font-display
              ${
                isAdded
                  ? 'bg-emerald-600 text-white active:scale-95'
                  : isOutOfStock
                  ? 'bg-neutral-200 text-neutral-500'
                  : 'bg-neutral-950 text-white hover:bg-neutral-800 active:scale-95'
              }
              /* In wide cards (>= 230px): Desktop responsive reveal on group hover */
              @[230px]:w-8 @[230px]:h-8 @[230px]:rounded-lg
              @[230px]:p-0
              ${
                !isAdded && !isOutOfStock
                  ? '@[230px]:bg-[#e5e5e7] @[230px]:text-neutral-800 @[230px]:group-hover:bg-neutral-950 @[230px]:group-hover:text-white @[230px]:group-hover:w-[140px] @[230px]:group-hover:min-w-max @[230px]:group-hover:px-2.5'
                  : ''
              }
              ${
                isAdded
                  ? '@[230px]:w-8 @[230px]:bg-emerald-600 @[230px]:text-white'
                  : ''
              }
            `}
            title={isOutOfStock ? 'Out of stock' : 'Add to bag'}
            aria-label={isOutOfStock ? 'Out of stock' : 'Add to bag'}
          >
            {isAdded ? (
              <>
                <Check size={14} className="stroke-[2.5] shrink-0" />
                <span className="@[230px]:hidden text-[11px] font-medium">
                  Added
                </span>
              </>
            ) : isOutOfStock ? (
              <span className="text-[11px] font-medium">Out of Stock</span>
            ) : (
              <>
                <ShoppingBag size={14} strokeWidth={1.8} className="shrink-0" />
                <span
                  className="
                    product-card-cta-label
                    whitespace-nowrap overflow-hidden transition-all duration-200 ease-out
                    text-[11px] font-medium
                    @[230px]:max-w-0 @[230px]:opacity-0
                    @[230px]:group-hover:max-w-[105px] @[230px]:group-hover:opacity-100
                  "
                >
                  Add to Bag
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
