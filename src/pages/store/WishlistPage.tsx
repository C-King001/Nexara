import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import StoreNavbar from '@/components/store/StoreNavbar';
import StoreFooter from '@/components/store/StoreFooter';
import CartDrawer from '@/components/store/CartDrawer';
import AIAssistant from '@/components/store/AIAssistant';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-[#070709]">
      <StoreNavbar />
      <div className="pt-16">
        <div className="border-b border-white/[0.07] bg-[#0a0a0d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3">
              <Heart size={22} className="text-red-400 fill-red-400" />
              <h1 className="font-display font-800 text-3xl text-white">Wishlist</h1>
              {items.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-400 text-sm font-code border border-red-500/25">
                  {items.length}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5">
              <div className="w-20 h-20 rounded-3xl kure-surface flex items-center justify-center">
                <Heart size={36} className="text-white/20" />
              </div>
              <div className="text-center">
                <h2 className="font-display font-700 text-2xl text-white mb-2">Your wishlist is empty</h2>
                <p className="text-sm text-white/40 font-ui">Save products you love and come back for them later.</p>
              </div>
              <Link to="/catalog" className="flex items-center gap-2 px-6 py-3 rounded-xl btn-lime font-ui font-700">
                Start Browsing <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.06 }}
                  className="group kure-card rounded-2xl overflow-hidden"
                >
                  <Link to={`/product/${product.id}`} className="block relative product-img-wrap bg-[#0d0d11] aspect-square flex items-center justify-center p-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.1'; }}
                    />
                  </Link>
                  <div className="p-4">
                    <div className="text-[10px] font-code text-white/30 uppercase tracking-wider">{product.brand}</div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-ui font-600 text-white hover:text-lime transition-colors text-sm leading-snug mt-0.5 mb-2">{product.name}</h3>
                    </Link>
                    <div className="font-code font-700 text-white text-base mb-3">${product.price.toLocaleString()}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { addItem(product); remove(product.id); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl btn-lime text-xs font-ui font-700"
                      >
                        <ShoppingCart size={13} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => remove(product.id)}
                        className="w-10 h-10 rounded-xl kure-surface flex items-center justify-center text-white/30 hover:text-red-400 border border-white/[0.07] transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
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
