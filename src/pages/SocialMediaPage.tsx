import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { PanInfo } from "framer-motion";

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
const DarkNavbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
          <span style={{ background: "linear-gradient(135deg,#a855f7,#7c3aed)", WebkitBackgroundClip: "text" as const, backgroundClip: "text", color: "transparent" }}>Nexara</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/automation" className="text-sm font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Automation</Link>
          <Link to="/about" className="text-sm font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors">About</Link>
          <a href="https://calendly.com/faithfulnyama/30min" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", fontFamily: "Poppins, sans-serif" }}>
            Book Audit
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link to="/automation" onClick={() => setOpen(false)} className="text-sm text-gray-400 hover:text-white font-mono">Automation</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="text-sm text-gray-400 hover:text-white font-mono">About</Link>
          <a href="https://calendly.com/faithfulnyama/30min" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white text-center"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>Book Audit</a>
        </div>
      )}
    </nav>
  );
};

/* ─────────────────────────────────────────
   ANIMATED SCROLL REVEAL
───────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 28 }: { children: React.ReactNode; delay?: number; y?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   ANIMATED STAT COUNTER
───────────────────────────────────────── */
const StatCounter = ({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const springVal = useSpring(0, { stiffness: 55, damping: 20, mass: 1 });
  const rounded = useTransform(springVal, (v) => Math.round(v).toLocaleString());
  useEffect(() => { if (inView) springVal.set(to); }, [inView, to, springVal]);
  return (
    <span ref={ref}>
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
};

/* ─────────────────────────────────────────
   GLOW CARD
───────────────────────────────────────── */
const GlowCard = ({ children, dark = false, className = "", style = {} }: { children: React.ReactNode; dark?: boolean; className?: string; style?: React.CSSProperties }) => (
  <motion.div
    whileHover={{ boxShadow: "0 0 50px rgba(124,58,237,0.22)", borderColor: "rgba(168,85,247,0.5)", y: -4 }}
    transition={{ duration: 0.2 }}
    className={`rounded-3xl transition-colors duration-200 ${className}`}
    style={{ background: dark ? "#111111" : "#ffffff", border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #efefef", ...style }}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────
   SWIPE CAROUSEL (testimonials)
───────────────────────────────────────── */
const SwipeCarousel = ({ items, renderCard, cardWidth = 400 }: {
  items: unknown[]; renderCard: (item: unknown, i: number) => React.ReactNode; cardWidth?: number;
}) => {
  const [cur, setCur] = useState(0);
  const gap = 24;
  const stride = cardWidth + gap;
  const x = useMotionValue(0);
  const snap = (idx: number) => {
    const c = Math.max(0, Math.min(items.length - 1, idx));
    setCur(c);
    animate(x, -c * stride, { type: "spring", stiffness: 320, damping: 32 });
  };
  const onDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -60) snap(cur + 1);
    else if (info.offset.x > 60) snap(cur - 1);
    else snap(cur);
  };
  return (
    <div>
      <div className="overflow-hidden">
        <motion.div className="flex cursor-grab active:cursor-grabbing select-none" style={{ x, gap: `${gap}px` }}
          drag="x" dragConstraints={{ left: -(items.length - 1) * stride, right: 0 }}
          dragElastic={0.05} dragMomentum={false} onDragEnd={onDrag}>
          {items.map((item, i) => <div key={i} style={{ width: cardWidth, flexShrink: 0 }}>{renderCard(item, i)}</div>)}
        </motion.div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-3">
          {[[-1, "M15 19l-7-7 7-7"], [1, "M9 5l7 7-7 7"]].map(([dir, path], bi) => (
            <button key={bi} onClick={() => snap(cur + (dir as number))} disabled={dir === -1 ? cur === 0 : cur === items.length - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-20 hover:scale-110"
              style={{ border: "1px solid rgba(168,85,247,0.35)", color: "#a855f7" }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={path as string} />
              </svg>
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          {items.map((_, i) => (
            <button key={i} onClick={() => snap(i)} className="rounded-full transition-all duration-300"
              style={{ width: i === cur ? 28 : 8, height: 8, background: i === cur ? "#a855f7" : "rgba(168,85,247,0.25)" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */

// These are INDUSTRY CASE STUDIES — publicly known founders who scaled through personal branding.
// Not direct Nexara clients.
const industryFounders = [
  {
    name: "Natalee Barnett", handle: "@nataleebarnett", niche: "Fitness · UK",
    image: "/social-media-images/natalee.webp",
    headline: "7,000 women joined the waitlist before she built a single wall.",
    story: "A Black British fitness creator posted raw, personal TikTok content about gym safety. Women resonated. Gymshark sent £20,000 — unprompted. The gym sold out before it opened.",
    stats: [
      { label: "TikTok followers", val: 2000000, display: "2M" },
      { label: "Waitlist pre-launch", val: 7000, display: "7,000+" },
    ],
    goldStat: "Gymshark sent £20K — without being asked.",
  },
  {
    name: "Lottie Whyte", handle: "MyoMaster, Dragons' Den", niche: "Health Tech · UK",
    image: "/social-media-images/lottie.webp",
    headline: "BBC called it 'the most masterful pitch they'd ever seen.'",
    story: "She documented building a startup — the rejections, the newborn, the grind — on LinkedIn. When she walked into the Dragons' Den, the audience already trusted her. £100K secured.",
    stats: [
      { label: "Revenue", val: 4000000, display: "£4M" },
      { label: "New followers in 7 days", val: 20000, display: "20K" },
    ],
    goldStat: "Personal brand closed the investment round.",
  },
  {
    name: "Rachel Ama", handle: "2× Cookbook Author", niche: "Food & Lifestyle · UK",
    image: "/social-media-images/rachel-ama.jpeg",
    headline: "First batch sold out within hours. Zero marketing budget.",
    story: "497K Instagram. 700K YouTube. Built on authenticity — her Caribbean roots, her kitchen. When Ama's Sauces launched, one post to her personal audience cleared the entire first run.",
    stats: [
      { label: "Instagram followers", val: 497000, display: "497K" },
      { label: "YouTube subscribers", val: 700000, display: "700K" },
    ],
    goldStat: "£0 marketing budget at launch.",
  },
  {
    name: "Evangelina Petrakis", handle: "@evangelina", niche: "Luxury Jewellery · USA",
    image: "/social-media-images/evangelina-petrakis.avif",
    headline: "$3.1M revenue. Age 21. No paid ads. Ever.",
    story: "Personal account: 1M followers. Brand account: 109K. The gap is the entire strategy. People didn't buy EP Jewels because of a product page — they bought because they'd been watching Evangelina for years.",
    stats: [
      { label: "Revenue at 21", val: 3100000, display: "$3.1M" },
      { label: "Personal Instagram", val: 1000000, display: "1M" },
    ],
    goldStat: "$0 paid ads. $3.1M in revenue.",
  },
];

// Direct Nexara client work
const brandPortfolio = [
  {
    name: "POPIN", platform: "Instagram", color: "#a855f7", category: "London Food-Tech",
    headline: "Built a community of 470+ businesses from zero.",
    bullets: ["470+ pop-up businesses engaged", "200+ waitlist sign-ups via Stories", "500+ emails collected organically"],
    result: "Community built before the product was ready.",
    image: "/logos/popin-logo.png",
    isLogo: true,
    logoBg: "#0a0a0a",
  },
  {
    name: "Book Addicts", platform: "Pinterest", color: "#7c3aed", category: "Content Community",
    headline: "Zero to 1M monthly views in 4 months.",
    bullets: ["1M+ monthly views — organic only", "Pinterest SEO mastered from scratch", "Creator Hub status achieved"],
    result: "From zero to 1M views. No ad spend.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=700&q=80",
    isLogo: false,
  },
  {
    name: "Book Lovers", platform: "Facebook", color: "#5146d9", category: "Affiliate Community",
    headline: "300 to 3,000+ followers without losing community trust.",
    bullets: ["10× follower growth in 4 months", "Affiliate revenue integrated seamlessly", "Zero trust erosion through monetisation"],
    result: "10× growth. Community and revenue coexist.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=700&q=80",
    isLogo: false,
  },
  {
    name: "GlowVibe Studios", platform: "Pinterest", color: "#9333ea", category: "Beauty",
    headline: "400K monthly views in 60 days. New account.",
    bullets: ["400K monthly views in 2 months", "Competitive beauty niche cracked from zero", "Organic growth — no paid promotion"],
    result: "400K views in 60 days in a competitive niche.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80",
    isLogo: false,
  },
  {
    name: "Kaminskiy Care & Repair", platform: "Instagram", color: "#e1306c", category: "Home Services · California",
    headline: "495K video views from organic content.",
    bullets: ["495K total video views", "3,045 accounts reached organically", "+96.2% increase in reach"],
    result: "Franchise brand visible and growing across California.",
    image: "/logos/kaminskiy-logo.png",
    isLogo: true,
    logoBg: "#ffffff",
  },
];

const results = [
  { src: "/social-media-results/results-book-addicts-analytics.webp", client: "Book Addicts", platform: "Pinterest", headline: "+140% Impression Growth", stats: ["1M monthly impressions", "539K total audience", "+140% month-on-month"] },
  { src: "/social-media-results/results-book-addicts-profile.webp", client: "Book Addicts", platform: "Pinterest", headline: "1M Monthly Views", stats: ["Creator Hub status", "1M monthly views", "115 engaged followers"] },
  { src: "/social-media-results/results-pinterest-glow.webp", client: "GlowVibe Studios", platform: "Pinterest", headline: "+326% Impression Growth", stats: ["+326% impressions", "+279% total audience", "+337% engaged audience"] },
  { src: "/social-media-results/results-instagram.png", client: "Kaminskiy Care & Repair", platform: "Instagram", headline: "495K Video Views", stats: ["495K total video views", "3,045 accounts reached", "+96.2% reach increase"] },
];

type Testimonial = { quote: string; name: string; role: string; image: string | null; initial?: string };
const testimonials: Testimonial[] = [
  { quote: "I hired Faithful for a complex wine project after reaching the limits of what standard automation could handle. He consistently delivered creative, out-of-the-box solutions in a timely manner. Highly recommend for anyone facing unique technical challenges.", name: "Peter Douglas", role: "CEO, Sustaina Wines", image: "/images/clients/peter-douglas.jpeg" },
  { quote: "Faithful did an excellent job leading our social media presence at Educato. In just a couple of weeks, he grasped our brand voice, created engaging content, and helped us grow our online presence.", name: "Pierre-Louis Monnot", role: "Co-founder, Educato AI", image: "/images/clients/Pierre.jpg" },
  { quote: "He is amazing at what he does, very prompt and professional. Looking forward to future collabs.", name: "Avantika", role: "Publishing Company", image: null, initial: "A" },
  { quote: "I truly appreciate your support and efforts. Your work ethic and the dedication you have put into the Instagram page is an integral part of our journey.", name: "Tekla Balfour", role: "CEO, POPIN", image: "/images/clients/Tekla.jpg" },
];

/* ═══════════════════════════════════════════
   FOUNDERS CONTENT
═══════════════════════════════════════════ */
const FoundersContent = () => {
  const bartlettRef = useRef(null);
  const bartlettInView = useInView(bartlettRef, { once: true, margin: "-60px" });

  return (
    <motion.div key="founders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}>

      {/* Problem */}
      <section className="py-24 px-6" style={{ background: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-5" style={{ color: "#9ca3af" }}>The Problem</p>
            <h2 className="font-bold leading-tight mb-6"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#0a0a0a" }}>
              You have a business worth following.
              <br />
              <span style={{ color: "#7c3aed" }}>Most people have never heard of you.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {[
              { icon: "🔇", title: "You're invisible online", body: "Your competitors — who are objectively worse — have audiences 10× yours, simply because they show up consistently." },
              { icon: "🕳️", title: "Attention leaks", body: "You're running ads, posting occasionally, hoping something sticks. Nothing compounds. Every week starts from zero." },
              { icon: "💬", title: "No trust, no sale", body: "High-ticket buyers don't purchase from strangers. They buy from people they've been watching for months." },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard className="p-7 h-full">
                  <span className="text-3xl block mb-3">{c.icon}</span>
                  <h4 className="font-bold text-base mb-2" style={{ fontFamily: "Poppins, sans-serif", color: "#0a0a0a" }}>{c.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.body}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Belief callout */}
      <section className="py-20 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="font-bold leading-tight"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#ffffff" }}>
              "The personal account is always{" "}
              <span style={{ color: "#a855f7" }}>10× the brand account.</span>
              {" "}That is not a coincidence.
              <span style={{ color: "#a855f7" }}> That is the strategy.</span>"
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steven Bartlett — industry case study */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="grid md:grid-cols-2" style={{ minHeight: "min(80vh, 680px)" }}>
          <div className="relative overflow-hidden" style={{ minHeight: 400 }}>
            <img
              src="/social-media-images/steven.png"
              alt="Steven Bartlett"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: "grayscale(20%) brightness(0.6)" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 55%, #0a0a0a 100%)" }} />
            <div className="absolute bottom-8 left-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
                style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.35)", color: "#a855f7" }}>
                Industry Case Study
              </span>
            </div>
          </div>
          <div ref={bartlettRef} className="flex flex-col justify-center px-10 md:px-14 py-20" style={{ background: "#0a0a0a" }}>
            <motion.p initial={{ opacity: 0 }} animate={bartlettInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
              className="font-mono text-xs tracking-[0.25em] uppercase mb-2" style={{ color: "#6b7280" }}>
              Why this model works — Steven Bartlett
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={bartlettInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.05 }}
              className="text-xs font-mono mb-6" style={{ color: "#4b5563" }}>
              Founder of Social Chain · Diary of a CEO · BBC Dragons' Den investor
            </motion.p>
            <motion.h3 initial={{ opacity: 0, y: 20 }} animate={bartlettInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
              className="font-bold leading-tight mb-5"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#ffffff" }}>
              University dropout.<br />No budget.<br />
              <span style={{ color: "#a855f7" }}>Zero salespeople. £75M empire.</span>
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={bartlettInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm leading-relaxed mb-8" style={{ color: "#9ca3af", maxWidth: 480 }}>
              He never hired a salesperson for any of his businesses. Not for Social Chain, not for Flight Fund, not for Diary of a CEO. He documented his journey publicly — the failures, the process, the opinions — and the content made people trust him before they ever spoke to him.
            </motion.p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[["2.1M", "Instagram"], ["10M+", "YouTube subscribers"], ["£75M", "Business portfolio"], ["£0", "Outbound sales spend"]].map(([val, label], i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={bartlettInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                  className="p-4 rounded-xl" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <p className="font-bold text-xl mb-0.5" style={{ fontFamily: "Poppins, sans-serif", color: "#a855f7" }}>{val}</p>
                  <p className="text-xs font-mono" style={{ color: "#6b7280" }}>{label}</p>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={bartlettInView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
              className="border-l-3 pl-5" style={{ borderLeft: "3px solid #7c3aed" }}>
              <p className="text-sm italic text-gray-300">"The content did all the selling. Every single time."</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder case studies — industry examples */}
      <section className="py-20 px-6" style={{ background: "#fafafa" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-4"
                  style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "#7c3aed" }}>
                  Industry Case Studies — Not Direct Nexara Clients
                </span>
                <h2 className="font-bold" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0a0a0a" }}>
                  Founders who proved<br />personal branding works.
                </h2>
              </div>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">These are publicly known founders — case studies of the personal brand model we build for our clients.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {industryFounders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1}>
                <GlowCard className="overflow-hidden flex flex-col h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img src={f.image} alt={f.niche} className="w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%)" }} />
                    <div className="absolute bottom-4 left-5 right-5">
                      <span className="text-xs font-mono text-gray-300">{f.niche}</span>
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h4 className="font-bold text-lg mb-1" style={{ fontFamily: "Poppins, sans-serif", color: "#0a0a0a" }}>{f.name}</h4>
                    <p className="text-xs font-mono mb-4" style={{ color: "#9ca3af" }}>{f.handle}</p>
                    <p className="font-semibold text-sm mb-3" style={{ color: "#7c3aed", lineHeight: 1.5 }}>{f.headline}</p>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{f.story}</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {f.stats.map((s, si) => (
                        <div key={si} className="p-3 rounded-xl" style={{ background: "#f5f3ff" }}>
                          <p className="font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif", color: "#7c3aed" }}>{s.display}</p>
                          <p className="text-xs font-mono text-gray-400">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs italic text-purple-600">"{f.goldStat}"</p>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we build for founders */}
      <section className="py-24 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4 text-gray-500">The System</p>
              <h2 className="font-bold text-white mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                You don't need their following.
                <br /><span style={{ color: "#a855f7" }}>You need their system.</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">None of these founders started with millions of followers. They started with a real story and a consistent system.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { n: "01", t: "Content that sounds like you", b: "Your voice, your story, your opinions — written and directed to sound like the founder people are choosing to follow." },
              { n: "02", t: "Four content types, all running at once", b: "Awareness → trust → proof → conversion. All four pillars active simultaneously, every week, without exception." },
              { n: "03", t: "The right platform for the right room", b: "LinkedIn for investors and press. Instagram and TikTok for community and customers. Pinterest for organic reach. We choose based on data, not guesswork." },
              { n: "04", t: "A system that compounds", b: "Month one builds the foundation. Month two creates momentum. Month three starts compounding. The work done on day one is still running underneath everything 90 days later." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard dark className="p-8 h-full">
                  <span className="text-4xl font-bold block mb-4" style={{ fontFamily: "Poppins, sans-serif", color: "#a855f7", opacity: 0.4 }}>{item.n}</span>
                  <h4 className="font-bold text-base mb-3 text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{item.t}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.b}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="text-center mt-12">
              <a href="https://calendly.com/faithfulnyama/30min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-white hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", fontFamily: "Poppins, sans-serif" }}>
                Build My Personal Brand
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <p className="mt-3 font-mono text-xs text-gray-600">Free 15-min strategy call · No commitment</p>
            </div>
          </Reveal>
        </div>
      </section>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   BRANDS CONTENT
═══════════════════════════════════════════ */
const BrandsContent = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <motion.div key="brands" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}>

      {/* Problem */}
      <section className="py-24 px-6" style={{ background: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-5" style={{ color: "#9ca3af" }}>The Problem</p>
            <h2 className="font-bold leading-tight mb-6"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#0a0a0a" }}>
              Most brands post for months.
              <br /><span style={{ color: "#7c3aed" }}>Nothing compounds.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {[
              { icon: "📉", title: "Random posting, zero system", body: "No strategy behind the content. Each post starts from scratch instead of building on the last. The algorithm forgets you exist." },
              { icon: "👻", title: "Community that doesn't exist", body: "Followers without engagement. A number on a screen, not a room of people who trust and buy from you repeatedly." },
              { icon: "🧩", title: "No pipeline from social", body: "Your social media is disconnected from your revenue. You can't trace a single sale back to a post. It's decoration, not infrastructure." },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard className="p-7 h-full">
                  <span className="text-3xl block mb-3">{c.icon}</span>
                  <h4 className="font-bold text-base mb-2" style={{ fontFamily: "Poppins, sans-serif", color: "#0a0a0a" }}>{c.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.body}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Belief callout */}
      <section className="py-20 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="font-bold leading-tight"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#ffffff" }}>
              "The brands that win on social media aren't the{" "}
              <span style={{ color: "#a855f7" }}>loudest.</span>
              {" "}They're the most{" "}
              <span style={{ color: "#a855f7" }}>consistent.</span>"
            </p>
          </Reveal>
        </div>
      </section>

      {/* Brand portfolio — direct client work */}
      <section className="py-24 px-6" style={{ background: "#fafafa" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-4"
                style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "#7c3aed" }}>
                Our Work — Direct Client Portfolio
              </span>
              <h2 className="font-bold" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0a0a0a" }}>
                Real brands.<br /><span style={{ color: "#7c3aed" }}>Real results.</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {brandPortfolio.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.1}>
                <GlowCard className="overflow-hidden flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden" style={{ background: b.isLogo ? (b.logoBg || "#111") : undefined }}>
                    {b.isLogo ? (
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <img src={b.image} alt={b.name} style={{ maxWidth: "70%", maxHeight: "100%", objectFit: "contain" }} />
                      </div>
                    ) : (
                      <img src={b.image} alt={b.category} className="w-full h-full object-cover" style={{ filter: "brightness(0.6)" }} />
                    )}
                    {!b.isLogo && <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)" }} />}
                    <span className="absolute top-4 left-5 text-xs font-mono font-bold text-white px-3 py-1 rounded-full" style={{ background: b.color }}>{b.platform}</span>
                    <div className="absolute bottom-4 left-5 right-5">
                      <p className="text-xs font-mono" style={{ color: b.isLogo ? "#9ca3af" : "#d1d5db" }}>{b.category}</p>
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "Poppins, sans-serif", color: "#0a0a0a" }}>{b.name}</h3>
                    <p className="font-semibold text-sm mb-4" style={{ color: b.color }}>{b.headline}</p>
                    <ul className="space-y-2 mb-5 flex-1">
                      {b.bullets.map((m, mi) => (
                        <li key={mi} className="flex items-start gap-2 text-sm text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: b.color }} />
                          {m}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs font-semibold italic" style={{ color: b.color }}>"{b.result}"</p>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Animated stats */}
      <section ref={statsRef} className="py-24 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-center mb-14 text-gray-500">Numbers across our brand portfolio</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { to: 1000000, prefix: "", suffix: "+", label: "Monthly Organic Views", sub: "Book Addicts · Pinterest" },
              { to: 470, prefix: "", suffix: "+", label: "Businesses Engaged", sub: "POPIN · Instagram" },
              { to: 10, prefix: "", suffix: "×", label: "Follower Growth", sub: "Book Lovers · 4 months" },
              { to: 400000, prefix: "", suffix: "+", label: "Monthly Views", sub: "GlowVibe · 60 days" },
              { to: 326, prefix: "+", suffix: "%", label: "Impression Growth", sub: "Pinterest · verified" },
              { to: 337, prefix: "+", suffix: "%", label: "Engaged Audience", sub: "Dashboard confirmed" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center p-7 rounded-2xl hover:scale-105 transition-transform"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="font-bold leading-none mb-2"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#a855f7" }}>
                  {statsInView ? <StatCounter to={s.to} prefix={s.prefix} suffix={s.suffix} /> : `${s.prefix}0${s.suffix}`}
                </p>
                <p className="text-sm font-medium text-white mb-1">{s.label}</p>
                <p className="text-xs font-mono text-gray-600">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results screenshots teaser */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.1), transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4 text-gray-500">Verified Proof</p>
                <h2 className="font-bold leading-tight mb-5" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#ffffff" }}>
                  Real dashboards.
                  <br /><span style={{ color: "#a855f7" }}>Not mockups.</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">Actual screenshots from inside Instagram, Pinterest, and Facebook — taken during live campaigns. Four clients. Four platforms. Four sets of verified numbers.</p>
                <Link to="/social-media/results"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white hover:opacity-90 transition-all group"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", fontFamily: "Poppins, sans-serif" }}>
                  View Full Results
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {results.slice(0, 4).map((r, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="h-28 overflow-hidden">
                        <img src={r.src} alt={r.headline} className="w-full h-full object-cover object-top" style={{ filter: "brightness(0.8)" }} />
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] font-mono text-purple-400">{r.client}</span>
                        <p className="text-xs font-semibold text-white mt-0.5">{r.headline}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we build for brands */}
      <section className="py-24 px-6" style={{ background: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9ca3af" }}>The System</p>
              <h2 className="font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0a0a0a" }}>
                Not just posting. <span style={{ color: "#7c3aed" }}>Building presence.</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { n: "01", t: "Community-first strategy", b: "Every post serves the audience before it serves the brand. That's the only way to build a room people want to stay in." },
              { n: "02", t: "Platform-specific systems", b: "Pinterest SEO. Instagram Reels strategy. Facebook community management. Each platform is a different game — we play them all differently." },
              { n: "03", t: "Content → revenue pipeline", b: "Your social connects directly to your pipeline. Every post is part of a funnel — even the ones that look like they're just for engagement." },
              { n: "04", t: "Consistency as the algorithm", b: "90 days of consistent, intentional posting outperforms 2 weeks of 'going viral.' We build systems you can maintain, not campaigns that burn out." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard className="p-8 h-full">
                  <span className="text-4xl font-bold block mb-4" style={{ fontFamily: "Poppins, sans-serif", color: "#7c3aed", opacity: 0.35 }}>{item.n}</span>
                  <h4 className="font-bold text-base mb-3" style={{ fontFamily: "Poppins, sans-serif", color: "#0a0a0a" }}>{item.t}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.b}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="text-center mt-12">
              <a href="https://calendly.com/faithfulnyama/30min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-white hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", fontFamily: "Poppins, sans-serif" }}>
                Build My Brand's System
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <p className="mt-3 font-mono text-xs text-gray-400">Free 15-min strategy call · No commitment</p>
            </div>
          </Reveal>
        </div>
      </section>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   CLIENT MARQUEE
═══════════════════════════════════════════ */
const clientBrands = [
  { name: "POPIN", tag: "Instagram" },
  { name: "Book Addicts", tag: "Pinterest" },
  { name: "Book Lovers", tag: "Facebook" },
  { name: "GlowVibe Studios", tag: "Pinterest" },
  { name: "Kaminskiy Care & Repair", tag: "Instagram" },
  { name: "Educato AI", tag: "Social Media" },
  { name: "Sustaina Wines", tag: "Data & Automation" },
];

const ClientMarquee = () => {
  const doubled = [...clientBrands, ...clientBrands];
  return (
    <>
      <style>{`
        @keyframes client-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .client-marquee-inner { animation: client-scroll 28s linear infinite; }
        .client-marquee-inner:hover { animation-play-state: paused; }
      `}</style>
      <div className="py-6 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}>
        <div className="client-marquee-inner flex items-center gap-10" style={{ width: "max-content" }}>
          {doubled.map((c, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="font-semibold text-sm text-white whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{c.name}</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.25)" }}>{c.tag}</span>
              <span style={{ color: "rgba(255,255,255,0.1)", fontSize: 18 }}>·</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════
   TESTIMONIALS — INFINITE AUTO-SCROLL
═══════════════════════════════════════════ */
const TestimonialsSection = () => {
  const doubled = [...testimonials, ...testimonials];
  return (
    <section className="py-24 overflow-hidden" style={{ background: "#fafafa" }}>
      <style>{`
        @keyframes testimonial-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .testimonial-strip { animation: testimonial-scroll 55s linear infinite; }
        .testimonial-strip:hover { animation-play-state: paused; }
      `}</style>
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <Reveal>
          <div className="text-center">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9ca3af" }}>Client Testimonials</p>
            <h2 className="font-bold" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0a0a0a" }}>
              What founders and brands say.
            </h2>
          </div>
        </Reveal>
      </div>
      <div style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
        <div className="testimonial-strip flex gap-6 py-3 cursor-grab" style={{ width: "max-content" }}>
          {doubled.map((t, i) => (
            <div key={i} className="flex-shrink-0" style={{ width: 390 }}>
              <GlowCard className="p-8 flex flex-col" style={{ minHeight: 300, height: "100%" }}>
                <div className="flex gap-0.5 mb-5">{Array.from({ length: 5 }).map((_, si) => <span key={si} style={{ color: "#7c3aed", fontSize: 16 }}>★</span>)}</div>
                <p className="text-sm leading-relaxed italic text-gray-500 mb-6 flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  {t.image
                    ? <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover flex-shrink-0" style={{ border: "2px solid rgba(124,58,237,0.3)" }} />
                    : <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm" style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>{t.initial}</div>}
                  <div>
                    <p className="font-semibold text-sm text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>{t.name}</p>
                    <p className="text-xs font-mono text-gray-400">{t.role}</p>
                  </div>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
const SocialMediaPage = () => {
  const [audience, setAudience] = useState<"founders" | "brands" | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const choose = (path: "founders" | "brands") => {
    setAudience(path);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif", background: "#0a0a0a" }}>
      <DarkNavbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden" style={{ background: "#0a0a0a" }}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{ top: "20%", left: "5%", width: 700, height: 700, background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent 65%)", filter: "blur(80px)" }} />
          <div className="absolute" style={{ bottom: "10%", right: "5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(168,85,247,0.12), transparent 65%)", filter: "blur(60px)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#a855f7" }}>
            Social Media Management &amp; Strategy · Nexara
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="font-bold leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.75rem, 8vw, 6rem)", color: "#ffffff" }}>
            Build a presence<br />
            <span style={{ background: "linear-gradient(135deg,#a855f7,#7c3aed)", WebkitBackgroundClip: "text" as const, backgroundClip: "text", color: "transparent" }}>
              they can't ignore.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: "#9ca3af" }}>
            Organic social media systems for founders and brands that want growth that compounds — not campaigns that burn out.
          </motion.p>

          {/* Path selection */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.8 }}
            className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {(["founders", "brands"] as const).map((path) => {
              const isActive = audience === path;
              const isFounders = path === "founders";
              return (
                <motion.button key={path} onClick={() => choose(path)}
                  whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(124,58,237,0.28)" }}
                  whileTap={{ scale: 0.97 }}
                  className="p-7 rounded-2xl text-left relative overflow-hidden transition-colors duration-200"
                  style={{ background: isActive ? "rgba(124,58,237,0.18)" : "#111111", border: isActive ? "1px solid rgba(168,85,247,0.65)" : "1px solid rgba(255,255,255,0.08)" }}>
                  {isActive && (
                    <motion.div layoutId="activePath" className="absolute inset-0 rounded-2xl" transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      style={{ background: "rgba(124,58,237,0.08)" }} />
                  )}
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: isActive ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)" }}>
                      <span className="text-xl">{isFounders ? "👤" : "🏢"}</span>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {isFounders ? "For Founders" : "For Brands"}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
                      {isFounders
                        ? "Build personal authority and a brand presence that drives trust, community, and sales."
                        : "Generate organic leads, build community, and scale with a content system that runs while you sleep."}
                    </p>
                    <p className="mt-4 text-xs font-mono" style={{ color: isActive ? "#a855f7" : "#6b7280" }}>
                      {isActive ? "↓ See your path" : "Explore →"}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {!audience && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="mt-6 text-xs font-mono text-gray-600">
              Choose your path above to see exactly what we build for you
            </motion.p>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 rounded-full flex justify-center" style={{ border: "2px solid rgba(255,255,255,0.12)" }}>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full mt-1" style={{ background: "#a855f7" }} />
          </div>
        </motion.div>
      </section>

      {/* ── CLIENT MARQUEE ── */}
      <ClientMarquee />

      {/* ── DYNAMIC CONTENT ── */}
      <div ref={contentRef}>
        <AnimatePresence mode="wait">
          {audience === "founders" && <FoundersContent key="founders" />}
          {audience === "brands" && <BrandsContent key="brands" />}
        </AnimatePresence>
      </div>

      {/* No-path fallback: show brief portfolio teaser when nothing selected */}
      {!audience && (
        <section className="py-28 px-6" style={{ background: "#ffffff" }}>
          <div className="max-w-5xl mx-auto text-center">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9ca3af" }}>Our Work</p>
              <h2 className="font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0a0a0a" }}>
                Across platforms. <span style={{ color: "#7c3aed" }}>Across niches.</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-12">From London food-tech startups to beauty brands — organic social systems that compound. Choose your path above to see results specific to you.</p>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[["1M+", "Organic views/month"], ["470+", "Businesses served"], ["10×", "Average growth"], ["+326%", "Impression growth"]].map(([val, label], i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl" style={{ background: "#fafafa", border: "1px solid #efefef" }}>
                    <p className="font-bold text-2xl mb-1" style={{ fontFamily: "Poppins, sans-serif", color: "#7c3aed" }}>{val}</p>
                    <p className="text-xs font-mono text-gray-400">{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── CTA ── */}
      <section className="py-32 px-6 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom center, rgba(124,58,237,0.12), transparent 65%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-6 text-gray-500">Next Step</p>
            <h2 className="font-bold mb-5 leading-tight"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#ffffff" }}>
              The community is already here.
              <br /><span style={{ color: "#a855f7" }}>The story is already yours.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              The only thing missing is the system that connects them.
            </p>
            <a href="https://calendly.com/faithfulnyama/30min" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg transition-all hover:opacity-90 hover:shadow-[0_0_60px_rgba(168,85,247,0.35)]"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#ffffff", fontFamily: "Poppins, sans-serif" }}>
              Start the Conversation
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <p className="mt-5 text-xs font-mono text-gray-600">15 min · No pitch · Just clarity</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-bold text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
            <span style={{ background: "linear-gradient(135deg,#a855f7,#7c3aed)", WebkitBackgroundClip: "text" as const, backgroundClip: "text", color: "transparent" }}>Nexara</span>
          </Link>
          <div className="flex flex-wrap gap-6 text-sm font-mono text-gray-600 justify-center">
            <Link to="/automation" className="hover:text-purple-400 transition-colors">Automation</Link>
            <Link to="/about" className="hover:text-purple-400 transition-colors">About</Link>
            <Link to="/social-media/results" className="hover:text-purple-400 transition-colors">Results</Link>
            <a href="mailto:faithfulnyama@gmail.com" className="hover:text-purple-400 transition-colors">Email</a>
          </div>
          <p className="text-xs font-mono text-gray-700">© {new Date().getFullYear()} Nexara.</p>
        </div>
      </footer>
    </div>
  );
};

export default SocialMediaPage;
