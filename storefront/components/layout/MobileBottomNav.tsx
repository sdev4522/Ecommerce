'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Menu as MenuIcon, Heart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useMenuStore } from '../../store/useMenuStore';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const { getTotalItems, openCart } = useCartStore();
  const { getWishlistCount } = useWishlistStore();
  const { openMenu } = useMenuStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCart = mounted ? getTotalItems() : 0;
  const totalWishlist = mounted ? getWishlistCount() : 0;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around shadow-lg pointer-events-auto">
      {/* Home */}
      <Link
        href="/"
        className={`flex flex-col items-center justify-center min-h-[44px] min-w-[48px] py-1 px-2.5 transition-all active:scale-95 touch-manipulation ${
          pathname === "/" ? "text-neutral-950 font-semibold" : "text-neutral-500 hover:text-neutral-900"
        }`}
      >
        <Home size={18} strokeWidth={pathname === "/" ? 2.2 : 1.75} />
        <span className="text-[10px] tracking-wider uppercase mt-1">Home</span>
      </Link>

      {/* Shop / Collections */}
      <Link
        href="/shop"
        className={`flex flex-col items-center justify-center min-h-[44px] min-w-[48px] py-1 px-2.5 transition-all active:scale-95 touch-manipulation ${
          pathname === "/shop" || pathname?.startsWith("/collections") ? "text-neutral-950 font-semibold" : "text-neutral-500 hover:text-neutral-900"
        }`}
      >
        <Compass size={18} strokeWidth={pathname === "/shop" || pathname?.startsWith("/collections") ? 2.2 : 1.75} />
        <span className="text-[10px] tracking-wider uppercase mt-1">Shop</span>
      </Link>

      {/* Menu Trigger */}
      <button
        type="button"
        onClick={openMenu}
        className="flex flex-col items-center justify-center min-h-[44px] min-w-[48px] py-1 px-2.5 text-neutral-600 hover:text-neutral-950 active:scale-95 transition-all cursor-pointer touch-manipulation"
        aria-label="Open Navigation Menu"
      >
        <MenuIcon size={18} strokeWidth={1.75} />
        <span className="text-[10px] tracking-wider uppercase mt-1 font-medium">Menu</span>
      </button>

      {/* Wishlist */}
      <Link
        href="/wishlist"
        className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[48px] py-1 px-2.5 transition-all active:scale-95 touch-manipulation ${
          pathname === "/wishlist" ? "text-neutral-950 font-semibold" : "text-neutral-500 hover:text-neutral-900"
        }`}
      >
        <div className="relative">
          <Heart size={18} strokeWidth={pathname === "/wishlist" ? 2.2 : 1.75} />
          {totalWishlist > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {totalWishlist}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-wider uppercase mt-1">Wishlist</span>
      </Link>

      {/* Cart Button */}
      <button
        type="button"
        onClick={openCart}
        className="relative flex flex-col items-center justify-center min-h-[44px] min-w-[48px] py-1 px-2.5 text-neutral-950 hover:text-black active:scale-95 transition-all cursor-pointer touch-manipulation"
        aria-label="Open Shopping Bag"
      >
        <div className="relative">
          <ShoppingBag size={18} strokeWidth={2} />
          {totalCart > 0 && (
            <span className="absolute -top-1 -right-2 bg-neutral-950 text-white text-[9px] font-bold min-w-[15px] h-[15px] px-0.5 rounded-full flex items-center justify-center">
              {totalCart}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-wider uppercase mt-1 font-semibold">Bag</span>
      </button>
    </div>
  );
}
