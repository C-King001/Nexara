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
    <section ref={ref} className="py-12 px-6 border-y border-border bg-surface-1/60">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-dim tracking-widest uppercase text-center mb-8"
        >
          Real results from real systems
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="text-center px-6"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-dim tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofStrip;
