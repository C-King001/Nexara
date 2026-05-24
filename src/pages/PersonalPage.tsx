import { useRef, useState, useEffect, type ReactNode, type CSSProperties } from "react";
import { BarChart3, Zap, Globe, Instagram, Linkedin, Mail, Menu, X, TrendingUp, Settings } from "lucide-react";

// ─── STYLES ──────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,400;1,700;1,800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

@property --ba {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.fn-page *, .fn-page *::before, .fn-page *::after { box-sizing: border-box; margin: 0; padding: 0; }

.fn-page {
  --gold: #c9a84c;
  --gold-l: #e8c97a;
  --purple: #7c3aed;
  --purple-l: #a78bfa;
  --bg: #0a0a0a;
  --surface: #111111;
  --surface-2: #1a1a1a;
  --white: #f5f5f0;
  --dim: #9a9a90;
  --border: rgba(201,168,76,0.15);
  --grad: linear-gradient(135deg, #c9a84c 0%, #7c3aed 100%);
  background: var(--bg);
  color: var(--white);
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

@keyframes ba-spin { to { --ba: 360deg; } }
@keyframes marquee-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes pulse-ring { 0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); } 60% { box-shadow: 0 0 0 6px rgba(74,222,128,0); } }
@keyframes word-in { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
@keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }

.fn-reveal { opacity:0; transform:translateY(28px); transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1); }
.fn-reveal.fn-vis { opacity:1; transform:translateY(0); }

.fn-word { display:inline-block; opacity:0; animation:word-in .65s cubic-bezier(.22,1,.36,1) forwards; }

