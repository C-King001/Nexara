import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  Home, User, Zap, Briefcase, Star, Mail,
  Sun, Moon, ArrowRight, Instagram, Linkedin, TrendingUp, BarChart3, Globe,
} from "lucide-react";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.fn3 *, .fn3 *::before, .fn3 *::after { box-sizing: border-box; margin: 0; padding: 0; }
.fn3 { font-family: 'DM Sans', sans-serif; min-height: 100vh; overflow-x: hidden; scroll-behavior: smooth; }

/* ── LIGHT ── */
.fn3.fn3-light {
  --bg: #f8f7f4; --card: #ffffff; --card2: #f0ede6;
  --pri: #1a3d2b; --pri2: #2d5c42;
  --t1: #18181a; --t2: #585850; --t3: #9b9b92;
  --b0: rgba(26,61,43,.10); --b1: rgba(26,61,43,.28);
  --sh: rgba(0,0,0,.07);
  background: var(--bg); color: var(--t1);
}
/* ── DARK ── */
.fn3.fn3-dark {
  --bg: #0c0c0b; --card: #141413; --card2: #1c1c1a;
  --pri: #c9a84c; --pri2: #e8c97a;
  --t1: #ede9df; --t2: #a5a59a; --t3: #66665a;
  --b0: rgba(201,168,76,.12); --b1: rgba(201,168,76,.36);
  --sh: rgba(0,0,0,.5);
  background: var(--bg); color: var(--t1);
}

/* Scroll reveal */
.fn3-rev { opacity: 0; transform: translateY(22px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
.fn3-rev.fn3-vis { opacity: 1; transform: none; }

/* Typewriter cursor */
@keyframes fn3-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
.fn3-cursor { display:inline-block; width:2.5px; height:.82em; background:var(--pri); margin-left:2px; vertical-align:-.05em; animation:fn3-blink .9s step-start infinite; }

/* Status pulse */
@keyframes fn3-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,.5)} 60%{box-shadow:0 0 0 5px rgba(74,222,128,0)} }
.fn3-dot { width:7px; height:7px; background:#4ade80; border-radius:50%; display:inline-block; animation:fn3-pulse 2.2s ease-in-out infinite; }

/* ── MARQUEE ── */
@keyframes fn3-mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes fn3-mq-r { from{transform:translateX(-50%)} to{transform:translateX(0)} }

.fn3-mq-wrap { overflow:hidden; position:relative; }
.fn3-mq-wrap::before,.fn3-mq-wrap::after { content:''; position:absolute; top:0; bottom:0; width:80px; z-index:1; pointer-events:none; }
.fn3-mq-wrap::before { left:0; background:linear-gradient(to right, var(--bg), transparent); }
.fn3-mq-wrap::after { right:0; background:linear-gradient(to left, var(--bg), transparent); }

.fn3-mq-track { display:flex; width:max-content; animation:fn3-mq 28s linear infinite; }
.fn3-mq-track.fn3-mq-med { animation-duration:38s; }
.fn3-mq-track.fn3-mq-slow { animation-duration:52s; }
.fn3-mq-track.fn3-mq-rev { animation-name:fn3-mq-r; }
.fn3-mq-wrap:hover .fn3-mq-track { animation-play-state:paused; }

/* Logo items */
.fn3-logo-item { width:160px; height:80px; padding:12px 16px; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin:0 8px; background:var(--card); border-radius:12px; border:1px solid var(--b0); transition:opacity .25s ease, filter .25s ease, transform .25s ease, box-shadow .25s ease; }
.fn3-logo-item:hover { transform:scale(1.05); box-shadow:0 4px 16px var(--sh); }
.fn3-logo-item img { width:100%; height:100%; object-fit:contain; object-position:center; display:block; }

/* Automation screenshot cards */
.fn3-auto-card { width:320px; flex-shrink:0; margin:0 10px; border-radius:12px; overflow:hidden; background:var(--card); border:1px solid var(--b0); transition:transform .22s ease, box-shadow .22s ease; }
.fn3-auto-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px var(--sh); }
.fn3-auto-card img { width:100%; height:190px; object-fit:cover; object-position:top left; display:block; }
.fn3-auto-card-label { padding:12px 15px; font-size:12.5px; font-weight:500; color:var(--t2); border-top:1px solid var(--b0); }

