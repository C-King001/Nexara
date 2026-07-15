import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0a0a0d] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="text-xs font-code text-lime/60 uppercase tracking-[0.2em] mb-3">── REVIEWS</div>
          <h2 className="font-display font-800 text-4xl sm:text-5xl text-white mb-3">
            Real People, <span className="text-lime">Real Reviews</span>
          </h2>
          <p className="text-sm text-white/40 font-ui">
            Trusted by thousands of happy customers across Ghana
          </p>

          {/* Aggregate */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} className="text-amber fill-amber" />
              ))}
            </div>
            <span className="font-code font-700 text-white text-lg">4.9</span>
            <span className="text-sm text-white/40 font-ui">from 12,400+ reviews</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`kure-card rounded-2xl p-6 flex flex-col gap-4 hover:border-white/[0.13] transition-all ${
                i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Quote icon */}
              <Quote size={24} className="text-lime/25" />

              {/* Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={13} className={s <= t.rating ? 'text-amber fill-amber' : 'text-white/15'} />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-white/70 font-ui leading-relaxed flex-1">
                "{t.review}"
              </p>

              {/* Product tag */}
              <div className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full bg-lime/8 border border-lime/15 text-[10px] font-code text-lime/70">
                Purchased: {t.product}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lime/30 to-lime/10 border border-lime/20 flex items-center justify-center font-display font-700 text-sm text-lime">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-ui font-600 text-white">{t.name}</div>
                  <div className="text-xs text-white/35 font-ui">{t.role}</div>
                </div>
                <div className="ml-auto text-[10px] font-code text-white/20">{t.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