.fn-border {
  background: conic-gradient(from var(--ba), rgba(201,168,76,.7), rgba(124,58,237,.55), rgba(10,10,10,.2), rgba(124,58,237,.55), rgba(201,168,76,.7));
  padding: 1px;
  border-radius: 18px;
  animation: ba-spin 5s linear infinite;
}
.fn-border-inner { background:#111; border-radius:17px; width:100%; height:100%; transition:background .2s; }

.fn-lift { transition:transform .3s ease,filter .3s ease; }
.fn-lift:hover { transform:translateY(-5px); filter:drop-shadow(0 20px 40px rgba(201,168,76,.13)); }

.fn-cta { background:var(--grad); color:#fff; font-family:'DM Sans',sans-serif; font-weight:600; font-size:15px; border-radius:9999px; border:none; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; padding:14px 32px; transition:box-shadow .3s ease,transform .2s ease; white-space:nowrap; }
.fn-cta:hover { box-shadow:0 0 32px rgba(201,168,76,.45),0 8px 32px rgba(124,58,237,.3); transform:translateY(-2px); }

.fn-cta-out { background:transparent; border:1.5px solid var(--gold); color:var(--gold); font-family:'DM Sans',sans-serif; font-weight:600; font-size:15px; border-radius:9999px; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; padding:14px 32px; transition:background .2s,color .2s; white-space:nowrap; }
.fn-cta-out:hover { background:var(--gold); color:#0a0a0a; }

.fn-marquee { display:flex; white-space:nowrap; animation:marquee-l 30s linear infinite; }

.fn-tag-g { background:rgba(201,168,76,.1); color:#c9a84c; border-radius:9999px; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.12em; padding:4px 13px; display:inline-block; }
.fn-tag-p { background:rgba(124,58,237,.12); color:#a78bfa; border-radius:9999px; font-size:11px; font-weight:500; padding:5px 13px; display:inline-block; }

.fn-nav-lnk { color:#9a9a90; text-decoration:none; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:400; transition:color .2s; cursor:pointer; background:none; border:none; padding:0; }
.fn-nav-lnk:hover { color:#c9a84c; }

.fn-proj-card:hover .fn-border-inner { background:#141414; }

@media(max-width:768px) {
  .fn-2col { grid-template-columns:1fr !important; }
  .fn-4col { grid-template-columns:1fr !important; }
  .fn-3col { grid-template-columns:1fr !important; }
  .fn-stat-grid { grid-template-columns:repeat(2,1fr) !important; }
  .fn-footer-row { flex-direction:column !important; align-items:center !important; text-align:center !important; gap:16px !important; }
}
`;

// ─── HELPERS ─────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("fn-vis"), delay); obs.disconnect(); }
    }, { threshold: 0.08, rootMargin: "-30px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`fn-reveal ${className}`}>{children}</div>;
};

const Label = ({ text }: { text: string }) => (
  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
    <div style={{ width:40, height:2, background:"#c9a84c", borderRadius:1, flexShrink:0 }} />
    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"#c9a84c", fontWeight:600 }}>{text}</span>
  </div>
);

// SWAP: replace inner div content with <img src="YOUR_PHOTO.jpg" className="w-full h-full object-cover" alt="Faithful Nyama" />
const Photo = ({ ratio = "4/5", badge }: { ratio?: string; badge?: string }) => (
  <div style={{ position:"relative", width:"100%" }}>
    <div className="fn-border fn-lift">
      <div className="fn-border-inner" style={{ aspectRatio:ratio, display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#1a1a1a,#0d0d0d)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 60% 40%,rgba(124,58,237,.14),rgba(201,168,76,.05) 45%,transparent 70%)" }} />
        <span style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:64, color:"#c9a84c", position:"relative", zIndex:1, animation:"float 4s ease-in-out infinite" }}>FN</span>
      </div>
    </div>
    {badge && (
      <div style={{ position:"absolute", bottom:-10, right:-10, background:"rgba(17,17,17,.95)", border:"1px solid rgba(201,168,76,.3)", borderRadius:9999, padding:"8px 16px", fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#c9a84c", backdropFilter:"blur(8px)", zIndex:2, whiteSpace:"nowrap" as const }}>
        {badge}
      </div>
    )}
  </div>
);

const Counter = ({ target, fmt }: { target: number; fmt: (n: number) => string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!on) return;
    let f = 0; const T = 60;
    const id = setInterval(() => {
      f++; const p = 1 - Math.pow(1 - f / T, 3);
      setV(Math.round(p * target));
      if (f >= T) { setV(target); clearInterval(id); }
    }, 2000 / T);
    return () => clearInterval(id);
  }, [on, target]);
  return <span ref={ref}>{fmt(v)}</span>;
};

// ─── NAVBAR ──────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); };
  const links: [string, string][] = [["about","About"],["work","Work"],["results","Results"],["services","Services"],["contact","Contact"]];

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, background:scrolled?"rgba(10,10,10,.88)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?"1px solid rgba(201,168,76,.08)":"none", transition:"all .4s ease" }}>
      <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 28px", height:72, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })} style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14, letterSpacing:"0.15em", textTransform:"uppercase" as const, color:"#f5f5f0", background:"none", border:"none", cursor:"pointer", padding:0 }}>
          FAITHFUL NYAMA
        </button>
        <div className="hidden md:flex" style={{ alignItems:"center", gap:32 }}>
          {links.map(([id, label]) => <button key={id} onClick={() => go(id)} className="fn-nav-lnk">{label}</button>)}
          <button onClick={() => go("contact")}
            style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, color:"#c9a84c", padding:"9px 22px", borderRadius:9999, border:"1.5px solid rgba(201,168,76,.45)", background:"transparent", cursor:"pointer", transition:"background .2s,color .2s", letterSpacing:".02em" }}
            onMouseEnter={e => { e.currentTarget.style.background="#c9a84c"; e.currentTarget.style.color="#0a0a0a"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#c9a84c"; }}>
            Let's Talk →
          </button>
        </div>
        <button onClick={() => setOpen(true)} className="md:hidden" style={{ color:"#f5f5f0", background:"none", border:"none", cursor:"pointer", padding:4 }}><Menu size={22} /></button>
      </div>

      {open && (
        <div style={{ position:"fixed", inset:0, background:"#0a0a0a", zIndex:2000, display:"flex", flexDirection:"column" as const, alignItems:"center", justifyContent:"center", gap:40 }}>
          <button onClick={() => setOpen(false)} style={{ position:"absolute", top:24, right:28, color:"#f5f5f0", background:"none", border:"none", cursor:"pointer" }}><X size={24} /></button>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} style={{ fontFamily:"'Playfair Display',serif", fontSize:36, color:"#f5f5f0", background:"none", border:"none", cursor:"pointer", transition:"color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
              onMouseLeave={e => (e.currentTarget.style.color = "#f5f5f0")}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────
const Hero = () => (
  <section style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", alignItems:"center", paddingTop:72, position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 70% at 65% 40%,rgba(124,58,237,.08) 0%,rgba(201,168,76,.04) 40%,transparent 70%)", pointerEvents:"none" }} />
    <div style={{ maxWidth:1240, margin:"0 auto", padding:"80px 28px", width:"100%", position:"relative", zIndex:1 }}>
      <div className="fn-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
        {/* Left */}
        <div>
          {/* Availability badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"7px 16px", borderRadius:9999, border:"1px solid rgba(201,168,76,.25)", background:"rgba(201,168,76,.05)", marginBottom:36 }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", flexShrink:0, animation:"pulse-ring 2s ease-out infinite" }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#c9a84c", letterSpacing:".04em" }}>Available for new projects</span>
          </div>

          {/* Headline — word-by-word stagger */}
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"clamp(42px,5.2vw,72px)", lineHeight:1.1, letterSpacing:"-.025em", marginBottom:28 }}>
            <span style={{ display:"block" }}>
              <span className="fn-word" style={{ color:"#f5f5f0", animationDelay:"0ms" }}>I</span>{" "}
              <span className="fn-word" style={{ color:"#f5f5f0", animationDelay:"100ms" }}>build</span>
            </span>
            <span style={{ display:"block" }}>
              <span className="fn-word" style={{ color:"#f5f5f0", animationDelay:"200ms" }}>growth</span>{" "}
              <span className="fn-word" style={{ color:"#f5f5f0", animationDelay:"300ms" }}>systems.</span>
            </span>
            <span style={{ display:"block" }}>
              <span className="fn-word" style={{ color:"#c9a84c", animationDelay:"500ms" }}>Content</span>{" "}
              <span className="fn-word" style={{ color:"#c9a84c", animationDelay:"600ms" }}>that</span>{" "}
              <span className="fn-word" style={{ color:"#c9a84c", animationDelay:"700ms" }}>attracts.</span>
            </span>
            <span style={{ display:"block" }}>
              <span className="fn-word" style={{ color:"#f5f5f0", animationDelay:"900ms" }}>Automation</span>{" "}
              <span className="fn-word" style={{ color:"#f5f5f0", animationDelay:"1000ms" }}>that</span>{" "}
              <span className="fn-word" style={{ color:"#f5f5f0", animationDelay:"1100ms" }}>converts.</span>
            </span>
          </h1>

          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:18, lineHeight:1.75, color:"#9a9a90", marginBottom:40, maxWidth:520 }}>
            Social media strategist and AI automation specialist — helping brands and businesses grow audiences and close more clients, without doing everything manually.
          </p>

          <div style={{ display:"flex", gap:14, flexWrap:"wrap" as const, marginBottom:36 }}>
            <a href="#work" onClick={e => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior:"smooth" }); }} className="fn-cta">
              See My Work
            </a>
            <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer" className="fn-cta-out">
              Book a Call →
            </a>
          </div>

          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(154,154,144,.7)", letterSpacing:".03em", lineHeight:1.9 }}>
            1.1M+ Pinterest views · 470+ businesses engaged · 3,000+ Facebook community · GoHighLevel workflows
          </p>
        </div>

        {/* Right — photo */}
        <div className="hidden md:block">
          <Photo ratio="4/5" />
        </div>
      </div>
    </div>
  </section>
);

// ─── MARQUEE ─────────────────────────────────────────────────
const TICKER = "SOCIAL MEDIA STRATEGY · AI AUTOMATION · PINTEREST SEO · COMMUNITY BUILDING · GoHighLevel · CONTENT SYSTEMS · BRAND VOICE · LEAD GENERATION · VIRAL CONTENT · COLD OUTREACH · ";

const Marquee = () => (
  <div style={{ background:"#111", padding:"18px 0", overflow:"hidden", borderTop:"1px solid rgba(201,168,76,.06)", borderBottom:"1px solid rgba(201,168,76,.06)" }}>
    <div className="fn-marquee">
      {[0,1].map(i => (
        <span key={i} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, letterSpacing:".2em", textTransform:"uppercase" as const, color:"#c9a84c", paddingRight:0 }}>
          {TICKER}&nbsp;&nbsp;&nbsp;{TICKER}&nbsp;&nbsp;&nbsp;
        </span>
      ))}
    </div>
  </div>
);

// ─── ABOUT ───────────────────────────────────────────────────
const About = () => (
  <section id="about" style={{ background:"#0a0a0a", padding:"110px 28px" }}>
    <div style={{ maxWidth:1240, margin:"0 auto" }}>
      <Reveal><Label text="About" /></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"clamp(32px,3.8vw,52px)", color:"#f5f5f0", marginBottom:64, letterSpacing:"-.02em" }}>
          The person behind the systems.
        </h2>
      </Reveal>

      <div className="fn-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"start" }}>
        <Reveal delay={80}>
          <Photo ratio="1/1" badge="4+ years · Global clients" />
        </Reveal>

        <div>
          <Reveal delay={120}>
            <div style={{ display:"flex", flexDirection:"column" as const, gap:20, marginBottom:44 }}>
              {[
                "I got into social media by accident — and into automation on purpose.",
                "It started at 14, designing T-shirts on Teespring with zero sales. That failure taught me the first lesson: visibility without strategy is just noise.",
                "Today I run Kings Socials, a social media and personal brand agency, and I build AI automation systems for service businesses — primarily home services companies in the US. I also manage social media for Kaminskiy Care & Repair, where my role has grown well beyond content into GoHighLevel workflows and AI video production.",
                "My work lives at the intersection of two things most people treat as separate: storytelling and systems. I use social media to build real audiences, and automation to make sure those audiences turn into revenue.",
              ].map((p, i) => (
                <p key={i} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, lineHeight:1.85, color:"#9a9a90" }}>{p}</p>
              ))}
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, lineHeight:1.7, color:"rgba(154,154,144,.65)", fontStyle:"italic" }}>
                Based in Nigeria. Working with clients globally.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div style={{ display:"flex", flexWrap:"wrap" as const, gap:10 }}>
              {[
                { icon: <TrendingUp size={15} color="#c9a84c" />, label:"Strategy-first thinker", accent:"gold" },
                { icon: <Settings size={15} color="#a78bfa" />, label:"Systems builder", accent:"purple" },
                { icon: <Globe size={15} color="#c9a84c" />, label:"Global operator", accent:"gold" },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"11px 18px", borderRadius:12, background:"#1a1a1a", border:"1px solid rgba(201,168,76,.12)", fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, color:"#f5f5f0" }}>
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
  <section id="services" style={{ background:"#0d0d0d", padding:"110px 28px" }}>
    <div style={{ maxWidth:1240, margin:"0 auto" }}>
      <Reveal><Label text="Services" /></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontStyle:"italic", fontSize:"clamp(32px,3.8vw,52px)", color:"#f5f5f0", marginBottom:56, letterSpacing:"-.02em" }}>
          Two things. Done well.
        </h2>
      </Reveal>

      <div className="fn-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        {[
          {
            icon: <BarChart3 size={26} />,
            title: "Social Media Strategy & Management",
            body: "I build content systems that grow real audiences — not just follower counts. From brand voice to content calendars, community engagement to platform-specific strategy across Instagram, Pinterest, and Facebook.",
            tags: ["Instagram","Pinterest","Facebook","Content Strategy","Brand Voice","Meta Ads"],
            delay: 80,
          },
          {
            icon: <Zap size={26} />,
            title: "AI Automation & Workflow Building",
            body: "I automate the manual work that kills growth — lead follow-up, CRM pipelines, client onboarding, booking systems. Built on GoHighLevel, with AI video production and cold outreach infrastructure.",
            tags: ["GoHighLevel","AI Video","CRM Pipelines","Lead Nurturing","Cold Outreach"],
            delay: 160,
          },
        ].map(({ icon, title, body, tags, delay }) => (
          <Reveal key={title} delay={delay}>
            <div className="fn-border fn-lift" style={{ height:"100%" }}>
              <div className="fn-border-inner" style={{ padding:40, display:"flex", flexDirection:"column" as const, gap:24, height:"100%" }}>
                <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,rgba(201,168,76,.15),rgba(124,58,237,.15))", border:"1px solid rgba(201,168,76,.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#c9a84c" }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:21, color:"#f5f5f0", lineHeight:1.3 }}>{title}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, lineHeight:1.8, color:"#9a9a90", flexGrow:1 }}>{body}</p>
                <div style={{ display:"flex", flexWrap:"wrap" as const, gap:7 }}>
                  {tags.map(t => <span key={t} className="fn-tag-p">{t}</span>)}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={240}>
        <div style={{ textAlign:"center" as const, padding:"18px 24px", borderRadius:12, border:"1px solid rgba(201,168,76,.08)", background:"rgba(255,255,255,.015)" }}>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#9a9a90", fontStyle:"italic" }}>
            Also fluent in: Copywriting · Affiliate Strategy · Pinterest SEO · Community Building · CapCut · Canva
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── PROJECTS ────────────────────────────────────────────────
const PROJECTS = [
  {
    tag:"Social Media · London",
    name:"Popin — Food & Hospitality Platform",
    desc:"Instagram community strategy for a London-based pop-up discovery app",
    results:["Engaged 470+ food & hospitality businesses as core target audience","Generated 200+ waitlist sign-ups through Stories campaigns alone","Collected 500+ email subscribers via multi-channel organic strategy"],
    impact:"Turned a blank Instagram page into a trusted industry community hub",
    logo:"/logos/popin-logo.png", logoBg:"#0a0a0a",
  },
  {
    tag:"Pinterest · Personal Project",
    name:"Book Addicts — Pinterest Community",
    desc:"Organic Pinterest growth from zero using viral content systems and SEO",
    results:["1.1M+ monthly views organically within 4 months","Built from 0 to engaged audience with zero ad spend","Developed pin templates consistently achieving algorithm-driven reach"],
    impact:"Proved content virality and Pinterest SEO mastery at serious scale",
  },
  {
    tag:"Facebook · Affiliate",
    name:"Book Lovers — Facebook Community",
    desc:"Facebook community built with integrated affiliate monetization",
    results:["Scaled from 300 → 3,000+ followers in 4 months","Maintained high engagement while integrating affiliate offers","Built monetization system that didn't compromise community trust"],
    impact:"Demonstrated how community authenticity and revenue coexist",
  },
  {
    tag:"Social Media + Automation · Ongoing",
    name:"Kaminskiy Care & Repair",
    desc:"Social media role that evolved into GoHighLevel automation and AI video production",
    results:["Established content calendar and revamped Instagram & Facebook strategy","Built GoHighLevel automation workflows beyond original contract scope","Produced AI video content using Higgsfield AI for social distribution"],
    impact:"Grew from hired SMM into full growth systems operator for the client",
    logo:"/logos/kaminskiy-logo.png", logoBg:"#ffffff",
  },
];

const Projects = () => (
  <section id="work" style={{ background:"#0a0a0a", padding:"110px 28px" }}>
    <div style={{ maxWidth:1240, margin:"0 auto" }}>
      <Reveal><Label text="Work" /></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"clamp(32px,3.8vw,52px)", color:"#f5f5f0", marginBottom:56, letterSpacing:"-.02em" }}>
          Real brands. Real numbers.
        </h2>
      </Reveal>

      <div className="fn-4col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 80} className="fn-proj-card">
            <div className="fn-border fn-lift" style={{ height:"100%" }}>
              <div className="fn-border-inner" style={{ padding:32, display:"flex", flexDirection:"column" as const, gap:0, height:"100%" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
                  <span className="fn-tag-g">{p.tag}</span>
                  {p.logo && (
                    <div style={{ width:34, height:34, borderRadius:8, background:p.logoBg, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0, marginLeft:12 }}>
                      <img src={p.logo} alt={p.name} style={{ width:"82%", height:"82%", objectFit:"contain" }} />
                    </div>
                  )}
                </div>
                <h3 style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:18, color:"#f5f5f0", marginBottom:6 }}>{p.name}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#9a9a90", fontStyle:"italic", marginBottom:18 }}>{p.desc}</p>
                <div style={{ height:1, background:"rgba(201,168,76,.1)", marginBottom:18 }} />
                <div style={{ display:"flex", flexDirection:"column" as const, gap:10, marginBottom:20, flexGrow:1 }}>
                  {p.results.map((r, j) => (
                    <div key={j} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                      <span style={{ color:"#c9a84c", lineHeight:1.5, flexShrink:0 }}>·</span>
                      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13.5, color:"#9a9a90", lineHeight:1.6 }}>{r}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:600, color:"#c9a84c" }}>→ {p.impact}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── STATS ───────────────────────────────────────────────────
const STATS = [
  { target:11, fmt:(n:number)=>`${(n/10).toFixed(1)}M+`, label:"Monthly Pinterest Views" },
  { target:470, fmt:(n:number)=>`${n}+`, label:"Businesses Engaged" },
  { target:3000, fmt:(n:number)=>`${n.toLocaleString()}+`, label:"Facebook Community Built" },
  { target:400, fmt:(n:number)=>`${n}K+`, label:"Pinterest Views — 2 Months" },
  { target:500, fmt:(n:number)=>`${n}+`, label:"Emails Collected Organically" },
  { target:4, fmt:(n:number)=>`${n}`, label:"Platforms Grown From Zero" },
];

const Stats = () => (
  <section id="results" style={{ background:"#0a0a0a", padding:"110px 28px", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:500, background:"radial-gradient(ellipse,rgba(201,168,76,.05) 0%,transparent 65%)", pointerEvents:"none" }} />
    <div style={{ maxWidth:1240, margin:"0 auto", position:"relative", zIndex:1 }}>
      <Reveal><Label text="Results" /></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontStyle:"italic", fontSize:"clamp(32px,3.8vw,52px)", color:"#f5f5f0", marginBottom:72, letterSpacing:"-.02em", textAlign:"center" as const }}>
          Numbers don't lie.
        </h2>
      </Reveal>

      <div className="fn-stat-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 60}>
            <div style={{ textAlign:"center" as const, padding:"40px 20px", borderRight: i % 3 !== 2 ? "1px solid rgba(201,168,76,.08)" : "none", borderBottom: i < 3 ? "1px solid rgba(201,168,76,.08)" : "none" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontWeight:700, fontSize:"clamp(52px,5vw,72px)", color:"#c9a84c", lineHeight:1, marginBottom:12 }}>
                <Counter target={s.target} fmt={s.fmt} />
              </div>
              <div style={{ width:28, height:2, background:"rgba(201,168,76,.35)", borderRadius:1, margin:"0 auto 14px" }} />
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#9a9a90", textTransform:"uppercase" as const, letterSpacing:".15em" }}>{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <div style={{ marginTop:64, display:"flex", gap:0, alignItems:"stretch", maxWidth:600, margin:"64px auto 0" }}>
          <div style={{ width:3, background:"linear-gradient(to bottom,#c9a84c,rgba(201,168,76,.2))", borderRadius:2, flexShrink:0, marginRight:20 }} />
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:18, fontStyle:"italic", color:"#9a9a90", lineHeight:1.7 }}>
            "Growth isn't magic. It's systems, empathy, and creative precision."
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── TESTIMONIALS ────────────────────────────────────────────
const TESTIMONIALS = [
  { quote:"Faithful did an excellent job leading our social media presence at Educato. In just a couple of weeks, he grasped our brand voice, created engaging content, and helped us grow our online presence. I highly recommend him.", name:"Pierre-Louis Monnot", role:"Co-founder, Educato AI", photo:"/images/clients/Pierre.jpg", initials:"PM" },
  { quote:"I truly appreciate your support and efforts. Your work ethic and the dedication you put into the Instagram page is an integral part of our journey.", name:"Tekla Balfour", role:"CEO, POPIN", photo:"/images/clients/Tekla.jpg", initials:"TB" },
  { quote:"He is amazing at what he does, very prompt and professional. Looking forward to future collabs.", name:"Avantika", role:"Publishing Company", photo:null, initials:"AV" },
];

const Testimonials = () => (
  <section style={{ background:"#0d0d0d", padding:"110px 28px" }}>
    <div style={{ maxWidth:1240, margin:"0 auto" }}>
      <Reveal><Label text="Testimonials" /></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"clamp(32px,3.8vw,52px)", color:"#f5f5f0", marginBottom:56, letterSpacing:"-.02em" }}>
          From the people I've worked with.
        </h2>
      </Reveal>

      <div className="fn-3col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <div className="fn-border fn-lift" style={{ height:"100%" }}>
              <div className="fn-border-inner" style={{ padding:36, display:"flex", flexDirection:"column" as const, height:"100%", position:"relative" as const }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:96, lineHeight:.75, color:"rgba(201,168,76,.1)", position:"absolute", top:16, left:24, userSelect:"none" as const, pointerEvents:"none" as const }}>"</div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, lineHeight:1.8, color:"#9a9a90", fontStyle:"italic", flexGrow:1, position:"relative", zIndex:1, marginBottom:28 }}>
                  "{t.quote}"
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  {t.photo
                    ? <img src={t.photo} alt={t.name} style={{ width:44, height:44, borderRadius:"50%", objectFit:"cover", border:"1.5px solid rgba(201,168,76,.25)", flexShrink:0 }} />
                    : <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,rgba(201,168,76,.2),rgba(124,58,237,.2))", border:"1.5px solid rgba(201,168,76,.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14, color:"#c9a84c" }}>{t.initials}</div>
                  }
                  <div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14, color:"#f5f5f0" }}>{t.name}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#9a9a90" }}>{t.role}</div>
                  </div>
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
  <section id="contact" style={{ background:"#0a0a0a", padding:"130px 28px", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:600, background:"radial-gradient(ellipse,rgba(124,58,237,.07) 0%,transparent 65%)", pointerEvents:"none" }} />
    <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)" }} />
    <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" as const, position:"relative", zIndex:1 }}>
      <Reveal><Label text="Contact" /></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"clamp(34px,4.5vw,58px)", color:"#f5f5f0", marginBottom:22, letterSpacing:"-.025em", lineHeight:1.15 }}>
          Ready to build something<br />
          <span style={{ fontStyle:"italic", background:"linear-gradient(135deg,#c9a84c,#7c3aed)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent" }}>
            that actually grows?
          </span>
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:18, lineHeight:1.75, color:"#9a9a90", marginBottom:48 }}>
          Whether you need a social media system, an automation build, or both — let's talk about what actually moves the needle.
        </p>
      </Reveal>
      <Reveal delay={180}>
        <div style={{ display:"flex", gap:14, justifyContent:"center" as const, flexWrap:"wrap" as const, marginBottom:28 }}>
          <a href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting" target="_blank" rel="noopener noreferrer" className="fn-cta" style={{ fontSize:16, padding:"16px 36px" }}>
            Book a Free Call →
          </a>
          <a href="mailto:faithfulnyama@gmail.com" className="fn-cta-out" style={{ fontSize:16, padding:"16px 36px" }}>
            Send an Email
          </a>
        </div>
      </Reveal>
      <Reveal delay={240}>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(154,154,144,.6)", letterSpacing:".06em" }}>
          Based in Nigeria · Available for global projects · Replies within 24hrs
        </p>
      </Reveal>
    </div>
  </section>
);

// ─── FOOTER ──────────────────────────────────────────────────
const PageFooter = () => (
  <footer style={{ background:"#080808", borderTop:"1px solid rgba(201,168,76,.08)", padding:"32px 28px" }}>
    <div className="fn-footer-row" style={{ maxWidth:1240, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:13, letterSpacing:".15em", textTransform:"uppercase" as const, color:"#f5f5f0", marginBottom:4 }}>FAITHFUL NYAMA</div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#c9a84c" }}>Growth Systems Operator</div>
      </div>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(154,154,144,.55)" }}>© 2025 Faithful Nyama. Built with intention.</p>
      <div style={{ display:"flex", gap:20, alignItems:"center" }}>
        {[
          { href:"https://www.instagram.com/iam_faithfulnyama/", icon:<Instagram size={18} /> },
          { href:"https://www.linkedin.com/in/faithfulnyama/", icon:<Linkedin size={18} /> },
          { href:"mailto:faithfulnyama@gmail.com", icon:<Mail size={18} />, noBlank:true },
        ].map(({ href, icon, noBlank }) => (
          <a key={href} href={href} target={noBlank ? undefined : "_blank"} rel="noopener noreferrer"
            style={{ color:"rgba(154,154,144,.55)", transition:"color .2s", display:"flex" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(154,154,144,.55)")}>
            {icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── PAGE ─────────────────────────────────────────────────────
const PersonalPage = () => (
  <div className="fn-page">
    <style>{STYLES}</style>
    <Navbar />
    <Hero />
    <Marquee />
    <About />
    <Services />
    <Projects />
    <Stats />
    <Testimonials />
    <Contact />
    <PageFooter />
  </div>
);

export default PersonalPage;
