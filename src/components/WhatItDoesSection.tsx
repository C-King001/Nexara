import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const mechanics = [
  {
    id: "01",
    headline: "A missed call gets a text back in 60 seconds.",
    detail:
      "No voicemail. No \"we'll call you back.\" The moment a call goes unanswered, the system texts the caller before they've even put the phone down — so they never dial your competitor instead.",
  },
  {
    id: "02",
    headline: "Every lead gets a qualification conversation — automatically.",
    detail:
      "No one just fills out a form and waits. The system asks the questions your team would ask, and tells you exactly who's ready to buy versus who's just browsing.",
  },
  {
    id: "03",
    headline: "Bookings get confirmed without a human touching the phone.",
    detail:
      "Once a lead is ready, the call gets scheduled and confirmed on autopilot — reminders included — so calendars fill themselves while you work.",
  },
];

const WhatItDoesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// Not "AI Automation" — This</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Here's exactly what runs on your business
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Not a vague promise. Three specific things that happen automatically the moment we turn it on.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {mechanics.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.15 }}
              className="module-border bg-surface-1 p-7 flex flex-col"
            >
              <span className="font-mono text-3xl font-bold text-primary/25 mb-4">{m.id}</span>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3 leading-snug">
                {m.headline}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{m.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatItDoesSection;
