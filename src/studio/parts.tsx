import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { CLIENT_LOGOS } from "@/data/clients";
import {
  COUNTRIES, EMAIL, FILMS, HERO_SET, MOODRING_EMAILS, NAV, PLANNER_ADDONS, PROJECT_TYPES, QUESTIONS, TAYA_EMAILS,
  host, shot,
} from "./data";
import type { Project } from "./data";

const bookHref = (goal: string) => `/book?goal=${encodeURIComponent(goal)}`;
const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Headline that rises word by word ─────────────────────────────────────── */
export const Words = ({ text, start = 0 }: { text: string; start?: number }) => (
  <>
    {text.split(" ").map((w, i, all) => (
      <Fragment key={i}>
        <span className="st-word"><span style={{ "--i": start + i } as CSSProperties}>{w}</span></span>
        {i < all.length - 1 ? " " : null}
      </Fragment>
    ))}
  </>
);

/* ── Frames around real screenshots ───────────────────────────────────────── */
export const Browser = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div className="st-browser">
    <div className="st-browser-bar" aria-hidden="true"><i /><span>{host(url)}</span></div>
    <div className="st-screen">{children}</div>
  </div>
);
export const Phone = ({ children }: { children: React.ReactNode }) => (
  <div className="st-phone"><div className="st-screen">{children}</div></div>
);

/** Desktop + phone view of one project, as composed on the work cards. */
export const Comp = ({ p, eager = false }: { p: Project; eager?: boolean }) => (
  <div className="st-panel-comp">
    <Browser url={p.url}>
      <img src={shot(p.slug, "desktop")} alt={`${p.name} website on desktop`} width={2160} height={1350} loading={eager ? "eager" : "lazy"} decoding="async" />
    </Browser>
    <Phone>
      <img src={shot(p.slug, "mobile")} alt={`${p.name} website on a phone`} width={780} height={1688} loading={eager ? "eager" : "lazy"} decoding="async" />
    </Phone>
  </div>
);

/* ── Nav ──────────────────────────────────────────────────────────────────── */
export const StudioNav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const burger = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide while reading down the page, come back the moment they scroll up.
      setHidden(y > 640 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["websites", "creative", "addons", "work", "pricing"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = burger.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("nav a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && sheet.current) {
        const f = sheet.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); trigger?.focus(); };
  }, [open]);

  return (
    <>
      <header className="st-nav" data-scrolled={scrolled} data-hidden={hidden && !open} onFocus={() => setHidden(false)}>
        <div className="st-wrap">
          <Link to="/studio" className="st-logo" aria-label="Nexara Studio, home" onClick={() => window.scrollTo({ top: 0 })}>
            <b>Nexara<i aria-hidden="true" /></b><span>Studio</span>
          </Link>
          <nav className="st-menu" aria-label="Studio">
            {NAV.map((n) => <a key={n.href} href={n.href} aria-current={active === n.href.slice(1) ? "true" : undefined}>{n.label}</a>)}
          </nav>
          <a className="st-btn st-btn-sm st-nav-cta" href="#start">Start a project <ArrowRight size={16} /></a>
          <button ref={burger} type="button" className="st-burger" aria-expanded={open} aria-controls="st-sheet" onClick={() => setOpen(true)}>
            Menu <i aria-hidden="true" />
          </button>
        </div>
      </header>
      {open && (
        <div id="st-sheet" ref={sheet} className="st-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="st-sheet-top">
            <span className="st-logo"><b>Nexara<i aria-hidden="true" /></b><span>Studio</span></span>
            <button type="button" className="st-burger" onClick={() => setOpen(false)} aria-label="Close menu" style={{ display: "inline-flex" }}>Close <X size={20} /></button>
          </div>
          <nav aria-label="Studio">
            {NAV.map((n, i) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ "--i": i } as CSSProperties}><small>0{i + 1}</small>{n.label}</a>
            ))}
            <a href="#faq" onClick={() => setOpen(false)} style={{ "--i": NAV.length } as CSSProperties}><small>0{NAV.length + 1}</small>FAQs</a>
          </nav>
          <div className="st-sheet-foot">
            <a className="st-btn" href="#start" onClick={() => setOpen(false)}>Start a project <ArrowRight size={18} /></a>
            <a className="st-dim" href={`mailto:${EMAIL}`} style={{ textAlign: "center", minHeight: 44, display: "grid", placeItems: "center" }}>{EMAIL}</a>
          </div>
        </div>
      )}
    </>
  );
};

