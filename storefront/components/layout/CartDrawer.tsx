'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../lib/utils';
import { DEFAULT_FREE_SHIPPING_THRESHOLD } from '../../lib/commerce';
import { MOCK_PRODUCTS } from '../../lib/mock-data';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

export default function CartDrawer() {
  const router = useRouter();
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQty,
    getSubtotal,
    getFormattedSubtotal,
    addItem,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const previousSubtotal = useRef(0);

  const subtotal = getSubtotal();

  const FREE_SHIPPING_THRESHOLD = DEFAULT_FREE_SHIPPING_THRESHOLD;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  useEffect(() => {
    if (previousSubtotal.current < FREE_SHIPPING_THRESHOLD && subtotal >= FREE_SHIPPING_THRESHOLD) {
      toast.success('Complimentary Express Delivery unlocked for your order.');
    }
    previousSubtotal.current = subtotal;
  }, [subtotal]);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    closeCart();
    router.push('/checkout');
    setIsCheckingOut(false);
  };

  const handleAddUpsell = (accessory: (typeof MOCK_PRODUCTS)[0]) => {
    addItem(accessory, 'One Size', accessory.colors?.[0]?.name, accessory.colors?.[0]?.hex, 1);
    toast.success(`Added ${accessory.name} to your bag!`);
  };

  const totalItemCount = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col justify-between border-l border-neutral-200 bg-white"
      >
        {/* Header with shadcn Title & Badge */}
        <SheetHeader className="p-5 sm:p-6 border-b border-neutral-200 flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="flex items-center space-x-2.5 text-sm uppercase tracking-wider font-semibold font-display">
            <ShoppingBag size={18} className="text-neutral-900" />
            <span>Shopping Bag</span>
            <Badge variant="default" className="text-[10px] ml-1">
              {totalItemCount}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Dynamic Free Shipping Meter */}
        <div className="bg-neutral-50 px-6 py-3.5 border-b border-neutral-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            {subtotal >= FREE_SHIPPING_THRESHOLD ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <Truck size={14} className="text-emerald-600" />
                Unlocked Free Express Shipping!
              </span>
            ) : (
              <span className="text-neutral-700 font-medium">
                Add <strong className="text-neutral-950 font-sans">{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> more for Free Shipping
              </span>
            )}

            <span className="text-[11px] font-mono text-neutral-500 font-semibold">
              {freeShippingProgress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                subtotal >= FREE_SHIPPING_THRESHOLD ? 'bg-emerald-600' : 'bg-[#b87c62]'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 divide-y divide-neutral-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                <ShoppingBag size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-medium text-neutral-900 mb-1 font-display">
                Your bag is empty
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs mb-6">
                Explore our collection of thoughtful, modern essentials designed for effortless styling.
              </p>
              <Button asChild onClick={closeCart} size="default" className="active:scale-95 transition-transform">
                <Link href="/shop" className="inline-flex items-center space-x-2">
                  <span>Shop Collection</span>
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="py-2">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="py-4 flex space-x-4 overflow-hidden"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden border border-neutral-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover object-top"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="text-xs font-semibold text-neutral-900 tracking-tight line-clamp-1 pr-2">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-neutral-400 hover:text-neutral-900 transition-colors p-0.5 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          {/* Variant Specs */}
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                            {item.size && (
                              <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-normal">
                                Size: {item.size}
                              </Badge>
                            )}
                            {item.color && (
                              <span className="flex items-center gap-1">
                                <span
                                  className="w-2 h-2 rounded-full border border-black/10 inline-block"
                                  style={{ backgroundColor: item.colorHex || '#111' }}
                                />
                                {item.color}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-neutral-200 bg-white">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-neutral-900 font-sans">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-neutral-950 font-sans">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Complementary Accents Upsell Carousel */}
              <div className="py-4 border-t border-neutral-100">
                <div className="flex items-center space-x-1.5 mb-3 text-neutral-900">
                  <Sparkles size={13} className="text-neutral-900" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold font-display">
                    Recommended Additions
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {MOCK_PRODUCTS.slice(3, 5).map((acc) => (
                    <div
                      key={acc.id}
                      className="p-2.5 border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between"
                    >
                      <div className="flex gap-2 items-center mb-2">
                        <div className="relative w-10 h-12 bg-neutral-200 shrink-0 overflow-hidden">
                          <Image
                            src={acc.image_url}
                            alt={acc.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[11px] font-medium text-neutral-900 truncate">
                            {acc.name}
                          </h5>
                          <p className="text-xs font-bold text-neutral-950 font-sans">
                            {acc.price_formatted}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddUpsell(acc)}
                        className="w-full text-[10px] h-7 bg-white"
                      >
                        + Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with shadcn Inputs & Buttons */}
        {items.length > 0 && (
          <div className="p-6 border-t border-neutral-200 bg-neutral-50/70 space-y-4">
            {/* Promo code input */}
            <div className="flex gap-2">
              <Input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PROMO CODE (TRY 'WELCOME10')"
                className="bg-white border-neutral-300 uppercase tracking-wider text-xs h-10 font-mono placeholder:font-sans placeholder:normal-case"
              />
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  if (promoCode.trim().toUpperCase() === 'WELCOME10') {
                    setPromoApplied(true);
                    toast.success('Discount code WELCOME10 applied!');
                  } else if (promoCode.trim()) {
                    setPromoApplied(true);
                    toast.info(`Promo code ${promoCode.toUpperCase()} noted for checkout.`);
                  }
                }}
                className="h-10 px-4 shrink-0"
              >
                Apply
              </Button>
            </div>

            {promoApplied && (
              <p className="text-[11px] text-emerald-600 font-medium">
                ✓ Coupon &quot;{promoCode.toUpperCase()}&quot; active. Applied at checkout.
              </p>
            )}

            <Separator className="bg-neutral-200" />

            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500 uppercase tracking-wider text-xs font-display">
                Estimated Subtotal
              </span>
              <span className="font-bold text-base text-neutral-950 font-sans">
                {getFormattedSubtotal()}
              </span>
            </div>

            <p className="text-[11px] text-neutral-400">
              Shipping calculated at checkout. All prices inclusive of taxes.
            </p>

            {/* Checkout CTA */}
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full h-12 shadow-lg"
              size="lg"
            >
              <span>{isCheckingOut ? 'Opening Checkout...' : 'Proceed to Checkout'}</span>
              <ArrowRight size={14} />
            </Button>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-neutral-500">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-neutral-700" />
                Secure Checkout
              </span>
              <span>•</span>
              <span>Tracked Delivery</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
