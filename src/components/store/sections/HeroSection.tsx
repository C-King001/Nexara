import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Star, ShieldCheck, Truck } from 'lucide-react';

const heroProducts = [
  {
    label: 'iPhone 15 Pro Max',
    sub: 'A17 Pro · Titanium · 5× Zoom',
    price: '$1,199',
    badge: 'JUST ARRIVED',
    color: 'from-zinc-900 to-slate-900',
    accent: '#b8ff00',
    id: 'iphone-15-pro-max',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=600&fit=crop&q=80',
  },
  {
    label: 'Galaxy S24 Ultra',
    sub: '200MP · S Pen · AI · Titanium',
    price: '$1,299',
    badge: 'BESTSELLER',
    color: 'from-slate-900 to-zinc-900',
    accent: '#ff9500',
    id: 'samsung-s24-ultra',
    image: 'https://images.unsplash.com/photo-1610945415814-7a1f82fd38ab?w=500&h=600&fit=crop&q=80',
  },
  {
    label: 'Pixel 8 Pro',
    sub: 'Tensor G3 · AI Magic · 7 Years',
    price: '$999',
    badge: 'AI POWERED',
    color: 'from-zinc-900 to-neutral-900',
    accent: '#b8ff00',
    id: 'google-pixel-8-pro',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=600&fit=crop&q=80',
  },
];

const stats = [
  { value: '10K+', label: 'Products Sold' },
  { value: '4.9★', label: 'Avg. Rating' },
  { value: '48h', label: 'Max Delivery' },
  { value: '100%', label: 'Genuine' },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % heroProducts.length), 4500);
    return () => clearInterval(t);
  }, []);

  const current = heroProducts[active];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#070709] pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 transition-all duration-1000"
        style={{ background: `radial-gradient(circle, ${current.accent}, transparent)` }}
      />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-8 bg-gradient-to-br from-white/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">

          {/* Left: Copy */}
          <div>
            {/* Eyebrow */}
            <motion.div
              key={active + 'badge'}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full kure-surface border border-lime/20 text-lime text-xs font-code tracking-wider mb-6"
            >
              <Zap size={12} className="fill-lime" />
              {current.badge}
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                key={active + 'h1'}
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight"
              >
                THE FUTURE
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                key={active + 'h1b'}
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
                style={{ color: current.accent }}
              >
                IS MOBILE
              </motion.h1>
            </div>

            {/* Product name */}
            <motion.div
              key={active + 'name'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="text-xl font-display font-700 text-white">{current.label}</div>
              <div className="text-sm font-code text-white/45 mt-0.5">{current.sub}</div>
            </motion.div>

            {/* Price */}
            <motion.div
              key={active + 'price'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-code font-600 text-3xl mb-8"
              style={{ color: current.accent }}
            >
              {current.price}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                to={`/product/${current.id}`}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl btn-lime font-ui font-700 text-sm"
              >
                Shop Now
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/catalog"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl kure-surface text-white/70 hover:text-white font-ui font-600 text-sm transition-colors border border-white/[0.07] hover:border-white/[0.14]"
              >
                Browse All
              </Link>
            </motion.div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: ShieldCheck, text: '100% Genuine' },
                { icon: Truck, text: 'Fast Delivery' },
                { icon: Star, text: '4.9★ Rated' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-white/40 font-ui">
                  <Icon size={13} className="text-lime/70" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px]">
              {/* Glow behind image */}
              <div
                className="absolute inset-0 blur-3xl opacity-20 rounded-full scale-75"
                style={{ background: `radial-gradient(circle, ${current.accent}, transparent)` }}
              />

              <motion.div
                key={active + 'img'}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full h-full rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.07] animate-float"
              >
                <img
                  src={current.image}
                  alt={current.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/60 via-transparent to-transparent" />
              </motion.div>

              {/* Floating spec card */}
              <motion.div
                key={active + 'spec'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -right-6 top-1/4 glass rounded-xl px-3 py-2.5 min-w-[120px]"
              >
                <div className="text-[10px] font-code text-white/35 uppercase tracking-wider">Starting from</div>
                <div className="font-code font-700 text-base" style={{ color: current.accent }}>{current.price}</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Product switcher dots */}
        <div className="flex items-center justify-center gap-3 pb-8">
          {heroProducts.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 rounded-full font-code text-xs px-3 py-1 ${
                i === active
                  ? 'bg-lime text-black font-600'
                  : 'kure-surface text-white/40 hover:text-white'
              }`}
            >
              {p.label.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-12">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-[#070709] px-6 py-5 flex flex-col items-center gap-1">
              <div className="font-display font-800 text-2xl text-lime">{value}</div>
              <div className="text-xs text-white/40 font-ui">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
