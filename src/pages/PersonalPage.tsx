import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, type ReactNode, type CSSProperties } from "react";
import { TrendingUp, Settings, Globe, Instagram, Linkedin, Mail, Menu, X } from "lucide-react";

// ─── TOKENS ──────────────────────────────────────────────────
const BG = "#0a0a0a";
const BG2 = "#0d0d0d";
const SURFACE = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";
const A1 = "#00c6ff";
const A2 = "#0072ff";
const GRAD = `linear-gradient(135deg, ${A1}, ${A2})`;
const TXT = "#fff";
const TXT_M = "rgba(255,255,255,0.65)";
const TXT_D = "rgba(255,255,255,0.38)";
const FONT = "Inter, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const gradText: CSSProperties = {
  background: GRAD,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

// ─── HELPERS ─────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
};

const SmartCounter = ({ target, fmt }: { target: number; fmt: (n: number) => string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
      else setN(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{fmt(n)}</span>;
};

const Label = ({ text }: { text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
    <div style={{ width: 22, height: 2, background: GRAD, borderRadius: 1, flexShrink: 0 }} />
    <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: A1, textTransform: "uppercase" as const }}>{text}</span>
  </div>
);

// SWAP WITH REAL PHOTO: replace the inner div with <img src="/images/faithful.jpg" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
const Avatar = ({ size = 200 }: { size?: number }) => (
  <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
    <div style={{ position: "absolute", inset: -3, borderRadius: "50%", background: GRAD, opacity: 0.35, filter: "blur(6px)", zIndex: 0 }} />
    <div style={{
      position: "relative", zIndex: 1, width: "100%", height: "100%", borderRadius: "50%",
      background: "rgba(0,198,255,0.06)", border: "1.5px solid rgba(0,198,255,0.3)",
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      <span style={{ ...gradText, fontFamily: FONT, fontWeight: 800, fontSize: size * 0.26, lineHeight: 1 }}>FN</span>
    </div>
  </div>
);

const Tag = ({ text }: { text: string }) => (
  <span style={{ padding: "4px 11px", borderRadius: 100, background: "rgba(0,198,255,0.06)", border: "1px solid rgba(0,198,255,0.15)", fontFamily: MONO, fontSize: 10, color: A1, letterSpacing: "0.04em", whiteSpace: "nowrap" as const }}>
    {text}
  </span>
);

// ─── NAVBAR ──────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const linkStyle: CSSProperties = { fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: TXT_M, background: "none", border: "none", cursor: "pointer", transition: "color 0.2s", padding: 0 };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,10,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ ...gradText, fontFamily: FONT, fontWeight: 700, fontSize: 17, background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
          Faithful Nyama
        </button>
        <div className="hidden md:flex items-center gap-8">
          {[["about","About"],["work","Work"],["results","Results"],["services","Services"],["contact","Contact"]].map(([id, label]) => (
            <button key={id} onClick={() => go(id)} style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = TXT)}
              onMouseLeave={e => (e.currentTarget.style.color = TXT_M)}>
              {label}
            </button>
          ))}
          <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer"
            style={{ padding: "9px 20px", borderRadius: 100, background: GRAD, fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none" }}>
            Let's Talk
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: TXT, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div style={{ background: "rgba(10,10,10,0.98)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "20px 24px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[["about","About"],["work","Work"],["results","Results"],["services","Services"],["contact","Contact"]].map(([id, label]) => (
              <button key={id} onClick={() => go(id)} style={{ ...linkStyle, textAlign: "left" as const }}>{label}</button>
            ))}
            <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer"
              style={{ padding: "12px 20px", borderRadius: 100, background: GRAD, fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#fff", textDecoration: "none", textAlign: "center" as const, marginTop: 4 }}>
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────
const Hero = () => (
  <section style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", paddingTop: 68, position: "relative", overflow: "hidden" }}>
    <div style={{
      position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `radial-gradient(ellipse 70% 60% at 65% 40%, rgba(0,198,255,0.055) 0%, transparent 65%), linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)`,
      backgroundSize: "auto, 60px 60px, 60px 60px",
    }} />
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative", zIndex: 1 }}>
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100, background: "rgba(0,198,255,0.07)", border: "1px solid rgba(0,198,255,0.18)", marginBottom: 28 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: A1, boxShadow: `0 0 8px ${A1}`, animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: A1 }}>AVAILABLE FOR NEW PROJECTS</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontFamily: FONT, fontWeight: 800, fontSize: "clamp(36px, 4.8vw, 60px)", lineHeight: 1.08, color: TXT, marginBottom: 22, letterSpacing: "-0.025em" }}>
              I build growth systems.<br />
              <span style={gradText}>Content that attracts.</span>{" "}
              Automation that converts.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.75, color: TXT_M, marginBottom: 36, maxWidth: 520 }}>
              Social media strategist and AI automation specialist — helping brands and businesses grow audiences and close more clients, without doing everything manually.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const, marginBottom: 44 }}>
              <a href="#work" onClick={e => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{ padding: "13px 28px", borderRadius: 100, background: GRAD, fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#fff", textDecoration: "none", boxShadow: "0 8px 32px rgba(0,114,255,0.28)" }}>
                See My Work
              </a>
              <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer"
                style={{ padding: "13px 28px", borderRadius: 100, border: "1.5px solid rgba(0,198,255,0.38)", fontFamily: FONT, fontSize: 14, fontWeight: 600, color: A1, textDecoration: "none", background: "transparent" }}>
                Book a Call
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.38}>
            <div style={{ paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontFamily: MONO, fontSize: 11, color: TXT_D, letterSpacing: "0.05em", lineHeight: 1.9 }}>
                1.1M+ Pinterest views · 470+ businesses engaged · 3,000% community growth · GoHighLevel Certified mindset
              </p>
            </div>
          </Reveal>
        </div>
        <div className="hidden md:flex justify-center lg:justify-end">
          <Reveal delay={0.15}>
            <Avatar size={280} />
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

// ─── ABOUT ───────────────────────────────────────────────────
const About = () => (
  <section id="about" style={{ background: BG2, padding: "100px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><Label text="About" /></Reveal>
      <Reveal delay={0.05}>
        <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 42px)", color: TXT, marginBottom: 60, letterSpacing: "-0.02em" }}>
          The person behind the systems.
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-14 items-start">
        <Reveal delay={0.1}>
          <div className="flex justify-center md:justify-start">
            <Avatar size={230} />
          </div>
        </Reveal>
        <div>
          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 40 }}>
              {[
                "I got into social media by accident — and into automation on purpose.",
                "It started at 14, designing T-shirts on Teespring with zero sales. That failure taught me the first lesson: visibility without strategy is just noise.",
                "Today I run Kings Socials, a social media and personal brand agency, and I build AI automation systems for service businesses — primarily home services companies in the US. I also manage social media for Kaminskiy Care & Repair, where my role has grown well beyond content into GoHighLevel workflows and AI video production.",
                "My work lives at the intersection of two things most people treat as separate: storytelling and systems. I use social media to build real audiences, and automation to make sure those audiences turn into revenue.",
                "I'm based in Nigeria. I work with clients globally.",
              ].map((p, i) => (
                <p key={i} style={{ fontFamily: FONT, fontSize: 15.5, lineHeight: 1.85, color: TXT_M }}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 10 }}>
              {[
                { icon: <TrendingUp size={15} color={A1} />, label: "Strategy-first thinker" },
                { icon: <Settings size={15} color={A1} />, label: "Systems builder" },
                { icon: <Globe size={15} color={A1} />, label: "Global operator" },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 10, background: SURFACE, border: `1px solid ${BORDER}`, backdropFilter: "blur(12px)", color: TXT_M, fontFamily: FONT, fontSize: 13, fontWeight: 500 }}>
                  {icon}{label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

// ─── SERVICES ────────────────────────────────────────────────
const Services = () => (
  <section id="services" style={{ background: BG, padding: "100px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><Label text="Services" /></Reveal>
      <Reveal delay={0.05}>
        <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 42px)", color: TXT, marginBottom: 52, letterSpacing: "-0.02em" }}>
          Two things. Done well.
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {[
          {
            icon: <TrendingUp size={20} color={A1} />,
            title: "Social Media Strategy & Management",
            body: "I build content systems that grow real audiences — not just follower counts. From brand voice to content calendars, community engagement to platform-specific strategy.",
            tags: ["Instagram", "Pinterest", "Facebook", "Content Strategy", "Brand Voice", "Meta Ads"],
            delay: 0.1,
          },
          {
            icon: <Settings size={20} color={A1} />,
            title: "AI Automation & Workflow Building",
            body: "I automate the manual work that kills growth — lead follow-up, CRM pipelines, client onboarding, booking systems. Built primarily on GoHighLevel, with AI video and outreach infrastructure.",
            tags: ["GoHighLevel", "AI Video", "Lead Nurturing", "CRM Pipelines", "Cold Outreach Systems"],
            delay: 0.18,
          },
        ].map(({ icon, title, body, tags, delay }) => (
          <Reveal key={title} delay={delay}>
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, backdropFilter: "blur(12px)", borderRadius: 16, padding: "34px 30px", height: "100%" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(0,198,255,0.08)", border: "1px solid rgba(0,198,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                {icon}
              </div>
              <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 19, color: TXT, marginBottom: 12, lineHeight: 1.3 }}>{title}</h3>
              <p style={{ fontFamily: FONT, fontSize: 14.5, lineHeight: 1.75, color: TXT_M, marginBottom: 24 }}>{body}</p>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                {tags.map(t => <Tag key={t} text={t} />)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.28}>
        <div style={{ padding: "18px 28px", borderRadius: 12, background: SURFACE, border: `1px solid ${BORDER}`, textAlign: "center" as const }}>
          <span style={{ fontFamily: FONT, fontSize: 13.5, color: TXT_D }}>
            Also fluent in:{" "}
            <span style={{ color: TXT_M }}>Copywriting · Community Building · Affiliate Strategy · Pinterest SEO · Canva · CapCut</span>
          </span>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── PROJECTS ────────────────────────────────────────────────
const projects = [
  {
    tag: "Social Media · London",
    name: "Popin",
    sub: "Food & Hospitality Platform",
    desc: "Built Instagram community strategy for a London-based pop-up discovery app",
    results: [
      "Engaged 470+ food & hospitality businesses (core target audience)",
      "Generated 200+ waitlist sign-ups through Stories campaigns",
      "Collected 500+ email subscribers via multi-channel strategy",
    ],
    impact: "Turned a new Instagram page into a trusted industry community hub",
    logo: "/logos/popin-logo.png",
    logoBg: "#0a0a0a",
  },
  {
    tag: "Pinterest · Personal Project",
    name: "Book Addicts",
    sub: "Pinterest Community",
    desc: "Built a book lovers' community from zero using Pinterest SEO and viral content systems",
    results: [
      "1.1M+ monthly views organically in 4 months",
      "Built from 0 to engaged audience with zero ad spend",
      "Mastered Pinterest algorithm and pin design systems",
    ],
    impact: "Proved organic content virality and Pinterest SEO mastery at scale",
    logo: null,
  },
  {
    tag: "Facebook · Affiliate",
    name: "Book Lovers",
    sub: "Facebook Community",
    desc: "Scaled Facebook community with integrated affiliate monetization strategy",
    results: [
      "Grew from 300 → 3,000+ followers in 4 months",
      "Maintained strong engagement while integrating affiliate offers",
      "Built monetization system without compromising community trust",
    ],
    impact: "Showed ability to balance community authenticity with revenue goals",
    logo: null,
  },
  {
    tag: "Social Media + Automation · Ongoing",
    name: "Kaminskiy Care & Repair",
    sub: "",
    desc: "Social media management that expanded into GoHighLevel automation and AI video production",
    results: [
      "Established content calendar and strategy for Instagram & Facebook",
      "Built GoHighLevel automation workflows beyond original scope",
      "Produced AI video content using tools like Higgsfield AI",
    ],
    impact: "Grew from SMM hire into full growth systems operator for the client",
    logo: "/logos/kaminskiy-logo.png",
    logoBg: "#ffffff",
  },
];

const Projects = () => (
  <section id="work" style={{ background: BG2, padding: "100px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><Label text="Work" /></Reveal>
      <Reveal delay={0.05}>
        <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 42px)", color: TXT, marginBottom: 52, letterSpacing: "-0.02em" }}>
          Real brands. Real numbers.
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.09}>
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, backdropFilter: "blur(12px)", borderRadius: 16, padding: "26px 26px 22px", height: "100%", display: "flex", flexDirection: "column" as const }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: A1, textTransform: "uppercase" as const, paddingTop: 2 }}>{p.tag}</span>
                {p.logo && (
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: p.logoBg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0, marginLeft: 12 }}>
                    <img src={p.logo} alt={p.name} style={{ width: "78%", height: "78%", objectFit: "contain" }} />
                  </div>
                )}
              </div>
              <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 17, color: TXT, marginBottom: p.sub ? 4 : 10 }}>{p.name}</h3>
              {p.sub && <p style={{ fontFamily: FONT, fontSize: 12, color: TXT_D, marginBottom: 10 }}>{p.sub}</p>}
              <p style={{ fontFamily: FONT, fontSize: 13.5, color: TXT_M, lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, marginBottom: 18, flexGrow: 1 }}>
                {p.results.map((r, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: A1, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontFamily: FONT, fontSize: 13, color: TXT_M, lineHeight: 1.55 }}>{r}</span>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.055)" }}>
                <span style={{ ...gradText, fontFamily: FONT, fontSize: 12.5, fontStyle: "italic" }}>{p.impact}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── STATS ───────────────────────────────────────────────────
const statsData = [
  { target: 1_100_000, fmt: (n: number) => `${(n / 1_000_000).toFixed(1)}M+`, label: "Monthly Pinterest Views" },
  { target: 470, fmt: (n: number) => `${n}+`, label: "Businesses Engaged (Popin)" },
  { target: 3000, fmt: (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}K+` : `${n}+`, label: "Facebook Community Built" },
  { target: 400_000, fmt: (n: number) => n >= 1000 ? `${Math.round(n / 1000)}K+` : `${n}+`, label: "Views in 2 Months (GlowVibe)" },
  { target: 500, fmt: (n: number) => `${n}+`, label: "Emails Collected Organically" },
  { target: 4, fmt: (n: number) => `${n}`, label: "Platforms Grown from Zero" },
];

const Stats = () => (
  <section id="results" style={{ background: BG, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(0,198,255,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <Reveal><Label text="Results" /></Reveal>
      <Reveal delay={0.05}>
        <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 42px)", color: TXT, marginBottom: 52, letterSpacing: "-0.02em" }}>
          Numbers don't lie.
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {statsData.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, backdropFilter: "blur(12px)", borderRadius: 14, padding: "28px 22px", textAlign: "center" as const }}>
              <div style={{ ...gradText, fontFamily: FONT, fontWeight: 800, fontSize: "clamp(26px, 2.8vw, 40px)", lineHeight: 1.1, marginBottom: 10 }}>
                <SmartCounter target={s.target} fmt={s.fmt} />
              </div>
              <div style={{ fontFamily: FONT, fontSize: 12.5, color: TXT_D, lineHeight: 1.45 }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.45}>
        <p style={{ ...gradText, textAlign: "center" as const, marginTop: 52, fontFamily: FONT, fontSize: 17, fontStyle: "italic", letterSpacing: "0.01em" }}>
          "Growth isn't magic. It's systems, empathy, and creative precision."
        </p>
      </Reveal>
    </div>
  </section>
);

// ─── TESTIMONIALS ────────────────────────────────────────────
const testimonials = [
  {
    quote: "Faithful did an excellent job leading our social media presence at Educato. In just a couple of weeks, he grasped our brand voice, created engaging content, and helped us grow our online presence. I highly recommend him for any social media or content marketing role!",
    name: "Pierre-Louis Monnot",
    role: "Co-founder, Educato AI",
    photo: "/images/clients/Pierre.jpg",
  },
  {
    quote: "I truly appreciate your support and efforts. Your work ethic and the dedication that you have put into the Instagram page is an integral part of our journey.",
    name: "Tekla Balfour",
    role: "CEO, POPIN",
    photo: "/images/clients/Tekla.jpg",
  },
  {
    quote: "He is amazing at what he does, very prompt and professional. Looking forward to future collabs.",
    name: "Avantika",
    role: "Publishing Company",
    photo: null,
  },
];

const Testimonials = () => (
  <section style={{ background: BG2, padding: "100px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><Label text="What They Say" /></Reveal>
      <Reveal delay={0.05}>
        <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 42px)", color: TXT, marginBottom: 52, letterSpacing: "-0.02em" }}>
          From the people I've worked with.
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, backdropFilter: "blur(12px)", borderRadius: 16, padding: "32px 26px", height: "100%", display: "flex", flexDirection: "column" as const, position: "relative" as const }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 80, lineHeight: 0.75, color: A1, opacity: 0.1, position: "absolute" as const, top: 18, left: 22, userSelect: "none" as const, pointerEvents: "none" as const }}>"</div>
              <p style={{ fontFamily: FONT, fontSize: 14.5, lineHeight: 1.78, color: TXT_M, marginBottom: 26, flexGrow: 1, position: "relative" as const, zIndex: 1 }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {t.photo ? (
                  <img src={t.photo} alt={t.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "1.5px solid rgba(0,198,255,0.22)", flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(0,198,255,0.08)", border: "1.5px solid rgba(0,198,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: FONT, fontWeight: 700, fontSize: 15, color: A1 }}>
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13.5, color: TXT }}>{t.name}</div>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: TXT_D }}>{t.role}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── CONTACT ─────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" style={{ background: BG, padding: "120px 24px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: GRAD, opacity: 0.35 }} />
    <div style={{ position: "absolute", bottom: 0, right: "15%", width: 500, height: 500, background: "radial-gradient(circle, rgba(0,114,255,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
    <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" as const, position: "relative" as const, zIndex: 1 }}>
      <Reveal><Label text="Contact" /></Reveal>
      <Reveal delay={0.05}>
        <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: "clamp(30px, 4vw, 52px)", color: TXT, marginBottom: 20, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
          Ready to build something<br />
          <span style={gradText}>that grows?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p style={{ fontFamily: FONT, fontSize: 16.5, lineHeight: 1.75, color: TXT_M, marginBottom: 44 }}>
          Whether you need a social media system, an automation build, or both — let's talk about what actually moves the needle for your business.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" as const, flexWrap: "wrap" as const, marginBottom: 30 }}>
          <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer"
            style={{ padding: "14px 32px", borderRadius: 100, background: GRAD, fontFamily: FONT, fontSize: 15, fontWeight: 600, color: "#fff", textDecoration: "none", boxShadow: "0 8px 40px rgba(0,114,255,0.32)" }}>
            Book a Free Call
          </a>
          <a href="mailto:faithfulnyama@gmail.com"
            style={{ padding: "14px 32px", borderRadius: 100, border: "1.5px solid rgba(0,198,255,0.35)", fontFamily: FONT, fontSize: 15, fontWeight: 600, color: A1, textDecoration: "none", background: "transparent" }}>
            Send an Email
          </a>
        </div>
      </Reveal>
      <Reveal delay={0.28}>
        <p style={{ fontFamily: MONO, fontSize: 11, color: TXT_D, letterSpacing: "0.08em" }}>
          Based in Nigeria · Available for global projects · Usually replies within 24hrs
        </p>
      </Reveal>
    </div>
  </section>
);

// ─── FOOTER ──────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.055)", padding: "28px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 14 }}>
      <span style={{ ...gradText, fontFamily: FONT, fontWeight: 700, fontSize: 16 }}>Faithful Nyama</span>
      <span style={{ fontFamily: MONO, fontSize: 11, color: TXT_D }}>© 2025 Faithful Nyama. Built with intention.</span>
      <div style={{ display: "flex", gap: 18 }}>
        {[
          { href: "https://www.instagram.com/iam_faithfulnyama/", icon: <Instagram size={17} /> },
          { href: "https://www.linkedin.com/in/faithfulnyama/", icon: <Linkedin size={17} /> },
          { href: "mailto:faithfulnyama@gmail.com", icon: <Mail size={17} /> },
        ].map(({ href, icon }) => (
          <a key={href} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
            style={{ color: TXT_D, transition: "color 0.2s", display: "flex" }}
            onMouseEnter={e => (e.currentTarget.style.color = A1)}
            onMouseLeave={e => (e.currentTarget.style.color = TXT_D)}>
            {icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── PAGE ─────────────────────────────────────────────────────
const PersonalPage = () => (
  <div style={{ background: BG, color: TXT, fontFamily: FONT, minHeight: "100vh" }}>
    <Nav />
    <Hero />
    <About />
    <Services />
    <Projects />
    <Stats />
    <Testimonials />
    <Contact />
    <Footer />
  </div>
);

export default PersonalPage;
