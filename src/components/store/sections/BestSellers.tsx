import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBestSellers } from '@/data/products';
import ProductCard from '@/components/store/ProductCard';

export default function BestSellers() {
  const items = getBestSellers();

  return (
    <section className="py-24 bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs font-code text-lime/60 uppercase tracking-[0.2em] mb-3">── BEST SELLERS</div>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight">
              What Everyone <br />
              <span className="text-lime">Is Buying</span>
            </h2>
          </div>
          <Link
            to="/catalog?bestseller=true"
            className="hidden md:flex items-center gap-2 text-sm font-ui text-white/50 hover:text-white transition-colors"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="flex md:hidden justify-center mt-8">
          <Link
            to="/catalog?bestseller=true"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl kure-surface text-sm font-ui text-white/60 hover:text-white transition-colors"
          >
            View All Best Sellers <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
