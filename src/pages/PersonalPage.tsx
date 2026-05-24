import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  Home, User, Zap, Briefcase, Star, Mail,
  Sun, Moon, ArrowRight, Instagram, Linkedin, Globe, BarChart3, TrendingUp,
} from "lucide-react";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.fn3 *, .fn3 *::before, .fn3 *::after { box-sizing: border-box; margin: 0; padding: 0; }
.fn3 { font-family: 'DM Sans', sans-serif; min-height: 100vh; overflow-x: hidden; scroll-behavior: smooth; }

/* ── LIGHT ── */
.fn3.fn3-light {
  --bg: #f8f7f4; --card: #ffffff; --card2: #f0ede6;
  --pri: #1a3d2b; --pri2: #2d5c42; --acc: #c9a84c;
  --t1: #18181a; --t2: #585850; --t3: #9b9b92;
  --b0: rgba(26,61,43,.10); --b1: rgba(26,61,43,.28);
  --sh: rgba(0,0,0,.06);
  background: var(--bg); color: var(--t1);
}
/* ── DARK ── */
.fn3.fn3-dark {
  --bg: #0c0c0b; --card: #141413; --card2: #1c1c1a;
  --pri: #c9a84c; --pri2: #e8c97a; --acc: #2d5c42;
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
.fn3-navlink:hover,.fn3-navlink.active { color:var(--pri); }

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
.fn3-hero { min-height:100vh; display:flex; align-items:center; padding:70px 32px 60px; max-width:1100px; margin:0 auto; gap:60px; }
@media(max-width:768px){.fn3-hero{flex-direction:column-reverse;padding:78px 20px 90px;gap:28px;min-height:unset;text-align:center;}}
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

/* Tool card */
.fn3-toolcard { padding:18px 20px; display:flex; align-items:center; gap:14px; }
.fn3-toolicon { width:40px; height:40px; border-radius:10px; background:var(--card2); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--pri); }

/* Stat card */
.fn3-statnum { font-family:'Cormorant Garamond',serif; font-size:clamp(42px,5vw,56px); font-weight:700; color:var(--pri); line-height:1; }
.fn3-statcard { padding:28px 20px; text-align:center; }

/* Service card */
.fn3-svccard { padding:32px; }
.fn3-svcicon { width:46px; height:46px; border-radius:12px; background:var(--card2); display:flex; align-items:center; justify-content:center; color:var(--pri); margin-bottom:18px; }

/* Portfolio card */
.fn3-portcard { overflow:hidden; cursor:pointer; }
.fn3-portimg { width:100%; height:180px; background:var(--card2); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:42px; font-style:italic; color:var(--pri); letter-spacing:-.02em; }
.fn3-portbody { padding:18px 20px; }
.fn3-porttag { display:inline-flex; padding:3px 10px; border-radius:100px; background:var(--card2); font-size:11px; font-weight:600; color:var(--pri); letter-spacing:.05em; margin-bottom:8px; }

/* Testimonial card */
.fn3-testicard { padding:26px; }
.fn3-testiq { font-family:'Cormorant Garamond',serif; font-size:56px; line-height:1; color:var(--pri); opacity:.22; display:block; margin-bottom:-12px; }
.fn3-testitext { font-size:14.5px; line-height:1.78; color:var(--t2); margin-bottom:18px; }
.fn3-testiau { width:36px; height:36px; border-radius:50%; background:var(--pri); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-style:italic; font-size:15px; color:var(--bg); flex-shrink:0; }

/* Contact input */
.fn3-input { width:100%; padding:12px 14px; border-radius:9px; border:1.5px solid var(--b0); background:var(--card); color:var(--t1); font-family:'DM Sans',sans-serif; font-size:14px; outline:none; transition:border-color .2s ease; resize:none; }
.fn3-input:focus { border-color:var(--pri); }
.fn3-input::placeholder { color:var(--t3); }

