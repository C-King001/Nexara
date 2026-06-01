import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const brands = [
  { name: 'Apple', color: '#f0f0f0' },
  { name: 'Samsung', color: '#1428A0' },
  { name: 'Google', color: '#4285F4' },
  { name: 'Sony', color: '#f0f0f0' },
  { name: 'OnePlus', color: '#F5010C' },
  { name: 'Xiaomi', color: '#FF6900' },
  { name: 'Anker', color: '#00AEEF' },
  { name: 'OtterBox', color: '#00A6D6' },
  { name: 'Spigen', color: '#f0f0f0' },
  { name: 'ZAGG', color: '#00B0FF' },
];

const duplicated = [...brands, ...brands];

export default function BrandsSection() {
  return (
    <section className="py-20 bg-[#0a0a0d] border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <div className="text-xs font-code text-lime/60 uppercase tracking-[0.2em] mb-3">── POPULAR BRANDS</div>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-white">
            The World's Best <span className="text-lime">Brands</span>
          </h2>
        </div>
      </div>

      {/* Marquee row */}
      <div className="relative">
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-6">
            {duplicated.map((brand, i) => (
              <Link
                key={i}
                to={`/catalog?brand=${brand.name.toLowerCase()}`}
                className="group shrink-0 flex items-center gap-3 px-6 py-4 kure-card rounded-xl min-w-[160px] hover:border-white/[0.15] transition-all duration-300"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-code font-700 border"
                  style={{
                    borderColor: brand.color + '30',
                    color: brand.color,
                    background: brand.color + '15',
                  }}
                >
                  {brand.name[0]}
                </div>
                <span className="font-display font-700 text-sm text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0d] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0d] to-transparent pointer-events-none" />
      </div>

      {/* Brand grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-3">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/catalog?brand=${brand.name.toLowerCase()}`}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl kure-card hover:border-white/[0.15] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-800 text-sm"
                  style={{ color: brand.color, background: brand.color + '15' }}
                >
                  {brand.name.substring(0, 2)}
                </div>
                <span className="text-[10px] font-ui text-white/40 group-hover:text-white/70 transition-colors text-center leading-tight">
                  {brand.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
