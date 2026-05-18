import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: "hsl(var(--surface-2) / 0.5)" }} />
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "hsl(var(--primary) / 0.06)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[100px]" style={{ background: "hsl(var(--primary) / 0.04)" }} />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-6">// Next Step</span>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Your business shouldn't pause
            <br />
            <span className="text-dim">just because you need to rest.</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            We'll map your journey, find the bottlenecks, and build a backend
            that actually supports your ambition.
          </p>

          {/* Animated gradient border button wrapper */}
          <div className="relative inline-block">
            <div className="absolute -inset-[2px] rounded-xl animate-gradient-spin opacity-70" style={{ background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(190 100% 50%), hsl(var(--primary)), hsl(36 90% 55%), hsl(var(--primary)))" }} />
            <motion.a
              href="https://calendly.com/faithfulnyama/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center gap-3 px-10 py-5 font-display font-bold text-lg rounded-xl"
              style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
            >
              Book a 15-Minute System Audit
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>

          <p className="mt-8 font-mono text-xs text-dim">
            15 min · No pitch · Just clarity
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
