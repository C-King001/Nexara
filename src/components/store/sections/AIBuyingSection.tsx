import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const prompts = [
  { q: 'Best phone for photography under $800?', icon: '📸' },
  { q: 'Which earbuds have the best noise cancellation?', icon: '🎧' },
  { q: 'Compare iPhone 15 Pro vs Galaxy S24 Ultra', icon: '⚡' },
  { q: 'What phone should a first-time buyer get?', icon: '💡' },
];

const features = [
  { icon: '🎯', title: 'Personalised Picks', desc: 'Tailored recommendations based on your budget and needs.' },
  { icon: '⚡', title: 'Instant Compare', desc: 'Side-by-side comparisons of any two phones in seconds.' },
  { icon: '💬', title: 'Natural Language', desc: 'Ask in plain English — no tech jargon required.' },
  { icon: '🛍️', title: 'Shop From Chat', desc: 'Add to cart directly from the AI conversation.' },
];

export default function AIBuyingSection() {
  const [typed, setTyped] = useState('');

  return (
    <section className="py-24 bg-[#070709] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-8"
        style={{ background: 'radial-gradient(circle, rgba(184,255,0,0.15), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy + features */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-lime flex items-center justify-center">
                <Sparkles size={14} className="text-black" />
              </div>
              <span className="text-xs font-code text-lime/70 uppercase tracking-[0.2em]">── AI ASSISTANT</span>
            </div>

            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-4">
              Let AI Find Your <br />
              <span className="text-lime">Perfect Phone</span>
            </h2>
            <p className="text-base text-white/50 font-ui leading-relaxed mb-8">
              Our intelligent shopping assistant understands your lifestyle, budget, and priorities — then matches you with the best device. No more overwhelm, no more guesswork.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3 p-4 kure-card rounded-xl">
                  <span className="text-2xl shrink-0">{f.icon}</span>
                  <div>
                    <div className="font-ui font-600 text-white text-sm mb-1">{f.title}</div>
                    <div className="text-xs text-white/40 font-ui leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mock AI chat UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="kure-card rounded-3xl overflow-hidden border border-lime/10"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-lime/5 border-b border-white/[0.07]">
              <div className="w-9 h-9 rounded-xl bg-lime flex items-center justify-center">
                <Bot size={18} className="text-black" />
              </div>
              <div>
                <div className="font-display font-700 text-white text-sm">Kure's AI Assistant</div>
                <div className="text-[10px] text-lime font-code">● Always online</div>
              </div>
            </div>

            {/* Chat body */}
            <div className="px-5 py-5 space-y-4 min-h-[240px]">
              {/* Assistant message */}
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-lime/15 border border-lime/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={12} className="text-lime" />
                </div>
                <div className="kure-surface rounded-2xl rounded-tl-sm px-4 py-3 text-sm font-ui text-white/80 leading-relaxed max-w-[85%]">
                  Hi! Tell me your budget and what you use your phone for most — I'll find your perfect match. 🎯
                </div>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 pl-9">
                {prompts.map((p) => (
                  <button
                    key={p.q}
                    onClick={() => setTyped(p.q)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full kure-surface text-[11px] font-ui text-white/50 hover:text-lime border border-white/[0.07] hover:border-lime/30 transition-colors"
                  >
                    <span>{p.icon}</span>
                    <span className="line-clamp-1">{p.q}</span>
                  </button>
                ))}
              </div>

              {/* User typed message */}
              <AnimatePresence>
                {typed && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="bg-lime/15 border border-lime/20 rounded-2xl rounded-tr-sm px-4 py-3 text-sm font-ui text-white max-w-[85%]">
                      {typed}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input area */}
            <div className="px-5 pb-5">
              <div className="flex gap-2 items-center kure-surface rounded-xl px-4 py-3 border border-white/[0.07]">
                <input
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  placeholder="Ask about any phone or accessory…"
                  className="flex-1 bg-transparent text-sm font-ui text-white placeholder-white/25 outline-none"
                />
                <div className="w-8 h-8 rounded-lg btn-lime flex items-center justify-center shrink-0">
                  <Zap size={14} />
                </div>
              </div>
              <p className="text-[10px] text-white/25 font-ui mt-2 text-center">
                Powered by AI · Available 24/7 · No account needed
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
