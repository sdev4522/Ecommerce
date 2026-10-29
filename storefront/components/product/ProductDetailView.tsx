'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  Heart,
  Star,
  Ruler,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  Share2,
  CreditCard,
  Zap,
  MessageCircle,
  Sparkles,
  Banknote,
  ShieldCheck,
} from 'lucide-react';
import { Product } from '../../lib/types';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCurrency } from '../providers/CurrencyProvider';
import { findMatchingVariation, resolveInitialAttributes, checkAttributeAvailability } from '../../lib/variations';
import SizeGuideModal from './SizeGuideModal';
import ProductCard from './ProductCard';
import ProductReviews from './ProductReviews';
import DeliveryPincodeChecker from './DeliveryPincodeChecker';
import StickyAddToCartBar from './StickyAddToCartBar';
import InstantCheckoutModal from '../checkout/InstantCheckoutModal';
import ProductGallery from './ProductGallery';
import ProductHtmlContent from './ProductHtmlContent';
import ProductVariationChips from './ProductVariationChips';
import { toast } from 'sonner';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const { formatPrice } = useCurrency();

  // Page-scoped variation attributes state - Zero API requests on attribute change
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>(() =>
    resolveInitialAttributes(product)
  );

  const [selectedColorIndex, setSelectedColorIndex] = useState(() => {
    const init = resolveInitialAttributes(product);
    if (product.colors && product.colors.length > 0 && init.color) {
      const idx = product.colors.findIndex(
        (c) => c.name.toLowerCase() === init.color.toLowerCase()
      );
      return idx !== -1 ? idx : 0;
    }
    return 0;
  });

  const [selectedSize, setSelectedSize] = useState<string>(() => {
    const init = resolveInitialAttributes(product);
    if (init.size) return init.size;
    return product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'One Size';
  });

  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);
  const [isBuyNowProcessing, setIsBuyNowProcessing] = useState(false);

  const mainCtaRef = useRef<HTMLDivElement>(null);

  const {
    addItem,
    openCart,
    isQuickBuyOpen,
    closeQuickBuy,
  } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isFavorite = isInWishlist(product.id);

  // Instant local variation matching (O(1) composite key lookup via in-memory Map)
  const activeVariation = useMemo(
    () => findMatchingVariation(product.variations, selectedAttributes),
    [product.variations, selectedAttributes]
  );

  const activePrice = activeVariation?.price ?? product.price;
  const activeOriginalPrice = activeVariation?.original_price ?? product.original_price;
  const activeStock = activeVariation ? activeVariation.quantity : product.quantity;
  const activeIsOutOfStock = activeVariation ? activeVariation.is_out_of_stock : product.is_out_of_stock;
  const activeSku = activeVariation?.sku || product.sku;

  const currentColor = product.colors && product.colors[selectedColorIndex];
  const images = product.images && product.images.length > 0 ? product.images : [product.image_url];
  const activeImage =
    (activeVariation?.image_url && activeVariation.image_url !== product.image_url)
      ? activeVariation.image_url
      : currentColor?.image || images[0] || product.image_url;

  const handleColorChange = (idx: number, colorName: string) => {
    setSelectedColorIndex(idx);
    setSelectedAttributes((prev) => ({
      ...prev,
      color: colorName,
    }));
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setSelectedAttributes((prev) => ({
      ...prev,
      size,
    }));
  };

  const handleAttributeChange = (attrKey: string, attrVal: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attrKey]: attrVal,
    }));
  };

  // Additional dynamic attribute sets beyond color and size (e.g. Material, Style, Finish)
  const otherAttributeSets = useMemo(() => {
    if (!product.attribute_sets || !Array.isArray(product.attribute_sets)) return [];
    return product.attribute_sets.filter((set) => {
      const slug = (set.slug || '').toLowerCase();
      const title = (set.title || '').toLowerCase();
      const isColor = slug === 'color' || title === 'color';
      const isSize = slug === 'size' || title === 'size';
      if (isColor && product.colors && product.colors.length > 0) return false;
      if (isSize && product.sizes && product.sizes.length > 0) return false;
      return true;
    });
  }, [product.attribute_sets, product.colors, product.sizes]);

  const handleAddToCart = () => {
    // 1. Stock & inventory validation
    if (activeIsOutOfStock || (typeof activeStock === 'number' && activeStock <= 0)) {
      toast.error('This variation is currently out of stock.');
      return;
    }

    // 2. Quantity validation
    if (!quantity || quantity <= 0) {
      toast.error('Please select at least 1 item.');
      return;
    }

    // 3. Mutually exclusive state transition:
    // Ensure Quick Buy modal is closed, add item to cart with authoritative variation ID, and open Cart Drawer
    closeQuickBuy();
    addItem(
      product,
      selectedSize,
      currentColor?.name,
      currentColor?.hex,
      quantity,
      true,
      activeVariation?.id,
      activePrice,
      activeSku
    );

    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1400);

    toast.success(
      <div className="flex items-center justify-between gap-3 w-full">
        <div>
          <p className="text-xs font-semibold text-neutral-900">{product.name}</p>
          <p className="text-[11px] text-neutral-500">
            Size {selectedSize} {currentColor ? `• ${currentColor.name}` : ''} ({quantity}x)
          </p>
        </div>
      </div>,
      {
        description: 'Added to your shopping bag.',
        action: {
          label: 'View Bag',
          onClick: () => openCart(),
        },
      }
    );
  };

  const handleBuyNow = () => {
    // 1. Rapid click lock protection
    if (isBuyNowProcessing) return;

    // 2. Product validation
    if (!product || !product.id) {
      toast.error('Product details unavailable.');
      return;
    }

    // 3. Stock validation
    if (activeIsOutOfStock || (typeof activeStock === 'number' && activeStock <= 0)) {
      toast.error('This variation is currently out of stock.');
      return;
    }

    // 4. Quantity validation
    if (!quantity || quantity <= 0) {
      toast.error('Please select at least 1 item.');
      return;
    }

    // 5. Variation validation
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size before proceeding.');
      return;
    }

    setIsBuyNowProcessing(true);

    try {
      // Ensure Quick Buy popup is NOT triggered
      closeQuickBuy();

      // Add item to cart with authoritative variation details and trigger Cart Drawer
      addItem(
        product,
        selectedSize,
        currentColor?.name,
        currentColor?.hex,
        quantity,
        true,
        activeVariation?.id,
        activePrice,
        activeSku
      );
      openCart();

      setIsAddedAnimation(true);
      setTimeout(() => setIsAddedAnimation(false), 1400);

      toast.success(
        <div className="flex items-center justify-between gap-3 w-full">
          <div>
            <p className="text-xs font-semibold text-neutral-900">{product.name}</p>
            <p className="text-[11px] text-neutral-500">
              Size {selectedSize} {currentColor ? `• ${currentColor.name}` : ''} ({quantity}x)
            </p>
          </div>
        </div>,
        {
          description: 'Added to your shopping bag.',
          action: {
            label: 'View Bag',
            onClick: () => openCart(),
          },
        }
      );
    } finally {
      setTimeout(() => {
        setIsBuyNowProcessing(false);
      }, 500);
    }
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    if (!isFavorite) {
      toast.success(`Saved "${product.name}" to your wishlist.`);
    } else {
      toast.info(`Removed from wishlist.`);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard');
    }
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hi LUNE, I would like more details about "${product.name}" (Size: ${selectedSize}, SKU: ${activeSku}).`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  const hasSpecifications = product.specifications && product.specifications.length > 0;
  const hasMaterials = Boolean(product.materials || product.fabric);
  const hasSubstantialContent =
    Boolean(product.content) &&
    product.content !== product.description &&
    product.content!.trim().length > 30;

  const discountPercent =
    activeOriginalPrice && activeOriginalPrice > activePrice
      ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)
      : 0;

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-20 sm:pb-16 font-sans">

      {/* ------------------------------------------------------------- */}
      {/* BREADCRUMB & UTILITY NAVIGATION                              */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-widest text-neutral-400 mb-4 sm:mb-6 border-b border-neutral-100 pb-2.5">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap min-w-0 pr-1 py-0.5 font-display"
        >
          <Link href="/" className="hover:text-black transition-colors shrink-0">
            Home
          </Link>
          <span className="shrink-0 text-neutral-300">/</span>
          <Link href="/collections/all" className="hover:text-black transition-colors shrink-0">
            Collections
          </Link>
          {product.category && (
            <>
              <span className="shrink-0 text-neutral-300">/</span>
              <Link
                href={`/collections/${product.category.slug}`}
                className="hover:text-black transition-colors shrink-0 truncate max-w-[120px] sm:max-w-none"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span className="shrink-0 text-neutral-300">/</span>
          <span className="text-neutral-900 font-medium shrink-0 truncate max-w-[140px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1 text-neutral-500 hover:text-black transition-colors shrink-0 p-1 cursor-pointer font-display text-xs"
          title="Copy link to clipboard"
          aria-label="Share product"
        >
          <Share2 size={13} />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN PDP GRID: 7 COLS GALLERY + 5 COLS EDITORIAL INFO         */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
        {/* LEFT COLUMN: Editorial Product Image Gallery */}
        <div className="lg:col-span-7 flex justify-center">
          <ProductGallery
            images={images}
            productName={product.name}
            badge={product.badge}
            activeImage={activeImage}
          />
        </div>

        {/* RIGHT COLUMN: Elevated Luxury Purchasing & Specification Panel */}
        <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">

          {/* ----------------------------------------------------------- */}
          {/* 1. Header & Hierarchy: Eyebrow, Title, Rating, SKU, Price   */}
          {/* ----------------------------------------------------------- */}
          <div className="space-y-3 border-b border-neutral-200/70 pb-5">

            {/* Eyebrow Row: Brand/Atelier + Rating Anchor */}
            <div className="flex items-center justify-between text-xs gap-2">
              <span className="text-[10.5px] uppercase tracking-[0.2em] text-neutral-500 font-medium font-display truncate">
                {product.brand?.name || product.category?.name || 'LUNE ATELIER'}
              </span>

              {/* Review Appraisal Anchor */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('reviews-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center space-x-1.5 text-neutral-700 hover:text-black cursor-pointer group transition-colors shrink-0"
                title="View customer reviews"
              >
                <div className="flex items-center gap-0.5">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                </div>
                <span className="font-semibold text-xs text-neutral-900 font-display">
                  {product.reviews_avg || 4.8}
                </span>
                <span className="text-neutral-400 text-[11px] group-hover:underline">
                  ({product.reviews_count || 12})
                </span>
              </button>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-display text-neutral-950 font-medium tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* SKU & Stock Availability Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px]">
              <span className="text-neutral-400 font-mono text-[10.5px]">
                SKU: {activeSku}
              </span>

              <span className="text-neutral-300">&bull;</span>

              {activeIsOutOfStock ? (
                <span className="inline-flex items-center text-[10.5px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 border border-rose-200/80 uppercase tracking-wider">
                  Out of Stock
                </span>
              ) : typeof activeStock === 'number' && activeStock > 0 && activeStock <= 5 ? (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-200/80 uppercase tracking-wider">
                  <Sparkles size={11} className="text-amber-700 shrink-0" />
                  Only {activeStock} left
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  In Stock &bull; Dispatches in 24h
                </span>
              )}
            </div>

            {/* Price Presentation: Active Price, Compare-At Price, Discount Badge */}
            <div className="pt-1.5 flex flex-wrap items-baseline gap-2.5 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-display font-semibold text-neutral-950 tracking-tight">
                {formatPrice(activePrice)}
              </span>

              {activeOriginalPrice && activeOriginalPrice > activePrice && (
                <span className="text-sm sm:text-base text-neutral-400 line-through font-normal font-display">
                  {formatPrice(activeOriginalPrice)}
                </span>
              )}

              {discountPercent > 0 && (
                <span className="text-[11px] font-semibold text-white bg-neutral-950 px-2 py-0.5 uppercase tracking-wider font-display">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Taxes & Split Payment Subtext */}
            <div className="space-y-1 pt-1 text-[11px] text-neutral-500 font-light">
              <p className="text-neutral-400">
                MRP inclusive of all taxes. Free express shipping on orders over {formatPrice(1999)}.
              </p>

              <div className="flex items-center gap-1.5 text-neutral-600">
                <CreditCard size={13} className="text-neutral-400 shrink-0" />
                <span>
                  Or 3 interest-free installments of <strong>{formatPrice(Math.round(activePrice / 3))}</strong> with Cards &amp; UPI
                </span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* 2. Variation Controls: Color, Size & Custom Attributes      */}
          {/* ----------------------------------------------------------- */}
          <div className="space-y-5">
            {/* Color Shade Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-baseline justify-between text-xs">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold font-display">
                      Color:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-950 font-display">
                      {currentColor?.name || 'Selected'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap" role="radiogroup" aria-label="Product color choices">
                  {product.colors.map((c, idx) => {
                    const isSelected = selectedColorIndex === idx;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => handleColorChange(idx, c.name)}
                        className={`w-8 h-8 rounded-full border transition-all duration-150 cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 ${
                          isSelected
                            ? 'ring-2 ring-neutral-950 ring-offset-2 scale-105 border-neutral-950 shadow-xs'
                            : 'border-neutral-300 opacity-80 hover:opacity-100 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={`Select color ${c.name}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector with Responsive Content-Sized Chips */}
            {product.sizes && product.sizes.length > 0 && (
              <ProductVariationChips
                label="Size:"
                selectedValue={selectedSize}
                options={product.sizes}
                onSelect={handleSizeChange}
                checkAvailability={(sz) =>
                  checkAttributeAvailability(
                    product.variations,
                    selectedAttributes,
                    'size',
                    sz
                  )
                }
                headerRightAction={
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[11px] uppercase tracking-wider text-neutral-700 hover:text-black font-semibold flex items-center gap-1.5 underline underline-offset-2 cursor-pointer font-display transition-colors"
                  >
                    <Ruler size={12} className="shrink-0" />
                    <span>Size Guide</span>
                  </button>
                }
                subText={product.model_info}
              />
            )}

            {/* Dynamic Attribute Sets (e.g. Material, Finish, Style) */}
            {otherAttributeSets.map((attrSet) => {
              const setKey = (attrSet.slug || attrSet.title).toLowerCase();
              const currentValue = selectedAttributes[setKey] || '';

              return (
                <ProductVariationChips
                  key={attrSet.id}
                  label={`${attrSet.title}:`}
                  selectedValue={currentValue || 'Select option'}
                  options={attrSet.attributes.map((attr) => ({
                    id: attr.id,
                    value: attr.title,
                    label: attr.title,
                  }))}
                  onSelect={(val) => handleAttributeChange(setKey, val)}
                  checkAvailability={(attrVal) =>
                    checkAttributeAvailability(
                      product.variations,
                      selectedAttributes,
                      setKey,
                      attrVal
                    )
                  }
                />
              );
            })}
          </div>

          {/* ----------------------------------------------------------- */}
          {/* 3. Purchase Action Row: Stepper, Dominant Add to Bag & Save */}
          {/* ----------------------------------------------------------- */}
          <div ref={mainCtaRef} className="space-y-2.5 sm:space-y-3 pt-2">
            {/* Mobile-only Top Row: Quantity Stepper + Wishlist */}
            <div className="flex sm:hidden items-center justify-between gap-2.5">
              {/* Stepper on Mobile */}
              <div
                className="flex items-center border border-neutral-300 bg-white h-11 flex-1 max-w-[150px]"
                role="group"
                aria-label="Quantity selector"
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-full flex items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="flex-1 text-center font-mono font-semibold text-xs text-neutral-900 select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof activeStock === 'number' && activeStock > 0 && quantity >= activeStock) {
                      toast.info(`Maximum available stock is ${activeStock}`);
                      return;
                    }
                    setQuantity(quantity + 1);
                  }}
                  disabled={typeof activeStock === 'number' && activeStock > 0 && quantity >= activeStock}
                  className="w-10 h-full flex items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Wishlist Button on Mobile */}
              <button
                type="button"
                onClick={handleWishlistToggle}
                className={`h-11 px-4 border transition-all duration-150 active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-xs font-display flex-1 ${
                  isFavorite
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-black'
                }`}
                aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={16} className={isFavorite ? 'fill-red-600 text-red-600' : ''} />
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  {isFavorite ? 'Saved' : 'Wishlist'}
                </span>
              </button>
            </div>

            {/* Main Action Row: Desktop Stepper + Add to Bag (Full-width on mobile, flex-1 on desktop) + Desktop Wishlist */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Desktop-only Quantity Stepper */}
              <div
                className="hidden sm:flex items-center border border-neutral-300 bg-white h-12 sm:h-13 shrink-0"
                role="group"
                aria-label="Quantity selector"
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-9 sm:w-10 h-full flex items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="w-8 sm:w-9 text-center text-xs font-semibold text-neutral-900 font-mono select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof activeStock === 'number' && activeStock > 0 && quantity >= activeStock) {
                      toast.info(`Maximum available stock is ${activeStock}`);
                      return;
                    }
                    setQuantity(quantity + 1);
                  }}
                  disabled={typeof activeStock === 'number' && activeStock > 0 && quantity >= activeStock}
                  className="w-9 sm:w-10 h-full flex items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Dominant Primary CTA: Add to Bag (100% width on mobile, flex-1 on desktop) */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={activeIsOutOfStock}
                className="w-full sm:flex-1 h-12 sm:h-13 bg-neutral-950 text-white hover:bg-black active:scale-[0.99] text-xs uppercase tracking-[0.18em] font-semibold px-4 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer font-display shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {activeIsOutOfStock ? (
                  <span>Out of Stock</span>
                ) : isAddedAnimation ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              {/* Desktop-only Wishlist Button */}
              <button
                type="button"
                onClick={handleWishlistToggle}
                className={`hidden sm:flex w-12 sm:w-13 h-12 sm:h-13 border transition-all duration-150 active:scale-95 cursor-pointer items-center justify-center shrink-0 ${
                  isFavorite
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-black'
                }`}
                aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={18} className={isFavorite ? 'fill-red-600 text-red-600' : ''} />
              </button>
            </div>

            {/* Secondary Action: Buy Now */}
            {!activeIsOutOfStock && (
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isBuyNowProcessing}
                aria-label="Buy Now"
                className="w-full h-11 sm:h-12 bg-white hover:bg-neutral-50 active:scale-[0.99] border border-neutral-950 text-neutral-950 text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer font-display group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Zap size={14} className="text-neutral-950 group-hover:scale-110 transition-transform" />
                <span>{isBuyNowProcessing ? 'Processing...' : 'Buy Now'}</span>
              </button>
            )}

            {/* Tertiary Helper: Atelier WhatsApp Concierge */}
            <div className="pt-1 text-center">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 hover:text-emerald-800 transition-colors py-1 group font-display uppercase tracking-wider"
              >
                <MessageCircle size={13} className="text-emerald-700 group-hover:scale-110 transition-transform shrink-0" />
                <span>Questions about sizing or fit? Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* 4. Instant Delivery Pincode Checker                         */}
          {/* ----------------------------------------------------------- */}
          <DeliveryPincodeChecker />

          {/* ----------------------------------------------------------- */}
          {/* 5. Reassurance & Guarantee Strip                            */}
          {/* ----------------------------------------------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-neutral-600">
            <div className="flex items-center space-x-2.5 bg-neutral-50/70 p-3 border border-neutral-200/60">
              <Truck size={15} className="text-neutral-900 shrink-0" />
              <div>
                <strong className="block text-neutral-900 font-semibold font-display">Free Shipping</strong>
                <span className="text-neutral-400">Orders above {formatPrice(1999)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 bg-neutral-50/70 p-3 border border-neutral-200/60">
              <RotateCcw size={15} className="text-neutral-900 shrink-0" />
              <div>
                <strong className="block text-neutral-900 font-semibold font-display">7-Day Returns</strong>
                <span className="text-neutral-400">Free doorstep pickup</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 bg-neutral-50/70 p-3 border border-neutral-200/60">
              <Banknote size={15} className="text-neutral-900 shrink-0" />
              <div>
                <strong className="block text-neutral-900 font-semibold font-display">Cash on Delivery</strong>
                <span className="text-neutral-400">Pay when delivered</span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* 6. Product Details Accordions                               */}
          {/* ----------------------------------------------------------- */}
          <div className="pt-1">
            <Accordion type="single" collapsible defaultValue="details" className="border border-neutral-200/80 divide-y divide-neutral-200/80">
              {/* Accordion 1: Full Editorial Description / Story */}
              {hasSubstantialContent && (
                <AccordionItem value="story" className="border-b-0 px-4">
                  <AccordionTrigger className="text-xs uppercase tracking-wider font-semibold font-display hover:no-underline py-3.5">
                    Product Details &amp; Fit
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ProductHtmlContent content={product.content!} variant="full" />
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Accordion 2: Technical Specifications & Dimensions */}
              {hasSpecifications && (
                <AccordionItem value="specifications" className="border-b-0 px-4">
                  <AccordionTrigger className="text-xs uppercase tracking-wider font-semibold font-display hover:no-underline py-3.5">
                    Specifications &amp; Dimensions
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                      {product.specifications!.map((spec, idx) => (
                        <div key={idx} className="flex justify-between items-center py-1.5 border-b border-neutral-100">
                          <span className="text-neutral-500 font-light">{spec.name}</span>
                          <span className="text-neutral-900 font-medium font-mono text-[11px]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Accordion 3: Materials & Care (Only if present!) */}
              {hasMaterials && (
                <AccordionItem value="materials" className="border-b-0 px-4">
                  <AccordionTrigger className="text-xs uppercase tracking-wider font-semibold font-display hover:no-underline py-3.5">
                    Materials &amp; Composition
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600 text-xs space-y-2 leading-relaxed pb-4 font-light">
                    <p>
                      <strong className="text-neutral-900 font-medium font-display uppercase tracking-wider text-[11px] block mb-0.5">
                        Composition:
                      </strong>
                      {product.materials || product.fabric}
                    </p>
                    {product.care && (
                      <p className="pt-1">
                        <strong className="text-neutral-900 font-medium font-display uppercase tracking-wider text-[11px] block mb-0.5">
                          Care Instructions:
                        </strong>
                        {product.care}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Accordion 4: Product Description */}
              <AccordionItem value="details" className="border-b-0 px-4">
                <AccordionTrigger className="text-xs uppercase tracking-wider font-semibold font-display hover:no-underline py-3.5">
                  Product Overview
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 text-xs space-y-2.5 leading-relaxed pb-4 font-light">
                  <ProductHtmlContent content={product.description} variant="compact" />
                </AccordionContent>
              </AccordionItem>

              {/* Accordion 5: Shipping, Exchange & Atelier Guarantee */}
              <AccordionItem value="shipping" className="border-b-0 px-4">
                <AccordionTrigger className="text-xs uppercase tracking-wider font-semibold font-display hover:no-underline py-3.5">
                  Shipping &amp; Returns
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 text-xs space-y-2.5 leading-relaxed pb-4 font-light">
                  <p>
                    &bull; <strong>Express Delivery:</strong> Dispatches within 24–48 hours. Expected delivery in 2–4 business days with live SMS and tracking updates.
                  </p>
                  <p>
                    &bull; <strong>7-Day Returns &amp; Exchanges:</strong> Free doorstep pickup scheduled at your convenience for size exchanges or returns.
                  </p>
                  <p>
                    &bull; <strong>Quality Guarantee:</strong> Every piece is 100% genuine and carefully inspected before dispatch.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* VERIFIED REVIEWS SECTION                                    */}
      {/* ------------------------------------------------------------- */}
      <div id="reviews-section" className="mt-20 pt-12 border-t border-neutral-100">
        <ProductReviews
          productId={product.id}
          productSlug={product.slug}
          productName={product.name}
          brandName={product.brand?.name}
          initialReviewsAvg={product.reviews_avg}
          initialReviewsCount={product.reviews_count}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COMPLETE THE LOOK / CURATED RELATED ENSEMBLES                 */}
      {/* ------------------------------------------------------------- */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-neutral-100">
          <div className="mb-6 sm:mb-8">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium block mb-1 font-display">
              Curated Ensembles
            </span>
            <h3 className="text-xl sm:text-2xl font-display text-neutral-900 font-medium">
              Complete The Look
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4.5 lg:gap-6">
            {relatedProducts.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODALS & OVERLAYS                                             */}
      {/* ------------------------------------------------------------- */}
      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        categoryName={product.category?.name || 'Piece'}
      />

      {/* Instant 1-Click Checkout Modal */}
      <InstantCheckoutModal
        isOpen={isQuickBuyOpen}
        onClose={closeQuickBuy}
        product={product}
        selectedSize={selectedSize}
        selectedColorName={currentColor?.name}
        selectedColorHex={currentColor?.hex}
        activeImage={activeImage}
        quantity={quantity}
        variationId={activeVariation?.id}
        variationPrice={activePrice}
      />

      {/* Sticky Bottom Purchase Bar (Synchronized with MobileBottomNav) */}
      <StickyAddToCartBar
        product={product}
        selectedSize={selectedSize}
        selectedColorName={currentColor?.name}
        activeImage={activeImage}
        activePrice={activePrice}
        isOutOfStock={activeIsOutOfStock}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isAdded={isAddedAnimation}
        targetRef={mainCtaRef}
      />
    </div>
  );
}
