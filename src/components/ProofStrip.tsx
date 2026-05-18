import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "24/7", label: "AI Receptionist, Every Channel" },
  { value: "0", label: "Leads Lost to Slow Response" },
  { value: "100%", label: "Follow-ups Running Automatically" },
  { value: "10", label: "Workflows Powering One Pipeline" },
];

const ProofStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-14 px-6 overflow-hidden" style={{ background: "hsl(var(--surface-1))" }}>
      {/* Top/bottom glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.4), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.4), transparent)" }} />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.04), transparent 70%)" }} />

      <div className="max-w-5xl mx-auto">
        {/* System status header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">Systems Online · Real Results</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
              className="relative text-center px-6 py-4"
            >
              {/* Vertical divider */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block"
                  style={{ width: 1, height: "60%", background: "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.3), transparent)" }}
                />
              )}
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2 tabular-nums">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-dim tracking-wide leading-relaxed">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofStrip;
