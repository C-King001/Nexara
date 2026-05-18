import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const without = [
  "More leads = more chaos",
  "Manual follow-ups = lost deals",
  "Growth breaks everything",
  "You ARE the bottleneck",
];

const with_ = [
  "Leads auto-captured & routed",
  "Follow-ups happen in your sleep",
  "Growth is load-tested",
  "The system IS the team",
];

const InsightSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.03), transparent 65%)" }} />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// The Difference</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            The System Determines the Scale
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 relative">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--border)) 15%, hsl(var(--border)) 85%, transparent)" }} />

          {/* Without */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="p-8 rounded-xl border relative overflow-hidden"
            style={{ borderColor: "hsl(var(--destructive) / 0.25)", background: "hsl(var(--destructive) / 0.04)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px]" style={{ background: "hsl(var(--destructive) / 0.06)" }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ borderColor: "hsl(var(--destructive) / 0.4)", background: "hsl(var(--destructive) / 0.1)" }}>
                  <span className="text-destructive text-xs font-bold">✕</span>
                </div>
                <span className="font-mono text-xs text-destructive tracking-widest uppercase">Without Systems</span>
              </div>
              <div className="space-y-5">
                {without.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-destructive font-mono text-sm mt-0.5 flex-shrink-0">✕</span>
                    <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t" style={{ borderColor: "hsl(var(--destructive) / 0.15)" }}>
                <p className="font-display font-bold text-xl" style={{ color: "hsl(var(--destructive) / 0.8)" }}>Chaos compounds.</p>
              </div>
            </div>
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="p-8 rounded-xl border relative overflow-hidden"
            style={{ borderColor: "hsl(var(--primary) / 0.25)", background: "hsl(var(--primary) / 0.04)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px]" style={{ background: "hsl(var(--primary) / 0.08)" }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border border-glow" style={{ background: "hsl(var(--primary) / 0.1)" }}>
                  <span className="text-primary text-xs font-bold">→</span>
                </div>
                <span className="font-mono text-xs text-primary tracking-widest uppercase">With Revenue Systems</span>
              </div>
              <div className="space-y-5">
                {with_.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-primary font-mono text-sm mt-0.5 flex-shrink-0">→</span>
                    <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-primary/15">
                <p className="font-display font-bold text-xl text-gradient">Revenue scales.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
