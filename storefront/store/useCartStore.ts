import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '../lib/types';
import { formatPrice } from '../lib/utils';
import { DEFAULT_FREE_SHIPPING_THRESHOLD } from '../lib/commerce';
import { safeLocalStorage } from '../lib/storage';

const FREE_SHIPPING_THRESHOLD = DEFAULT_FREE_SHIPPING_THRESHOLD;

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isQuickBuyOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openQuickBuy: () => void;
  closeQuickBuy: () => void;
  addItem: (
    product: Product,
    size?: string,
    color?: string,
    colorHex?: string,
    qty?: number,
    openDrawer?: boolean
  ) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getFormattedSubtotal: () => string;
  getFreeShippingRemaining: () => number;
  getFreeShippingProgress: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isQuickBuyOpen: false,

      // Mutual exclusion: opening Cart Drawer closes Quick Buy modal
      openCart: () => set({ isOpen: true, isQuickBuyOpen: false }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen, isQuickBuyOpen: false })),

      // Mutual exclusion: opening Quick Buy modal closes Cart Drawer
      openQuickBuy: () => set({ isQuickBuyOpen: true, isOpen: false }),
      closeQuickBuy: () => set({ isQuickBuyOpen: false }),

      addItem: (product, size = 'M', color, colorHex, qty = 1, openDrawer = false) => {
        const items = get().items;
        const colorName = color || (product.colors && product.colors[0]?.name) || 'Standard';
        const colorValue = colorHex || (product.colors && product.colors[0]?.hex) || '#111111';
        
        // Composite unique key for product + size + color
        const compositeId = `${product.id}-${size}-${colorName}`;

        const existingIndex = items.findIndex((i) => i.id === compositeId);

        if (existingIndex > -1) {
          const updatedItems = [...items];
          const newQty = Math.min(updatedItems[existingIndex].qty + qty, updatedItems[existingIndex].max_qty);
          updatedItems[existingIndex].qty = newQty;
          set({
            items: updatedItems,
            ...(openDrawer ? { isOpen: true, isQuickBuyOpen: false } : {}),
          });
        } else {
          const newItem: CartItem = {
            id: compositeId,
            product_id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            formatted_price: product.price_formatted || formatPrice(product.price),
            image: product.image_url,
            qty: qty,
            size: size,
            color: colorName,
            colorHex: colorValue,
            max_qty: product.quantity || 10,
          };
          set({
            items: [newItem, ...items],
            ...(openDrawer ? { isOpen: true, isQuickBuyOpen: false } : {}),
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQty: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, qty: Math.min(qty, item.max_qty) } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.qty, 0);
      },

      getFormattedSubtotal: () => {
        return formatPrice(get().getSubtotal());
      },

      getFreeShippingRemaining: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
      },

      getFreeShippingProgress: () => {
        const subtotal = get().getSubtotal();
        return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      },
    }),
    {
      name: 'clothing-cart-storage',
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
