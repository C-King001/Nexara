import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tools = [
  "n8n", "GoHighLevel", "Make (Integromat)", "Zapier", "Airtable",
  "OpenAI API", "Meta Ads", "Google Ads", "Notion", "Slack",
];

const pillars = [
  { label: "Strategic Storytelling", desc: "Every system starts with understanding the human on the other end." },
  { label: "Revenue Architecture", desc: "We design for cash flow, not just efficiency." },
  { label: "Operational Clarity", desc: "Simple systems impress clients. Complex ones impress developers." },
];

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[100px] animate-pulse-glow" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glow bg-surface-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-mono text-primary tracking-widest uppercase">About Nexara</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            Hi, I'm Faithful.
            <br />
            <span className="text-gradient">I build the systems that make</span>
            <br />
            <span className="text-foreground">businesses unbreakable.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            Revenue Systems Architect. Automation Engineer. Former Social Media Manager who hit a wall
            and built a way through it — for thousands of founders.
          </motion.p>

          {/* Founder photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="inline-block mt-6"
          >
            <div className="w-36 h-36 rounded-full border-2 border-primary/40 shadow-glow mx-auto overflow-hidden">
              <img
                src="/images/founder.jpg"
                alt="Faithful Nyama"
                className="w-full h-full object-cover"
                style={{ transform: "scale(1.8)", transformOrigin: "center 5%" }}
              />
            </div>
            <p className="font-mono text-xs text-dim mt-3">Faithful Nyama · Founder, Nexara</p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-surface-2/50" />
        <div className="relative max-w-4xl mx-auto">
          <AnimatedSection>
            <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// The Origin</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">
              My journey started with a failure.
            </h2>
          </AnimatedSection>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <AnimatedSection delay={0.1}>
              <p>
                Before I built systems, I was a social media manager. I spent my days fighting algorithms,
                optimizing profiles, and running campaigns. I know exactly how hard it is to earn human
                attention on the internet.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p>
                But eventually, I hit a wall. I realized something incredibly painful: getting attention is
                entirely useless if your backend can't keep it.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p>
                I was driving traffic to businesses, but their systems couldn't handle the load. Leads would
                go cold because nobody replied to their DMs. Follow-ups were forgotten. Founders were trapped
                in manual work, copying and pasting data while the money they spent on marketing just slipped
                through the cracks.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="module-border bg-surface-1 p-6 my-8">
                <p className="font-mono text-sm text-destructive/80 italic">
                  "Because their operations were manual, I wasn't scaling their success. I was scaling their chaos."
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p>
                That is when everything clicked. Automation does not fix broken marketing. It only scales
                whatever already exists. If your backend is broken, automation will just scale that failure faster.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <p>
                I decided I didn't want to just generate attention anymore. I wanted to capture it, monetize it,
                and protect it. That is why I became a Revenue Systems Architect.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nexara Origin */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// Why Nexara</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Most agencies build campaigns.
              <br />
              <span className="text-gradient">We build infrastructure.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Nexara was built because founders deserve more than campaigns that evaporate in 30 days.
              They deserve systems that compound — where every lead is captured, every follow-up is
              sent, and every client is onboarded without the founder having to babysit the process.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We are not an automation tool company. We are a Revenue Systems Agency. We diagnose where
              your business is leaking money, and we build the infrastructure to plug the holes.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="module-border bg-surface-1 p-6"
              >
                <h4 className="font-display font-semibold text-foreground mb-2">{p.label}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 bg-surface-2/50" />
        <div className="relative max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-8">
              <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// Stack</span>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Tools We Build With</h2>
              <p className="text-muted-foreground text-sm">The technology stack behind every Nexara system.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-full border border-glow bg-surface-1 font-mono text-sm text-primary/80 hover:text-primary hover:border-primary/50 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Case Studies Bridge */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="module-border bg-surface-1 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[350px] h-[250px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative">
                <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-3">// The Proof</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Words are cheap. Systems aren't.
                </h2>
                <p className="text-muted-foreground mb-10 max-w-xl leading-relaxed">
                  Every claim on this page is backed by a live, deployed workflow. Here's a sample of what we've actually built.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-10">
                  {[
                    {
                      to: "/case/publishing-ai-receptionist",
                      tag: "PUBLISHING",
                      stat: "0",
                      statLabel: "Missed Inquiries",
                      desc: "AI receptionist across 4 channels — answers every message, 24/7.",
                    },
                    {
                      to: "/case/kcr-franchise-pipeline",
                      tag: "FRANCHISE SALES",
                      stat: "10",
                      statLabel: "Workflows, One System",
                      desc: "Zero manual follow-ups across 7 pipeline stages, start to close.",
                    },
                    {
                      to: "/case/real-estate-lifecycle",
                      tag: "REAL ESTATE",
                      stat: "0",
                      statLabel: "Manual Admin Steps",
                      desc: "3 workflows covering the full client lifecycle, end to end.",
                    },
                  ].map((card) => (
                    <Link
                      key={card.to}
                      to={card.to}
                      className="group block p-5 rounded-lg border border-border hover:border-primary/40 bg-surface-2 hover:bg-surface-2/80 hover:shadow-glow transition-all duration-300"
                    >
                      <span className="font-mono text-xs text-primary tracking-widest block mb-3">{card.tag}</span>
                      <div className="font-display text-3xl font-bold text-gradient mb-0.5">{card.stat}</div>
                      <div className="font-mono text-xs text-dim mb-3">{card.statLabel}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                      <span className="font-mono text-xs text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        View case study →
                      </span>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/#cases"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary font-mono text-sm rounded-md hover:bg-primary/10 hover:border-primary transition-colors"
                >
                  See all systems built →
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="font-mono text-xs text-dim tracking-widest uppercase mb-4">// Connect</p>
            <div className="flex justify-center gap-6 flex-wrap">
              <a
                href="https://www.instagram.com/iam_faithfulnyama"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                Instagram →
              </a>
              <a
                href="https://www.linkedin.com/in/faithfulnyama"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                LinkedIn →
              </a>
              <a
                href="mailto:faithfulnyama@gmail.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                Email →
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-surface-2/50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="relative max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-6">// Work With Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Let's build your backend.
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Book a free 30-minute System Audit. We'll map your journey, find the bottlenecks,
              and build a backend that actually supports your ambition — you pay after 7 days of proven results.
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
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
