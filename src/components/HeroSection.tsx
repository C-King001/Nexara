import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const industries = ["Plumbing", "HVAC", "Electrical", "Real Estate", "Care & Repair", "Coaching"];

const HeroSection = () => {
  const [currentIndustry, setCurrentIndustry] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndustry((prev) => (prev + 1) % industries.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[80px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glow bg-surface-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs font-mono text-primary tracking-widest uppercase">Nexara — Revenue Systems Agency</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
        >
          <span className="text-foreground">If your </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-gradient inline-block"
            >
              {industries[currentIndustry]}
            </motion.span>
          </AnimatePresence>
          <br />
          <span className="text-foreground">business doubled tomorrow,</span>
          <br />
          <span className="text-dim">would your system survive?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Most businesses are built for survival, not scale. We build the revenue infrastructure
          that lets your business run — even when you log out.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="font-mono text-xs text-dim tracking-wider uppercase mb-10"
        >
          More leads closed · Revenue recovered · Zero manual follow-ups
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-md hover:shadow-glow transition-all text-base"
          >
            Book a 30-Minute System Audit
          </a>
          <a
            href="#cases"
            className="px-8 py-4 border border-border text-foreground font-display font-medium rounded-md hover:border-primary/50 transition-colors text-base"
          >
            See Our Work
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-primary rounded-full mt-1"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