/* Social result cards */
.fn3-social-card { width:280px; flex-shrink:0; margin:0 10px; border-radius:12px; overflow:hidden; background:var(--card); border:1px solid var(--b0); transition:transform .22s ease, box-shadow .22s ease; }
.fn3-social-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px var(--sh); }
.fn3-social-card img { width:100%; height:220px; object-fit:cover; object-position:top; display:block; }
.fn3-social-card-label { padding:10px 14px; font-size:12px; font-weight:500; color:var(--t2); }

/* Testimonial marquee cards */
.fn3-tm-card { width:340px; flex-shrink:0; margin:0 10px; padding:24px; background:var(--card); border:1px solid var(--b0); border-radius:14px; }
.fn3-tm-card:hover { border-color:var(--b1); }
.fn3-tm-q { font-family:'Cormorant Garamond',serif; font-size:48px; line-height:1; color:var(--pri); opacity:.22; display:block; margin-bottom:-10px; }
.fn3-tm-text { font-size:14px; line-height:1.75; color:var(--t2); margin-bottom:16px; }
.fn3-tm-avatar { width:36px; height:36px; border-radius:50%; object-fit:cover; flex-shrink:0; }
.fn3-tm-avatar-init { width:36px; height:36px; border-radius:50%; background:var(--pri); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-style:italic; font-size:14px; color:var(--bg); flex-shrink:0; }

/* Cards */
.fn3-card { background:var(--card); border:1px solid var(--b0); border-radius:14px; transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease; }
.fn3-card:hover { transform:translateY(-3px); border-color:var(--b1); box-shadow:0 8px 28px var(--sh); }

/* Typography */
.fn3-h1 { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(44px,7vw,78px); font-weight:700; line-height:1.06; letter-spacing:-.02em; }
.fn3-h2 { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(32px,5vw,52px); font-weight:700; line-height:1.12; letter-spacing:-.01em; }
.fn3-h3 { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(20px,3vw,28px); font-weight:600; line-height:1.25; }
.fn3-serif { font-family:'Cormorant Garamond',Georgia,serif; }
.fn3-label { font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--pri); display:block; margin-bottom:10px; }

/* Buttons */
.fn3-btn { display:inline-flex; align-items:center; gap:8px; padding:13px 26px; border-radius:100px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; cursor:pointer; transition:all .2s ease; text-decoration:none; white-space:nowrap; }
.fn3-btn-pri { background:var(--pri); color:var(--bg) !important; border:none; }
.fn3-btn-pri:hover { opacity:.85; transform:translateY(-1px); }
.fn3-btn-out { background:transparent; color:var(--pri) !important; border:1.5px solid var(--b1); }
.fn3-btn-out:hover { background:var(--pri); color:var(--bg) !important; border-color:var(--pri); }

/* Desktop nav */
.fn3-nav { position:fixed; top:0; left:0; right:0; z-index:200; height:62px; padding:0 32px; display:flex; align-items:center; justify-content:space-between; background:var(--bg); border-bottom:1px solid var(--b0); }
@media(max-width:768px){.fn3-nav{display:none;}}
.fn3-navlinks { display:flex; align-items:center; gap:28px; }
.fn3-navlink { font-size:13.5px; font-weight:500; color:var(--t2); text-decoration:none; transition:color .2s ease; }
.fn3-navlink:hover,.fn3-navlink.active{color:var(--pri);}

/* Theme btn */
.fn3-tbtn { width:34px; height:34px; border-radius:50%; border:1.5px solid var(--b0); background:var(--card); color:var(--t2); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s ease; }
.fn3-tbtn:hover { border-color:var(--pri); color:var(--pri); }

/* Mobile nav */
.fn3-mobnav { display:none; position:fixed; bottom:0; left:0; right:0; z-index:200; height:62px; background:var(--card); border-top:1px solid var(--b0); padding:0 2px; }
@media(max-width:768px){.fn3-mobnav{display:flex;align-items:center;justify-content:space-around;}}
.fn3-mobtab { display:flex; flex-direction:column; align-items:center; gap:2px; padding:6px 4px; color:var(--t3); cursor:pointer; transition:color .2s ease; background:none; border:none; font-family:'DM Sans',sans-serif; text-decoration:none; flex:1; }
.fn3-mobtab.active,.fn3-mobtab:hover { color:var(--pri); }
.fn3-mobtab span { font-size:9px; font-weight:500; white-space:nowrap; }

