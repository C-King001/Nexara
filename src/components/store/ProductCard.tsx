import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, GitCompare, Star } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();
  const { has: inWishlist, toggle: toggleWishlist } = useWishlist();
  const { has: inCompare, toggle: toggleCompare } = useCompare();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative kure-card rounded-2xl overflow-hidden flex flex-col hover:border-white/[0.14] transition-all duration-300"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative block product-img-wrap bg-[#0d0d11]">
        <div className="aspect-[4/5] flex items-center justify-center p-6">
          {imgError ? (
            <div className="flex flex-col items-center gap-2 text-white/20">
              <div className="text-4xl">{product.category === 'smartphone' ? '📱' : product.category === 'earbuds' ? '🎧' : product.category === 'watch' ? '⌚' : '📦'}</div>
              <span className="text-xs font-code">{product.brand}</span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-code font-600 tracking-wider bg-lime text-black">
              {product.badge}
            </span>
          )}
          {product.isNew && !product.badge && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-code font-600 tracking-wider bg-blue-500 text-white">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-code font-600 tracking-wider bg-red-500 text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist + Compare — hover reveal */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`w-8 h-8 rounded-lg glass flex items-center justify-center transition-colors ${
              inWishlist(product.id) ? 'text-red-400' : 'text-white/50 hover:text-red-400'
            }`}
            aria-label="Wishlist"
          >
            <Heart size={15} className={inWishlist(product.id) ? 'fill-current' : ''} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); toggleCompare(product); }}
            className={`w-8 h-8 rounded-lg glass flex items-center justify-center transition-colors ${
              inCompare(product.id) ? 'text-amber' : 'text-white/50 hover:text-amber'
            }`}
            aria-label="Compare"
          >
            <GitCompare size={14} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <div className="text-[11px] font-code text-white/35 uppercase tracking-wider mb-1">{product.brand}</div>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-ui font-600 text-white text-sm leading-snug hover:text-lime transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          {product.shortDescription && (
            <p className="text-[11px] text-white/35 font-code mt-1 line-clamp-1">{product.shortDescription}</p>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={11}
                className={i <= Math.round(product.rating) ? 'text-amber fill-amber' : 'text-white/20'}
              />
            ))}
          </div>
          <span className="text-[11px] text-white/35 font-code">{product.rating} ({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="font-code font-600 text-white text-base">${product.price.toLocaleString()}</div>
            {product.originalPrice && (
              <div className="text-[11px] font-code text-white/30 line-through">${product.originalPrice.toLocaleString()}</div>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg btn-lime text-xs font-ui font-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={13} />
            {product.inStock ? 'Add' : 'Sold Out'}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
