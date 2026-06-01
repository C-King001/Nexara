import { createContext, useContext, useReducer, ReactNode } from "react";
import type { Meal } from "@/data/meals";

export interface CartItem {
  meal: Meal;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; meal: Meal }
  | { type: "REMOVE"; mealId: string }
  | { type: "UPDATE_QTY"; mealId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "TOGGLE_DRAWER"; open?: boolean };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.meal.id === action.meal.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.meal.id === action.meal.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { meal: action.meal, quantity: 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.meal.id !== action.mealId) };
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.meal.id !== action.mealId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.meal.id === action.mealId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE_DRAWER":
      return { ...state, isOpen: action.open !== undefined ? action.open : !state.isOpen };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addItem: (meal: Meal) => void;
  removeItem: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getItemQuantity: (mealId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

const DELIVERY_FEE = 500;

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.meal.price * i.quantity, 0);
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        itemCount,
        subtotal,
        deliveryFee,
        total,
        addItem: (meal) => dispatch({ type: "ADD", meal }),
        removeItem: (mealId) => dispatch({ type: "REMOVE", mealId }),
        updateQuantity: (mealId, quantity) => dispatch({ type: "UPDATE_QTY", mealId, quantity }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        openCart: () => dispatch({ type: "TOGGLE_DRAWER", open: true }),
        closeCart: () => dispatch({ type: "TOGGLE_DRAWER", open: false }),
        toggleCart: () => dispatch({ type: "TOGGLE_DRAWER" }),
        getItemQuantity: (mealId) =>
          state.items.find((i) => i.meal.id === mealId)?.quantity ?? 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