/* Hero */
.fn3-hero { min-height:100vh; display:flex; align-items:center; padding:70px 32px 40px; max-width:1100px; margin:0 auto; gap:60px; }
@media(max-width:768px){.fn3-hero{flex-direction:column-reverse;padding:80px 20px 50px;gap:28px;min-height:unset;text-align:center;}}
.fn3-hero-img { width:260px; height:260px; border-radius:50%; background:var(--card2); border:2px solid var(--b0); display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; font-family:'Cormorant Garamond',serif; font-size:76px; font-style:italic; color:var(--pri); }
@media(max-width:768px){.fn3-hero-img{width:156px;height:156px;font-size:48px;}}
.fn3-hero-sub { font-size:16px; line-height:1.75; color:var(--t2); max-width:480px; margin-bottom:32px; }
@media(max-width:768px){.fn3-hero-sub{margin-left:auto;margin-right:auto;}}
.fn3-hero-actions { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
@media(max-width:768px){.fn3-hero-actions{justify-content:center;}}
.fn3-statusbadge { display:inline-flex; align-items:center; gap:8px; padding:5px 14px; background:var(--card2); border:1px solid var(--b0); border-radius:100px; font-size:12px; color:var(--t2); margin-bottom:20px; }

/* Sections */
.fn3-sec { padding:80px 32px; max-width:1100px; margin:0 auto; }
@media(max-width:768px){.fn3-sec{padding:60px 20px;}}

/* Strip sections (full-width) */
.fn3-strip { padding:60px 0; }
.fn3-strip-hd { padding:0 32px; max-width:1100px; margin:0 auto 32px; }
@media(max-width:768px){.fn3-strip-hd{padding:0 20px;}}

/* About */
.fn3-about-inner { display:flex; gap:48px; align-items:center; padding:44px; }
@media(max-width:768px){.fn3-about-inner{flex-direction:column;padding:28px;gap:20px;text-align:center;}}

/* Grids */
.fn3-g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
@media(max-width:900px){.fn3-g3{grid-template-columns:repeat(2,1fr);}}
@media(max-width:540px){.fn3-g3{grid-template-columns:1fr;}}
.fn3-g2 { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }
@media(max-width:640px){.fn3-g2{grid-template-columns:1fr;}}
.fn3-contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; }
@media(max-width:768px){.fn3-contact-grid{grid-template-columns:1fr;}}

/* Stat card */
.fn3-statnum { font-family:'Cormorant Garamond',serif; font-size:clamp(42px,5vw,56px); font-weight:700; color:var(--pri); line-height:1; }
.fn3-statcard { padding:28px 20px; text-align:center; }

/* Service card */
.fn3-svccard { padding:32px; }
.fn3-svcicon { width:46px; height:46px; border-radius:12px; background:var(--card2); display:flex; align-items:center; justify-content:center; color:var(--pri); margin-bottom:18px; }

/* Portfolio card */
.fn3-portcard { overflow:hidden; cursor:pointer; }
.fn3-portimg { width:100%; height:200px; object-fit:cover; object-position:top left; display:block; }
.fn3-portbody { padding:18px 20px; }
.fn3-porttag { display:inline-flex; padding:3px 10px; border-radius:100px; background:var(--card2); font-size:11px; font-weight:600; color:var(--pri); letter-spacing:.05em; margin-bottom:8px; }

/* Contact input */
.fn3-input { width:100%; padding:12px 14px; border-radius:9px; border:1.5px solid var(--b0); background:var(--card); color:var(--t1); font-family:'DM Sans',sans-serif; font-size:14px; outline:none; transition:border-color .2s ease; resize:none; }
.fn3-input:focus { border-color:var(--pri); }
.fn3-input::placeholder { color:var(--t3); }

/* Footer */
.fn3-footer { border-top:1px solid var(--b0); padding:36px 32px; }
@media(max-width:768px){.fn3-footer{padding:28px 20px 80px;}}
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const LOGOS = [
  { src: "/logos/kaminskiy-logo.png", alt: "Kaminskiy" },
  { src: "/logos/popin-logo.png",     alt: "Popin" },
  { src: "/logos/logo1.png",          alt: "Client" },
  { src: "/logos/logo2.png",          alt: "Client" },
  { src: "/logos/logo3.png",          alt: "Client" },
  { src: "/logos/logo4.png",          alt: "Client" },
  { src: "/logos/logo5.png",          alt: "Client" },
  { src: "/logos/logo6.png",          alt: "Client" },
];

