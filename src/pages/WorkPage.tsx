import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, ArrowLeft, ArrowRight } from "lucide-react";
import { caseStudies } from "../data/caseStudies";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.wp *, .wp *::before, .wp *::after { box-sizing: border-box; margin: 0; padding: 0; }
.wp { font-family: 'DM Sans', sans-serif; min-height: 100vh; overflow-x: hidden; }

.wp.wp-light {
  --bg: #f8f7f4; --card: #ffffff; --card2: #f0ede6;
  --pri: #1a3d2b; --pri2: #2d5c42;
  --t1: #18181a; --t2: #585850; --t3: #9b9b92;
  --b0: rgba(26,61,43,.10); --b1: rgba(26,61,43,.28);
  --sh: rgba(0,0,0,.07);
  background: var(--bg); color: var(--t1);
}
.wp.wp-dark {
  --bg: #0c0c0b; --card: #141413; --card2: #1c1c1a;
  --pri: #c9a84c; --pri2: #e8c97a;
  --t1: #ede9df; --t2: #a5a59a; --t3: #66665a;
  --b0: rgba(201,168,76,.12); --b1: rgba(201,168,76,.36);
  --sh: rgba(0,0,0,.5);
  background: var(--bg); color: var(--t1);
}

/* Scroll reveal */
.wp-rev { opacity: 0; transform: translateY(20px); transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1); }
.wp-rev.wp-vis { opacity: 1; transform: none; }

/* Typography */
.wp-h1 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(40px,7vw,72px); font-weight: 700; line-height: 1.07; letter-spacing: -.02em; }
.wp-h2 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(26px,4vw,42px); font-weight: 700; line-height: 1.15; }
.wp-h3 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(19px,2.5vw,26px); font-weight: 600; line-height: 1.25; }
.wp-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
.wp-label { font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--pri); display: block; margin-bottom: 8px; }

/* Buttons */
.wp-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all .2s ease; text-decoration: none; white-space: nowrap; }
.wp-btn-pri { background: var(--pri); color: var(--bg) !important; border: none; }
.wp-btn-pri:hover { opacity: .85; transform: translateY(-1px); }
.wp-btn-out { background: transparent; color: var(--pri) !important; border: 1.5px solid var(--b1); }
.wp-btn-out:hover { background: var(--pri); color: var(--bg) !important; border-color: var(--pri); }

/* Navbar */
.wp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 60px; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; background: var(--bg); border-bottom: 1px solid var(--b0); }
@media(max-width:640px){ .wp-nav { padding: 0 18px; } }
.wp-tbtn { width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--b0); background: var(--card); color: var(--t2); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s ease; }
.wp-tbtn:hover { border-color: var(--pri); color: var(--pri); }

/* Hero */
.wp-hero { padding: 96px 32px 56px; max-width: 1100px; margin: 0 auto; }
@media(max-width:640px){ .wp-hero { padding: 84px 20px 40px; } }

