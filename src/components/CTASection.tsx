import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "hsl(var(--surface-2) / 0.5)" }} />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: 700, height: 400, borderRadius: "50%", background: "hsl(var(--primary) / 0.07)", filter: "blur(100px)" }}
      />

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

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6 leading-relaxed">
            We'll map your journey, find the bottlenecks, and build a backend
            that actually supports your ambition.
          </p>

          <p className="font-display font-semibold text-foreground text-lg max-w-xl mx-auto mb-12">
            Free 30-minute audit. We build it first. You pay after 7 days of proven results.
          </p>

          <motion.a
            href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-12 py-5 font-display font-bold text-lg rounded-xl text-primary-foreground cta-pulse"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(190 100% 50%))" }}
          >
            Book a 30-Minute System Audit
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>

          <p className="mt-8 font-mono text-xs text-dim">
            30 min · No pitch · Just clarity
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
