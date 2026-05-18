import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const miniCases = [
  {
    icon: "🍷",
    title: "No Data Left Behind",
    body: "Sustaina Wines was migrating off a platform and couldn't take their customer records with them. We scraped every contact and detail into their own Google Sheets — fully owned, clean, and accessible from anywhere.",
    metric: "Full database recovered, 0 records lost",
  },
  {
    icon: "📡",
    title: "The Always-On Receptionist",
    body: "A publishing company was losing leads across Facebook, Instagram, WhatsApp, and phone calls. We built one AI brain that answers every message, transcribes every voice note, and pings the boss the moment a hot lead appears.",
    metric: "4 channels covered, 0 missed inquiries",
  },
  {
    icon: "🏢",
    title: "The Leakproof Pipeline",
    body: "A real estate agency had no unified system — leads arrived from multiple sources, follow-ups were forgotten, and post-sale paperwork was fully manual. We built 3 interconnected workflows that handle intake, follow-up, and document collection automatically.",
    metric: "3 workflows, 0 manual admin steps",
  },
];

const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" ref={ref} className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-surface-2/50" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// Origin Story</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            My journey into automation<br />
            <span className="text-gradient">started with a failure.</span>
          </h2>
        </motion.div>

        {/* Before / After */}
        <div className="grid md:grid-cols-[1fr_2px_1fr] gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Before</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I was a social media manager. I spent my days fighting algorithms, optimizing profiles,
              and running campaigns. I know exactly how hard it is to earn human attention on the internet.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              But eventually, I hit a wall. I realized something incredibly painful: getting attention is
              entirely useless if your backend can't keep it.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I was driving traffic to businesses, but their systems couldn't handle the load. Leads
              went cold. Follow-ups were forgotten. Founders were trapped copying and pasting data while
              money slipped through the cracks.
            </p>
            <div className="mt-6 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <p className="font-mono text-sm text-destructive/80 italic">
                "I wasn't scaling success. I was scaling chaos."
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-border self-stretch" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">After</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              That is when everything clicked. Automation does not fix broken marketing — it only scales
              whatever already exists. If your backend is broken, automation scales that failure faster.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I decided I didn't want to just generate attention anymore. I wanted to{" "}
              <span className="text-primary font-medium">capture it, monetize it, and protect it.</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That is why I became a Revenue Systems Architect. And why I built Nexara — so more
              businesses can run smoothly even when the founder logs out.
            </p>
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="font-mono text-sm text-primary/80 italic">
                "Now I build the systems that make businesses unbreakable."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Insight Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="module-border bg-surface-1 p-8 md:p-10 text-center mb-16"
        >
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">// The Hard Truth</p>
          <p className="font-display text-xl md:text-2xl font-bold text-foreground leading-relaxed">
            "Automation does not fix broken marketing.<br />
            <span className="text-gradient">It only scales whatever already exists.</span><br />
            If your backend is broken, automation scales that failure faster."
          </p>
        </motion.div>

        {/* Mini Case Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mb-8"
        >
          <p className="font-mono text-xs text-primary tracking-widest uppercase">// What that looks like in the real world</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {miniCases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.15 }}
              className="module-border bg-surface-1 p-6 hover:border-primary/40 transition-colors flex flex-col"
            >
              <span className="text-2xl mb-3 block">{c.icon}</span>
              <h4 className="font-display font-semibold text-foreground text-sm mb-2">{c.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{c.body}</p>
              <div className="mt-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="font-mono text-xs text-primary">{c.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
