import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/meals";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, deliveryFee, total, itemCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-white">
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b border-border flex-row items-center justify-between space-y-0">
          <SheetTitle className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
            <ShoppingBag size={20} className="text-ff-spice" />
            Your Cart
            {itemCount > 0 && (
              <span className="text-sm font-body font-normal text-muted-foreground">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            )}
          </SheetTitle>
          <button onClick={closeCart} className="p-1.5 rounded-full hover:bg-secondary transition-colors">
            <X size={18} />
          </button>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-4xl">
                🛒
              </div>
              <div>
                <p className="font-heading text-lg font-semibold text-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse our menu and add some delicious meals.
                </p>
              </div>
              <button
                onClick={() => { closeCart(); navigate("/menu"); }}
                className="btn-spice mt-2"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.meal.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40 border border-border"
                  >
                    {/* Meal icon */}
                    <div
                      className={`w-14 h-14 rounded-xl flex-shrink-0 bg-gradient-to-br ${item.meal.gradient} flex items-center justify-center text-2xl`}
                    >
                      {item.meal.emoji}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-medium text-sm text-foreground leading-snug">
                        {item.meal.name}
                      </p>
                      <p className="text-sm font-semibold text-ff-spice mt-1">
                        {formatPrice(item.meal.price)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.meal.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.meal.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Item total + remove */}
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {formatPrice(item.meal.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.meal.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>

        {/* Footer summary */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4 space-y-3 bg-white">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between font-semibold text-base text-foreground">
                <span>Total</span>
                <span className="text-ff-spice">{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-ff-spice hover:bg-ff-spice-bright text-ff-cream font-medium rounded-full h-12 text-base gap-2"
              style={{ backgroundColor: "hsl(3 68% 32%)" }}
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
