import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, Zap } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <section className="py-20 bg-[#070709] relative overflow-hidden">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(184,255,0,0.07), transparent 65%)',
      }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-6">
            <Mail size={24} className="text-lime" />
          </div>

          <h2 className="font-display font-800 text-4xl sm:text-5xl text-white mb-3 leading-tight">
            Get Exclusive <span className="text-lime">Deals First</span>
          </h2>
          <p className="text-white/45 font-ui text-base mb-8">
            Subscribe to unlock early access to flash sales, price drops, and new arrivals before anyone else.
          </p>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: '⚡', text: 'Early Flash Sales' },
              { icon: '📉', text: 'Price Drop Alerts' },
              { icon: '📱', text: 'New Arrival Drops' },
              { icon: '🎁', text: '10% Off First Order' },
            ].map((perk) => (
              <div key={perk.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full kure-surface text-xs font-ui text-white/50 border border-white/[0.07]">
                <span>{perk.icon}</span>
                {perk.text}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-lime/15 border border-lime/30 flex items-center justify-center">
                  <CheckCircle size={28} className="text-lime" />
                </div>
                <div className="font-display font-700 text-white text-xl">You're in!</div>
                <p className="text-sm text-white/45 font-ui">Check your inbox for a 10% discount code.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="flex-1 flex items-center gap-2 kure-card rounded-xl px-4 py-3 border border-white/[0.09] focus-within:border-lime/30 transition-colors">
                  <Mail size={16} className="text-white/25 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-transparent text-sm font-ui text-white placeholder-white/25 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-lime font-ui font-700 text-sm whitespace-nowrap disabled:opacity-70"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                    >
                      <Zap size={16} />
                    </motion.div>
                  ) : (
                    <>
                      <Zap size={14} className="fill-black" />
                      Subscribe & Save 10%
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-[11px] text-white/20 font-ui mt-4">
            No spam, ever. Unsubscribe in one click. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
