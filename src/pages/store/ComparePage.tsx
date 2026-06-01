import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitCompare, X, Plus, Check } from 'lucide-react';
import StoreNavbar from '@/components/store/StoreNavbar';
import StoreFooter from '@/components/store/StoreFooter';
import CartDrawer from '@/components/store/CartDrawer';
import AIAssistant from '@/components/store/AIAssistant';
import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';

const specKeys = [
  { key: 'display', label: 'Display' },
  { key: 'chip', label: 'Processor' },
  { key: 'camera', label: 'Camera' },
  { key: 'battery', label: 'Battery' },
  { key: 'ram', label: 'RAM' },
  { key: 'storage', label: 'Storage' },
  { key: 'weight', label: 'Weight' },
  { key: 'os', label: 'OS' },
  { key: 'connectivity', label: 'Connectivity' },
  { key: 'waterResistance', label: 'Water Resistance' },
];

export default function ComparePage() {
  const { items, toggle, clear } = useCompare();
  const { addItem } = useCart();

  const slots = [...items, ...Array(Math.max(0, 3 - items.length)).fill(null)];

  return (
    <div className="min-h-screen bg-[#070709]">
      <StoreNavbar />
      <div className="pt-16">
        <div className="border-b border-white/[0.07] bg-[#0a0a0d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GitCompare size={20} className="text-lime" />
                <h1 className="font-display font-800 text-3xl text-white">Compare Products</h1>
              </div>
              <p className="text-sm text-white/40 font-ui">Compare up to 3 devices side by side</p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clear}
                className="flex items-center gap-1.5 text-sm font-ui text-white/40 hover:text-red-400 transition-colors"
              >
                <X size={15} /> Clear All
              </button>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5">
              <div className="w-20 h-20 rounded-3xl kure-surface flex items-center justify-center">
                <GitCompare size={36} className="text-white/20" />
              </div>
              <div className="text-center">
                <h2 className="font-display font-700 text-2xl text-white mb-2">Nothing to compare yet</h2>
                <p className="text-sm text-white/40 font-ui">Browse products and tap the compare icon to add up to 3 items.</p>
              </div>
              <Link to="/catalog" className="flex items-center gap-2 px-6 py-3 rounded-xl btn-lime font-ui font-700">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="min-w-[640px]">
              {/* Product headers */}
              <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `200px repeat(3, 1fr)` }}>
                <div /> {/* spacer */}
                {slots.map((product, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`kure-card rounded-2xl overflow-hidden ${!product ? 'border-dashed opacity-50' : ''}`}
                  >
                    {product ? (
                      <div className="relative">
                        <button
                          onClick={() => toggle(product)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full glass flex items-center justify-center text-white/40 hover:text-red-400 transition-colors z-10"
                        >
                          <X size={12} />
                        </button>
                        <div className="bg-[#0d0d11] aspect-square flex items-center justify-center p-6">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.1'; }}
                          />
                        </div>
                        <div className="p-4">
                          <div className="text-[10px] font-code text-white/30 uppercase tracking-wider">{product.brand}</div>
                          <h3 className="font-ui font-700 text-white text-sm leading-snug mt-0.5">{product.name}</h3>
                          <div className="font-code font-700 text-lime text-lg mt-2">${product.price.toLocaleString()}</div>
                          <button
                            onClick={() => addItem(product)}
                            className="mt-3 w-full py-2 rounded-lg btn-lime text-xs font-ui font-700"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Link to="/catalog" className="flex flex-col items-center justify-center gap-2 py-12 px-4 text-center">
                        <Plus size={24} className="text-white/30" />
                        <span className="text-sm font-ui text-white/30">Add Product</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Spec rows */}
              <div className="kure-card rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
                {specKeys.map(({ key, label }) => {
                  const vals = slots.map((p) => (p as Record<string, unknown> | null)?.[key] as string | undefined ?? null);
                  const allSame = vals.filter(Boolean).every((v) => v === vals.find(Boolean));

                  return (
                    <div key={key} className="grid gap-4 px-4 py-3" style={{ gridTemplateColumns: `200px repeat(3, 1fr)` }}>
                      <div className="text-xs font-code text-white/35 uppercase tracking-wider flex items-center">{label}</div>
                      {slots.map((product, i) => {
                        const specVal = (product as Record<string, unknown> | null)?.specs as Record<string, string> | undefined;
                        const val = specVal?.[key];
                        return (
                          <div key={i} className={`text-sm font-ui ${val ? 'text-white/80' : 'text-white/20'} flex items-center gap-1.5`}>
                            {val ? (
                              <>
                                {!allSame && i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0" />}
                                {val}
                              </>
                            ) : '—'}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Price row */}
                <div className="grid gap-4 px-4 py-4 bg-white/[0.02]" style={{ gridTemplateColumns: `200px repeat(3, 1fr)` }}>
                  <div className="text-xs font-code text-white/35 uppercase tracking-wider flex items-center">Price</div>
                  {slots.map((product, i) => (
                    <div key={i} className="font-code font-700 text-lime text-lg">
                      {product ? `$${(product as { price: number }).price.toLocaleString()}` : '—'}
                    </div>
                  ))}
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
