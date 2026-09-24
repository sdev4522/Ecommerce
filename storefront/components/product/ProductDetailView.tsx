'use client';

import React, { useState, useRef } from 'react';
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
  ShieldCheck,
  Sparkles,
  Banknote,
} from 'lucide-react';
import { Product } from '../../lib/types';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import SizeGuideModal from './SizeGuideModal';
import ProductCard from './ProductCard';
import ProductReviews from './ProductReviews';
import DeliveryPincodeChecker from './DeliveryPincodeChecker';
import StickyAddToCartBar from './StickyAddToCartBar';
import InstantCheckoutModal from '../checkout/InstantCheckoutModal';
import ProductGallery from './ProductGallery';
import ProductHtmlContent from './ProductHtmlContent';
import { toast } from 'sonner';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'One Size'
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);
  const [isBuyNowProcessing, setIsBuyNowProcessing] = useState(false);

  const mainCtaRef = useRef<HTMLDivElement>(null);

  const {
    addItem,
    openCart,
    closeCart,
    isQuickBuyOpen,
    openQuickBuy,
    closeQuickBuy,
  } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isFavorite = isInWishlist(product.id);

  const currentColor = product.colors && product.colors[selectedColorIndex];
  const images = product.images && product.images.length > 0 ? product.images : [product.image_url];
  const activeImage = currentColor?.image || images[0] || product.image_url;

  const handleAddToCart = () => {
    // 1. Stock & inventory validation
    if (product.is_out_of_stock || (typeof product.quantity === 'number' && product.quantity <= 0)) {
      toast.error('This piece is currently out of stock.');
      return;
    }

    // 2. Quantity validation
    if (!quantity || quantity <= 0) {
      toast.error('Please select at least 1 item.');
      return;
    }

    // 3. Mutually exclusive state transition:
    // Ensure Quick Buy modal is closed, add item to cart, and open Cart Drawer
    closeQuickBuy();
    addItem(product, selectedSize, currentColor?.name, currentColor?.hex, quantity, true);

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
    if (product.is_out_of_stock || (typeof product.quantity === 'number' && product.quantity <= 0)) {
      toast.error('This piece is currently out of stock.');
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

      // Add item to cart and trigger Cart Drawer
      addItem(product, selectedSize, currentColor?.name, currentColor?.hex, quantity, true);
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
      `Hi LUNE, I would like more details about "${product.name}" (Size: ${selectedSize}, SKU: ${product.sku}).`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  // Structured Data (JSON-LD) for SEO and Rich Google Search Cards
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: (product.description || product.name).replace(/<[^>]*>/g, '').trim(),
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.is_out_of_stock
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
    },
    ...(product.brand
      ? {
        brand: {
          '@type': 'Brand',
          name: product.brand.name,
        },
      }
      : {}),
    ...(product.reviews_count > 0
      ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.reviews_avg,
          reviewCount: product.reviews_count,
        },
      }
      : {}),
  };

  const hasSpecifications = product.specifications && product.specifications.length > 0;
  const hasMaterials = Boolean(product.materials || product.fabric);
  const hasSubstantialContent =
    Boolean(product.content) &&
    product.content !== product.description &&
    product.content!.trim().length > 30;

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-24 sm:pb-16 font-sans">
      {/* Search Engine Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ------------------------------------------------------------- */}
      {/* BREADCRUMB & UTILITY NAVIGATION                              */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-widest text-neutral-400 mb-6 sm:mb-8 border-b border-neutral-100 pb-3">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* LEFT COLUMN: Editorial Product Image Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={images}
            productName={product.name}
            badge={product.badge}
            activeImage={activeImage}
          />
        </div>

        {/* RIGHT COLUMN: Elevated Luxury Purchasing & Specification Panel */}
        <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
          {/* Header & Product Hierarchy */}
          <div className="border-b border-neutral-100 pb-5 space-y-2.5">

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-display text-neutral-950 font-medium tracking-tight leading-snug">
              {product.name}
            </h1>
            {/* Category / Brand Eyebrow */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium font-display">
                {product.brand?.name || product.category?.name || 'LUNE'} &bull; SKU: {product.sku}
              </span>

              {/* Review Appraisal Anchor */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('reviews-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center space-x-1 text-neutral-700 hover:text-black cursor-pointer group transition-colors"
                title="View customer reviews"
              >
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="font-semibold text-xs text-neutral-900">{product.reviews_avg || 4.8}</span>
                <span className="text-neutral-400 text-[11px] group-hover:underline">
                  ({product.reviews_count || 12})
                </span>
              </button>
            </div>

            {/* Price & Discount */}
            <div className="pt-1 flex items-baseline space-x-3">
              <span className="text-2xl sm:text-3xl font-display font-semibold text-neutral-950">
                {product.price_formatted}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-sm text-neutral-400 line-through">
                  {product.original_price_formatted}
                </span>
              )}
              {product.original_price && product.original_price > product.price && (
                <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  Save {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                </span>
              )}
            </div>

            {/* Split Payment / UPI Interest-Free Indicator */}
            <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 pt-0.5 font-light">
              <CreditCard size={13} className="text-neutral-400 shrink-0" />
              <span>
                Or 3 interest-free payments of <strong>₹{Math.round(product.price / 3).toLocaleString('en-IN')}</strong> with Cards & UPI
              </span>
            </div>
          </div>

          {/* Short Description (Clean CMS HTML Rendering) */}
          {product.description && (
            <div className="border-b border-neutral-100 pb-5">
              <ProductHtmlContent content={product.description} variant="compact" />
            </div>
          )}

          {/* Color Variation Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-widest text-neutral-400 font-medium text-[11px] font-display">
                  Color Shade:
                </span>
                <span className="font-medium text-neutral-900 font-display">
                  {currentColor?.name || 'Selected'}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-7 h-7 rounded-full border transition-all duration-150 active:scale-90 cursor-pointer ${selectedColorIndex === idx
                      ? 'ring-2 ring-neutral-950 ring-offset-2 scale-105 border-neutral-950'
                      : 'border-neutral-300 opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={`Select ${c.name} shade`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector & Matrix */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-widest text-neutral-400 font-medium text-[11px] font-display">
                  Select Size: <strong className="text-neutral-950 font-semibold">{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[11px] uppercase tracking-wider text-neutral-700 hover:text-black font-medium flex items-center gap-1 underline underline-offset-2 cursor-pointer font-display"
                >
                  <Ruler size={12} />
                  <span>Size &amp; Measurements Matrix</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-150 active:scale-95 border cursor-pointer font-display ${selectedSize === size
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-black'
                      }`}
                  >
                    <span>{size}</span>
                  </button>
                ))}
              </div>

              {product.model_info && (
                <p className="text-[11px] text-neutral-400 italic">
                  * {product.model_info}
                </p>
              )}
            </div>
          )}

          {/* Stock Scarcity Urgency */}
          {product.quantity > 0 && product.quantity <= 5 && (
            <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50/70 border border-amber-200 px-3 py-1.5">
              <Sparkles size={12} className="text-amber-700 shrink-0" />
              <span>Only {product.quantity} pieces remaining in atelier inventory</span>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* PURCHASE ACTIONS (Add to Bag, Instant Checkout, Concierge)   */}
          {/* ------------------------------------------------------------- */}
          <div ref={mainCtaRef} className="space-y-3 pt-2">
            {/* Row 1: Quantity Stepper + Primary Add To Bag + Wishlist */}
            <div className="flex space-x-2.5">
              {/* Stepper */}
              <div className="flex items-center border border-neutral-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="px-3 text-xs font-semibold text-neutral-900 font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.is_out_of_stock}
                className="flex-1 bg-neutral-950 text-white hover:bg-black active:scale-[0.98] text-xs uppercase tracking-[0.2em] font-semibold py-3.5 px-4 transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer font-display shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.is_out_of_stock ? (
                  <span>Out of Stock</span>
                ) : isAddedAnimation ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={handleWishlistToggle}
                className={`p-3.5 border transition-all duration-150 active:scale-95 cursor-pointer ${isFavorite
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:border-black'
                  }`}
                aria-label="Toggle Wishlist"
              >
                <Heart size={16} className={isFavorite ? 'fill-red-600' : ''} />
              </button>
            </div>

            {/* Row 2: Secondary "Buy Now" Action */}
            {!product.is_out_of_stock && (
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isBuyNowProcessing}
                className="w-full bg-white hover:bg-neutral-50 active:scale-[0.99] border border-neutral-950 text-neutral-950 text-xs uppercase tracking-[0.2em] font-semibold py-3.5 flex items-center justify-center space-x-2 transition-all duration-150 cursor-pointer font-display group disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Buy Now"
              >
                <Zap size={14} className="text-neutral-950 group-hover:scale-110 transition-transform" />
                <span>{isBuyNowProcessing ? 'Processing...' : 'Buy Now'}</span>
              </button>
            )}

            {/* Row 3: WhatsApp Concierge Action */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 border border-neutral-200 hover:border-emerald-700/60 bg-white hover:bg-emerald-50/30 text-neutral-700 hover:text-emerald-900 text-[11px] uppercase tracking-wider font-medium py-2.5 px-4 transition-all duration-200 font-display group"
            >
              <MessageCircle size={14} className="text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>Chat with us on WhatsApp</span>
            </a>
          </div>

          {/* Instant Delivery & Pincode Checker */}
          <DeliveryPincodeChecker />

          {/* Reassurance Guarantees */}
          <div className="grid grid-cols-3 gap-3 text-[11px] text-neutral-600">
            <div className="flex items-center space-x-2.5 bg-neutral-50/70 p-3 border border-neutral-200/60">
              <Truck size={15} className="text-neutral-900 shrink-0" />
              <div>
                <strong className="block text-neutral-900 font-medium font-display">Free Shipping</strong>
                <span className="text-neutral-400">On orders over ₹1,999</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 bg-neutral-50/70 p-3 border border-neutral-200/60">
              <RotateCcw size={15} className="text-neutral-900 shrink-0" />
              <div>
                <strong className="block text-neutral-900 font-medium font-display">7-Day Returns</strong>
                <span className="text-neutral-400">Doorstep pickup across India</span>
              </div>
            </div>
            <div className="flex items-center space-x-2.5 bg-neutral-50/70 p-3 border border-neutral-200/60">
              <Banknote size={15} className="text-neutral-900 shrink-0" />
              <div>
                <strong className="block text-neutral-900 font-medium font-display">Cash on Delivery</strong>
                <span className="text-neutral-400">Pay when you receive</span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* PRODUCT INFORMATION ACCORDIONS (Strictly Real Backend Data)   */}
          {/* ------------------------------------------------------------- */}
          <div className="pt-2">
            <Accordion type="single" collapsible defaultValue="details" className="border border-neutral-200/80 divide-y divide-neutral-200/80">
              {/* Accordion 1: Full Editorial Description / Story */}
              {hasSubstantialContent && (
                <AccordionItem value="story" className="border-b-0 px-4">
                  <AccordionTrigger className="text-xs uppercase tracking-wider font-medium font-display hover:no-underline py-3.5">
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
                  <AccordionTrigger className="text-xs uppercase tracking-wider font-medium font-display hover:no-underline py-3.5">
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
                  <AccordionTrigger className="text-xs uppercase tracking-wider font-medium font-display hover:no-underline py-3.5">
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

              {/* Accordion 4: Shipping, Exchange & Atelier Guarantee */}
              <AccordionItem value="shipping" className="border-b-0 px-4">
                <AccordionTrigger className="text-xs uppercase tracking-wider font-medium font-display hover:no-underline py-3.5">
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
          initialReviewsAvg={product.reviews_avg}
          initialReviewsCount={product.reviews_count}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COMPLETE THE LOOK / CURATED RELATED ENSEMBLES                 */}
      {/* ------------------------------------------------------------- */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-neutral-100">
          <div className="mb-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium block mb-1 font-display">
              Curated Ensembles
            </span>
            <h3 className="text-2xl font-display text-neutral-900 font-medium">
              Complete The Look
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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
      />

      {/* Sticky Bottom Purchase Bar (Synchronized with MobileBottomNav) */}
      <StickyAddToCartBar
        product={product}
        selectedSize={selectedSize}
        selectedColorName={currentColor?.name}
        activeImage={activeImage}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isAdded={isAddedAnimation}
        targetRef={mainCtaRef}
      />
    </div>
  );
}
