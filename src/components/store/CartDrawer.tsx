import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, total, isOpen, setIsOpen, removeItem, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0f0f13] border-l border-white/[0.07] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-lime" />
                <span className="font-display font-700 text-white text-lg">Your Cart</span>
                {items.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-lime/15 text-lime text-xs font-code">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-hide">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <div className="w-16 h-16 rounded-2xl kure-surface flex items-center justify-center">
                    <ShoppingCart size={28} className="text-white/20" />
                  </div>
                  <div className="text-center">
                    <p className="font-ui font-600 text-white/60">Your cart is empty</p>
                    <p className="text-sm text-white/30 font-ui mt-1">Add some great products!</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg btn-lime text-sm font-ui font-600"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex gap-3 p-3 kure-card rounded-xl"
                  >
                    <div className="w-16 h-16 rounded-lg bg-[#0d0d11] flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-code text-white/30 uppercase tracking-wider">{item.brand}</div>
                      <div className="text-sm font-ui font-600 text-white leading-snug truncate">{item.name}</div>
                      {item.selectedColor && (
                        <div className="text-[10px] font-code text-white/30 mt-0.5">{item.selectedColor}</div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md kure-surface flex items-center justify-center text-white/50 hover:text-white transition-colors"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-sm font-code text-white w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md kure-surface flex items-center justify-center text-white/50 hover:text-white transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-code font-600 text-white text-sm">${(item.price * item.quantity).toLocaleString()}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-white/25 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/[0.07] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-ui text-white/60">Subtotal</span>
                  <span className="font-code font-700 text-white text-lg">${total.toLocaleString()}</span>
                </div>
                <p className="text-[11px] text-white/30 font-ui">Shipping and taxes calculated at checkout.</p>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl btn-lime font-ui font-700 text-sm"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-2.5 rounded-xl kure-surface text-sm font-ui text-white/60 hover:text-white transition-colors"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