/* Footer */
.fn3-footer { border-top:1px solid var(--b0); padding:36px 32px; }
@media(max-width:768px){.fn3-footer{padding:28px 20px 80px;}}
`;

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
        t = setTimeout(() => {
          setWordIdx((i) => (i + 1) % words.length);
          setPhase("type");
        }, 380);
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("fn3-vis"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "-20px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className="fn3-rev">{children}</div>;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const dur = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, value]);

  return (
    <div ref={ref} className="fn3-card fn3-statcard">
      <div className="fn3-statnum">{count}{suffix}</div>
      <div style={{ fontSize: "13px", color: "var(--t2)", marginTop: "7px" }}>{label}</div>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <nav className="fn3-nav">
      <a
        href="#home"
        className="fn3-serif"
        style={{ fontSize: "22px", fontWeight: 700, color: "var(--pri)", textDecoration: "none" }}
      >
        FN
      </a>
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

function MobileNav({
  theme, onToggle, active, setActive,
}: { theme: string; onToggle: () => void; active: string; setActive: (s: string) => void }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };
  return (
    <nav className="fn3-mobnav">
      {MOB_TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`fn3-mobtab${active === id ? " active" : ""}`}
          onClick={() => scrollTo(id)}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
      <button className="fn3-mobtab" onClick={onToggle}>
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        <span>Theme</span>
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
          <span className="fn3-dot" />
          Available for new projects
        </div>
        <h1 className="fn3-h1" style={{ marginBottom: "22px" }}>
          I{" "}
          <span style={{ color: "var(--pri)", fontStyle: "italic" }}>{word}</span>
          <span className="fn3-cursor" />
          {" "}growth<br />systems for brands.
        </h1>
        <p className="fn3-hero-sub">
          Revenue systems architect and automation strategist. I build the backend
          infrastructure that helps brands grow, convert, and retain — on autopilot.
        </p>
        <div className="fn3-hero-actions">
          <a
            href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="fn3-btn fn3-btn-pri"
          >
            Book a System Audit <ArrowRight size={15} />
          </a>
          <a href="#portfolio" className="fn3-btn fn3-btn-out">View my work</a>
        </div>
      </div>
      <div className="fn3-hero-img">FN</div>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  const tags = ["Revenue Automation", "CRM Systems", "Social Growth", "Content Strategy", "n8n", "GoHighLevel"];
  const highlights = [["3+", "Years experience"], ["50+", "Clients served"], ["$2M+", "Revenue generated"]];
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
              From GoHighLevel funnels to n8n automation workflows, I design systems that run 24/7 —
              so you can focus on the vision, not the machine.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{ padding: "4px 12px", background: "var(--card2)", border: "1px solid var(--b0)", borderRadius: "100px", fontSize: "12px", color: "var(--t2)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: "20px", minWidth: "160px" }}>
            {highlights.map(([num, lbl]) => (
              <div key={lbl}>
                <div className="fn3-serif" style={{ fontSize: "36px", fontWeight: 700, color: "var(--pri)", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: "13px", color: "var(--t3)", marginTop: "4px" }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// ─── TOOLS ───────────────────────────────────────────────────────────────────
const TOOLS = [
  { name: "GoHighLevel", desc: "CRM & Funnels",        Icon: BarChart3 },
  { name: "n8n",          desc: "Workflow Automation", Icon: Zap },
  { name: "Instagram",    desc: "Social Growth",       Icon: Instagram },
  { name: "Meta Suite",   desc: "Ad Campaigns",        Icon: Globe },
  { name: "Pinterest",    desc: "Visual Marketing",    Icon: TrendingUp },
  { name: "Canva",        desc: "Content Design",      Icon: Star },
];

function Tools() {
  return (
    <div className="fn3-sec">
      <Reveal>
        <span className="fn3-label">Tech Stack</span>
        <h2 className="fn3-h2" style={{ marginBottom: "8px" }}>Tools I work with</h2>
        <p style={{ fontSize: "15px", color: "var(--t2)", marginBottom: "36px", maxWidth: "480px" }}>
          The platforms I use to build automated revenue systems and social growth engines.
        </p>
      </Reveal>
      <div className="fn3-g3">
        {TOOLS.map(({ name, desc, Icon }, i) => (
          <Reveal key={name} delay={i * 55}>
            <div className="fn3-card fn3-toolcard">
              <div className="fn3-toolicon"><Icon size={18} /></div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>{name}</div>
                <div style={{ fontSize: "12px", color: "var(--t3)" }}>{desc}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── STATS ───────────────────────────────────────────────────────────────────
const STATS = [
  { value: 50,  suffix: "+",  label: "Clients served" },
  { value: 30,  suffix: "+",  label: "Systems built" },
  { value: 2,   suffix: "M+", label: "Revenue generated ($)" },
  { value: 500, suffix: "K+", label: "Content views" },
  { value: 98,  suffix: "%",  label: "Client retention" },
  { value: 3,   suffix: "+",  label: "Years experience" },
];

function Stats() {
  return (
    <div className="fn3-sec">
      <Reveal>
        <span className="fn3-label">By the numbers</span>
        <h2 className="fn3-h2" style={{ marginBottom: "36px" }}>Results that speak</h2>
      </Reveal>
      <div className="fn3-g3">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
    </div>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
const SVC_FEATURES_1 = ["CRM Setup & Configuration", "Automated Lead Nurturing", "Sales Funnel Build-out", "Email & SMS Sequences", "Reporting & Analytics"];
const SVC_FEATURES_2 = ["Content Strategy & Planning", "Instagram & Pinterest Management", "Community Building", "Viral Campaign Design", "Brand Voice Development"];

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
              End-to-end backend infrastructure using GoHighLevel and n8n. I build CRM setups,
              automated lead nurturing, follow-up sequences, and funnel systems that convert while you sleep.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "28px" }}>
              {SVC_FEATURES_1.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13.5px", color: "var(--t2)" }}>
                  <span style={{ width: "6px", height: "6px", background: "var(--pri)", borderRadius: "50%", flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
            <a
              href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="fn3-btn fn3-btn-pri"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Book a System Audit <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="fn3-card fn3-svccard">
            <div className="fn3-svcicon"><TrendingUp size={20} /></div>
            <h3 className="fn3-h3" style={{ marginBottom: "12px" }}>Social Media Growth</h3>
            <p style={{ fontSize: "14.5px", lineHeight: "1.75", color: "var(--t2)", marginBottom: "20px" }}>
              Strategic content systems and community growth for Instagram and Pinterest. I create
              content strategies, manage accounts, and build organic growth engines that turn followers into buyers.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "28px" }}>
              {SVC_FEATURES_2.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13.5px", color: "var(--t2)" }}>
                  <span style={{ width: "6px", height: "6px", background: "var(--pri)", borderRadius: "50%", flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
            <a
              href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="fn3-btn fn3-btn-out"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Start Growing <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── PORTFOLIO ───────────────────────────────────────────────────────────────
const PROJECTS = [
  { name: "Popin",       tag: "Social Growth",    glyph: "✦", desc: "Grew a social discovery app from 0 to 52K followers in 4 months through strategic content and community activation.", metric: "52K followers gained" },
  { name: "BookAddicts", tag: "Automation",        glyph: "◈", desc: "Built a full CRM and email automation system for a book subscription community, reducing churn by 38%.",            metric: "38% churn reduction" },
  { name: "BookLovers",  tag: "Content Strategy", glyph: "◎", desc: "Created a content calendar and Pinterest strategy that generated 800K+ impressions in 90 days.",                     metric: "800K+ impressions" },
  { name: "Kaminskiy",   tag: "Revenue Systems",  glyph: "◆", desc: "Deployed a GoHighLevel funnel and n8n automation stack that tripled lead conversion for a home services brand.",      metric: "3× lead conversion" },
];

function Portfolio() {
  return (
    <div id="portfolio" className="fn3-sec">
      <Reveal>
        <span className="fn3-label">Selected Work</span>
        <h2 className="fn3-h2" style={{ marginBottom: "8px" }}>Portfolio</h2>
        <p style={{ fontSize: "15px", color: "var(--t2)", marginBottom: "36px", maxWidth: "480px" }}>
          Real results for real brands.
        </p>
      </Reveal>
      <div className="fn3-g2">
        {PROJECTS.map(({ name, tag, glyph, desc, metric }, i) => (
          <Reveal key={name} delay={i * 75}>
            <div className="fn3-card fn3-portcard">
              <div className="fn3-portimg">{glyph}</div>
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

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Pierre-Louis M.", role: "Founder, Popin", initials: "PL",
    text: "Faithful completely transformed our social presence. The content system she built is still running and generating growth months later. Genuinely one of the most strategic people I've worked with.",
  },
  {
    name: "Tekla W.", role: "CEO, BookAddicts", initials: "TW",
    text: "The automation system Faithful built cut our team's manual work in half. Our email sequences now nurture leads automatically and our conversion rate went up 40%. Worth every penny.",
  },
  {
    name: "Avantika S.", role: "CMO, BookLovers", initials: "AS",
    text: "We hired Faithful for a Pinterest strategy and she delivered a full content engine. 800K impressions in 3 months and Pinterest now drives 30% of our web traffic. Incredible work.",
  },
];

function Testimonials() {
  return (
    <div id="reviews" className="fn3-sec">
      <Reveal>
        <span className="fn3-label">Client Stories</span>
        <h2 className="fn3-h2" style={{ marginBottom: "36px" }}>What clients say</h2>
      </Reveal>
      <div className="fn3-g3">
        {TESTIMONIALS.map(({ name, role, initials, text }, i) => (
          <Reveal key={name} delay={i * 80}>
            <div className="fn3-card fn3-testicard">
              <span className="fn3-testiq">"</span>
              <p className="fn3-testitext">{text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="fn3-testiau">{initials}</div>
                <div>
                  <div style={{ fontSize: "13.5px", fontWeight: 600 }}>{name}</div>
                  <div style={{ fontSize: "12px", color: "var(--t3)" }}>{role}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
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
            <a
              href="mailto:faithfulnyama@gmail.com"
              style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--t2)", textDecoration: "none" }}
            >
              <Mail size={15} style={{ color: "var(--pri)" }} /> faithfulnyama@gmail.com
            </a>
            <a
              href="https://www.instagram.com/faithfulnyama"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--t2)", textDecoration: "none" }}
            >
              <Instagram size={15} style={{ color: "var(--pri)" }} /> @faithfulnyama
            </a>
            <a
              href="https://www.linkedin.com/in/faithfulnyama"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--t2)", textDecoration: "none" }}
            >
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
              <a
                href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="fn3-btn fn3-btn-pri"
                style={{ justifyContent: "center" }}
              >
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
        <a
          href="#home"
          className="fn3-serif"
          style={{ fontSize: "22px", fontWeight: 700, color: "var(--pri)", textDecoration: "none" }}
        >
          FN
        </a>
        <span style={{ fontSize: "12.5px", color: "var(--t3)" }}>
          © {new Date().getFullYear()} Faithful Nyama. All rights reserved.
        </span>
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
        { threshold: 0.35 }
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
        <About />
        <Tools />
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
