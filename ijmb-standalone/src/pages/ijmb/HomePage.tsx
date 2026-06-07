import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/ijmb/Navbar";
import Footer from "@/components/ijmb/Footer";

const C = {
  bg:     "#0d0b08",
  bg2:    "#111009",
  bronze: "#c9783a",
  gold:   "#e8b96a",
  sand:   "#d4b896",
  cream:  "#f5ede0",
  text:   "#e8e0d4",
  muted:  "#7a7060",
  border: "rgba(201,120,58,0.18)",
} as const;

const DEPT_DATA = [
  { code: "SCI", name: "Science",        color: "#e8b96a", desc: "Biology, Chemistry, Physics — prepare for Medicine, Engineering, and more.", courses: ["Biology","Chemistry","Physics","Maths"] },
  { code: "ART", name: "Arts",           color: "#4a9e6b", desc: "Literature, Government, History — pathway to Law, Education, Social Sciences.", courses: ["Literature","Government","CRS/IRS","History"] },
  { code: "COM", name: "Commercial",     color: "#c9783a", desc: "Accounting, Economics, Commerce — gateway to Business, Finance, Economics.", courses: ["Accounting","Economics","Commerce"] },
  { code: "SS",  name: "Social Science", color: "#7a5af8", desc: "Geography, Economics, Government — bridging arts and sciences.", courses: ["Geography","Economics","Government"] },
  { code: "ED",  name: "Education",      color: "#e84a4a", desc: "Teaching methodology and subject areas — for future educators.", courses: ["Edu. Mgt","Curriculum"] },
  { code: "IT",  name: "Tech & Computing",color: "#4ab8e8", desc: "Mathematics and Computer Science for aspiring software engineers.", courses: ["Maths","Further Maths","Computer Sci"] },
];

const TESTIMONIALS = [
  { initial: "C", name: "Chidera Onyekwere", uni: "Medicine, University of Abuja", quote: "I gained direct admission to Medicine at University of Abuja. IJMB.program made the entire process feel possible — from studying online to checking my results, everything was seamless.", grad: "linear-gradient(135deg,#c9783a,#8b3a1a)", featured: true },
  { initial: "F", name: "Fatima Adamu",      uni: "Law, BUK",                       quote: "The study materials and past questions gave me exactly what I needed to prepare well and score high.", grad: "linear-gradient(135deg,#2d4a3e,#4a9e6b)", featured: false },
  { initial: "E", name: "Emeka Nwachukwu",   uni: "Engineering, UNILAG",             quote: "Getting 200-level admission into Engineering in 9 months felt like a cheat code. Best decision I made.", grad: "linear-gradient(135deg,#1a3048,#2e6094)", featured: false },
];

const STEPS = [
  { n: "01", title: "Apply Online",    text: "Create your account, fill out the application form, upload documents and pay your application fee." },
  { n: "02", title: "Get Admitted",    text: "Receive your admission decision, accept your offer and access your personalized student dashboard." },
  { n: "03", title: "Study & Excel",   text: "Access lectures, materials, past questions and complete continuous assessments over 9 months." },
  { n: "04", title: "Enter University",text: "Use your IJMB results to gain direct 200-level admission into your chosen Nigerian university." },
];

const SIDEBAR_ITEMS = [
  { label: "Dashboard",     active: true  },
  { label: "My Courses",    active: false },
  { label: "Materials",     active: false },
  { label: "Assessments",   active: false },
  { label: "Results",       active: false },
  { label: "Payments",      active: false },
  { label: "Notifications", active: false },
];

const MOCK_CARDS = [
  { label: "Current GPA",     val: "3.8" },
  { label: "Courses Active",  val: "5"   },
  { label: "Days Remaining",  val: "142" },
];

const COURSE_PILLS = [
  { label: "Biology",       active: true  },
  { label: "Chemistry",     active: true  },
  { label: "Physics",       active: true  },
  { label: "Maths",         active: false },
  { label: "Use of English",active: false },
];