/* ── Hero stage: real sites, one at a time ────────────────────────────────── */
const HERO_MS = 5200;

export const HeroStage = () => {
  const reduce = useReducedMotion();
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const auto = !reduce;

  const go = useCallback((n: number) => {
    setCur((c) => { if (c !== n) setPrev(c); return n; });
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const yBrowser = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);

  const p = HERO_SET[cur];
  const running = auto && !paused && visible;

  return (
    <div className="st-stage-wrap st-fade" style={{ "--d": ".35s" } as CSSProperties} ref={root}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="st-stage" aria-hidden="true" style={{ "--plate": p.bg, "--plate-fg": p.fg } as CSSProperties}>
        <div className="st-plate" data-name={`${p.name} · ${p.category}`} />
        <motion.div className="st-stage-browser" style={{ y: yBrowser }}>
          <Browser url={p.url}>
            {HERO_SET.map((h, i) => (
              <img key={h.slug} className={`st-shot${i === cur ? " is-cur" : i === prev ? " is-prev" : ""}`} src={shot(h.slug, "desktop")} alt=""
                width={2160} height={1350} loading={i < 2 ? "eager" : "lazy"} {...{ fetchpriority: i === 0 ? "high" : "auto" }} decoding="async" />
            ))}
          </Browser>
        </motion.div>
        <motion.div className="st-stage-phone" style={{ y: yPhone }}>
          <Phone>
            {HERO_SET.map((h, i) => (
              <img key={h.slug} className={`st-shot${i === cur ? " is-cur" : i === prev ? " is-prev" : ""}`} src={shot(h.slug, "mobile")} alt=""
                width={780} height={1688} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
            ))}
          </Phone>
        </motion.div>
      </div>
      <p className="st-sr" aria-live="polite">Now showing {p.name}, {p.category}.</p>
      <div className="st-now st-mono">
        <span className="st-dim">Now showing · live site</span>
        <a href={p.url} target="_blank" rel="noreferrer">{host(p.url)} <ArrowUpRight size={14} /></a>
      </div>
      <div className="st-index" role="group" aria-label="Choose a project to preview" data-auto={auto} data-paused={!running}
        style={{ "--dur": `${HERO_MS}ms` } as CSSProperties}>
        {HERO_SET.map((h, i) => (
          <button key={`${h.slug}-${i === cur ? cur : "x"}`} type="button" aria-pressed={i === cur} onClick={() => go(i)}
            onAnimationEnd={(e) => { if (e.animationName === "st-progress" && i === cur) go((cur + 1) % HERO_SET.length); }}>
            <small>0{i + 1}</small>
            <b>{h.name}</b>
            <small>{h.category}</small>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── "We've worked with companies in …" ───────────────────────────────────── */
export const Countries = () => {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => { if (!document.hidden) setI((n) => (n + 1) % COUNTRIES.length); }, 2600);
    return () => window.clearInterval(t);
  }, [reduce]);

  const all = "India, Bulgaria, Germany, the United States, the United Kingdom and Nigeria";
  return (
    <h2 className="st-countries">
      <span>We've worked with companies in</span>
      {reduce ? (
        <span className="st-country-slot" style={{ height: "auto", whiteSpace: "normal", fontSize: ".62em", lineHeight: 1.2, marginTop: ".3em" }}>{all}.</span>
      ) : (
        <>
          <span className="st-sr">{all}.</span>
          <span className="st-country-slot" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={COUNTRIES[i]}
                initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}>
                {COUNTRIES[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </>
      )}
    </h2>
  );
};

/* ── Client logos: the same set as the Nexara and /fn marquees ─────────────── */
export const ClientMarquee = () => {
  // Repeat the set so one half of the track is always wider than the screen.
  const half = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div className="st-marquee">
      <ul className="st-marquee-track" aria-label="Brands we've worked with">
        {[...half, ...half].map((l, i) => (
          <li key={i} className="st-logo-tile" style={{ background: l.bg }} data-dup={i >= CLIENT_LOGOS.length ? "" : undefined} aria-hidden={i >= CLIENT_LOGOS.length ? true : undefined}>
            <img src={l.tile} alt={i < CLIENT_LOGOS.length ? l.name : ""} loading="lazy" decoding="async" width={168} height={84} />
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ── Film: muted loop while on screen; pause and sound always reachable ───── */
export const Film = ({ src, poster, label, sound = false }: { src: string; poster: string; label: string; sound?: boolean }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v || prefersReduced()) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
      else if (!e.isIntersecting) v.pause();
    }, { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  useEffect(() => { if (ref.current) ref.current.muted = muted; }, [muted]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}); }
    else { userPaused.current = true; v.pause(); }
  };

  return (
    <div className="st-media">
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <div className="st-ctl">
        {sound && (
          <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? `Turn sound on: ${label}` : `Mute: ${label}`}>
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}
        <button type="button" onClick={toggle} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
    </div>
  );
};

export const FilmPlayer = () => {
  const [i, setI] = useState(0);
  const f = FILMS[i];
  return (
    <div>
      <div className="st-player" style={{ "--bg": f.bg } as CSSProperties}>
        <Film key={f.id} src={`/studio/films/${f.id}.mp4`} poster={`/studio/films/${f.id}.webp`} label={`${f.name} ${f.kind.toLowerCase()}`} sound={f.sound} />
      </div>
      <div className="st-reels" role="group" aria-label="Choose a film">
        {FILMS.map((x, n) => (
          <button key={x.id} type="button" aria-pressed={n === i} onClick={() => setI(n)}>{x.name} · {x.kind}<small>{x.ratio}</small></button>
        ))}
      </div>
    </div>
  );
};

/* ── Inbox: pick a subject line, read the real email on a phone ────────────── */
const SERIES = { Moodring: MOODRING_EMAILS, Taya: TAYA_EMAILS };

export const Inbox = () => {
  const [brand, setBrand] = useState<keyof typeof SERIES>("Moodring");
  const [i, setI] = useState(0);
  const screen = useRef<HTMLDivElement>(null);
  const emails = SERIES[brand];
  useEffect(() => { screen.current?.scrollTo({ top: 0 }); }, [i, brand]);
  return (
    <div className="st-inbox-wrap">
      <div className="st-inbox">
        <div className="st-tabs" role="group" aria-label="Welcome series">
          {(Object.keys(SERIES) as (keyof typeof SERIES)[]).map((b) => (
            <button key={b} type="button" aria-pressed={b === brand} onClick={() => { setBrand(b); setI(0); }}>{b} · 7 emails</button>
          ))}
        </div>
        <div className="st-inbox-main">
          <ol className="st-subjects" aria-label={`${brand} welcome emails`}>
            {emails.map((e, n) => (
              <li key={e.src}>
                <button type="button" aria-pressed={n === i} onClick={() => setI(n)}>
                  <span className="st-mono">{String(n + 1).padStart(2, "0")}</span><span>{e.subject}</span>
                </button>
              </li>
            ))}
          </ol>
          <div>
            <div className="st-handset">
              <div className="st-handset-bar" aria-hidden="true"><i /></div>
              <div className="st-handset-screen" ref={screen} tabIndex={0} role="region" aria-label={`${brand} email ${i + 1}, scroll to read`}>
                <img key={emails[i].src} src={emails[i].src} alt={`${brand} email ${i + 1}, "${emails[i].subject}", as it reads on a phone`} loading="lazy" />
              </div>
            </div>
            <p className="st-swipe st-mono">Scroll the phone to read</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Project planner: what we're building, then the seven questions ────────── */
export interface Plan { type: string; addons: string[] }

export const Planner = ({ plan, setPlan }: { plan: Plan; setPlan: (p: Plan) => void }) => {
  const total = QUESTIONS.length + 1;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => QUESTIONS.map(() => ""));
  const done = step === total;
  const field = useRef<HTMLTextAreaElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const qi = step - 1;

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (step >= 1 && !done) field.current?.focus();
    else heading.current?.focus();
  }, [step, done]);

  const set = (v: string) => setAnswers((a) => a.map((x, n) => (n === qi ? v : x)));
  const toggleChip = (chip: string) => {
    const parts = answers[qi].split(", ").filter(Boolean);
    set(parts.includes(chip) ? parts.filter((p) => p !== chip).join(", ") : [...parts, chip].join(", "));
  };
  const toggleAddon = (a: string) => setPlan({ ...plan, addons: plan.addons.includes(a) ? plan.addons.filter((x) => x !== a) : [...plan.addons, a] });

  const goal = [
    "Studio enquiry",
    `Project: ${plan.type || "Not sure yet"}`,
    `Add-ons: ${plan.addons.join(", ") || "None yet"}`,
    ...QUESTIONS.map((q, n) => `${n + 1}. ${q.short}: ${answers[n].trim().slice(0, 220) || "-"}`),
  ].join("\n");
  const answered = answers.filter((a) => a.trim()).length;

  return (
    <div className="st-quiz">
      <div className="st-quiz-top st-mono">
        <span>{done ? "All set" : step === 0 ? "Your project" : `Question ${step} of ${QUESTIONS.length}`}</span>
        <span>{answered} answered</span>
      </div>
      <div className="st-bar" aria-hidden="true"><i style={{ width: `${(Math.min(step, total) / total) * 100}%` }} /></div>

      <div aria-live="polite">
        {step === 0 && (
          <>
            <h3 ref={heading} tabIndex={-1}>What are we building?</h3>
            <p className="st-quiz-hint">Pick the closest one. We'll confirm the scope together on the call.</p>
            <div className="st-quiz-chips" role="group" aria-label="Project type">
              {PROJECT_TYPES.map((t) => (
                <button key={t} type="button" aria-pressed={plan.type === t} onClick={() => setPlan({ ...plan, type: plan.type === t ? "" : t })}>{t}</button>
              ))}
            </div>
            <h4>Anything else? Optional</h4>
            <div className="st-quiz-chips" role="group" aria-label="Add-ons">
              {PLANNER_ADDONS.map((a) => (
                <button key={a} type="button" aria-pressed={plan.addons.includes(a)} onClick={() => toggleAddon(a)}>{a}</button>
              ))}
            </div>
            <div className="st-quiz-nav">
              <Link className="st-quiz-back" to={bookHref(goal)}>Skip to booking</Link>
              <button type="button" className="st-btn st-btn-dark" onClick={() => setStep(1)}>Next: seven quick questions <ArrowRight size={18} /></button>
            </div>
          </>
        )}

        {step >= 1 && !done && (
          <>
            <h3 id="quiz-q">{QUESTIONS[qi].q}</h3>
            <p className="st-quiz-hint">{QUESTIONS[qi].hint}</p>
            <textarea ref={field} aria-labelledby="quiz-q" value={answers[qi]} onChange={(e) => set(e.target.value)} placeholder="Type here, or tap an answer below" />
            <div className="st-quiz-chips" role="group" aria-label="Quick answers">
              {QUESTIONS[qi].chips.map((c) => (
                <button key={c} type="button" aria-pressed={answers[qi].split(", ").includes(c)} onClick={() => toggleChip(c)}>{c}</button>
              ))}
            </div>
            <div className="st-quiz-nav">
              <button type="button" className="st-quiz-back" onClick={() => setStep((s) => s - 1)}><ArrowLeft size={18} /> Back</button>
              <button type="button" className="st-btn st-btn-dark" onClick={() => setStep((s) => s + 1)}>
                {step === QUESTIONS.length ? "Review my answers" : answers[qi].trim() ? "Next question" : "Skip for now"} <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {done && (
          <>
            <h3 ref={heading} tabIndex={-1}>Ready when you are.</h3>
            <p className="st-quiz-hint">Your answers go with your booking, so the call starts with your project, not introductions.</p>
            <ul className="st-summary">
              <li><small>Project</small><span className={plan.type ? "" : "st-empty"}>{plan.type || "We'll work it out on the call"}</span></li>
              <li><small>Add-ons</small><span className={plan.addons.length ? "" : "st-empty"}>{plan.addons.join(", ") || "None yet"}</span></li>
              {QUESTIONS.map((q, n) => (
                <li key={q.short}><small>{q.short}</small><span className={answers[n].trim() ? "" : "st-empty"}>{answers[n].trim() || "We'll ask on the call"}</span></li>
              ))}
            </ul>
            <div className="st-quiz-nav">
              <button type="button" className="st-quiz-back" onClick={() => setStep(total - 1)}><ArrowLeft size={18} /> Edit answers</button>
              <Link className="st-btn st-btn-dark" to={bookHref(goal)}>Book my 30-minute call <ArrowRight size={18} /></Link>
            </div>
          </>
        )}
      </div>

      <div className="st-dots" aria-label="Jump to a step">
        {["Project", ...QUESTIONS.map((q) => q.short)].map((label, n) => (
          <button key={label} type="button" aria-label={n === 0 ? "Your project" : `Question ${n}: ${label}`} aria-current={n === step ? "step" : undefined}
            data-done={n === 0 ? !!plan.type : !!answers[n - 1].trim()} onClick={() => setStep(n)}>{n === 0 ? "P" : n}</button>
        ))}
      </div>
    </div>
  );
};