const AUTO_IMAGES = [
  { src: "/images/automations/kcr/01-workflow-list.png",          title: "Franchise Pipeline · GoHighLevel" },
  { src: "/images/automations/real-estate/wf1-concierge.jpeg",    title: "Real Estate Lifecycle · n8n" },
  { src: "/images/automations/publishing/facebook.jpeg",          title: "AI Receptionist · 4 Channels" },
  { src: "/images/automations/coaching/lead-automation.jpeg",     title: "Lead Scoring & Routing · n8n" },
  { src: "/images/automations/job-alert/system.jpeg",             title: "Job Alert Engine · Telegram" },
  { src: "/images/automations/spreadsheet/with-ai.jpeg",          title: "AI Data Processing · n8n" },
];

const SOCIAL_RESULTS = [
  { src: "/social-media-results/results-instagram.png",              label: "Instagram Growth" },
  { src: "/social-media-results/results-book-addicts-analytics.webp",label: "BookAddicts Analytics" },
  { src: "/social-media-results/results-book-addicts-profile.webp",  label: "BookAddicts Profile Growth" },
  { src: "/social-media-results/results-pinterest-glow.webp",        label: "Pinterest Strategy Results" },
];

const TESTIMONIALS = [
  {
    name: "Peter Douglas", role: "CEO, Sustaina Wines",
    photo: "/images/clients/peter-douglas.jpeg",
    text: "I hired Faithful for a complex wine project after reaching the limits of what standard automation could handle. He consistently delivered creative, out-of-the-box solutions in a timely manner. I highly recommend him for anyone facing unique technical challenges.",
  },
  {
    name: "Pierre-Louis Monnot", role: "Co-founder, Educato AI",
    photo: "/images/clients/Pierre.jpg",
    text: "Faithful did an excellent job leading our social media presence at Educato. In just a couple of weeks, he grasped our brand voice, created engaging content, and helped us grow our online presence. I highly recommend him for any social media or content marketing role!",
  },
  {
    name: "Tekla Balfour", role: "CEO, POPIN",
    photo: "/images/clients/Tekla.jpg",
    text: "I truly appreciate your support and efforts. Your work ethic and the dedication that you have put into the Instagram page is an integral part of our journey.",
  },
  {
    name: "Avantika", role: "Publishing Company",
    photo: null,
    text: "He is amazing at what he does, very prompt and professional. Looking forward for future collabs.",
  },
];

const STATS = [
  { value: 1,    prefix: "",  suffix: "M+",  label: "Monthly organic views · Book Addicts Pinterest" },
  { value: 470,  prefix: "",  suffix: "+",   label: "Businesses engaged · POPIN Instagram" },
  { value: 400,  prefix: "",  suffix: "K+",  label: "Monthly views in 60 days · GlowVibe Pinterest" },
  { value: 326,  prefix: "+", suffix: "%",   label: "Impression growth · Pinterest verified" },
  { value: 10,   prefix: "",  suffix: "",    label: "GHL workflows built · KCR franchise pipeline" },
  { value: 4,    prefix: "",  suffix: "",    label: "Channels automated · AI receptionist system" },
];

const PORTFOLIO = [
  {
    tag: "Franchise Sales",
    name: "Kaminskiy Care & Repair",
    desc: "10 GoHighLevel workflows across 7 pipeline stages — automated follow-ups, no-show recovery, and Sales-to-Ops handoff on deal closure.",
    metric: "10 workflows · 0 manual follow-ups",
    img: "/images/automations/kcr/01-workflow-list.png",
  },
  {
    tag: "Real Estate",
    name: "Full Client Lifecycle",
    desc: "3-workflow n8n system for a UK real estate agency — AI lead intake, automated 48hr follow-ups, and post-sale document collection.",
    metric: "3 workflows · 0 admin steps",
    img: "/images/automations/real-estate/wf1-concierge.jpeg",
  },
  {
    tag: "Instagram Growth",
    name: "POPIN",
    desc: "Built a community of 470+ pop-up businesses from zero — 200+ waitlist sign-ups via Stories, 500+ emails collected organically. Community built before the product was ready.",
    metric: "470+ businesses engaged",
    img: "/social-media-images/popin-app-cover.jpg",
  },
  {
    tag: "Pinterest Strategy",
    name: "Book Addicts",
    desc: "Zero to 1M monthly views in 4 months through Pinterest SEO mastered from scratch. Creator Hub status achieved. Organic only — no ad spend.",
    metric: "1M+ monthly views in 4 months",
    img: "/social-media-results/results-book-addicts-analytics.webp",
  },
];

