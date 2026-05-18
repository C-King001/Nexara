import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const InsightSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" ref={ref} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// Core Insight</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            The System Determines the Scale
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bad system */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-lg border border-destructive/20 bg-destructive/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-[60px]" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                <span className="font-mono text-xs text-destructive tracking-wider uppercase">Without Systems</span>
              </div>
              <div className="space-y-4">
                {["More leads = more chaos", "Manual follow-ups = lost deals", "Growth breaks everything", "You ARE the bottleneck"].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-destructive font-mono text-sm mt-0.5">✕</span>
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-destructive/10">
                <p className="font-display font-bold text-lg text-destructive/80">Chaos scales.</p>
              </div>
            </div>
          </motion.div>

          {/* Good system */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-lg border border-primary/20 bg-primary/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-mono text-xs text-primary tracking-wider uppercase">With Revenue Systems</span>
              </div>
              <div className="space-y-4">
                {["Leads auto-captured & routed", "Follow-ups happen in your sleep", "Growth is load-tested", "The system IS the team"].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-primary font-mono text-sm mt-0.5">→</span>
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-primary/10">
                <p className="font-display font-bold text-lg text-gradient">Revenue scales.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
