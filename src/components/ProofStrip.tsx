import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const AnimatedCounter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 35, damping: 12 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => {
    if (inView) spring.set(to);
  }, [inView, to, spring]);
  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
    </span>
  );
};

const stats = [
  { display: "60s", label: "Missed Call → Text Reply", animate: false },
  { display: "0", label: "Manual Follow-ups at Kaminskiy Care & Repair", animate: false },
  { display: null, value: 100, suffix: "%", label: "Follow-ups Running Automatically", animate: true },
  { display: null, value: 10, suffix: "", label: "Workflows Powering the KCR Pipeline", animate: true },
];

const ProofStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-16 px-6 overflow-hidden" style={{ background: "hsl(var(--surface-1))" }}>
      {/* Gradient border lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent 0%, hsl(var(--primary) / 0.5) 40%, hsl(var(--primary) / 0.5) 60%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent 0%, hsl(var(--primary) / 0.5) 40%, hsl(var(--primary) / 0.5) 60%, transparent 100%)" }} />

      {/* Center glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.05), transparent 65%)" }} />

      <div className="max-w-5xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">Systems Online · Real Results</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="relative text-center px-4 py-2"
            >
              {/* Vertical glowing divider */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block"
                  style={{
                    width: 1,
                    height: "55%",
                    background: "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.35), transparent)",
                  }}
                />
              )}

              <div
                className="font-display font-bold text-gradient mb-2 tabular-nums"
                style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", lineHeight: 1 }}
              >
                {stat.animate ? (
                  <AnimatedCounter to={stat.value!} suffix={stat.suffix} />
                ) : (
                  stat.display
                )}
              </div>
              <div className="font-mono text-xs text-dim tracking-wide leading-snug max-w-[140px] mx-auto">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofStrip;
