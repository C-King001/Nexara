const items = [
  "↑ $6,400 Deal Closed",
  "0 Leads Lost to Slow Response",
  "10 Active Workflows Running",
  "HVAC Inquiry Auto-Qualified · 8s",
  "24/7 AI Receptionist Online",
  "Real Estate Pipeline · Stage 4",
  "3 Clients Onboarded This Week",
  "Follow-up Sent · Automated",
  "Plumbing Quote · Auto-Replied",
  "KCR Franchise · All 7 Stages Live",
];

const LiveTicker = () => {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-3 border-y"
      style={{ background: "#000000", borderColor: "hsl(var(--primary) / 0.2)" }}
    >
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #000, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #000, transparent)" }} />

      <div className="marquee-track flex items-center gap-10" style={{ animationDuration: "28s" }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-5 flex-shrink-0 whitespace-nowrap">
            <span className="font-mono text-xs text-primary tracking-widest">{item}</span>
            <span className="w-1 h-1 rounded-full bg-primary opacity-40 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default LiveTicker;