const SVC_FEATURES_1 = ["CRM Setup & Configuration", "Automated Lead Nurturing", "Sales Funnel Build-out", "Email & SMS Sequences", "No-Show Recovery Flows"];
const SVC_FEATURES_2 = ["Content Strategy & Planning", "Instagram & Pinterest Management", "Community Building", "Viral Campaign Design", "Brand Voice Development"];

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useTheme(): { theme: string; toggle: () => void } {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("fn-theme") ?? "light";
  });
  const toggle = () =>
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      localStorage.setItem("fn-theme", next);
      return next;
    });
  return { theme, toggle };
}

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"type" | "pause" | "delete">("type");

  useEffect(() => {
    const word = words[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "type") {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), 90);
      } else {
        t = setTimeout(() => setPhase("pause"), 100);
      }
    } else if (phase === "pause") {
      t = setTimeout(() => setPhase("delete"), 1700);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 48);
      } else {
        t = setTimeout(() => { setWordIdx((i) => (i + 1) % words.length); setPhase("type"); }, 380);
      }
    }
    return () => clearTimeout(t);
  }, [text, wordIdx, phase, words]);

  return text;
}

// ─── SHARED ──────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => el.classList.add("fn3-vis"), delay); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "-20px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className="fn3-rev">{children}</div>;
}

function StatCard({ value, prefix = "", suffix, label }: { value: number; prefix?: string; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const dur = 1800, start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, value]);
  return (
    <div ref={ref} className="fn3-card fn3-statcard">
      <div className="fn3-statnum">{prefix}{count}{suffix}</div>
      <div style={{ fontSize: "13px", color: "var(--t2)", marginTop: "7px" }}>{label}</div>
    </div>
  );
}

