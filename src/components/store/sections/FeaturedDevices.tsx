import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { getFeaturedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function FeaturedDevices() {
  const featured = getFeaturedProducts().slice(0, 4);
  const { addItem } = useCart();

  return (
    <section className="py-24 bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs font-code text-lime/70 uppercase tracking-[0.2em] mb-3">
              ── FEATURED DEVICES
            </div>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight">
              This Season's <br />
              <span className="text-lime">Top Picks</span>
            </h2>
          </div>
          <Link
            to="/catalog?featured=true"
            className="hidden md:flex items-center gap-2 text-sm font-ui text-white/50 hover:text-white transition-colors"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group kure-card rounded-2xl overflow-hidden hover:border-white/[0.15] hover:shadow-2xl transition-all duration-400"
              >
                <Link to={`/product/${product.id}`} className="block">
                  {/* Image area */}
                  <div className="relative product-img-wrap bg-gradient-to-b from-[#0d0d12] to-[#0a0a0d] aspect-[3/4] flex items-center justify-center p-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '0.1';
                      }}
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4 px-2 py-0.5 rounded-md bg-lime text-black text-[10px] font-code font-700 tracking-wider">
                        {product.badge}
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="absolute top-4 right-4 px-2 py-0.5 rounded-md bg-red-500 text-white text-[10px] font-code font-700">
                        -{discount}%
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5">
                  <div className="text-[10px] font-code text-white/30 uppercase tracking-wider mb-1">{product.brand}</div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-ui font-700 text-white leading-snug hover:text-lime transition-colors mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  {product.shortDescription && (
                    <p className="text-[11px] font-code text-white/35 mb-3 line-clamp-1">{product.shortDescription}</p>
                  )}

                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={10} className={i <= Math.round(product.rating) ? 'text-amber fill-amber' : 'text-white/15'} />
                      ))}
                    </div>
                    <span className="text-[10px] text-white/30 font-code">{product.reviewCount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-code font-700 text-white text-lg">${product.price.toLocaleString()}</div>
                      {product.originalPrice && (
                        <div className="text-xs font-code text-white/25 line-through">${product.originalPrice.toLocaleString()}</div>
                      )}
                    </div>
                    <button
                      onClick={() => addItem(product)}
                      className="px-4 py-2 rounded-lg btn-lime text-xs font-ui font-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile "View All" */}
        <div className="flex md:hidden justify-center mt-8">
          <Link
            to="/catalog?featured=true"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl kure-surface text-sm font-ui text-white/60 hover:text-white transition-colors"
          >
            View All Featured <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