export default function HomePage() {
  const cursorRef     = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  /* Custom cursor */
  useEffect(() => {
    const cursor = cursorRef.current;
    const ring   = cursorRingRef.current;
    if (!cursor || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      cursor.style.left = mx + "px";
      cursor.style.top  = my + "px";
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", onMove);
    tick();
    const enlarge  = () => { cursor.style.width = "20px"; cursor.style.height = "20px"; ring.style.width = "60px";  ring.style.height = "60px"; };
    const shrink   = () => { cursor.style.width = "10px"; cursor.style.height = "10px"; ring.style.width = "36px";  ring.style.height = "36px"; };
    const els = document.querySelectorAll("a, button");
    els.forEach(el => { el.addEventListener("mouseenter", enlarge); el.addEventListener("mouseleave", shrink); });
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const reveals  = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, overflowX: "hidden", cursor: "none" }}>
      {/* Custom cursor */}
      <div ref={cursorRef}     className="ijmb-cursor" />
      <div ref={cursorRingRef} className="ijmb-cursor-ring" />

      {/* Noise overlay */}
      <div className="ijmb-noise" />

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 4rem 6rem", position: "relative", overflow: "hidden" }}>
        {/* Backgrounds */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 60% at 75% 30%, rgba(201,120,58,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 20% 70%, rgba(45,74,62,0.25) 0%, transparent 70%), linear-gradient(170deg,${C.bg} 0%,${C.bg2} 40%,${C.bg} 100%)` }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(60deg,transparent,transparent 80px,rgba(201,120,58,0.025) 80px,rgba(201,120,58,0.025) 81px),repeating-linear-gradient(-60deg,transparent,transparent 80px,rgba(201,120,58,0.025) 80px,rgba(201,120,58,0.025) 81px)", opacity: 0.6 }} />

        {/* Vertical year label */}
        <div style={{ position: "absolute", top: "50%", right: "4rem", transform: "translateY(-50%)", fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: C.muted, writingMode: "vertical-rl", opacity: 0, animation: "ijmb-fade-up 1s ease 1.8s forwards" }}>
          EST. 2024 — NIGERIA
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", right: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0, animation: "ijmb-fade-up 1s ease 2s forwards" }}>
          <div className="ijmb-scroll-bar" style={{ width: "1px", height: "60px", background: `linear-gradient(to bottom,${C.bronze},transparent)` }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted }}>Scroll</span>
        </div>

        {/* Eyebrow */}
        <p className="ijmb-eyebrow" style={{ opacity: 0, animation: "ijmb-fade-up 0.8s ease 0.4s forwards", marginBottom: "1.8rem", position: "relative", zIndex: 2 }}>
          Interim Joint Matriculation Board
        </p>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3.5rem,8vw,8.5rem)", fontWeight: 300, lineHeight: 0.92, letterSpacing: "-0.02em", position: "relative", zIndex: 2, marginBottom: "2.5rem" }}>
          <span className="ijmb-hl-line"><span>Your Path to</span></span>
          <span className="ijmb-hl-line"><span style={{ fontStyle: "italic", color: C.gold }}>University</span></span>
          <span className="ijmb-hl-line"><span>Begins Here.</span></span>
        </h1>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", position: "relative", zIndex: 2, opacity: 0, animation: "ijmb-fade-up 0.8s ease 1.4s forwards" }}>
          <p style={{ maxWidth: "380px", fontSize: "0.92rem", lineHeight: 1.7, color: C.muted, fontWeight: 300 }}>
            Nigeria's most <strong style={{ color: C.sand, fontWeight: 400 }}>modern pre-university platform</strong> — discover the IJMB program, apply online, study smarter, and earn direct university admission in just <strong style={{ color: C.sand, fontWeight: 400 }}>9 months.</strong>
          </p>
          <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link to="/ijmb/apply" className="ijmb-btn">
              <span>Start Application</span>
            </Link>
            <Link to="/ijmb/about" className="ijmb-ghost">
              Explore Program
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="ijmb-stats">
        {[
          { num: "12,000+", label: "Enrolled Students" },
          { num: "94%",     label: "University Admission Rate" },
          { num: "9",       label: "Months to Direct Entry" },
          { num: "60+",     label: "Partner Universities" },
        ].map(s => (
          <div key={s.label} style={{ padding: "1.5rem 2rem", background: C.bg }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3.2rem", fontWeight: 300, color: C.gold, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, marginTop: "0.4rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section style={{ padding: "8rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <div className="reveal">
          <div className="ijmb-tag" style={{ marginBottom: "1.5rem" }}>About IJMB</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem,4vw,4rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "2rem" }}>
            A new era of<br /><em style={{ fontStyle: "italic", color: C.gold }}>academic ambition</em><br />for Nigeria's youth.
          </h2>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.muted, marginBottom: "1.5rem" }}>
            The Interim Joint Matriculation Board program is a recognized pre-university qualification that grants direct entry into 200-level in Nigerian universities — bypassing the UTME entirely.
          </p>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.85, color: C.muted, marginBottom: "1.5rem" }}>
            IJMB.program brings this path into the digital age: a full campus experience, delivered through an intelligent, beautifully designed platform built for the ambitious Nigerian student.
          </p>
          <Link to="/ijmb/about" className="ijmb-btn" style={{ marginTop: "1rem" }}>
            <span>Learn More</span>
          </Link>
        </div>

        <div className="reveal" style={{ position: "relative", height: "520px" }}>
          <div className="ijmb-about-main">
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontStyle: "italic", color: C.sand }}>"​The modern path to excellence."</span>
          </div>
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "200px", background: C.bronze, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "4rem", fontWeight: 300, lineHeight: 1, color: C.bg }}>200L</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(13,11,8,0.75)", textTransform: "uppercase" }}>Direct University Entry</div>
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section style={{ background: C.bg2, padding: "8rem 4rem" }}>
        <div className="reveal">
          <div className="ijmb-tag" style={{ marginBottom: "1.5rem" }}>Departments</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem,4vw,4rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            Choose your<br /><em style={{ fontStyle: "italic", color: C.gold }}>academic pathway.</em>
          </h2>
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", backgroundColor: C.border, marginTop: "4rem", border: `1px solid ${C.border}` }}>
          {DEPT_DATA.map(dept => (
            <Link
              key={dept.code}
              to="/ijmb/departments"
              className="ijmb-dept"
              style={{ "--dc": dept.color, padding: "2.5rem", textDecoration: "none" } as React.CSSProperties}
            >
              <div style={{ width: "44px", height: "44px", border: `1px solid ${dept.color}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", color: dept.color, fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                {dept.code}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 400, marginBottom: "0.7rem", color: C.cream }}>{dept.name}</div>
              <div style={{ fontSize: "0.8rem", lineHeight: 1.7, color: C.muted }}>{dept.desc}</div>
              <div style={{ marginTop: "1.2rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {dept.courses.map(c => (
                  <span key={c} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", border: `1px solid ${C.border}`, padding: "0.25rem 0.6rem", color: C.muted }}>{c}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "8rem 4rem" }}>
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="ijmb-tag" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>How it Works</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem,4vw,4rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.01em", maxWidth: "600px", margin: "0 auto" }}>
            From application to<br /><em style={{ fontStyle: "italic", color: C.gold }}>university admission.</em>
          </h2>
        </div>

        <div className="reveal ijmb-steps" style={{ marginTop: "5rem" }}>
          {STEPS.map(step => (
            <div key={step.n} style={{ padding: "0 2rem", textAlign: "center" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: C.bg2, border: `1px solid ${C.bronze}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: C.bronze, position: "relative", zIndex: 1 }}>
                {step.n}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem", fontWeight: 400, color: C.cream, marginBottom: "0.7rem" }}>{step.title}</div>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.7, color: C.muted }}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section style={{ padding: "8rem 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(45,74,62,0.15) 0%, transparent 70%)" }} />

        <div className="reveal" style={{ textAlign: "center", marginBottom: "5rem", position: "relative", zIndex: 1 }}>
          <div className="ijmb-tag" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Student Dashboard</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem,4vw,4rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.01em", maxWidth: "600px", margin: "0 auto" }}>
            Your entire academic life,<br /><em style={{ fontStyle: "italic", color: C.gold }}>beautifully organized.</em>
          </h2>
        </div>

        {/* Mock browser window */}
        <div className="reveal" style={{ position: "relative", zIndex: 1, background: C.bg2, border: `1px solid ${C.border}`, borderRadius: "2px", overflow: "hidden", maxWidth: "1000px", margin: "0 auto", boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,120,58,0.1)" }}>
          {/* Title bar */}
          <div style={{ background: "rgba(13,11,8,0.9)", borderBottom: `1px solid ${C.border}`, padding: "0.8rem 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", color: C.muted, marginLeft: "auto", textTransform: "uppercase" }}>IJMB.program — Student Portal</span>
          </div>

          {/* Dashboard layout */}
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "420px" }}>
            {/* Sidebar */}
            <div style={{ background: "rgba(17,16,9,0.8)", borderRight: `1px solid ${C.border}`, padding: "1.5rem 0" }}>
              {SIDEBAR_ITEMS.map(item => (
                <div key={item.label} style={{ padding: "0.6rem 1.5rem", fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: item.active ? C.bronze : C.muted, background: item.active ? "rgba(201,120,58,0.08)" : "transparent", borderRight: item.active ? `2px solid ${C.bronze}` : "none", display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
                  {item.label}
                </div>
              ))}
            </div>

            {/* Content */}
            <div style={{ padding: "2rem", display: "grid", gridTemplateRows: "auto 1fr", gap: "1.5rem" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontStyle: "italic", color: C.sand }}>Welcome back, Adaeze ❖</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", alignContent: "start" }}>
                {MOCK_CARDS.map(card => (
                  <div key={card.label} style={{ background: "rgba(13,11,8,0.8)", border: `1px solid ${C.border}`, padding: "1.2rem" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: C.muted, textTransform: "uppercase", marginBottom: "0.5rem" }}>{card.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.8rem", fontWeight: 300, color: C.gold }}>{card.val}</div>
                  </div>
                ))}

                {/* Progress card */}
                <div style={{ gridColumn: "1 / -1", background: "rgba(13,11,8,0.8)", border: `1px solid ${C.border}`, padding: "1.2rem" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: C.muted, textTransform: "uppercase", marginBottom: "1rem" }}>Program Progress — Science Department</div>
                  <div style={{ background: "rgba(201,120,58,0.1)", height: "4px", borderRadius: "2px", marginBottom: "0.6rem", overflow: "hidden" }}>
                    <div className="ijmb-bar" style={{ height: "100%", background: `linear-gradient(to right,${C.bronze},${C.gold})`, borderRadius: "2px" }} />
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.8rem" }}>
                    {COURSE_PILLS.map(c => (
                      <span key={c.label} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", border: `1px solid ${c.active ? C.bronze : C.border}`, padding: "0.2rem 0.5rem", color: c.active ? C.bronze : C.muted, background: c.active ? "rgba(201,120,58,0.08)" : "transparent", textTransform: "uppercase" }}>{c.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: C.bg2, padding: "8rem 4rem" }}>
        <div className="reveal">
          <div className="ijmb-tag" style={{ marginBottom: "1.5rem" }}>Success Stories</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem,4vw,4rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            Students who chose<br /><em style={{ fontStyle: "italic", color: C.gold }}>the IJMB path.</em>
          </h2>
        </div>

        <div className="reveal ijmb-testi-grid">
          {TESTIMONIALS.map(t => (
            <div key={t.name} style={{ background: t.featured ? "linear-gradient(135deg,rgba(45,74,62,0.4) 0%,#0d0b08 80%)" : C.bg, border: `1px solid ${C.border}`, padding: "2.5rem", position: "relative" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "5rem", lineHeight: 0.6, color: C.bronze, opacity: 0.25, position: "absolute", top: "1.5rem", right: "1.5rem", userSelect: "none" }}>"</div>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: t.featured ? "1.4rem" : "1.15rem", fontStyle: "italic", lineHeight: 1.6, color: t.featured ? C.cream : C.sand, marginBottom: "2rem" }}>
                {t.quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: t.grad, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem", color: C.cream, fontWeight: 500, flexShrink: 0 }}>{t.initial}</div>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 500, color: C.cream }}>{t.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", color: C.bronze, marginTop: "0.2rem", textTransform: "uppercase" }}>→ {t.uni}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "10rem 4rem", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 70% at 50% 50%,rgba(201,120,58,0.1) 0%,transparent 70%),linear-gradient(180deg,${C.bg} 0%,${C.bg2} 50%,${C.bg} 100%)` }} />

        <h2 className="reveal" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3rem,6vw,7rem)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em", position: "relative", zIndex: 1, marginBottom: "2rem" }}>
          Ready to begin<br />your <em style={{ fontStyle: "italic", color: C.gold }}>journey?</em>
        </h2>
        <p className="reveal" style={{ fontSize: "0.9rem", lineHeight: 1.7, color: C.muted, maxWidth: "480px", margin: "0 auto 3rem", position: "relative", zIndex: 1 }}>
          Join thousands of Nigerian students who have used IJMB.program to gain university admission faster, smarter, and more confidently.
        </p>
        <div className="reveal" style={{ display: "flex", gap: "1.5rem", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
          <Link to="/ijmb/apply" className="ijmb-btn">
            <span>Apply for Admission</span>
          </Link>
          <Link to="/ijmb/departments" className="ijmb-ghost">
            Browse Departments
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
