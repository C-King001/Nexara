import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, ShoppingCart } from 'lucide-react';
import { getOnSaleProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';

function useCountdown(hours: number) {
  const target = Date.now() + hours * 60 * 60 * 1000;
  const [remaining, setRemaining] = useState(target - Date.now());

  useEffect(() => {
    const t = setInterval(() => setRemaining(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  return { h, m, s };
}

function CountBlock({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={val}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-12 h-12 rounded-xl bg-lime text-black font-code font-700 text-xl flex items-center justify-center"
      >
        {String(val).padStart(2, '0')}
      </motion.div>
      <span className="text-[9px] font-code text-white/30 uppercase tracking-wider mt-1">{label}</span>
    </div>
  );
}

export default function FlashDeals() {
  const deals = getOnSaleProducts().slice(0, 4);
  const { addItem } = useCart();
  const { h, m, s } = useCountdown(5.5);

  return (
    <section className="py-24 bg-[#0a0a0d] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
      <div className="absolute inset-0 opacity-30" style={{
        background: 'radial-gradient(ellipse at top left, rgba(184,255,0,0.06), transparent 60%)',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-lime flex items-center justify-center">
                <Zap size={12} className="text-black fill-black" />
              </div>
              <span className="text-xs font-code text-lime/70 uppercase tracking-[0.2em]">── FLASH DEALS</span>
            </div>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight">
              Today's <span className="text-lime">Hot Deals</span>
            </h2>
            <p className="text-sm text-white/40 font-ui mt-2">Limited quantities — ends when sold out.</p>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-code text-white/40 uppercase tracking-wider">Ends in:</span>
            <div className="flex items-center gap-2">
              <CountBlock val={h} label="HRS" />
              <span className="font-code font-700 text-lime/50 text-xl mb-4">:</span>
              <CountBlock val={m} label="MIN" />
              <span className="font-code font-700 text-lime/50 text-xl mb-4">:</span>
              <CountBlock val={s} label="SEC" />
            </div>
          </div>
        </div>

        {/* Deals grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deals.map((product, i) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;
            const saved = product.originalPrice ? product.originalPrice - product.price : 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group kure-card rounded-2xl overflow-hidden hover:border-lime/20 transition-all duration-300"
              >
                <Link to={`/product/${product.id}`} className="block relative product-img-wrap bg-[#0d0d11] aspect-square flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.1'; }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500 text-white text-xs font-code font-700">
                    <Zap size={10} className="fill-white" />
                    -{discount}% OFF
                  </div>
                </Link>

                <div className="p-4">
                  <div className="text-[10px] font-code text-white/30 uppercase tracking-wider mb-1">{product.brand}</div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-ui font-600 text-white text-sm leading-snug hover:text-lime transition-colors mb-3 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <div className="font-code font-700 text-lime text-lg">${product.price.toLocaleString()}</div>
                      <div className="text-xs font-code text-white/25 line-through">${product.originalPrice?.toLocaleString()}</div>
                    </div>
                    {saved > 0 && (
                      <div className="px-2 py-0.5 rounded-md bg-lime/10 text-lime text-xs font-code border border-lime/20">
                        Save ${saved}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => addItem(product)}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl btn-lime text-xs font-ui font-700"
                  >
                    <ShoppingCart size={13} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            to="/catalog?sale=true"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl kure-surface text-sm font-ui text-white/50 hover:text-white transition-colors"
          >
            View All Deals <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
