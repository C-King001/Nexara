import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Heart, GitCompare, Star, ChevronRight,
  Shield, Truck, RotateCcw, Check, Zap,
} from 'lucide-react';
import StoreNavbar from '@/components/store/StoreNavbar';
import StoreFooter from '@/components/store/StoreFooter';
import CartDrawer from '@/components/store/CartDrawer';
import AIAssistant from '@/components/store/AIAssistant';
import ProductCard from '@/components/store/ProductCard';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { testimonials } from '@/data/products';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id ?? '');

  const { addItem } = useCart();
  const { has: inWishlist, toggle: toggleWishlist } = useWishlist();
  const { has: inCompare, toggle: toggleCompare } = useCompare();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage?.[0]);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="font-display font-700 text-white text-2xl mb-2">Product Not Found</h2>
          <Link to="/catalog" className="text-lime font-ui text-sm hover:underline">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  function handleAddToCart() {
    addItem(product, { color: selectedColor, storage: selectedStorage });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  const productReviews = testimonials.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#070709]">
      <StoreNavbar />
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="border-b border-white/[0.06] bg-[#0a0a0d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-1.5 text-xs font-ui text-white/35">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/catalog" className="hover:text-white transition-colors">Shop</Link>
              <ChevronRight size={12} />
              <Link to={`/catalog?category=${product.category}`} className="hover:text-white transition-colors capitalize">{product.category}s</Link>
              <ChevronRight size={12} />
              <span className="text-white/60 truncate max-w-[200px]">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">

            {/* Images */}
            <div className="flex flex-col gap-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative kure-card rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-8 product-img-wrap"
              >
                {product.badge && (
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-lime text-black text-xs font-code font-700">
                    {product.badge}
                  </div>
                )}
                {discount > 0 && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-red-500 text-white text-xs font-code font-700">
                    -{discount}%
                  </div>
                )}
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.1'; }}
                />
              </motion.div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        i === selectedImage ? 'border-lime' : 'border-white/[0.07] hover:border-white/[0.2]'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain p-1 bg-[#0d0d11]"
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5">
              <div>
                <div className="text-xs font-code text-white/30 uppercase tracking-wider mb-1">{product.brand}</div>
                <h1 className="font-display font-800 text-3xl sm:text-4xl text-white leading-tight mb-2">
                  {product.name}
                </h1>
                {product.shortDescription && (
                  <div className="text-sm font-code text-lime/70">{product.shortDescription}</div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={15} className={i <= Math.round(product.rating) ? 'text-amber fill-amber' : 'text-white/15'} />
                  ))}
                </div>
                <span className="font-code text-sm text-white/60">{product.rating}</span>
                <span className="text-white/25">·</span>
                <span className="text-sm text-white/40 font-ui">{product.reviewCount.toLocaleString()} reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3">
                <div className="font-code font-700 text-4xl text-white">${product.price.toLocaleString()}</div>
                {product.originalPrice && (
                  <>
                    <div className="font-code text-lg text-white/25 line-through mb-1">${product.originalPrice.toLocaleString()}</div>
                    <div className="mb-1 px-2 py-0.5 rounded-md bg-red-500/15 text-red-400 text-xs font-code border border-red-500/25">
                      Save ${product.originalPrice - product.price}
                    </div>
                  </>
                )}
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="text-xs font-code text-white/40 uppercase tracking-wider mb-2">
                    Color: <span className="text-white/70">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-ui transition-all border ${
                          selectedColor === color
                            ? 'border-lime text-lime bg-lime/10'
                            : 'border-white/[0.1] text-white/50 hover:text-white hover:border-white/[0.25]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage */}
              {product.storage && product.storage.length > 0 && (
                <div>
                  <div className="text-xs font-code text-white/40 uppercase tracking-wider mb-2">
                    Storage: <span className="text-white/70">{selectedStorage}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.storage.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedStorage(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-code transition-all border ${
                          selectedStorage === s
                            ? 'border-lime text-lime bg-lime/10'
                            : 'border-white/[0.1] text-white/50 hover:text-white hover:border-white/[0.25]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty */}
              <div className="flex items-center gap-3">
                <div className="text-xs font-code text-white/40 uppercase tracking-wider">Qty:</div>
                <div className="flex items-center gap-2 kure-surface rounded-xl px-3 py-2 border border-white/[0.07]">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-white/50 hover:text-white transition-colors w-5 text-center">−</button>
                  <span className="font-code font-600 text-white w-6 text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="text-white/50 hover:text-white transition-colors w-5 text-center">+</button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl btn-lime font-ui font-700 text-base disabled:opacity-40"
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </>
                  )}
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-14 h-14 rounded-2xl kure-surface border border-white/[0.07] flex items-center justify-center transition-colors ${
                    inWishlist(product.id) ? 'text-red-400 border-red-400/30 bg-red-400/5' : 'text-white/50 hover:text-red-400'
                  }`}
                >
                  <Heart size={20} className={inWishlist(product.id) ? 'fill-current' : ''} />
                </button>
                <button
                  onClick={() => toggleCompare(product)}
                  className={`w-14 h-14 rounded-2xl kure-surface border border-white/[0.07] flex items-center justify-center transition-colors ${
                    inCompare(product.id) ? 'text-amber border-amber/30 bg-amber/5' : 'text-white/50 hover:text-amber'
                  }`}
                >
                  <GitCompare size={18} />
                </button>
              </div>

              {/* Buy now */}
              <Link
                to="/checkout"
                onClick={() => addItem(product, { color: selectedColor, storage: selectedStorage })}
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl kure-surface text-white/70 hover:text-white font-ui font-600 transition-colors border border-white/[0.07] hover:border-white/[0.15]"
              >
                <Zap size={16} className="text-lime" />
                Buy Now — Express Checkout
              </Link>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Shield, text: '1 Year Warranty' },
                  { icon: Truck, text: 'Free Delivery' },
                  { icon: RotateCcw, text: '30-Day Returns' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1.5 p-3 kure-surface rounded-xl text-center">
                    <Icon size={16} className="text-lime" />
                    <span className="text-[10px] font-ui text-white/50 leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display font-700 text-2xl text-white mb-5">Specifications</h2>
              <div className="kure-card rounded-2xl divide-y divide-white/[0.06]">
                {Object.entries(product.specs).filter(([, v]) => v).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-4 px-5 py-3.5">
                    <div className="text-[11px] font-code text-white/30 uppercase tracking-wider w-28 shrink-0 pt-0.5 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div className="text-sm font-ui text-white/80">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-700 text-2xl text-white mb-5">Description</h2>
              <div className="kure-card rounded-2xl p-6">
                <p className="text-base text-white/65 font-ui leading-relaxed">{product.description}</p>
                {product.colors && (
                  <div className="mt-5 pt-5 border-t border-white/[0.06]">
                    <div className="text-xs font-code text-white/30 uppercase tracking-wider mb-2">Available Colours</div>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((c) => (
                        <span key={c} className="px-2.5 py-1 rounded-full kure-surface text-xs font-ui text-white/50 border border-white/[0.07]">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-16">
            <h2 className="font-display font-700 text-2xl text-white mb-6">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {productReviews.map((r) => (
                <div key={r.id} className="kure-card rounded-2xl p-5">
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={13} className={i <= r.rating ? 'text-amber fill-amber' : 'text-white/15'} />
                    ))}
                  </div>
                  <p className="text-sm text-white/65 font-ui leading-relaxed mb-4">"{r.review}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-lime/15 border border-lime/20 flex items-center justify-center text-xs font-display font-700 text-lime">
                      {r.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-ui font-600 text-white">{r.name}</div>
                      <div className="text-[10px] font-ui text-white/30">{r.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display font-700 text-2xl text-white mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
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
