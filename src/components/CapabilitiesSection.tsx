import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const systems = [
  {
    id: "01",
    tag: "The Inbound Lead Engine",
    title: "AI Concierge",
    description:
      "Captures leads from ads, websites, and DMs the moment they arrive. Extracts key details, logs them into your CRM, and replies within seconds — so your prospect never cools off and never goes to a competitor.",
    outcome: "No more cold leads from slow replies.",
  },
  {
    id: "02",
    tag: "The Follow-Up Engine",
    title: "Profit Protector",
    description:
      "A system that tracks exactly who hasn't replied in 24 or 48 hours and intelligently sends follow-up messages. It chases cold leads automatically so you don't have to manually track every conversation.",
    outcome: "Revenue you were leaving on the table — captured.",
  },
  {
    id: "03",
    tag: "The Post-Sale Hub",
    title: "Onboarding Automation",
    description:
      "Once a deal is closed, this automatically sends document upload forms, processes the files into cloud storage, and notifies the relevant team member. It eliminates the manual data entry that drains a company's time.",
    outcome: "Onboard twice the clients. Hire nobody new.",
  },
];

const CapabilitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="capabilities" ref={ref} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// The System</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            The 3-Part Operational System
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We don't build isolated automations. We build a complete client lifecycle pipeline
            that captures, nurtures, and converts — without human bottlenecks.
          </p>
        </motion.div>

        <div className="space-y-0">
          {systems.map((system, i) => (

            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="group border-b border-border py-10 md:py-12 grid md:grid-cols-[80px_1fr_1fr] gap-4 md:gap-10 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col items-start">
                <span className="font-mono text-sm text-primary/50 group-hover:text-primary transition-colors mb-1">
                  {system.id}
                </span>
                <span className="font-mono text-xs text-dim tracking-wide">{system.tag}</span>
              </div>

              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground group-hover:text-gradient transition-all mb-3">
                  {system.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {system.description}
                </p>
              </div>

              <div className="flex items-start md:items-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 group-hover:bg-primary/10 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <p className="font-mono text-xs text-primary">{system.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How It Works / Offer Entry */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 module-border bg-surface-1 p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// How We Work</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              From audit to revenue — in 3 steps
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "System Audit", desc: "We map your current lead journey in a free 15-minute call — and find exactly where money is slipping through." },
              { step: "02", title: "Revenue Blueprint", desc: "We design your custom 3-part system: inbound capture, follow-up engine, and post-sale hub." },
              { step: "03", title: "Build & Deploy", desc: "We build, test, and hand over a fully operational system. You start capturing revenue you were leaving behind." },
            ].map((item, i) => (
              <div key={item.step} className="flex flex-col gap-3">
                <span className="font-mono text-3xl font-bold text-primary/20">{item.step}</span>
                <h4 className="font-display font-semibold text-foreground">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-lg shadow-glow hover:shadow-[0_0_50px_-5px_hsl(170_100%_45%_/_0.5)] transition-shadow"
            >
              Start with a Free Audit
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="mt-3 font-mono text-xs text-dim">15 min · No pitch · Just clarity</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CapabilitiesSection;