/* Sticky tabs */
.wp-tabs { position: sticky; top: 60px; z-index: 100; background: var(--bg); border-bottom: 1px solid var(--b0); }
.wp-tabs-inner { max-width: 1100px; margin: 0 auto; padding: 0 32px; display: flex; gap: 0; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
.wp-tabs-inner::-webkit-scrollbar { display: none; }
@media(max-width:640px){ .wp-tabs-inner { padding: 0 18px; } }
.wp-tab { padding: 14px 0; margin-right: 36px; font-size: 14px; font-weight: 500; color: var(--t3); cursor: pointer; border-bottom: 2px solid transparent; transition: all .2s ease; background: none; border-top: none; border-left: none; border-right: none; font-family: 'DM Sans', sans-serif; white-space: nowrap; flex-shrink: 0; }
@media(max-width:640px){ .wp-tab { margin-right: 24px; font-size: 13px; } }
.wp-tab:hover { color: var(--t2); }
.wp-tab.active { color: var(--pri); border-bottom-color: var(--pri); }

/* Section */
.wp-sec { padding: 64px 32px 80px; max-width: 1100px; margin: 0 auto; }
@media(max-width:640px){ .wp-sec { padding: 40px 18px 60px; } }

/* Cards */
.wp-card { background: var(--card); border: 1px solid var(--b0); border-radius: 14px; transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease; }
.wp-card:hover { transform: translateY(-3px); border-color: var(--b1); box-shadow: 0 8px 28px var(--sh); }

/* Automation card */
.wp-auto-img { width: 100%; height: 200px; object-fit: cover; object-position: top left; display: block; border-radius: 13px 13px 0 0; }
.wp-auto-body { padding: 20px 22px 24px; }
.wp-auto-tag { display: inline-flex; padding: 3px 10px; border-radius: 100px; background: var(--card2); font-size: 11px; font-weight: 600; color: var(--pri); letter-spacing: .05em; margin-bottom: 9px; }
.wp-auto-metrics { display: flex; gap: 16px; flex-wrap: wrap; margin: 14px 0 16px; }
.wp-auto-metric { text-align: center; }
.wp-auto-metric-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: var(--pri); line-height: 1; }
.wp-auto-metric-lbl { font-size: 10.5px; color: var(--t3); margin-top: 2px; }
.wp-tools { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 14px; }
.wp-tool { padding: 2px 9px; background: var(--card2); border: 1px solid var(--b0); border-radius: 100px; font-size: 11px; color: var(--t2); }
.wp-auto-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--pri); text-decoration: none; }
.wp-auto-link:hover { opacity: .75; }

/* Social card */
.wp-soc-card { padding: 28px; }
.wp-soc-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.wp-platform-badge { display: inline-flex; padding: 3px 10px; border-radius: 100px; border: 1px solid var(--b1); font-size: 11px; font-weight: 600; color: var(--pri); letter-spacing: .05em; }
.wp-soc-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 18px 0; }
@media(max-width:420px){ .wp-soc-metrics { grid-template-columns: 1fr 1fr; } }
.wp-soc-metric { background: var(--card2); border: 1px solid var(--b0); border-radius: 9px; padding: 12px 8px; text-align: center; }
.wp-soc-metric-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: var(--pri); line-height: 1; }
.wp-soc-metric-lbl { font-size: 10.5px; color: var(--t3); margin-top: 3px; line-height: 1.3; }
.wp-soc-bullet { display: flex; gap: 8px; margin-bottom: 7px; font-size: 13.5px; line-height: 1.6; color: var(--t2); }
.wp-soc-bullet-dot { flex-shrink: 0; width: 5px; height: 5px; background: var(--pri); border-radius: 50%; margin-top: 7px; }
.wp-soc-result { font-size: 13px; font-style: italic; color: var(--pri); font-family: 'Cormorant Garamond', serif; font-size: 16px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--b0); }

/* Screenshot strip in social cards */
.wp-ss-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 16px; }
@media(max-width:480px){ .wp-ss-grid { grid-template-columns: 1fr; } }
.wp-ss-card { border-radius: 9px; overflow: hidden; border: 1px solid var(--b0); }
.wp-ss-card img { width: 100%; height: 130px; object-fit: cover; object-position: top; display: block; }
.wp-ss-info { padding: 8px 10px; }
.wp-ss-headline { font-size: 12px; font-weight: 600; color: var(--t1); }
.wp-ss-stats { margin-top: 4px; display: flex; flex-direction: column; gap: 2px; }
.wp-ss-stat { font-size: 11px; color: var(--t3); }

/* Stats overview bar */
.wp-stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 48px; }
@media(max-width:640px){ .wp-stats-bar { grid-template-columns: 1fr 1fr; } }
.wp-stat-box { background: var(--card); border: 1px solid var(--b0); border-radius: 12px; padding: 20px 16px; text-align: center; }
.wp-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 700; color: var(--pri); line-height: 1; }
.wp-stat-lbl { font-size: 12px; color: var(--t2); margin-top: 5px; }
.wp-stat-sub { font-size: 10.5px; color: var(--t3); margin-top: 2px; }

