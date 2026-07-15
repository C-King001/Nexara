import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { categories } from '@/data/products';

export interface FilterState {
  categories: string[];
  brands: string[];
  priceMin: number;
  priceMax: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sort: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const brands = ['Apple', 'Samsung', 'Google', 'Sony', 'OnePlus', 'Xiaomi', 'Anker', 'OtterBox', 'Spigen', 'ZAGG'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

function SidebarContent({ filters, onChange }: { filters: FilterState; onChange: (f: FilterState) => void }) {
  function toggleCategory(id: string) {
    const next = filters.categories.includes(id)
      ? filters.categories.filter((c) => c !== id)
      : [...filters.categories, id];
    onChange({ ...filters, categories: next });
  }

  function toggleBrand(name: string) {
    const next = filters.brands.includes(name)
      ? filters.brands.filter((b) => b !== name)
      : [...filters.brands, name];
    onChange({ ...filters, brands: next });
  }

  const hasFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.inStockOnly ||
    filters.onSaleOnly ||
    filters.priceMin > 0 ||
    filters.priceMax < 2000;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-lime" />
          <span className="font-display font-700 text-white">Filters</span>
        </div>
        {hasFilters && (
          <button
            onClick={() => onChange({ categories: [], brands: [], priceMin: 0, priceMax: 2000, inStockOnly: false, onSaleOnly: false, sort: 'featured' })}
            className="text-xs font-ui text-lime/70 hover:text-lime transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <div className="text-[10px] font-code text-white/30 uppercase tracking-wider mb-3">Sort By</div>
        <div className="flex flex-col gap-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, sort: opt.value })}
              className={`text-left px-3 py-2 rounded-lg text-sm font-ui transition-colors ${
                filters.sort === opt.value
                  ? 'bg-lime/15 text-lime border border-lime/25'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <div className="text-[10px] font-code text-white/30 uppercase tracking-wider mb-3">Category</div>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-ui transition-colors ${
                filters.categories.includes(cat.id)
                  ? 'bg-lime/15 text-lime border border-lime/25'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <div className="text-[10px] font-code text-white/30 uppercase tracking-wider mb-3">Brand</div>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => toggleBrand(brand)}
              className={`px-3 py-1.5 rounded-lg text-xs font-ui transition-colors border ${
                filters.brands.includes(brand)
                  ? 'bg-lime/15 text-lime border-lime/30'
                  : 'kure-surface text-white/50 hover:text-white border-white/[0.07]'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <div className="text-[10px] font-code text-white/30 uppercase tracking-wider mb-3">Price Range</div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.priceMin}
            onChange={(e) => onChange({ ...filters, priceMin: Number(e.target.value) })}
            placeholder="Min"
            className="flex-1 kure-surface rounded-lg px-3 py-2 text-sm font-code text-white outline-none border border-white/[0.07] focus:border-lime/30"
          />
          <span className="text-white/30 font-ui">—</span>
          <input
            type="number"
            value={filters.priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
            placeholder="Max"
            className="flex-1 kure-surface rounded-lg px-3 py-2 text-sm font-code text-white outline-none border border-white/[0.07] focus:border-lime/30"
          />
        </div>
        {/* Quick price chips */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {[['Under $100', 0, 100], ['Under $500', 0, 500], ['$500+', 500, 2000]].map(([label, min, max]) => (
            <button
              key={String(label)}
              onClick={() => onChange({ ...filters, priceMin: Number(min), priceMax: Number(max) })}
              className="px-2 py-1 rounded text-[10px] font-code kure-surface text-white/40 hover:text-lime border border-white/[0.06] hover:border-lime/25 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-2">
        {[
          { key: 'inStockOnly' as const, label: 'In Stock Only' },
          { key: 'onSaleOnly' as const, label: 'On Sale' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange({ ...filters, [key]: !filters[key] })}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors border ${
              filters[key]
                ? 'bg-lime/10 border-lime/25 text-lime'
                : 'kure-surface border-white/[0.07] text-white/50 hover:text-white'
            }`}
          >
            <span className="text-sm font-ui">{label}</span>
            <div className={`w-9 h-5 rounded-full transition-all relative ${filters[key] ? 'bg-lime' : 'bg-white/10'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-black transition-all ${filters[key] ? 'left-4' : 'left-0.5'}`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, mobileOpen, onMobileClose }: FilterSidebarProps) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 kure-card rounded-2xl p-5">
          <SidebarContent filters={filters} onChange={onChange} />
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-[#0f0f13] border-r border-white/[0.07] p-5 overflow-y-auto scrollbar-hide lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display font-700 text-white text-lg">Filters</span>
                <button onClick={onMobileClose} className="text-white/40 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <SidebarContent filters={filters} onChange={onChange} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
