import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const leaks = [
  {
    label: "INBOUND LEADS",
    status: "Active",
    statusColor: "text-primary",
    dot: "bg-primary",
    icon: "→",
    detail: "Traffic is flowing in",
  },
  {
    label: "FOLLOW-UP SYSTEM",
    status: "Not Found",
    statusColor: "text-destructive",
    dot: "bg-destructive",
    icon: "✕",
    detail: "No automated follow-up",
  },
  {
    label: "REVENUE CAPTURED",
    status: "Leaking",
    statusColor: "text-accent",
    dot: "bg-accent",
    icon: "↓",
    detail: "Deals cooling off daily",
  },
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
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--surface-1))" }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-5 py-4 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <span className="w-3 h-3 rounded-full bg-destructive" />
            <span className="w-3 h-3 rounded-full bg-accent" />
            <span className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--surface-3))" }} />
            <span className="font-mono text-xs text-destructive tracking-widest ml-3">● PIPELINE DIAGNOSTIC — CRITICAL</span>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-4">
              {leaks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  className={`p-6 rounded-lg border ${
                    item.status === "Not Found"
                      ? "border-destructive/30"
                      : item.status === "Leaking"
                      ? "border-accent/30"
                      : "border-primary/25"
                  }`}
                  style={{
                    background: item.status === "Not Found"
                      ? "hsl(var(--destructive) / 0.05)"
                      : item.status === "Leaking"
                      ? "hsl(36 90% 55% / 0.05)"
                      : "hsl(var(--primary) / 0.05)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dot} animate-pulse`} />
                    <span className="font-mono text-[10px] tracking-widest text-dim">{item.label}</span>
                  </div>
                  <div className="font-mono text-3xl mb-3" style={{ color: item.status === "Not Found" ? "hsl(var(--destructive))" : item.status === "Leaking" ? "hsl(36 90% 55%)" : "hsl(var(--primary))" }}>
                    {item.icon}
                  </div>
                  <div className={`font-display font-semibold text-sm uppercase tracking-wider ${item.statusColor}`}>
                    {item.status}
                  </div>
                  <div className="font-mono text-xs text-dim mt-2">{item.detail}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-mono text-sm text-dim text-center">
                A broken backend doesn't just lose leads — it <span className="text-destructive">scales chaos</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
