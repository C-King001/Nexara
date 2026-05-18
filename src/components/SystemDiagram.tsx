import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const nodes = [
  { id: "traffic", label: "Traffic Source", x: 10, y: 20, detail: "Social media, ads, referrals — where your prospects first discover you." },
  { id: "capture", label: "Lead Capture", x: 35, y: 20, detail: "Forms, chatbots, landing pages that collect prospect info automatically." },
  { id: "crm", label: "CRM Pipeline", x: 60, y: 20, detail: "GoHighLevel manages every deal, assigns stages, and tracks progress." },
  { id: "nurture", label: "Auto Nurture", x: 35, y: 55, detail: "Email, SMS, and voicemail sequences triggered by behavior and timing." },
  { id: "convert", label: "Conversion", x: 85, y: 20, detail: "Booked calls, closed deals, activated customers — revenue captured." },
  { id: "feedback", label: "Feedback Loop", x: 60, y: 55, detail: "Analytics and data feed back to optimize every step of the system." },
];

const connections = [
  { from: "traffic", to: "capture" },
  { from: "capture", to: "crm" },
  { from: "crm", to: "convert" },
  { from: "capture", to: "nurture" },
  { from: "nurture", to: "crm" },
  { from: "convert", to: "feedback" },
  { from: "feedback", to: "nurture" },
];

const SystemDiagram = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-surface-2/30" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// Architecture</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Your Revenue System
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Click on any node to see where your business might be leaking revenue.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="module-border bg-surface-1 p-6 md:p-10"
        >
          {/* SVG Diagram */}
          <div className="relative w-full" style={{ paddingBottom: "45%" }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 70">
              {/* Connection lines */}
              {connections.map((conn, i) => {
                const from = nodes.find(n => n.id === conn.from)!;
                const to = nodes.find(n => n.id === conn.to)!;
                const isActive = activeNode === conn.from || activeNode === conn.to;
                return (
                  <line
                    key={i}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isActive ? "hsl(170, 100%, 45%)" : "hsl(220, 15%, 38%)"}
                    strokeWidth={isActive ? "0.5" : "0.25"}
                    strokeDasharray={isActive ? "none" : "1.5,1"}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 md:px-4 md:py-2.5 rounded-lg border transition-all duration-300 cursor-pointer text-center ${
                  activeNode === node.id
                    ? "border-primary bg-primary/10 shadow-glow scale-110"
                    : "border-border bg-surface-2 hover:border-primary/40"
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <span className={`font-mono text-[10px] md:text-xs whitespace-nowrap ${
                  activeNode === node.id ? "text-primary" : "text-muted-foreground"
                }`}>
                  {node.label}
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-5 rounded-lg bg-primary/5 border border-primary/20"
            >
              <p className="font-mono text-xs text-primary mb-1 uppercase tracking-wider">
                {nodes.find(n => n.id === activeNode)?.label}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {nodes.find(n => n.id === activeNode)?.detail}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SystemDiagram;
