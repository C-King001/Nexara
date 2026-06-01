import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-xs font-code text-lime/60 uppercase tracking-[0.2em] mb-3">── SHOP BY CATEGORY</div>
          <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight">
            Find Your <span className="text-lime">Perfect Match</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                to={`/catalog?category=${cat.id}`}
                className={`group relative flex flex-col gap-3 p-5 kure-card rounded-2xl hover:border-lime/25 transition-all duration-300 overflow-hidden ${
                  i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(ellipse at top right, rgba(184,255,0,0.04), transparent 60%)',
                  }}
                />

                <div className={`text-4xl ${i === 0 ? 'text-5xl' : ''}`}>{cat.icon}</div>
                <div>
                  <h3 className={`font-display font-700 text-white group-hover:text-lime transition-colors ${
                    i === 0 ? 'text-xl' : 'text-base'
                  }`}>
                    {cat.label}
                  </h3>
                  <p className="text-xs text-white/40 font-ui mt-0.5 leading-relaxed">{cat.description}</p>
                </div>

                <div className="flex items-center gap-1 text-xs text-lime/60 font-code group-hover:text-lime transition-colors mt-auto">
                  Shop Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shimmer" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
