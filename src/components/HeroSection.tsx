import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const industries = ["Plumbing", "HVAC", "Electrical", "Real Estate", "Care & Repair", "Coaching"];

const liveEvents = [
  { id: "ev1", status: "CAPTURED", label: "New Lead — HVAC Inquiry", sub: "Mike J. · Urgent repair · California", tag: "Auto-qualified in 8s → Stage 1", accent: true },
  { id: "ev2", status: "SENT", label: "Follow-up #2 Triggered", sub: "Sarah W. · Plumbing quote · 24hr timer", tag: "3 touchpoints queued", accent: true },
  { id: "ev3", status: "BOOKED", label: "Call Booked — Thu 2pm", sub: "James K. · Real Estate Inquiry", tag: "CRM updated automatically", accent: false },
  { id: "ev4", status: "CLOSED", label: "Deal Won — $6,400", sub: "Rivera Electrical · Care & Repair", tag: "Onboarding workflow started", accent: false },
  { id: "ev5", status: "ONLINE", label: "10 Workflows Active", sub: "All pipelines running · Zero action needed", tag: "System nominal", accent: true },
];

const HeroSection = () => {
  const [currentIndustry, setCurrentIndustry] = useState(0);
  const [cards, setCards] = useState(liveEvents.slice(0, 3));
  const nextRef = useRef(3);

  useEffect(() => {
    const ind = setInterval(() => {
      setCurrentIndustry((p) => (p + 1) % industries.length);
    }, 2500);
    return () => clearInterval(ind);
  }, []);

  useEffect(() => {
    const feed = setInterval(() => {
      const next = liveEvents[nextRef.current % liveEvents.length];
      setCards((prev) => [...prev.slice(1), next]);
      nextRef.current = (nextRef.current + 1) % liveEvents.length;
    }, 2400);
    return () => clearInterval(feed);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Glow — left side for text */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "20%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "hsl(var(--primary) / 0.06)", filter: "blur(120px)" }}
      />
      {/* Glow — right side for cards */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "30%", right: "-5%", width: 400, height: 500, borderRadius: "50%", background: "hsl(var(--primary) / 0.04)", filter: "blur(100px)" }}
      />

      {/* Right column accent border */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden md:block pointer-events-none"
        style={{ width: "44%", borderLeft: "1px solid hsl(var(--primary) / 0.08)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 min-h-[calc(100vh-64px)] flex items-center">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center w-full py-16 md:py-24">

          {/* ─── LEFT: Headline ─── */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glow bg-surface-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs font-mono text-primary tracking-widest uppercase">Nexara — Revenue Systems Agency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-display font-bold tracking-tight mb-6 leading-[1.05]"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }}
            >
              <span className="block text-foreground">If your</span>
              <span className="block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndustry}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className="text-gradient"
                  >
                    {industries[currentIndustry]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-foreground"> business</span>
              </span>
              <span className="block text-foreground">doubled tomorrow,</span>
              <span className="block text-dim">would your system</span>
              <span className="block text-dim">survive?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg"
            >
              Most businesses are built for survival, not scale. We build the revenue
              infrastructure that runs — even when you log out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://calendly.com/faithfulnyama/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:shadow-glow transition-all text-base"
              >
                Book a 15-Min System Audit
              </a>
              <a
                href="#cases"
                className="px-8 py-4 border border-border text-foreground font-display font-medium rounded-lg hover:border-primary/50 transition-colors text-base"
              >
                See Our Work
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-6 font-mono text-xs text-dim"
            >
              Serving HVAC · Real Estate · Plumbing · Care & Repair · Coaching
            </motion.p>
          </div>

          {/* ─── RIGHT: Live System Feed ─── */}
          <div className="hidden md:flex flex-col gap-3" style={{ width: 310 }}>
            {/* Feed header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-2 mb-1 px-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              <span className="font-mono text-[10px] text-primary tracking-[0.25em] uppercase">Live System Feed</span>
              <span className="font-mono text-[10px] text-dim ml-auto">24/7</span>
            </motion.div>

            {/* Cycling event cards */}
            <AnimatePresence mode="popLayout" initial={false}>
              {cards.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  layout
                  initial={{ opacity: 0, y: 32 }}
                  animate={{
                    opacity: i === 0 ? 1 : i === 1 ? 0.65 : 0.35,
                    y: 0,
                    scale: i === 0 ? 1 : 0.98,
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="rounded-xl p-4"
                  style={{
                    background: "hsl(var(--surface-1))",
                    border: i === 0
                      ? "1px solid hsl(var(--primary) / 0.3)"
                      : "1px solid hsl(var(--border))",
                    boxShadow: i === 0 ? "0 4px 24px hsl(var(--primary) / 0.1)" : "none",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: ev.accent ? "hsl(var(--primary))" : "hsl(var(--accent))",
                        boxShadow: i === 0 ? `0 0 6px ${ev.accent ? "hsl(var(--primary))" : "hsl(var(--accent))"}` : "none",
                      }}
                    />
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: ev.accent ? "hsl(var(--primary))" : "hsl(var(--accent))" }}
                    >
                      {ev.status}
                    </span>
                  </div>
                  <p className="font-display font-semibold text-sm text-foreground mb-1">{ev.label}</p>
                  <p className="font-mono text-[10px] text-dim mb-2.5">{ev.sub}</p>
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-mono text-[10px]"
                    style={{ background: "hsl(var(--primary) / 0.07)", color: "hsl(var(--primary))" }}
                  >
                    <span>→</span> {ev.tag}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Bottom pulse line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex items-center gap-2 px-1 mt-1"
            >
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, hsl(var(--primary) / 0.3), transparent)" }} />
              <span className="font-mono text-[10px] text-dim">pipeline active</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-8 lg:left-14"
      >
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full mt-1"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
