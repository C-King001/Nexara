import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  { label: "LEADS COMING IN", status: "active", icon: "→" },
  { label: "FOLLOW-UP SYSTEM", status: "broken", icon: "✕" },
  { label: "REVENUE CAPTURED", status: "leaking", icon: "↓" },
];

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// The Problem</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Attention ≠ Revenue
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            You're generating leads. You're getting traffic. But somewhere between 
            the first click and the closed deal, money is slipping through the cracks.
          </p>
        </motion.div>

        {/* System status visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="module-border bg-surface-1 p-8 md:p-12"
        >
          <div className="flex items-center gap-2 mb-8">
            <span className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
            <span className="font-mono text-xs text-destructive tracking-wider">SYSTEM STATUS: CRITICAL</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                className={`p-6 rounded-lg border ${
                  item.status === "broken"
                    ? "border-destructive/40 bg-destructive/5"
                    : item.status === "leaking"
                    ? "border-accent/40 bg-accent/5"
                    : "border-primary/30 bg-primary/5"
                }`}
              >
                <div className="font-mono text-2xl mb-3">{item.icon}</div>
                <div className="font-mono text-xs text-muted-foreground tracking-wider mb-2">{item.label}</div>
                <div className={`font-display font-semibold text-sm uppercase tracking-wider ${
                  item.status === "broken" ? "text-destructive" :
                  item.status === "leaking" ? "text-accent" : "text-primary"
                }`}>
                  {item.status}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="font-mono text-sm text-dim text-center">
              A broken backend doesn't just lose leads — it scales chaos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
