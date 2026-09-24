import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../lib/types';
import { safeLocalStorage } from '../lib/storage';

interface WishlistStore {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
  removeItem: (id: number) => void;
  getTotalItems: () => number;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const items = get().items;
        const exists = items.some((p) => p.id === product.id);
        if (exists) {
          set({ items: items.filter((p) => p.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      isInWishlist: (id) => {
        return get().items.some((p) => p.id === id);
      },

      removeItem: (id) => {
        set({ items: get().items.filter((p) => p.id !== id) });
      },

      getTotalItems: () => {
        return get().items.length;
      },

      getWishlistCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'clothing-wishlist-storage',
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
