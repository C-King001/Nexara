import { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@/data/products';

interface CompareContextValue {
  items: Product[];
  has: (id: string) => boolean;
  toggle: (product: Product) => void;
  clear: () => void;
  count: number;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const has = (id: string) => items.some((p) => p.id === id);

  function toggle(product: Product) {
    setItems((prev) => {
      if (has(product.id)) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 3) return prev; // max 3 for comparison
      return [...prev, product];
    });
  }

  function clear() {
    setItems([]);
  }

  return (
    <CompareContext.Provider value={{ items, has, toggle, clear, count: items.length }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used inside CompareProvider');
  return ctx;
}
