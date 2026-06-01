import { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@/data/products';

interface WishlistContextValue {
  items: Product[];
  has: (id: string) => boolean;
  toggle: (product: Product) => void;
  remove: (id: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const has = (id: string) => items.some((p) => p.id === id);

  function toggle(product: Product) {
    setItems((prev) =>
      has(product.id) ? prev.filter((p) => p.id !== product.id) : [...prev, product]
    );
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <WishlistContext.Provider value={{ items, has, toggle, remove, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