/* Grid */
.wp-g2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
@media(max-width:768px){ .wp-g2 { grid-template-columns: 1fr; } }
.wp-g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media(max-width:900px){ .wp-g3 { grid-template-columns: repeat(2, 1fr); } }
@media(max-width:540px){ .wp-g3 { grid-template-columns: 1fr; } }

/* CTA */
.wp-cta { background: var(--card2); border-top: 1px solid var(--b0); padding: 64px 32px; text-align: center; }
@media(max-width:640px){ .wp-cta { padding: 48px 20px; } }

/* Footer */
.wp-footer { border-top: 1px solid var(--b0); padding: 28px 32px; }
@media(max-width:640px){ .wp-footer { padding: 24px 18px; } }

/* Builds section */
.wp-build-intro { font-size: 15px; color: var(--t2); margin-bottom: 56px; max-width: 520px; line-height: 1.75; }
.wp-build-block { margin-bottom: 72px; }
.wp-build-block-title { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
.wp-build-block-desc { font-size: 14px; color: var(--t2); line-height: 1.7; margin-bottom: 24px; max-width: 580px; }
.wp-tools-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
.wp-tool-badge { padding: 4px 12px; background: var(--card2); border: 1px solid var(--b1); border-radius: 100px; font-size: 12px; font-weight: 500; color: var(--pri); }

/* CMS screenshots */
.wp-cms-features { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 28px; }
@media(max-width:480px){ .wp-cms-features { grid-template-columns: 1fr; } }
.wp-cms-feature { display: flex; gap: 10px; align-items: flex-start; background: var(--card2); border: 1px solid var(--b0); border-radius: 10px; padding: 12px 14px; }
.wp-cms-feature-dot { flex-shrink: 0; width: 7px; height: 7px; background: var(--pri); border-radius: 50%; margin-top: 5px; }
.wp-cms-feature-text { font-size: 13px; color: var(--t2); line-height: 1.55; }
.wp-cms-shots { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
@media(max-width:768px){ .wp-cms-shots { grid-template-columns: repeat(2,1fr); } }
@media(max-width:480px){ .wp-cms-shots { grid-template-columns: 1fr; } }
.wp-cms-shot { border-radius: 10px; overflow: hidden; border: 1px solid var(--b0); transition: transform .2s ease, box-shadow .2s ease; cursor: pointer; }
.wp-cms-shot:hover { transform: translateY(-2px); box-shadow: 0 6px 20px var(--sh); }
.wp-cms-shot img { width: 100%; height: 160px; object-fit: cover; object-position: top; display: block; }
.wp-cms-shot-label { padding: 8px 10px; font-size: 11.5px; font-weight: 500; color: var(--t2); background: var(--card); }

/* Lightbox */
.wp-lightbox { position: fixed; inset: 0; z-index: 9000; background: rgba(0,0,0,.88); display: flex; align-items: center; justify-content: center; padding: 20px; cursor: pointer; }
.wp-lightbox img { max-width: 100%; max-height: 90vh; border-radius: 10px; object-fit: contain; cursor: default; box-shadow: 0 24px 80px rgba(0,0,0,.5); }
.wp-lightbox-close { position: absolute; top: 18px; right: 22px; font-size: 28px; color: #fff; cursor: pointer; line-height: 1; opacity: .75; }
.wp-lightbox-close:hover { opacity: 1; }

/* AI video grid */
.wp-video-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
@media(max-width:900px){ .wp-video-grid { grid-template-columns: repeat(2,1fr); } }
@media(max-width:500px){ .wp-video-grid { grid-template-columns: 1fr; } }
.wp-video-card { background: var(--card); border: 1px solid var(--b0); border-radius: 12px; overflow: hidden; transition: transform .2s ease, box-shadow .2s ease; }
.wp-video-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px var(--sh); }
.wp-video-player { width: 100%; aspect-ratio: 9/16; object-fit: cover; display: block; background: #000; max-height: 340px; }
.wp-video-info { padding: 10px 12px 12px; }
.wp-video-title { font-size: 13px; font-weight: 600; color: var(--t1); margin-bottom: 4px; }
.wp-video-tool { font-size: 11px; color: var(--pri); font-weight: 500; }
`;

// ─── SOCIAL PORTFOLIO DATA ────────────────────────────────────────────────────
interface SSCard { src: string; headline: string; stats: string[]; }
interface SocItem {
  name: string; platform: string; category: string; headline: string;
  story: string; metrics: { label: string; value: string }[];
  bullets: string[]; result: string;
  image?: string; screenshots: SSCard[];
}

const SOCIAL_PORTFOLIO: SocItem[] = [
  {
    name: "POPIN",
    platform: "Instagram",
    category: "London Food-Tech",
    headline: "Built a community of 470+ businesses from zero.",
    story: "POPIN needed community trust before their product was ready. Starting from zero, I built an Instagram presence that spoke directly to London's pop-up business owners — activating 470+ businesses, driving 200+ waitlist sign-ups through Stories, and collecting 500+ emails organically before a single feature shipped.",
    metrics: [
      { label: "Businesses Engaged", value: "470+" },
      { label: "Waitlist Sign-ups",  value: "200+" },
      { label: "Emails Collected",   value: "500+" },
    ],
    bullets: [
      "Community-first content targeting London pop-up food and event businesses",
      "200+ waitlist sign-ups via Instagram Stories CTAs — zero ad spend",
      "500+ emails collected organically through content-led lead generation",
      "Brand authority and trust built before the product was ready to ship",
    ],
    result: "Community built before the product was ready.",
    image: "/social-media-images/popin-app-cover.jpg",
    screenshots: [],
  },
  {
    name: "Book Addicts",
    platform: "Pinterest",
    category: "Content Community",
    headline: "Zero to 1M monthly views in 4 months.",
    story: "Book Addicts started with no Pinterest presence in a competitive book-content niche. I built their entire Pinterest strategy from scratch — keyword architecture, board structure, content cadence — and took them from zero to 1M+ monthly views in under 4 months, achieving Creator Hub status along the way.",
    metrics: [
      { label: "Monthly Views",   value: "1M+" },
      { label: "Timeline",        value: "4 months" },
      { label: "Ad Spend",        value: "£0" },
    ],
    bullets: [
      "Full Pinterest keyword research and board architecture built from scratch",
      "Consistent content calendar aligned with Pinterest's distribution signals",
      "Every pin optimized for SEO — title, description, alt text, visual design",
      "Creator Hub status achieved — Pinterest's top-tier account recognition",
      "+140% month-on-month impression growth at peak",
    ],
    result: "From zero to 1M views. No ad spend.",
    screenshots: [
      { src: "/social-media-results/results-book-addicts-analytics.webp", headline: "+140% Impression Growth", stats: ["1M monthly impressions", "539K total audience", "+140% month-on-month"] },
      { src: "/social-media-results/results-book-addicts-profile.webp",   headline: "Creator Hub Status", stats: ["1M monthly views achieved", "Creator Hub recognition", "115 engaged followers"] },
    ],
  },
  {
    name: "Book Lovers",
    platform: "Facebook",
    category: "Affiliate Community",
    headline: "300 to 3,000+ followers — community trust intact.",
    story: "Book Lovers had an existing audience that was highly engaged but small. The challenge: grow the community 10x while integrating affiliate revenue without alienating the people already there. Both goals were hit simultaneously — the community grew and the monetisation landed naturally.",
    metrics: [
      { label: "Follower Growth", value: "10×" },
      { label: "Timeline",        value: "4 months" },
      { label: "Trust Erosion",   value: "Zero" },
    ],
    bullets: [
      "Community-first strategy: audience value always came before revenue",
      "Affiliate content woven naturally into regular posts — no hard-sell",
      "300 to 3,000+ followers in 4 months through consistent organic strategy",
      "Revenue and community growth achieved simultaneously",
    ],
    result: "10× growth. Community and revenue coexist.",
    screenshots: [],
  },
  {
    name: "GlowVibe Studios",
    platform: "Pinterest",
    category: "Beauty",
    headline: "400K monthly views in 60 days. Brand new account.",
    story: "GlowVibe Studios was a brand new Pinterest account competing in one of the most saturated niches online. By building a tight SEO strategy and consistent visual identity from day one, the account hit 400K monthly views within 60 days — entirely organic.",
    metrics: [
      { label: "Monthly Views", value: "400K+" },
      { label: "Timeline",      value: "60 days" },
      { label: "Ad Spend",      value: "£0" },
    ],
    bullets: [
      "Competitive beauty niche cracked from a brand new account",
      "Pinterest SEO strategy built for the algorithm from day one",
      "Consistent visual brand identity that stopped the scroll",
      "400K+ monthly views in 60 days — entirely organic growth",
    ],
    result: "400K views in 60 days in a competitive niche.",
    screenshots: [
      { src: "/social-media-results/results-pinterest-glow.webp", headline: "+326% Impression Growth", stats: ["+326% impressions", "+279% total audience", "+337% engaged audience"] },
    ],
  },
  {
    name: "Kaminskiy Care & Repair",
    platform: "Instagram",
    category: "Home Services · California",
    headline: "495K video views from organic content.",
    story: "Kaminskiy Care & Repair is a home services franchise brand operating across California. The goal was to build brand visibility through organic video content — no ad spend. In one month, the account reached 495K views and grew reach by 96.2%, showing a franchise brand can build a real audience without paid media.",
    metrics: [
      { label: "Video Views",    value: "495K" },
      { label: "Reach Increase", value: "+96.2%" },
      { label: "Accounts Reached", value: "3,045" },
    ],
    bullets: [
      "Organic video content strategy for a franchise brand in a competitive local market",
      "495K total video views from content published in a single month",
      "3,045 accounts reached organically — 99.7% non-followers",
      "+96.2% increase in reach through consistent, algorithm-aligned posting",
    ],
    result: "Franchise brand visible and growing across California.",
    screenshots: [
      { src: "/social-media-results/results-instagram.png", headline: "495K Video Views", stats: ["495K total video views", "3,045 accounts reached", "+96.2% reach increase"] },
      { src: "/social-media-results/IMG_9313.PNG",           headline: "Views Dashboard", stats: ["495,088 views in 30 days", "99.7% non-followers", "3,045 accounts reached"] },
    ],
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("fn-theme") ?? "light";
  });
  const toggle = () => setTheme((t) => {
    const next = t === "light" ? "dark" : "light";
    localStorage.setItem("fn-theme", next);
    return next;
  });
  return { theme, toggle };
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => el.classList.add("wp-vis"), delay); obs.disconnect(); } },
      { threshold: 0.06, rootMargin: "-16px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className="wp-rev">{children}</div>;
}

// ─── AUTOMATION SECTION ───────────────────────────────────────────────────────
function AutomationSection() {
  return (
    <div className="wp-sec">
      <Reveal>
        <p style={{ fontSize: "15px", color: "var(--t2)", marginBottom: "48px", maxWidth: "520px", lineHeight: "1.75" }}>
          Six live systems built in n8n and GoHighLevel — each one solving a real operational problem for a real business. Click any card for the full case study.
        </p>
      </Reveal>
      <div className="wp-g3">
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.slug} delay={i * 60}>
            <div className="wp-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {cs.coverImage && (
                <img src={cs.coverImage} alt={cs.title} className="wp-auto-img" />
              )}
              <div className="wp-auto-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <span className="wp-auto-tag">{cs.tag}</span>
                <h3 className="wp-h3" style={{ marginBottom: "10px" }}>{cs.title}</h3>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "var(--t2)", marginBottom: "14px", flex: 1 }}>{cs.description}</p>

                {/* Key metrics */}
                <div className="wp-auto-metrics">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="wp-auto-metric">
                      <div className="wp-auto-metric-val">{m.value}</div>
                      <div className="wp-auto-metric-lbl">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tools */}
                <div className="wp-tools">
                  {cs.tools.map((t) => <span key={t} className="wp-tool">{t}</span>)}
                </div>

                <Link to={`/case/${cs.slug}`} className="wp-auto-link">
                  View full case study <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── SOCIAL SECTION ───────────────────────────────────────────────────────────
function SocialSection() {
  return (
    <div className="wp-sec">
      {/* Stats overview */}
      <Reveal>
        <div className="wp-stats-bar">
          {[
            { val: "1M+",   lbl: "Monthly Organic Views",  sub: "Book Addicts · Pinterest" },
            { val: "470+",  lbl: "Businesses Engaged",      sub: "POPIN · Instagram" },
            { val: "+326%", lbl: "Impression Growth",       sub: "Pinterest · verified" },
            { val: "10×",   lbl: "Follower Growth",         sub: "Book Lovers · 4 months" },
          ].map((s) => (
            <div key={s.lbl} className="wp-stat-box">
              <div className="wp-stat-val">{s.val}</div>
              <div className="wp-stat-lbl">{s.lbl}</div>
              <div className="wp-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <p style={{ fontSize: "15px", color: "var(--t2)", marginBottom: "40px", maxWidth: "520px", lineHeight: "1.75" }}>
        Five clients across Instagram, Pinterest, and Facebook — each project built from a clear strategy, not guesswork.
      </p>

      <div className="wp-g2">
        {SOCIAL_PORTFOLIO.map((item, i) => (
          <Reveal key={item.name} delay={i * 70}>
            <div className="wp-card wp-soc-card" style={{ height: "100%" }}>
              {/* Header row */}
              <div className="wp-soc-header">
                <div>
                  <span className="wp-platform-badge">{item.platform}</span>
                  <h3 className="wp-h3" style={{ marginTop: "8px" }}>{item.name}</h3>
                  <div style={{ fontSize: "12px", color: "var(--t3)", marginTop: "3px" }}>{item.category}</div>
                </div>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "64px", height: "64px", borderRadius: "10px", objectFit: "cover", flexShrink: 0, border: "1px solid var(--b0)" }}
                  />
                )}
              </div>

              {/* Headline */}
              <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--pri)", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", lineHeight: "1.35", marginBottom: "12px" }}>
                {item.headline}
              </p>

              {/* Story */}
              <p style={{ fontSize: "13.5px", lineHeight: "1.72", color: "var(--t2)", marginBottom: "16px" }}>
                {item.story}
              </p>

              {/* Metrics */}
              <div className="wp-soc-metrics">
                {item.metrics.map((m) => (
                  <div key={m.label} className="wp-soc-metric">
                    <div className="wp-soc-metric-val">{m.value}</div>
                    <div className="wp-soc-metric-lbl">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Bullets */}
              <div style={{ marginBottom: "4px" }}>
                {item.bullets.map((b, bi) => (
                  <div key={bi} className="wp-soc-bullet">
                    <span className="wp-soc-bullet-dot" />
                    {b}
                  </div>
                ))}
              </div>

              {/* Result */}
              <div className="wp-soc-result">"{item.result}"</div>

              {/* Screenshots */}
              {item.screenshots.length > 0 && (
                <div className="wp-ss-grid">
                  {item.screenshots.map((ss, si) => (
                    <div key={si} className="wp-ss-card">
                      <img src={ss.src} alt={ss.headline} />
                      <div className="wp-ss-info">
                        <div className="wp-ss-headline">{ss.headline}</div>
                        <div className="wp-ss-stats">
                          {ss.stats.map((st) => <div key={st} className="wp-ss-stat">{st}</div>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── BUILDS SECTION DATA ─────────────────────────────────────────────────────
const CMS_SCREENSHOTS = [
  { src: "/images/cms/cms-dashboard.jpeg",      label: "Pipeline Dashboard" },
  { src: "/images/cms/cms-content-board.jpeg",  label: "Content Board (Kanban)" },
  { src: "/images/cms/cms-calendar-board.jpeg", label: "Calendar — Board View" },
  { src: "/images/cms/cms-calendar-month.jpeg", label: "Calendar — Month View" },
  { src: "/images/cms/cms-idea-bank.jpeg",      label: "Idea Bank" },
  { src: "/images/cms/cms-calendar-sheet.jpeg", label: "Calendar — Sheet View" },
  { src: "/images/cms/cms-overview.jpeg",       label: "Full Overview" },
];

const CMS_FEATURES = [
  "12-stage content Kanban — from raw Idea to Published post",
  "Editorial calendar in Board, Month, and Sheet views",
  "Idea Bank for capturing raw concepts before briefs are written",
  "Multi-format support: Reels, Carousels, AI Video, TikTok, YouTube, Website",
  "AI-assisted caption generation and content scheduling",
  "Team collaboration with role-based review and approval workflow",
  "Analytics and publishing dashboard with full pipeline visibility",
  "Automated cross-platform publishing on approved content",
];

const AI_VIDEOS = [
  { src: "/videos/taya-hype-video.mp4",     title: "Taya · Brand Hype",      tool: "Claude" },
  { src: "/videos/anticipation-video.mp4",  title: "Taya · Anticipation",    tool: "Claude" },
  { src: "/videos/moodring-hype-video.mp4", title: "MoodRing · Brand Hype",  tool: "Claude" },
  { src: "/videos/morning-after-video.mp4", title: "The Morning After",      tool: "Higgsfield" },
  { src: "/videos/new-review-video.mp4",    title: "Client Review Showcase", tool: "Higgsfield · HeyGen" },
  { src: "/videos/review-video.mp4",        title: "Review Video",           tool: "Claude" },
];

// ─── BUILDS SECTION ───────────────────────────────────────────────────────────
function BuildsSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="wp-sec">
      <Reveal>
        <p className="wp-build-intro">
          Beyond automation and social — a custom content operations system and a collection of AI-generated video content built with the latest generative tools.
        </p>
      </Reveal>

      {/* ── CMS ── */}
      <Reveal>
        <div className="wp-build-block">
          <div className="wp-build-block-title">
            <span className="wp-label" style={{ margin: 0 }}>Content Operations Platform</span>
          </div>
          <h2 className="wp-h2" style={{ marginBottom: "14px" }}>
            A full CMS built for a<br />
            <span style={{ color: "var(--pri)", fontStyle: "italic" }}>home services franchise brand.</span>
          </h2>
          <p className="wp-build-block-desc">
            A custom Content Management System designed to manage a franchise brand's entire social media operation — from raw idea to published post. Built to handle multi-format content across multiple platforms with team collaboration, AI-assisted caption generation, and automated scheduling baked in.
          </p>

          <div className="wp-tools-row">
            {["Custom CMS", "Content Pipeline", "Editorial Calendar", "AI Captions", "Auto-Publishing", "Team Workflows"].map((t) => (
              <span key={t} className="wp-tool-badge">{t}</span>
            ))}
          </div>

          <div className="wp-cms-features">
            {CMS_FEATURES.map((f, i) => (
              <div key={i} className="wp-cms-feature">
                <span className="wp-cms-feature-dot" />
                <span className="wp-cms-feature-text">{f}</span>
              </div>
            ))}
          </div>

          <div className="wp-cms-shots">
            {CMS_SCREENSHOTS.map((s) => (
              <div key={s.src} className="wp-cms-shot" onClick={() => setLightbox(s.src)}>
                <img src={s.src} alt={s.label} />
                <div className="wp-cms-shot-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── AI VIDEOS ── */}
      <Reveal delay={120}>
        <div className="wp-build-block">
          <div className="wp-build-block-title">
            <span className="wp-label" style={{ margin: 0 }}>AI Video Production</span>
          </div>
          <h2 className="wp-h2" style={{ marginBottom: "14px" }}>
            Branded videos created<br />
            <span style={{ color: "var(--pri)", fontStyle: "italic" }}>with generative AI.</span>
          </h2>
          <p className="wp-build-block-desc">
            Short-form brand video content produced using Higgsfield, Google Veo, and Claude — from hype reels to review showcases and cinematic concept pieces. Each clip produced, directed, and refined end-to-end.
          </p>

          <div className="wp-tools-row">
            {["Higgsfield", "Google Veo", "Claude"].map((t) => (
              <span key={t} className="wp-tool-badge">{t}</span>
            ))}
          </div>

          <div className="wp-video-grid">
            {AI_VIDEOS.map((v) => (
              <div key={v.src} className="wp-video-card">
                <video
                  className="wp-video-player"
                  src={v.src}
                  controls
                  preload="metadata"
                  playsInline
                />
                <div className="wp-video-info">
                  <div className="wp-video-title">{v.title}</div>
                  <div className="wp-video-tool">{v.tool}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Lightbox */}
      {lightbox && (
        <div className="wp-lightbox" onClick={() => setLightbox(null)}>
          <span className="wp-lightbox-close" onClick={() => setLightbox(null)}>×</span>
          <img src={lightbox} alt="Screenshot" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const { theme, toggle } = useTheme();
  const [tab, setTab] = useState<"automation" | "social" | "builds">(() => {
    if (typeof window === "undefined") return "automation";
    const p = new URLSearchParams(window.location.search).get("tab");
    return (p === "social" || p === "builds") ? p : "automation";
  });

  return (
    <div className={`wp wp-${theme}`}>
      <style>{STYLES}</style>

      {/* Navbar */}
      <nav className="wp-nav">
        <Link
          to="/fn"
          style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", fontWeight: 500, color: "var(--t2)", textDecoration: "none" }}
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>
        <span className="wp-serif" style={{ fontSize: "20px", fontWeight: 700, color: "var(--pri)" }}>FN</span>
        <button className="wp-tbtn" onClick={toggle} aria-label="Toggle theme">
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </nav>

      {/* Hero */}
      <div className="wp-hero">
        <Reveal>
          <span className="wp-label">All Work</span>
          <h1 className="wp-h1" style={{ marginBottom: "16px" }}>
            Systems built.<br />
            <span style={{ color: "var(--pri)", fontStyle: "italic" }}>Results verified.</span>
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "1.78", color: "var(--t2)", maxWidth: "480px" }}>
            Automation systems and social media strategies — built for real clients, with real outcomes you can read below.
          </p>
        </Reveal>
      </div>

      {/* Tabs */}
      <div className="wp-tabs">
        <div className="wp-tabs-inner">
          <button className={`wp-tab${tab === "automation" ? " active" : ""}`} onClick={() => setTab("automation")}>
            Automation Systems <span style={{ fontSize: "11px", color: "var(--t3)", marginLeft: "4px" }}>({caseStudies.length})</span>
          </button>
          <button className={`wp-tab${tab === "social" ? " active" : ""}`} onClick={() => setTab("social")}>
            Social Media <span style={{ fontSize: "11px", color: "var(--t3)", marginLeft: "4px" }}>({SOCIAL_PORTFOLIO.length})</span>
          </button>
          <button className={`wp-tab${tab === "builds" ? " active" : ""}`} onClick={() => setTab("builds")}>
            Builds & Media
          </button>
        </div>
      </div>

      {/* Content */}
      {tab === "automation" && <AutomationSection />}
      {tab === "social" && <SocialSection />}
      {tab === "builds" && <BuildsSection />}

      {/* CTA */}
      <div className="wp-cta">
        <Reveal>
          <span className="wp-label">Ready to work together?</span>
          <h2 className="wp-h2" style={{ marginBottom: "14px" }}>
            Let's build your system.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--t2)", maxWidth: "400px", margin: "0 auto 28px", lineHeight: "1.72" }}>
            30 minutes. I'll map your operation, find where revenue is leaking, and outline exactly what to build.
          </p>
          <a
            href="https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting"
            target="_blank" rel="noopener noreferrer"
            className="wp-btn wp-btn-pri"
          >
            Book a free audit <ArrowRight size={14} />
          </a>
        </Reveal>
      </div>

      {/* Footer */}
      <footer className="wp-footer">
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <Link to="/fn" className="wp-serif" style={{ fontSize: "20px", fontWeight: 700, color: "var(--pri)", textDecoration: "none" }}>FN</Link>
          <span style={{ fontSize: "12px", color: "var(--t3)" }}>© {new Date().getFullYear()} Faithful Nyama. All rights reserved.</span>
          <button className="wp-tbtn" onClick={toggle} aria-label="Toggle theme">
            {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
          </button>
        </div>
      </footer>
    </div>
  );
}
