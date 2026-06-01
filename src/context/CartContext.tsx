import { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@/data/products';

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

interface CartContextValue {
  items: CartItem[];
  total: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, options?: { color?: string; storage?: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addItem(product: Product, options?: { color?: string; storage?: string }) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          selectedColor: options?.color ?? product.colors?.[0],
          selectedStorage: options?.storage ?? product.storage?.[0],
        },
      ];
    });
    setIsOpen(true);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{ items, total, count, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
