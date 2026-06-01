import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import StoreNavbar from '@/components/store/StoreNavbar';
import StoreFooter from '@/components/store/StoreFooter';
import CartDrawer from '@/components/store/CartDrawer';
import AIAssistant from '@/components/store/AIAssistant';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();

  const shipping = total > 500 ? 0 : 15;
  const tax = Math.round(total * 0.125 * 100) / 100;
  const grand = total + shipping + tax;

  return (
    <div className="min-h-screen bg-[#070709]">
      <StoreNavbar />
      <div className="pt-16">
        <div className="border-b border-white/[0.07] bg-[#0a0a0d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3">
              <ShoppingCart size={22} className="text-lime" />
              <h1 className="font-display font-800 text-3xl text-white">Shopping Cart</h1>
              {items.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-lime/15 text-lime text-sm font-code">
                  {items.reduce((s, i) => s + i.quantity, 0)} items
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5">
              <div className="w-24 h-24 rounded-3xl kure-surface flex items-center justify-center">
                <ShoppingCart size={40} className="text-white/20" />
              </div>
              <div className="text-center">
                <h2 className="font-display font-700 text-2xl text-white mb-2">Your cart is empty</h2>
                <p className="text-sm text-white/40 font-ui">Add some amazing products to get started.</p>
              </div>
              <Link to="/catalog" className="flex items-center gap-2 px-6 py-3 rounded-xl btn-lime font-ui font-700">
                Start Shopping
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-1">
                  <Link to="/catalog" className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white font-ui transition-colors">
                    <ArrowLeft size={15} /> Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-xs text-white/30 hover:text-red-400 font-ui transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={13} /> Clear Cart
                  </button>
                </div>

                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ delay: i * 0.05 }}
                    className="kure-card rounded-2xl p-5 flex gap-4"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#0d0d11] flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-code text-white/30 uppercase tracking-wider">{item.brand}</div>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-ui font-600 text-white hover:text-lime transition-colors leading-snug mt-0.5">
                          {item.name}
                        </h3>
                      </Link>
                      {item.selectedColor && (
                        <div className="text-[11px] font-ui text-white/35 mt-0.5">{item.selectedColor} · {item.selectedStorage}</div>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 kure-surface rounded-xl px-3 py-1.5">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-white/50 hover:text-white transition-colors">
                            <Minus size={13} />
                          </button>
                          <span className="font-code text-white w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-white/50 hover:text-white transition-colors">
                            <Plus size={13} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-code font-700 text-white">${(item.price * item.quantity).toLocaleString()}</span>
                          <button onClick={() => removeItem(item.id)} className="text-white/25 hover:text-red-400 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div>
                <div className="kure-card rounded-2xl p-6 sticky top-24">
                  <h2 className="font-display font-700 text-white text-xl mb-5">Order Summary</h2>

                  <div className="flex flex-col gap-3 mb-5">
                    <div className="flex justify-between text-sm font-ui">
                      <span className="text-white/50">Subtotal</span>
                      <span className="text-white font-code">${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-ui">
                      <span className="text-white/50">Shipping</span>
                      <span className={shipping === 0 ? 'text-lime font-code' : 'text-white font-code'}>
                        {shipping === 0 ? 'FREE' : `$${shipping}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-lime/60 font-ui">Add ${500 - total} more for free shipping</p>
                    )}
                    <div className="flex justify-between text-sm font-ui">
                      <span className="text-white/50">VAT (12.5%)</span>
                      <span className="text-white font-code">${tax.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-white/[0.07]" />
                    <div className="flex justify-between font-ui">
                      <span className="text-white font-600">Total</span>
                      <span className="font-code font-700 text-lime text-xl">${grand.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Coupon */}
                  <div className="flex gap-2 mb-5">
                    <input
                      placeholder="Coupon code"
                      className="flex-1 kure-surface rounded-xl px-3 py-2.5 text-sm font-ui text-white placeholder-white/25 outline-none border border-white/[0.07] focus:border-lime/30"
                    />
                    <button className="px-4 py-2.5 rounded-xl kure-surface text-sm font-ui text-white/60 hover:text-white border border-white/[0.07] transition-colors">
                      Apply
                    </button>
                  </div>

                  <Link
                    to="/checkout"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl btn-lime font-ui font-700 text-base"
                  >
                    Checkout
                    <ArrowRight size={18} />
                  </Link>

                  {/* Guarantees */}
                  <div className="mt-5 pt-5 border-t border-white/[0.07] flex flex-col gap-2">
                    {['🔒 Secure payment', '📦 Fast delivery', '↩️ Easy returns'].map((item) => (
                      <div key={item} className="text-xs text-white/35 font-ui">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <StoreFooter />
      <CartDrawer />
      <AIAssistant />
    </div>
  );
}
