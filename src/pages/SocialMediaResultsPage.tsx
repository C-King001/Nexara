import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const results = [
  {
    src: "/social-media-results/results-book-addicts-analytics.webp",
    platform: "Pinterest",
    platformColor: "#7c3aed",
    client: "Book Addicts",
    headline: "+140% Impression Growth",
    metrics: ["1M monthly impressions", "539K total audience reached", "Impressions up 140% month-on-month"],
  },
  {
    src: "/social-media-results/results-book-addicts-profile.webp",
    platform: "Pinterest",
    platformColor: "#7c3aed",
    client: "Book Addicts",
    headline: "1M Monthly Views",
    metrics: ["Creator Hub status", "1M monthly views confirmed", "115 engaged followers"],
  },
  {
    src: "/social-media-results/results-pinterest-glow.webp",
    platform: "Pinterest",
    platformColor: "#9333ea",
    client: "GlowVibe Studios",
    headline: "+326% Impression Growth",
    metrics: ["+326% impressions", "+279% total audience", "+337% engaged audience", "23K engaged this period"],
  },
  {
    src: "/social-media-results/results-instagram.png",
    platform: "Instagram",
    platformColor: "#e1306c",
    client: "Kaminskiy Care & Repair",
    headline: "495K Video Views",
    metrics: ["495K total video views", "3,045 accounts reached organically", "+96.2% increase in reach"],
  },
];

const SocialMediaResultsPage = () => (
  <div className="min-h-screen" style={{ background: "#0a0a0a", fontFamily: "Inter, sans-serif" }}>
    {/* Header */}
    <div className="border-b px-6 py-5" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 50 }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
          <span className="bg-clip-text text-transparent" style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", WebkitBackgroundClip: "text" as const }}>Nexara</span>
        </Link>
        <Link to="/social-media" className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Social Media
        </Link>
      </div>
    </div>

    {/* Hero */}
    <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="font-mono text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "#6b7280" }}>Verified Proof</p>
        <h1 className="font-bold leading-tight mb-6"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#ffffff" }}>
          Real Dashboards.
          <br />
          <span style={{ WebkitBackgroundClip: "text" as const, backgroundClip: "text", color: "transparent", background: "linear-gradient(135deg, #d4a017, #f5c842)" }}>
            Real Numbers.
          </span>
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#9ca3af" }}>
          Not stock images. Not mockups. These are actual screenshots taken directly from inside the platforms — Instagram Insights, Pinterest Analytics, and Facebook — during active campaigns.
        </p>
      </motion.div>
    </div>

    {/* Results Gallery */}
    <div className="max-w-6xl mx-auto px-6 pb-28">
      <div className="grid md:grid-cols-2 gap-8">
        {results.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.1 }}
            className="rounded-3xl overflow-hidden" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Screenshot */}
            <div className="relative" style={{ background: "#1a1a1a" }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
                </div>
                <span className="text-xs font-mono px-3 py-0.5 rounded-full text-white" style={{ background: r.platformColor, opacity: 0.9 }}>{r.platform}</span>
                <div className="w-10" />
              </div>
              <img src={r.src} alt={`${r.client} ${r.headline}`} className="w-full block" style={{ maxHeight: 380, objectFit: "cover", objectPosition: "top" }} />
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono px-2 py-1 rounded-full text-white" style={{ background: r.platformColor }}>{r.platform}</span>
                <span className="text-xs font-mono text-gray-500">{r.client}</span>
              </div>
              <p className="font-bold text-xl mb-4 text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{r.headline}</p>
              <div className="space-y-2">
                {r.metrics.map((m, mi) => (
                  <div key={mi} className="flex items-center gap-2 text-sm" style={{ color: "#9ca3af" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: r.platformColor }} />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="border-t py-24 px-6 text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#ffffff" }}>
          Want results like these?
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Let's talk about what's possible for your brand in the next 90 days.</p>
        <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", fontFamily: "Poppins, sans-serif" }}>
          Book a Free Consultation
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>
    </div>
  </div>
);

export default SocialMediaResultsPage;
