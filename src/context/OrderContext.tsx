import { createContext, useContext, useState, ReactNode } from "react";
import type { CartItem } from "./CartContext";

export type OrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  deliveryCode: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
  placedAt: Date;
  estimatedDelivery: Date;
  riderId?: string;
  riderName?: string;
  riderPhone?: string;
}

interface OrderContextValue {
  orders: Order[];
  activeOrder: Order | null;
  placeOrder: (data: PlaceOrderData) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  confirmDelivery: (orderId: string, code: string) => boolean;
  getOrder: (orderId: string) => Order | undefined;
}

interface PlaceOrderData {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
}

const OrderContext = createContext<OrderContextValue | null>(null);

function generateOrderId(): string {
  return `FF-${Date.now().toString(36).toUpperCase()}`;
}

function generateDeliveryCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* Seed mock past orders for demo */
const SEED_ORDERS: Order[] = [
  {
    id: "FF-KZRP12",
    items: [
      {
        meal: {
          id: "jollof-rice",
          name: "Party Jollof Rice",
          description: "",
          price: 2800,
          categoryId: "rice-grains",
          gradient: "from-orange-700 via-red-600 to-orange-500",
          emoji: "🍛",
          available: true,
          popular: true,
          spicyLevel: 1,
          prepTime: 25,
          tags: ["Bestseller"],
        },
        quantity: 2,
      },
      {
        meal: {
          id: "chapman",
          name: "Chapman",
          description: "",
          price: 1200,
          categoryId: "drinks",
          gradient: "from-rose-600 via-orange-500 to-yellow-500",
          emoji: "🍹",
          available: true,
          popular: true,
          spicyLevel: 0,
          prepTime: 5,
          tags: [],
        },
        quantity: 2,
      },
    ],
    subtotal: 8000,
    deliveryFee: 500,
    total: 8500,
    status: "delivered",
    deliveryCode: "847291",
    customerName: "Aisha Musa",
    customerPhone: "08012345678",
    deliveryAddress: "14 Yakubu Gowon Way, Kaduna North",
    paymentMethod: "Paystack",
    placedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
    riderName: "Ibrahim Suleiman",
    riderPhone: "08098765432",
  },
];

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const placeOrder = (data: PlaceOrderData): Order => {
    const order: Order = {
      id: generateOrderId(),
      ...data,
      status: "received",
      deliveryCode: generateDeliveryCode(),
      placedAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000),
    };
    setOrders((prev) => [order, ...prev]);
    setActiveOrder(order);
    return order;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    if (activeOrder?.id === orderId) {
      setActiveOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const confirmDelivery = (orderId: string, code: string): boolean => {
    const order = orders.find((o) => o.id === orderId);
    if (!order || order.deliveryCode !== code) return false;
    updateOrderStatus(orderId, "delivered");
    return true;
  };

  const getOrder = (orderId: string) => orders.find((o) => o.id === orderId);

  return (
    <OrderContext.Provider
      value={{ orders, activeOrder, placeOrder, updateOrderStatus, confirmDelivery, getOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
