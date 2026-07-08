import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const ProofSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="proof" ref={ref} className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-surface-2/30" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// Real Client, Real Result</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            This isn't a demo. It's running right now.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="module-border bg-surface-1 p-8 md:p-12"
        >
          {/* Client attribution */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center p-2 flex-shrink-0">
              <img src="/logos/kaminskiy-logo.png" alt="Kaminskiy Care & Repair logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground">Kaminskiy Care & Repair</p>
              <p className="font-mono text-xs text-dim">Franchise sales pipeline</p>
            </div>
          </div>

          {/* Before / After */}
          <div className="grid md:grid-cols-[1fr_2px_1fr] gap-10 items-start mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="font-mono text-xs text-destructive tracking-widest uppercase block mb-3">Before</span>
              <p className="text-muted-foreground leading-relaxed">
                Franchise candidates moved through 7 different stages of evaluation, but nothing was tracked
                automatically. Follow-ups depended on someone remembering. No-shows just disappeared. The sales
                team often couldn't say exactly where a candidate stood.
              </p>
            </motion.div>

            <div className="hidden md:block w-px bg-border self-stretch" />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-3">After</span>
              <p className="text-muted-foreground leading-relaxed">
                Every candidate sits in one pipeline with full visibility, stage by stage. Follow-ups, reminders,
                and no-show recovery all fire on their own. Nothing falls through — the team just watches
                candidates move toward closed-won.
              </p>
            </motion.div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient">10</div>
              <div className="font-mono text-xs text-dim mt-1">Workflows Built</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient">7</div>
              <div className="font-mono text-xs text-dim mt-1">Pipeline Stages Covered</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient">0</div>
              <div className="font-mono text-xs text-dim mt-1">Manual Follow-ups</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/case/kcr-franchise-pipeline"
              className="font-mono text-xs text-primary hover:translate-x-1 transition-transform inline-flex items-center gap-1"
            >
              See the full breakdown →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;