// ─── MARQUEE WRAPPER ─────────────────────────────────────────────────────────
function Marquee({ children, reverse = false, speed = "" }: { children: ReactNode; reverse?: boolean; speed?: string }) {
  return (
    <div className="fn3-mq-wrap">
      <div className={`fn3-mq-track${speed ? ` fn3-mq-${speed}` : ""}${reverse ? " fn3-mq-rev" : ""}`}>
        {children}
        {children}
      </div>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <nav className="fn3-nav">
      <a href="#home" className="fn3-serif" style={{ fontSize: "22px", fontWeight: 700, color: "var(--pri)", textDecoration: "none" }}>FN</a>
      <div className="fn3-navlinks">
        {[["#about","About"],["#services","Services"],["#portfolio","Portfolio"],["#reviews","Reviews"],["#contact","Contact"]].map(([href, label]) => (
          <a key={href} href={href} className="fn3-navlink">{label}</a>
        ))}
      </div>
      <button className="fn3-tbtn" onClick={onToggle} aria-label="Toggle theme">
        {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
      </button>
    </nav>
  );
}

// ─── MOBILE NAV ──────────────────────────────────────────────────────────────
const MOB_TABS = [
  { id: "home",      label: "Home",     Icon: Home },
  { id: "about",     label: "About",    Icon: User },
  { id: "services",  label: "Services", Icon: Zap },
  { id: "portfolio", label: "Work",     Icon: Briefcase },
  { id: "reviews",   label: "Reviews",  Icon: Star },
  { id: "contact",   label: "Contact",  Icon: Mail },
];

function MobileNav({ theme, onToggle, active, setActive }: { theme: string; onToggle: () => void; active: string; setActive: (s: string) => void }) {
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setActive(id); };
  return (
    <nav className="fn3-mobnav">
      {MOB_TABS.map(({ id, label, Icon }) => (
        <button key={id} className={`fn3-mobtab${active === id ? " active" : ""}`} onClick={() => scrollTo(id)}>
          <Icon size={18} /><span>{label}</span>
        </button>
      ))}
      <button className="fn3-mobtab" onClick={onToggle}>
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}<span>Theme</span>
      </button>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero({ word }: { word: string }) {
  return (
    <div id="home" className="fn3-hero">
      <div style={{ flex: 1 }}>
        <div className="fn3-statusbadge">
          <span className="fn3-dot" /> Available for new projects
        </div>
        <h1 className="fn3-h1" style={{ marginBottom: "22px" }}>
          I{" "}
          <span style={{ color: "var(--pri)", fontStyle: "italic" }}>{word}</span>
          <span className="fn3-cursor" />
          {" "}growth<br />systems for brands.
        </h1>
        <p className="fn3-hero-sub">
          Revenue systems architect and automation strategist. I build the backend infrastructure
          that helps brands grow, convert, and retain — on autopilot.
        </p>
        <div className="fn3-hero-actions">
          <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer" className="fn3-btn fn3-btn-pri">
            Book a System Audit <ArrowRight size={15} />
          </a>
          <a href="#portfolio" className="fn3-btn fn3-btn-out">View my work</a>
        </div>
      </div>
      <div className="fn3-hero-img">FN</div>
    </div>
  );
}

// ─── LOGO MARQUEE ────────────────────────────────────────────────────────────
function LogoMarquee() {
  return (
    <div className="fn3-strip" style={{ borderTop: "1px solid var(--b0)", borderBottom: "1px solid var(--b0)" }}>
      <div className="fn3-strip-hd">
        <span className="fn3-label" style={{ marginBottom: 0 }}>Trusted by</span>
      </div>
      <Marquee speed="med">
        {LOGOS.map((l, i) => (
          <div key={i} className="fn3-logo-item">
            <img src={l.src} alt={l.alt} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  const tags = ["Revenue Automation", "CRM Systems", "Social Growth", "Content Strategy", "n8n", "GoHighLevel"];
  const highlights = [["1M+", "Monthly organic views"], ["470+", "Businesses engaged"], ["6", "Case studies built"]];
  return (
    <div id="about" className="fn3-sec">
      <Reveal>
        <div className="fn3-card fn3-about-inner">
          <div style={{ flex: 1, minWidth: 0 }}>
            <span className="fn3-label">About me</span>
            <h2 className="fn3-h2" style={{ marginBottom: "18px" }}>
              Building systems that{" "}
              <span style={{ fontStyle: "italic", color: "var(--pri)" }}>work without you.</span>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.78", color: "var(--t2)", marginBottom: "14px" }}>
              I'm Faithful — a revenue systems architect and automation strategist. I help brands
              build the backend infrastructure that turns attention into revenue, and leads into loyal customers.
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.78", color: "var(--t2)", marginBottom: "24px" }}>
              From GoHighLevel franchise pipelines to n8n AI receptionists, I design systems that run 24/7 —
              so you can focus on the vision, not the machine.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <span key={tag} style={{ padding: "4px 12px", background: "var(--card2)", border: "1px solid var(--b0)", borderRadius: "100px", fontSize: "12px", color: "var(--t2)" }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: "20px", minWidth: "160px" }}>
            {highlights.map(([num, lbl]) => (
              <div key={lbl}>
                <div className="fn3-serif" style={{ fontSize: "38px", fontWeight: 700, color: "var(--pri)", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: "13px", color: "var(--t3)", marginTop: "4px" }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// ─── AUTOMATION STRIP ────────────────────────────────────────────────────────
function AutomationStrip() {
  return (
    <div className="fn3-strip">
      <div className="fn3-strip-hd">
        <Reveal>
          <span className="fn3-label">Real systems I've built</span>
          <h2 className="fn3-h2" style={{ marginBottom: "6px" }}>Automation work</h2>
          <p style={{ fontSize: "15px", color: "var(--t2)" }}>Live n8n and GoHighLevel workflows deployed for real clients.</p>
        </Reveal>
      </div>
      <Marquee speed="med">
        {AUTO_IMAGES.map((a, i) => (
          <div key={i} className="fn3-auto-card">
            <img src={a.src} alt={a.title} />
            <div className="fn3-auto-card-label">{a.title}</div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// ─── SOCIAL RESULTS STRIP ────────────────────────────────────────────────────
function SocialStrip() {
  return (
    <div className="fn3-strip">
      <div className="fn3-strip-hd">
        <Reveal>
          <span className="fn3-label">Social media results</span>
          <h2 className="fn3-h2" style={{ marginBottom: "6px" }}>Numbers don't lie</h2>
          <p style={{ fontSize: "15px", color: "var(--t2)" }}>Real analytics and growth results from client accounts.</p>
        </Reveal>
      </div>
      <Marquee reverse speed="slow">
        {SOCIAL_RESULTS.map((r, i) => (
          <div key={i} className="fn3-social-card">
            <img src={r.src} alt={r.label} />
            <div className="fn3-social-card-label">{r.label}</div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// ─── STATS ───────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <div className="fn3-sec">
      <Reveal>
        <span className="fn3-label">By the numbers</span>
        <h2 className="fn3-h2" style={{ marginBottom: "36px" }}>Results that speak</h2>
      </Reveal>
      <div className="fn3-g3">
        {STATS.map((s) => <StatCard key={s.label} value={s.value} prefix={s.prefix} suffix={s.suffix} label={s.label} />)}
      </div>
    </div>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
function Services() {
  return (
    <div id="services" className="fn3-sec">
      <Reveal>
        <span className="fn3-label">What I do</span>
        <h2 className="fn3-h2" style={{ marginBottom: "8px" }}>Services</h2>
        <p style={{ fontSize: "15px", color: "var(--t2)", marginBottom: "36px", maxWidth: "480px" }}>
          Two core offerings built to automate your revenue and grow your brand.
        </p>
      </Reveal>
      <div className="fn3-g2">
        <Reveal>
          <div className="fn3-card fn3-svccard">
            <div className="fn3-svcicon"><Zap size={20} /></div>
            <h3 className="fn3-h3" style={{ marginBottom: "12px" }}>Revenue Automation Systems</h3>
            <p style={{ fontSize: "14.5px", lineHeight: "1.75", color: "var(--t2)", marginBottom: "20px" }}>
              End-to-end backend infrastructure using GoHighLevel and n8n. CRM setups, automated
              lead nurturing, follow-up sequences, and AI-powered intake systems that convert while you sleep.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "28px" }}>
              {SVC_FEATURES_1.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13.5px", color: "var(--t2)" }}>
                  <span style={{ width: "6px", height: "6px", background: "var(--pri)", borderRadius: "50%", flexShrink: 0 }} />{f}
                </div>
              ))}
            </div>
            <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer" className="fn3-btn fn3-btn-pri" style={{ width: "100%", justifyContent: "center" }}>
              Book a System Audit <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="fn3-card fn3-svccard">
            <div className="fn3-svcicon"><TrendingUp size={20} /></div>
            <h3 className="fn3-h3" style={{ marginBottom: "12px" }}>Social Media Growth</h3>
            <p style={{ fontSize: "14.5px", lineHeight: "1.75", color: "var(--t2)", marginBottom: "20px" }}>
              Strategic content systems and community growth for Instagram and Pinterest. Content
              strategies, account management, and organic growth engines that turn followers into buyers.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "28px" }}>
              {SVC_FEATURES_2.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13.5px", color: "var(--t2)" }}>
                  <span style={{ width: "6px", height: "6px", background: "var(--pri)", borderRadius: "50%", flexShrink: 0 }} />{f}
                </div>
              ))}
            </div>
            <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer" className="fn3-btn fn3-btn-out" style={{ width: "100%", justifyContent: "center" }}>
              Start Growing <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── PORTFOLIO ───────────────────────────────────────────────────────────────
function Portfolio() {
  return (
    <div id="portfolio" className="fn3-sec">
      <Reveal>
        <span className="fn3-label">Selected Work</span>
        <h2 className="fn3-h2" style={{ marginBottom: "8px" }}>Portfolio</h2>
        <p style={{ fontSize: "15px", color: "var(--t2)", marginBottom: "36px", maxWidth: "480px" }}>Real results for real brands.</p>
      </Reveal>
      <div className="fn3-g2">
        {PORTFOLIO.map(({ tag, name, desc, metric, img }, i) => (
          <Reveal key={name} delay={i * 75}>
            <div className="fn3-card fn3-portcard">
              <img src={img} alt={name} className="fn3-portimg" />
              <div className="fn3-portbody">
                <span className="fn3-porttag">{tag}</span>
                <h3 className="fn3-h3" style={{ marginBottom: "8px" }}>{name}</h3>
                <p style={{ fontSize: "13.5px", lineHeight: "1.72", color: "var(--t2)", marginBottom: "14px" }}>{desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--pri)" }}>
                  <TrendingUp size={13} /> {metric}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── TESTIMONIALS MARQUEE ────────────────────────────────────────────────────
function Testimonials() {
  return (
    <div id="reviews" className="fn3-strip">
      <div className="fn3-strip-hd">
        <Reveal>
          <span className="fn3-label">Client Stories</span>
          <h2 className="fn3-h2" style={{ marginBottom: "6px" }}>What clients say</h2>
          <p style={{ fontSize: "15px", color: "var(--t2)" }}>Real feedback from real projects.</p>
        </Reveal>
      </div>
      <Marquee speed="slow">
        {TESTIMONIALS.map(({ name, role, photo, text }) => (
          <div key={name} className="fn3-tm-card">
            <span className="fn3-tm-q">"</span>
            <p className="fn3-tm-text">{text}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {photo ? (
                <img src={photo} alt={name} className="fn3-tm-avatar" />
              ) : (
                <div className="fn3-tm-avatar-init">{name.split(" ").map(n => n[0]).join("").slice(0,2)}</div>
              )}
              <div>
                <div style={{ fontSize: "13.5px", fontWeight: 600 }}>{name}</div>
                <div style={{ fontSize: "12px", color: "var(--t3)" }}>{role}</div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <div id="contact" className="fn3-sec">
      <div className="fn3-contact-grid">
        <Reveal>
          <span className="fn3-label">Get in touch</span>
          <h2 className="fn3-h2" style={{ marginBottom: "16px" }}>
            Let's build something{" "}
            <span style={{ fontStyle: "italic", color: "var(--pri)" }}>worth growing.</span>
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.75", color: "var(--t2)", marginBottom: "28px" }}>
            Whether you need a full revenue automation system or a social media growth strategy,
            I'd love to hear about your brand.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <a href="mailto:faithfulnyama@gmail.com" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--t2)", textDecoration: "none" }}>
              <Mail size={15} style={{ color: "var(--pri)" }} /> faithfulnyama@gmail.com
            </a>
            <a href="https://www.instagram.com/faithfulnyama" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--t2)", textDecoration: "none" }}>
              <Instagram size={15} style={{ color: "var(--pri)" }} /> @faithfulnyama
            </a>
            <a href="https://www.linkedin.com/in/faithfulnyama" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--t2)", textDecoration: "none" }}>
              <Linkedin size={15} style={{ color: "var(--pri)" }} /> linkedin.com/in/faithfulnyama
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="fn3-card" style={{ padding: "32px" }}>
            <h3 className="fn3-h3" style={{ marginBottom: "6px" }}>Book a free audit</h3>
            <p style={{ fontSize: "13.5px", color: "var(--t2)", marginBottom: "22px" }}>30 minutes. No pitch. Just strategy.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input className="fn3-input" placeholder="Your name" />
              <input className="fn3-input" placeholder="Email address" type="email" />
              <textarea className="fn3-input" placeholder="Tell me about your business and goals..." rows={4} />
              <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer" className="fn3-btn fn3-btn-pri" style={{ justifyContent: "center" }}>
                Schedule on Calendly <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function PageFooter({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <footer className="fn3-footer">
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <a href="#home" className="fn3-serif" style={{ fontSize: "22px", fontWeight: 700, color: "var(--pri)", textDecoration: "none" }}>FN</a>
        <span style={{ fontSize: "12.5px", color: "var(--t3)" }}>© {new Date().getFullYear()} Faithful Nyama. All rights reserved.</span>
        <button className="fn3-tbtn" onClick={onToggle} aria-label="Toggle theme">
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function PersonalPage() {
  const { theme, toggle } = useTheme();
  const word = useTypewriter(["build", "design", "create", "launch"]);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "about", "services", "portfolio", "reviews", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className={`fn3 fn3-${theme}`}>
      <style>{STYLES}</style>
      <Navbar theme={theme} onToggle={toggle} />
      <main>
        <Hero word={word} />
        <LogoMarquee />
        <About />
        <AutomationStrip />
        <SocialStrip />
        <Stats />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <PageFooter theme={theme} onToggle={toggle} />
      <MobileNav theme={theme} onToggle={toggle} active={active} setActive={setActive} />
    </div>
  );
}
