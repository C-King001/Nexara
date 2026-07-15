import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import StoreNavbar from '@/components/store/StoreNavbar';
import StoreFooter from '@/components/store/StoreFooter';
import CartDrawer from '@/components/store/CartDrawer';
import AIAssistant from '@/components/store/AIAssistant';
import ProductCard from '@/components/store/ProductCard';
import FilterSidebar, { type FilterState } from '@/components/store/FilterSidebar';
import { products } from '@/data/products';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
    brands: searchParams.get('brand') ? [searchParams.get('brand')!] : [],
    priceMin: 0,
    priceMax: 2000,
    inStockOnly: false,
    onSaleOnly: searchParams.get('sale') === 'true',
    sort: 'featured',
  });

  const filtered = useMemo(() => {
    const q = searchParams.get('q')?.toLowerCase() ?? '';

    let result = products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
      if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      if (filters.onSaleOnly && !p.isOnSale) return false;
      if (searchParams.get('featured') === 'true' && !p.isFeatured) return false;
      if (searchParams.get('bestseller') === 'true' && !p.isBestSeller) return false;
      return true;
    });

    if (filters.sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    else if (filters.sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    else if (filters.sort === 'newest') result = [...result].filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));

    return result;
  }, [filters, searchParams]);

  const title = searchParams.get('q')
    ? `Search: "${searchParams.get('q')}"`
    : filters.categories.length === 1
    ? filters.categories[0].charAt(0).toUpperCase() + filters.categories[0].slice(1) + 's'
    : 'All Products';

  return (
    <div className="min-h-screen bg-[#070709]">
      <StoreNavbar />

      <div className="pt-16">
        {/* Page header */}
        <div className="border-b border-white/[0.07] bg-[#0a0a0d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-xs font-code text-lime/60 uppercase tracking-[0.2em] mb-2">SDK STORE</div>
              <h1 className="font-display font-800 text-3xl sm:text-4xl text-white">{title}</h1>
              <p className="text-sm text-white/40 font-ui mt-1">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile filter bar */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl kure-surface text-sm font-ui text-white/60 hover:text-white border border-white/[0.07]"
            >
              <SlidersHorizontal size={15} />
              Filters
              {(filters.categories.length + filters.brands.length) > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-lime text-black text-[9px] font-code font-700">
                  {filters.categories.length + filters.brands.length}
                </span>
              )}
            </button>
            <div className="flex items-center gap-1">
              <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-lime/15 text-lime' : 'text-white/40 hover:text-white'}`}>
                <Grid3X3 size={16} />
              </button>
              <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-lime/15 text-lime' : 'text-white/40 hover:text-white'}`}>
                <LayoutList size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              mobileOpen={mobileFiltersOpen}
              onMobileClose={() => setMobileFiltersOpen(false)}
            />

            {/* Products */}
            <div className="flex-1 min-w-0">
              {/* Desktop toolbar */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <span className="text-sm text-white/40 font-ui">{filtered.length} results</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-lime/15 text-lime' : 'text-white/40 hover:text-white'}`}>
                    <Grid3X3 size={16} />
                  </button>
                  <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-lime/15 text-lime' : 'text-white/40 hover:text-white'}`}>
                    <LayoutList size={16} />
                  </button>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="text-5xl">🔍</div>
                  <div className="font-display font-700 text-white text-xl">No products found</div>
                  <p className="text-sm text-white/40 font-ui">Try adjusting your filters or search terms.</p>
                  <button
                    onClick={() => setFilters({ categories: [], brands: [], priceMin: 0, priceMax: 2000, inStockOnly: false, onSaleOnly: false, sort: 'featured' })}
                    className="px-4 py-2 rounded-xl btn-lime text-sm font-ui font-600"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className={
                  view === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'
                    : 'flex flex-col gap-4'
                }>
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <StoreFooter />
      <CartDrawer />
      <AIAssistant />
    </div>
  );
}
