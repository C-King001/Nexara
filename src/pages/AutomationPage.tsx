import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";

const techStack = ["n8n", "GoHighLevel", "Make", "Zapier", "Airtable", "OpenAI", "Webhooks"];

const systems = [
  {
    id: "01",
    tag: "The Inbound Lead Engine",
    icon: "⚡",
    title: "AI Concierge",
    description:
      "Captures leads from ads, websites, and DMs the moment they arrive. Extracts key details, logs them into your CRM, and sends a personalized reply within seconds. Your prospect never cools off, and never goes to a competitor.",
    steps: ["Lead hits your form or DM", "AI extracts contact info & intent", "CRM entry created automatically", "Personalized reply sent in < 60s"],
  },
  {
    id: "02",
    tag: "The Follow-Up Engine",
    icon: "🔄",
    title: "Profit Protector",
    description:
      "A system that tracks exactly who hasn't replied in 24 or 48 hours and intelligently sends follow-up messages across email, SMS, or WhatsApp. It chases cold leads automatically — so you don't have to.",
    steps: ["Lead enters follow-up sequence", "24h no reply → first nudge", "48h no reply → second touch", "Qualified leads flagged for human call"],
  },
  {
    id: "03",
    tag: "The Post-Sale Hub",
    icon: "🏗️",
    title: "Onboarding Automation",
    description:
      "Once a deal closes, this automatically sends document upload forms, processes the files into cloud storage, and notifies the right team member. Zero manual data entry. Zero dropped balls.",
    steps: ["Deal marked won in CRM", "Onboarding email + form sent", "Documents auto-filed to Drive", "Team notified & task assigned"],
  },
];

const caseHighlights = [
  {
    label: "Wine Consultancy",
    metric: "12+ hrs/week → 30 min",
    detail: "Manual pricing updates & email chains fully automated.",
  },
  {
    label: "Popin Launch",
    metric: "2,400+ signups captured",
    detail: "Full member onboarding pipeline — zero manual tracking.",
  },
  {
    label: "Real Estate Brokerage",
    metric: "140% lead increase",
    detail: "Auto content pipeline + CRM = 8 additional deals/month.",
  },
];

const SystemCard = ({ system, index }: { system: typeof systems[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="module-border bg-surface-1 p-8 md:p-10 hover:border-primary/40 transition-colors"
    >
      <div className="flex items-start gap-4 mb-6">
        <span className="text-3xl">{system.icon}</span>
        <div>
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-1">{system.tag}</p>
          <h3 className="font-display text-2xl font-bold text-foreground">{system.title}</h3>
        </div>
        <span className="ml-auto font-mono text-sm text-primary/40">{system.id}</span>
      </div>
      <p className="text-muted-foreground leading-relaxed mb-6">{system.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {system.steps.map((step, si) => (
          <div key={si} className="flex items-start gap-2">
            <span className="font-mono text-xs text-primary mt-0.5">{String(si + 1).padStart(2, "0")}</span>
            <p className="font-mono text-xs text-dim leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const AutomationSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

const AutomationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glow bg-surface-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-mono text-primary tracking-widest uppercase">Automation Systems</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            We build the infrastructure
            <br />
            <span className="text-gradient">your business runs on.</span>
            <br />
            <span className="text-dim text-3xl md:text-4xl">Even when you log out.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We don't "set up automations." We build operational systems — the backend that
            captures leads, chases revenue, and onboards clients without you lifting a finger.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a
              href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-md hover:shadow-glow transition-all text-base"
            >
              Book a 30-Minute System Audit
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-surface-2/50" />
        <div className="relative max-w-4xl mx-auto">
          <AutomationSection>
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// The Diagnosis</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your backend is leaking revenue.
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                You're spending thousands on ads and posting content — but your operations are manual.
                You're copying and pasting data. Losing deals because it takes 4 hours to reply.
                Hiring more people to do things software should be doing.
              </p>
            </div>

            <div className="module-border bg-surface-1 p-8 text-center">
              <p className="font-display text-xl md:text-2xl font-bold text-foreground leading-relaxed">
                "Automation does not fix broken marketing.<br />
                <span className="text-gradient">It only scales whatever already exists.</span><br />
                If your backend is broken, automation scales that failure faster."
              </p>
            </div>
          </AutomationSection>
        </div>
      </section>

      {/* The 3-Part System */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <AutomationSection>
            <div className="text-center mb-16">
              <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// The Solution</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                The 3-Part Operational System
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A complete client lifecycle pipeline. Not isolated tools. A fully connected system.
              </p>
            </div>
          </AutomationSection>

          <div className="space-y-8">
            {systems.map((system, i) => (
              <SystemCard key={system.id} system={system} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-surface-2/50" />
        <div className="relative max-w-5xl mx-auto">
          <AutomationSection>
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// Proof</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Real results. Real businesses.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {caseHighlights.map((c, i) => (
                <div key={i} className="module-border bg-surface-1 p-6 text-center">
                  <p className="font-mono text-xs text-dim uppercase tracking-widest mb-2">{c.label}</p>
                  <p className="font-display text-2xl font-bold text-gradient mb-2">{c.metric}</p>
                  <p className="text-muted-foreground text-sm">{c.detail}</p>
                </div>
              ))}
            </div>
          </AutomationSection>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <AutomationSection>
            <div className="text-center mb-8">
              <p className="font-mono text-xs text-dim tracking-widest uppercase">Tools we build with</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full border border-glow bg-surface-1 font-mono text-sm text-primary/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </AutomationSection>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-surface-2/50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="relative max-w-3xl mx-auto text-center">
          <AutomationSection>
            <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-6">// Next Step</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Ready to stop leaking revenue?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-4 leading-relaxed">
              In 30 minutes, we'll map your current setup, find the biggest bottleneck, and show you
              exactly what a system audit could unlock for your business.
            </p>
            <p className="font-display font-semibold text-foreground mb-10">
              We build it first. You pay after 7 days of proven results.
            </p>
            <a
              href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-display font-bold text-lg rounded-lg shadow-glow hover:shadow-[0_0_50px_-5px_hsl(170_100%_45%_/_0.5)] transition-shadow"
            >
              Book a 30-Minute System Audit
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="mt-6 font-mono text-xs text-dim">30 min · No pitch · Just clarity</p>
          </AutomationSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutomationPage;
