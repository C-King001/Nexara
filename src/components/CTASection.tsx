import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" ref={ref} className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-surface-2/50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />

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

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            We'll map your journey, find the bottlenecks, and build a backend
            that actually supports your ambition.
          </p>

          <motion.a
            href="https://calendly.com/faithfulnyama/30min"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-display font-bold text-lg rounded-lg shadow-glow hover:shadow-[0_0_50px_-5px_hsl(170_100%_45%_/_0.5)] transition-shadow"
          >
            Book a 15-Minute System Audit
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>

          <p className="mt-6 font-mono text-xs text-dim">
            15 min · No pitch · Just clarity
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
